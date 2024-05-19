const middleware = {
    validate : async (req, res, next) => {
        console.log("Middleware > Task > Validate");
        
        // Login can be added if needed

        next();
    }
};

module.exports = middleware;