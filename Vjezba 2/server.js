const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Postavka putanje za statičke datoteke (u ovom slučaju za HTML datoteku)
app.use(express.static(path.join(__dirname, 'public')));

// Posluživanje HTML datoteke na ruti /drawVertexOnClick
app.get('/draw', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'drawVertexOnClick.html'));
});

// Slušanje zahtjeva na odabranom portu
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
