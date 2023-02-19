class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }

    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let framebuffer = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(framebuffer);
                break;
            case 1:
                this.drawSlide1(framebuffer);
                break;
            case 2:
                this.drawSlide2(framebuffer);
                break;
            case 3:
                this.drawSlide3(framebuffer);
                break;
        }

        this.ctx.putImageData(framebuffer, 0, 0);
    }

    // framebuffer:  canvas ctx image data
    drawSlide0(framebuffer) {
        let curveColor = [255, 0, 0, 255]; //Red
        let numEdges = this.num_curve_sections;

        // First Bezier curve
        let p0 = { x: 100, y: 100 };
        let p1 = { x: 150, y: 250 };
        let p2 = { x: 350, y: 50 };
        let p3 = { x: 400, y: 200 };
        this.drawBezierCurve(p0, p1, p2, p3, numEdges, curveColor, framebuffer);

        // Second Bezier curve
        let p4 = { x: 500, y: 250 };
        let p5 = { x: 550, y: 100 };
        let p6 = { x: 700, y: 200 };
        let p7 = { x: 650, y: 50 };
        this.drawBezierCurve(p4, p5, p6, p7, numEdges, curveColor, framebuffer);

        // Draw vertices if show_points is true
        if (this.show_points) {
            this.drawVertex(p0, curveColor, framebuffer);
            this.drawVertex(p1, curveColor, framebuffer);
            this.drawVertex(p2, curveColor, framebuffer);
            this.drawVertex(p3, curveColor, framebuffer);
            this.drawVertex(p4, curveColor, framebuffer);
            this.drawVertex(p5, curveColor, framebuffer);
            this.drawVertex(p6, curveColor, framebuffer);
            this.drawVertex(p7, curveColor, framebuffer);
        }
    }

    // framebuffer:  canvas ctx image data
    drawSlide1(framebuffer) {
        let center1 = { x: 150, y: 350 };
        let center2 = { x: 450, y: 250 };
        let radius = 100;
        let color1 = [255, 0, 0, 255];
        let color2 = [0, 0, 255, 255];

        // Draw circle 1
        this.drawCircle(center1, radius, this.num_curve_sections, color1, framebuffer);

        // Draw circle 2
        this.drawCircle(center2, radius, this.num_curve_sections, color2, framebuffer);

        //Draw vertices if show_points is true
        if (this.show_points) {
            this.drawVertex(center1, color1, framebuffer);
            this.drawVertex(center2, color1, framebuffer);
        }
    }

    // framebuffer:  canvas ctx image data
    drawSlide2(framebuffer) {
        // Polygon 1 with 5 vertices
        let polygon1 = [
            { x: 300, y: 100 },
            { x: 400, y: 150 },
            { x: 450, y: 250 },
            { x: 350, y: 300 },
            { x: 250, y: 200 },
        ];
        // Draw polygon 1
        this.drawConvexPolygon(polygon1, [255, 0, 0, 255], framebuffer);

        // Polygon 2 with 6 vertices
        let polygon2 = [
            { x: 100, y: 200 },
            { x: 200, y: 250 },
            { x: 250, y: 350 },
            { x: 200, y: 440 },
            { x: 100, y: 420 },
            { x: 50, y: 350 },
        ];
        // Draw polygon 2
        this.drawConvexPolygon(polygon2, [0, 255, 0, 255], framebuffer);
        
        // Draw vertices if show_points is true
        let vertColor = [0, 0, 255, 255]; //Blue
        if (this.show_points) {
            this.drawVertex({ x: 300, y: 100 }, vertColor, framebuffer);
            this.drawVertex({ x: 400, y: 150 }, vertColor, framebuffer);
            this.drawVertex({ x: 450, y: 250 }, vertColor, framebuffer);
            this.drawVertex({ x: 350, y: 300 }, vertColor, framebuffer);
            this.drawVertex({ x: 250, y: 200 }, vertColor, framebuffer);
            this.drawVertex({ x: 100, y: 200 }, vertColor, framebuffer);
            this.drawVertex({ x: 200, y: 250 }, vertColor, framebuffer);
            this.drawVertex({ x: 250, y: 350 }, vertColor, framebuffer);
            this.drawVertex({ x: 200, y: 440 }, vertColor, framebuffer);
            this.drawVertex({ x: 100, y: 420 }, vertColor, framebuffer);
            this.drawVertex({ x: 50, y: 350 }, vertColor, framebuffer);
        }
    }

    // framebuffer:  canvas ctx image data
    drawSlide3(framebuffer) {
        // colors
        let white = [255, 255, 255, 255];
        let red = [255, 0, 0, 255];
        let blue = [0, 0, 255, 255];
        let green = [0, 255, 0, 255];
        let yellow = [255, 255, 0, 255];

        // draw "J" using a bezier curve
        let jCurveStart = { x: 100, y: 200 };
        let jCurveP1 = { x: 150, y: 150 };
        let jCurveP2 = { x: 200, y: 150 };
        let jCurveEnd = { x: 200, y: 250 };
        this.drawBezierCurve(jCurveStart, jCurveP1, jCurveP2, jCurveEnd, 50, blue, framebuffer);

        // draw "a" using a filled-in convex polygon
        let aTopLeft = { x: 225, y: 150 };
        let aTopRight = { x: 300, y: 150 };
        let aBottomRight = { x: 275, y: 250 };
        let aBottomLeft = { x: 250, y: 250 };
        let aVertices = [aTopLeft, aTopRight, aBottomRight, aBottomLeft];
        this.drawConvexPolygon(aVertices, yellow, framebuffer);
        // draw circle in the middle of "A"
        let aCircleCenter = { x: 262.5, y: 200 };
        let aCircleRadius = 15;
        this.drawCircle(aCircleCenter, aCircleRadius, 30, green, framebuffer);

        // draw "c" using a bezier curve
        let cCurveStart = { x: 375, y: 150 };
        let cCurveP1 = { x: 325, y: 150 };
        let cCurveP2 = { x: 325, y: 250 };
        let cCurveEnd = { x: 375, y: 250 };
        this.drawBezierCurve(cCurveStart, cCurveP1, cCurveP2, cCurveEnd, 50, green, framebuffer);

        // draw "k" using a straight line
        let kLineStart = { x: 450, y: 150 };
        let kLineEnd = { x: 450, y: 250 };
        this.drawLine(kLineStart, kLineEnd, red, framebuffer);
        let kDiagonalStart = { x: 450, y: 200 };
        let kDiagonalEnd = { x: 500, y: 250 };
        this.drawLine(kDiagonalStart, kDiagonalEnd, red, framebuffer);
        let kDiagonal2Start = { x: 450, y: 200 };
        let kDiagonal2End = { x: 500, y: 150 };
        this.drawLine(kDiagonal2Start, kDiagonal2End, red, framebuffer);

        // Draw vertices if show_points is true
        let vertColor = [0, 0, 255, 255]; //Blue
        if (this.show_points) {
            this.drawVertex( jCurveStart, vertColor, framebuffer);
            this.drawVertex( jCurveP1, vertColor, framebuffer);
            this.drawVertex( jCurveP2, vertColor, framebuffer);
            this.drawVertex( jCurveEnd, vertColor, framebuffer);
            this.drawVertex( aTopLeft, vertColor, framebuffer);
            this.drawVertex( aTopRight, vertColor, framebuffer);
            this.drawVertex( aBottomRight, vertColor, framebuffer);
            this.drawVertex( aBottomLeft, vertColor, framebuffer);
            this.drawVertex( aCircleCenter, vertColor, framebuffer);
            this.drawVertex( cCurveStart, vertColor, framebuffer);
            this.drawVertex( cCurveP1, vertColor, framebuffer);
            this.drawVertex( cCurveP2, vertColor, framebuffer);
            this.drawVertex( cCurveEnd, vertColor, framebuffer);
            this.drawVertex( kLineStart, vertColor, framebuffer);
            this.drawVertex( kLineEnd, vertColor, framebuffer);
            this.drawVertex( kDiagonalStart, vertColor, framebuffer);
            this.drawVertex( kDiagonalEnd, vertColor, framebuffer);
            this.drawVertex( kDiagonal2Start, vertColor, framebuffer);
            this.drawVertex( kDiagonal2End, vertColor, framebuffer);
        }
    }

    // p0:           object {x: __, y: __}
    // p1:           object {x: __, y: __}
    // p2:           object {x: __, y: __}
    // p3:           object {x: __, y: __}
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawBezierCurve(p0, p1, p2, p3, num_edges, color, framebuffer) {
        let imageData = framebuffer.data;
        let width = framebuffer.width;
        let tStep = 1 / num_edges;
        let lastPoint = { x: p0.x, y: p0.y };

        for (let i = 1; i <= num_edges; i++) {
            let t = tStep * i;
            let tt = t * t;
            let ttt = tt * t;
            let u = 1 - t;
            let uu = u * u;
            let uuu = uu * u;

            let x = uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x;
            let y = uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y;

            let currentPoint = { x: Math.round(x), y: Math.round(y) };
            this.drawLine(lastPoint, currentPoint, color, framebuffer);
            lastPoint = currentPoint;
        }
    }

    // center:       object {x: __, y: __}
    // radius:       int
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawCircle(center, radius, num_edges, color, framebuffer) {
        //Using the Bezier curve to draw the sections of the circle.
        let C = 0.551915024494;
        let x = center.x;
        let y = center.y;
        let r = radius;
        let P0 = { x: x + r, y: y };
        let P1 = { x: x + r, y: y + r * C };
        let P2 = { x: x + r * C, y: y + r };
        let P3 = { x: x, y: y + r };
        this.drawBezierCurve(P0, P1, P2, P3, num_edges / 4, color, framebuffer);

        let P4 = { x: x, y: y + r };
        let P5 = { x: x - r * C, y: y + r };
        let P6 = { x: x - r, y: y + r * C };
        let P7 = { x: x - r, y: y };
        this.drawBezierCurve(P4, P5, P6, P7, num_edges / 4, color, framebuffer);

        let P8 = { x: x - r, y: y };
        let P9 = { x: x - r, y: y - r * C };
        let P10 = { x: x - r * C, y: y - r };
        let P11 = { x: x, y: y - r };
        this.drawBezierCurve(P8, P9, P10, P11, num_edges / 4, color, framebuffer);

        let P12 = { x: x, y: y - r };
        let P13 = { x: x + r * C, y: y - r };
        let P14 = { x: x + r, y: y - r * C };
        let P15 = { x: x + r, y: y };
        this.drawBezierCurve(P12, P13, P14, P15, num_edges / 4, color, framebuffer);
    }

    // vertex_list:  array of object [{x: __, y: __}, {x: __, y: __}, ..., {x: __, y: __}]
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawConvexPolygon(vertex_list, color, framebuffer) {
        let num_vertices = vertex_list.length;
        if (num_vertices < 3) {
            console.error('Error: A convex polygon requires at least 3 vertices.');
            return;
        }

        // Draw triangles using the first vertex as a fixed point
        for (let i = 1; i < num_vertices - 1; i++) {
            let p0 = vertex_list[0];
            let p1 = vertex_list[i];
            let p2 = vertex_list[i + 1];
            this.drawTriangle(p0, p1, p2, color, framebuffer);
        }
    }

    // v:            object {x: __, y: __}
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawVertex(vertex, color, framebuffer) {
        let x = vertex.x;
        let y = vertex.y;
        let size = 4;
        let halfSize = size / 2;

        // Draw two intersecting lines that make an "x"
        let p0 = { x: x - halfSize, y: y - halfSize };
        let p1 = { x: x + halfSize, y: y + halfSize };
        this.drawLine(p0, p1, color, framebuffer);
        let p2 = { x: x - halfSize, y: y + halfSize };
        let p3 = { x: x + halfSize, y: y - halfSize };
        this.drawLine(p2, p3, color, framebuffer);
    }

    /***************************************************************
     ***       Basic Line and Triangle Drawing Routines          ***
     ***       (code provided from in-class activities)          ***
     ***************************************************************/
    pixelIndex(x, y, framebuffer) {
        return 4 * y * framebuffer.width + 4 * x;
    }

    setFramebufferColor(framebuffer, px, color) {
        framebuffer.data[px + 0] = color[0];
        framebuffer.data[px + 1] = color[1];
        framebuffer.data[px + 2] = color[2];
        framebuffer.data[px + 3] = color[3];
    }

    swapPoints(a, b) {
        let tmp = { x: a.x, y: a.y };
        a.x = b.x;
        a.y = b.y;
        b.x = tmp.x;
        b.y = tmp.y;
    }

    drawLine(p0, p1, color, framebuffer) {
        if (Math.abs(p1.y - p0.y) <= Math.abs(p1.x - p0.x)) { // |m| <= 1
            if (p0.x < p1.x) {
                this.drawLineLow(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineLow(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
        else {                                        // |m| > 1
            if (p0.y < p1.y) {
                this.drawLineHigh(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineHigh(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
    }

    drawLineLow(x0, y0, x1, y1, color, framebuffer) {
        let A = y1 - y0;
        let B = x0 - x1;
        let iy = 1;
        if (A < 0) {
            iy = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let x = x0;
        let y = y0;
        let px;
        while (x <= x1) {
            px = this.pixelIndex(x, y, framebuffer);
            this.setFramebufferColor(framebuffer, px, color);
            x += 1;
            if (D <= 0) {
                D += 2 * A;
            }
            else {
                D += 2 * A + 2 * B;
                y += iy;
            }
        }
    }

    drawLineHigh(x0, y0, x1, y1, color, framebuffer) {
        let A = x1 - x0;
        let B = y0 - y1;
        let ix = 1;
        if (A < 0) {
            ix = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let x = x0;
        let y = y0;
        let px;
        while (y <= y1) {
            px = this.pixelIndex(x, y, framebuffer);
            this.setFramebufferColor(framebuffer, px, color);
            y += 1;
            if (D <= 0) {
                D += 2 * A;
            }
            else {
                D += 2 * A + 2 * B;
                x += ix;
            }
        }
    }

    drawTriangle(p0, p1, p2, color, framebuffer) {
        // Sort points in ascending y order
        if (p1.y < p0.y) this.swapPoints(p0, p1);
        if (p2.y < p0.y) this.swapPoints(p0, p2);
        if (p2.y < p1.y) this.swapPoints(p1, p2);

        // Edge coherence triangle algorithm
        // Create initial edge table
        let edge_table = [
            { x: p0.x, inv_slope: (p1.x - p0.x) / (p1.y - p0.y) }, // edge01
            { x: p0.x, inv_slope: (p2.x - p0.x) / (p2.y - p0.y) }, // edge02
            { x: p1.x, inv_slope: (p2.x - p1.x) / (p2.y - p1.y) }  // edge12
        ];

        // Do cross product to determine if pt1 is to the right/left of edge02
        let v01 = { x: p1.x - p0.x, y: p1.y - p0.y };
        let v02 = { x: p2.x - p0.x, y: p2.y - p0.y };
        let p1_right = ((v01.x * v02.y) - (v01.y * v02.x)) >= 0;

        // Get the left and right edges from the edge table (lower half of triangle)
        let left_edge, right_edge;
        if (p1_right) {
            left_edge = edge_table[1];
            right_edge = edge_table[0];
        }
        else {
            left_edge = edge_table[0];
            right_edge = edge_table[1];
        }
        // Draw horizontal lines (lower half of triangle)
        for (let y = p0.y; y < p1.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) {
                this.drawLine({ x: left_x, y: y }, { x: right_x, y: y }, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }

        // Get the left and right edges from the edge table (upper half of triangle) - note only one edge changes
        if (p1_right) {
            right_edge = edge_table[2];
        }
        else {
            left_edge = edge_table[2];
        }
        // Draw horizontal lines (upper half of triangle)
        for (let y = p1.y; y < p2.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) {
                this.drawLine({ x: left_x, y: y }, { x: right_x, y: y }, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
    }
};
