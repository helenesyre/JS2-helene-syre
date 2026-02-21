import { createPostCard } from "../assets/js/components/createPostCard";
import { postCard } from "../assets/js/components/postCard";
import { getAllFollowingPosts, getAllPosts, searchPosts } from "../assets/js/utils/fetch";
import { useObserver } from "../assets/js/utils/useObserver";
import { searchIcon } from "../assets/js/components/icons/searchIcon";
import { debounce } from "../assets/js/utils/debounce";
import { showToast } from "../assets/js/utils/toast";
import { loaderIcon } from "../assets/js/components/icons/loaderIcon";

export async function home() {
  const observer = useObserver();
  const tabs = [
    { id: 'feed-tab', label: 'Feed' },
    { id: 'following-tab', label: 'Following' }
  ];

  // Variables to keep track of the current page and loading state for infinite scrolling
  let page = 1;
  let totalPages = 1; // This will be set based on the API response to know when to stop fetching more posts
  let isLoading = false;
  let selectedTab = 'feed-tab';

  // Function to fetch posts and append them to the container when the user scrolls near the bottom of the page
  async function fetchDataOnScroll() {
    if (isLoading) return;
    // Set isLoading to true to prevent multiple simultaneous fetches
    isLoading = true;
    const container = document.getElementById('posts-container');
    container.innerHTML = `<div class="flex justify-center items-center h-64 animate-spin">${loaderIcon}</div>`;

    try {
      // Fetch posts for the current page
      // switch between getAllPosts, getAllFollowingPosts, searchPosts to test different endpoints
      let posts;
      switch (selectedTab) {
        case 'feed-tab':
          posts = await getAllPosts(page);
          break;
        case 'following-tab':
          posts = await getAllFollowingPosts(page);
          break;
        case 'search':
          const searchInput = document.getElementById('search-input');
          posts = await searchPosts(searchInput.value, page);
          break;
        default:
          posts = await getAllPosts(page);
      }
      container.innerHTML = ''; // Clear the loader before appending posts

      // Update totalPages based on the API response to know when to stop fetching more posts
      totalPages = posts.meta.pageCount;

      // Append each post to the container using the postCard component
      posts.data.forEach(item => {
        const div = document.createElement('div');
        // Set the innerHTML of the div to the postCard component with the post data
        // TODO: Sanitize the post data to prevent XSS attacks by escaping special characters
        div.innerHTML = postCard(item);
        container.appendChild(div);
      });

      // After appending the posts, observe all images with the lazyload class to trigger loading when they enter the viewport
      const lazyImages = document.querySelectorAll('.lazyload');
      lazyImages.forEach((image) => observer.observe(image));

      // Increment the page number for the next fetch when the user scrolls near the bottom again
      page++;
    } catch (error) {
      showToast(`An error occurred while fetching posts: ${error.message}`, 'error');
    } finally {
      // Set isLoading back to false after the fetch is complete, regardless of success or failure
      isLoading = false;
    }
  }

  // Listen for scroll events to trigger loading more posts when the user scrolls near the bottom of the page
  document.addEventListener('scroll', () => {
    const hash = window.location.hash
    const homePageMatch = hash.match(/^#\/$/);
    if (!homePageMatch) return; // Only trigger infinite scroll on the home page
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
      if (!isLoading && page <= totalPages) {
        fetchDataOnScroll();
      }
    }
  });

  const clearContent = () => {
    page = 1;
    document.getElementById('posts-container').innerHTML = '';
  };

  setTimeout(() => {
    // Initial fetch of posts on page load
    fetchDataOnScroll();
    const feedTab = document.getElementById('feed-tab');
    const followingTab = document.getElementById('following-tab');

    feedTab.addEventListener('click', () => {
      selectedTab = 'feed-tab';
      updateTabStyles();
      clearContent(); // Clear current posts and reset page number
      fetchDataOnScroll(); // Fetch posts for the selected tab
    });

    followingTab.addEventListener('click', () => {
      selectedTab = 'following-tab';
      updateTabStyles();
      clearContent(); // Clear current posts and reset page number
      fetchDataOnScroll(); // Fetch posts for the selected tab
    });

    function updateTabStyles() {
      const tabButtons = document.querySelectorAll('.tab');
      tabButtons.forEach(btn => {
        if (btn.id === selectedTab) {
          btn.classList.add('bg-main-neon', 'text-black');
          btn.classList.remove('text-gray-light', 'hover:bg-main-white', 'hover:text-main-black');
        } else {
          btn.classList.remove('bg-main-neon', 'text-black');
          btn.classList.add('text-gray-light', 'hover:bg-main-white', 'hover:text-main-black');
        }
      });
    }

    // Debounce the search input to prevent excessive API calls while typing, and clear content when searching
    const debouncedFetch = debounce(fetchDataOnScroll, 400, clearContent);

    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', () => {
      if (searchInput.value.trim() === '') {
        selectedTab = 'feed-tab'; // Reset to feed tab when search input is cleared
      } else {
        selectedTab = 'search'; // Set selected tab to search when there is input
      }
      // Updates tab styles when on search
      updateTabStyles();
      debouncedFetch();
    });

    // Set initial tab styles
    updateTabStyles();
  }, 0);

  return `
    <nav class="flex flex-col md:flex-row gap-3 items-center justify-between mb-6 lg:mb-9">
      <!-- Left tabs -->
      <div class="flex items-center gap-3">
        ${tabs.map(tab => `
          <button id="${tab.id}" class="tab rounded-lg px-4 py-2 text-sm font-medium hover:cursor-pointer smooth-transition">
            ${tab.label}
          </button>
        `).join('')}
      </div>

      <!-- Search -->
      <div class="relative w-full md:w-auto">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-medium">${searchIcon}</span>
        <input
          type="text"
          placeholder="Search"
          id="search-input"
          name="search"
          aria-label="Search posts"
          class="w-full md:w-80 lg:w-56 rounded-lg border border-gray-dark bg-input-bg-dark px-4 py-2 pl-10 text-sm text-main-white placeholder-gray-medium focus:outline-none focus:ring-2 focus:ring-gray-muted"
        />
      </div>
    </nav>
    <div>
      <h1 class="sr-only">Welcome to Your Feed</h1>
      ${createPostCard()}
      <div id="posts-container"">
      </div>
    </div>
  `;
}