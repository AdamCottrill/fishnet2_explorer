from collections import OrderedDict
import sqlite3

#FNDB = "F:/LOntario_data/LOMU_Projects.db"
FNDB = "/home/adam/Documents/sandbox/lhmu_warehouse.db"

def first(arr, low, high, x, n):
    """taken from https://www.geeksforgeeks.org/sort-array-according-order-defined-another-array/"""
    if high >= low:
        mid = low + (high - low) // 2
        # (low + high)/2;
        if (mid == 0 or x > arr[mid - 1]) and arr[mid] == x:
            return mid
        if x > arr[mid]:
            return first(arr, (mid + 1), high, x, n)
        return first(arr, low, (mid - 1), x, n)

    return -1


def sortAccording(A1, A2):
    """taken from https://www.geeksforgeeks.org/sort-array-according-order-defined-another-array/"""
    m = len(A1)
    n = len(A2)
    """The temp array is used to store a copy
    of A1[] and visited[] is used mark the
    visited elements in temp[]."""
    temp = [0] * m
    visited = [0] * m

    for i in range(0, m):
        temp[i] = A1[i]
        visited[i] = 0

    # Sort elements in temp
    temp.sort()

    # for index of output which is sorted A1[]
    ind = 0

    """Consider all elements of A2[], find
    them in temp[] and copy to A1[] in order."""
    for i in range(0, n):

        # Find index of the first occurrence
        # of A2[i] in temp
        f = first(temp, 0, m - 1, A2[i], m)

        # If not present, no need to proceed
        if f == -1:
            continue

        # Copy all occurrences of A2[i] to A1[]
        j = f
        while j < m and temp[j] == A2[i]:
            A1[ind] = temp[j]
            ind = ind + 1
            visited[j] = 1
            j = j + 1

    # Now copy all items of temp[] which are
    # not present in A2[]
    for i in range(0, m):
        if visited[i] == 0:
            A1[ind] = temp[i]
            ind = ind + 1


def sort_fields(fields, keyfields):
    """sort our fields by key fields, other fieldss, and xfields, other
    fields and x fields are sorted alphabetically while key fields re
    sorted based on FN-hiearchy.


    Arguments:
    - `fields`:

    """

    myxfields = [x for x in fields if x.startswith("X")]
    myxfields.sort()

    myfields = [x for x in fields if not x.startswith("X")]

    mykeyfields = list(set(keyfields).intersection(set(myfields)))
    sortAccording(mykeyfields, keyfields)

    myotherfields = list(set(myfields) - set(mykeyfields))
    myotherfields.sort()

    allfields = mykeyfields + myotherfields + myxfields

    #move DBF_FILE to the end if it is included
    if 'DBF_FILE' in allfields:
        allfields.append(allfields.pop(allfields.index('DBF_FILE')))

    return allfields


def get_field_names(table_name):
    """Get the known field names for this table.  This could be a cache some day."""
    sql = "SELECT * FROM {} limit 1;".format(table_name)
    data = run_query(sql)
    return list(data[0].keys())


def get_field_arg(table_name, key_fields, selected_fields=None):
    """given a table, the list of key fields and a list of selected fields
    return a sql formatted list of field hmes in the correct order"""
    # we should consider setting up a cache that queries the database
    # for the schema once when the server loads.

    db_fields = get_field_names(table_name)

    if selected_fields:
        field_set = set(selected_fields.split(","))
        fields = list(set(db_fields).intersection(field_set))
    else:
        fields = db_fields
    sorted_fields = sort_fields(fields, key_fields)
    field_arg = ", ".join(["[{}]".format(x) for x in sorted_fields])

    return field_arg


def dict_factory(cursor, row):

    d = OrderedDict()
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d


def run_query(sql, fetchone=False):
    """

    Arguments:
    - `sql`:
    """

    data = {}

    with sqlite3.connect(FNDB) as con:
        con.row_factory = dict_factory
        cursor = con.cursor()
        cursor.execute(sql)
        if fetchone:
            data = cursor.fetchone()
        else:
            data = cursor.fetchall()
    return data


def build_sql_filter(url_filters, fields):
    """given a dictionary containing a list of url parameters, construct
    the sql code for in (<field_name>__in=), like
    (<field_name>__like=) and is equal (<field_name>=) to for each of
    the specified fields in the filter dictionary.  Any fields that do
    not exist in the table are ignored. The fields key of the filter
    is also ignored - as it is used elsewhere to build the select statement.

    Arguments: - `url_filters`: - `fields`:

    """

    likes = [
        (k.replace("__like", ""), v.upper())
        for k, v in url_filters.items()
        if k.endswith("__like")
    ]
    ins = [
        (k.replace("__in", ""), ",".join(["'{}'".format(x) for x in v.split(",")]))
        for k, v in url_filters.items()
        if k.endswith("__in")
    ]
    rest = [
        (k, v)
        for k, v in url_filters.items()
        if not (k.endswith("__in") or k.endswith("__like")) and not k == "fields"
    ]

    # check for fields here - make sure they exist in this table and remove them if they don't
    likes = [x for x in likes if x[0] in fields]
    ins = [x for x in ins if x[0] in fields]
    rest = [x for x in rest if x[0] in fields]

    likes_sql = " AND ".join(
        ["UPPER([{}]) like '%{}%'".format(fld, value) for fld, value in likes]
    )
    ins_sql = " AND ".join(["[{}] in ({})".format(fld, value) for fld, value in ins])
    rest_sql = " AND ".join(["[{}]='{}'".format(fld, value) for fld, value in rest])

    sql = " AND ".join([x for x in [likes_sql, ins_sql, rest_sql] if x != ""])

    return sql
