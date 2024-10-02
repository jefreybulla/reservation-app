# ReservationApp

## Database setup
Create a postgres database with
```
createdb restaurant_reservation_app
```
Create an .env file with your database credentials. Example:
```
DATABASE_URL="postgresql://<your_user_name>:<your_password>@localhost:5432/restaurant_reservation_app?schema=public"
```

## Run tasks

To run the dev server for your app, use:

```sh
npx nx serve reservation-api
```

To create a production bundle:

```sh
npx nx build reservation-api
```

To see all available targets to run for a project, run:

```sh
npx nx show project reservation-api
```
        
## Add new projects

To generate a new application, use:

```sh
npx nx g @nx/node:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/node:lib mylib
```
