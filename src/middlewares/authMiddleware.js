const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send({ success: false, error: "No token provided!" });

    const parts = authHeader.split(' ');
    if (!parts.lenght === 2) return res.status(401).send({ success: false, error: "Token error!" });

    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) return res.status(401).send({ success: false, error: "Token malformatted!" });

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return res.status(401).send({ success: false, error: "Token invalid!" });

        req.userId = decoded.id;
        req.userEmail = decoded.email;
        req.userName = decoded.name;
        return next();
    })
}