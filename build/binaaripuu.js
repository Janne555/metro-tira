"use strict";
var BinaariPuu = /** @class */ (function () {
    function BinaariPuu(juuriArvo) {
        var _this = this;
        this.insert = function (data) {
            var _a;
            if (((_a = _this.juuri) === null || _a === void 0 ? void 0 : _a.data) === data) {
                throw new Error("Saman arvon lisäämistä toisen kerran ei ole tuettu");
            }
            if (_this.juuri == null) {
                _this.juuri = new Solmu(data);
            }
            else if (_this.juuri.data > data) {
                if (_this.juuri.vasen) {
                    _this.juuri.vasen.insert(data);
                }
                else {
                    _this.juuri.vasen = new BinaariPuu(data);
                }
            }
            else {
                if (_this.juuri.oikea) {
                    _this.juuri.oikea.insert(data);
                }
                else {
                    _this.juuri.oikea = new BinaariPuu(data);
                }
            }
        };
        this.find = function (data) {
            var _a, _b;
            if (!_this.juuri) {
                return undefined;
            }
            if (_this.juuri.data === data) {
                return _this;
            }
            // jos vasenta tai oikeaa juurta ei ole määritelty funktion tulos on undefined
            if (_this.juuri.data > data) {
                return (_a = _this.juuri.vasen) === null || _a === void 0 ? void 0 : _a.find(data);
            }
            else {
                return (_b = _this.juuri.oikea) === null || _b === void 0 ? void 0 : _b.find(data);
            }
        };
        this.esiJarjestys = function () {
            var tulos = "";
            if (!_this.juuri) {
                tulos = "";
            }
            else {
                tulos = _this.juuri.data;
                if (_this.juuri.vasen) {
                    tulos = tulos + ", " + _this.juuri.vasen.esiJarjestys();
                }
                if (_this.juuri.oikea) {
                    tulos = tulos + ", " + _this.juuri.oikea.esiJarjestys();
                }
            }
            return tulos;
        };
        this.diagrammiData = function (parent) {
            if (!_this.juuri) {
                throw Error("Ei dataa");
            }
            var tulos = {
                name: _this.juuri.data,
                parent: parent,
                children: []
            };
            if (_this.juuri.vasen) {
                tulos.children.push(_this.juuri.vasen.diagrammiData(_this.juuri.data));
            }
            if (_this.juuri.oikea) {
                tulos.children.push(_this.juuri.oikea.diagrammiData(_this.juuri.data));
            }
            return tulos;
        };
        if (juuriArvo != null) {
            this.juuri = new Solmu(juuriArvo);
        }
    }
    return BinaariPuu;
}());
var Solmu = /** @class */ (function () {
    function Solmu(data, vasen, oikea) {
        this.data = data;
        this.vasen = vasen;
        this.oikea = oikea;
    }
    return Solmu;
}());
