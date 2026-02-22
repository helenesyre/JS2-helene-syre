import { followProfile, unfollowProfile } from "../utils/fetch";
import { useAuth } from "../utils/useAuth";
import { editIcon } from "./icons/editIcon";
import gradientImg from '../../images/gradient.jpg';

/**
 * Creates a profile header component, including the user's avatar, name, bio, and follow/unfollow button.
 * @param {Object} profile - The profile object containing the current profile data.
 * @param {string} profileName - The name of the profile being viewed.
 * @returns {string} - The HTML structure for the profile header.
 */
export default function profileHeader(profile, profileName) {
  const currentUserAvatar = profile.data.avatar.url || gradientImg;
  const currentUserAlt = profile.data.avatar.alt || 'User Avatar';
  const auth = useAuth();

  // Check if the current user is following the profile by looking for the profile name in the followers list of the profile data
  const isFollowing = profile.data.followers.some(follower => follower.name === auth.getUserData()?.name);

  /**
   * Function to toggle follow/unfollow state when the follow button is clicked.
   * It calls the appropriate API function based on the current follow state and then reloads the page to reflect the changes.
   * @returns {Promise<void>} - A promise that resolves when the follow/unfollow action is completed.
   */
  async function toggleFollow() {
    if (isFollowing) {
      await unfollowProfile(profileName);
      document.dispatchEvent(new CustomEvent('profileUpdated', { detail: { profileName } }));
    } else {
      await followProfile(profileName);
      document.dispatchEvent(new CustomEvent('profileUpdated', { detail: { profileName } }));
    }
  }

  // Use setTimeout to ensure the follow button is rendered after the initial profile data is loaded,
  // and then add the event listener for the follow/unfollow functionality.
  setTimeout(() => { // Wait for page to render before trying to access the follow button element
    const profileActions = document.getElementById('profile-header-actions');
    const followButton = document.createElement('button');

    followButton.textContent = isFollowing ? 'Unfollow' : 'Follow';
    followButton.className = `px-4 py-2 rounded-lg cursor-pointer smooth-transition ${isFollowing ? 'bg-surface-medium text-main-white' : 'bg-main-neon text-main-black'}`;

    followButton.addEventListener('click', async () => {
      await toggleFollow();
      followButton.textContent = isFollowing ? 'Follow' : 'Unfollow';
      followButton.className = `px-4 py-2 rounded-lg cursor-pointer smooth-transition ${isFollowing ? 'bg-main-neon text-main-white' : 'bg-surface-medium text-main-white'}`;
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
    <div class="relative md:min-w-[170px]">
      <img src="${currentUserAvatar}" alt="${currentUserAlt}" class="rounded-full w-24 h-24 md:w-40 md:h-40 mb-4 object-cover shadow-lg">
      ${auth.getUserData()?.name === profile.data.name ? `<button class="absolute bottom-0 md:bottom-2 right-0 md:right-2 rounded-full p-2 bg-main-white text-main-black border-5 border-main-black">${editIcon}</button>` : ''}
    </div>
    <div class="text-center md:text-left">
      <h1 class="text-2xl font-bold">${profile.data.name.charAt(0).toUpperCase() + profile.data.name.slice(1)}</h1>
      <p class="text-gray-light">@${profile.data.name.toLowerCase()}</p>
      <div class="flex flex-col md:flex-row gap-3 md:gap-6 my-3">
        <p>${profile.data._count.posts} Posts</p>
        <p>${profile.data._count.following} Following</p>
        <p>${profile.data._count.followers} Followers</p>
      </div>
      <p class="text-gray-light mt-1">${profile.data.bio || ''}</p>
      <div id="profile-header-actions" class="mt-4">
      </div>
    </div>
  `;
};