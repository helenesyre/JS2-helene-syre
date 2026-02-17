import gradientImg from '../../src/assets/images/gradient.jpg';
import { editIcon } from '../assets/js/components/icons/editIcon';
import { likeIcon } from "../assets/js/components/icons/likeIcon";
import { commentIcon } from "../assets/js/components/icons/commentIcon";
import { useAuth } from '../assets/js/utils/useAuth';
import { followProfile, getPostsByProfile, getProfileData, unfollowProfile } from '../assets/js/utils/fetch';


export async function profile() {
  const hash = window.location.hash
  const profilePageMatch = hash.match(/^#\/profile\/(\w+)/);
  const profileName = profilePageMatch ? profilePageMatch[1] : null;
  const auth = useAuth();
  const profile = await getProfileData(profileName);

  // If no profile name is provided, show an error message
  if (!profile || profile.errors) {
    return (`
      <div class="profile">
        <h1 class="text-3xl font-bold mb-4">Profile not found</h1>
        <p>The profile you are looking for does not exist or could not be loaded.</p>
      </div>`
    );
  }

  const posts = await getPostsByProfile(profileName);

  const currentUserAvatar = profile.data.avatar.url || gradientImg;
  const currentUserAlt = profile.data.avatar.alt || 'User Avatar';

  // Check if the current user is following the profile by looking for the profile name in the followers list of the profile data
  const isFollowing = profile.data.followers.some(follower => follower.name === auth.getUserData()?.name);

  // Function to toggle follow/unfollow state when the follow button is clicked.
  // It calls the appropriate API function based on the current follow state and then reloads the page to reflect the changes.
  async function toggleFollow() {
    if (isFollowing) {
      await unfollowProfile(profileName);
      window.location.reload();
    } else {
      await followProfile(profileName);
      window.location.reload();
    }
  }
  // Use setTimeout to ensure the follow button is rendered after the initial profile data is loaded,
  // and then add the event listener for the follow/unfollow functionality.
  setTimeout(() => { // Wait for page to render before trying to access the follow button element
    const profileActions = document.getElementById('profile-header-actions');
    const followButton = document.createElement('button');

    followButton.textContent = isFollowing ? 'Unfollow' : 'Follow';
    followButton.className = `px-4 py-2 rounded-lg cursor-pointer ${isFollowing ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`;

    followButton.addEventListener('click', async () => {
      await toggleFollow();
      followButton.textContent = isFollowing ? 'Follow' : 'Unfollow';
      followButton.className = `px-4 py-2 rounded-lg cursor-pointer ${isFollowing ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`;
    });
    if (auth.getUserData()?.name !== profile.data.name) {
      const sidebar = document.getElementById('sidebar');
      if (sidebar) {
        while (sidebar.firstChild) {
          sidebar.removeChild(sidebar.firstChild);
        }
      }
      profileActions.appendChild(followButton); // Only show follow button if the profile being viewed is not the current user's own profile
    }
  }, 0);

  return `
    <div class="flex items-center gap-6 mb-10">
      <div class="relative">
        <img src="${currentUserAvatar}" alt="${currentUserAlt}" class="rounded-full w-30 h-30 mb-4">
        ${auth.getUserData()?.name === profile.data.name ? `<button class="absolute bottom-0 right-0 rounded-full p-2 bg-main-white text-main-black border-5 border-main-black">${editIcon}</button>` : ''}
      </div>
      <div>
        <h1 class="text-2xl font-bold">${profile.data.name.charAt(0).toUpperCase() + profile.data.name.slice(1)}</h1>
        <p class="text-gray-light">@${profile.data.name.toLowerCase()}</p>
        <div class="flex gap-6 mt-3">
          <p>${profile.data._count.posts} Posts</p>
          <p>${profile.data._count.following} Following</p>
          <p>${profile.data._count.followers} Followers</p>
        </div>
        <div id="profile-header-actions" class="mt-4">
        </div>
      </div>
    </div>
    <div id="posts" class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
      ${posts.data.length > 0 ? posts.data.map(post => `
        <a href="#/post/${post.id}">
          <article class="card flex flex-col justify-between h-full hover:bg-surface-medium hover:cursor-pointer smooth-transition">
              <section class="text-main-white">
                <div class="flex flex-col gap-2 mb-5">
                  <h3 class="text-2xl font-semibold line-clamp-2 text-ellipsis">${post.title}</h3>
                  <p class="text-sm leading-relaxed line-clamp-3">${post.body}</p>
                </div>
              </section>
            <footer class="text-gray-light text-sm flex gap-3">
              <button class="flex items-center gap-2">${likeIcon} ${post._count.reactions}</button>
              <button class="flex items-center gap-2">${commentIcon} ${post._count.comments}</button>
            </footer>
          </article>
        </a>
      `).join('')
      : `<p class="text-gray-light text-center py-10">No posts yet</p>`
    }
    </div>
  `;
}


