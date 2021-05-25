import cherrypy
import os
import argparse

from app import app

parser = argparse.ArgumentParser()
parser.add_argument("--host", "-H", help="ipaddress of host.  defaults to '127.0.0.1'")
parser.add_argument(
    "--port", "-p", help="port to serve the application on.  defaults to 8080"
)

args = parser.parse_args()
HOST = args.host if args.host else "127.0.0.1"
PORT = args.port if args.port else 8080

config = {
    "global": {
        "server.socket_host": HOST,
        "server.socket_port": PORT,
        "server.thread_pool": 4,
    },
    "/": {
        "tools.sessions.on": True,
        "tools.staticdir.root": os.path.abspath(os.getcwd()),
    },
    "/static": {"tools.staticdir.on": True, "tools.staticdir.dir": "./build/static"},
}

cherrypy.tree.graft(app.wsgi_app, "/api")


class ServeReact(object):
    @cherrypy.expose
    def default(self, *args, **kwargs):
        return open("build/index.html")


if __name__ == "__main__":

    cherrypy.quickstart(ServeReact(), "/", config)
