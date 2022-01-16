const express = require("express");
const app = express();
require("dotenv").config();
const { MongoClient } = require("mongodb");
const cors = require("cors");
const port = process.env.PORT || 8000;

// middleware
app.use(cors());
app.use(express.json());

// mongoClient
const client = new MongoClient(process.env.URI);

async function run() {
  try {
    await client.connect();
    const database = client.db("d3_chart");

    const dataCollections = database.collection("data");

    // get all data
    app.get("/data", async (req, res) => {
      const result = await dataCollections.find({}).toArray();
      res.json(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Welcome to d3-dashboard server");
});

app.listen(port, () => {
  console.log("running at port: ", port);
});
