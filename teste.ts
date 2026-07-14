const now = new Date();

const twoAndHalfHoursAgo = new Date(
  now.getTime() - (2.5 * 60 * 60 * 1000)
);

console.log(now);
console.log(twoAndHalfHoursAgo);

console.log(now)
console.log(twoAndHalfHoursAgo)
console.log(now.getTimezoneOffset())
console.log(new Date(twoAndHalfHoursAgo))
