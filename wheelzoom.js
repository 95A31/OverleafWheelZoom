function enableWheelZoom(pdfViewer, zoomInButton, zoomOutButton) 
{ 
    // Connect wheel zoom to zoom buttons
    pdfViewer.addEventListener("wheel", event =>
    {
        if (event.ctrlKey) 
        {
            // Do not zoom the page
            event.preventDefault();

            if(event.deltaY < 0)
            {
                zoomInButton.click();
            }
            else
            {
                zoomOutButton.click();
            }
        }
    });
}

const observer = new MutationObserver((mutations, mutationInstance) =>
{
    // Look for the elements in the document
    const pdfViewer = document.querySelector("div.pdfViewer");
    const zoomInIcon =  document.querySelector("i.fa-search-plus");
    const zoomOutIcon =  document.querySelector("i.fa-search-minus");

    // If the elements are loaded
    if (pdfViewer && zoomInIcon && zoomOutIcon )
    {
        mutationInstance.disconnect();
        const zoomInButton = zoomInIcon.closest("button");
        const zoomOutButton = zoomOutIcon.closest("button");
        enableWheelZoom(pdfViewer, zoomInButton, zoomOutButton);
    }
});

// Changes to observe
const config = {childList: true, subtree: true};

// Watch document changes
observer.observe(document, config);
