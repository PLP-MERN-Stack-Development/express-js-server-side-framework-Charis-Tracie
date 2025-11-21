module.exports = (req, res, next) => {
    const { name, price, category } = req.body;

    if (!name || !price || !category) {
        return res.status(400).json({ message: "Name, price, and category are required" });
    }

    next();
};
