const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
	// useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true

}).then(() => console.log('Connected!')).catch((error) => console.error("MongoDB connection failed:", error.message));
