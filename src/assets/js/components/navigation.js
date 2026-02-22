import { navLogo } from "./navLogo";
import { homeIcon } from "./icons/homeIcon";
import { messageIcon } from "./icons/messageIcon";
import { savedPostsIcon } from "./icons/savedPostsIcon";
import { notificationsIcon } from "./icons/noticifationsIcon";
import { createIcon } from "./icons/createIcon";
import { profileIcon } from "./icons/profileIcon";
import useModal from "../utils/useModal";
import { createPostModal } from "./modals/createPostModal";
import { useAuth } from "../utils/useAuth";

/**
 * Renders the navigation bar with links to different sections of the application. This includes:
 * - Home
 * - Messages
 * - Saved Posts
 * - Notifications
 * - Create
 * - Profile
 *
 * Highlights the active link based on the current URL hash and opens the create post modal when the Create link is clicked.
 * @returns {string} - The HTML structure for the navigation bar.
 */
export function renderNav() {
  const currentHash = window.location.hash || '#/';
  const auth = useAuth();
  const userdata = auth.getUserData();
  const links = [
    { href: '#/', label: 'Home', icon: homeIcon },
    { href: '#/messages', label: 'Messages', icon: messageIcon },
    { href: '#/saved-posts', label: 'Saved Posts', icon: savedPostsIcon },
    { href: '#/notifications', label: 'Notifications', icon: notificationsIcon },
    { href: '#/create', label: 'Create', icon: createIcon },
    { href: `#/profile/${userdata?.name}`, label: 'Profile', icon: profileIcon },
  ];

  const { openModal } = useModal();
  const modalContent = createPostModal();
  addEventListener('click', (event) => {
    if (event.target.closest('a') && event.target.closest('a').getAttribute('href') === '#/create') {
      event.preventDefault();
      openModal(modalContent);
    }
  });

  return `
    <a href="#/" class="flex items-center">${navLogo}</a>
    <div class="fixed bottom-0 left-0 lg:sticky lg:space-y-4 w-full h-16 md:h-auto z-50 bg-surface-dark lg:bg-transparent flex flex-row lg:flex-col justify-between lg:justify-start border-t border-gray-muted lg:border-none">
      ${links.map(link => `
        <a href="${link.href}" class="flex-1 flex flex-col lg:flex-row items-center justify-center lg:justify-start hover:bg-main-white hover:text-main-black p-3 lg:rounded-xl smooth-transition${currentHash === link.href ? ' bg-main-neon text-main-black' : ' text-gray-light'}">
          <span class="md:mb-1 lg:mr-2 lg:mb-0">${link.icon}</span>
          <span class="hidden md:inline md:text-sm lg:text-base">${link.label}</span>
        </a>
      `).join('')}
    </div>
  `;
};

// Renders the navigation bar into the #navbar element
export function displayNavBar() {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.innerHTML = renderNav();
  };
};

// Listen for hash changes and update the nav
window.addEventListener('hashchange', () => {
  displayNavBar();
});