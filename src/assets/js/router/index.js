import defaultLayout from '../components/layouts/defaultLayout.js';
import { renderNav } from '../components/navigation.js';
import { routes } from './routes.js';
import { pageNotFound } from '../../../pages/pageNotFound.js';
import cleanLayout from '../components/layouts/cleanLayout.js';
import { useAuth } from '../utils/useAuth.js';
import { loaderIcon } from '../components/icons/loaderIcon.js';

/**
 * The router function listens for changes in the URL hash and renders the appropriate view based on the defined routes.
 * It checks if the user is logged in to determine whether to render the default layout with a navigation bar or a clean layout without it.
 * If no route matches the current hash, it renders a 404 page not found view.
 */
export function router() {
  async function handleRoute() {
    const hash = window.location.hash || '#/'; // Default to home if no hash
    let routeFound = false;
    const element = document.getElementById('app');

    for (const route of routes) {
      // Check if the current hash matches the route's path regex
      if (route.path.test(hash)) {
        routeFound = true;
        element.innerHTML = `<div class="flex justify-center items-center h-screen animate-spin">${loaderIcon}</div>`; // Show loader while fetching content
        const content = await route.view();
        element.innerHTML = ''; // Clear the loader before rendering the new content
        element.className = route.noContentClass ? '' : 'flex flex-col lg:flex-row mx-8 lg:mx-36 justify-center';
        // If the route has a custom layout, use it. Otherwise, use the default layout with or without sidebar.
        if (route.layout) {
          element.innerHTML = route.layout(content);
        } else {
          if (route.sidebar) {
            element.innerHTML = defaultLayout(content, route.sidebar());
          } else {
            element.innerHTML = defaultLayout(content);
          }
        }
        const navbar = document.getElementById('navbar');
        // Only render the navigation bar if the user is logged in and the navbar element exists in the DOM
        if (navbar) {
          navbar.innerHTML = renderNav();
        }
        window.scrollTo(0, 0);
        return;
      }
    }

    // Handle 404 - If no route matches, show the page not found view
    if (!routeFound) {
      element.className = 'flex flex-col lg:flex-row justify-center mx-8 lg:mx-36';
      const content = pageNotFound();
      const auth = useAuth();
      // If the user is logged in, show the default layout with navbar. Otherwise, show the clean layout without navbar.
      if (auth.isLoggedIn()) {
        element.innerHTML = defaultLayout(content);
        document.getElementById('navbar').innerHTML = renderNav();
      } else {
        element.innerHTML = cleanLayout(content);
      }
    }
  };

  // Listen for navigation events
  window.addEventListener('hashchange', handleRoute); // Handle the initial route when the page loads
  window.addEventListener('load', () => {
    handleRoute();
  });
};