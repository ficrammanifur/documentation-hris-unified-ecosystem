// Main JavaScript for HRIS Documentation

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initThemeToggle();
    initNavigation();
    initSidebar();
    initMobileMenu();
    initSmoothScroll();
});

// ===== THEME TOGGLE =====
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    }
    
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        }
    });
}

// ===== NAVIGATION =====
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.doc-section');
    
    // Set active section based on hash
    function setActiveSection(hash) {
        if (!hash) hash = '#overview';
        
        // Remove active class from all links and sections
        navLinks.forEach(link => link.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));
        
        // Add active class to current link and section
        const activeLink = document.querySelector(`.nav-link[href="${hash}"]`);
        const activeSection = document.querySelector(hash);
        
        if (activeLink) activeLink.classList.add('active');
        if (activeSection) activeSection.classList.add('active');
    }
    
    // Handle hash change
    window.addEventListener('hashchange', () => {
        setActiveSection(window.location.hash);
    });
    
    // Handle link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            window.location.hash = targetId;
            setActiveSection(targetId);
            
            // Close mobile sidebar after navigation
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.remove('mobile-open');
        });
    });
    
    // Set initial active section
    setActiveSection(window.location.hash || '#overview');
}

// ===== SIDEBAR =====
function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const mainContent = document.getElementById('main-content');
    
    // Check for saved sidebar state
    const savedState = localStorage.getItem('sidebar-collapsed');
    if (savedState === 'true') {
        sidebar.classList.add('collapsed');
    }
    
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        localStorage.setItem('sidebar-collapsed', sidebar.classList.contains('collapsed'));
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('sidebar');
    
    if (!mobileBtn) return;
    
    mobileBtn.addEventListener('click', () => {
        sidebar.classList.toggle('mobile-open');
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !mobileBtn.contains(e.target)) {
                sidebar.classList.remove('mobile-open');
            }
        }
    });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== CODE BLOCK COPY BUTTON (Optional) =====
function addCopyButtons() {
    const codeBlocks = document.querySelectorAll('.code-block');
    
    codeBlocks.forEach(block => {
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
        `;
        
        copyBtn.addEventListener('click', async () => {
            const code = block.querySelector('code') || block.querySelector('pre');
            if (code) {
                try {
                    await navigator.clipboard.writeText(code.innerText);
                    copyBtn.innerHTML = '✓';
                    setTimeout(() => {
                        copyBtn.innerHTML = `
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                        `;
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
            }
        });
        
        block.style.position = 'relative';
        copyBtn.style.position = 'absolute';
        copyBtn.style.top = '8px';
        copyBtn.style.right = '8px';
        copyBtn.style.background = 'var(--surface)';
        copyBtn.style.border = '1px solid var(--border)';
        copyBtn.style.borderRadius = 'var(--border-radius-sm)';
        copyBtn.style.padding = '4px 8px';
        copyBtn.style.cursor = 'pointer';
        copyBtn.style.color = 'var(--text-secondary)';
        
        block.appendChild(copyBtn);
    });
}

// Optional: Uncomment to add copy buttons
// addCopyButtons();
