"use strict";
function parseString(input) {
    var _a, _b;
    var stack = [];
    var parts = input.split(" ");
    var operations = {
        "+": function () {
            var _a = topTwo(), first = _a[0], last = _a[1];
            stack.push(first + last);
            return false;
        },
        "-": function () {
            var _a = topTwo(), first = _a[0], last = _a[1];
            stack.push(first - last);
            return false;
        },
        "/": function () {
            var _a = topTwo(), first = _a[0], last = _a[1];
            stack.push(first / last);
            return false;
        },
        "*": function () {
            var _a = topTwo(), first = _a[0], last = _a[1];
            stack.push(first * last);
            return false;
        }
    };
    for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
        var part = parts_1[_i];
        if (((_b = (_a = operations)[part]) === null || _b === void 0 ? void 0 : _b.call(_a)) === undefined) {
            handleInput(part);
        }
    }
    if (stack.length !== 1) {
        throw Error("Invalid number of operations. Stack has " + stack.length);
    }
    else {
        return stack[0];
    }
    function handleInput(part) {
        var number = Number(part);
        if (isNaN(number)) {
            throw Error("Invalid input " + part);
        }
        else {
            stack.push(number);
        }
    }
    function topTwo() {
        var first = stack.pop();
        var second = stack.pop();
        if (first == null || second == null) {
            throw Error("Not enough operands on stack");
        }
        else {
            return [first, second];
        }
    }
}
