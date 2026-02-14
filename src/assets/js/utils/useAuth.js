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
        // Show toast before redirect
        console.log('Login successful! Redirecting to home...', 'Login Success', 'success');
        // Redirect after a short delay to allow toast to be seen
        setTimeout(() => {
          window.location.hash = '#/';
        }, 2000);
      } else {
        console.log("Login failed: " + (response.errors?.[0]?.message || "Check console for details."));
      }
    } catch (error) {
      console.log('Login failed. Please try again.');
    }
  };

  async function register(username, email, password) {
    const userData = {
      name: username,
      email: email,
      password: password,
      bio: "This is my NightNode bio",
      avatar: {
        url: "https://i.postimg.cc/L6m0d8vW/Night-Node-6.webp",
        alt: "Placeholder NightNode avatar"
      },
      banner: {
        url: "https://i.postimg.cc/26QyZws2/Night-Node-3.webp",
        alt: "Placeholder NightNode banner"
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
        console.log('Registration successful! Redirecting to login...');
        setTimeout(() => {
          window.location.hash = '#/login';
        }, 2000);
      } else {
        console.log('Registration failed. Please try again.');
      }

    } catch (error) {
      const errorMessage = error?.errors?.[0]?.message || 'Something went wrong. Please try again later.';
      console.log(errorMessage);
    }
  };

  function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('profileName');
    window.location.reload();
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
    isLoggedIn,
    logout,
    getToken,
  };
};
