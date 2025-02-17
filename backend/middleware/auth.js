const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(403).json({ error: "Accès refusé : Aucun token fourni" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        if (req.user.role !== "admin") {
            return res.status(403).json({ error: "Accès refusé : Vous n'êtes pas administrateur" });
        }

        next();
    } catch (err) {
        res.status(400).json({ error: "Token invalide" });
    }
};
