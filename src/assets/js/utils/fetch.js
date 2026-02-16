import { useAuth } from './useAuth.js';
import { useFetch } from './useFetch.js';

const API_KEY = import.meta.env.VITE_API_KEY;

export async function getAllPosts() {
  const auth = useAuth();
  const token = auth.getToken();
  const data = await useFetch('/social/posts?_author=true&_comments=true&_reactions=true', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY
    },
  });
  return data;
};

export async function getPostById(id) {
  const auth = useAuth();
  const token = auth.getToken();
  const data = await useFetch(`/social/posts/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY
    },
  });
  return data;
};

export async function getAllFollowingPosts() {
  const auth = useAuth();
  const token = auth.getToken();
  const data = await useFetch('/social/posts/following', {
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
  const data = await useFetch(`/social/profiles/${profileName}`, {
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


// Update post


// Delete post


// All posts by profile


// Search posts


// Follow & Unfollow profile


// React to post (GROUP TASK)


// Comment on post (GROUP TASK)


// Delete comment from post (GROUP TASK)
