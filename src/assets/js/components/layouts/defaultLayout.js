import { stories } from '../stories';
import { suggestions } from '../suggestions.js';

export default function defaultLayout(content, sidebarContent) {
  const sidebar = sidebarContent ? sidebarContent : `
    ${stories()}
    ${suggestions()}
  `;
  return `
    <header class="basis-1/5">
      <nav id="navbar" class="text-main-white py-6 lg:p-6 flex flex-col gap-10 lg:h-screen sticky top-0 z-50"></nav>
    </header>
    <main class="basis-2/5 lg:my-8 lg:mx-10">
      <div id="content">${content}</div>
    </main>
    <aside id="sidebar" class="basis-1/5 py-6 lg:p-6 h-screen sticky top-0">
      ${sidebar}
    </aside>
    <div id="modal"></div>
  `;
};