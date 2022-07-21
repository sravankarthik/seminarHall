const Seminar = require("../models/seminar");

exports.createSeminar = (req, res) => {
    const seminar = new Seminar(req.body);
    seminar.save((err, seminar) => {
        if (err) {
            return res.status(400).json({
                error: "NOT able to save seminar in DB"
            });
        }
        res.json({ seminar });
    });
};


exports.getSeminarById = (req, res, next, id) => {
    Seminar.findById(id).exec((err, seminar) => {
        if (err || !seminar) {
            return res.status(400).json({
                error: "seminar hall was not found"
            })
        }
        req.seminar = seminar;
        next();
    })
}

exports.getSeminar = (req, res) => {
    return res.json(req.seminar);
}

exports.getAllSeminars = (req, res) => {
    Seminar.find().exec((err, seminar) => {
        if (err || !seminar) {
            return res.status(400).json({
                error: "seminar was not found"
            })
        }
        res.json(seminar);
    })
}

exports.updateSeminar = (req, res) => {
    Seminar.findByIdAndUpdate(
        { _id: req.seminar._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, seminar) => {
            if (err || !seminar) {
                return res.status(400).json({
                    error: "seminar was not able to update"
                })
            }
            res.json(seminar);
        }
    )
}

exports.deleteSeminar = (req, res) => {
    const seminar = req.seminar;
    seminar.remove((err, x) => {
        if (err) {
            return res.status(400).json({
                error: "failed to delete job"
            });
        }
        res.json({ message: "deleted successfully" });
    })


}