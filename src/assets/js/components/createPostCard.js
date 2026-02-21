import gradientImg from '../../images/gradient.jpg';
import { imageIcon } from './icons/imageIcon';
import { videoIcon } from './icons/videoIcon';
import { eventIcon } from './icons/eventIcon';
import useModal from '../utils/useModal';
import { createPostModal } from './modals/createPostModal';
import { useAuth } from '../utils/useAuth';

export function createPostCard() {
  const { openModal } = useModal();

  const modalContent = createPostModal();

  const openCreatePostModal = () => {
    openModal(modalContent);
  };
  addEventListener('click', (event) => {
    if (event.target.closest('#open-create-post-modal')) {
      openCreatePostModal();
    }
  });

  const auth = useAuth();
  const currentUserAvatar = auth.getUserData()?.avatar?.url || gradientImg;
  const currentUserAlt = auth.getUserData()?.avatar?.alt || 'User Avatar';

  return `
    <section class="card mb-6 w-full lg:w-[576px]">
      <div class="flex items-center gap-4 mb-5">
        <img src="${currentUserAvatar}" alt="${currentUserAlt}" class="rounded-full w-10 h-10 object-cover">
        <button id="open-create-post-modal" class="flex-1 text-left bg-surface-medium rounded-lg p-4 text-gray-medium text-sm hover:bg-surface-light hover:cursor-pointer smooth-transition">
          What's on your mind?
        </button>
      </div>

      <div class="flex items-center justify-between">
        <div class="text-gray-light flex gap-3">
          <button id="open-create-post-modal" class="your-styles hover:text-main-white hover:cursor-pointer">
            ${imageIcon}
          </button>
          <button id="open-create-post-modal" class="your-styles hover:text-main-white hover:cursor-pointer">
            ${videoIcon}
          </button>
          <button id="open-create-post-modal" class="your-styles hover:text-main-white hover:cursor-pointer">
            ${eventIcon}
          </button>
        </div>
        <button id="open-create-post-modal" class="text-base rounded-lg bg-main-neon px-4 py-2 font-medium text-black smooth-transition hover:scale-105 hover:cursor-pointer">
          Create a post
        </button>
      </div>
    </section>
  `;
};