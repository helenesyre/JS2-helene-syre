import gradientImg from '../../src/assets/images/gradient.jpg';
import { editIcon } from '../assets/js/components/icons/editIcon';
import { likeIcon } from "../assets/js/components/icons/likeIcon";
import { commentIcon } from "../assets/js/components/icons/commentIcon";
import { useAuth } from '../assets/js/utils/useAuth';


export function profile() {
  const profileName = localStorage.getItem('profileName') || 'User';
  const auth = useAuth();
  const currentUserAvatar = auth.getUserData()?.avatar?.url || gradientImg;
  const currentUserAlt = auth.getUserData()?.avatar?.alt || 'User Avatar';

  return `
    <div class="flex items-center gap-6 mb-10">
      <div class="relative">
        <img src="${currentUserAvatar}" alt="${currentUserAlt}" class="rounded-full w-30 h-30 mb-4">
        <button class="absolute bottom-0 right-0 rounded-full p-2 bg-main-white text-main-black border-5 border-main-black">${editIcon}</button>
      </div>
      <div>
        <h1 class="text-2xl font-bold">${profileName.charAt(0).toUpperCase() + profileName.slice(1)}</h1>
        <p class="text-gray-light">@${profileName.toLowerCase()}</p>
        <div class="flex gap-6 mt-3">
          <p>0 Posts</p>
          <p>0 Following</p>
          <p>0 Followers</p>
        </div>
      </div>
    </div>
    <div id="posts" class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
      <article class="card flex flex-col justify-between hover:bg-surface-medium hover:cursor-pointer smooth-transition">
        <section class="text-main-white">
          <div class="flex flex-col gap-2 mb-5">
            <h3 class="text-2xl font-semibold line-clamp-2 text-ellipsis">Long-awaited vacation to Mexico this weekend</h3>
            <p class="text-sm leading-relaxed line-clamp-3">Spent a week in Mexico with friends. The beaches were beautiful and the sunsets were unforgettable!</p>
          </div>
        </section>
        <footer class="text-gray-light text-sm flex gap-3">
          <button class="flex items-center gap-2">${likeIcon} 12</button>
          <button class="flex items-center gap-2">${commentIcon} 2</button>
        </footer>
      </article>
      <article class="card flex flex-col justify-between hover:bg-surface-medium hover:cursor-pointer smooth-transition">
        <section class="text-main-white">
          <div class="flex flex-col gap-2 mb-5">
            <h3 class="text-2xl font-semibold line-clamp-2 text-ellipsis">A new single</h3>
            <p class="text-sm leading-relaxed line-clamp-3">Yesterday the band and I recorded a new single. You'll be able to listen to it on all music platforms soon. Stay tuned for the release date and behind-the-scenes stories!</p>
          </div>
        </section>
        <footer class="text-gray-light text-sm flex gap-3">
          <button class="flex items-center gap-2">${likeIcon} 10</button>
          <button class="flex items-center gap-2">${commentIcon} 4</button>
        </footer>
      </article>
      <article class="card flex flex-col justify-between hover:bg-surface-medium hover:cursor-pointer smooth-transition">
        <section class="text-main-white">
          <div class="flex flex-col gap-2 mb-5">
            <h3 class="text-2xl font-semibold line-clamp-2 text-ellipsis">Delicious dinner</h3>
            <p class="text-sm leading-relaxed line-clamp-3">Cooked a new recipe today! It turned out amazing and I want to share it with you all. Recipe coming soon.</p>
          </div>
        </section>
        <footer class="text-gray-light text-sm flex gap-3">
          <button class="flex items-center gap-2">${likeIcon} 8</button>
          <button class="flex items-center gap-2">${commentIcon} 1</button>
        </footer>
      </article>
      <article class="card flex flex-col justify-between hover:bg-surface-medium hover:cursor-pointer smooth-transition">
        <section class="text-main-white">
          <div class="flex flex-col gap-2 mb-5">
            <h3 class="text-2xl font-semibold line-clamp-2 text-ellipsis">Quick update</h3>
            <p class="text-sm leading-relaxed line-clamp-3">Busy week. More soon!</p>
          </div>
        </section>
        <footer class="text-gray-light text-sm flex gap-3">
          <button class="flex items-center gap-2">${likeIcon} 3</button>
          <button class="flex items-center gap-2">${commentIcon} 0</button>
        </footer>
      </article>
      <article class="card flex flex-col justify-between hover:bg-surface-medium hover:cursor-pointer smooth-transition">
        <section class="text-main-white">
          <div class="flex flex-col gap-2 mb-5">
            <h3 class="text-2xl font-semibold line-clamp-2 text-ellipsis">Book recommendationsaretestingheretestagain ttest</h3>
            <p class="text-sm leading-relaxed line-clamp-3">Just finished reading an amazing book. Highly recommend it to everyone who loves adventure, mystery, and a little bit of magic. Let me know if you want the title!</p>
          </div>
        </section>
        <footer class="text-gray-light text-sm flex gap-3">
          <button class="flex items-center gap-2">${likeIcon} 7</button>
          <button class="flex items-center gap-2">${commentIcon} 0</button>
        </footer>
      </article>
    </div>
  `;
}


