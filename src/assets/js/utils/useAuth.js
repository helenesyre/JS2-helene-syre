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

  function getUserData() {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  };

  function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('profileName');
    localStorage.removeItem('userData');
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
    getUserData,
    isLoggedIn,
    logout,
    getToken,
  };
};
