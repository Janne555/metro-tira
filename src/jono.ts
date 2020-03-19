class ListItem {
  data?: string
  prev?: ListItem
}

class Jono {
  head?: ListItem
  size: number = 0

  /**
   * Muodosta uusi lista-alkio ja vie se jonon häntään
   */
  push = (aData: string): void => {
    const listItem = new ListItem()
    listItem.data = aData

    // jos päätä ei ole vielä aseta uusi alkio pääksi
    if (!this.head) {
      this.head = listItem
    } else {
      // käy läpi alkiot ja aseta uusi jäsen jonon häntään
      let current = this.head
      while (current?.prev) {
        current = current.prev
      }
      current.prev = listItem
    }
    this.size++
  }

  /**
   * Poista ja palauta alkio jonon alusta.
   * Jos jono on tyhjä, palauta undefined
   */
  pop = (): ListItem | undefined => {
    const prevHead = this.head
    this.head = prevHead?.prev
    if (this.size > 0) {
      this.size--
    }
    return prevHead
  }

  /**
   * Tulosta pinon sisältö muuttamatta pinoa
   */
  printItems = (): string[] => {
    let current = this.head
    let items: string[] = []
    while (current) {
      items.push(current.data ?? "")
      current = current.prev
    }
    return items
  }

  getSize = (): number => {
    return this.size
  }
}

(() => {
  if (!window) return
  const input = document.querySelector("#jono_input")! as HTMLInputElement
  const list = document.querySelector("#jono_lista")!
  const addButton = document.querySelector("#jono_lisaa")! as HTMLButtonElement
  const clearButton = document.querySelector("#jono_tyhjaa")! as HTMLButtonElement
  const popButton = document.querySelector("#jono_ota_eka")! as HTMLButtonElement
  let stack = new Jono()

  addButton.onclick = handleAdd
  input.onkeypress = event => {
    if (event.keyCode === 13) {
      handleAdd()
    }
  }
  clearButton.onclick = () => {
    stack = new Jono()
    list.innerHTML = ''
  }
  popButton.onclick = () => {
    input.value = stack.pop()?.data ?? ""
    reDisplayStack()
  }

  function handleAdd() {
    if (!input.value) return
    stack.push(input.value)
    input.value = ""
    reDisplayStack()
  }

  function reDisplayStack() {
    list.innerHTML = ''
    stack.printItems().forEach(item => {
      const li = document.createElement("li")
      li.innerText = item
      list.appendChild(li)
    })
  }
})()


export { Jono }