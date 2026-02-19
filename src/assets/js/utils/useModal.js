export default function useModal() {
  let isOpen = false;

  function openModal(content) {
    const modal = document.getElementById('modal');
    if (modal.innerHTML === '') {
      modal.appendChild(content)
      modal.classList.remove('hidden');
      isOpen = true;
    }
  }

  function closeModal() {
    const modal = document.getElementById('modal');
    modal.innerHTML = '';
    modal.classList.add('hidden');
    isOpen = false;
  }

  return { openModal, closeModal, isOpen };
};