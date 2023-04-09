import pytest
from app import schemas


def test_get_all_stations(client, test_stations_and_journeys):
    res = client.get("/stations")
    stations = res.json()
    stations = stations['items']

    def validate(items):
        return schemas.StationListResponse(**items)
    
    stations_map = map(validate, stations)
    stations_list = list(stations_map)

    for i in range(1, len(stations_list)):
        assert stations_list[i].station_name_finnish >= stations_list[i-1].station_name_finnish

    assert len(stations_list) == len(test_stations_and_journeys[0])
    assert res.status_code == 200

def test_get_all_stations_404(client):
    res = client.get("/stations")

    assert res.status_code == 404


def test_get_station(client, test_stations_and_journeys):
    station_id = 21
    res = client.get(f"/station/{station_id}")
    data = res.json()
    print(data)

    assert(data['station_id'] == station_id)
    assert(data['ended_journeys_avg_distance'] == 6333)
    assert(data['started_journeys_avg_distance'] == 5333)
    assert res.status_code == 200


def test_get_station_404(client, test_stations_and_journeys):
    station_id = 123
    res = client.get(f"/station/{station_id}")

    assert res.status_code == 404

def test_search_stations(client, test_stations_and_journeys):
    res = client.get("/stations/search?station_name=x")
    station_id = res.json()[0]['station_id']

    assert(res.status_code == 200)
    assert(station_id == 27)

def test_search_stations_empty(client, test_stations_and_journeys):
    res = client.get("/stations/search?station_name=empty")
    data = res.json()

    assert(data == [])

def test_search_stations_limit(client, test_stations_and_journeys):
    res = client.get("/stations/search?station_name=station")
    data = res.json()

    assert(len(data) == 3)

def test_search_station_multiple(client, test_stations_and_journeys):
    res = client.get("/stations/search?station_name=best")
    data = res.json()

    assert(len(data) == 2)
    