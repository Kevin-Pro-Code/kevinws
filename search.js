document.addEventListener('DOMContentLoaded', function () {
    // Cache the last visible subtab and content class
    let lastContentVisible = null;
    let lastSubtabSelected = null;

    // Function to hide the selected subtab and content
    function hideSelectedSubtab() {
        if (lastSubtabSelected) {
            lastSubtabSelected.classList.remove('highlight'); // Remove highlight from the last selected subtab
        }
        if (lastContentVisible) {
            lastContentVisible.classList.add('hidden'); // Hide the current content
        }
    }

    // Function to highlight matching text within content
    function highlightText(content, query) {
        const regex = new RegExp(query, 'gi');
        // Ensure we only modify the text nodes, not the structure
        const originalText = content.textContent;
        content.innerHTML = originalText.replace(regex, '<span class="highlight">$&</span>');
    }

    // Function to search and highlight content across the website
    function searchWebsite(query) {
        // Hide the current subtab and content
        hideSelectedSubtab();

        // Search through all content sections
        const contentSections = document.querySelectorAll('.about-content, .copyright-content, .portfolio-content, .articles-content, .images-content, .projects-content, .coop-content, .tradingbot-content, .languages-content, .contact-content');

        let foundMatch = false;

        contentSections.forEach(content => {
            // Only check if the query is in the text content (ignoring case)
            if (content.textContent.toLowerCase().includes(query.toLowerCase())) {
                highlightText(content, query);
                content.classList.remove('hidden'); // Show matching content
                foundMatch = true;
            } else {
                content.classList.add('hidden'); // Hide content that doesn't match
            }
        });

        // Display 'Not found!' message if no match is found
        const notFoundMessage = document.getElementById('not-found-message');
        if (!foundMatch) {
            notFoundMessage.style.display = 'block';
        } else {
            notFoundMessage.style.display = 'none';
        }
    }

    // Search bar logic
    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('input', function () {
        const query = searchBar.value.trim();
        if (query) {
            searchWebsite(query); // Trigger search and highlight if there’s a query
        } else {
            location.reload(); // Optional: reset the page if the search bar is empty
        }
    });

    // Function to show content for a specific subtab
    function showSubtabContent(subtabId, contentClass) {
        const subtab = document.getElementById(subtabId);
        if (subtab) {
            subtab.addEventListener('click', function () {
                hideSelectedSubtab(); // Hide previous content and subtab

                // Show the new content
                lastSubtabSelected = subtab;
                lastSubtabSelected.classList.add('highlight'); // Highlight the selected subtab

                const content = document.querySelector('.' + contentClass);
                if (content) {
                    content.classList.remove('hidden'); // Show the content corresponding to the subtab
                    lastContentVisible = content;
                }

                // Apply search query if available
                const query = searchBar.value.trim();
                if (query) {
                    searchWebsite(query);
                }

                // Save state to localStorage
                localStorage.setItem('lastVisitedSubtab', subtabId);
                localStorage.setItem('lastVisitedContent', contentClass);
            });
        } else {
            console.error(`Subtab with ID ${subtabId} not found.`);
        }
    }

    // Setup default subtab and content
    showSubtabContent('about-tab', 'about-content');

    // Restore last visited subtab and content from localStorage
    const lastVisitedSubtab = localStorage.getItem('lastVisitedSubtab');
    const lastVisitedContent = localStorage.getItem('lastVisitedContent');

    if (lastVisitedSubtab && lastVisitedContent) {
        const lastSubtab = document.getElementById(lastVisitedSubtab);
        const content = document.querySelector('.' + lastVisitedContent);

        if (lastSubtab && content) {
            lastSubtab.classList.add('highlight');
            lastSubtabSelected = lastSubtab;

            content.classList.remove('hidden');
            lastContentVisible = content;
        }
    } else {
        // Fallback to default 'about' tab
        const defaultContent = document.querySelector('.about-content');
        const defaultSubtab = document.getElementById('about-tab');
        if (defaultContent && defaultSubtab) {
            defaultContent.classList.remove('hidden');
            defaultSubtab.classList.add('highlight');
            lastContentVisible = defaultContent;
            lastSubtabSelected = defaultSubtab;
        }
    }

    // Setup search results container visibility
    const searchResults = document.getElementById('SearchResults');
    searchBar.addEventListener('input', function () {
        const query = searchBar.value.trim();
        if (query) {
            searchResults.style.display = 'flex'; // Show search results
        } else {
            searchResults.style.display = 'none'; // Hide search results
        }
    });

    // Initially hide the search results
    if (searchResults) {
        searchResults.style.display = 'none';
    }
});
