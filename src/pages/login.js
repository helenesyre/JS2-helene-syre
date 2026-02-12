import loginImg from '../assets/images/login.jpg';
import { loginForm, setupLoginFormListeners } from '../assets/js/components/forms/loginForm';

export function login() {
  const form = loginForm();

  // Schedule listener setup for next tick to ensure form is in DOM
  setTimeout(() => setupLoginFormListeners(), 0);

  return `
    <img src="${loginImg}" alt="Logo" class="h-screen w-1/2 object-cover">
    <div class="w-1/2 max-w-sm mx-auto">
      <h1 class="text-3xl font-bold mb-4">Welcome Back!</h1>
      <p class="text-base text-gray-light">Log in to connect with friends, share your moments, and explore new stories. We're glad to see you back!</p>
      ${form}
    </div>
  `;
};