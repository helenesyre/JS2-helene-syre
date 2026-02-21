import { useAuth } from './useAuth.js';
import { useFetch } from './useFetch.js';

const API_KEY = import.meta.env.VITE_API_KEY;

// All posts
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

// Single post by ID
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

// All posts from followed profiles
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

// All profiles
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

// Single profile
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

// Filtering


// Create post
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

// Update post
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

// Delete post
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

// All posts by profile
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

// Search posts
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

// Follow & Unfollow profile
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


// React to post (GROUP TASK)


// Comment on post (GROUP TASK)


// Delete comment from post (GROUP TASK)
