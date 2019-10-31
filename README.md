## Google Calendar Booking REST API (In Progress)

##### This API acts as a layer between the client and the Google Calendar API. Essentially, a client can make an appointment with this API and it gets updated on Google Calendar. However, this booking system has several restrictions:

* All appointments are 40 minutes long and have fixed times, starting from 9–9:40 am
* There is always a 5 minute break in between each appointment
* Appointments can only be booked during weekdays from 9 am to 6 pm
* Bookings can only be made at least 24 hours in advance
* Appointments cannot be booked in the past
* There cannot be multiple bookings at the same time
* Bookings must be visible in the connected Google Calendar account
* All bookings and days are in UTC time, i.e. all inputs to and outputs from the server will be in UTC

---

##### These are the three endpoints for this API:

1. `GET /days?year=yyyy&month=mm` Returns an array of all days in the specified month, each of which has the field `hasTimeSlots`, which is false if there are no time slots available, based on the requirements listed above.
2. `GET  /timeslots?year=yyyy&month=mm&day=dd` Returns a list of all 40-minute time slots available for that day as an array of objects that contain a `startTime` and `endTime` in ISO 8601 format.
3. `POST  /book?year=yyyy&month=MM&day=dd&hour=hh&minute=mm` Returns a boolean field `success`. If the booking was successful, also return `startTime` and `endTime`. If not successful, return a `message`, a string for the error message.

---

##### Running the server locally
Make sure to have the latest stable version of Node installed or above. Run `npm install` from the root of this project folder in the terminal to install all the package dependencies. Then run `npm start` to start the server. Be default the server runs on `localhost:4000`.

