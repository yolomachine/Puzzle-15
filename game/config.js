function Field() {
    var tiles;
    var space = { "i": 0, "j": 0 };

    this.clear = function(f) {
        var child = f.lastChild;
        while (child != undefined)  { f.removeChild(child); child = f.lastChild; }
    }

    this.generate = function() {
        var n = document.getElementById("dimension").value;
        var f = document.getElementById("field");
        this.clear(f);
        tiles = new Array(n);
        for (var i = 0; i < n; ++i) {
            tiles[i] = new Array(n);
            f.appendChild(document.createElement("div")).className = "row";
            for (var j = 0; j < n; ++j) {
                f.lastChild.appendChild(document.createElement("div")).className = "tile";
                tiles[i][j] = f.lastChild.lastChild;
            }
        }
        f.lastChild.lastChild.className = "space";
        space.i = n;
        space.j = n - 1;
    }

    this.click = function() {

    }

    this.swapTiles = function(a, b) {
        var temp = a;
        a = b;
        b = temp;
    }
}

var field = new Field();
