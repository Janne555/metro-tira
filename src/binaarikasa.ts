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
    const vasenLapsi = this.haeVasenLapsi(1)
    const oikeaLapsi = this.haeOikeaLapsi(1)
    const viimeinen = this.sisalto[this.sisalto.length - 1]
    if (vasenLapsi && oikeaLapsi && viimeinen) {
      if (vasenLapsi.alkio.avain > viimeinen.avain && oikeaLapsi.alkio.avain > viimeinen.avain) {
        this.sisalto[1] = viimeinen
        this.sisalto[this.sisalto.length - 1] = null
      } else {
        this.percolateDown(1)
      }
    } else {
      this.percolateDown(1)
    }
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

    if (vasenLapsi && oikeaLapsi) {
      if (vasenLapsi.alkio.avain > oikeaLapsi.alkio.avain) {
        this.sisalto[index] = oikeaLapsi.alkio
        this.percolateDown(oikeaLapsi.index)
      } else {
        this.sisalto[index] = vasenLapsi.alkio
        this.percolateDown(vasenLapsi.index)
      }
    } else if (oikeaLapsi && !vasenLapsi) {
      this.sisalto[index] = oikeaLapsi.alkio
      this.sisalto[oikeaLapsi.index] = null
    } else if (vasenLapsi && !oikeaLapsi) {
      this.sisalto[index] = vasenLapsi.alkio
      this.sisalto[vasenLapsi.index] = null
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