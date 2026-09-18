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

// Contact Form Interactivity
const contactForm = document.getElementById('portfolio-contact-form');
const formResponse = document.getElementById('form-response');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formResponse.classList.remove('hidden', 'bg-red-500/10', 'text-red-600', 'dark:text-red-400');
    formResponse.classList.add('bg-brand-500/10', 'text-brand-600', 'dark:text-brand-500', 'border', 'border-brand-500/20');
    formResponse.textContent = '> Transmission received! Thank you for reaching out. I will respond promptly.';
    contactForm.reset();
});
