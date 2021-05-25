# Fishnet-II Explorer

Fishnet-II is a react application with a flask api that makes fishnet
data available in your browser.

## The Front End

    >  yarn install

## The Backend

    > pip install requirements.txt

## Running the application

### Development

Currently the applation runs in two seperatate terminals - one for the
frontend and one for the backend.  To start the backend, open a
terminal and navigate to the project root directory and activate your
virtual environment. To start the api backend simply issued to command:

    > yarn start-api

To start the frontend, open a second terminal, naviagate to the
project's root folder and run:

    > yarn start


To make the application available to others over the network, you can
pass a host and (optionally) port when you start the front end application:

    > yarn start  --host=XXX.XXX.XXX.XXX --port=YYYY

### Production

The repository contains a simple cherrypy script to serve the
application and api from a single process in production.  To deploy the
application simply issue this command from the root directory:

    > yarn deploy

It will use webpack to build the production scripts and copy the build
files to the appropriate directory for cherrypy to find and serve.

To start the cherrypy server, activate the virtual environment (if it
is not already active) and then:

    > cd api
    > python runserver

runserver.py takes two additional arguments for host (-H) and port
(-p) to serve the application on.  If these arguments are not provided
the default is to server it at 127.0.0.1:8000.

The cherrypy server is configured to automatically reload if the
source files change, so you can update and re-deploy the react
application as necessary by just re-issuing 'yarn deploy' as needed.
