const mongoose = require("mongoose");
//below is mongo uri which is used to connect mongoDB . its copied from mongoDB compass
const mongoURI = "mongodb://127.0.0.1:27017/myNotes?directConnection=true";
mongoose.set("strictQuery", true);

const connectToMongo = async () => {
	await mongoose.connect(mongoURI, () => {
		console.log("Finally connected");
	});
};

module.exports = connectToMongo;
