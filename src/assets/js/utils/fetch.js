import { useAuth } from './useAuth.js';
import { useFetch } from './useFetch.js';

const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * Fetches all posts from the API with optional pagination.
 * @param {number} page - The page number to fetch.
 * @returns {Promise<Object>} - A promise that resolves to the fetched data.
 */
export async function getAllPosts(page = 1) {
  const auth = useAuth();
  const token = auth.getToken();
  const data = await useFetch(`/social/posts?_author=true&_comments=true&_reactions=true&page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY
    },
  });
  return data;
};

/**
 * Fetches a single post by its ID from the API, including author, comments, and reactions.
 * @param {string} id - The ID of the post to fetch.
 * @returns {Promise<Object>} - A promise that resolves to the fetched post data.
 */
export async function getPostById(id) {
  const auth = useAuth();
  const token = auth.getToken();
  const data = await useFetch(`/social/posts/${id}?_author=true&_comments=true&_reactions=true`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY
    },
  });
  return data;
};

/**
 * Fetches all posts from followed profiles with optional pagination.
 * @param {number} page - The page number to fetch.
 * @returns {Promise<Object>} - A promise that resolves to the fetched data.
 */
export async function getAllFollowingPosts(page = 1) {
  const auth = useAuth();
  const token = auth.getToken();
  const data = await useFetch(`/social/posts/following?&_author=true&_comments=true&_reactions=true&page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY
    },
  });
  return data;
};

/**
 * Fetches all profiles from the API.
 * @returns {Promise<Object>} - A promise that resolves to the fetched data.
 */
export async function getAllProfiles() {
  const auth = useAuth();
  const token = auth.getToken();
  const data = await useFetch('/social/profiles', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY
    },
  });
  return data;
};

/**
 * Fetches a single profile by its name from the API, including following and followers information.
 * @param {string} profileName - The name of the profile to fetch.
 * @returns {Promise<Object>} - A promise that resolves to the fetched profile data.
 */
export async function getProfileData(profileName) {
  const auth = useAuth();
  const token = auth.getToken();
  const data = await useFetch(`/social/profiles/${profileName}?_following=true&_followers=true`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY
    },
  });
  return data;
};

/**
 * Creates a new post with the provided data.
 * @param {Object} postData - The data for the new post.
 * @returns {Promise<Object>} - A promise that resolves to the created post data.
 */
export async function createPost(postData) {
  const auth = useAuth();
  const token = auth.getToken();
  const data = await useFetch('/social/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY
    },
    body: JSON.stringify(postData)
  });
  return data;
};

/**
 * Updates an existing post with the provided data.
 * @param {string} postId - The ID of the post to update.
 * @param {Object} postData - The data to update the post with.
 * @returns {Promise<Object>} - A promise that resolves to the updated post data.
 */
export async function updatePost(postId, postData) {
  const auth = useAuth();
  const token = auth.getToken();
  const data = await useFetch(`/social/posts/${postId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY
    },
    body: JSON.stringify(postData)
  });
  return data;
};

/**
 * Deletes a post by its ID.
 * @param {string} postId - The ID of the post to delete.
 * @returns {Promise<Object>} - A promise that resolves to the deleted post data.
 */
export async function deletePost(postId) {
  const auth = useAuth();
  const token = auth.getToken();
  const data = await useFetch(`/social/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY
    },
  });
  return data;
};

/**
 * Fetches all posts by a specific profile.
 * @param {string} profileName - The name of the profile.
 * @returns {Promise<Object>} - A promise that resolves to the fetched posts data.
 */
export async function getPostsByProfile(profileName) {
  const auth = useAuth();
  const token = auth.getToken();
  const data = await useFetch(`/social/profiles/${profileName}/posts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY
    },
  });
  return data;
};

/**
 * Searches for posts based on a query string, including author, comments, and reactions information.
 * @param {string} query - The search query.
 * @param {number} [page=1] - The page number for pagination.
 * @returns {Promise<Object>} - A promise that resolves to the search results.
 */
export async function searchPosts(query, page = 1) {
  const auth = useAuth();
  const token = auth.getToken();
  /**
   * Code source from:
   * encodeURIComponent()
   * @publisher: MDN Contributors
   * @date: 2025-10-30
   * accessed: 2026-02-19
   * link: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
  */
  const data = await useFetch(`/social/posts/search/?q=${encodeURIComponent(query)}&_author=true&_comments=true&_reactions=true&page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY
    },
  });
  return data;
};

/**
 * Follows a profile by its name.
 * @param {string} profileName - The name of the profile to follow.
 * @returns {Promise<Object>} - A promise that resolves to the follow action result.
 */
export async function followProfile(profileName) {
  const auth = useAuth();
  const token = auth.getToken();
  const data = await useFetch(`/social/profiles/${profileName}/follow`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY
    },

  });
  return data;
};

/**
 * Unfollows a profile by its name.
 * @param {string} profileName - The name of the profile to unfollow.
 * @returns {Promise<Object>} - A promise that resolves to the unfollow action result.
 */
export async function unfollowProfile(profileName) {
  const auth = useAuth();
  const token = auth.getToken();
  const data = await useFetch(`/social/profiles/${profileName}/unfollow`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY
    },
  });
  return data;
};