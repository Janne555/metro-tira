type PuuData = {
  name: string,
  parent: string,
  children: PuuData[]
}

class BinaariPuu {
  juuri?: Solmu

  constructor(juuriArvo?: string) {
    if (juuriArvo != null) {
      this.juuri = new Solmu(juuriArvo)
    }
  }

  remove = (data: string): void => {
    if (this.juuri?.oikea?.juuri?.data === data) {
      if (!this.juuri.oikea.juuri.oikea && !this.juuri.oikea.juuri.vasen) {
        this.juuri.oikea = undefined
      } else if (this.juuri.oikea.juuri.oikea && !this.juuri.oikea.juuri.vasen) {
        this.juuri.oikea = this.juuri.oikea.juuri.oikea
      } else if (!this.juuri.oikea.juuri.oikea && this.juuri.oikea.juuri.vasen) {
        this.juuri.vasen = this.juuri.oikea.juuri.vasen
        this.juuri.oikea = undefined
      } else {

      }
    } else if (this.juuri?.vasen?.juuri?.data === data) {
      if (!this.juuri.vasen.juuri.oikea && !this.juuri.vasen.juuri.vasen) {
        this.juuri.vasen = undefined
      } else if (this.juuri.vasen.juuri.oikea && !this.juuri.vasen.juuri.vasen) {
        this.juuri.oikea = this.juuri.vasen.juuri.oikea
        this.juuri.vasen = undefined
      } else if (!this.juuri.vasen.juuri.oikea && this.juuri.vasen.juuri.vasen) {
        this.juuri.vasen = this.juuri.vasen.juuri.vasen
      } else {

      }
    }
  }

  insert = (data: string): void => {
    if (this.juuri?.data === data) {
      throw new Error("Saman arvon lisäämistä toisen kerran ei ole tuettu")
    }

    if (this.juuri == null) {
      this.juuri = new Solmu(data)
    } else if (this.juuri.data > data) {
      if (this.juuri.vasen) {
        this.juuri.vasen.insert(data)
      } else {
        this.juuri.vasen = new BinaariPuu(data)
      }
    } else {
      if (this.juuri.oikea) {
        this.juuri.oikea.insert(data)
      } else {
        this.juuri.oikea = new BinaariPuu(data)
      }
    }
  }

  find = (data: string): BinaariPuu | undefined => {
    if (!this.juuri) {
      return undefined
    }

    if (this.juuri.data === data) {
      return this
    }

    // jos vasenta tai oikeaa juurta ei ole määritelty funktion tulos on undefined
    if (this.juuri.data > data) {
      return this.juuri.vasen?.find(data)
    } else {
      return this.juuri.oikea?.find(data)
    }
  }

  esiJarjestys = (): string => {
    let tulos = ""
    if (!this.juuri) {
      tulos = ""
    } else {
      tulos = this.juuri.data
      if (this.juuri.vasen) {
        tulos = `${tulos}, ${this.juuri.vasen.esiJarjestys()}`
      }

      if (this.juuri.oikea) {
        tulos = `${tulos}, ${this.juuri.oikea.esiJarjestys()}`
      }
    }
    return tulos
  }

  diagrammiData = (parent: string): PuuData => {
    if (!this.juuri) {
      throw Error("Ei dataa")
    }

    const tulos: PuuData = {
      name: this.juuri.data,
      parent,
      children: []
    }

    if (this.juuri.vasen) {
      tulos.children.push(this.juuri.vasen.diagrammiData(this.juuri.data))
    }

    if (this.juuri.oikea) {
      tulos.children.push(this.juuri.oikea.diagrammiData(this.juuri.data))
    }

    return tulos
  }
}

class Solmu {
  data: string
  vasen?: BinaariPuu
  oikea?: BinaariPuu

  constructor(data: string, vasen?: BinaariPuu, oikea?: BinaariPuu) {
    this.data = data
    this.vasen = vasen
    this.oikea = oikea
  }
}

function xor(a: any, b: any): boolean {
  return (a && !b) || (!a && b)
}