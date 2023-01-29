const fs = require('fs')

async function readFile (name) {
  const data = await fs.readFileSync(name, 'utf-8')
  return JSON.parse(data)
}

function statement(invoice, plays) {
  let totalAmount  = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;
  const format = new Intl.NumberFormat("en-US",
                  { style: "currency", currency: "USD",
                  minimumFractionDigits: 2 }).format
  
  for(let perf of invoice.performances) {
    let thisAmount = amountFor(perf, playFor(perf));

    volumeCredits += Math.max(perf.audience - 30, 0);
    if ("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);

    result += `${playFor(perf).name}: ${format(thisAmount/100)} (${perf.audience} seats)\n`;
    totalAmount += thisAmount;
  }

  result += `Amount owed is ${format(totalAmount/100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result

  //(Extract Function)(134)
  function amountFor(aPerformance, play) {
    let result = 0;

    switch(play.type){
      case "tragedy":
        result = 40000
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result  += 300 * aPerformance.audience
        break;
      default:
        throw new Error(`unknown type: ${play.type}`);
    }

    return result;
  }

  //(Replace Temp with Query)(207)
  function playFor(aPerformance){
    return plays[aPerformance.playID];
  }
}

async function init() {
  const plays = await readFile('./plays.json')
  const invoices =  await readFile('./invoices.json')

  console.log(statement(invoices[0], plays))
}

init()

module.exports = statement
