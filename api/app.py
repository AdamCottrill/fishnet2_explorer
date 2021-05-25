from flask import Flask, request

from utils import (
    sort_fields,
    run_query,
    get_field_arg,
    build_sql_filter,
    get_field_names,
)

app = Flask(__name__)
app.config["JSON_SORT_KEYS"] = False

# consider loading tables and sorted fields as soon as the application loads.

ROW_LIMIT = 200
FN_KEYFIELDS = ["PRJ_CD", "SAM", "EFF", "SPC", "GRP", "FISH", "AGEID"]

# sort fields by keyfield, fields, xfields

# parse filter queries:
# field=foo
# field_like=foo
# field_in=foo.bar.baz


@app.route("/<project_type>/tables")
def get_database_tables(project_type):
    """"""

    sql = "SELECT name FROM sqlite_master WHERE type='table' order by name;"
    tables = [x["name"] for x in run_query(sql, project_type)]
    return {"tables": tables}


@app.route("/<project_type>/<table_name>/fields")
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


@app.route("/<project_type>/<table_name>/data/")
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


@app.route("/always_null/<project_type>/<table_name>/<field_name>/")
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


@app.route("/distinct/<project_type>/<table_name>/<field_name>/")
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


@app.route("/<project_type>/<table_name>/record_count/")
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
