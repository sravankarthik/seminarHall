const { google } = require('googleapis');
const dotenv = require("dotenv")
dotenv.config()

// Provide the required configuration
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const calendarId = process.env.CALENDAR_ID;

//Google calendar API settings
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const calendar = google.calendar({ version: "v3" });

const auth = new google.auth.JWT(
    CREDENTIALS.client_email,
    null,
    CREDENTIALS.private_key,
    SCOPES
);

// Your TIMEOFFSET Offset
const TIMEOFFSET = '+05:30';

// Get date-time string for calender
const dateTimeForCalander = () => {

    let date = new Date();

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    let day = date.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    let hour = date.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }
    let minute = date.getMinutes();
    if (minute < 10) {
        minute = `0${minute}`;
    }

    let newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000${TIMEOFFSET}`;

    let event = new Date(Date.parse(newDateTime));

    let startDate = event;
    // Delay in end time is 1
    let endDate = new Date(new Date(startDate).setHours(startDate.getHours() + 1));

    return {
        'start': startDate,
        'end': endDate
    }
};
console.log(dateTimeForCalander());
exports.insertEvent = async (req, res) => {
    const { summary, description, location, startDateTime, endDateTime } = req.body;
    const event = { summary, description, location, startDateTime, endDateTime };
    console.log(event);
    try {
        let response = await calendar.events.insert({
            auth: auth,
            calendarId: calendarId,
            requestBody: {
                summary: summary,
                description: description,
                location: location,
                colorId: "6",
                start: {
                    dateTime: new Date(startDateTime)
                },
                end: {
                    dateTime: new Date(endDateTime)
                }
            }
        });
        res.send(response);
    } catch (error) {
        console.log(`Error at insertEvent --> ${error}`);
        return 0;
    }
};
