import { stories } from '../stories';
import { suggestions } from '../suggestions.js';

export default function defaultLayout(content) {
  return `
    <header class="basis-1/5 border border-gray-medium">
      <nav id="navbar" class="text-main-white p-6 flex flex-col gap-10 h-screen sticky top-0"></nav>
    </header>
    <main class="basis-2/5 my-8 mx-10">
      <div id="content">${content}</div>
    </main>
    <aside id="sidebar" class="basis-1/5 border border-gray-medium p-6 h-screen sticky top-0">
      ${stories()}
      ${suggestions()}
    </aside>
  `;
};