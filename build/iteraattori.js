"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Iterator = /** @class */ (function () {
    function Iterator(pino) {
        var _this = this;
        this.hasNext = function () {
            return _this.current !== undefined;
        };
        this.next = function () {
            if (_this.current) {
                var oldCurrent = _this.current;
                _this.current = _this.current.next;
                return oldCurrent;
            }
            else {
                return undefined;
            }
        };
        this.pino = pino;
        this.current = pino.top;
    }
    return Iterator;
}());
exports.Iterator = Iterator;
var ListItem = /** @class */ (function () {
    function ListItem() {
    }
    return ListItem;
}());
var Stack = /** @class */ (function () {
    function Stack() {
        var _this = this;
        this.size = 0;
        /**
         * Muodosta uusi lista-alkio ja vie se pinon huipulle
         */
        this.push = function (aData) {
            var listItem = new ListItem();
            listItem.data = aData;
            listItem.next = _this.top;
            _this.top = listItem;
            _this.size++;
        };
        /**
         * Poista ja palauta alkio pinon huipulta.
         * Jos pino on tyhjä, palauta null
         */
        this.pop = function () {
            var _a;
            var prevTop = _this.top;
            _this.top = (_a = prevTop) === null || _a === void 0 ? void 0 : _a.next;
            if (_this.size > 0) {
                _this.size--;
            }
            return prevTop;
        };
        /**
         * Tulosta pinon sisältö muuttamatta pinoa
         */
        this.printItems = function () {
            var _a;
            var current = _this.top;
            var items = [];
            while (current) {
                items.push((_a = current.data, (_a !== null && _a !== void 0 ? _a : "")));
                current = current.next;
            }
            return items;
        };
        this.getSize = function () {
            return _this.size;
        };
    }
    return Stack;
}());
(function () {
    if (!window)
        return;
    var start = document.querySelector("#iteraattori_aloita");
    var next = document.querySelector("#iteraattori_seuraava");
    var list = document.querySelector("#iteraattori_lista");
    var current = document.querySelector("#iteraattori_nykyinen");
    var stack = new Stack();
    var iterator = new Iterator(stack);
    start.onclick = function () {
        next.disabled = false;
        current.innerHTML = "[ei tietoa]";
        stack = new Stack();
        for (var i = 0; i < 5; i++) {
            stack.push("" + Math.floor(Math.random() * 100));
        }
        reDisplayStack();
        iterator = new Iterator(stack);
    };
    next.onclick = function () {
        var _a, _b;
        current.innerText = (_b = (_a = iterator.next()) === null || _a === void 0 ? void 0 : _a.data, (_b !== null && _b !== void 0 ? _b : ""));
        if (!iterator.hasNext()) {
            next.disabled = true;
        }
        reDisplayStack();
    };
    function reDisplayStack() {
        list.innerHTML = '';
        stack.printItems().forEach(function (item) {
            var li = document.createElement("li");
            li.innerText = item;
            list.appendChild(li);
        });
    }
})();
