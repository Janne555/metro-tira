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
        this.juuri = new Solmu(juuriArvo, 0);
    }
    return BinaariPuu;
}());
var Solmu = /** @class */ (function () {
    function Solmu(data, korkeus) {
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
                    var uusiKorkeus = _this.vasen.lisaa(data);
                    if (uusiKorkeus > _this.korkeus) {
                        _this.korkeus = uusiKorkeus;
                    }
                }
                else {
                    _this.vasen = new Solmu(data, 0);
                    if (_this.korkeus === 0) {
                        _this.korkeus = 1;
                    }
                }
            }
            else if (_this.data < data) {
                if (_this.oikea) {
                    var uusiKorkeus = _this.oikea.lisaa(data);
                    if (uusiKorkeus > _this.korkeus) {
                        _this.korkeus = uusiKorkeus;
                    }
                }
                else {
                    _this.oikea = new Solmu(data, 0);
                    if (_this.korkeus === 0) {
                        _this.korkeus = 1;
                    }
                }
            }
            else {
                throw new Error("Saman arvon lisäämistä toisen kerran ei ole tuettu");
            }
            return _this.korkeus + 1;
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
                name: _this.data + " (h=" + _this.korkeus + ")",
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
        this.korkeus = korkeus;
    }
    return Solmu;
}());
