import useModal from "../utils/useModal";
import { closeIcon } from './icons/closeIcon';
import { infoIcon } from "./icons/infoIcon";

export function createPostModal() {
  const { closeModal, isOpen } = useModal();

  addEventListener('click', (event) => {
    if (event.target.closest('#close-create-post')) {
      closeModal();
    }
    if (!event.target.closest('#create-post-modal-content') && event.target.closest('#create-post-modal')) {
      closeModal();
    }
  });

  return `
    <div id="create-post-modal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div id="create-post-modal-content" class="bg-surface-dark rounded-lg p-6 w-full max-w-md relative">
        <button id="close-create-post" class="absolute top-3 right-3 text-gray-light hover:text-main-neon hover:cursor-pointer">
          ${closeIcon}
        </button>
        <h2 class="text-xl font-bold mb-4">Create New Post</h2>
        <form id="create-post-form" class="flex flex-col gap-4">
          <div class="flex flex-col">
            <label for="post-title" class="text-sm font-medium mb-1">Title *</label>
            <input type="text" id="post-title" class="bg-surface-medium rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-muted" placeholder="Post Title" required>
          </div>
          <div class="flex flex-col">
            <label for="post-content" class="text-sm font-medium mb-1">Content</label>
            <textarea id="post-content" class="bg-surface-medium rounded-lg p-2 h-32 resize-none text-sm focus:outline-none focus:ring-2 focus:ring-gray-muted" placeholder="What's on your mind?" required></textarea>
          </div>
          <div class="flex flex-col mb-4">
            <label for="post-image-url" class="text-sm font-medium mb-1 flex items-center gap-1">Image URL ${infoIcon}</label>
            <input type="text" id="post-image-url" class="bg-surface-medium rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-muted" placeholder="Image URL (optional)">
          </div>
          <button type="submit" class="bg-main-neon text-black font-medium py-2 rounded hover:bg-main-neon-dark transition-colors">
            Create post
          </button>
        </form>
      </div>
    </div>
  `;
};
