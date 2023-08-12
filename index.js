// node -i -e "$(< index.js)"
const mongoose = require("mongoose");
mongoose
	.connect("mongodb://127.0.0.1:27017/movieApp")
	.then(() => {
		console.log("CONNECTION OPEN!");
	})
	.catch((e) => {
		console.log("CONNECTION ERROR: ", e);
	});

const movieSchema = new mongoose.Schema({
	title: String,
	year: Number,
	score: Number,
	rating: String,
});
//creat a model class called Movie
const Movie = mongoose.model("Movie", movieSchema);

// const amadeus = new Movie({
// 	title: "Amadeus",
// 	year: 1986,
// 	score: 9.2,
// 	rating: "R",
// });
//insert many auto saves, but  it is a promise
// Movie.insertMany([
// 	{
// 		title: "101 Dalmations",
// 		year: 1996,
// 		score: 9.0,
// 		rating: "G",
// 	},
// 	{
// 		title: "Good Fellas",
// 		year: 1999,
// 		score: 9.5,
// 		rating: "R",
// 	},
// 	{
// 		title: "Vanilla Sky",
// 		year: 2003,
// 		score: 8.5,
// 		rating: "PG-13",
// 	},
// 	{
// 		title: "Matilda",
// 		year: 2000,
// 		score: 9.1,
// 		rating: "PG",
// 	},
// 	{
// 		title: "Grapes of Wrath",
// 		year: 1991,
// 		score: 9.0,
// 		rating: "PG-13",
// 	},
// 	{
// 		title: "Twister",
// 		year: 1990,
// 		score: 9.0,
// 		rating: "PG-13",
// 	},
// ]).then((data) => {
// 	console.log("IT WORKED");
// 	console.log(data);
// });
