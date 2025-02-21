function isPrime(num) {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false; // Eliminate even numbers quickly

  for (let i = 3; i * i <= num; i += 2) {
    // Check odd numbers only
    if (num % i === 0) return false;
  }
  return true;
}

function findNthPrime(n) {
  if (n < 1) return "Invalid input";

  let count = 0;
  let num = 1;

  while (count < n) {
    num++;
    if (isPrime(num)) {
      count++;
    }
  }
  return num;
}
export default findNthPrime;
