import { showToast } from "./toast";
import { useFetch } from "./useFetch";

export function useAuth() {
  async function login(email, password) {
    try {
      const response = await useFetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (response) {
        // Save token and profile name
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("profileName", response.data.name);
        localStorage.setItem("userData", JSON.stringify(response.data));
        showToast(`Login successful! Redirecting to home...`, 'success');
        // Redirect after a short delay to allow toast to be seen
        setTimeout(() => {
          window.location.hash = '#/';
        }, 2000);
      } else {
        showToast(`Login failed: ${response.errors?.[0]?.message || "Check console for details."}`, 'error');
      }
    } catch (error) {
      showToast(`Login failed. Please try again.`, 'error');
    }
  };

  async function register(username, email, password) {
    const userData = {
      name: username,
      email: email,
      password: password,
      bio: "This is my NightNode bio",
      avatar: {
        url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400",
        alt: "Placeholder avatar"
      },
      banner: {
        url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400",
        alt: "Placeholder banner"
      }
    };

    try {
      const response = await useFetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      if (response) {
        showToast('Registration successful! Redirecting to login...', 'success');
        setTimeout(() => {
          window.location.hash = '#/login';
        }, 2000);
      } else {
        showToast('Registration failed. Please try again.', 'error');
      }

    } catch (error) {
      const errorMessage = error?.errors?.[0]?.message || 'Something went wrong. Please try again later.';
    }
  };

  function getUserData() {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  };

  function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('profileName');
    localStorage.removeItem('userData');
    showToast(`Logged out successfully! Redirecting to login...`, 'success');
    window.location.hash = '#/login';
  };

  function isLoggedIn() {
    const token = localStorage.getItem('accessToken');
    return !!token;
  };

  function getToken() {
    return localStorage.getItem('accessToken');
  };

  return {
    login,
    register,
    getUserData,
    isLoggedIn,
    logout,
    getToken,
  };
};
