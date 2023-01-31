import * as fs from 'fs';
import { statement, htmlStatement } from './statement.js'

async function readFile (name) {
  const data = await fs.readFileSync(name, 'utf-8')
  return JSON.parse(data)
}

async function init() {
  const plays = await readFile('./plays.json')
  const invoices =  await readFile('./invoices.json')

  console.log(plays)
  console.log(invoices)

  console.log(statement(invoices[0], plays))
  console.log(htmlStatement(invoices[0], plays))
}

init()
