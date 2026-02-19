/**
 * Source: https://stackoverflow.com/questions/75988682/debounce-in-javascript
 * Author mr. polywhirl
 * Date retrieved: 19. feb 2026
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