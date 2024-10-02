# ReservationApp
This api has the following features:
- Find restaurants with available tables 
- Make a table reservation at a restaurant

## Key files
- [API documentation](apps/reservation-api/src/app/routes/docs.md)
- [restaurants.ts](apps/reservation-api/src/app/routes/restaurants.ts). Endpoint to retrieve available restaurants
- [reservations.ts](apps/reservation-api/src/app/routes/reservations.ts). Endpoint to make a reservation
- [Data model](apps/reservation-api/src/app/prisma/schema.prisma).

## Development setup
### Requirements
- Postgres
- Node JS (Install version specified in file `.nvmrc`)

### Database setup
Create a postgreSQL database with
```
createdb restaurant_reservation_app
```
In the project root create an .env file with your database credentials. Example:
```
DATABASE_URL="postgresql://<your_user_name>:<your_password>@localhost:5432/restaurant_reservation_app?schema=public"
```

### Install dependencies
```
npm install
```
### Run server
```sh
npx nx serve reservation-api
```
