class ListItem {
  data?: string
  next?: ListItem
}

class Stack {
  top?: ListItem
  size: number = 0

  /**
   * Muodosta uusi lista-alkio ja vie se pinon huipulle
   */
  push = (aData: string): void => {
    const listItem = new ListItem()
    listItem.data = aData
    listItem.next = this.top
    this.top = listItem
    this.size++
  }

  /**
   * Poista ja palauta alkio pinon huipulta.
   * Jos pino on tyhjä, palauta null
   */
  pop = (): ListItem | undefined => {
    const prevTop = this.top
    this.top = prevTop?.next
    if (this.size > 0) {
      this.size--
    }
    return prevTop
  }

  /**
   * Tulosta pinon sisältö muuttamatta pinoa
   */
  printItems = (): string[] => {
    let current = this.top
    let items: string[] = []
    while (current) {
      items.push(current.data ?? "")
      current = current.next
    }
    return items
  }

  getSize = (): number => {
    return this.size
  }
}

(() => {
  if (!window) return
  const input = document.querySelector("#pino_input")! as HTMLInputElement
  const list = document.querySelector("#pino_lista")!
  const addButton = document.querySelector("#pino_lisaa")! as HTMLButtonElement
  const clearButton = document.querySelector("#pino_tyhjaa")! as HTMLButtonElement
  const popButton = document.querySelector("#pino_ota_eka")! as HTMLButtonElement
  let stack = new Stack()


  addButton.onclick = handleAdd
  input.onkeypress = event => {
    if (event.keyCode === 13) {
      handleAdd()
    }
  }
  clearButton.onclick = () => {
    stack = new Stack()
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

export { Stack }