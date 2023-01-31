const fs = require('fs')

async function readFile (name) {
  const data = await fs.readFileSync(name, 'utf-8')
  return JSON.parse(data)
}

function statement(invoice, plays) {
  const statementData = {}
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformace);
  return renderPlainText(statementData, plays)

  function enrichPerformace(aPerformance) {
    const result = Object.assign({}, aPerformance)
    result.play = playFor(aPerformance)
    return result
  }

  function playFor(aPerformance){
    return plays[aPerformance.playID];
  }
}

function renderPlainText(data, plays) {
  let result = `Statement for ${data.customer}\n`;
  
  for(let perf of data.performances) {
    result += `${perf.play.name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;
  }

  result += `Amount owed is ${usd(totalAmount())}\n`;
  result += `You earned ${totalVolumeCredits()} credits\n`;
  return result

  //(Extract Function)(134)
  function amountFor(aPerformance) {
    let result = 0;

    switch(aPerformance.play.type){
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
        throw new Error(`unknown type: ${aPerformance.play.type}`);
    }

    return result;
  }

  function volumeCreditsFor(aPerformance) {
    let result =  Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === aPerformance.play.type) result += Math.floor(aPerformance.audience / 5);

    return result
  }

  function usd(aNumber) {
    return new Intl.NumberFormat("en-US",
      { style: "currency", currency: "USD",
      minimumFractionDigits: 2 }).format(aNumber/100)
  }

  function totalVolumeCredits() {
    let result = 0;
    for(let perf of data.performances) {
      result += volumeCreditsFor(perf)
    }
    return result
  }
  
  function totalAmount() {
    let result = 0;
    for(let perf of data.performances) {
      result += amountFor(perf);
    }
    return result;
  }
}



async function init() {
  const plays = await readFile('./plays.json')
  const invoices =  await readFile('./invoices.json')

  console.log(statement(invoices[0], plays))
}

init()

module.exports = statement
