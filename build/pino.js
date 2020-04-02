"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
            var prevTop = _this.top;
            _this.top = prevTop === null || prevTop === void 0 ? void 0 : prevTop.next;
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
                items.push((_a = current.data) !== null && _a !== void 0 ? _a : "");
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
exports.Stack = Stack;
(function () {
    if (!window)
        return;
    var input = document.querySelector("#pino_input");
    var list = document.querySelector("#pino_lista");
    var addButton = document.querySelector("#pino_lisaa");
    var clearButton = document.querySelector("#pino_tyhjaa");
    var popButton = document.querySelector("#pino_ota_eka");
    var stack = new Stack();
    addButton.onclick = handleAdd;
    input.onkeypress = function (event) {
        if (event.keyCode === 13) {
            handleAdd();
        }
    };
    clearButton.onclick = function () {
        stack = new Stack();
        list.innerHTML = '';
    };
    popButton.onclick = function () {
        var _a, _b;
        input.value = (_b = (_a = stack.pop()) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : "";
        reDisplayStack();
    };
    function handleAdd() {
        if (!input.value)
            return;
        stack.push(input.value);
        input.value = "";
        reDisplayStack();
    }
    function reDisplayStack() {
        list.innerHTML = '';
        stack.printItems().forEach(function (item) {
            var li = document.createElement("li");
            li.innerText = item;
            list.appendChild(li);
        });
    }
})();
