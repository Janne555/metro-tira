class Iterator {
  pino: Stack
  current?: ListItem

  constructor(pino: Stack) {
    this.pino = pino
    this.current = pino.top
  }

  hasNext = (): boolean => {
    return this.current !== undefined
  }

  next = (): ListItem | undefined => {
    if (this.current) {
      const oldCurrent = this.current
      this.current = this.current.next
      return oldCurrent
    } else {
      return undefined
    }
  }
}

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
  const start = document.querySelector("#iteraattori_aloita")! as HTMLButtonElement
  const next = document.querySelector("#iteraattori_seuraava")! as HTMLButtonElement
  const list = document.querySelector("#iteraattori_lista")!
  const current = document.querySelector("#iteraattori_nykyinen")! as HTMLSpanElement
  let stack = new Stack()
  let iterator = new Iterator(stack)

  start.onclick = () => {
    next.disabled = false
    current.innerHTML = "[ei tietoa]"
    stack = new Stack()

    for (let i = 0; i < 5; i++) {
      stack.push(`${Math.floor(Math.random() * 100)}`)
    }
    reDisplayStack()
    
    iterator = new Iterator(stack)
  }

  next.onclick = () => {
    current.innerText = iterator.next()?.data ?? ""
    if (!iterator.hasNext()) {
      next.disabled = true
    }
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

export { Iterator }