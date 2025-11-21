let products = require("../data/products");

exports.getProducts = (req, res) => {
    let { search, category, minPrice, maxPrice, page = 1, limit = 5 } = req.query;

    let result = [...products];

    // Search
    if (search) {
        result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }

    // Category filter
    if (category) {
        result = result.filter(p => p.category === category);
    }

    // Price range
    if (minPrice) result = result.filter(p => p.price >= Number(minPrice));
    if (maxPrice) result = result.filter(p => p.price <= Number(maxPrice));

    // Pagination
    page = Number(page);
    limit = Number(limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginated = result.slice(startIndex, endIndex);

    res.json({
        page,
        limit,
        total: result.length,
        results: paginated
    });
};

exports.getProduct = (req, res) => {
    const product = products.find(p => p.id === Number(req.params.id));
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }
    res.json(product);
};

exports.createProduct = (req, res) => {
    const newProduct = {
        id: products.length + 1,
        ...req.body
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
};

exports.updateProduct = (req, res) => {
    const id = Number(req.params.id);
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        res.status(404);
        throw new Error("Product not found");
    }

    products[index] = { ...products[index], ...req.body };
    res.json(products[index]);
};

exports.deleteProduct = (req, res) => {
    const id = Number(req.params.id);
    const exists = products.some(p => p.id === id);

    if (!exists) {
        res.status(404);
        throw new Error("Product not found");
    }

    products = products.filter(p => p.id !== id);
    res.json({ message: "Product removed" });
};
