import { getPostById } from '../assets/js/utils/fetch.js';
import { useAuth } from '../assets/js/utils/useAuth.js';
import { likeIcon } from '../assets/js/components/icons/likeIcon';
import { commentIcon } from '../assets/js/components/icons/commentIcon';
import { shareIcon } from '../assets/js/components/icons/shareIcon';
import { cardDropdownSettings } from '../assets/js/components/cardDropdownSettings';
import gradientImg from '../assets/images/gradient.jpg';

/**
 * Renders the post page, displaying the details of a specific post based on the
 * ID provided in the URL hash. It includes the post's author information, content,
 * media, and interactions such as likes and comments.
 * @returns {string} HTML string representing the post page content.
 */
export async function postPage() {
  const hash = window.location.hash
  const postPageMatch = hash.match(/^#\/post\/([^\/]+)/);
  const id = postPageMatch ? postPageMatch[1] : null;
  // If no ID is provided, show an error message
  if (!id) {
    return (`
      <div class="postPage">
        <h1 class="text-3xl font-bold mb-4">Post not found</h1>
        <p>No post ID provided in the URL.</p>
      </div>`
    );
  }

  // Fetch the post data by ID
  const post = await getPostById(id);
  const postData = post.data || post;

  // If the post data is not found or contains errors, show an error message
  if (!postData || post.errors || !postData.id) {
    return (`
      <div class="postPage">
        <h1 class="text-3xl font-bold mb-4">Post not found</h1>
        <p>The post you are looking for does not exist or could not be loaded.</p>
      </div>`
    );
  }

  const totalLikes = postData.reactions?.reduce((sum, r) => sum + (r.count || 0), 0) || 0;
  const totalComments = postData.comments?.length || 0;
  const avatarImgAlt = postData.author?.avatar?.alt || 'User Avatar';
  const postMediaImg = postData.media?.url
    ? `<img src="${postData.media.url}" alt="${postData.media.alt || 'Post Image'}" class="rounded-lg mb-7 w-full h-auto object-cover max-h-[500px]">`
    : '';
  const postDate = (postData.updated && postData.updated !== postData.created) ? postData.updated : postData.created;
  const formattedDate = new Date(postDate).toLocaleDateString('no-NO', {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedCommentDate = (commentDate) => new Date(commentDate).toLocaleDateString('no-NO', {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const auth = useAuth();
  const currentUserAvatar = auth.getUserData()?.avatar?.url || gradientImg;
  const currentUserAlt = auth.getUserData()?.avatar?.alt || 'User Avatar';

  return `
    <article class="card mb-6 w-full lg:w-[576px]">
      <header class="flex items-start justify-between mb-5">
      <a href="#/profile/${postData.author.name}">
        <div class="flex items-center gap-3">
          <img src="${postData.author.avatar.url}" alt="${avatarImgAlt}" class="rounded-full w-10 h-10 object-cover">
          <div>
            <h2 class="text-main-white text-base">${postData.author.name}</h2>
            <p class="text-gray-medium text-sm">${formattedDate}</p>
          </div>
        </div>
      </a>
        ${cardDropdownSettings(postData)}
      </header>

      <section class="text-main-white">
        <div class="flex flex-col gap-2 mb-5">
          <h3 class="text-2xl font-semibold">${postData.title}</h3>
          <p class="text-sm leading-relaxed text-ellipsis overflow-hidden">${postData.body}</p>
        </div>
        ${postMediaImg}
      </section>

      <footer class="text-gray-light text-sm flex items-center justify-between mb-5">
        <div class="flex gap-3">
          <button class="flex items-center gap-2">${likeIcon} ${totalLikes} <span class="hidden md:inline">Likes</span></button>
          <button class="flex items-center gap-2">${commentIcon} ${totalComments} <span class="hidden md:inline">Comments</span></button>
        </div>
        <button class="flex items-center gap-2">${shareIcon} <span class="hidden md:inline">Share</span></button>
      </footer>

      <section class="border-t border-surface-light pt-5">
        <h3 class="text-lg font-medium text-main-white mb-4">Comments</h3>
        ${postData.comments && postData.comments.length > 0 ? postData.comments.map(comment => `
          <div class="mb-4">
            <div class="flex items-start gap-3 mb-2">
              <img src="${comment.author.avatar.url}" alt="${comment.author.avatar.alt || 'User Avatar'}" class="rounded-full w-10 h-10 object-cover">
              <div>
                <div class="flex gap-1 bg-surface-medium py-2 px-3 rounded-lg items-center">
                  <p class="font-semibold text-main-neon">${comment.author.name}</p>
                  <p>${comment.body}</p>
                </div>
                <p class="text-gray-light text-sm mt-1">${formattedCommentDate(comment.created)}</p>
              </div>
            </div>
          </div>
          `).join('')
      : `<p class="text-gray-light text-center pb-10 pt-2">No comments yet</p>`}
      </section>

      <section class="border-t border-surface-light pt-5">
        <form class="flex items-center gap-4">
          <img src="${currentUserAvatar}" alt="${currentUserAlt}" class="rounded-full w-10 h-10 object-cover">
          <input
            type="text"
            placeholder="Write your comment"
            aria-label="Write a comment"
            class="flex-1 text-left bg-surface-medium rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-gray-muted"
          />
        </form>
      </section>
    </article>
  `;
}