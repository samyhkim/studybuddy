const SRM = require("./algo");

// 86400000
const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
// 18362 (50.3 years)- represents num of days since 1/1/70
const today = Math.round(new Date().getTime() / DAY_IN_MILLISECONDS);
// console.log("Today: " + today);
// 18361 - represents yesterday
const yesterday = today - 1;
const ms = new SRM();
const record = ms.getInitialRecord(yesterday);
const updatedRecord = ms.calculate(2, record, today);
console.log(typeof updatedRecord.progress);

// console.log(ms);
console.log(record);
console.log(updatedRecord);
