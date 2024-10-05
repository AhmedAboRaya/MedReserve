const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('Authorization'); 

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, 'secretkey'); 
        req.user = decoded.userId; 
        next(); 
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' }, error.msg);
    }
};
