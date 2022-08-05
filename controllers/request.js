const Request = require("../models/request");

exports.createRequest = (req, res) => {
    req.body.user = req.profile;
    const request = new Request(req.body);
    request.save((err, request) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to save your request in DB"
            });
        }
        res.json(request);
    });
};

exports.onSubmit = (req, res) => {
    dates_array = req.body.dates;
    duration_array = req.body.durations;
    req.body.dates = undefined;
    req.body.durations = undefined;
    console.log(dates_array, duration_array);
    for (let i = 0; i < dates_array.length; i++) {
        req.body.user = req.profile;
        req.body.date = dates_array[i];
        req.body.duration = duration_array[i];
        const request = new Request(req.body);
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