import { feedNavigation } from "../assets/js/components/feedNavigation";
import { createPostCard } from "../assets/js/components/createPostCard";
import { postCard } from "../assets/js/components/postCard";
import { getAllPosts } from "../assets/js/utils/fetch";

export async function home() {
  const posts = await getAllPosts();
  return `
    ${feedNavigation()}
    <div class="max-w-xl">
      <h1 class="sr-only">Welcome to Your Feed</h1>
      ${createPostCard()}
      ${posts.data.map(post => postCard(post)).join('')}
    </div>
  `;
}