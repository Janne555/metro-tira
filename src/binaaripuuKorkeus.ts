type PuuData = {
  name: string | "null",
  parent: number | "null",
  children: PuuData[]
}

class BinaariPuu {
  juuri: Solmu

  constructor(juuriArvo: number) {
    this.juuri = new Solmu(juuriArvo, 0)
  }

  lisaa = (data: number): void => {
    this.juuri.lisaa(Number(data))
  }

  etsi = (data: number): Solmu | undefined => {
    return this.juuri.etsi(Number(data))
  }

  esiJarjestys = (): string => {
    return this.juuri.esiJarjestys()
  }

  /**
   * Tekee diagrammidatan d3 visualisointia varten. Lisää tyhjiä lehtiä jotta 
   * vasen ja oikea lehti on helpompi erottaa toisistaan
   */
  diagrammiData = (parent: number): PuuData => {
    return this.juuri.diagrammiData(parent)
  }

  poista = (data: number): void => {
    this.juuri.poista(Number(data))
  }

  vasemmanPuoleisin = () => {
    return this.juuri.vasemmanPuoleisin()
  }

}

class Solmu {
  data: number
  vasen?: Solmu
  oikea?: Solmu
  korkeus: number

  constructor(data: number, korkeus: number) {
    this.data = data
    this.korkeus = korkeus
  }

  poista = (data: number, vanhempi?: Solmu) => {
    console.log(data, vanhempi)
    if (this.data > data) {
      if (this.vasen) {
        this.vasen.poista(data, this)
      }
    } else if (this.data < data) {
      if (this.oikea) {
        this.oikea.poista(data, this)
      }
    } else {
      if (!vanhempi) {
        throw new Error("Poisto epäonnistui")
      }
      if (this.oikea && this.vasen) {
        this.data = this.oikea.vasemmanPuoleisin()
        this.oikea.poista(this.data, this)
      } else if (vanhempi.vasen === this) {
        vanhempi.vasen = this.vasen ? this.vasen : this.oikea
      } else if (vanhempi.oikea === this) {
        vanhempi.oikea = this.vasen ? this.vasen : this.oikea
      }
    }
  }

  vasemmanPuoleisin = (): number => {
    if (!this.vasen) {
      return this.data
    } else {
      return this.vasen.vasemmanPuoleisin()
    }
  }


  lisaa = (data: number): number => {
    if (this.data > data) {
      if (this.vasen) {
        const uusiKorkeus = this.vasen.lisaa(data)
        if (uusiKorkeus > this.korkeus) {
          this.korkeus = uusiKorkeus
        }
      } else {
        this.vasen = new Solmu(data, 0)
        if (this.korkeus === 0) {
          this.korkeus = 1
        }
      }
    } else if (this.data < data) {
      if (this.oikea) {
        const uusiKorkeus = this.oikea.lisaa(data)
        if (uusiKorkeus > this.korkeus) {
          this.korkeus = uusiKorkeus
        }
      } else {
        this.oikea = new Solmu(data, 0)
        if (this.korkeus === 0) {
          this.korkeus = 1
        }
      }
    } else {
      throw new Error("Saman arvon lisäämistä toisen kerran ei ole tuettu")
    }

    return this.korkeus + 1
  }


  etsi = (data: number): Solmu | undefined => {
    if (this.data < data) {
      return this.vasen?.etsi(data)
    } else if (this.data > data) {
      return this.oikea?.etsi(data)
    } else {
      return this
    }
  }

  esiJarjestys = (): string => {
    let tulos = `${this.data}`
    if (this.vasen) {
      tulos = `${tulos}, ${this.vasen.esiJarjestys()}`
    }

    if (this.oikea) {
      tulos = `${tulos}, ${this.oikea.esiJarjestys()}`
    }
    return tulos
  }

  /**
 * Tekee diagrammidatan d3 visualisointia varten. Lisää tyhjiä lehtiä jotta 
 * vasen ja oikea lehti on helpompi erottaa toisistaan
 */
  diagrammiData = (parent: number): PuuData => {
    const tulos: PuuData = {
      name: `${this.data} (h=${this.korkeus})`,
      parent,
      children: []
    }

    if (this.vasen) {
      tulos.children.push(this.vasen.diagrammiData(this.data))
    }

    if (this.oikea) {
      if (tulos.children.length === 0) {
        tulos.children.push({
          name: "null",
          parent,
          children: []
        })
      }
      tulos.children.push(this.oikea.diagrammiData(this.data))
    } else {
      if (tulos.children.length === 1) {
        tulos.children.push({
          name: "null",
          parent,
          children: []
        })
      }
    }

    return tulos
  }
}