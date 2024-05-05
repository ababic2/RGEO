const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Postavka putanje za statičke datoteke (u ovom slučaju za HTML datoteku)
app.use(express.static(path.join(__dirname, 'zadatak1')));
app.use(express.static(path.join(__dirname, 'zadatak2')));
app.use(express.static(path.join(__dirname, 'zadatak3')));
app.use(express.static(path.join(__dirname, 'zadatak4')));
app.use(express.static(path.join(__dirname, 'zadatak5')));
app.use(express.static(path.join(__dirname, 'zadatak6')));
app.use(express.static(path.join(__dirname, 'zadatak7')));
app.use(express.static(path.join(__dirname, 'zadatak8')));

app.get('/closestPoint', (req, res) => {
    res.sendFile(path.join(__dirname, 'zadatak1', 'closestPoint.html'));
});

app.get('/curvePoints', (req, res) => {
    res.sendFile(path.join(__dirname, 'zadatak2', 'curvePoints.html'));
});
app.get('/bezierCurvePoints', (req, res) => {
    res.sendFile(path.join(__dirname, 'zadatak3', 'bezierCurvePoints.html'));
});
app.get('/convexHull', (req, res) => {
    res.sendFile(path.join(__dirname, 'zadatak4', 'convexHull.html'));
});
app.get('/grahamScan', (req, res) => {
    res.sendFile(path.join(__dirname, 'zadatak5', 'grahamScan.html'));
});
app.get('/bresenhamCircle', (req, res) => {
    res.sendFile(path.join(__dirname, 'zadatak6', 'bresenhamCircle.html'));
});
app.get('/grid', (req, res) => {
    res.sendFile(path.join(__dirname, 'zadatak7', 'grid.html'));
});
app.get('/tree', (req, res) => {
    res.sendFile(path.join(__dirname, 'zadatak8', 'tree.html'));
});

// Slušanje zahtjeva na odabranom portu
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});