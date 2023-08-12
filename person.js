//mongoose virtuals, doesn't exist in the database, just on the mongoose side.
const mongoose = require("mongoose");
mongoose
	.connect("mongodb://127.0.0.1:27017/shopApp")
	.then(() => {
		console.log("CONNECTION OPEN!");
	})
	.catch((e) => {
		console.log("CONNECTION ERROR: ", e);
	});

const personSchema = new mongoose.Schema({
	first: String,
	last: String,
});

personSchema.virtual("fullName").get(function () {
	return `${this.first} ${this.last}`;
});

//mongoose middleware
personSchema.pre("save", async function () {
	console.log("ABOUT TO SAVE");
});
personSchema.post("save", async function () {
	console.log("JUST SAVED");
});

const Person = mongoose.model("Person", personSchema);
