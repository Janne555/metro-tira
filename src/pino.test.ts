
import { Stack } from './pino'

sen("pitäisi tulostaa alkiot", () => {
  const messages = ["Lorem", "ipsum", "dolor", "sit", "amet"]
  const stack = new Stack()
  messages.forEach(message => {
    stack.push(message)
  })
  const tuloste = stack.printItems()
  return tuloste === ["amet", "sit", "dolor", "ipsum", "Lorem"]
})

sen("pitäisi olla oikean kokoinen", () => {
  const messages = ["Lorem", "ipsum", "dolor", "sit", "amet"]
  const stack = new Stack()
  messages.forEach(message => {
    stack.push(message)
  })
  return stack.size === 5
})

sen("pitäisi poistaa alkio päältä", () => {
  const messages = ["Lorem", "ipsum", "dolor", "sit", "amet"]
  const stack = new Stack()
  messages.forEach(message => {
    stack.push(message)
  })
  stack.pop()
  const tuloste = stack.printItems()
  return tuloste === ["sit", "dolor", "ipsum", "Lorem"] && stack.size === 4
})

function sen(testCase: string, testFn: () => boolean) {
  console.log(`sen "${testCase}"`, testFn() ? "Test succesful" : "Test failed")
}