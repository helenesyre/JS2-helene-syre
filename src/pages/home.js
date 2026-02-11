import { feedNavigation } from "../assets/js/components/feedNavigation";
import { createPostCard } from "../assets/js/components/createPostCard";

export function home() {
  return `
    ${feedNavigation()}
    <div class="home">
      ${createPostCard()}
      <h1 class="text-3xl font-bold mb-4">Home Page</h1>
      <p class="text-lg">Welcome to the home page! Here you can find the latest updates and news.</p>
    </div>
  `;
}