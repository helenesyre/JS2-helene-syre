import { ellipsisIcon } from "./icons/ellipsisIcon";
import { useAuth } from '../utils/useAuth';
import { deletePost } from "../utils/fetch";
import { createEditPostModal } from './modals/createEditPostModal';
import useModal from "../utils/useModal";
import { showToast } from "../utils/toast";

// Generates a unique id for each dropdown instance
let dropdownIdCounter = 0;

/**
 * Creates a dropdown menu for card settings, including actions like edit and delete.
 * @param {Object} post - The post object containing the current post data.
 * @returns {string} - The HTML structure for the card dropdown settings.
 */
export function cardDropdownSettings(post) {
  const dropdownId = `dropdown-${dropdownIdCounter++}`;
  const isAuthor = useAuth().getUserData()?.name === post.author.name;

  setTimeout(() => {
    // Attach event listener for this dropdown instance
    const btn = document.querySelector(`[data-dropdown-btn="${dropdownId}"]`);
    const dropdownMenu = document.querySelector(`[data-dropdown-menu="${dropdownId}"]`);
    if (!btn || !dropdownMenu) return; // If elements are not found, exit early
    const dropdownMenuActions = dropdownMenu.querySelector(`#dropdown-menu-actions`);
    if (btn) {
      btn.addEventListener('click', function (event) {
        const menu = document.querySelector(`[data-dropdown-menu="${dropdownId}"]`);
        if (menu) {
          // Hide all other dropdowns first
          document.querySelectorAll('.card-dropdown').forEach(dropdown => {
            if (dropdown !== menu) dropdown.classList.add('hidden');
          });
          menu.classList.toggle('hidden');
        }
        event.stopPropagation();
      });
    }
    if (dropdownMenuActions) {
      dropdownMenuActions.addEventListener('click', async function (event) {
        event.stopPropagation(); // Prevent click from bubbling up to document
        if (event.target.dataset.dropdownAction === 'delete') {
          const response = await deletePost(post.id);
          if (response.status === 204) {
            showToast('Post deleted successfully!', 'success');
            setTimeout(() => {
              window.location.reload();
            }, 750);
          } else {
            showToast('Failed to delete post. Please try again.', 'error');
          }
        }
        if (event.target.dataset.dropdownAction === 'edit') {
          useModal().closeModal(); // Close any open modal first
          const modalContent = createEditPostModal(post);
          useModal().openModal(modalContent);
          if (dropdownMenu) dropdownMenu.classList.add('hidden'); // Hide the dropdown menu
        }
      });
    }
  }, 0);

  // Click outside closes all dropdowns
  document.addEventListener('click', function () {
    document.querySelectorAll('.card-dropdown').forEach(dropdown => dropdown.classList.add('hidden'));
  });

  if (!isAuthor) {
    return `
    <div class="dropdown-wrapper relative inline-block">
      <button type="button" class="dropbtn p-1 rounded focus:outline-none focus:ring-2 focus:ring-gray-muted focus:bg-surface-light" aria-label="More options" data-dropdown-btn="${dropdownId}">${ellipsisIcon}</button>
      <div class="card-dropdown absolute right-0 mt-2 w-48 bg-surface-medium rounded-lg shadow-2xl z-10 hidden" data-dropdown-menu="${dropdownId}">
        <ul class="py-1" id="dropdown-menu-actions">
          <a href="#/profile/${post.author.name}"><li class="px-4 py-2 hover:bg-surface-light cursor-pointer smooth-transition">See profile</li></a>
          <li class="px-4 py-2 hover:bg-surface-light cursor-pointer smooth-transition">Add to saved</li>
          <a href="#/post/${post.id}"><li class="px-4 py-2 hover:bg-surface-light cursor-pointer smooth-transition">Go to post</li></a>
          <li class="px-4 py-2 hover:bg-surface-light cursor-pointer smooth-transition">Share post</li>
          <li class="px-4 py-2 hover:bg-surface-light cursor-pointer text-red-400 smooth-transition">Report</li>
        </ul>
      </div>
    </div>
  `;
  } else {
    return `
    <div class="dropdown-wrapper relative inline-block">
      <button type="button" class="dropbtn p-1 rounded focus:outline-none focus:ring-2 focus:ring-gray-muted focus:bg-surface-light" aria-label="More options" data-dropdown-btn="${dropdownId}">${ellipsisIcon}</button>
      <div class="card-dropdown absolute right-0 mt-2 w-48 bg-surface-medium rounded-lg shadow-2xl z-10 hidden" data-dropdown-menu="${dropdownId}">
        <ul class="py-1" id="dropdown-menu-actions">
          <li data-dropdown-action="edit" class="px-4 py-2 hover:bg-surface-light cursor-pointer smooth-transition">Edit</li>
          <a href="#/post/${post.id}"><li class="px-4 py-2 hover:bg-surface-light cursor-pointer smooth-transition">Go to post</li></a>
          <li class="px-4 py-2 hover:bg-surface-light cursor-pointer smooth-transition">Share post</li>
          <li data-dropdown-action="delete" class="px-4 py-2 hover:bg-surface-light cursor-pointer text-red-400 smooth-transition">Delete</li>
        </ul>
      </div>
    </div>
  `;
  }
};
