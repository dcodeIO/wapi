import { myModule } from "./index.js";

// I am a micro-benchmark, and not a particular good one.

function bench0(count) {
  const start = Date.now();
  let n = 0;
  for (let i = 0; i < count; ++i) {
    n += Date.now();
  }
  if (n == 42) return 0;
  return Date.now() - start;
}

// Warm up
bench0(1000000);
myModule.exports.bench1(1000000);
myModule.exports.bench2(1000000);

setTimeout(() => {
  const t0 = bench0(50000000);
  const t1 = myModule.exports.bench1(50000000);
  const t2 = myModule.exports.bench2(50000000);
  console.log(`plain js : ${t0}ms (comparison)`);
  console.log(`direct   : ${t1}ms (baseline)`);
  console.log(`via wapi : ${t2}ms (+ ${((t2 - t1) * 100 / t1).toFixed(2)}%)`);
}, 1000);
