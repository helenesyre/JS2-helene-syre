export default function defaultLayout(content) {
  return `
    <header class="basis-1/5 border border-gray-medium">
      <nav id="navbar" class="text-main-white p-8 flex flex-col gap-10 h-screen sticky top-0"></nav>
    </header>
    <main class="basis-3/5 m-8">
      <div id="content">${content}</div>
    </main>
    <aside id="sidebar" class="basis-1/5 border border-gray-medium p-8 h-screen sticky top-0">
    </aside>
  `;
}