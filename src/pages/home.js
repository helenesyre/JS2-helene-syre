import { feedNavigation } from "../assets/js/components/feedNavigation";
import { createPostCard } from "../assets/js/components/createPostCard";
import { postCard } from "../assets/js/components/postCard";
import { getAllPosts } from "../assets/js/utils/fetch";

/**
 * Source from corriculim: Lazy Loading with IntersectionObserver
 */
export async function home() {
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

  // Variables to keep track of the current page and loading state for infinite scrolling
  let page = 1;
  let isLoading = false;

  // Function to fetch posts and append them to the container when the user scrolls near the bottom of the page
  async function fetchDataOnScroll() {
    if (isLoading) return;
    // Set isLoading to true to prevent multiple simultaneous fetches
    isLoading = true;
    const container = document.getElementById('posts-container');

    try {
      // Fetch posts for the current page
      const posts = await getAllPosts(page);

      // Append each post to the container using the postCard component
      posts.data.forEach(item => {
        const div = document.createElement('div');
        // Set the innerHTML of the div to the postCard component with the post data
        div.innerHTML = postCard(item);
        container.appendChild(div);
      });

      // After appending the posts, observe all images with the lazyload class to trigger loading when they enter the viewport
      const lazyImages = document.querySelectorAll('.lazyload');
      lazyImages.forEach((image) => observer.observe(image));

      // Increment the page number for the next fetch
      page++;
    } catch (error) {
      console.error(error);
    } finally {
      // Set isLoading back to false after the fetch is complete, regardless of success or failure
      isLoading = false;
    }
  }

  // Listen for scroll events to trigger loading more posts when the user scrolls near the bottom of the page
  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
      fetchDataOnScroll();
    }
  });

  setTimeout(() => {
    // Initial fetch of posts on page load
    fetchDataOnScroll();
  }, 0);

  return `
    ${feedNavigation()}
    <div class="max-w-xl">
      <h1 class="sr-only">Welcome to Your Feed</h1>
      ${createPostCard()}
      <div id="posts-container">
      </div>
    </div>
  `;
}