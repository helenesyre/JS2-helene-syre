import { likeIcon } from "../assets/js/components/icons/likeIcon";
import { commentIcon } from "../assets/js/components/icons/commentIcon";
import { useAuth } from '../assets/js/utils/useAuth';
import { getPostsByProfile, getProfileData } from '../assets/js/utils/fetch';
import profileHeader from '../assets/js/components/profileHeader';

/**
 * Renders the profile page, displaying the user's profile information and their posts.
 * It fetches the profile data and posts based on the profile name provided in the URL hash
 * and updates the profile header when the profile is updated.
 * @returns {string} HTML string representing the profile page content.
 */
export async function profile() {
  const hash = window.location.hash
  const profilePageMatch = hash.match(/^#\/profile\/([^\/]+)/);
  const profileName = profilePageMatch ? profilePageMatch[1] : null;
  let profile = await getProfileData(profileName);

  // If no profile name is provided, show an error message
  if (!profile || profile.errors) {
    return (`
      <div class="profile">
        <h1 class="text-3xl font-bold mb-4">Profile not found</h1>
        <p>The profile you are looking for does not exist or could not be loaded.</p>
      </div>`
    );
  }
  /**
   * Refreshes the profile data and updates the profile header.
   * @param {string} profileName - The name of the profile to refresh.
   */
  async function refreshProfileData(profileName) {
    profile = await getProfileData(profileName);
    document.getElementById('profile-header').innerHTML = profileHeader(profile, profileName);
  }

  const posts = await getPostsByProfile(profileName);
  setTimeout(() => {
    document.addEventListener('profileUpdated', async (event) => {
      await refreshProfileData(event.detail.profileName);
    });
  }, 0);

  return `
    <div id="profile-header" class="flex flex-col md:flex-row items-center gap-6 mb-10 w-full md:max-w-2xl lg:max-w-5xl mx-auto">
      ${profileHeader(profile, profileName)}
    </div>
    <div id="posts" class="grid grid-cols-1 ${posts.data.length > 0 ? 'sm:grid-cols-2' : 'sm:grid-cols-1'} gap-6 mt-6">
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


