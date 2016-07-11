const tileSize = 100, borderWidth = 5, margin = 1;
var space = {"col": 0, "row": 0, "number": 0};
var valid = isAnimating = false, selected = "li4";

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
    this.generateLevel = function() {
        let f = document.getElementById("field");
        let n = document.getElementById(selected).innerHTML;
        clear(f);
        for (let i = 0; i < n; ++i) {
            f.appendChild(createDiv("row", "row" + i));
            for (let j = 0; j < n; ++j)
                f.lastChild.appendChild(createDiv("tile", i * n + j, tileMove, (i + 1) + j * n));
        }
        with (f.lastChild.lastChild) { className = "space"; id = "space"; }
        space.number = Math.pow(document.getElementById(selected).innerHTML*1, 2) - 1
        space.col = space.row = n-1;
    };
    this.shuffle = function() {
        for (let i = 1, a, b; i < Math.pow(document.getElementById(selected).innerHTML*1, 2) - 1; ++i) {
            a = findTile(i); do { b = findTile(Math.floor(Math.random() * i)) } while(b.className == "space");
            labelSwap(a, b);
        }
    }
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

function setLevel() {
    "use strict";
    classSwap(this, document.getElementById(selected));
    idSwap(this, document.getElementById(selected));
    field.generateLevel();
}

function classSwap(a, b) {
    "use strict";
    let temp = a.className;
    a.className = b.className;
    b.className = temp;
}

function idSwap(a, b) {
    "use strict";
    let temp = a.id;
    a.id = b.id;
    b.id = temp;
}

function labelSwap(a, b) {
    "use strict";
    let temp = a.lastChild.innerHTML;
    a.lastChild.innerHTML = b.lastChild.innerHTML;
    b.lastChild.innerHTML = temp;
}

function tileSwap(a, b) {
    "use strict";
    let aId = a.id, bId = b.id,
        aClassName = a.className = "tile",
        bClassName = b.className,
        aLabel = a.lastChild.innerHTML,
        bLabel = b.lastChild.innerHTML;

    a.id = bId; b.id = space.number;
    a.className = bClassName;
    b.className = aClassName;
    a.lastChild.innerHTML = bLabel;
    b.lastChild.innerHTML = aLabel;
    space.number = parseInt(aId);
}

function tileMove() {
    if (valid && !isAnimating) {
        isAnimating = true;
        tileSwap(this, findTile("space"));
    }
}

function div(x, y) {
    "use strict";
    return Math.floor(x / y);
}

function tileHover() {
    if (this.id == "space") return;
    let id = parseInt(this.id);
    let n = document.getElementById(selected).innerHTML*1;
    if ((id + 1 == space.number && div(id + 1, n) == div(space.number, n)) || 
        (id - 1 == space.number && div(id - 1, n) == div(space.number, n)) || 
        (id + n == space.number) || (id - n == space.number)) {
        valid = true;
        this.className = "tile-near-space";
    }
    isAnimating = false;
}

function tileHout() {
    if (this.id == "space") return;
    let id = parseInt(this.id);
    let n = parseInt(document.getElementById(selected).innerHTML);
    if ((id + 1 == space.number && div(id + 1, n) == div(space.number, n)) ||
        (id - 1 == space.number && div(id - 1, n) == div(space.number, n)) ||
        (id + n == space.number) || (id - n == space.number)) {
        valid = false;
        this.className = "tile";
    }
    isAnimating = false;
}

function initialize() {
    let ul = document.getElementById("selector");
    for (let x, i = 3; i < 8; ++i) {
        x = document.createElement("li");
        x.className = "li-not-selected";
        x.id = "li" + i;
        x.innerHTML = i;
        x.onclick = setLevel;
        ul.appendChild(x);
    }
    document.getElementById(selected).className = "li-selected";
    field.generateLevel();
}

var field = new Field();
window.onload = initialize;