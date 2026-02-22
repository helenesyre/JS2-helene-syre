import { editIcon } from './icons/editIcon.js';
import { settingsIcon } from './icons/settingsIcon.js';
import { logoutIcon } from './icons/logoutIcon.js';
import { useAuth } from '../utils/useAuth.js';

const auth = useAuth();
document.addEventListener('click', function (event) {
  if (event.target.closest('#logout-button')) {
    auth.logout(); // Clear user data and tokens from localStorage
    window.location.hash = '#/login';
  }
});

/**
 * Creates a profile sidebar component with actions for editing the profile, accessing settings, and logging out.
 * @returns {string} - The HTML structure for the profile sidebar.
 */
export function profileSidebar() {
  return `
    <section class="flex flex-col gap-6">
      <div class="card text-main-white">
        <h2 class="text-lg mb-2">Profile Actions</h2>
        <ul>
          <li class="flex items-center gap-2 p-3 rounded-lg hover:cursor-pointer hover:bg-surface-medium smooth-transition">${editIcon}Edit Profile</li>
          <li class="flex items-center gap-2 p-3 rounded-lg hover:cursor-pointer hover:bg-surface-medium smooth-transition">${settingsIcon}Settings</li>
          <li id="logout-button" class="flex items-center gap-2 p-3 rounded-lg hover:cursor-pointer hover:bg-surface-medium text-red-400 smooth-transition">${logoutIcon}Logout</li>
        </ul>
      </div>
    </section>
  `;
};