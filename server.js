const express = require("express");
const {Pool} = require("pg");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
	user: "myntra_user",
	host: "192.168.29.137",
	database: "ecommerce",
	password: "myntra_pass",
	port: 5432,
});

app.get("/products",async (req,res) => {
	try {
		const result = await pool.query("SELECT * FROM products");
		res.json(result.rows);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Database Error"});
	}
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT} `);
});
