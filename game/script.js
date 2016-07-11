const tileSize = 100, borderWidth = 5, margin = 1;
var space = {"col": 0, "row": 0, "number": 0};
var valid = false;

function getTopPos(id, n) {
    return (tileSize + 2 * borderWidth) * Math.floor(id / n);
}

function getLeftPos(id, n) {
    return (tileSize + 2 * borderWidth) * (id - Math.floor(id / n) * n);
}

function createDiv(className, id, fn, text) {
    let div = document.createElement("div");
    div.className = className;
    div.id = id;
    if (className == "tile") {
        div.onclick = fn;
        div.onmouseover = tileHover;
        div.onmouseout  = tileHout;
        let label = document.createElement("label");
        label.innerHTML = text;
        div.appendChild(label);
    }
    return div;
}

function clear(obj) {
    while (obj.lastChild) obj.removeChild(obj.lastChild);
}

function animate() {

}

function Field() {
    var tileColor;
    this.setTileColor = function(c) {
        tileColor = c;
    };
    this.getTileColor = function() {
        return tileColor;
    }

    this.generateLevel = function() {
        let f = document.getElementById("field");
        let n = document.getElementById("dimension").value;
        clear(f);
        for (let i = 0; i < n; ++i) {
            f.appendChild(createDiv("row", "row" + i));
            for (let j = 0; j < n; ++j)
                f.lastChild.appendChild(createDiv("tile", (i + 1) + j * n, tileMove, (i + 1) + j * n));
        }
        with (f.lastChild.lastChild) { className = "space"; id = "space"; };
        space.number = f.lastChild.previousSibling.lastChild.id*1 + 1;
        space.col = space.row = n-1;
    };
}

function findTile(id) {
    let row = document.getElementById("field").lastChild;
    while (row) {
       let child = row.lastChild;
         while (child) {
             if (child.id == id) return child;
             child = child.previousSibling;
         }
        row = row.previousSibling;
    }
}

function tileMove() {
    if (valid) {
        let spaceTile = findTile("space");
        let tileId = this.id, spaceId = "space";
        let tileClassName = "tile", spaceClassName = "space";
        let tileLabel = this.lastChild.innerHTML, spaceLabel = spaceTile.lastChild.innerHTML;

        this.id = spaceId; spaceTile.id = spaceLabel;
        this.className = spaceClassName; spaceTile.className = tileClassName;
        this.lastChild.innerHTML = spaceTile.lastChild.innerHTML = tileLabel;

        space.number = parseInt(tileLabel);
    };
}

function tileHover() {
    if (this.id == "space") return;
    field.setTileColor(this.style.backgroundColor);
    let id = parseInt(this.id);
    let n = document.getElementById("dimension").value*1;
    if ((id + 1 == space.number) || (id - 1 == space.number) || (id + n == space.number) || (id - n == space.number)) {
        valid = true;
        this.style.backgroundColor = "#00B16A";
    }
}

function tileHout() {
    if (this.id == "space") return;
    let id = parseInt(this.id);
    let n = document.getElementById("dimension").value*1;
    if ((id + 1 == space.number) || (id - 1 == space.number) || (id + n == space.number) || (id - n == space.number)) {
        valid = false;
        this.style.backgroundColor = field.getTileColor();
    }
}

function initialize() {
    field.generateLevel();
}

var field = new Field();
window.onload = initialize;