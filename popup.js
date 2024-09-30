document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleButton');
  
    toggleButton.addEventListener('click', async () => {
      let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
      // Check if the current tab's URL contains "teleopticloud.com"
      if (tab.url.includes('teleopticloud.com')) {
        // Inject a script into the active tab to add the button
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: insertHidePinkButton,
        });
      } else {
        console.log("This page is not from teleopticloud.com");
      }
    });
  });
  
  // Function to be injected into the active tab to add the "Hide Pink" button
  function insertHidePinkButton() {
    // Select the div where we want to insert the button
    const targetDiv = document.querySelector('div.container.week-view-toolbar');
  
    if (targetDiv) {
      // Check if the button doesn't already exist to prevent duplicates
      if (!document.getElementById('hidePinkButton')) {
        // Create the "Hide Pink" button
        const hidePinkButton = document.createElement('button');
        hidePinkButton.id = 'hidePinkButton';
        hidePinkButton.textContent = 'Hide Pink';
        hidePinkButton.style.padding = '10px';
        hidePinkButton.style.fontSize = '14px';
        hidePinkButton.style.cursor = 'pointer';
        hidePinkButton.style.marginRight = '10px';
  
        // Add the functionality to the button (deletes g.wv-available-hours-group elements)
        hidePinkButton.addEventListener('click', () => {
          document.querySelectorAll('g.wv-available-hours-group').forEach((el) => {
            el.remove();
          });
          console.log('All g.wv-available-hours-group elements deleted');
        });
  
        // Insert the button at the beginning of the target div
        targetDiv.insertBefore(hidePinkButton, targetDiv.firstChild);
      } else {
        console.log("Button already exists");
      }
    } else {
      console.log("Target div not found");
    }
  }
  