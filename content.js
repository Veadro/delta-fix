// Helper function to inject the Hide Pink button
function insertHidePinkButton() {
    const targetDiv = document.querySelector('div.container.week-view-toolbar');
  
    if (targetDiv) {
      console.log("Target div found.");
  
      // Check if the button doesn't already exist to prevent duplicates
      if (!document.getElementById('hidePinkButton')) {
        const hidePinkButton = document.createElement('button');
        hidePinkButton.id = 'hidePinkButton';
        hidePinkButton.textContent = 'Hide Pink';
        hidePinkButton.style.padding = '10px';
        hidePinkButton.style.fontSize = '14px';
        hidePinkButton.style.cursor = 'pointer';
        hidePinkButton.style.marginRight = '10px';
  
        // Button logic: Delete g.wv-available-hours-group elements
        hidePinkButton.addEventListener('click', () => {
          document.querySelectorAll('g.wv-available-hours-group').forEach((el) => {
            el.remove();
          });
          console.log('All g.wv-available-hours-group elements deleted');
        });
  
        // Insert the button at the beginning of the target div
        targetDiv.insertBefore(hidePinkButton, targetDiv.firstChild);
        console.log("Hide Pink button inserted.");
      } else {
        console.log("Hide Pink button already exists.");
      }
    } else {
      console.log("Target div not found, observing for changes...");
    }
  }
  
  // Observe for dynamically added elements using MutationObserver
  function observeDOMChanges() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          const targetDiv = document.querySelector('div.container.week-view-toolbar');
          if (targetDiv && !document.getElementById('hidePinkButton')) {
            insertHidePinkButton();
          }
        }
      });
    });
  
    observer.observe(document.body, { childList: true, subtree: true });
    console.log("MutationObserver is running.");
  }
  
  // Main function to ensure the script runs in all scenarios
  function init() {
    // Check if document is already loaded
    if (document.readyState === 'loading') {
      console.log('Document is still loading...');
      document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM fully loaded');
        insertHidePinkButton();
        observeDOMChanges(); // Watch for dynamic content
      });
    } else {
      // DOM is already fully loaded, run immediately
      console.log('DOM already fully loaded');
      insertHidePinkButton();
      observeDOMChanges(); // Watch for dynamic content
    }
  }
  
  // Start the script
  init();
  