/**
 * Code source from:
 * Lazy Loading with IntersectionObserver
 * @publisher: Noroff corriculum
 * @date: N/A
*/
export function useObserver() {
  // IntersectionObserver options to trigger loading images when they are about to enter the viewport
  const observerOptions = {
    root: null, // use the viewport
    rootMargin: '0px 0px 200px 0px', // trigger 200px before it enters viewport
  };

  // IntersectionObserver callback function to load images when they intersect with the viewport
  function handleIntersection(entries, observer) {
    entries.forEach((entry) => { // Check if the image is intersecting with the viewport
      if (entry.isIntersecting) {
        const image = entry.target;
        image.src = image.dataset.src; // Set the src attribute to the value of data-src to load the image
        image.classList.remove('lazyload');
        observer.unobserve(image); // Stop observing the image since it has been loaded
      }
    });
  };

  // IntersectionObserver instance to keep track of images with the lazyload class and trigger loading when they enter the viewport
  const observer = new IntersectionObserver(
    handleIntersection,
    observerOptions,
  );

  return observer;
}