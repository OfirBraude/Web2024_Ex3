// Get references to DOM elements
const header = document.querySelector('h1');
const app = document.getElementById('app');
const ddMenu = document.querySelector('#ddMenu');
const html = document.documentElement;
const menuContainer = document.querySelector('.sm\\:flex');
const menuButton = document.querySelector('.block.sm\\:hidden');

// Toggle between dark and light theme
const toggleTheme = () => html.classList.toggle('dark');

// Set the view based on the selected menu item
const setView = (v) => {
    header.innerText = v;
    toggleMenu(true);

    if (v === 'Calculator') {
        renderCalculator();
    } else if (v === 'About') {
        renderAbout();
    } else if (v === 'Contact') {
        renderContact();
    }
};

// Toggle the visibility of the menu
const toggleMenu = (hide) => {
    if (!hide) {
        ddMenu.classList.toggle('hidden');
        document.querySelectorAll('svg').forEach((el) => {
            el.classList.toggle('hidden');
        });
    } else {
        ddMenu.classList.add('hidden');
        document.querySelectorAll('svg')[0].classList.remove('hidden');
        document.querySelectorAll('svg')[1].classList.add('hidden');
    }
};

// Add a row of content to the container
const addRow = (container, content) => {
    const row = `<div class='grid grid-cols-5 gap-2'>${content}</div>`;
    container.insertAdjacentHTML('beforeend', row);
};

// Add a monitor (display) to the container
const addMonitor = (container, text) => {
    const t = text ?? '';
    const monitor = `<div id='monitor' class="bg-white border-4 border-blue-400 h-20 flex items-center col-span-5 text-blue-800 p-2 rounded-lg mb-2 font-bold text-4xl">${t}</div>`;
    container.insertAdjacentHTML('beforeend', monitor);
};

// Create a button with the given text
const button = (text) => {
    const c = text === 'calculate' ? 'col-span-4' : '';
    return `<div class='bg-blue-400 hover:bg-blue-600 text-white ${c} py-1 rounded-md text-center text-lg font-bold cursor-pointer d-btn'>${text}</div>`;
};

// Add multiple buttons to the container
const addButtons = (container, nums) => {
    const btnHTML = nums.map((n) => button(n)).join('');
    addRow(container, btnHTML);
};

// Handle click events on the buttons
const click = (event) => {
    const monitor = document.getElementById('monitor');
    const bac = monitor.innerText.trim();
    const a = event.target.innerText;
    console.log(a);
    if (a === 'clear') {
        monitor.innerText = '';
    } else if (a === 'calculate') {
        monitor.innerText = bac + '=' + eval(bac);
    } else {
        monitor.innerText += a;
    }
};

// Render the calculator interface
const renderCalculator = () => {
    const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '+', '-', '*', '/', '**', 'calculate', 'clear'];
    app.innerHTML = '';
    addMonitor(app);
    addButtons(app, labels);
    const buttons = document.querySelectorAll('.d-btn');
    buttons.forEach((el) => el.addEventListener('click', click));
};

// Render the "About" page
const renderAbout = () => {
    app.innerHTML = '<div class="p-4 h-[200px] flex items-center justify-center">Temp for About</div>';
};

// Render the "Contact" page
const renderContact = () => {
    app.innerHTML = '<div class="p-4 h-[200px] flex items-center justify-center">Temp for Contact</div>';
};

// Render the menu with the specified items
const renderMenu = () => {
    const menuItems = ['Calculator', 'About', 'Contact'];
    const dropdownMenu = document.getElementById('ddMenu');
    menuContainer.innerHTML = ''; // Clear existing menu items
    dropdownMenu.innerHTML = ''; // Clear existing dropdown menu items

    menuItems.forEach((item) => {
        const button = document.createElement('button');
        button.innerText = item;
        button.className = 'block py-1 px-2';
        button.onclick = () => setView(item);

        // Append to top menu
        const topMenuButton = document.createElement('button');
        topMenuButton.innerText = item;
        topMenuButton.onclick = () => setView(item);
        menuContainer.appendChild(topMenuButton);

        // Append to dropdown menu
        dropdownMenu.appendChild(button);
    });
};

// Render the theme toggle button
const renderThemeToggle = () => {
    const toggleContainer = document.createElement('div');
    toggleContainer.className = 'flex items-center';

    const darkButton = document.createElement('button');
    darkButton.className = 'dark:hidden block';
    darkButton.innerText = 'Dark';
    darkButton.onclick = toggleTheme;
    toggleContainer.appendChild(darkButton);

    const lightButton = document.createElement('button');
    lightButton.className = 'hidden dark:block';
    lightButton.innerText = 'Light';
    lightButton.onclick = toggleTheme;
    toggleContainer.appendChild(lightButton);

    menuContainer.parentElement.appendChild(toggleContainer);
};

// Initial render of the menu, theme toggle, and calculator
renderMenu();
renderThemeToggle();
renderCalculator();
