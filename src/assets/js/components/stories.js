import { createIcon } from "./icons/createIcon";

const storyImg1 = "https://images.unsplash.com/photo-1560942485-b2a11cc13456?q=80&w=1336&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const storyImg2 = "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export function stories() {
  return `
    <section class="mb-10">
      <h2 class="text-lg mb-4 pb-2 border-b border-gray-medium">Stories</h2>
      <div class="flex flex-wrap gap-6 justify-between">
        <div class="flex flex-col text-center items-center gap-2">
          <div class="rounded-full border-1 border-main-neon p-1 flex items-center justify-center hover:border-main-white hover:scale-105 cursor-pointer smooth-transition">
            <div class="rounded-full text-black bg-main-neon flex items-center justify-center w-12 h-12">
              <span class="scale-110">${createIcon}</span>
            </div>
          </div>
          <p class="text-sm text-gray-light"> Add Story </p>
        </div>
        <div class="flex flex-col text-center items-center gap-2">
          <div class="rounded-full border-1 border-main-neon p-1 flex items-center justify-center hover:border-main-white hover:scale-105 cursor-pointer smooth-transition">
            <img src="${storyImg1}" alt="User story" class="rounded-full w-12 h-12 object-cover">
          </div>
          <p class="text-sm text-gray-light">Isabella_B</p>
        </div>
        <div class="flex flex-col text-center items-center gap-2">
          <div class="rounded-full border-1 border-main-neon p-1 flex items-center justify-center hover:border-main-white hover:scale-105 cursor-pointer smooth-transition">
            <img src="${storyImg2}" alt="User story" class="rounded-full w-12 h-12 object-cover">
          </div>
          <p class="text-sm text-gray-light">Nova</p>
        </div>
      </div>
    </section>
  `;
};