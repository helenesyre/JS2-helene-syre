import pageNotFoundImg from '../assets/images/page-not-found.png';

/**
 * Renders a "Page Not Found" page with an image, message, and a link to return to the home page.
 * @returns {string} HTML string representing the "Page Not Found" page.
 */
export function pageNotFound() {
  return `
    <section class="flex flex-col items-center justify-center gap-6 py-12 h-[80vh] lg:h-screen">
      <img src="${pageNotFoundImg}" alt="404 Not Found" class="w-1/2 md:w-1/3 lg:w-1/2 h-auto object-cover">
      <div class="flex flex-col items-center gap-2">
        <h1 class="text-3xl text-main-neon font-bold">404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
      <a href="#/" class="text-base rounded-lg bg-main-neon px-4 py-2 font-medium text-black transform transition-transform duration-200 hover:scale-105 hover:cursor-pointer">Go to Home</a>
    </section>
  `;
};