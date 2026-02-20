import useModal from '../../utils/useModal.js';
import { closeIcon } from '../icons/closeIcon.js';
import { infoIcon } from "../icons/infoIcon";
import { createPost } from "../../utils/fetch.js";
import { validateImgUrl } from "../../utils/validation.js";

export function createPostModal() {
  const { closeModal } = useModal();

  const modal = document.createElement("div")
  modal.id = "create-post-modal"
  modal.className = "fixed inset-0 bg-black/50 flex items-center justify-center z-50"

  const modalContent = document.createElement("div")
  modalContent.id = "create-post-modal-content"
  modalContent.className = "bg-surface-dark rounded-lg p-6 w-full max-w-md relative w-full mx-6"

  const closeButton = document.createElement("button")
  closeButton.className = "absolute top-3 right-3 text-gray-light hover:text-main-neon hover:cursor-pointer"
  closeButton.onclick = closeModal
  closeButton.innerHTML = closeIcon

  const title = document.createElement("h2")
  title.className = "text-xl font-bold mb-4"
  title.innerHTML = "Create New Post"

  const form = document.createElement("form")
  form.id = "create-post-form"
  form.className = "flex flex-col gap-4"
  form.innerHTML = `
    <div class="flex flex-col">
      <label for="post-title" class="text-sm font-medium mb-1">Title *</label>
      <input name="title" type="text" id="post-title" class="bg-surface-medium rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-muted" placeholder="Post Title" required>
    </div>
    <div class="flex flex-col">
      <label for="post-content" class="text-sm font-medium mb-1">Content</label>
      <textarea name="content" id="post-content" class="bg-surface-medium rounded-lg p-2 h-32 resize-none text-sm focus:outline-none focus:ring-2 focus:ring-gray-muted" placeholder="What's on your mind?"></textarea>
    </div>
    <div class="flex flex-col mb-4">
      <label for="post-image-url" class="text-sm font-medium mb-1 flex items-center gap-1">Image URL ${infoIcon}</label>
      <input name="img" type="text" id="post-image-url" class="bg-surface-medium rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-muted" placeholder="Image URL (optional)">
    </div>

    <button type="submit" class="bg-main-neon text-black font-medium py-2 rounded hover:bg-main-neon-dark transition-colors">
      Create post
    </button>
  `;
  form.addEventListener("submit", async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const title = formData.get("title")
    const content = formData.get("content")
    const img = formData.get("img")

    if (img && !validateImgUrl(img)) {
      alert("Invalid image URL");
      // change alert to toast later
      return;
    }

    await createPost({
      title: title,
      body: content ?? "",
      ...(img ? { media: { url: img ?? "", alt: "" } } : {})
    })

    closeModal();
    window.location.reload();
  })

  modal.addEventListener("click", (event) => {
    if (!event.target.closest('#create-post-modal-content') && event.target.closest('#create-post-modal')) {
      closeModal();
    }
  })

  modalContent.appendChild(closeButton)
  modalContent.appendChild(title)
  modalContent.appendChild(form)
  modal.appendChild(modalContent)

  return modal
};

