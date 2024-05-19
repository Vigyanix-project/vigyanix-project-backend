const corsOptions = {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  };
  
  module.exports = corsOptions;