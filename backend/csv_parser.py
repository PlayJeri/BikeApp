from sqlalchemy.exc import IntegrityError
from app.database import SessionLocal, engine, Base
from app.models import Journey, Station
from datetime import datetime
import csv


journeys_csv_filenames = ['2021-05.csv', '2021-06.csv', '2021-07.csv']
stations_csv_filename = 'stations.csv'
csv_folder_path = 'csv_files'


def add_journeys(folder_path, filename):
    db = SessionLocal()
    with open(f'{folder_path}/{filename}', 'r') as file:
        reader = csv.reader(file)
        next(reader) # skip the headers row
        error_counter = 0
        duplicate_counter = 0
        for row in reader:
            try:
                if (int(row[6]) > 10) and (int(row[7]) > 10):
                    new_ride = Journey(
                        departure_time=datetime.fromisoformat(row[0]),
                        return_time=datetime.fromisoformat(row[1]),
                        departure_station_id=int(row[2]),
                        departure_station_name=row[3],
                        return_station_id=int(row[4]),
                        return_station_name=row[5],
                        covered_distance=int(row[6]),
                        duration=int(row[7])
                        )
                    db.add(new_ride)
                    db.commit()
                else:
                    error_counter+=1
            except:
                db.rollback()
                duplicate_counter+=1
        print(f'{error_counter} rows of data discarded')        
        print(f'{duplicate_counter} duplicate rows discarded')      


def add_stations(folder_path, filename):
    db = SessionLocal()
    with open(f'{folder_path}/{filename}', 'r') as file:
        reader = csv.reader(file)
        next(reader) # skip the headers row
        error_counter = 0
        for row in reader:
            try:
                new_station = Station(
                        station_id = int(row[1]),
                        station_name_finnish = row[2],
                        station_name_swedish = row[3],
                        station_name_english = row[4],
                        address_finnish = row[5],
                        address_swedish = row[6],
                        city_finnish = row[7],
                        city_swedish = row[8],
                        operator = row[9],
                        capacity = int(row[10]),
                        x_coordinate = float(row[11]),
                        y_coordinate = float(row[12]))
                db.add(new_station)
            except:
                error_counter+=1
        print(f'{error_counter} rows of data discarded')
        db.commit()
            

if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)
    add_stations(csv_folder_path, stations_csv_filename)
    for file in journeys_csv_filenames:
        add_journeys(csv_folder_path, file)
