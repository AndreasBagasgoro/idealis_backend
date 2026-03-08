const requestLogger = (req, res, next) => {
    const start = Date.now();
    
    // Log request
    console.log(`📥 [${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    
    // Log response when finished
    res.on('finish', () => {
        const duration = Date.now() - start;
        const statusColor = res.statusCode >= 400 ? '🔴' : '🟢';
        console.log(
            `${statusColor} [${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`
        );
    });
    
    next();
};

module.exports = requestLogger;