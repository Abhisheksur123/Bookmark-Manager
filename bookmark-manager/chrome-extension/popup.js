document.addEventListener('DOMContentLoaded', () => {
    const bookmarkBtn = document.getElementById('bookmarkBtn');
    bookmarkBtn.addEventListener('click', () => {
      chrome.runtime.sendMessage({ action: 'bookmarkPage' });
    });
  });
  