# Restaurant-api

## Restaurants API Endpoint

### URL
`/api/restaurants`

### Method
`GET`

### Query Parameters
- `reservationDateTime` (string, required): The desired reservation date and time in ISO 8601 format.
- `diet` (array of strings, optional): A list of dietary endorsements required by the restaurant.
- `partySize` (number, required): The number of people in the party.

### Description
This endpoint retrieves a list of restaurants that have available tables for the specified reservation date and time, dietary requirements, and party size.

### Request Example
```http
GET /api/restaurants?reservationDateTime=2023-10-01T19:00:00Z&diet=vegan,gluten-free&partySize=4
```

### Response
Restaurant(array): A list of restaurants that match the criteria

### Response Example
```
{
  "restaurants": [
    {
      "id": 1,
      "name": "Healthy Eats",
      "endorsements": ["vegan", "gluten-free"],
      "tables": [
        {
          "id": 101,
          "capacity": 4,
          "reservations": []
        }
      ]
    },
    {
      "id": 2,
      "name": "Green Bistro",
      "endorsements": ["vegan"],
      "tables": [
        {
          "id": 102,
          "capacity": 6,
          "reservations": []
        }
      ]
    }
  ]
}
```

### Error handling
- If reservationDateTime or partySize is missing, the endpoint will return a 400 Bad Request error.
- If no restaurants match the criteria, the endpoint will return an empty array in the restaurants field.



## Reservations API Endpoint

### URL
`/api/reservations`

### Method
`POST`

### Request Body
- `tableId` (integer, required): The ID of the table to reserve.
- `userId` (integer, required): The ID of the user making the reservation.
- `reservationDateTime` (string, required): The date and time of the reservation in ISO 8601 format.

### Description
This endpoint creates a new reservation for a specified table, user, and reservation date and time.

### Request Example
```http
POST /restaurants
```

Body:
```
{
  "tableId": 101,
  "userId": 1,
  "reservationDateTime": "2023-10-01T19:00:00Z"
}
```

### Response
- `reservationId` (integer): The ID of the created reservation.
- `tableId` (integer): The ID of the reserved table.
- `userId` (integer): The ID of the user who made the reservation.
- `reservationDateTime` (string): The date and time of the reservation in ISO 8601 format.

### Response Example
```
{
  "reservationId": 1,
  "tableId": 101,
  "userId": 1,
  "reservationDateTime": "2023-10-01T19:00:00Z"
}
```

### Error handling
- If any required fields are missing, the endpoint will return a 400 Bad Request error.
- If the tableId or userId does not exist, the endpoint will return a 404 Not Found error.
- If the reservationDateTime is not in the correct format, the endpoint will return a 400 Bad Request error.