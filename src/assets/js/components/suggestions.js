import gradientImg from '../../images/gradient.jpg';

export function suggestions() {
  return `
    <section class="mb-6">
      <h2 class="text-base mb-4 pb-2 border-b border-gray-medium">Suggestions</h2>
      <ul class="space-y-4">
        <li class="flex items-center gap-4">
          <img src="${gradientImg}" alt="User Avatar" class="rounded-full w-8 h-8">
          <p class="text-sm font-medium">User 1</p>
        </li>
        <li class="flex items-center gap-4">
          <img src="${gradientImg}" alt="User Avatar" class="rounded-full w-8 h-8">
          <p class="text-sm font-medium">User 2</p>
        </li>
        <li class="flex items-center gap-4">
          <img src="${gradientImg}" alt="User Avatar" class="rounded-full w-8 h-8">
          <p class="text-sm font-medium">User 3</p>
        </li>
        <li class="flex items-center gap-4">
          <img src="${gradientImg}" alt="User Avatar" class="rounded-full w-8 h-8">
          <p class="text-sm font-medium">User 4</p>
        </li>
        <li class="flex items-center gap-4">
          <img src="${gradientImg}" alt="User Avatar" class="rounded-full w-8 h-8">
          <p class="text-sm font-medium">User 5</p>
        </li>
      </ul>
      <p class="text-sm text-gray-light mt-4 hover:cursor-pointer hover:underline">View more</p>
    </section>
  `;
};