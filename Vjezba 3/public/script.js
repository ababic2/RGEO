let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
let points = [];
let polygonButtonCLicked = false;

canvas.addEventListener('click', function(event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    points.push({x, y});
    drawPoint(x, y);

    // dio zadatka 2
    if(polygonButtonCLicked === true) {
        // Check if point is inside or outside polygon
        let isInside = isPointInsidePolygon({x, y});
        let color = 'red';
        if (isInside) {
            ctx.fillStyle = 'green';
            color = 'green';
        } else {
            ctx.fillStyle = 'red';
        }
        drawPoint(x, y, color);
    }
});

function drawPoint(x, y, color = 'red') {
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function drawPolygon() {
    polygonButtonCLicked = true;

    if (points.length < 3) {
        alert('You need at least 3 points to draw a polygon!');
        return;
    }

    sortPointsClockwise();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }

    // Connect last point to the first point
    ctx.lineTo(points[0].x, points[0].y);

    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
}

// Funkcija prvo izračunava centroid tačaka, a zatim ih sortira prema uglu koji svaka tačka formira sa centroidom.
// Nakon sortiranja, tačke su raspoređene u redoslijedu koji osigurava da se poligon neće presijecati kada se iscrtava
function sortPointsClockwise() {
    // Find the centroid
    let cx = 0, cy = 0;
    for (let point of points) {
        cx += point.x;
        cy += point.y;
    }
    cx /= points.length;
    cy /= points.length;

    // Sort points by angle from the centroid
    points.sort((a, b) => {
        let angleA = Math.atan2(a.y - cy, a.x - cx);
        let angleB = Math.atan2(b.y - cy, b.x - cx);
        return angleA - angleB;
    });
}

function isPointInsidePolygon(point) {
    // RayCasting algorithm on yt: https://www.youtube.com/watch?v=01E0RGb2Wzo
    let x = point.x, y = point.y;
    let inside = false;
    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
        let xi = points[i].x, yi = points[i].y;
        let xj = points[j].x, yj = points[j].y;

        let intersect = ((yi > y) !== (yj > y)) &&
            (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}