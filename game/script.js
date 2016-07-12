var valid = false, isAnimating = false, selected = "li4", space = {"number": 0, "className": "space", "id": "space"};
var tiles = [];

function div(x, y) {
    return Math.floor(x / y);
}

function createDiv(className, id, fn, text) {
    let div = document.createElement("div");
    div.className = className;
    div.id = id;
    if (className == "tile") {
        div.onclick = fn;
        div.onmouseover = tileNearSpaceHover;
        div.onmouseout  = tileNearSpaceHout;
        let label = document.createElement("label");
        label.innerHTML = text;
        div.appendChild(label);
    }
    return div;
}

function clear(obj) {
    while (obj.lastChild) obj.removeChild(obj.lastChild);
}

function classSwap(a, b) {
    let temp = a.className;
    a.className = b.className;
    b.className = temp;
}

function idSwap(a, b) {
    let temp = a.id;
    a.id = b.id;
    b.id = temp;
}

function labelSwap(a, b) {
    let temp = a.lastChild.innerHTML;
    a.lastChild.innerHTML = b.lastChild.innerHTML;
    b.lastChild.innerHTML = temp;
}

function Field() {
    this.generateLevel = function() {
        let f = document.getElementById("field");
        let n = document.getElementById(selected).innerHTML;
        clear(f);
        for (let i = 0; i < n; ++i) {
            f.appendChild(createDiv("row", "row" + i));
            for (let j = 0; j < n; ++j)
                f.lastChild.appendChild(createDiv("tile", i * n + j, moveTile, (i + 1) + j * n));
        }
        with (f.lastChild.lastChild) { className = space.className; id = space.id; }
        space.number = Math.pow(document.getElementById(selected).innerHTML*1, 2) - 1
    };
    this.createLevelSelectors = function() {
        let ul = document.getElementById("selector");
        for (let x, i = 3; i < 8; ++i) {
            x = document.createElement("li");
            x.className = "li-not-selected";
            x.id = "li" + i;
            x.innerHTML = i;
            x.onclick = this.setLevel;
            ul.appendChild(x);
        }
        document.getElementById(selected).className = "li-selected";
    }
    this.setLevel = function() {
        classSwap(this, document.getElementById(selected));
        idSwap(this, document.getElementById(selected));
        field.generateLevel();
    }
    this.shuffle = function() {
        let n = parseInt(document.getElementById(selected).innerHTML);
        let tiles = [];
        for (let i = 1, a, b; i < Math.pow(n, 2) - 1; ++i) {
            a = findTile(i); do { b = findTile(Math.floor(Math.random() * i)) } while(b.className == space.className);
            labelSwap(a, b);
        }
        let row = document.getElementById("field").firstChild;
        for (let i = 0; i < n; ++i) {
            let child = row.firstChild;
            for (let j = 0; j < n; ++j) {
                if ((i + 1) + j * n != child.lastChild.innerHTML) tiles.push((i + 1) + j * n);
                child = child.nextSibling;
            }
            row = row.nextSibling;
        }
        let sum = 0;
        for (let i = 0; i < tiles.length; ++i)
            for (let j = i + 1; j < tiles.length; ++j)
                if (tiles[i] > tiles[j]) ++sum;
        if (n % 2) {
            if (sum % 2)
            this.shuffle();
        }
        else if ((sum + 1) % 2)
            this.shuffle();
        else return;
    }
    this.checkAnswer = function() {
        let n = parseInt(document.getElementById(selected).innerHTML);
        let row = document.getElementById("field").firstChild;
        for (let i = 0; i < n; ++i) {
            let child = row.firstChild;
            for (let j = 0; j < n; ++j) {
                if ((i + 1) + j * n != child.lastChild.innerHTML) return;
                child = child.nextSibling;
            }
            row = row.nextSibling;
        }
        alert("You won!");
        field.shuffle();
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

function swapTile(a, b) {
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

function moveTile() {
    if (valid && !isAnimating) {
        isAnimating = true;
        swapTile(this, findTile(space.id));
        field.checkAnswer();
    }
}

function tileNearSpaceHover() {
    if (this.id == space.id) return;
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

function tileNearSpaceHout() {
    if (this.id == space.id) return;
    let id = parseInt(this.id);
    let n  = parseInt(document.getElementById(selected).innerHTML);
    if ((id + 1 == space.number && div(id + 1, n) == div(space.number, n)) ||
        (id - 1 == space.number && div(id - 1, n) == div(space.number, n)) ||
        (id + n == space.number) || (id - n == space.number)) {
        valid = false;
        this.className = "tile";
    }
    isAnimating = false;
}

function initialize() {
    field.createLevelSelectors();
    field.generateLevel();
}

var field = new Field();
window.onload = initialize;