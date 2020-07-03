const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/quizzler");


app.get('/api/customers', (req, res) => {
	const customers = [
		{ id: 1, firstName: 'John', lastName: 'Doe' },
		{ id: 2, firstName: 'Brad', lastName: 'Cooper' },
		{ id: 3, firstName: 'Mary', lastName: 'Swanson' },
	];

	res.json(customers);
});


// listening here
app.listen(PORT, () => {
	console.log(`🌎 ==> API server now on port ${PORT}!`);
  });
  