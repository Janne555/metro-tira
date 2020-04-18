class Alkio {
  avain: number
  data: string

  constructor(avain: number, data: string) {
    this.avain = avain
    this.data = data
  }
}

class Lista {
  sisalto: Alkio[] = []

  lisaa = (uusi: Alkio): void => {
    let lisatty = false
    this.sisalto = this.sisalto.reduce((lista: Alkio[], nykyinen): Alkio[] => {
      if (nykyinen.avain > uusi.avain && !lisatty) {
        lista.push(uusi)
        lista.push(nykyinen)
        lisatty = true
      } else if (nykyinen.avain === uusi.avain && !lisatty) {
        lista.push(uusi)
        lisatty = true
      } else {
        lista.push(nykyinen)
      }
      return lista
    }, [])
    if (!lisatty) {
      this.sisalto.push(uusi)
    }
  }

  hae = (avain: number, alku: number = 0, loppu: number = this.sisalto.length - 1): Alkio | undefined => {
    const keskikohta = Math.floor((alku + loppu) / 2)
    if (loppu - alku > 1) {
      if (this.sisalto[keskikohta].avain > avain) {
        return this.hae(avain, alku, keskikohta)
      } else if (this.sisalto[keskikohta].avain < avain) {
        return this.hae(avain, keskikohta, loppu)
      } else {
        return this.sisalto[keskikohta]
      }
    } else if (loppu - alku === 1) {
      if (this.sisalto[keskikohta].avain > avain) {
        return this.hae(avain, alku, alku)
      } else if (this.sisalto[keskikohta].avain < avain) {
        return this.hae(avain, loppu, loppu)
      } else {
        return this.sisalto[keskikohta]
      }
    } else {
      if (this.sisalto[keskikohta].avain === avain) {
        return this.sisalto[keskikohta]
      } else {
        return undefined
      }
    }
  }

  seuraavaOsoitin = (edellinenOsoitin: number, puoli: 'vasen' | 'oikea'): number => {
    return edellinenOsoitin + Math.floor((this.sisalto.length - edellinenOsoitin) / 2) * (puoli === 'vasen' ? -1 : 1)
  }
}