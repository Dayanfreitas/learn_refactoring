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
    volumeCredits += volumeCreditsFor(perf)
    
    result += `${playFor(perf).name}: ${format(amountFor(perf)/100)} (${perf.audience} seats)\n`;
    totalAmount += amountFor(perf);
  }

  result += `Amount owed is ${format(totalAmount/100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result

  //(Extract Function)(134)
  function amountFor(aPerformance) {
    let result = 0;

    switch(playFor(aPerformance).type){
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
        throw new Error(`unknown type: ${playFor(aPerformance).type}`);
    }

    return result;
  }

  //(Replace Temp with Query)(207)
  function playFor(aPerformance){
    return plays[aPerformance.playID];
  }

  function volumeCreditsFor(perf) {
    let volumeCredits =  Math.max(perf.audience - 30, 0);
    if ("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);

    return volumeCredits
  }
}

async function init() {
  const plays = await readFile('./plays.json')
  const invoices =  await readFile('./invoices.json')

  console.log(statement(invoices[0], plays))
}

init()

module.exports = statement
