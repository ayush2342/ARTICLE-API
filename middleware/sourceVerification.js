
const sourceVerification = (req, res, next) => {
    const source = req.headers['custom-source']; 

    if (!source) {
        return res.status(400).json({ message: 'Source header is missing' });
    }

    const allowedSources = ['android-app', 'web-app']; 
    if (!allowedSources.includes(source)) {
        return res.status(403).json({ message: 'Forbidden: Invalid source' });
    }

    next(); 
};

module.exports = sourceVerification;
