"use strict";
var HajautusAlkio = /** @class */ (function () {
    function HajautusAlkio(avain, data) {
        this.avain = avain;
        this.data = data;
    }
    return HajautusAlkio;
}());
var HajautusTaulu = /** @class */ (function () {
    function HajautusTaulu() {
        this.taulu = [];
        this.koko = 7;
    }
    HajautusTaulu.prototype.insert = function (alkio) {
        var _a;
        var hashedIndex = this.hash(alkio.avain);
        var resolvedIndex = hashedIndex;
        // Jos taulussa on jo jotain hashatyllä indexillä, etsi uusi indexi lineaarisesti
        while (this.taulu[resolvedIndex] != null) {
            if (((_a = this.taulu[resolvedIndex]) === null || _a === void 0 ? void 0 : _a.avain) === alkio.avain) {
                throw new Error("Taulukossa on jo alkio annetulla avaimella");
            }
            resolvedIndex++;
            // jos etsittävä indeksi on pyörähtänyt takaisin alkuperäiseen indeksiin, taulukko on täynnä
            if (resolvedIndex === hashedIndex) {
                throw Error("Taulukko on täynnä");
            }
            // jos indeksi on suurempi kuin taulukon sallittu koko, aloita etsintä taulukon alusta
            if (resolvedIndex >= this.koko) {
                resolvedIndex = 0;
            }
        }
        this.taulu[resolvedIndex] = alkio;
    };
    HajautusTaulu.prototype.find = function (avain) {
        var _a;
        if (avain < 0) {
            throw Error("Avain ei saa olla negatiivinen");
        }
        var hashedIndex = this.hash(avain);
        var resolvedIndex = hashedIndex;
        while (((_a = this.taulu[resolvedIndex]) === null || _a === void 0 ? void 0 : _a.avain) !== avain) {
            resolvedIndex++;
            if (resolvedIndex === hashedIndex) {
                return undefined;
            }
            if (resolvedIndex >= this.koko) {
                resolvedIndex = 0;
            }
        }
        return this.taulu[resolvedIndex];
    };
    HajautusTaulu.prototype.hash = function (avain) {
        return avain % this.koko;
    };
    return HajautusTaulu;
}());
