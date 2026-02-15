import gradientImg from '../../src/assets/images/gradient.jpg';
import { editIcon } from '../assets/js/components/icons/editIcon';

export function profile() {
  const profileName = localStorage.getItem('profileName') || 'User';
  return `
    <div class="flex items-center gap-6 mb-10">
      <div class="relative">
        <img src="${gradientImg}" alt="Profile Avatar" class="rounded-full w-30 h-30 mb-4">
        <button class="absolute bottom-0 right-0 rounded-full p-2 bg-main-white text-main-black border-5 border-main-black">${editIcon}</button>
      </div>
      <div>
        <h1 class="text-2xl font-bold">${profileName.charAt(0).toUpperCase() + profileName.slice(1)}</h1>
        <p class="text-gray-light">@${profileName.toLowerCase()}</p>
        <div class="flex gap-6 mt-3">
          <p>0 Posts</p>
          <p>0 Following</p>
          <p>0 Followers</p>
        </div>
      </div>
    </div>
  `;
}


