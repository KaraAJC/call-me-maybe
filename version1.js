const recordPattern = new RegExp(/(\d{2}):(\d{2}):(\d{2}),(\d{3}-\d{3}-\d{4})/i);

const S = '00:01:07,400-234-0907\n00:05:01,701-080-0807\n00:05:00,400-234-0907\n01:03:00,400-234-0907\n00:02:00,344-234-0907\n00:07:00,344-234-0907\n00:04:06,344-234-0907'
// added more call data to test

const calls = []

let records = S.split('\n');

  records.map(record => {
    let callRecord = {
      hrs: parseInt(record.match(recordPattern)[1], 10),
      mins: parseInt(record.match(recordPattern)[2], 10),
      secs: parseInt(record.match(recordPattern)[3], 10),
      number: record.match(recordPattern)[4]
    };
    calls.push(callRecord);
  });

console.log("here's all the calls:");
console.log(calls);

// frequent caller statistics
const fcs = {};

// tally calls to determine the most frequent caller
  calls.reduce((fcs, log) => {
    let num = log.number;

    if(!fcs[num]) {
      fcs[num] = 0;
    }
    fcs[num]++;
    return fcs;
  }, fcs);

console.log("here's all the counts of calls made");
console.log(fcs);

// pulls the number for the most frequent caller
const most = Object.keys(fcs).reduce(function(a, b){ return fcs[a] > fcs[b] ? a : b });

console.log(`here's the most frequent caller's number: ${most}`);

// INTERESTING in this case, a tie gives it to the last evaluated. would need to check back


// rules: most frequent caller's calls are free.
//        calls under 5 minutes are charged by second at .03 cents
//          i.e. 3 min, 40 secs = ( (3*60) + 40 )*3
//        calls OVER 5 minutes are charged by minute at 150 Cents
//          i.e  5 min, 40 secs = 6*150

function calculateCost(log) {
  let cost = 0;
  if (log.number != most) {
    // console.log("calculating record!");
    cost += log.hrs*60*150;
    if (cost > 5 || log.mins >= 5) {
      // console.log(`${log.number} is more than 5 mins`);
      let roundedMins = log.secs? log.mins + 1 : log.mins;
      cost += roundedMins*150;
    } else {
      // console.log("quick-call rate!");
      cost += ( (log.mins*60) + log.secs )*3;
    }
  }
  return cost;
}

calls.map(log => {
  log.cost = calculateCost(log);
});

console.log("here's the calls with cost calculated")
console.log(calls);

let due = 0;

const bill = calls.reduce((due, log) => {
  console.log(`adding ${log.cost} to the total`);
  due += log.cost;
  console.log(`due so far: ${due}`);
  return due;
}, due);

console.log(`total due is: ${bill}`);
console.log(`this person owes $ ${(bill/100)}`);