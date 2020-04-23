function parseString(input: string) {
  const stack: number[] = []
  const parts = input.split(" ")

  const operations: Record<string, () => false> = {
    "+"() {
      const [first, last] = topTwo()
      stack.push(first + last)
      return false
    },
    "-"() {
      const [first, last] = topTwo()
      stack.push(first - last)
      return false
    },
    "/"() {
      const [first, last] = topTwo()
      stack.push(first / last)
      return false
    },
    "*"() {
      const [first, last] = topTwo()
      stack.push(first * last)
      return false
    }
  }

  for (let part of parts) {
    if (operations[part]?.() === undefined) {
      handleInput(part)
    }
  }

  if (stack.length !== 1) {
    throw Error(`Invalid number of operations. Stack has ${stack.length}`)
  } else {
    return stack[0]
  }

  function handleInput(part: string) {
    const number = Number(part)
    if (isNaN(number)) {
      throw Error(`Invalid input ${part}`)
    } else {
      stack.push(number)
    }
  }

  function topTwo(): [number, number] {
    const first = stack.pop()
    const second = stack.pop()
    if (first == null || second == null) {
      throw Error("Not enough operands on stack")
    } else {
      return [first, second]
    }
  }
}