const API_URL = 'https://v2.api.noroff.dev';

/**
 * Fetch data from the API
 * @param {string} url - The API endpoint URL
 * @param {Object} [options] - Fetch options
 * @returns {Promise<Object>} The JSON response from the API
 */
export async function useFetch(url, options = {}) {
  try {
    const response = await fetch(API_URL + url, options);
    if (!response.ok) {
      if (response.status === 401) {
        // Handle unauthorized access (e.g., token expired)
        localStorage.removeItem('accessToken'); // Clear the token from localStorage
        localStorage.removeItem('profileName'); // Clear the profile name from localStorage
        window.location.hash = '#/login'; // Redirect to login page
      }
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  };
};

export default useFetch;