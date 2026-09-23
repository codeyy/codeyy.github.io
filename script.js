// Render Icons
lucide.createIcons();

// Dark Mode Toggle Logic
// Wrapped in null checks so this never throws if a page variant omits the button
const themeToggleButtons = document.querySelectorAll('.theme-toggle-btn, #theme-toggle');

function syncThemeIcons() {
    const isDark = document.documentElement.classList.contains('dark');
    themeToggleButtons.forEach(btn => {
        const moonIcon = btn.querySelector('.theme-icon-moon');
        const sunIcon = btn.querySelector('.theme-icon-sun');
        if (moonIcon) moonIcon.classList.toggle('hidden', isDark);
        if (sunIcon) sunIcon.classList.toggle('hidden', !isDark);
    });
}

if (themeToggleButtons.length) {
    syncThemeIcons();

    themeToggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            const isDark = document.documentElement.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            syncThemeIcons();
        });
    });
}

// Footer Dynamic Year
document.getElementById('current-year').textContent = new Date().getFullYear();

// Mobile Menu Toggle Logic
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Skill Filters Interactive Filter Logic
const filterBtns = document.querySelectorAll('.skill-btn');
const skillItems = document.querySelectorAll('.skill-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
            b.classList.remove('border-brand-500', 'bg-brand-500/10', 'text-brand-600', 'dark:text-brand-500');
            b.classList.add('border-gray-200', 'dark:border-dark-border', 'bg-gray-50', 'dark:bg-dark-card', 'text-gray-600', 'dark:text-gray-400', 'hover:border-gray-300', 'dark:hover:border-gray-600');
        });

        btn.classList.remove('border-gray-200', 'dark:border-dark-border', 'bg-gray-50', 'dark:bg-dark-card', 'text-gray-600', 'dark:text-gray-400', 'hover:border-gray-300', 'dark:hover:border-gray-600');
        btn.classList.add('border-brand-500', 'bg-brand-500/10', 'text-brand-600', 'dark:text-brand-500');

        const filterValue = btn.getAttribute('data-filter');

        skillItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Terminal Interactive Console Engine
const terminalForm = document.getElementById('terminal-form');
const terminalInput = document.getElementById('terminal-input');
const terminalBody = document.getElementById('terminal-body');

const commands = {
    'help': 'Available commands: <span class="text-brand-600 dark:text-brand-500">about</span>, <span class="text-brand-600 dark:text-brand-500">skills</span>, <span class="text-brand-600 dark:text-brand-500">projects</span>, <span class="text-brand-600 dark:text-brand-500">contact</span>, <span class="text-brand-600 dark:text-brand-500">clear</span>',
    'about': 'Agam K. — Full Stack Engineer focusing on performant systems, scalable APIs, and clean UX.',
    'skills': 'TypeScript, Node.js, Go, React, PostgreSQL, Redis, Docker, Kubernetes, Tailwind CSS.',
    'projects': 'Metrics Engine, Cloud Studio, Auth Middleware Gateway.',
    'contact': 'Reach out via hello@agamk.com'
};

terminalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const rawVal = terminalInput.value.trim().toLowerCase();
    terminalInput.value = '';

    if(!rawVal) return;

    // Output command echo
    const echoLine = document.createElement('p');
    echoLine.innerHTML = `<span class="text-brand-600 dark:text-brand-500">&gt;</span> ${rawVal}`;
    terminalBody.appendChild(echoLine);

    if(rawVal === 'clear') {
        terminalBody.innerHTML = '';
    } else {
        const responseLine = document.createElement('p');
        responseLine.className = 'text-gray-600 dark:text-gray-400 pl-2';
        if(commands[rawVal]) {
            responseLine.innerHTML = commands[rawVal];
        } else {
            responseLine.innerHTML = `Command not recognized: '<span class="text-red-600 dark:text-red-400">${rawVal}</span>'. Type '<span class="text-brand-600 dark:text-brand-500">help</span>'.`;
        }
        terminalBody.appendChild(responseLine);
    }

    terminalBody.scrollTop = terminalBody.scrollHeight;
});


    //Contact Form Interactivity
const form = document.getElementById('portfolio-contact-form');
const submitBtn = document.getElementById('psf-submit-btn');
const nameInput = document.getElementById('pcf-1');
const emailInput = document.getElementById('pcf-2');
const subjectInput = document.getElementById('pcf-3');
const messageInput = document.getElementById('pcf-4');
const formResponse = document.getElementById('form-response')

form.addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevents the browser from redirecting
    
    const formData = new FormData(this);
    
    // Replace with your Formspark or Formspree endpoint URL
    const endpoint = 'https://formspree.io/f/xoevwnwv'; 
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData))
      });
      
      if (response.ok) {
        formResponse.classList.remove('hidden', 'bg-red-500/10', 'text-red-600', 'dark:text-red-400');
        formResponse.classList.add('bg-brand-500/10', 'text-brand-600', 'dark:text-brand-500', 'border', 'border-brand-500/20');
        formResponse.textContent = '> Transmission received! Thank you for reaching out. I will respond promptly.......';
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Error submitting form.');
    }
  });


form.addEventListener('submit', (e) => {
    formResponse.classList.remove('hidden', 'bg-red-500/10', 'text-red-600', 'dark:text-red-400');
    formResponse.classList.add('bg-brand-500/10', 'text-brand-600', 'dark:text-brand-500', 'border', 'border-brand-500/20');
    formResponse.textContent = '> Transmission received! Thank you for reaching out. I will respond promptly.';
    contactForm.reset();
});

nameInput.addEventListener('input', () => {
    if(nameInput.value != '' && /^[A-Za-z\s]+$/.test(nameInput.value)) {
        submitBtn.disabled = false;
        nameInput.style.borderColor = '';
    } else {
        submitBtn.disabled = true;
        nameInput.style.borderColor = 'red';
    }
});
emailInput.addEventListener('input', () => {
    if(emailInput.value != '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
        submitBtn.disabled = false;
        emailInput.style.borderColor = '';
    } else {
        submitBtn.disabled = true;
        emailInput.style.borderColor = 'red';
    }
});
subjectInput.addEventListener('input', () => {  
    if(subjectInput.value !='') {
        submitBtn.disabled = false;
        subjectInput.style.borderColor = '';
    } else {
        submitBtn.disabled = true;
        subjectInput.style.borderColor = 'red';
    }
});
messageInput.addEventListener('input', () => {
    if(messageInput.value !='') {
        submitBtn.disabled = false;
        messageInput.style.borderColor = '';
    } else {
        submitBtn.disabled = true;
        messageInput.style.borderColor = 'red';
    }
})


function updateTime() {
            // Create a new date object for the current time
            const now = new Date();

            // Format the time using Intl.DateTimeFormat for a specific timezone
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: 'Asia/Calcutta', // Specify your target IANA timezone here
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            });
            const timeString = "Current Time: " + formatter.format(now);
            document.getElementById('current-time').textContent = timeString;
        }

        // Update the time immediately and then every second
        updateTime();
        setInterval(updateTime, 1000);


document.addEventListener('keydown', function(event) { 
    if ((event.key === 't' || event.key === 'T') && (event.altKey || event.metaKey)) { 
        event.preventDefault(); 
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        syncThemeIcons();
    } 
});
document.addEventListener('keydown', function(event) { 
    if ((event.key === 'c' || event.key === 'C') && (event.altKey || event.metaKey)) { 
        event.preventDefault(); 
        const terminalSection = document.getElementById('interactive'); 
        terminalSection.scrollIntoView({ behavior: 'smooth' });
    } 
});
document.addEventListener('keydown', function(event) { 
    if ((event.key === 's' || event.key === 'S') && (event.altKey || event.metaKey)) { 
        event.preventDefault(); 
        const skillsSection = document.getElementById('skills'); 
        skillsSection.scrollIntoView({ behavior: 'smooth' });
    } 
});
document.addEventListener('keydown', function(event) { 
    if ((event.key === 'p' || event.key === 'P') && (event.altKey || event.metaKey)) { 
        event.preventDefault(); 
        const projectsSection = document.getElementById('projects'); 
        projectsSection.scrollIntoView({ behavior: 'smooth' });
    } 
});

document.getElementById('terminal-form').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {

        const appology = "> Apologies, Terminal is yet to be fully implemented.";

        e.preventDefault(); // Stop default behavior if needed
        document.getElementById('terminal-welcome').style.display = 'none'; // Hide the welcome message
        document.getElementById('terminal-output').style.display = ''; // Hide the welcome message
        document.getElementById('terminal-output').textContent = appology; //document.getElementById('terminal-input').value;
        document.getElementById('terminal-input').value = ''; // Clear the input field

        setTimeout(() => {
            document.getElementById('terminal-output').textContent = '';
            document.getElementById('terminal-welcome').style.display = ''; // Show the welcome message again
        }, 2000);
    }
});



const snowCount = 120; 
// Target your specific section instead of the entire body
const snowContainer = document.querySelector('.snow-section'); 

for (let i = 0; i < snowCount; i++) { 
    const snowflake = document.createElement('div'); 
    snowflake.classList.add('snowflake'); 
    
    snowflake.textContent = String.fromCharCode(Math.random() * 100); // Snowflake character
    
    snowflake.style.left = Math.random() * 100 + "%"; 
    snowflake.style.animationDuration = 5 + Math.random() * 5 + "s"; 
    snowflake.style.fontSize = 8 + Math.random() * 10 + "px"; 
    snowflake.style.animationDelay = Math.random() * 5 + "s"; 
    snowflake.style.color = `rgba(0, ${Math.random() * 240}, 255, 0.9)`; 
    snowflake.style.opacity = Math.random(); 
    snowflake.style.zIndex = -1; 
    
    // Append to the section container
    if (snowContainer) {
        snowContainer.appendChild(snowflake); 
    }
}
