import { home } from '../../../pages/home.js';
import { profile } from '../../../pages/profile.js';
import { postPage } from '../../../pages/postPage.js';
import { register } from '../../../pages/register.js';
import { login } from '../../../pages/login.js';
import { pageNotFound } from '../../../pages/pageNotFound.js';
import { comingSoon } from '../../../pages/comingSoon.js';

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

  function handleRoute() {
    const hash = window.location.hash || '#/'; // Default to home if no hash
    const content = routes[hash] ? routes[hash]() : pageNotFound(); // Get the content for the current route or show 404
    document.getElementById('app').innerHTML = content; // Update the #app element with the content
  }

  // Listen for navigation events
  window.addEventListener('hashchange', handleRoute); // Handle the initial route when the page loads
  window.addEventListener('load', () => {
    handleRoute();
  });
};