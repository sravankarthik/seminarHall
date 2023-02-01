const router = require('express').Router();
const { auth } = require('google-auth-library');
const { google } = require("googleapis");

const GOOGLE_CLIENT_ID = '431101491201-0hl2j7m281i9pt6dp6hk4fu9jbv9rkk3.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET_ID = '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';
const oauth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET_ID, "http://localhost:3000");
const REFRESH_TOKEN = "1//0gsplTnu2LN_ZCgYIARAAGBASNwF-L9Ir9gPt9tIX5nxlqbLkCg_mpxqeUDsDXeGz2UQDfl7i9S7O3i-kGKYe_xEBY0Emc25V3ho"

router.get('/', async (req, res, next) => {
    res.send({ message: 'Ok api is working 🚀' });
});

router.post("/create-token", async (req, res, next) => {
    try {
        const { code } = req.body;
        const { tokens } = await oauth2Client.getToken(code);
        res.send(tokens);
    } catch (error) {
        next(error);
    }
})

// router.post("/create-event", async (req, res, next) => {
//     try {
//         const { summary, description, location, startDateTime, endDateTime } = req.body;
//         oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
//         const calendar = google.calendar('v3');
//         const response = await calendar.events.insert({
//             auth: oauth2Client,
//             calendarId: 'primary',
//             requestBody: {
//                 summary: summary,
//                 description: description,
//                 location: location,
//                 colorId: "6",
//                 start: {
//                     dateTime: new Date(startDateTime)
//                 },
//                 end: {
//                     dateTime: new Date(endDateTime)
//                 }
//             }
//         })
//         res.send(response);
//     } catch (error) {
//         next(error);
//     }
// })

module.exports = router;
