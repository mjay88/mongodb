const mongoose = require("mongoose");
mongoose
	.connect("mongodb://127.0.0.1:27017/shopApp")
	.then(() => {
		console.log("CONNECTION OPEN!");
	})
	.catch((e) => {
		console.log("CONNECTION ERROR: ", e);
	});
//built in validation
const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
		min: [0, "Price must be positive"],
	},
	onSale: {
		type: Boolean,
		default: false,
	},
	categories: [String],
	qty: {
		online: {
			type: Number,
			default: 0,
		},
		inStore: {
			type: Number,
			default: 0,
		},
	},
	size: {
		type: String,
		enum: ["S", "M", "L"],
	},
});

const Product = mongoose.model("Product", productSchema);

const bike = new Product({ name: "Mountain Bike", price: 599 });
bike
	.save()
	.then((data) => {
		console.log("it worked");
		console.log(data);
	})
	.catch((err) => {
		console.log("OH NO IT DIDNT WORK:", err);
	});

//model instance methods, affects one instance
//don't use arrow functions
productSchema.methods.toggleOnSale = function () {
	this.onSale = !this.onSale;
	//this refers to an individual instance of product
	return this.save(); //not a promise but a thenable object
};

productSchema.methods.productSchema.addCategory = function (newCat) {
	this.categories.push(newCat);
	return this.save();
};

//instance methods, affects all instances
productSchema.statics.fireSale = function () {
	return this.updateMany({}, { onSale: true, price: 1 });
};

const findProduct = async () => {
	const foundProduct = await Product.findOne({ name: "Mountain Bike" });
	console.log(foundProduct);
	await foundProduct.toggleOnSale();
	console.log(foundProduct);
	await foundProduct.addCategory("Outdoors");
	console.log(foundProduct);
};

Product.fireSale().then((res) => console.log(res));

// findProduct();
