// Wait for the entire HTML document to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Get references to the modal, its content area, and its close button
  const modal = document.getElementById('mediaModal');
  const modalContent = document.getElementById('modalContent');
  const closeModal = document.getElementById('closeModal');

  // Verify all elements were found
  if (!modal || !modalContent || !closeModal) {
    console.error('Modal elements not found in DOM.');
    return;
  }

  // Function to close the modal and clear its content
  function closeTheModal() {
    modal.style.display = 'none';
    modalContent.innerHTML = '';
  }

  // Add a click event to the close button to close the modal
  closeModal.addEventListener('click', closeTheModal);
  
  // Close the modal if the modal background itself is clicked
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeTheModal();
    }
  });

  // Add click event listeners to all elements with class .media
  document.querySelectorAll('.media').forEach((element) => {
    // Verify element is an img or video element
    if (element.tagName !== 'IMG' && element.tagName !== 'VIDEO') {
      console.warn(`Unsupported media type: ${element.tagName}`);
      return;
    }

    element.addEventListener('click', () => {
      let mediaElement;
      let captionElement;

      // If the clicked element is an image
      if (element.tagName === 'IMG' || element.tagName === 'VIDEO' ) {
        // Clone the clicked image
        mediaElement = element.cloneNode(true);

        // Retain controls if it's a video
        if (element.tagName === 'VIDEO') {
          mediaElement.controls = true;
        }

        // Check if there's a figcaption element next to the image
        if (element.nextElementSibling && element.nextElementSibling.tagName === 'FIGCAPTION') {
          // Create a new div for the caption and copy the figcaption content
          captionElement = document.createElement('div');
          captionElement.classList.add('modal-caption');
          captionElement.innerHTML = element.nextElementSibling.innerHTML;
        }
      } 

      // Append the cloned media element to the modal content
      if (mediaElement) {
        modalContent.appendChild(mediaElement);
      }

      // Append the caption div to the modal content
      if (captionElement) {
        modalContent.appendChild(captionElement);
      }

      // Show the modal
      modal.style.display = 'flex';
    });
  });
});
