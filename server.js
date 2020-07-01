const express = require('express');

const app = express();

app.get('/api/customers', (req, res) => {
	const customers = [
		{ id: 1, firstName: 'John', lastName: 'Doe' },
		{ id: 2, firstName: 'Brad', lastName: 'Cooper' },
		{ id: 3, firstName: 'Mary', lastName: 'Swanson' },
	];

	res.json(customers);
});

const port = 5000;
// listening here
app.listen(port, () => `Server running on port ${port}`);
