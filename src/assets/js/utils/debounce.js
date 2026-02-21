/**
 * Code source from:
 * Debounce in Javascript
 * @publisher: Mr. Polywhirl
 * @date: 2023-04-11
 * accessed: 2026-02-19
 * link: https://stackoverflow.com/questions/75988682/debounce-in-javascript
*/
export function debounce(func, wait, preFuncCallback) {
  let timeout;

  return function (...args) {
    const context = this;
    // clear the previous timeout to prevent the function from being called multiple times within the wait period
    clearTimeout(timeout);

    // Set a new timeout
    timeout = setTimeout(() => {
      if (preFuncCallback) preFuncCallback(); // Call the pre-function callback if provided
      func.apply(context, args); // Execute function
    }, wait);
  };
}