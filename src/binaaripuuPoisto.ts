type PuuData = {
  name: number | "null",
  parent: number | "null",
  children: PuuData[]
}

class BinaariPuu {
  juuri: Solmu

  constructor(juuriArvo: number) {
    this.juuri = new Solmu(juuriArvo)
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

  constructor(data: number) {
    this.data = data
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


  lisaa = (data: number): void => {
    if (this.data > data) {
      if (this.vasen) {
        this.vasen.lisaa(data)
      } else {
        this.vasen = new Solmu(data)
      }
    } else if (this.data < data) {
      if (this.oikea) {
        this.oikea.lisaa(data)
      } else {
        this.oikea = new Solmu(data)
      }
    } else {
      throw new Error("Saman arvon lisäämistä toisen kerran ei ole tuettu")
    }
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
      name: this.data,
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