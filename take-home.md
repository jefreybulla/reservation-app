# Social Restaurant Booking API

## Product requirements
We’re building the backend for an app that allows users to do the following: with a group of
friends, find a restaurant that fits the dietary restrictions of the whole group, with an available
table at a specific time, and then create a reservation for that group and time.
Our world has the following:

### Diners
- Name
- Zero or more dietary restrictions (“Vegan”, “Vegetarian”, “Paleo”, etc.)


### Restaurants
- Name
- Zero or more endorsements (“Vegan-friendly”, “Vegetarian-friendly”, “Paleo-friendly”)

### Tables
- Capacity (e.g. Seats 4 people)

### Reservations
- Table
- Diners
- Time

To start the project, create diners, restaurants, and tables in bulk or hard-code these. We do not
need API endpoints to create these. Assume that reservations last 2 hours.
With this starting point, build endpoints to do the following:

- An endpoint to find restaurants with an available table for a group of users at a specific
time.

Example: Jack, Jill and Jane are looking for a reservation at 7:30pm on Tuesday.
Return a list of restaurants with an available table (for that many people or more)
at that time, which meets all of the group’s dietary requirements.

- An endpoint that creates a reservation for a group of users. This will always be called
after the search endpoint above.

Out of scope
Only the API is in scope - the UI is out of scope. Authentication is out of scope.