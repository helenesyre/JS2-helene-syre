import defaultLayout from '../components/layouts/defaultLayout.js';
import { renderNav } from '../components/navigation.js';
import { routes } from './routes.js';
import { pageNotFound } from '../../../pages/pageNotFound.js';
import cleanLayout from '../components/layouts/cleanLayout.js';
import { useAuth } from '../utils/useAuth.js';

export function router() {
  async function handleRoute() {
    const hash = window.location.hash || '#/'; // Default to home if no hash
    let routeFound = false;
    const element = document.getElementById('app');

    for (const route of routes) {
      // Check if the current hash matches the route's path regex
      if (route.path.test(hash)) {
        routeFound = true;
        const content = await route.view();
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
        document.getElementById('navbar').innerHTML = renderNav();
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