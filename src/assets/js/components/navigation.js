import { navLogo } from "./navLogo";
import { homeIcon } from "./icons/homeIcon";
import { messageIcon } from "./icons/messageIcon";
import { savedPostsIcon } from "./icons/savedPostsIcon";
import { notificationsIcon } from "./icons/noticifationsIcon";
import { createIcon } from "./icons/createIcon";
import { profileIcon } from "./icons/profileIcon";
import useModal from "../utils/useModal";
import { createPostModal } from "./createPostModal";

export function renderNav() {
  const currentHash = window.location.hash || '#/';
  const links = [
    { href: '#/', label: 'Home', icon: homeIcon },
    { href: '#/messages', label: 'Messages', icon: messageIcon },
    { href: '#/saved-posts', label: 'Saved Posts', icon: savedPostsIcon },
    { href: '#/notifications', label: 'Notifications', icon: notificationsIcon },
    { href: '#/create', label: 'Create', icon: createIcon },
    { href: '#/profile', label: 'Profile', icon: profileIcon },
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
    <div class="space-y-4">
      ${links.map(link => `
        <a href="${link.href}" class="flex items-center hover:bg-main-white hover:text-main-black p-3 rounded-xl smooth-transition ${currentHash === link.href ? ' bg-main-neon text-main-black' : ' text-gray-light'}">
          <span class="mr-2">${link.icon}</span>
          ${link.label}
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