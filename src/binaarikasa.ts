class KasaAlkio {
  avain: number
  data: string

  constructor(avain: number, data: string) {
    this.avain = avain
    this.data = data
  }
}

type KasaPuuData = {
  name: string | "null",
  parent: number | "null",
  children: KasaPuuData[]
}

class Binaarikasa {
  sisalto: (KasaAlkio | null)[] = []

  constructor() {
    this.sisalto[0] = null
  }

  deleteMin(): void {
    this.percolateDown(1)
  }

  insert(alkio: KasaAlkio): void {
    const uusiPituus = this.sisalto.push(alkio)
    this.percolateUp(uusiPituus - 1)
  }

  percolateUp(index: number): void {
    if (index === 1) {
      return
    }

    const alkio = this.haeAlkio(index)
    const vanhempi = this.haeVanhempi(index)

    if (vanhempi.alkio.avain > alkio.avain) {
      this.vaihdaAlkiot(index, vanhempi.index)
      this.percolateUp(vanhempi.index)
    }
  }

  percolateDown(index: number): void {
    this.sisalto[index] = null
    const vasenLapsi = this.haeVasenLapsi(index)
    const oikeaLapsi = this.haeOikeaLapsi(index)
    const viimeinen = this.haeViimeinen()

    if (!viimeinen) {
      this.sisalto[index] = null
      return
    }

    if (vasenLapsi && oikeaLapsi) {
      if (vasenLapsi.alkio.avain > viimeinen.alkio.avain && oikeaLapsi.alkio.avain > viimeinen.alkio.avain) {
        this.sisalto[index] = viimeinen.alkio
        this.sisalto[viimeinen.index] = null
      } else {
        if (vasenLapsi.alkio.avain > oikeaLapsi.alkio.avain) {
          this.sisalto[index] = oikeaLapsi.alkio
          this.percolateDown(oikeaLapsi.index)
        } else {
          this.sisalto[index] = vasenLapsi.alkio
          this.percolateDown(vasenLapsi.index)
        }
      }
    } else if (oikeaLapsi && !vasenLapsi) {
      if (oikeaLapsi.alkio.avain > viimeinen.alkio.avain) {
        this.sisalto[index] = viimeinen.alkio
        this.sisalto[viimeinen.index] = null
      } else {
        this.sisalto[index] = oikeaLapsi.alkio
        this.percolateDown(oikeaLapsi.index)
      }
    } else if (vasenLapsi && !oikeaLapsi) {
      if (vasenLapsi.alkio.avain > viimeinen.alkio.avain) {
        this.sisalto[index] = viimeinen.alkio
        this.sisalto[viimeinen.index] = null
      } else {
        this.sisalto[index] = vasenLapsi.alkio
        this.percolateDown(vasenLapsi.index)
      }
    }
  }

  vaihdaAlkiot(a: number, b: number): void {
    const temp = this.sisalto[a]
    this.sisalto[a] = this.sisalto[b]
    this.sisalto[b] = temp
  }

  haeVanhempi(index: number): { alkio: KasaAlkio, index: number } {
    const vanhemmanIndeksi = Math.floor(index / 2)
    const vanhempi = this.sisalto[vanhemmanIndeksi]
    if (vanhempi == null) {
      throw Error("Ei vanhempaa")
    } else {
      return { alkio: vanhempi, index: vanhemmanIndeksi }
    }
  }

  haeVasenLapsi(index: number): { alkio: KasaAlkio, index: number } | null {
    const lapsenIndeksi = index * 2
    const lapsi = this.sisalto[lapsenIndeksi]
    if (lapsi == null) {
      return null
    } else {
      return { alkio: lapsi, index: lapsenIndeksi }
    }
  }

  haeOikeaLapsi(index: number): { alkio: KasaAlkio, index: number } | null {
    const lapsenIndeksi = index * 2 + 1
    const lapsi = this.sisalto[lapsenIndeksi]
    if (lapsi == null) {
      return null
    } else {
      return { alkio: lapsi, index: lapsenIndeksi }
    }
  }

  haeViimeinen(): { alkio: KasaAlkio, index: number } | null{
    let index = this.sisalto.length - 1
    while (index > 0) {
      const alkio = this.sisalto[index]
      if (alkio) {
        return { alkio, index }
      }
      index--
    }
    return null
  }

  haeAlkio(index: number): KasaAlkio {
    const alkio = this.sisalto[index]
    if (alkio == null) {
      throw Error("Ei alkiota")
    } else {
      return alkio
    }
  }

  diagrammiData = (index: number): KasaPuuData => {
    const tulos: KasaPuuData = {
      name: `${this.sisalto[index]?.avain}`,
      parent: index,
      children: []
    }

    const vasenIndex = index * 2
    const oikeaIndex = vasenIndex + 1

    if (this.sisalto[vasenIndex]) {
      tulos.children.push(this.diagrammiData(vasenIndex))
    }

    if (this.sisalto[oikeaIndex]) {
      tulos.children.push(this.diagrammiData(oikeaIndex))
    }

    return tulos
  }
}