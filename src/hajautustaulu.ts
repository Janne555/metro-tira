class HajautusAlkio {
  avain: number
  data: string

  constructor(avain: number, data: string) {
    this.avain = avain
    this.data = data
  }
}

class HajautusTaulu {
  taulu: (HajautusAlkio | undefined)[] = []
  koko: number = 7

  insert(alkio: HajautusAlkio): void {
    const hashedIndex = this.hash(alkio.avain)
    let resolvedIndex = hashedIndex
    // Jos taulussa on jo jotain hashatyllä indexillä, etsi uusi indexi lineaarisesti
    while (this.taulu[resolvedIndex] != null) {
      if (this.taulu[resolvedIndex]?.avain === alkio.avain) {
        throw new Error("Taulukossa on jo alkio annetulla avaimella")
      }

      resolvedIndex++

      // jos etsittävä indeksi on pyörähtänyt takaisin alkuperäiseen indeksiin, taulukko on täynnä
      if (resolvedIndex === hashedIndex) {
        throw Error("Taulukko on täynnä")
      }

      // jos indeksi on suurempi kuin taulukon sallittu koko, aloita etsintä taulukon alusta
      if (resolvedIndex >= this.koko) {
        resolvedIndex = 0
      }
    }

    this.taulu[resolvedIndex] = alkio
  }

  find(avain: number): HajautusAlkio | undefined {
    if (avain < 0) {
      throw Error("Avain ei saa olla negatiivinen")
    }
    const hashedIndex = this.hash(avain)
    let resolvedIndex = hashedIndex
    while (this.taulu[resolvedIndex]?.avain !== avain) {
      resolvedIndex++
      if (resolvedIndex === hashedIndex) {
        return undefined
      }

      if (resolvedIndex >= this.koko) {
        resolvedIndex = 0
      }
    }

    return this.taulu[resolvedIndex]
  }

  hash(avain: number): number {
    return avain % this.koko
  }
}