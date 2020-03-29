"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ListItem = /** @class */ (function () {
    function ListItem() {
    }
    return ListItem;
}());
var Jono = /** @class */ (function () {
    function Jono() {
        var _this = this;
        this.size = 0;
        /**
         * Muodosta uusi lista-alkio ja vie se jonon häntään
         */
        this.push = function (aData) {
            var _a;
            var listItem = new ListItem();
            listItem.data = aData;
            // jos päätä ei ole vielä aseta uusi alkio pääksi
            if (!_this.head) {
                _this.head = listItem;
            }
            else {
                // käy läpi alkiot ja aseta uusi jäsen jonon häntään
                var current = _this.head;
                while ((_a = current) === null || _a === void 0 ? void 0 : _a.prev) {
                    current = current.prev;
                }
                current.prev = listItem;
            }
            _this.size++;
        };
        /**
         * Poista ja palauta alkio jonon alusta.
         * Jos jono on tyhjä, palauta undefined
         */
        this.pop = function () {
            var _a;
            var prevHead = _this.head;
            _this.head = (_a = prevHead) === null || _a === void 0 ? void 0 : _a.prev;
            if (_this.size > 0) {
                _this.size--;
            }
            return prevHead;
        };
        /**
         * Tulosta pinon sisältö muuttamatta pinoa
         */
        this.printItems = function () {
            var _a;
            var current = _this.head;
            var items = [];
            while (current) {
                items.push((_a = current.data, (_a !== null && _a !== void 0 ? _a : "")));
                current = current.prev;
            }
            return items;
        };
        this.getSize = function () {
            return _this.size;
        };
    }
    return Jono;
}());
exports.Jono = Jono;
(function () {
    if (!window)
        return;
    var input = document.querySelector("#jono_input");
    var list = document.querySelector("#jono_lista");
    var addButton = document.querySelector("#jono_lisaa");
    var clearButton = document.querySelector("#jono_tyhjaa");
    var popButton = document.querySelector("#jono_ota_eka");
    var stack = new Jono();
    addButton.onclick = handleAdd;
    input.onkeypress = function (event) {
        if (event.keyCode === 13) {
            handleAdd();
        }
    };
    clearButton.onclick = function () {
        stack = new Jono();
        list.innerHTML = '';
    };
    popButton.onclick = function () {
        var _a, _b;
        input.value = (_b = (_a = stack.pop()) === null || _a === void 0 ? void 0 : _a.data, (_b !== null && _b !== void 0 ? _b : ""));
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
