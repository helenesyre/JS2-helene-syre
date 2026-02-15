import { home } from '../../../pages/home.js';
import { profile } from '../../../pages/profile.js';
import { postPage } from '../../../pages/postPage.js';
import { register } from '../../../pages/register.js';
import { login } from '../../../pages/login.js';
import { pageNotFound } from '../../../pages/pageNotFound.js';
import { comingSoon } from '../../../pages/comingSoon.js';
import cleanLayout from '../components/layouts/cleanLayout.js';
import defaultLayout from '../components/layouts/defaultLayout.js';
import { renderNav } from '../components/navigation.js';

/**
 * Source: Code from my portfolio project
 */
export function router() {
  const routes = {
    '#/': home,
    '#/profile': profile,
    '#/postPage': postPage,
    '#/register': register,
    '#/login': login,
    '#/comingSoon': comingSoon,
    '#/saved-posts': comingSoon,
    '#/messages': comingSoon,
    '#/notifications': comingSoon,
    '#/create': comingSoon,
  };

  async function handleRoute() {
    const hash = window.location.hash || '#/'; // Default to home if no hash
    const content = routes[hash] ? await routes[hash]() : pageNotFound(); // Get the content for the current route or show 404
    const element = document.getElementById('app');
    if (hash === '#/login' || hash === '#/register') {
      element.className = '';
      element.innerHTML = cleanLayout(content); // Use clean layout for login and register pages
    } else {
      element.className = 'flex flex-row justify-center mx-36'
      element.innerHTML = defaultLayout(content); // Use default layout for all other pages
      document.getElementById('navbar').innerHTML = renderNav();
    }
  }

  // Listen for navigation events
  window.addEventListener('hashchange', handleRoute); // Handle the initial route when the page loads
  window.addEventListener('load', () => {
    handleRoute();
  });
};