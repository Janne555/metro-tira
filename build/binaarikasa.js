"use strict";
var KasaAlkio = /** @class */ (function () {
    function KasaAlkio(avain, data) {
        this.avain = avain;
        this.data = data;
    }
    return KasaAlkio;
}());
var Binaarikasa = /** @class */ (function () {
    function Binaarikasa() {
        var _this = this;
        this.sisalto = [];
        this.diagrammiData = function (index) {
            var _a;
            var tulos = {
                name: "" + ((_a = _this.sisalto[index]) === null || _a === void 0 ? void 0 : _a.avain),
                parent: index,
                children: []
            };
            var vasenIndex = index * 2;
            var oikeaIndex = vasenIndex + 1;
            if (_this.sisalto[vasenIndex]) {
                tulos.children.push(_this.diagrammiData(vasenIndex));
            }
            if (_this.sisalto[oikeaIndex]) {
                tulos.children.push(_this.diagrammiData(oikeaIndex));
            }
            return tulos;
        };
        this.sisalto[0] = null;
    }
    Binaarikasa.prototype.deleteMin = function () {
        var vasenLapsi = this.haeVasenLapsi(1);
        var oikeaLapsi = this.haeOikeaLapsi(1);
        var viimeinen = this.sisalto[this.sisalto.length - 1];
        if (vasenLapsi && oikeaLapsi && viimeinen) {
            if (vasenLapsi.alkio.avain > viimeinen.avain && oikeaLapsi.alkio.avain > viimeinen.avain) {
                this.sisalto[1] = viimeinen;
                this.sisalto[this.sisalto.length - 1] = null;
            }
            else {
                this.percolateDown(1);
            }
        }
        else {
            this.percolateDown(1);
        }
    };
    Binaarikasa.prototype.insert = function (alkio) {
        var uusiPituus = this.sisalto.push(alkio);
        this.percolateUp(uusiPituus - 1);
    };
    Binaarikasa.prototype.percolateUp = function (index) {
        if (index === 1) {
            return;
        }
        var alkio = this.haeAlkio(index);
        var vanhempi = this.haeVanhempi(index);
        if (vanhempi.alkio.avain > alkio.avain) {
            this.vaihdaAlkiot(index, vanhempi.index);
            this.percolateUp(vanhempi.index);
        }
    };
    Binaarikasa.prototype.percolateDown = function (index) {
        this.sisalto[index] = null;
        var vasenLapsi = this.haeVasenLapsi(index);
        var oikeaLapsi = this.haeOikeaLapsi(index);
        if (vasenLapsi && oikeaLapsi) {
            if (vasenLapsi.alkio.avain > oikeaLapsi.alkio.avain) {
                this.sisalto[index] = oikeaLapsi.alkio;
                this.percolateDown(oikeaLapsi.index);
            }
            else {
                this.sisalto[index] = vasenLapsi.alkio;
                this.percolateDown(vasenLapsi.index);
            }
        }
        else if (oikeaLapsi && !vasenLapsi) {
            this.sisalto[index] = oikeaLapsi.alkio;
            this.sisalto[oikeaLapsi.index] = null;
        }
        else if (vasenLapsi && !oikeaLapsi) {
            this.sisalto[index] = vasenLapsi.alkio;
            this.sisalto[vasenLapsi.index] = null;
        }
    };
    Binaarikasa.prototype.vaihdaAlkiot = function (a, b) {
        var temp = this.sisalto[a];
        this.sisalto[a] = this.sisalto[b];
        this.sisalto[b] = temp;
    };
    Binaarikasa.prototype.haeVanhempi = function (index) {
        var vanhemmanIndeksi = Math.floor(index / 2);
        var vanhempi = this.sisalto[vanhemmanIndeksi];
        if (vanhempi == null) {
            throw Error("Ei vanhempaa");
        }
        else {
            return { alkio: vanhempi, index: vanhemmanIndeksi };
        }
    };
    Binaarikasa.prototype.haeVasenLapsi = function (index) {
        var lapsenIndeksi = index * 2;
        var lapsi = this.sisalto[lapsenIndeksi];
        if (lapsi == null) {
            return null;
        }
        else {
            return { alkio: lapsi, index: lapsenIndeksi };
        }
    };
    Binaarikasa.prototype.haeOikeaLapsi = function (index) {
        var lapsenIndeksi = index * 2 + 1;
        var lapsi = this.sisalto[lapsenIndeksi];
        if (lapsi == null) {
            return null;
        }
        else {
            return { alkio: lapsi, index: lapsenIndeksi };
        }
    };
    Binaarikasa.prototype.haeAlkio = function (index) {
        var alkio = this.sisalto[index];
        if (alkio == null) {
            throw Error("Ei alkiota");
        }
        else {
            return alkio;
        }
    };
    return Binaarikasa;
}());
