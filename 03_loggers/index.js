import express from "express";
import env from "dotenv";
env.config();


const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

let teaData= [];
let nextId = 1;

// Create a new tea
app.post("/tea", (req, res) => {
    const { name,price  } = req.body;
    const newTea = { id: nextId++, name, price };
    teaData.push(newTea);
    res.status(201).send(newTea);
});

// Get all teas
app.get("/teas", (req, res) => {
    res.send(teaData);
});

// Get tea by ID
app.get("/tea/:id", (req, res) => {
    const teaId = parseInt(req.params.id, 10);
    const tea = teaData.find(t => t.id === teaId);  
    if (tea) {
        res.send(tea);
    }
    else {
        res.status(404).send({ error: "Tea not found" });
    }
});

// Update tea by ID
app.put("/tea/:id", (req, res) => {
    const teaId = parseInt(req.params.id, 10);
    const { name, price } = req.body;
    const teaIndex = teaData.findIndex(t => t.id === teaId);
    if (teaIndex !== -1) {
        teaData[teaIndex] = { id: teaId, name, price };
        res.send(teaData[teaIndex]);
    }
    else {
        res.status(404).send({ error: "Tea not found" });
    }
});

// Delete tea by ID
app.delete("/tea/:id", (req, res) => {
    const teaId = parseInt(req.params.id, 10);
    const teaIndex = teaData.findIndex(t => t.id === teaId);
    if (teaIndex !== -1) {
        const deletedTea = teaData.splice(teaIndex, 1);
        res.send(deletedTea[0]);
    }
    else {
        res.status(404).send({ error: "Tea not found" });
    }
});



// 404 handler
app.use((req, res) => {
  res.status(404).send({ error: "Route not found" });
});

// Basic route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});