chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
  });
  
  // Function to handle bookmarking
  function bookmarkCurrentPage() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const { url, title } = tabs[0];
      chrome.bookmarks.create({ url, title });
    });
  }
  
  // Set up context menu item for bookmarking
  chrome.contextMenus.create({
    id: 'bookmarkContextMenu',
    title: 'Bookmark This Page',
    contexts: ['page'],
    onclick: bookmarkCurrentPage,
  });
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'bookmarkPage') {
      bookmarkCurrentPage();
    }
  });
  