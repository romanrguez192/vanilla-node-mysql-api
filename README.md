# Description

A simple songs REST API using Nodejs and MySQL, without Express.

## Body

An example of a POST request body:

``` json
{
    "name": "Let It Be",
    "artist": "The Beatles",
    "year": 1968,
    "genre": "Rock",
    "length": "3:50",
    "label": "Apple Records"
}
```

## Routes

```
GET /api/songs
GET /api/songs/:id
POST /api/songs
PUT /api/songs/:id
DELETE /api/songs/:id
```
