"""
=============================================================
~\api\add_db_indexes.py
Created: Jul-15-2021 10:53
DESCRIPTION:

   This script add databases indexes to each field of the specified FN tables.
   Indexes are on the individual fields, and in combination with prj_cd.  This
   is not something we would normally do, but greatly improves the performance
   of the field stats application - we can't know what people will select, so we
   index everything. fine for exploratory purposes.

    to run the script, simpley issue this command at the commnand prompt:

    > python add_indexes.py

    The script will report its progress as it iterates over the tables in each database.

A. Cottrill
=============================================================
"""


# import os
import sqlite3
from collections import OrderedDict


def dict_factory(cursor, row):

    d = OrderedDict()
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d


def get_field_names(
    db,
    table_name,
):

    sql = "PRAGMA table_info( [{}] );".format(table_name)
    data = {}
    with sqlite3.connect(db) as con:
        con.row_factory = dict_factory
        cursor = con.cursor()
        cursor.execute(sql)
        data = cursor.fetchall()
    if data:
        return [x.get("name") for x in data]
    else:
        return []


def addIndex(db, table_name, fields):
    """Add an index to each field and each field in combination with project
    code in the specified table of the provided database. Indexes are created on
    every field in the specified table as well as compound indexes on
    prj_cd-field."""
    with sqlite3.connect(db) as con:
        cursor = con.cursor()
        for field in fields:
            idx = f"{table_name}_{field}".replace(" ", "")
            sql = f"create index {idx} on [{table_name}] ([{field}]);"
            cursor.execute(sql)
            if field != "PRJ_CD" and "PRJ_CD" in fields:
                idx = f"{table_name}_prj_cd_{field}".replace(" ", "")
                sql = f"create index {idx} on [{table_name}] (PRJ_CD, [{field}]);"
                cursor.execute(sql)
        con.commit()


tables = ["FN011", "FN121", "FN122", "FN123", "FN124", "FN125", "FN126", "FN127"]

DBS = {
    "all": "./databases/GrandGrandWazoo.db",
    "cfcd": "./databases/CFCD_projects.db",
    "iais": "./databases/IAIS_projects.db",
    "im": "./databases/IM_projects.db",
    "sc": "./databases/SC_projects.db",
    "sf": "./databases/SF_projects.db",
    "sd": "./databases/SD_projects.db",
}

# DBS = {
#     "test": "C:/Users/COTTRILLAD/1work/ScrapBook/db_sandbox/lhmu_warehouse.db"
# }

for label, db in DBS.items():
    print(f"Adding indexes to {db}")
    for table_name in tables:
        flds = get_field_names(db, table_name)
        print(f"adding indexes to {table_name}")
        addIndex(db, table_name, flds)
