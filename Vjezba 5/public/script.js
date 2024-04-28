// Initialize variables
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let points = [];

// Add event listener for mouse click
canvas.addEventListener('click', function(event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    points.push({x: x, y: y});

    // Draw point
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();

    // Display coordinates
    ctx.font = "10px Arial";
    ctx.fillText(`(${x}, ${y})`, x + 5, y - 5); // Adjust text position as needed
});

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    points = []; // Clear the points array
}

// Function to generate convex hull
function generateConvexHull(type) {
    let hull = null;
    if(type === 'triangle') {
        hull = convexHullBruteForceVeryBad(points); // Call your method to generate convex hull
    } else if(type === 'line'){
        hull = convexHullBruteForceClassic(points);
    }
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(hull[0].x, hull[0].y);
    for (let i = 1; i < hull.length; i++) {
        ctx.lineTo(hull[i].x, hull[i].y);
    }
    ctx.closePath();
    ctx.stroke();
}

function isInsideTriangle(P, triangle) {
    let p = triangle[0]
    let q = triangle[1]
    let r = triangle[2]
    let s = orientationOfThreePoints(p, q, r);
    let s1 = orientationOfThreePoints(P, p, q);
    let s2 = orientationOfThreePoints(P, q, r);
    let s3 = orientationOfThreePoints(P, r, p);
    return s1 === s2 && s2 === s3  && s3 === s;
}
// Function to calculate the orientation of three points
function orientationOfThreePoints(p1, p2, p3) {
    return sgn(threePointsCross(p1, p2, p3));
}

function sgn(x) {
    return x > 0 ? 1 : x < 0 ? -1 : 0;
}

// Function to calculate the cross product of three points
function threePointsCross(p1, p2, p3) {
    return (p2.x - p1.x) * (p3.y - p1.y) - (p3.x - p1.x) * (p2.y - p1.y);
}


// Function to calculate convex hull using brute force method - triangle
function convexHullBruteForceVeryBad(P) {
    let n = P.length;
    let V = [];

    for (let p = 0; p < n; p++) {
        let t = true;
        let i = 0;

        while (t && i < n) {
            if (i !== p) {
                let j = i + 1;

                while (t && j < n) {
                    if (j !== p) {
                        let k = j + 1;

                        while (t && k < n) {
                            if (k !== p && isInsideTriangle(P[p], [P[i], P[j], P[k]])) {
                                t = false;
                            }
                            k++;
                        }
                    }
                    j = j + 1;
                }
            }
            i = i + 1;
        }
        if (t) {
            V.push(P[p]);
        }
    }
    V = makeSimplePolygon(V);
    return V;
}


// Function to calculate convex hull using brute force method - LINES
function convexHullBruteForceClassic(P) {
    let n = P.length;
    let B = new Array(n);
    for (let i = 0; i < n; i++) {
        B[i] = false;
    }
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (!arePointsEqual(P[i], P[j])) {
                if (arePointsOnSameSideOfLine(P, lineThroughTwoPoints(P[i], P[j]))) {
                    B[i] = true;
                    B[j] = true;
                }
            }
        }
    }

    let result = [];
    for (let i = 0; i < n; i++) {
        if (B[i]) {
            result.push(P[i])
        }
    }
    result = makeSimplePolygon(result)
    return result;
}
//Function to check if two points are equal
function arePointsEqual(p1, p2) {
    return p1.x === p2.x && p1.y === p2.y;
}

function arePointsOnSameSideOfLine(S, line) {
    let s = 0;

    for (let i = 0; i < S.length; i++) {
        let P = S[i];
        let t = line.u * P.x + line.v * P.y + line.w;

        if (t !== 0) {
            if (s === 0) {
                s = sgn(t);
            } else if (s * t < 0) {
                return false;
            }
        }
    }

    return true;
}

function lineThroughTwoPoints(p1, p2) {
    let line = {};
    line.u = p2.y - p1.y;
    line.v = p1.x - p2.x;
    line.w = p1.y * p2.x - p1.x * p2.y;
    return line;
}

// Function to create a simple polygon from a list of points
function makeSimplePolygon(P) {
    sortPointsByAngle(P);
    let result = [];
    result.push(P[0])
    for (let i = 1; i < P.length; i++) {
        if (!arePointsEqual(P[i], P[i - 1])) {
            result.push(P[i]);
        }
    }
    return result;
}

// Function to sort points by angle with respect to a reference point Q
function sortPointsByAngle(P) {
    // Find the index of the leftmost point
    let leftmostIndex = indexOfLeftmostPoint(P);

    let Q = P[leftmostIndex];

    // Comparator function to compare points by angle with respect to Q
    function compare(R, S) {
        let s = threePointsCross(Q, R, S);
        if (s !== 0) {
            return s > 0;
        } else {
            // If the points are collinear, compare by distance to the reference point
            return (Math.abs(R.x - Q.x) < Math.abs(S.x - Q.x)) ||
                (Math.abs(R.y - Q.y) < Math.abs(S.y - Q.y));
        }
    }

    // Sort the points using the comparator function
    P.sort(compare);

    return P;
}

// Function to find the index of the leftmost point in an array of points P
function indexOfLeftmostPoint(P) {
    let leftmostIndex = 0; // Assume the first point is the leftmost initially
    for (let i = 1; i < P.length; i++) {
        if (isFirstPointLeftOf(P[i], P[leftmostIndex])) {
            leftmostIndex = i;
        }
    }
    return leftmostIndex;
}

// Function to check if a point P1 is to the left of another point P2
function isFirstPointLeftOf(P1, P2) {
    return P1.x < P2.x || (P1.x === P2.x && P1.y < P2.y);
}
