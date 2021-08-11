import argparse
import os

import cherrypy

from api.api import api as app

parser = argparse.ArgumentParser()
parser.add_argument("--host", "-H", help="ipaddress of host.  defaults to '127.0.0.1'")
parser.add_argument(
    "--port", "-p", help="port to serve the application on.  defaults to 8080"
)

args = parser.parse_args()
HOST = args.host if args.host else "127.0.0.1"
PORT = int(args.port) if args.port else 8080


config = {
    "engine.autoreload.on": True,
    "global": {
        "server.socket_host": HOST,
        "server.socket_port": PORT,
        "server.thread_pool": 4,
    },
}

cherrypy.tree.graft(app.wsgi_app, "/")
cherrypy.tree.mount(
    None,
    "/static",
    {
        "/": {
            "tools.staticdir.dir": app.static_folder,
            "tools.staticdir.on": True,
        }
    },
)

cherrypy.config.update(config)

if __name__ == "__main__":
    cherrypy.engine.start()
    cherrypy.engine.block()
