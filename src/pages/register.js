import registerImg from '../assets/images/register.jpg';
import { registerForm, setupRegisterFormListeners } from '../assets/js/components/forms/registerForm';

export function register() {
  const form = registerForm();

  // Schedule listener setup for next tick to ensure form is in DOM
  setTimeout(() => setupRegisterFormListeners(), 0);

  return `
    <img src="${registerImg}" alt="Logo" class="h-screen w-1/2 object-cover">
    <div class="w-1/2 max-w-sm mx-auto">
      <h1 class="text-3xl font-bold mb-4">Create an account</h1>
      ${form}
    </div>
  `;
};