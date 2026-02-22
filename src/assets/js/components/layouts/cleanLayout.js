/**
 * Generates a clean layout for pages that require a simple structure without additional components like headers or sidebars.
 * @param {string} content - The HTML content to be displayed within the main container.
 * @returns {string} - The complete HTML structure for the clean layout.
 */
export default function cleanLayout(content) {
  return `
      <main>
        <div id="content" class="flex flex-row items-center">${content}</div>
      </main>
  `;
}