# Fishnet-II Explorer

Fishnet-II is a react application with a flask api that makes fishnet
data available in your browser.

## The Front End

    >  yarn install

## The Backend

    > pip install requirements.txt

## Running the application

Currently the applation runs in two seperatate terminals - one for the
frontend and one for the backend.  To start the backend, open a
terminal and navigate to the project root directory and activate your
virtual environment. To start the api backend simply issued to command:

    > yarn start-api

To start the frontend, open a second terminal, naviagate to the
project's root folder and run:

    > yarn start


To make the application available to others over the network, you can
pass a host and (optionally) port when you start the frontend application:

    > yarn start  --host=XXX.XXX.XXX.XXX --port=YYYY
