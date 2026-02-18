import gradientImg from '../../images/gradient.jpg';
import { likeIcon } from "./icons/likeIcon";
import { commentIcon } from "./icons/commentIcon";
import { shareIcon } from "./icons/shareIcon";
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
    ? `<img alt="${post.media.alt || 'Post Image'}" data-src="${post.media.url}" class="rounded-lg mb-7 w-full h-auto object-cover max-h-[500px] lazyload">`
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
        <a href="#/profile/${post.author.name}">
          <div class="flex items-center gap-3">
            <img data-src="${post.author.avatar.url}" alt="${avatarImgAlt}" class="rounded-full w-10 h-10 lazyload">
            <div>
              <h2 class="text-main-white text-base">${post.author.name}</h2>
              <p class="text-gray-medium text-sm">${formattedDate}</p>
            </div>
          </div>
        </a>
        ${cardDropdownSettings(post)}
      </header>

      <section class="text-main-white">
        <a href="#/post/${post.id}">
          <div class="flex flex-col gap-2 mb-5">
            <h3 class="text-2xl font-semibold">${post.title}</h3>
            <p class="text-sm leading-relaxed text-ellipsis overflow-hidden">${post.body}</p>
          </div>
          ${postMediaImg}
        </a>
      </section>

      <footer class="text-gray-light text-sm flex items-center justify-between mb-5">
        <div class="flex gap-3">
          <a href="#/post/${post.id}" class="flex items-center gap-2 cursor-pointer">
            ${likeIcon} ${totalLikes} Likes
          </a>
          <a href="#/post/${post.id}" class="flex items-center gap-2 cursor-pointer">
            ${commentIcon} ${totalComments} Comments
          </a>
        </div>
        <a href="#/post/${post.id}" class="flex items-center gap-2 cursor-pointer">
          ${shareIcon} Share
        </a>
      </footer>

      <section>
        <form class="flex items-center gap-4">
          <img data-src="${currentUserAvatar}" alt="${currentUserAlt}" class="rounded-full w-10 h-10 lazyload">
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