import { feedNavigation } from "../assets/js/components/feedNavigation";
import { createPostCard } from "../assets/js/components/createPostCard";
import { postCard } from "../assets/js/components/postCard";

export function home() {
  return `
    ${feedNavigation()}
    <div class="home">
      <h1 class="sr-only">Welcome to Your Feed</h1>
      ${createPostCard()}
      ${postCard()}
      ${postCard()}
    </div>
  `;
}