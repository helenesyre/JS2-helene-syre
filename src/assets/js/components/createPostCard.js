import gradientImg from '../../images/gradient.jpg';
import { imageIcon } from './icons/imageIcon';
import { videoIcon } from './icons/videoIcon';
import { eventIcon } from './icons/eventIcon';

export function createPostCard() {
  return `
    <section class="card mb-6">
      <div class="flex items-center gap-4 mb-5">
        <img src="${gradientImg}" alt="User Avatar" class="rounded-full w-10 h-10">
        <button onclick="" class="flex-1 text-left bg-surface-medium rounded-lg p-4 text-gray-medium text-sm">
          What's on your mind?
        </button>
      </div>

      <div class="flex items-center justify-between">
        <div class="text-gray-light flex gap-3">
          <button class="your-styles">
            ${imageIcon}
          </button>
          <button class="your-styles">
            ${videoIcon}
          </button>
          <button class="your-styles">
            ${eventIcon}
          </button>
        </div>
        <button class="text-base rounded-lg bg-main-neon px-4 py-2 font-medium text-black transform transition-transform duration-200 hover:scale-105 hover:cursor-pointer">
          Create a post
        </button>
      </div>
    </section>
  `;
};