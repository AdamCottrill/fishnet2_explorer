import sqlite3

from flask import Flask, request, send_from_directory

from .utils import (build_sql_filter, get_field_arg, get_field_names,
                    run_query, sort_fields)

api = Flask(__name__, static_folder="static", static_url_path="/")
api.config["JSON_SORT_KEYS"] = False

# consider loading tables and sorted fields as soon as the application loads.

ROW_LIMIT = 200
FN_KEYFIELDS = ["PRJ_CD", "SAM", "EFF", "SPC", "GRP", "FISH", "AGEID"]


@api.route("/")
def react_app():
    """Return the template that will render our react app"""
    print(api.static_folder)
    return send_from_directory(api.static_folder, "index.html")


@api.route("/api/<project_type>/tables")
def get_database_tables(project_type):
    """"""

    sql = "SELECT name FROM sqlite_master WHERE type='table' order by name;"
    tables = [x["name"] for x in run_query(sql, project_type)]
    return {"tables": tables}


@api.route("/api/<project_type>/<table_name>/fields")
def get_table_fields(project_type, table_name):
    """Given a table, return all of the fields.  if any of the FN
    Keyfields are in the table, return them first in the correct order and
    then return all of the others.

    """
    # sql = "SELECT * FROM {} limit 1;".format(table_name)
    # data = run_query(sql, project_type)
    # fields = list(data[0].keys())
    fields = get_field_names(project_type, table_name)

    sortedFields = sort_fields(fields, FN_KEYFIELDS)

    return {"fields": sortedFields}


@api.route("/api/<project_type>/<table_name>/data/")
def get_table_data(project_type, table_name):
    """Given a table name, build the query based on the supplied fields
    and filters.

    if FN Keyfields are in the table, return them first in the correct order and
    then return all of the others.

    if source is included in the response see if we can strip out the
    part of th path that is associated with my directory structure.

    """

    filters = request.args

    fields = filters.get("fields")
    field_arg = get_field_arg(project_type, table_name, FN_KEYFIELDS, fields)

    field_names = get_field_names(project_type, table_name)
    sql_filters = build_sql_filter(filters, field_names)

    field_arg = field_arg if field_arg else "*"

    sql = "SELECT {} FROM [{}] ".format(field_arg, table_name)

    if sql_filters != "":
        sql = sql + "WHERE {}".format(sql_filters)

    sql = sql + " LIMIT {};".format(ROW_LIMIT)

    data = run_query(sql, project_type)

    return {"data": data}


@api.route("/api/always_null/<project_type>/<table_name>/<field_name>/")
def has_data(project_type, table_name, field_name):
    """our front end will call this endpoint, with the current filters to
    see if this field has any data, returns true if it does, returns
    false if it is always empty give the table fitlered attributes

    Arguments:
    - `table`:
    - `field`:

    """

    sql = "SELECT [{0}] FROM [{1}] where {0} is not null and {0} not in ('', ' ');".format(
        field_name, table_name
    )
    # tack filters onto sql here:

    # return true if there is a record,
    data = run_query(sql, project_type, True)
    if data:
        return {"has_data": True}
    else:
        return {"has_data": False}


@api.route("/api/distinct/<project_type>/<table_name>/<field_name>/")
def distinct_values(project_type, table_name, field_name):
    """our front end will call this endpoint, with the current filters to
    see if this field has any data, returns true if it does, returns
    false if it is always empty give the table fitlered attributes

    Arguments:
    - `table`:
    - `field`:

    """

    filters = request.args

    field_names = get_field_names(project_type, table_name)
    # pop of this field name from the filters - we all values of this field
    # given the filters applied to every other field
    field_names = [x for x in field_names if x != field_name]
    sql_filters = build_sql_filter(filters, field_names)

    if sql_filters != "":
        where = "WHERE {}".format(sql_filters)
    else:
        where = ""

    sql = """SELECT [{0}], count(*) as n FROM [{1}] {2} group by [{0}]
    order by count(*)  DESC LIMIT 50;""".format(
        field_name, table_name, where
    )

    # return true if there is a record,
    data = run_query(sql, project_type)
    return {"values": list(data)}


@api.route("/api/<project_type>/<table_name>/record_count/")
def record_count(project_type, table_name):
    """our front end will call this endpoint, with the current filters to
    see if this field has any data, returns true if it does, returns
    false if it is always empty give the table fitlered attributes

    Arguments:
    - `table`:
    - `field`:

    """

    filters = request.args

    field_names = get_field_names(project_type, table_name)

    sql = "SELECT count(*) as records FROM [{}] ".format(table_name)
    # tack filters onto sql here:
    sql_filters = build_sql_filter(filters, field_names)

    if sql_filters != "":
        where = "WHERE {}".format(sql_filters)
    else:
        where = ""

    # return true if there is a record,
    data = run_query(sql + where, project_type)
    return {"values": list(data)}


@api.route("/api/field_stats/<project_type>/<table_name>/<field_name>/")
def field_stats(project_type, table_name, field_name):
    """this endpoint will return a number of statistics about how a field has
    been used in a table:  How many times it is populated, coount null records
    by project code, how many disctinct values it has and the top 200 use cases.

    Arguments:
    - `table`:
    - `field`:

    """

    sql = f"""select count() as N from [{table_name}]
            where [{field_name}] is not NULL
            and [{field_name}] is not ' '
            and [{field_name}] is not '';"""
    try:
        occurence_count = run_query(sql, project_type)
    except sqlite3.OperationalError:
        occurence_count = [
            f"Field '{field_name}' not found in '{table_name}'",
        ]

    sql = f"""select count(*) as 'N' from
    (select distinct [{field_name}] from [{table_name}]
    where [{field_name}] is not NULL
            and [{field_name}] is not ' '
            and [{field_name}] is not ''
    );"""

    try:
        distinct_vals = run_query(sql, project_type)
    except sqlite3.OperationalError:
        distinct_vals = [
            f"Field '{field_name}' not found in '{table_name}'",
        ]

    sql = f"""select count(*) as 'N' from
    (select distinct [PRJ_CD] from [{table_name}]
    where [{field_name}] is not NULL
            and [{field_name}] is not ' '
            and [{field_name}] is not ''
    );"""

    try:
        prj_cds = run_query(sql, project_type)
    except sqlite3.OperationalError:
        prj_cds = [
            f"Field '{field_name}' not found in '{table_name}'",
        ]

    sql = f"""select [PRJ_CD], count() as N from [{table_name}]
            where [{field_name}] is not NULL
            and [{field_name}] is not ' '
            and [{field_name}] is not ''
            Group by [PRJ_CD]
            order by count([PRJ_CD]) desc;"""

    try:
        project_counts = run_query(sql, project_type)
    except sqlite3.OperationalError:
        project_counts = [
            f"Field '{field_name}' not found in '{table_name}'",
        ]

    sql = f"""select [{field_name}] as value, count([{field_name}]) as N from [{table_name}]
            group by [{field_name}]
            having [{field_name}] is not NULL
            and [{field_name}] is not ' '
            and [{field_name}] is not ''
            order by count([{field_name}]) desc limit 100;"""

    try:
        common_values = run_query(sql, project_type)
    except sqlite3.OperationalError:
        common_values = [
            f"Field '{field_name}' not found in '{table_name}'",
        ]

    return {
        "occurence_count": occurence_count[0],
        "distinct_values": distinct_vals[0],
        "prj_cds": prj_cds[0],
        "project_counts": list(project_counts),
        "common_values": list(common_values),
    }
