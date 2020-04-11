"use strict";
var BinaariPuu = /** @class */ (function () {
    function BinaariPuu(juuriArvo) {
        var _this = this;
        this.lisaa = function (data) {
            _this.juuri.lisaa(Number(data));
        };
        this.etsi = function (data) {
            return _this.juuri.etsi(Number(data));
        };
        this.esiJarjestys = function () {
            return _this.juuri.esiJarjestys();
        };
        /**
         * Tekee diagrammidatan d3 visualisointia varten. Lisää tyhjiä lehtiä jotta
         * vasen ja oikea lehti on helpompi erottaa toisistaan
         */
        this.diagrammiData = function (parent) {
            return _this.juuri.diagrammiData(parent);
        };
        this.poista = function (data) {
            _this.juuri.poista(Number(data));
        };
        this.vasemmanPuoleisin = function () {
            return _this.juuri.vasemmanPuoleisin();
        };
        this.juuri = new Solmu(juuriArvo);
    }
    return BinaariPuu;
}());
var Solmu = /** @class */ (function () {
    function Solmu(data) {
        var _this = this;
        this.poista = function (data, vanhempi) {
            console.log(data, vanhempi);
            if (_this.data > data) {
                if (_this.vasen) {
                    _this.vasen.poista(data, _this);
                }
            }
            else if (_this.data < data) {
                if (_this.oikea) {
                    _this.oikea.poista(data, _this);
                }
            }
            else {
                if (!vanhempi) {
                    throw new Error("Poisto epäonnistui");
                }
                if (_this.oikea && _this.vasen) {
                    _this.data = _this.oikea.vasemmanPuoleisin();
                    _this.oikea.poista(_this.data, _this);
                }
                else if (vanhempi.vasen === _this) {
                    vanhempi.vasen = _this.vasen ? _this.vasen : _this.oikea;
                }
                else if (vanhempi.oikea === _this) {
                    vanhempi.oikea = _this.vasen ? _this.vasen : _this.oikea;
                }
            }
        };
        this.vasemmanPuoleisin = function () {
            if (!_this.vasen) {
                return _this.data;
            }
            else {
                return _this.vasen.vasemmanPuoleisin();
            }
        };
        this.lisaa = function (data) {
            if (_this.data > data) {
                if (_this.vasen) {
                    _this.vasen.lisaa(data);
                }
                else {
                    _this.vasen = new Solmu(data);
                }
            }
            else if (_this.data < data) {
                if (_this.oikea) {
                    _this.oikea.lisaa(data);
                }
                else {
                    _this.oikea = new Solmu(data);
                }
            }
            else {
                throw new Error("Saman arvon lisäämistä toisen kerran ei ole tuettu");
            }
        };
        this.etsi = function (data) {
            var _a, _b;
            if (_this.data < data) {
                return (_a = _this.vasen) === null || _a === void 0 ? void 0 : _a.etsi(data);
            }
            else if (_this.data > data) {
                return (_b = _this.oikea) === null || _b === void 0 ? void 0 : _b.etsi(data);
            }
            else {
                return _this;
            }
        };
        this.esiJarjestys = function () {
            var tulos = "" + _this.data;
            if (_this.vasen) {
                tulos = tulos + ", " + _this.vasen.esiJarjestys();
            }
            if (_this.oikea) {
                tulos = tulos + ", " + _this.oikea.esiJarjestys();
            }
            return tulos;
        };
        /**
       * Tekee diagrammidatan d3 visualisointia varten. Lisää tyhjiä lehtiä jotta
       * vasen ja oikea lehti on helpompi erottaa toisistaan
       */
        this.diagrammiData = function (parent) {
            var tulos = {
                name: _this.data,
                parent: parent,
                children: []
            };
            if (_this.vasen) {
                tulos.children.push(_this.vasen.diagrammiData(_this.data));
            }
            if (_this.oikea) {
                if (tulos.children.length === 0) {
                    tulos.children.push({
                        name: "null",
                        parent: parent,
                        children: []
                    });
                }
                tulos.children.push(_this.oikea.diagrammiData(_this.data));
            }
            else {
                if (tulos.children.length === 1) {
                    tulos.children.push({
                        name: "null",
                        parent: parent,
                        children: []
                    });
                }
            }
            return tulos;
        };
        this.data = data;
    }
    return Solmu;
}());
