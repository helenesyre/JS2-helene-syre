export default function cleanLayout(content) {
  return `
      <main>
        <div id="content" class="flex flex-row items-center">${content}</div>
      </main>
  `;
}