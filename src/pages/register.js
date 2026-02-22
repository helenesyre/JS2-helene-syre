import registerImg from '../assets/images/register.jpg';
import { registerForm, setupRegisterFormListeners } from '../assets/js/components/forms/registerForm';

/**
 * Renders the registration page with a form for creating a new account.
 * @returns {string} HTML string representing the registration page content.
 */
export function register() {
  const form = registerForm();

  // Schedule listener setup for next tick to ensure form is in DOM
  setTimeout(() => setupRegisterFormListeners(), 0);

  return `
    <img src="${registerImg}" alt="Register image" class="hidden lg:block h-screen w-1/2 object-cover">
    <div class="w-full lg:w-1/2 p-12 mx-auto max-w-sm">
      <h1 class="text-3xl font-bold mb-4">Create an account</h1>
      ${form}
    </div>
  `;
};