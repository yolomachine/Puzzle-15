function createDiv(className, id, fn, text, spaceId) {
    let div = document.createElement("div");
    div.className = className;
    div.id = id;
    if (fn) div.onclick = fn;
    if (parseInt(id)) {
        let label = document.createElement("label");
        label.innerHTML = text;
        div.appendChild(label);
    }
    return div;
}

function Field() {
    this.clear = function(f) {
        while (f.lastChild) f.removeChild(f.lastChild);
    };

    this.generateLevel = function() {
        let f = document.getElementById("field");
        let n = document.getElementById("dimension").value;
        this.clear(f);
        for (let i = 0; i < n; ++i) {
            f.appendChild(createDiv("row", "row" + i, null, '', (n*n-1)));
            for (let j = 0; j < n; ++j)
                f.lastChild.appendChild(createDiv("tile", (i + 1) + j * n, this.tileMove(), (i + 1) + j * n, (n*n-1)));
        }
        f.lastChild.lastChild.className = "space";
    };

    this.tileMove = function() {

    }
}

function initialize() {
    field.generateLevel();
}

var field = new Field();
window.onload = initialize;