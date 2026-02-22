/**
 * Creates a suggestions section component, including a list of suggested users to follow with their avatars and follow buttons.
 * @returns {string} - The HTML structure for the suggestions section.
 */
export function suggestions() {
  const avatarImg1 = "https://images.unsplash.com/photo-1770701195265-8af0dc148446?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const avatarImg2 = "https://images.unsplash.com/photo-1769863467291-23cf7902f686?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const avatarImg3 = "https://images.unsplash.com/photo-1685871286419-58e4fc0de8e1?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const avatarImg4 = "https://images.unsplash.com/photo-1684139517679-032b7213ad2e?q=80&w=2428&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const avatarImg5 = "https://images.unsplash.com/photo-1679193559904-aea078fa7afd?q=80&w=2396&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return `
    <section class="mb-6">
      <h2 class="text-lg mb-4 pb-2 border-b border-gray-medium">Suggestions</h2>
      <ul class="space-y-4">
        <li class="flex items-center gap-4">
          <img src="${avatarImg1}" alt="User Avatar MichaelAnders" class="rounded-full w-8 h-8 min-w-8 min-h-8 object-cover">
          <div class="flex flex-wrap justify-between gap-1 items-center w-full text-sm">
            <p class="font-medium">MichaelAnders</p>
            <p class="text-main-neon hover:cursor-pointer hover:underline">Follow</p>
          </div>
        </li>
        <li class="flex items-center gap-4">
          <img src="${avatarImg2}" alt="User Avatar Alex_Morgan" class="rounded-full w-8 h-8 min-w-8 min-h-8 object-cover">
          <div class="flex flex-wrap justify-between gap-1 items-center w-full text-sm">
            <p class="font-medium">Alex_Morgan</p>
            <p class="text-main-neon hover:cursor-pointer hover:underline">Follow</p>
          </div>
        </li>
        <li class="flex items-center gap-4">
          <img src="${avatarImg3}" alt="User Avatar NightXP" class="rounded-full w-8 h-8 min-w-8 min-h-8 object-cover">
          <div class="flex flex-wrap justify-between gap-1 items-center w-full text-sm">
            <p class="font-medium">NightXP</p>
            <p class="text-main-neon hover:cursor-pointer hover:underline">Follow</p>
          </div>
        </li>
        <li class="flex items-center gap-4">
          <img src="${avatarImg4}" alt="User Avatar PixelCode" class="rounded-full w-8 h-8 min-w-8 min-h-8 object-cover">
          <div class="flex flex-wrap justify-between gap-1 items-center w-full text-sm">
            <p class="font-medium">PixelCode</p>
            <p class="text-main-neon hover:cursor-pointer hover:underline">Follow</p>
          </div>
        </li>
        <li class="flex items-center gap-4">
          <img src="${avatarImg5}" alt="User Avatar Emma_W" class="rounded-full w-8 h-8 min-w-8 min-h-8 object-cover">
          <div class="flex flex-wrap justify-between gap-1 items-center w-full text-sm">
            <p class="font-medium">Emma_W</p>
            <p class="text-main-neon hover:cursor-pointer hover:underline">Follow</p>
          </div>
        </li>
      </ul>
      <p class="text-sm text-gray-light mt-4 hover:cursor-pointer hover:underline">View more</p>
    </section>
  `;
};