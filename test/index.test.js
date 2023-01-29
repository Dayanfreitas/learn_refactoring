
const statement = require('./../index');

test('Contém no nome', () => {
  let plays = {
    "hamlet": { "name" :  "Hamlet", "type": "tragedy"},
    "as-like": { "name" :  "As You Like It", "type": "comedy"},
    "othello":{ "name" :  "Othello", "type": "tragedy"}
  }
  
  let invoice = [
    {
      "customer": "BigCo",
      "performances": [
        {
          "playID": "hamlet",
          "audience": 55
        },
        {
          "playID": "as-like",
          "audience": 35
        },
        {
          "playID": "othello",
          "audience": 40
        }
      ]
    }
  ]
  
  expect(statement(invoice[0], plays)).toContain("Statement for BigCo");
});

test('Contém valor Hamlet', () => {
  let plays = {
    "hamlet": { "name" :  "Hamlet", "type": "tragedy"},
    "as-like": { "name" :  "As You Like It", "type": "comedy"},
    "othello":{ "name" :  "Othello", "type": "tragedy"}
  }
  
  let invoice = [
    {
      "customer": "BigCo",
      "performances": [
        {
          "playID": "hamlet",
          "audience": 55
        },
        {
          "playID": "as-like",
          "audience": 35
        },
        {
          "playID": "othello",
          "audience": 40
        }
      ]
    }
  ]
  
  expect(statement(invoice[0], plays)).toContain("Hamlet: $650.00 (55 seats)");
});


test('Contém valor de As You Like It', () => {
  let plays = {
    "hamlet": { "name" :  "Hamlet", "type": "tragedy"},
    "as-like": { "name" :  "As You Like It", "type": "comedy"},
    "othello":{ "name" :  "Othello", "type": "tragedy"}
  }
  
  let invoice = [
    {
      "customer": "BigCo",
      "performances": [
        {
          "playID": "hamlet",
          "audience": 55
        },
        {
          "playID": "as-like",
          "audience": 35
        },
        {
          "playID": "othello",
          "audience": 40
        }
      ]
    }
  ]
  
  expect(statement(invoice[0], plays)).toContain("As You Like It: $580.00 (35 seats)");
});

test('Contém valor de Othello', () => {
  let plays = {
    "hamlet": { "name" :  "Hamlet", "type": "tragedy"},
    "as-like": { "name" :  "As You Like It", "type": "comedy"},
    "othello":{ "name" :  "Othello", "type": "tragedy"}
  }
  
  let invoice = [
    {
      "customer": "BigCo",
      "performances": [
        {
          "playID": "hamlet",
          "audience": 55
        },
        {
          "playID": "as-like",
          "audience": 35
        },
        {
          "playID": "othello",
          "audience": 40
        }
      ]
    }
  ]
  
  expect(statement(invoice[0], plays)).toContain("Othello: $500.00 (40 seats)");
});

test('Contém valor Amount', () => {
  let plays = {
    "hamlet": { "name" :  "Hamlet", "type": "tragedy"},
    "as-like": { "name" :  "As You Like It", "type": "comedy"},
    "othello":{ "name" :  "Othello", "type": "tragedy"}
  }
  
  let invoice = [
    {
      "customer": "BigCo",
      "performances": [
        {
          "playID": "hamlet",
          "audience": 55
        },
        {
          "playID": "as-like",
          "audience": 35
        },
        {
          "playID": "othello",
          "audience": 40
        }
      ]
    }
  ]
  
  expect(statement(invoice[0], plays)).toContain("Amount owed is $1,730.00");
});


test('Contém credits', () => {
  let plays = {
    "hamlet": { "name" :  "Hamlet", "type": "tragedy"},
    "as-like": { "name" :  "As You Like It", "type": "comedy"},
    "othello":{ "name" :  "Othello", "type": "tragedy"}
  }
  
  let invoice = [
    {
      "customer": "BigCo",
      "performances": [
        {
          "playID": "hamlet",
          "audience": 55
        },
        {
          "playID": "as-like",
          "audience": 35
        },
        {
          "playID": "othello",
          "audience": 40
        }
      ]
    }
  ]
  
  expect(statement(invoice[0], plays)).toContain("You earned 47 credits");
});

