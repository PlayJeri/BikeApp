import pytest
from app import schemas


def test_get_all_stations(client, test_stations):
    res = client.get("/stations")
    stations = res.json()
    stations = stations['items']

    def validate(items):
        return schemas.StationListResponse(**items)
    
    stations_map = map(validate, stations)
    stations_list = list(stations_map)

    assert len(stations_list) == len(test_stations)
    assert res.status_code == 200
