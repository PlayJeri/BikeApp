# Helsinki city bike app (Dev Academy pre-assignment)

This project consists of a fastAPI backend, React frontend and a database.

Journeys page displays starting and ending stations and covered distance and duration of completed journeys.
The page uses pagination and has option for limiting the number of journeys and sorting the data by clicking station name, duration, or distance.

Stations page displays name and address of all the stations from the database and uses pagination.

Station page displays more information about a specific station including stations location using OpenStreetMap API

Search bar can be used to find a specific station by stations name.

The app also has admin functionality to add new stations to the database.
For authentication the app uses OAuth2 and JSON web tokens at /login endpoint.


## This application is deployed on render.com

App can be used here:
* https://bikeapp-8fs7.onrender.com
Api swagger documentation can be viewed here:
* https://dikeapp-docker.onrender.com/docs

Due to limitations of renders free tier hosting optinos the backend takes about 30 seconds to boot when you first visit the site.
Fetching station data and sorting the journey data also takes quite long because of these limitations.

To add new stations you need to login by going to 
* https://bikeapp-8fs7.onrender.com/login
username and password are both "admin"


## Getting Started locally

To get started with testing the project, clone this repository by running the following command in your terminal:
* git clone https://github.com/PlayJeri/solita-dev-academy.git


### Prerequisites

Before running the application, you need to have Python and Node.js installed on your machine.

### Backend

1. Create a folder named `csv_files` inside the `backend` folder.
2. Add your journey data and station data CSV files into that folder.
* The csv files can be downloaded here
* <https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv>
* <https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv>
* <https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv>
* <https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv>
3. Make sure that your CSV filenames match the names of the variables in `csv_parser.py`.
4. Add `.env` file inside `backend` folder and define following variables
* TOKEN_EXPIRE_TIME=(minutes)
* SECRET_KEY=(your secret key here)
5. If you want to run the backend in Docker, run the following command in your terminal:
* docker-compose up --build -d
* docker ps
* docker exec -it <image_name> bash
* csv_parser.py

If you don't want to use docker, follow the steps below.

5. Create a virtual environment inside backend folder and activate it
6. Install dependencies with following command
* pip install -r requirements.txt
7. Run 'csv_parser.py' to create admin account and to create and populate the database.
8. Run the backend with the following command
* uvicorn app.main:app
* if there is an error try reactivating your virtual environment


### Frontend

1. Move to the `frontend/bike_app` folder.
2. Run the following command in your terminal to install the required packages:
* npm i
3. Run the React app with the following command:
* npm run dev

The web application should now be accessible at http://localhost:5173

