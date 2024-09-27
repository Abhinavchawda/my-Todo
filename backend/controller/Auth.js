const { User } = require("../models/User")

exports.createUser = async (req, res) => {
    const user = req.body
    try {
        const newUser = new User({ email: user.email, role: user.role, password: user.password, name: user.name })
        const doc = await newUser.save()
        res.status(201).json({ id: doc.id, email: doc.email, role: user.role })
    }
    catch (err) {
        console.log("ERROR in createUser() in Auth.js")
        res.status(400).json(err)
    }
}

exports.loginUser = async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    try {
        if (!user) {
            res.status(400).json({ "message": "Login Failed" })
        }
        else if (user.password === req.body.password) {
            res.status(200).json({ id: user.id, name: user.name, email: user.email, addresses: user.addresses, role: user.role })
        }
        else {
            res.status(400).json({ "message": "Login failed" })
        }
    }
    catch (error) {
        res.status(400).json(error)
    }
}