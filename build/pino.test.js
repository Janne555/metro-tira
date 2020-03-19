"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pino_1 = require("./pino");
sen("pitäisi tulostaa alkiot", function () {
    var messages = ["Lorem", "ipsum", "dolor", "sit", "amet"];
    var stack = new pino_1.Stack();
    messages.forEach(function (message) {
        stack.push(message);
    });
    var tuloste = stack.printItems();
    return tuloste === ["amet", "sit", "dolor", "ipsum", "Lorem"];
});
sen("pitäisi olla oikean kokoinen", function () {
    var messages = ["Lorem", "ipsum", "dolor", "sit", "amet"];
    var stack = new pino_1.Stack();
    messages.forEach(function (message) {
        stack.push(message);
    });
    return stack.size === 5;
});
sen("pitäisi poistaa alkio päältä", function () {
    var messages = ["Lorem", "ipsum", "dolor", "sit", "amet"];
    var stack = new pino_1.Stack();
    messages.forEach(function (message) {
        stack.push(message);
    });
    stack.pop();
    var tuloste = stack.printItems();
    return tuloste === ["sit", "dolor", "ipsum", "Lorem"] && stack.size === 4;
});
function sen(testCase, testFn) {
    console.log("sen \"" + testCase + "\"", testFn() ? "Test succesful" : "Test failed");
}
