export default function cleanLayout(content) {
  return `
      <main>
        <div id="content">${content}</div>
      </main>
  `;
}