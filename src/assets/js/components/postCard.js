import gradientImg from '../../images/gradient.jpg';
import { likeIcon } from "./icons/likeIcon";
import { commentIcon } from "./icons/commentIcon";
import { shareIcon } from "./icons/shareIcon";
import { ellipsisIcon } from "./icons/ellipsisIcon";
import { cardDropdownSettings } from "./cardDropdownSettings";
import { useAuth } from '../utils/useAuth';

/**
 * Source:
 * https://www.w3schools.com/jsref/jsref_tolocaledatestring.asp
 */

export function postCard(post) {
  const totalLikes = post.reactions?.reduce((sum, r) => sum + (r.count || 0), 0) || 0;
  const totalComments = post.comments?.length || 0;
  const avatarImgAlt = post.author?.avatar?.alt || 'User Avatar';
  const postMediaImg = post.media?.url
    ? `<img src="${post.media.url}" alt="${post.media.alt || 'Post Image'}" class="rounded-lg mb-7 w-full h-auto object-cover">`
    : '';
  const postDate = (post.updated && post.updated !== post.created) ? post.updated : post.created;
  const formattedDate = new Date(postDate).toLocaleDateString('no-NO', {
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
    <article class="card mb-6">
      <header class="flex items-start justify-between mb-5">
        <div class="flex items-center gap-3">
          <img src="${post.author.avatar.url}" alt="${avatarImgAlt}" class="rounded-full w-10 h-10">
          <div>
            <h2 class="text-main-white text-base">${post.author.name}</h2>
            <p class="text-gray-medium text-sm">${formattedDate}</p>
          </div>
        </div>
        ${cardDropdownSettings()}
      </header>

      <section class="text-main-white">
        <div class="flex flex-col gap-2 mb-5">
          <h3 class="text-2xl font-semibold">${post.title}</h3>
          <p class="text-sm leading-relaxed text-ellipsis overflow-hidden">${post.body}</p>
        </div>

        ${postMediaImg}
      </section>

      <footer class="text-gray-light text-sm flex items-center justify-between mb-5">
        <div class="flex gap-3">
          <button class="flex items-center gap-2">${likeIcon} ${totalLikes} Likes</button>
          <button class="flex items-center gap-2">${commentIcon} ${totalComments} Comments</button>
        </div>
        <button class="flex items-center gap-2">${shareIcon} Share</button>
      </footer>

      <section>
        <form class="flex items-center gap-4">
          <img src="${currentUserAvatar}" alt="${currentUserAlt}" class="rounded-full w-10 h-10">
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
};