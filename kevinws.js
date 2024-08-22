



//ORGANIZE NAVBAR BUTTONS DISPLAY

document.addEventListener('DOMContentLoaded', function() {
    var lastContentVisible = 'home-content'; // Initialize with the home content as the last visible

    function showContent(contentClass) {
        console.log('Showing content:', contentClass);
        var content = document.querySelector('.' + contentClass);
        if (content) {
            content.style.display = 'block';
        } else {
            console.error('Content not found:', contentClass);
        }
    }

    function hideContent(contentClass) {
        console.log('Hiding content:', contentClass);
        var content = document.querySelector('.' + contentClass);
        if (content) {
            content.style.display = 'none';
        } else {
            console.error('Content not found:', contentClass);
        }
    }

    function tabClickHandler(tabId, contentClass) {
        var tab = document.getElementById(tabId);
        if (!tab) {
            console.error('Tab not found:', tabId);
            return;
        }
        tab.addEventListener('click', function() {
            console.log('Clicked tab:', tabId);
            if (lastContentVisible !== contentClass) {
                if (lastContentVisible) {
                    hideContent(lastContentVisible);
                }
                lastContentVisible = contentClass;
                showContent(contentClass);
            }
        });
    }

    // Initially show the home content only
    showContent('home-content');
    hideContent('portfolio-content');
 
    hideContent('contact-content');

    // Main tabs
    tabClickHandler('home-tab', 'home-content');
  
 
    tabClickHandler('contact-tab', 'contact-content');

    // Sub-tabs for Portfolio
    var projectsSubTab = document.getElementById('projects-tab');
    if (projectsSubTab) {
        projectsSubTab.addEventListener('click', function() {
            console.log('Clicked subtab: Projects');
            if (lastContentVisible !== 'portfolio-content') {
                if (lastContentVisible) {
                    hideContent(lastContentVisible);
                }
                lastContentVisible = 'portfolio-content';
                showContent('portfolio-content');
            }
        });
    }
});



/*=================================================================*/

// TOGGLE DATA TRANSLATION FLAG BUTTON

/*
document.addEventListener('DOMContentLoaded', function() {
    const flagButton = document.querySelector('.flag-button');
    const flagText = document.querySelector('.flag-text');
    const flagImages = flagButton.querySelectorAll('img');
    const lowIcons = document.querySelector('.low-icons');

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
    
            // Add this new section to handle placeholders
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
    

    // Function to set language to Portuguese
    function setPortuguese() {
        flagText.innerHTML = 'Língua: Português';
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

    // Function to set language to English
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
        event.preventDefault(); // Prevent default anchor click behavior

        const isPortuguese = flagText.innerHTML.includes('Português');

        if (isPortuguese) {
            setLanguage('en');
        } else {
            setLanguage('pt');
        }
    });
});

*/


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

        flagImages.forEach((img, index) => {
            img.src = portugueseFlags[index].src;
            img.classList.add(portugueseFlags[index].class);
            img.classList.remove('uk', 'us', 'can'); // Remove English classes
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




//FIREFOX MOBILE SOMETHING


document.addEventListener('DOMContentLoaded', function () {
    var isFirefox = typeof InstallTrigger !== 'undefined';
    var isMobile = /Mobi|Android/i.test(navigator.userAgent);
  
    if (isFirefox && isMobile) {
      document.body.classList.add('firefox-mobile');
    }
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



//=========================================================================

//SET THE CENTRALIZATION OF SUBTABS BOXES

/*

document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.navbar ul li a');
    const subTabsBoxes = {
        'home-tab': document.querySelector('#sub-tabs-box'),
        'portfolio-tab': document.querySelector('#sub-tabs-box2'),
        'extras-tab': document.querySelector('#sub-tabs-box3'),
        
    };

    function alignSubTabs(tab, subTabsBox) {
        if (subTabsBox) {
            const rect = tab.getBoundingClientRect();
            subTabsBox.style.left = `${rect.left + window.scrollX + rect.width / 2 - subTabsBox.offsetWidth / 2}px`;
        }
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', function(event) {
            event.preventDefault();
            Object.values(subTabsBoxes).forEach(box => box.style.display = 'none');
            const subTabsBox = subTabsBoxes[tab.id];
            if (subTabsBox) {
                subTabsBox.style.display = 'block';
                alignSubTabs(tab, subTabsBox);  // Ensure alignment on click
            }
        });
    });

    // Re-align sub-tabs on window resize or scroll
    window.addEventListener('resize', () => {
        tabs.forEach(tab => {
            const subTabsBox = subTabsBoxes[tab.id];
            alignSubTabs(tab, subTabsBox);
        });
    });
    window.addEventListener('scroll', () => {
        tabs.forEach(tab => {
            const subTabsBox = subTabsBoxes[tab.id];
            alignSubTabs(tab, subTabsBox);
        });
    });
});
    
    // Optional: Click outside to close sub-tabs
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar ul li a')) {
            Object.values(subTabsBoxes).forEach(box => box.style.display = 'none');
        }
    });

   


document.querySelectorAll('.navbar ul li a').forEach(button => {
    button.addEventListener('click', function() {
      document.querySelectorAll('.navbar ul li a').forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
    });
  });

*/
  
//EXPAND HOME PAGE TO ABOUT BUTTON


document.addEventListener('DOMContentLoaded', function() {
    const flagButton = document.querySelector('.flag-button');
    const flagText = document.querySelector('.flag-text');
    const flagImages = flagButton.querySelectorAll('img');
    const lowIcons = document.querySelector('.low-icons');

    // Default texts for Portuguese
    const defaultTextPt = {
        extraTextTitle: "<br><div class='extra-title' data-translate='home-title'>Do que se trata este site?</div><br>",
        extraText: "<p class='extra-text' data-translate='home-mtext'>Este site trata principalmente de projetos na área de tecnologia da informação (programação), mais especificamente em: C, C++, Java, Web e Android. É com prazer que vos apresento os meus projetos e intenções. Também tenho interesse em negociar robôs e linguagens como hobby, coisas que também fazem parte da área de TI. Na minha história com programação, comecei a entendê-la em períodos intercalados e vi conceitos como variáveis ​​e condições em Ruby do RPG Maker XP. Logo depois comecei a programar alguns bots para o jogo Tibia chamado Elf Bot, no qual tratei de programação geral na linguagem Lua. Anos depois, fiz um curso de linguagem C, e foi aí que começaram alguns estudos mais sérios. Li um livro de 250 páginas em pouco tempo e tirei 10/10 na prova C. Logo depois comecei a lidar com outros conteúdos como C++ e criei meu primeiro projeto em C++ com mais de 6 mil linhas de código, que funcionava no console IDE. Esse projeto me trouxe alegria porque entendi que para construir um projeto é preciso disciplina e organização. Foi quando fiz um curso de HTML e depois me envolvi com CSS e JavaScript (este site foi feito em HTML5, CSS3, JavaScript e React). E foram Java e MySQL que tornaram as coisas mais interessantes, e também foi surpreendente lidar com uma linguagem puramente orientada a objetos. Depois disso, comecei uma paixão por Web Browsers, como aquele que fiz no framework Java, chamado JavaFX. Então, percebendo que o início da era mobile tratava de Java, resolvi conhecer Kotlin, e ele se tornou um dos meus principais focos em programação. Tenho a perspectiva de que qualquer projeto que seja desenvolvido deve aplicar princípios, e tudo o que é feito resulta em lições aprendidas. É através deste tipo de noção que me formo, adaptando-me assim à postura e aos comportamentos dos colegas e da empresa. Estou sempre aberto a aprender a sintaxe das linguagens de programação, entendendo os parâmetros léxicos e semânticos e as metodologias de programação existentes. Vou citar algumas áreas nas quais desejo desenvolver habilidades ou adquirir conhecimento e que irão aprimorar minhas capacidades em minha programação futura. Comecemos pelo Assembly: esta linguagem de programação está no pólo oposto das linguagens mais abstratas por ser uma linguagem de baixo nível. Está intimamente relacionado à linguagem de máquina, e o uso de uma linguagem de baixo nível não se trata apenas de movimentos que fazemos por meio da robótica, como microprocessadores, mas de coisas básicas e pequenas que são indispensáveis ​​para um sistema operacional, como seus drivers . Também pode fazer parte de como um IDE compila uma linguagem por meio do código de baixo nível em que é escrito. Outra coisa que quero ter contato e aprimorar é me inclinar para os fundamentos da informática porque dá ao programador o aparato para uma melhor estrutura de programação. Além disso, desafios de programação como 'LeetCode' são sempre úteis para praticar, para mim em algumas linguagens como Java ou C++, mas a complexidade extra sobre onde uma linguagem pode chegar através de suas bibliotecas e funções não deve ser explorada muito profundamente sem ter algo prático e útil. É importante aprimorar a área de NoSQL e adquirir conhecimento sobre como um banco de dados funciona com determinadas linguagens de programação, por se tratar do SQL médio. Também pretendo me envolver na programação de ambientes próximos que simulem carros autônomos, geralmente em Python e C++, como CARLA.</p>"
    };

    // Default texts for English
    const defaultTextEn = {
        extraTextTitle: "<br><div class='extra-title' data-translate='home-title'>What is this site about?</div><br>",
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



//=====================================================================


  
//THE SAVING OF THE SELECTED STATE OF TABS


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

let currentLanguage = 'en';

// Function to handle language toggle
function toggleLanguage(lang) {
  if (lang !== currentLanguage) {
    currentLanguage = lang;
    setLanguage(currentLanguage);
  }
}

// Function to set the language
async function setLanguage(lang) {
  try {
    const response = await fetch(`./i18n/${lang}.json`);
    if (!response.ok) {
      throw new Error('Language file not found');
    }
    const translations = await response.json();

    // Update text content based on translation keys
    document.querySelectorAll('[data-translate]').forEach(el => {
      const key = el.getAttribute('data-translate');
      el.textContent = translations[key] || el.textContent;
    });

    // Update language display
    document.getElementById('current-language').textContent = `Language: ${lang === 'en' ? 'English' : 'Português'}`;
    localStorage.setItem('selectedLanguage', lang);
  } catch (error) {
    console.error('Error loading language:', error);
  }
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
  currentLanguage = savedLanguage;
  setLanguage(savedLanguage);
});

// Add event listeners to flag buttons
document.querySelectorAll('.flag').forEach(flag => {
  flag.addEventListener('click', () => {
    const lang = flag.getAttribute('data-lang');
    toggleLanguage(lang);
  });
});




document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.navbar > ul > li > a');
    const subTabsBoxes = {
        'home-tab': document.getElementById('sub-tabs-box'),
        'portfolio-tab': document.getElementById('sub-tabs-box2'),
        'extras-tab': document.getElementById('sub-tabs-box3')
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', function(event) {
            event.preventDefault();

            // Align the subtabs box for the clicked tab
            const subtabBox = subTabsBoxes[this.id];
            if (subtabBox) {
                // Use getBoundingClientRect() for precise positioning
                const tabRect = this.getBoundingClientRect();
                const navbarRect = this.closest('.navbar').getBoundingClientRect();
                subtabBox.style.left = `${tabRect.left - navbarRect.left}px`;
                subtabBox.style.top = `${tabRect.bottom - navbarRect.top}px`; // Adjust the top position if needed
            }
        });
    });
});

// Get the navbar buttons and subtab containers 
const homeButton = document.getElementById("home-tab"); 
const portfolioButton = document.getElementById("portfolio-tab"); 
const extrasButton = document.getElementById("extras-tab"); 

const subTabsHome = document.getElementById("sub-tabs-box"); 
const subTabsPortfolio = document.getElementById("sub-tabs-box2"); 
const subTabsExtras = document.getElementById("sub-tabs-box3");

function centerSubtab(button, subtabContainer) {
    const buttonTop = button.offsetTop; 
    const buttonBottom = buttonTop + button.offsetHeight;
    const containerHeight = subtabContainer.offsetHeight;
    const centerPoint = (buttonTop + buttonBottom) / 2 - containerHeight / 2;

    subtabContainer.style.top = centerPoint + "px";
}

// Center subtabs initially 
centerSubtab(homeButton, subTabsHome);
centerSubtab(portfolioButton, subTabsPortfolio);
centerSubtab(extrasButton, subTabsExtras);

// Center on window resize
window.addEventListener('resize', () => {
    centerSubtab(homeButton, subTabsHome);
    centerSubtab(portfolioButton, subTabsPortfolio);
    centerSubtab(extrasButton, subTabsExtras);
}); 


*/





alert("Este site está em construção!!! Confira os projetos e outras abas que foram implementadas! Encontra-se em adaptação para multiplos Browsers, então, recomenda-se o uso do Google Chrome!");
alert("This website is under construction!!! Check the projects and other tabs that have been implemented! It is adapting to multiple browsers, then using Google Chrome is recommended!");