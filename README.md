# ReservationApp
This api has the following two features
    - Find restaurants with available tables 
    - Make restaurant reservations

## Key files
- [API documentation](apps/reservation-api/src/app/routes/docs.md)
- [restaurant.ts](apps/reservation-api/src/app/routes/restaurants.ts) -> endpoint to retrieve available restaurants
- [reservations.ts](apps/reservation-api/src/app/routes/reservations.ts) -> endpoint to make a reservation

## Development setup
### Requirements
- Postgres
- Node JS (Install version specified in file `.nvmrc`)

### Database setup
Create a postgres database with
```
createdb restaurant_reservation_app
```
In the project roor create an .env file with your database credentials. Example:
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
