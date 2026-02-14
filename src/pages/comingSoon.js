import comingSoonImg from '../assets/images/coming-soon.png';

export function comingSoon() {
  return `
    <section class="flex flex-col items-center justify-center gap-6 py-12 h-screen">
      <img src="${comingSoonImg}" alt="Coming Soon" class="w-1/2 h-auto object-cover">
      <div class="flex flex-col items-center gap-2">
        <h1 class="text-3xl text-main-neon font-bold">Coming Soon</h1>
        <p>This feature is coming soon. Stay tuned!</p>
      </div>
      <a href="#/" class="text-base rounded-lg bg-main-neon px-4 py-2 font-medium text-black transform transition-transform duration-200 hover:scale-105 hover:cursor-pointer">Go to Home</a>
    </section>
  `;
};