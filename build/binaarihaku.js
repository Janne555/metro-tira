"use strict";
var Alkio = /** @class */ (function () {
    function Alkio(avain, data) {
        this.avain = avain;
        this.data = data;
    }
    return Alkio;
}());
var Lista = /** @class */ (function () {
    function Lista() {
        var _this = this;
        this.sisalto = [];
        this.lisaa = function (uusi) {
            var lisatty = false;
            _this.sisalto = _this.sisalto.reduce(function (lista, nykyinen) {
                if (nykyinen.avain > uusi.avain && !lisatty) {
                    lista.push(uusi);
                    lista.push(nykyinen);
                    lisatty = true;
                }
                else if (nykyinen.avain === uusi.avain && !lisatty) {
                    lista.push(uusi);
                    lisatty = true;
                }
                else {
                    lista.push(nykyinen);
                }
                return lista;
            }, []);
            if (!lisatty) {
                _this.sisalto.push(uusi);
            }
        };
        this.hae = function (avain, alku, loppu) {
            if (alku === void 0) { alku = 0; }
            if (loppu === void 0) { loppu = _this.sisalto.length - 1; }
            var keskikohta = Math.floor((alku + loppu) / 2);
            if (loppu - alku > 1) {
                if (_this.sisalto[keskikohta].avain > avain) {
                    return _this.hae(avain, alku, keskikohta);
                }
                else if (_this.sisalto[keskikohta].avain < avain) {
                    return _this.hae(avain, keskikohta, loppu);
                }
                else {
                    return _this.sisalto[keskikohta];
                }
            }
            else if (loppu - alku === 1) {
                if (_this.sisalto[keskikohta].avain > avain) {
                    return _this.hae(avain, alku, alku);
                }
                else if (_this.sisalto[keskikohta].avain < avain) {
                    return _this.hae(avain, loppu, loppu);
                }
                else {
                    return _this.sisalto[keskikohta];
                }
            }
            else {
                if (_this.sisalto[keskikohta].avain === avain) {
                    return _this.sisalto[keskikohta];
                }
                else {
                    return undefined;
                }
            }
        };
        this.seuraavaOsoitin = function (edellinenOsoitin, puoli) {
            return edellinenOsoitin + Math.floor((_this.sisalto.length - edellinenOsoitin) / 2) * (puoli === 'vasen' ? -1 : 1);
        };
    }
    return Lista;
}());
