let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let verticalLines = [];
let horizontalLines = [];
let lines = [];
let numLines = 10;

function clearCanvas(){
    verticalLines = [];
    horizontalLines = [];
    lines = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Line {
    constructor(x, y) {
        this.P = x;
        this.Q = y;
    }
}
function IsBetween(p, q, r) {
    return (p >= q || p >= r) && (p <= q || p <= r);
}

function IsPointBetween(P, P1, P2) {
    return IsBetween(P.x, P1.x, P2.x) && IsBetween(P.y, P1.y, P2.y);
}
function LineSegmentsIntersection(s1, s2) {
    // segment1: x1,x2,y
    // segment1: x,y1,y2
    let d = (s1.Q.x - s1.P.x) * (s2.P.y - s2.Q.y) - (s1.Q.y - s1.P.y) * (s2.P.x - s2.Q.x)
    let d1 = (s2.P.x - s1.P.x) * (s2.P.y - s2.Q.y) - (s2.P.y - s1.P.y) * (s2.P.x - s2.Q.x)
    let d2 = (s1.Q.x - s1.P.x) * (s2.P.y - s1.P.y) - (s1.Q.y - s1.P.y) * (s2.P.x - s1.P.x)

    let intersectionSet = new Set();

    if (d !== 0) {
       if(IsBetween(d1, 0, d) && IsBetween(d2, 0, d)) {
           intersectionSet.add(new Point(
               ((d - d1) * s1.P.x + d1 * s1.Q.x ) / d,
               ((d - d1) * s1.P.y + d1 * s1.Q.y ) / d
           ))
       }
    } else if(d1 === 0 && d2 === 0) {
        if (IsPointBetween(s1.P, s2.P, s2.Q)) {
            intersectionSet.add(s1.P);
        }
        if (IsPointBetween(s2.P, s1.P, s1.Q)) {
            intersectionSet.add(s2.P);
        }
        if (IsPointBetween(s1.Q, s2.P, s2.Q)) {
            intersectionSet.add(s1.Q);
        }
        if (IsPointBetween(s2.Q, s1.P, s1.Q)) {
            intersectionSet.add(s2.Q);
        }
    }

    return Array.from(intersectionSet);
}

function generateHorizonalAndVerticalLines() {
    // Broj horizontalnih i vertikalnih linija
    let n = 5; // Postavite željeni broj horizontalnih linija
    let m = 5; // Postavite željeni broj vertikalnih linija

    // Nasumično generiranje horizontalnih linija
    for (let i = 0; i < n; i++) {
        let y = Math.random() * canvas.height;
        let x1 = 0;
        let x2 = canvas.width;
        let P = new Point(x1, y)
        let Q = new Point(x2, y)
        horizontalLines.push(new Line(P, Q));
    }

    // Nasumično generiranje vertikalnih linija
    for (let i = 0; i < m; i++) {
        let x = Math.random() * canvas.width;
        let y1 = 0;
        let y2 = canvas.height;
        let P = new Point(x, y1)
        let Q = new Point(x, y2)
        verticalLines.push(new Line(P, Q));
    }

    // Provjera presjeka i crtanje linija
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "black";
    for (let hLine of horizontalLines) {
        for (let vLine of verticalLines) {
            ctx.strokeStyle = "green";
            ctx.beginPath();
            ctx.moveTo(hLine.P.x, hLine.P.y);
            ctx.lineTo(hLine.Q.x, hLine.Q.y);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(vLine.P.x, vLine.P.y);
            ctx.lineTo(vLine.Q.x, vLine.Q.y);
            ctx.stroke();

            let intersections = LineSegmentsIntersection(hLine, vLine);
            if (intersections.length > 0) {
                // Presjek postoji, bojimo linije i iscrtavamo presjek

                ctx.fillStyle = "red";
                for (let intersection of intersections) {
                    ctx.beginPath();
                    ctx.arc(intersection.x, intersection.y, 5, 0, Math.PI * 2);
                    ctx.fill();
                }

                // Ispis presjeka u konzoli
                console.log("Intersection:", intersections);
            }
        }
    }
}

function generateRandomLines() {
    for (let i = 0; i < numLines; i++) {
        let x1 = Math.random() * canvas.width;
        let y1 = Math.random() * canvas.height;
        let x2 = Math.random() * canvas.width;
        let y2 = Math.random() * canvas.height;
        let P = new Point(x1, y1)
        let Q = new Point(x2, y2)
        let line = new Line(P, Q)
        lines.push(line);

        ctx.strokeStyle = "green";
        ctx.beginPath();
        ctx.moveTo(line.P.x, line.P.y);
        ctx.lineTo(line.Q.x, line.Q.y);
        ctx.stroke();
    }

    for (let i = 0; i < lines.length; i++) {
        for (let j = i + 1; j < lines.length; j++) {
            let intersections = LineSegmentsIntersection(lines[i], lines[j]);
            if (intersections.length > 0) {
                // Presjek postoji, bojimo linije i iscrtavamo presjek
                ctx.fillStyle = "red";
                for (let intersection of intersections) {
                    ctx.beginPath();
                    ctx.arc(intersection.x, intersection.y, 5, 0, Math.PI * 2);
                    ctx.fill();
                }

                // Ispis presjeka u konzoli
                console.log("Intersection:", intersections);
            }
        }
    }

}