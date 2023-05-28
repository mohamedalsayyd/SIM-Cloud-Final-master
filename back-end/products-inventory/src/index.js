const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./models/db")
const productsRouter = require("./routes/productsRouter")

// Middleware
const app = express();
app.use(bodyParser.json());

// Routes
app.get("/api/inventory", (req, res) => {
  res.json({message: "products inventory default"});
});

app.use("/api/inventory/products", productsRouter)


// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

// Start server
const PORT = process.env.PORT || 3001;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://0.0.0.0:27017/products";

connectDB(MONGODB_URI)
.then( () => {
  console.log(`database connected on: ${MONGODB_URI}`)
  app.listen(PORT, () => console.log(`products inventory on: ${PORT}`))
})
.catch((err) => console.log(err.message));

