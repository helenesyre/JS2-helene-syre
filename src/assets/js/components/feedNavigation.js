import { searchIcon } from "./icons/searchIcon";

export function feedNavigation() {
  return `
    <nav class="flex items-center justify-between mb-9">
      <!-- Left tabs -->
      <div class="flex items-center gap-3">
        <button class="rounded-lg bg-main-neon px-4 py-2 text-sm font-medium text-black hover:cursor-pointer smooth-transition">
          Feed
        </button>

        <button class="rounded-lg px-4 py-2 text-sm text-gray-light hover:text-white hover:cursor-pointer smooth-transition">
          Following
        </button>

        <button class="rounded-lg px-4 py-2 text-sm text-gray-light hover:text-white hover:cursor-pointer smooth-transition">
          Explore
        </button>
      </div>

      <!-- Search -->
      <div class="relative">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-medium">${searchIcon}</span>
        <input
          type="text"
          placeholder="Search"
          class="w-56 rounded-lg border border-gray-dark bg-input-bg-dark px-4 py-2 pl-10 text-sm text-main-white placeholder-gray-medium focus:outline-none focus:ring-2 focus:ring-gray-muted"
        />
      </div>
    </nav>
  `;
};