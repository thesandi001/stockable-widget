function generateCoords(historical) {
    var min = 9999999,
    max = 0;

    for (var i in historical) {
        if (historical[i] < min) min = historical[i];
        if (historical[i] > max) max = historical[i];
    }
    
    var dx = historical.length; // 1st to 52nd week time axis (52-1)
    var dy = max - min;
    var chart_height = 100; // px
    var chart_width = 300; // px
    var safety_limit = 5; // px
    var x_step = (chart_width-safety_limit)/dx;
    var y_step = (chart_height-safety_limit)/dy;

    var x1 = 0,
        x2 = 0,
        y1 = 0,
        y2 = 0,
        coords = [];
    for (var i = 0; i < historical.length - 1; i++) {
        y1 = (max - historical[i]) * y_step;
        x2 = x2 + x_step;
        y2 = (max - historical[i + 1]) * y_step;
        coords[i] = {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2
        };
        x1 = x2;
    }
    return coords;
}

function generateSVG(coords) {
    var svg = '';
    svg += '<svg class="chart">\n';

    for (var i in coords) {
        svg += '<line x1="' + coords[i].x1 + '" y1="' + coords[i].y1 + '" x2="' + coords[i].x2 + '" y2="' + coords[i].y2 + '"/>\n';
    }

    svg += '</svg>\n';
    return svg;
}