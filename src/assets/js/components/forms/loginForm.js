import { useAuth } from "../../utils/useAuth";
import { validateNoroffEmail, validatePassword, validationErrorMessageHTML } from "../../utils/validation";

export function setupLoginFormListeners() {
  const form = document.querySelector('#loginForm');
  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    // Validate form inputs
    document.querySelectorAll('.form_error').forEach(errorElement => errorElement.remove());
    const formData = new FormData(event.target);
    let isValid = true;
    for (const [name, value] of formData.entries()) {
      switch (name) {
        case 'email':
          if (value && validateNoroffEmail(value)) {
            continue;
          } else {
            isValid = false;
            event.target.querySelector('#email').parentElement.innerHTML += validationErrorMessageHTML('Please enter a valid email address.');
          }
          break;
        case 'password':
          if (value && validatePassword(value)) {
            continue;
          } else {
            isValid = false;
            event.target.querySelector('#password').parentElement.innerHTML += validationErrorMessageHTML('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.');
          }
          break;
      };
    };

    if (isValid) {
      // Submit the form to API
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const auth = useAuth();
      await auth.login(email, password);
    }
  });
};

export function loginForm() {
  const form = document.createElement('form');
  form.id = 'loginForm';
  form.className = 'flex flex-col gap-6 mt-12 text-sm';

  form.innerHTML = `
    <div class="flex flex-col gap-2">
      <label for="email">Email</label>
      <input type="email" id="email" name="email" aria-label="Email" class="rounded-xl border border-gray-dark bg-input-bg-dark px-4 py-3 text-main-white placeholder-gray-medium focus:outline-none focus:ring-2 focus:ring-gray-muted" placeholder="Enter your email..." required />
    </div>
    <div class="flex flex-col gap-2">
      <label for="password">Password</label>
      <input type="password" id="password" name="password" aria-label="Password" class="rounded-xl border border-gray-dark bg-input-bg-dark px-4 py-3 text-main-white placeholder-gray-medium focus:outline-none focus:ring-2 focus:ring-gray-muted" placeholder="Enter your password..." required />
    </div>
    <p class="text-sm text-main-neon flex justify-end hover:cursor-pointer hover:underline">Forgot Password?</p>
    <button type="submit" class="text-base rounded-xl bg-main-neon px-4 py-3 font-medium text-black hover:cursor-pointer">
      Sign in
    </button>
    <div class="text-center">
      <div class="flex items-center my-6">
        <div class="flex-1 h-px bg-gray-light"></div>
        <span class="mx-4 text-gray-light">Or</span>
        <div class="flex-1 h-px bg-gray-light"></div>
      </div>
      <div class="flex flex-col gap-4 my-6">
        <button type="button" class="flex items-center justify-center gap-2 rounded-xl border border-gray-dark bg-input-bg-dark px-4 py-3 text-main-white hover:cursor-pointer">
          <i class="fa-brands fa-google text-gray-muted text-2xl"></i>
          Sign in with Google
        </button>
        <button type="button" class="flex items-center justify-center gap-2 rounded-xl border border-gray-dark bg-input-bg-dark px-4 py-3 text-main-white hover:cursor-pointer">
          <i class="fa-brands fa-facebook text-gray-muted text-2xl"></i>
          Sign in with Facebook
        </button>
      </div>
      <p>Don't you have an account? <a href="#/register" class="text-main-neon hover:underline">Sign up</a></p>
    </div>
  `;
  return form.outerHTML;
};