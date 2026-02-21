import { closeIcon } from "../components/icons/closeIcon";

/**
 * Show a toast notification
 * @param {string} message - The message to display in the toast
 * @param {string} [type="success"] - The type of toast (e.g., "success", "error")
 * @param {number} [wait=5000] - The duration in milliseconds before the toast disappears
 * @returns {void}
 */
export function showToast(message, type = "success", wait = 5000) {
  const toast = document.createElement("div");
  const titleElement = document.createElement("h4");
  const textContentElement = document.createElement("div");
  const closeButton = document.createElement("button");

  toast.className = "rounded shadow-lg flex justify-between items-start text-main-white gap-4 p-4 text-sm animate-fadeIn";
  switch (type) {
    case "success":
      toast.classList.add(`bg-green-800`);
      break;
    case "error":
      toast.classList.add(`bg-red-800`);
      break;
    default:
      toast.classList.add(`bg-gray-600`);
  }

  titleElement.textContent = message;
  closeButton.innerHTML = closeIcon;
  closeButton.onclick = () => {
    toast.remove();
  };
  textContentElement.appendChild(titleElement);
  toast.appendChild(textContentElement);
  toast.appendChild(closeButton);

  const container = document.getElementById("toast-container");
  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, wait);
}