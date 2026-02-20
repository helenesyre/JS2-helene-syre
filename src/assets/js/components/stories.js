import gradientImg from '../../images/gradient.jpg';
import { createIcon } from "./icons/createIcon";

export function stories() {
  return `
    <section class="mb-10">
      <h2 class="text-lg mb-4 pb-2 border-b border-gray-medium">Stories</h2>
      <div class="flex justify-between">
        <div class="flex flex-col items-center gap-2">
          <div class="rounded-full border-1 border-main-neon p-1 flex items-center justify-center">
            <div class="rounded-full text-black bg-main-neon flex items-center justify-center w-12 h-12">
              <span class="scale-110">${createIcon}</span>
            </div>
          </div>
          <p class="text-sm text-gray-light"> Add Story </p>
        </div>
        <div class="flex flex-col items-center gap-2">
          <div class="rounded-full border-1 border-main-neon p-1 flex items-center justify-center">
            <img src="${gradientImg}" alt="User Avatar" class="rounded-full w-12 h-12 object-cover">
          </div>
          <p class="text-sm text-gray-light"> Story 2 </p>
        </div>
        <div class="flex flex-col items-center gap-2">
          <div class="rounded-full border-1 border-main-neon p-1 flex items-center justify-center">
            <img src="${gradientImg}" alt="User Avatar" class="rounded-full w-12 h-12 object-cover">
          </div>
          <p class="text-sm text-gray-light"> Story 3 </p>
        </div>
      </div>
    </section>
  `;
};