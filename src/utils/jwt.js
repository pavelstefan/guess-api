const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1800s' });
}

function validateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null)  {
        return res.status(401).json({
            status: 401,
            data: null,
            message: 'Unauthorized'
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(403).json({
                status: 403,
                data: null,
                message: err.message
            });
        }

        req.user = user;

        next();
    });
}

module.exports = {
    generateAccessToken,
    validateToken
}