import { useAuth } from "../../utils/useAuth";
import { validateNoroffEmail, validatePassword, validateUsername, validationErrorMessageHTML } from "../../utils/validation";

export function setupRegisterFormListeners() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    console.log('Form submitted');
    document.querySelectorAll('.form_error').forEach(errorElement => errorElement.remove());
    // Validate form inputs
    const formData = new FormData(event.target);
    let isValid = true;
    for (const [name, value] of formData.entries()) {
      switch (name) {
        case 'username':
          if (value && validateUsername(value)) {
            continue;
          } else {
            isValid = false;
            event.target.querySelector('#username').parentElement.innerHTML += validationErrorMessageHTML('Username can only contain letters, numbers, and underscores.');
          }
          break;
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
        default:
          break;
      };
    };
    if (isValid) {
      // Submit the form - API registration
      const username = formData.get('username');
      const email = formData.get('email');
      const password = formData.get('password');

      const auth = useAuth();
      await auth.register(username, email, password);
    }
  });
};

export function registerForm() {
  const form = document.createElement('form');
  form.id = 'registerForm';
  form.className = 'flex flex-col gap-6 mt-12 text-sm';

  form.innerHTML = `
    <div class="flex flex-col gap-2">
      <label for="username">Username</label>
      <input type="text" id="username" name="username" class="rounded-xl border border-gray-dark bg-input-bg-dark px-4 py-3 text-main-white placeholder-gray-medium focus:outline-none focus:ring-2 focus:ring-gray-muted" placeholder="Enter your username..." required />
    </div>
    <div class="flex flex-col gap-2">
      <label for="email">Email</label>
      <input type="email" id="email" name="email" class="rounded-xl border border-gray-dark bg-input-bg-dark px-4 py-3 text-main-white placeholder-gray-medium focus:outline-none focus:ring-2 focus:ring-gray-muted" placeholder="Enter your email..." required />
    </div>
    <div class="flex flex-col gap-2">
      <label for="password">Password</label>
      <input type="password" id="password" name="password" class="rounded-xl border border-gray-dark bg-input-bg-dark px-4 py-3 text-main-white placeholder-gray-medium focus:outline-none focus:ring-2 focus:ring-gray-muted" placeholder="Enter your password..." required />
    </div>
    <div class="flex items-center gap-2">
      <input type="checkbox" id="terms" name="terms" required />
      <label for="terms">I agree to the terms and conditions</label>
    </div>
    <button type="submit" class="text-base rounded-xl bg-main-neon px-4 py-3 font-medium text-black hover:cursor-pointer">
      Sign up
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
          Sign up with Google
        </button>
        <button type="button" class="flex items-center justify-center gap-2 rounded-xl border border-gray-dark bg-input-bg-dark px-4 py-3 text-main-white hover:cursor-pointer">
          <i class="fa-brands fa-facebook text-gray-muted text-2xl"></i>
          Sign up with Facebook
        </button>
      </div>
      <p>Already have an account? <a href="#/login" class="text-main-neon hover:underline">Log in</a></p>
    </div>
  `;
  return form.outerHTML;
};