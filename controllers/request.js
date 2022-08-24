const Request = require("../models/request");
const User = require("../models/user");
const https = require('https')
const accountSid = 'AC6a7f20b3285a56c1ce6981185d0fbf10';
const authToken = '0b08ee802a9d1ea806e1fac9ea0b08e8';
const client = require('twilio')(accountSid, authToken);

exports.createRequest = (req, res) => {
    req.body.user = req.profile;
    const request = new Request(req.body);
    request.save((err, request) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to save your request in DB"
            });
        }
        User.findByIdAndUpdate(
            { _id: req.body.user._id },
            { $push: { requests: request } },
            { new: true, useFindAndModify: false },
            (err, assignment) => {
                if (err || !assignment) {
                    return res.status(400).json({
                        error: "user was not able to update"
                    })
                }
                console.log("done");
            }
        )
        const data = JSON.stringify({
            phone: '918610141355',
            token: "d2b447ac23788d30022402b2d4349990ba19dfcd",
            text: JSON.stringify(req.bod)
        })

        const options = {
            hostname: 'whin.inutil.info',
            port: 443,
            path: '/whin',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        }

        const r = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)

            res.on('data', d => {
                process.stdout.write(d)
            })
        })

        r.on('error', error => {
            console.error(error)
        })

        r.write(data)
        r.end()
        res.json(request);
    });
};

exports.onSubmit = (req, res) => {
    display = { name: req.profile.name, email: req.profile.email, phone_number: req.profile.phone_number, user_category: req.profile.user_category, dates: req.body.dates, from: req.body.fromtimes, to: req.body.totimes, capacity: req.body.capacity, description: req.body.description };
    const data = JSON.stringify({
        phone: '918610141355',
        token: "d2b447ac23788d30022402b2d4349990ba19dfcd",
        text: JSON.stringify(display)
    })

    const options = {
        hostname: 'whin.inutil.info',
        port: 443,
        path: '/whin',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    }

    const r = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', d => {
            process.stdout.write(d)
        })
    })

    r.on('error', error => {
        console.error(error)
    })

    r.write(data)
    r.end()
    console.log(req.body);
    dates_array = req.body.dates;
    from_time_array = req.body.fromtimes;
    console.log(from_time_array, "hello");
    to_time_array = req.body.totimes;
    req.body.dates = undefined;
    req.body.fromtimes = undefined;
    req.body.totimes = undefined;

    for (let i = 0; i < dates_array.length; i++) {
        req.body.user = req.profile;
        req.body.date = dates_array[i];
        req.body.timefrom = from_time_array[i];
        req.body.timeto = to_time_array[i];
        console.log(req.body);
        const request = new Request(req.body);
        User.findByIdAndUpdate(
            { _id: req.body.user._id },
            { $push: { requests: request } },
            { new: true, useFindAndModify: false },
            (err, user) => {
                if (err || !user) {
                    return res.status(400).json({
                        error: "user was not able to update"
                    })
                }
                console.log("user updated");
            }
        )
        request.save((err, request) => {
            if (err) {
                return res.status(400).json({
                    error: "Failed to save your request in DB"
                });
            }
            // res.json(request);
        });
    }
    res.json("done");
}

exports.getRequestById = (req, res, next, id) => {
    Request.findById(id).exec((err, request) => {
        if (err || !request) {
            return res.status(400).json({
                error: "request hall was not found"
            })
        }
        req.request = request;
        next();
    })
}

exports.getRequest = (req, res) => {
    return res.json(req.request);
}

exports.getAllRequests = (req, res) => {
    Request.find().exec((err, requests) => {
        if (err || !requests) {
            return res.status(400).json({
                error: "request was not found"
            })
        }
        res.json(requests);
    })
}

exports.updateRequest = (req, res) => {
    //TODO
    Request.findByIdAndUpdate(
        { _id: req.request._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, request) => {
            if (err || !request) {
                return res.status(400).json({
                    error: "request was not able to update"
                })
            }
            res.json(request);
        }
    )
}

exports.deleteRequest = (req, res) => {
    const request = req.request;
    request.remove((err, x) => {
        if (err) {
            return res.status(400).json({
                error: "failed to delete request"
            });
        }
        res.json({ message: "deleted successfully" });
    })


}

exports.test = (req, res) => {
    client.messages
        .create({
            body: 'shubha laude',
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+918610141355'
        })
        .then(message => console.log(message.sid))
        .done();
    res.send("done");
}