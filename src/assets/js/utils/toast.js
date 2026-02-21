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

  toast.className = "rounded shadow-lg flex items-start gap-4 p-4 text-sm text-white animate-fadeIn";
  switch (type) {
    case "success":
      toast.classList.add(`bg-green-500`, `text-black`);
      break;
    case "error":
      toast.classList.add(`bg-red-500`, `text-white`);
      break;
    default:
      toast.classList.add("bg-gray-dark", "text-white");
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