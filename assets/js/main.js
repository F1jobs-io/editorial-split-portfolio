// =============================================
// EDITORIAL SPLIT PORTFOLIO - MAIN JS
// =============================================

// Load JSON data
async function loadJSON(file) {
    try {
        const response = await fetch(`data/${file}.json`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`Error loading ${file}.json:`, error);
        return null;
    }
}

// Initialize site
async function initSite() {
    await Promise.all([
        loadSiteConfig(),
        loadSidebar(),
        loadHero(),
        loadAbout(),
        loadExpertise(),
        loadWork(),
        loadProjects(),
        loadContact()
    ]);

    initScrollSpy();
}

// Load site configuration
async function loadSiteConfig() {
    const config = await loadJSON('site-config');
    if (config) {
        document.getElementById('site-title').textContent = config.title || 'Portfolio';
        document.getElementById('site-description').content = config.description || 'Editorial Portfolio';
    }
}

// Load sidebar
async function loadSidebar() {
    const sidebar = await loadJSON('sidebar');
    if (sidebar) {
        const logo = document.getElementById('logo');
        if (logo) logo.textContent = sidebar.logo || 'Portfolio';

        const tagline = document.getElementById('tagline');
        if (tagline) tagline.textContent = sidebar.tagline || '';

        const nav = document.getElementById('sidebar-nav');
        if (nav && sidebar.navigation) {
            nav.innerHTML = `
                <ul>
                    ${sidebar.navigation.map(item => `
                        <li><a href="${item.href}">${item.text}</a></li>
                    `).join('')}
                </ul>
            `;
        }

        const social = document.getElementById('sidebar-social');
        if (social && sidebar.social) {
            social.innerHTML = sidebar.social.map(link => `
                <a href="${link.url}" class="social-link" target="_blank">${link.name}</a>
            `).join('');
        }

        const copyright = document.getElementById('sidebar-copyright');
        if (copyright) copyright.textContent = sidebar.copyright || '';
    }
}

// Load hero section
async function loadHero() {
    const hero = await loadJSON('hero');
    if (hero) {
        const label = document.getElementById('hero-label');
        if (label) label.textContent = hero.label || '';

        const title = document.getElementById('hero-title');
        if (title) title.textContent = hero.title || '';

        const subtitle = document.getElementById('hero-subtitle');
        if (subtitle) subtitle.textContent = hero.subtitle || '';

        const cta = document.getElementById('hero-cta');
        if (cta && hero.cta) cta.textContent = hero.cta.text || 'Get in Touch';

        const image = document.getElementById('hero-image');
        if (image && hero.image) {
            image.innerHTML = `<img src="${hero.image}" alt="${hero.title}">`;
        }
    }
}

// Load about section
async function loadAbout() {
    const about = await loadJSON('about');
    if (about) {
        const title = document.getElementById('about-title');
        if (title) title.textContent = about.title || 'About';

        const text = document.getElementById('about-text');
        if (text && about.text) {
            text.innerHTML = Array.isArray(about.text)
                ? about.text.map(p => `<p>${p}</p>`).join('')
                : `<p>${about.text}</p>`;
        }

        const location = document.getElementById('about-location');
        if (location) location.textContent = about.location || '';

        const experience = document.getElementById('about-experience');
        if (experience) experience.textContent = about.experience || '';

        const email = document.getElementById('about-email');
        if (email && about.email) {
            email.innerHTML = `<a href="mailto:${about.email}">${about.email}</a>`;
        }
    }
}

// Load expertise section
async function loadExpertise() {
    const expertise = await loadJSON('expertise');
    if (expertise) {
        const title = document.getElementById('expertise-title');
        if (title) title.textContent = expertise.title || 'Expertise';

        const grid = document.getElementById('expertise-grid');
        if (grid && expertise.items) {
            grid.innerHTML = expertise.items.map((item, index) => `
                <div class="expertise-item">
                    <div class="expertise-number">${String(index + 1).padStart(2, '0')}</div>
                    <h4 class="expertise-title">${item.title}</h4>
                    <p class="expertise-description">${item.description}</p>
                </div>
            `).join('');
        }
    }
}

// Load work experience
async function loadWork() {
    const work = await loadJSON('work');
    if (work) {
        const title = document.getElementById('work-title');
        if (title) title.textContent = work.title || 'Experience';

        const timeline = document.getElementById('work-timeline');
        if (timeline && work.items) {
            timeline.innerHTML = work.items.map(item => `
                <div class="work-item">
                    <div class="work-period">${item.period || ''}</div>
                    <h4 class="work-position">${item.position || ''}</h4>
                    <div class="work-company">${item.company || ''}</div>
                    <p class="work-description">${item.description || ''}</p>
                </div>
            `).join('');
        }
    }
}

// Load projects
async function loadProjects() {
    const projects = await loadJSON('projects');
    if (projects) {
        const title = document.getElementById('projects-title');
        if (title) title.textContent = projects.title || 'Selected Work';

        const grid = document.getElementById('projects-grid');
        if (grid && projects.items) {
            grid.innerHTML = projects.items.map(project => `
                <div class="project-item">
                    <div class="project-image">
                        ${project.image ? `<img src="${project.image}" alt="${project.title}">` : ''}
                    </div>
                    <div class="project-content">
                        ${project.category ? `<div class="project-category">${project.category}</div>` : ''}
                        <h4 class="project-title">${project.title}</h4>
                        <p class="project-description">${project.description}</p>
                        ${project.tags ? `
                            <div class="project-tags">
                                ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>
            `).join('');
        }
    }
}

// Load contact section
async function loadContact() {
    const contact = await loadJSON('contact');
    if (contact) {
        const title = document.getElementById('contact-title');
        if (title) title.textContent = contact.title || 'Let\'s Work Together';

        const message = document.getElementById('contact-message');
        if (message) message.textContent = contact.message || '';

        const info = document.getElementById('contact-info');
        if (info && contact.methods) {
            info.innerHTML = contact.methods.map(method => `
                <div class="contact-item">
                    <div class="contact-label">${method.label}</div>
                    <div class="contact-value">
                        ${method.link ? `<a href="${method.link}">${method.value}</a>` : method.value}
                    </div>
                </div>
            `).join('');
        }
    }
}

// Scroll spy for navigation
function initScrollSpy() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.sidebar-nav a');

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        if (section.id) {
            observer.observe(section);
        }
    });

    // Smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSite);
} else {
    initSite();
}
