import pageNotFoundImg from '../assets/images/page-not-found.png';

export function pageNotFound() {
  return `
    <section class="flex flex-col items-center justify-center gap-6 py-12 h-screen">
      <img src="${pageNotFoundImg}" alt="404 Not Found" class="w-1/2 h-auto object-cover">
      <div class="flex flex-col items-center gap-2">
        <h1 class="text-3xl text-main-neon font-bold">404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
      <a href="#/" class="text-base rounded-lg bg-main-neon px-4 py-2 font-medium text-black transform transition-transform duration-200 hover:scale-105 hover:cursor-pointer">Go to Home</a>
    </section>
  `;
};