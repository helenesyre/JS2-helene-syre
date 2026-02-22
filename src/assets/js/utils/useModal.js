/**
 * Custom hook for managing modal dialogs, providing functions to open and close modals, as well as tracking the modal's open state.
 * @returns {Object} - An object containing the openModal and closeModal functions, as well as the isOpen state.
 */
export default function useModal() {
  let isOpen = false;

  /**
   * Opens a modal dialog with the provided content, ensuring that only one modal is open at a time.
   * @param {HTMLElement} content - The HTML content to be displayed inside the modal.
   */
  function openModal(content) {
    const modal = document.getElementById('modal');
    if (modal.innerHTML === '') {
      modal.appendChild(content)
      modal.classList.remove('hidden');
      isOpen = true;
    }
  }

  /**
   * Closes the currently open modal dialog, if any, and clears its content.
   */
  function closeModal() {
    const modal = document.getElementById('modal');
    modal.innerHTML = '';
    modal.classList.add('hidden');
    isOpen = false;
  }

  return { openModal, closeModal, isOpen };
};