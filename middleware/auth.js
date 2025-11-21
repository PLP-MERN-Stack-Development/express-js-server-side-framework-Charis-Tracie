module.exports = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token || token !== process.env.API_KEY) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    next();
};
