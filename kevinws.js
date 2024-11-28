








document.addEventListener('DOMContentLoaded', function () {
    var lastContentVisible = 'about-content'; // Initialize with the about content as the last visible
    var lastSubtabSelected = null; // Track the last selected tab for highlighting

    // Function to hide content (for both navbar and search system)
    function hideContent(contentClass) {
        console.log('Hiding content:', contentClass);
        var content = document.querySelector('.' + contentClass);
        if (content) {
            content.style.display = 'none'; // Hide the content
        } else {
            console.error('Content not found:', contentClass);
        }
    }

    // Function to show content (for both navbar and search system)
    function showContent(contentClass) {
        console.log('Showing content:', contentClass);
        var content = document.querySelector('.' + contentClass);
        if (content) {
            content.style.display = 'block'; // Ensure content is visible
        } else {
            console.error('Content not found:', contentClass);
        }
    }

    // Function to hide all content (for both navbar and search system)
    function hideAllContent() {
        const allContent = document.querySelectorAll('.about-content, .extra-text, .copyright-content, .articles-content, .images-content, .projects-content, .coop-content, .tradingbot-content, .languages-content, .contact-content');
        allContent.forEach(content => {
            content.style.display = 'none';
        });
    }

    // Setup subtabs
    function setupSubtab(tabId, contentClass) {
        const tab = document.getElementById(tabId);
        if (tab) {
            tab.addEventListener('click', function () {
                // Hide all content and remove highlights
                hideAllContent();
                if (lastSubtabSelected) {
                    lastSubtabSelected.classList.remove('highlight');
                }

                // Show the content for the selected tab
                showContent(contentClass);

                // Highlight the selected subtab
                lastSubtabSelected = tab;
                lastSubtabSelected.classList.add('highlight');
            });
        } else {
            console.error(`Tab with ID ${tabId} not found.`);
        }
    }

    // Initially hide the 'projects-content' and setup all other subtabs
    hideContent('projects-content');  // Hide the projects content initially

    // Setup each subtab
    setupSubtab('about-tab', 'about-content');
    setupSubtab('copyright-tab', 'copyright-content');
    setupSubtab('articles-tab', 'articles-content');
    setupSubtab('images-tab', 'images-content');
    setupSubtab('projects-tab', 'projects-content');
    setupSubtab('coop-tab', 'coop-content');
    setupSubtab('tradingbot-tab', 'tradingbot-content');
    setupSubtab('languages-tab', 'languages-content');
    setupSubtab('contact-tab', 'contact-content');

    // Initially display the 'about-content' (managed by navbar)
    showContent('about-content');

    // --- Search System Integration ---
    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('input', function () {
        const query = searchBar.value.trim();
        if (query) {
            searchWebsite(query); // Trigger search when there's input
        } else {
            resetSearchResults(); // Reset the page when the search bar is cleared
        }
    });

    function searchWebsite(query) {
        hideAllContent();
    
        const elementsToSearch = document.querySelectorAll(
            '.about-content, .extra-text, .copyright-content, .articles-content, .images-content, .projects-content, .coop-content, .tradingbot-content, .languages-content, .contact-content'
        );
    
        let foundMatch = false;
        let matchCounter = 0; // Track the order of matching results
    
        elementsToSearch.forEach(element => {
            // Restore original content if already altered
            const originalHTML = element.getAttribute('data-original-html') || element.innerHTML;
            element.innerHTML = originalHTML;
    
            // Save the original HTML if it's not already saved
            if (!element.getAttribute('data-original-html')) {
                element.setAttribute('data-original-html', originalHTML);
            }
    
            // Highlight matches
            const isMatchFound = highlightMatches(element, query);
    
            if (isMatchFound) {
                matchCounter++; // Increment match counter
                foundMatch = true;
    
                // Show matching content
                showContent(element.classList[0]);
    
                // Add a label indicating the result order
                const label = document.createElement('div');
                label.textContent = `Search Result #${matchCounter}`;
                label.style.fontWeight = 'bold';
                label.style.color = 'blue';
                element.prepend(label); // Add the label at the top of the element
    
                // Add line breaks for better spacing
                for (let i = 0; i < 10; i++) {
                    const brTag = document.createElement('br');
                    element.appendChild(brTag);
                }
            }
        });
    
        // Handle 'not found' message
        const notFoundMessage = document.getElementById('not-found-message');
        notFoundMessage.style.display = foundMatch ? 'none' : 'block';
    }
    
    function highlightMatches(element, query) {
        const escapedQuery = query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'); // Escape special regex characters
        const regex = new RegExp(escapedQuery, 'gi'); // Case-insensitive match with escaped query
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    
        const nodesToReplace = [];
        let isMatchFound = false; // Flag to determine if this element has matches
    
        // Find and store matches in text nodes
        while (walker.nextNode()) {
            const currentNode = walker.currentNode;
    
            // If there's a match, save the node for replacement
            if (regex.test(currentNode.nodeValue)) {
                nodesToReplace.push(currentNode);
                isMatchFound = true; // Mark this element as a match
            }
        }
    
        // Replace text in all matching nodes
        nodesToReplace.forEach(node => {
            const parent = node.parentNode;
    
            // Create a container to hold the new HTML
            const tempContainer = document.createElement('div');
            tempContainer.innerHTML = node.nodeValue.replace(regex, match => `<span class="highlight">${match}</span>`);
    
            // Replace the text node with the new fragments
            const fragments = document.createDocumentFragment();
            Array.from(tempContainer.childNodes).forEach(child => fragments.appendChild(child));
            parent.replaceChild(fragments, node);
        });
    
        return isMatchFound;
    }
    
    
    
    // Function to reset search results
    function resetSearchResults() {
        const allTextElements = document.querySelectorAll('.about-content, .extra-text, .copyright-content, .articles-content, .images-content, .projects-content, .coop-content, .tradingbot-content, .languages-content, .contact-content');
        allTextElements.forEach(content => {
            showContent(content.classList[0]); // Show all content
        });

        const notFoundMessage = document.getElementById('not-found-message');
        if (notFoundMessage) {
            notFoundMessage.style.display = 'none'; // Hide the not found message
        }
    }
});







/*
function searchWebsite(query) {
    hideAllContent(); // Hide all content when a search is active
    const allTextElements = document.querySelectorAll(
        '.about-content, .portfolio-content, .articles-content, .projects-content, .coop-content, .tradingbot-content, .languages-content, .contact-content'
    );

    let foundMatch = false;

    allTextElements.forEach(content => {
        const originalText = content.textContent;

        // Check if the content includes the query
        if (originalText.toLowerCase().includes(query.toLowerCase())) {
            const regex = new RegExp(`(${query})`, 'gi'); // Create regex for the query (case-insensitive)
            const highlightedText = originalText.replace(
                regex,
                '<span class="highlight">$1</span>' // Wrap matched text in a span for highlighting
            );

            // Update the content's innerHTML with highlighted text
            content.innerHTML = highlightedText;

            showContent(content.classList[0]); // Show matching content
            foundMatch = true;
        } else {
            // Reset innerHTML to original text if it doesn't match
            content.innerHTML = originalText;
        }
    });


function searchWebsite(query) {
        hideAllContent(); // Hide all content when a search is active
        const allTextElements = document.querySelectorAll(
            '.about-content, .portfolio-content, .articles-content, .projects-content, .coop-content, .tradingbot-content, .languages-content, .contact-content'
        );
    
        let foundMatch = false;
    
        allTextElements.forEach(content => {
            const originalText = content.textContent;
    
            // Remove previous highlights
            content.querySelectorAll('.highlight').forEach(highlighted => {
                const parent = highlighted.parentNode;
                parent.replaceChild(document.createTextNode(highlighted.textContent), highlighted);
                parent.normalize(); // Merge adjacent text nodes
            });
    
            // Match entire phrases including spaces
            const regex = new RegExp(`(${query})`, 'gi'); // Match the query anywhere, including multi-word phrases
            const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT, null, false);
    
            while (walker.nextNode()) {
                const textNode = walker.currentNode;
                if (regex.test(textNode.nodeValue)) {
                    const fragment = document.createDocumentFragment();
                    const parts = textNode.nodeValue.split(regex); // Split text by the query
    
                    parts.forEach(part => {
                        if (regex.test(part)) {
                            const span = document.createElement('span');
                            span.classList.add('highlight');
                            span.textContent = part;
                            fragment.appendChild(span); // Highlight the matched part
                        } else {
                            fragment.appendChild(document.createTextNode(part)); // Add non-matched text as is
                        }
                    });
    
                    textNode.parentNode.replaceChild(fragment, textNode); // Replace the original node with highlighted version
                    foundMatch = true;
                }
            }
    
            if (foundMatch) {
                showContent(content.classList[0]); // Show the matching content
            }
        });
    
        // Display 'Not found!' message if no match is found
        const notFoundMessage = document.getElementById('not-found-message');
        if (!foundMatch && notFoundMessage) {
            notFoundMessage.style.display = 'block';
        } else {
            if (notFoundMessage) notFoundMessage.style.display = 'none';
        }
    }
       

    // Function to reset search results
    function resetSearchResults() {
        const allTextElements = document.querySelectorAll('.about-content, .portfolio-content, .articles-content, .projects-content, .coop-content, .tradingbot-content, .languages-content, .contact-content');
        allTextElements.forEach(content => {
            showContent(content.classList[0]); // Show all content
        });

        const notFoundMessage = document.getElementById('not-found-message');
        if (notFoundMessage) {
            notFoundMessage.style.display = 'none'; // Hide the not found message
        }
    }
});


    */

//=========================================================================

  
//EXPAND HOME PAGE TO ABOUT BUTTON

/*
document.addEventListener('DOMContentLoaded', function() {
    const flagButton = document.querySelector('.flag-button');
    const flagText = document.querySelector('.flag-text');
    const flagImages = flagButton.querySelectorAll('img');
    const lowIcons = document.querySelector('.low-icons');

    // Default texts for Portuguese
    const defaultTextPt = {
        extraTextTitle: "<h2 class='extra-title' data-translate='home-title'>DO QUE SE TRATA ESTE WEBSITE?</h2>",
        extraText: "<p class='extra-text' data-translate='home-mtext'>Este site trata principalmente de projetos na área de tecnologia da informação (programação), mais especificamente em: C, C++, Java, Web e Android. É com prazer que vos apresento os meus projetos e intenções. Também tenho interesse em negociar robôs e linguagens como hobby, coisas que também fazem parte da área de TI. Na minha história com programação, comecei a entendê-la em períodos intercalados e vi conceitos como variáveis ​​e condições em Ruby do RPG Maker XP. Logo depois comecei a programar alguns bots para o jogo Tibia chamado Elf Bot, no qual tratei de programação geral na linguagem Lua. Anos depois, fiz um curso de linguagem C, e foi aí que começaram alguns estudos mais sérios. Li um livro de 250 páginas em pouco tempo e tirei 10/10 na prova C. Logo depois comecei a lidar com outros conteúdos como C++ e criei meu primeiro projeto em C++ com mais de 6 mil linhas de código, que funcionava no console IDE. Esse projeto me trouxe alegria porque entendi que para construir um projeto é preciso disciplina e organização. Foi quando fiz um curso de HTML e depois me envolvi com CSS e JavaScript (este site foi feito em HTML5, CSS3, JavaScript e React). E foram Java e MySQL que tornaram as coisas mais interessantes, e também foi surpreendente lidar com uma linguagem puramente orientada a objetos. Depois disso, comecei uma paixão por Web Browsers, como aquele que fiz no framework Java, chamado JavaFX. Então, percebendo que o início da era mobile tratava de Java, resolvi conhecer Kotlin, e ele se tornou um dos meus principais focos em programação. Tenho a perspectiva de que qualquer projeto que seja desenvolvido deve aplicar princípios, e tudo o que é feito resulta em lições aprendidas. É através deste tipo de noção que me formo, adaptando-me assim à postura e aos comportamentos dos colegas e da empresa. Estou sempre aberto a aprender a sintaxe das linguagens de programação, entendendo os parâmetros léxicos e semânticos e as metodologias de programação existentes. Vou citar algumas áreas nas quais desejo desenvolver habilidades ou adquirir conhecimento e que irão aprimorar minhas capacidades em minha programação futura. Comecemos pelo Assembly: esta linguagem de programação está no pólo oposto das linguagens mais abstratas por ser uma linguagem de baixo nível. Está intimamente relacionado à linguagem de máquina, e o uso de uma linguagem de baixo nível não se trata apenas de movimentos que fazemos por meio da robótica, como microprocessadores, mas de coisas básicas e pequenas que são indispensáveis ​​para um sistema operacional, como seus drivers . Também pode fazer parte de como um IDE compila uma linguagem por meio do código de baixo nível em que é escrito. Outra coisa que quero ter contato e aprimorar é me inclinar para os fundamentos da informática porque dá ao programador o aparato para uma melhor estrutura de programação. Além disso, desafios de programação como 'LeetCode' são sempre úteis para praticar, para mim em algumas linguagens como Java ou C++, mas a complexidade extra sobre onde uma linguagem pode chegar através de suas bibliotecas e funções não deve ser explorada muito profundamente sem ter algo prático e útil. É importante aprimorar a área de NoSQL e adquirir conhecimento sobre como um banco de dados funciona com determinadas linguagens de programação, por se tratar do SQL médio. Também pretendo me envolver na programação de ambientes próximos que simulem carros autônomos, geralmente em Python e C++, como CARLA.</p>"
    };

    // Default texts for English
    const defaultTextEn = {
        extraTextTitle: "<h2 class='extra-title' data-translate='home-title'>What is this site about?</h2>",
        extraText: "<p class='extra-text' data-translate='home-mtext'>This website is mainly about projects in the field of information technology (programming), more specifically in: C, C++, Java, Web and Android. It is with pleasure that I show you my projects and intentions. I am also interested in trading robots and languages as a hobby, which are things that are also part of the IT area. In my history with programming, I began to understand it in interspersed periods and saw concepts such as variables and conditions in Ruby from RPG Maker XP. Soon after, I started programming some bots for the Tibia game called Elf Bot, in which I dealt with general programming in the Lua language. Years later, I took a course in the C language, and that was when some more serious studies began. I read a book of 250 pages in a short time and got 10/10 on a C test. Soon after that, I started dealing with other content such as C++ and created my first project in C++ with more than 6 thousand lines of code, which worked in the IDE console. This project brought me joy because I understood that discipline and organization are needed to build a project. That's when I took an HTML course, and after that, I got involved with CSS and JavaScript (This website was made using HTML5, CSS3, JavaScript, and React). And it was Java and MySQL that made things more exciting, and it was also surprising to deal with a purely object-oriented language. After that, I started a passion for Web Browsers, such as the one I did in the Java framework, called JavaFX. So, realizing that the onset of the mobile era dealt with Java, I decided to get to know Kotlin, and it became one of my main focuses on programming. I have the perspective that any project that is developed must apply principles, and everything that is done results in lessons learned. It is through this type of notion that I shape myself, thus adapting to the posture and behaviors of colleagues and the company. I am always open to learning the syntax of programming languages, understanding lexical and semantic parameters, and existing programming methodologies. I will name a few areas where I want to develop skills or gain knowledge about and that will upgrade my capacities into my future programming. Let's start with Assembly: this programming language is on the opposite pole of more abstracted languages because it is a low-level language. It is closely related to machine language, and the usage of a low-level language is not only about movements we do through robotics, such as microprocessors, it is about basic and little things that are indispensable for an operating system, such as its drivers. It also can be part of how an IDE compiles a language through the low-level code it is written. Another thing I want to have contact with and improve is bending toward computer science foundations because it gives the programmer the apparatus for a better programming structure. Also, programming challenges such as 'LeetCode' are always useful to practice, for me into some languages like Java or C++, but the extra complexity about where a language can reach through its libraries and functions is not about to be explored too deeply without having something practical and useful. There's an importance in improving the NoSQL area and gaining knowledge about how a DB operates with certain programming languages, as it is the average SQL. I also plan to involve myself with programming close environments that simulate self-driven cars, usually in Python and C++, such as CARLA.</p>"
    };

    // Initialize language on page load
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'pt'; // Default to 'pt' if no language is saved
    let currentLanguage = savedLanguage;

    // Function to set the extra text based on the language
    function setExtraText(language) {
        if (language === 'pt') {
            return defaultTextPt;
        } else {
            return defaultTextEn;
        }
    }

    let { extraTextTitle, extraText } = setExtraText(currentLanguage);

    var expandButton = document.querySelector('.expand-toabout');
    var extraTextContainer = document.getElementById('extra-text-container');
    var extraTextAdded = false;

    function showExtraText() {
        if (!extraTextAdded) {
            // Create a new div element with the extra text
            var extraContent = document.createElement('div');
            extraContent.innerHTML = extraTextTitle + extraText;

            // Append the extra content to the extra-text-container
            extraTextContainer.appendChild(extraContent);
            extraTextAdded = true; // Mark that the extra text has been added

            // Move the button below the extra content
            extraTextContainer.parentNode.appendChild(expandButton);
            // Change button text to indicate it can collapse the text
            expandButton.textContent = '<<';
        }
    }

    expandButton.addEventListener('click', function() {
        if (!extraTextAdded) {
            showExtraText();
        } else {
            // If extra text is already added, remove it
            extraTextContainer.innerHTML = ''; // Clear the extra text
            extraTextAdded = false; // Reset the extra text added flag

            // Reset button text
            expandButton.textContent = '>>';
            // Optionally move the button back to its original position
            extraTextContainer.parentNode.insertBefore(expandButton, extraTextContainer);
        }
    });

    // Subtab1 - About
    var aboutSubTab = document.querySelector('.subtab'); // Adjust this selector if needed
    if (aboutSubTab) {
        aboutSubTab.addEventListener('click', function() {
            console.log('Clicked subtab: About');
            showExtraText();
        });
    }

    // Set language and update the page on flag button click
    flagButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor click behavior

        if (currentLanguage === 'pt') {
            currentLanguage = 'en';
        } else {
            currentLanguage = 'pt';
        }

        localStorage.setItem('selectedLanguage', currentLanguage);
        ({ extraTextTitle, extraText } = setExtraText(currentLanguage));
        
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            el.textContent = translations[key] || el.textContent;
        });

        if (currentLanguage === 'pt') {
            setPortuguese();
        } else {
            setEnglish();
        }
    });
});

function setPortuguese() {
    flagText.textContent = 'Língua: Português';
    flagText.classList.add('portuguese-text');
    flagText.classList.remove('english-text');
    lowIcons.classList.add('portuguese-icons');
    lowIcons.classList.remove('english-icons');

    flagImages.forEach((img, index) => {
        img.src = portugueseFlags[index].src;
        img.classList.add(portugueseFlags[index].class);
        img.classList.remove('uk', 'us', 'can'); // Remove English classes
    });
}

function setEnglish() {
    flagText.textContent = 'Language: English';
    flagText.classList.add('english-text');
    flagText.classList.remove('portuguese-text');
    lowIcons.classList.add('english-icons');
    lowIcons.classList.remove('portuguese-icons');

    flagImages.forEach((img, index) => {
        img.src = englishFlags[index].src;
        img.classList.add(englishFlags[index].class);
        img.classList.remove('pt', 'br', 'an'); // Remove Portuguese classes
    });
}


function resetAboutTab() {
    // Clear the extra text
    extraTextContainer.innerHTML = '';
    extraTextAdded = false;

    // Reset the expand button text
    expandButton.textContent = '>>';

    // Move the button back to its original position
    extraTextContainer.parentNode.insertBefore(expandButton, extraTextContainer);
}


*/

/*=================================================================*/

//TOGGLE TRANSLATION BUTTON THROUGH JSON


document.addEventListener('DOMContentLoaded', function() {
    const flagButton = document.querySelector('.flag-button');
    const flagText = document.querySelector('.flag-text');
    const flagImages = flagButton.querySelectorAll('img');
    const lowIcons = document.querySelector('.low-icons');
    const lockIcon = document.querySelector('.lock-icon i'); // Lock icon element

    let isLocked = false; // Track if the lock is active

    // Flag image sources for English
    const englishFlags = [
        { src: 'united-kingdom.png', class: 'uk' },
        { src: 'united-states.png', class: 'us' },
        { src: 'canada.png', class: 'can' }
    ];

    // Flag image sources for Portuguese-speaking countries
    const portugueseFlags = [
        { src: 'portugal.png', class: 'pt' },
        { src: 'brazil.png', class: 'br' },
        { src: 'angola.png', class: 'an' }
    ];

    async function setLanguage(lang) {
        try {
            const response = await fetch(`./i18n/${lang}.json`);
            if (!response.ok) {
                throw new Error('Language file not found');
            }
            const translations = await response.json();
    
            document.querySelectorAll('[data-translate]').forEach(el => {
                const key = el.getAttribute('data-translate');
                el.innerHTML = translations[key] || el.innerHTML;
            });
    
            // Handle placeholders
            document.querySelectorAll('[data-placeholder]').forEach(el => {
                const key = el.getAttribute('data-placeholder');
                if (translations[key]) {
                    el.placeholder = translations[key];
                }
            });
    
            if (lang === 'pt') {
                setPortuguese();
            } else {
                setEnglish();
            }
    
            localStorage.setItem('selectedLanguage', lang);
        } catch (error) {
            console.error('Error loading language:', error);
        }
    }
    
    function setPortuguese() {
        flagText.innerHTML = 'Língua: Português';
        flagText.classList.add('portuguese-text');
        flagText.classList.remove('english-text');
        lowIcons.classList.add('portuguese-icons');
        lowIcons.classList.remove('english-icons');
    
        // Reset the brazil-icons class to ensure it doesn't persist when switching languages
        lowIcons.classList.remove('brazil-icons');
    
        flagImages.forEach((img, index) => {
            img.src = portugueseFlags[index].src;
            img.classList.add(portugueseFlags[index].class);
            img.classList.remove('uk', 'us', 'can'); // Remove English classes
    
            // Add the brazil-icons class when the Brazil flag is selected
            if (img.classList.contains('br')) {
                lowIcons.classList.add('brazil-icons');
            }
        });
    }

    
    function setEnglish() {
        flagText.innerHTML = 'Language: English';
        flagText.classList.add('english-text');
        flagText.classList.remove('portuguese-text');
        lowIcons.classList.add('english-icons');
        lowIcons.classList.remove('portuguese-icons');

        flagImages.forEach((img, index) => {
            img.src = englishFlags[index].src;
            img.classList.add(englishFlags[index].class);
            img.classList.remove('pt', 'br', 'an'); // Remove Portuguese classes
        });
    }

    // Initialize language on page load
    const savedLanguage = localStorage.getItem('selectedLanguage');
    const defaultLanguage = savedLanguage || 'pt'; // Default to 'pt' if no language is saved
    setLanguage(defaultLanguage);

    // Toggle language on button click
    flagButton.addEventListener('click', function(event) {
        if (isLocked) {
            console.log("Translation functionality is disabled because the lock is active");
            return; // Exit if locked
        }

        event.preventDefault(); // Prevent default anchor click behavior

        const isPortuguese = flagText.innerHTML.includes('Português');

        if (isPortuguese) {
            setLanguage('en');
        } else {
            setLanguage('pt');
        }
    });

    // Handle lock icon toggle
    document.querySelector('.lock-icon').addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent click event from propagating to parent elements

        const iconElement = this.querySelector('i');

        // Toggle the lock state
        if (iconElement.classList.contains('fa-lock-open')) {
            iconElement.className = 'fa-solid fa-lock'; // Closed lock icon
            isLocked = true; // Set lock state to locked
        } else if (iconElement.classList.contains('fa-lock')) {
            iconElement.className = 'fa-solid fa-lock-open'; // Open lock icon
            isLocked = false; // Set lock state to unlocked
        }
    });
});


//CLICK OUT AND UNSELECT SUBTABS


document.addEventListener('DOMContentLoaded', function() {
    var homeTab = document.getElementById('home-tab');
    var subTabsBox = document.getElementById('sub-tabs-box');

    function activateHomeTab() {
        homeTab.classList.add('active');
    }

    function deactivateHomeTab() {
        homeTab.classList.remove('active');
    }

    homeTab.addEventListener('click', function(event) {
        event.preventDefault();
        if (subTabsBox.style.display === 'block') {
            subTabsBox.style.display = 'none';
            deactivateHomeTab();
        } else {
            subTabsBox.style.display = 'block';
            activateHomeTab();
        }
    });

    // Optional: Hide the sub-tabs box if clicked outside and deactivate Home tab
    document.addEventListener('click', function(event) {
        if (!subTabsBox.contains(event.target) && event.target !== homeTab) {
            subTabsBox.style.display = 'none';
            deactivateHomeTab();
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    var homeTab = document.getElementById('portfolio-tab');
    var subTabsBox = document.getElementById('sub-tabs-box2');

    function activateHomeTab() {
        homeTab.classList.add('active');
    }

    function deactivateHomeTab() {
        homeTab.classList.remove('active');
    }

    homeTab.addEventListener('click', function(event) {
        event.preventDefault();
        if (subTabsBox.style.display === 'block') {
            subTabsBox.style.display = 'none';
            deactivateHomeTab();
        } else {
            subTabsBox.style.display = 'block';
            activateHomeTab();
        }
    });

    // Optional: Hide the sub-tabs box if clicked outside and deactivate Home tab
    document.addEventListener('click', function(event) {
        if (!subTabsBox.contains(event.target) && event.target !== homeTab) {
            subTabsBox.style.display = 'none';
            deactivateHomeTab();
        }
    });
});



document.addEventListener('DOMContentLoaded', function() {
    var homeTab = document.getElementById('extras-tab');
    var subTabsBox = document.getElementById('sub-tabs-box3');

    function activateHomeTab() {
        homeTab.classList.add('active');
    }

    function deactivateHomeTab() {
        homeTab.classList.remove('active');
    }

    homeTab.addEventListener('click', function(event) {
        event.preventDefault();
        if (subTabsBox.style.display === 'block') {
            subTabsBox.style.display = 'none';
            deactivateHomeTab();
        } else {
            subTabsBox.style.display = 'block';
            activateHomeTab();
        }
    });

    // Optional: Hide the sub-tabs box if clicked outside and deactivate Home tab
    document.addEventListener('click', function(event) {
        if (!subTabsBox.contains(event.target) && event.target !== homeTab) {
            subTabsBox.style.display = 'none';
            deactivateHomeTab();
        }
    });
});





//=====================================================================


  
//SAVING OF THE SELECTED STATE OF TABS


document.addEventListener('DOMContentLoaded', function() {
    // Function to remove active class from all sub-tabs
    function removeActiveFromAllSubTabs() {
        const allSubTabs = document.querySelectorAll('.subtab');
        allSubTabs.forEach(tab => {
            tab.classList.remove('active');
        });
    }

    // Function to handle sub-tab click
    function handleSubTabClick(event) {
        event.preventDefault(); // Prevent default action (navigation)

        const clickedTab = event.currentTarget; // Get the current clicked sub-tab

        // Remove active class from all sub-tabs
        removeActiveFromAllSubTabs();

        // Add active class to the clicked sub-tab
        clickedTab.classList.add('active');

        // Optionally, save the last clicked sub-tab in local storage
        const subTabId = clickedTab.getAttribute('href');
        localStorage.setItem('lastClickedSubTab', subTabId);
    }

    // Add click event listener to each sub-tab link
    const subTabLinks = document.querySelectorAll('.subtab');
    subTabLinks.forEach(link => {
        link.addEventListener('click', handleSubTabClick);
    });

    // Load the last clicked sub-tab state on page load
    function loadSubTabState() {
        const savedId = localStorage.getItem('lastClickedSubTab');
        if (savedId) {
            const savedTab = document.querySelector(`a[href="${savedId}"]`);
            if (savedTab) {
                // Remove active class from all sub-tabs and add it to the saved tab
                removeActiveFromAllSubTabs();
                savedTab.classList.add('active');
            }
        }
    }

    // Call function to restore the saved state
    loadSubTabState();
});



//=====================================================================


/*

alert("Este site está em construção!!! Confira os projetos e outras abas que foram implementadas! Encontra-se em adaptação para multiplos Browsers, então, recomenda-se o uso do Google Chrome!");
alert("This website is under construction!!! Check the projects and other tabs that have been implemented! It is adapting to multiple browsers, then using Google Chrome is recommended!");

*/

//SET BROWSER TO WORK WITH ON MOBILE: CALL CSS chrome-mobile body {} FOR EXAMPLE

document.addEventListener('DOMContentLoaded', function() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    if (isMobile) {
        if (userAgent.indexOf('pluma') > -1) {
            document.body.classList.add('pluma-mobile'); // Add class for Pluma
        }
        
        if (userAgent.indexOf('chrome') > -1) {
            document.body.classList.add('chrome-mobile');
        }
        
        if (userAgent.indexOf('opera') > -1 || userAgent.indexOf('opr') > -1) {
            document.body.classList.add('opera-mobile');
        }
        
        if (userAgent.indexOf('edg') > -1) {
            document.body.classList.add('edge-mobile');
        }
        
        if (userAgent.indexOf('firefox') > -1) {
            document.body.classList.add('firefox-mobile');
        }
    }
});





