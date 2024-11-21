/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const result = heavyComputation(data);
  postMessage(result);
});

function heavyComputation(input: number): number {
  // Simulate a heavy calculation
  let result = 0;
  for (let i = 0; i < 1e7; i++) {
    result += Math.sqrt(input + i);
  }
  return result;
}
