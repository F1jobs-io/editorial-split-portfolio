// =============================================
// EDITORIAL SPLIT PORTFOLIO - MAIN JS
// STANDARDIZED VERSION - Compatible with aesthetic-portfolio JSON structure
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
        loadSkills(),
        loadExperience(),
        loadProjects(),
        loadEducation(),
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

// Load sidebar (from navigation.json + footer.json for standardization)
async function loadSidebar() {
    // Try sidebar.json first (editorial specific), fallback to navigation.json
    const sidebar = await loadJSON('sidebar');
    const navigation = await loadJSON('navigation');
    const footer = await loadJSON('footer');

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
    } else if (navigation) {
        // Use standardized navigation
        const nav = document.getElementById('sidebar-nav');
        if (nav && navigation.items) {
            nav.innerHTML = `
                <ul>
                    ${navigation.items.map(item => `
                        <li><a href="${item.href}">${item.text}</a></li>
                    `).join('')}
                </ul>
            `;
        }
    }

    // Load footer data if available
    if (footer) {
        const copyright = document.getElementById('sidebar-copyright');
        if (copyright) copyright.textContent = footer.copyright || '';
    }
}

// Load hero section (STANDARDIZED)
async function loadHero() {
    const hero = await loadJSON('hero');
    if (hero) {
        // Handle both old and new structure
        const name = hero.name || '';
        const title = hero.title || '';
        const label = hero.label || hero.greeting || '';

        const labelEl = document.getElementById('hero-label');
        if (labelEl) labelEl.textContent = label;

        const titleEl = document.getElementById('hero-title');
        if (titleEl) titleEl.textContent = name ? `${name} — ${title}` : title;

        const subtitle = document.getElementById('hero-subtitle');
        if (subtitle) subtitle.textContent = hero.subtitle || hero.summary || '';

        // Handle CTA - support both structures
        const cta = document.getElementById('hero-cta');
        if (cta) {
            if (hero.cta && hero.cta.buttons && hero.cta.buttons.length > 0) {
                // New structure with buttons array
                cta.innerHTML = hero.cta.buttons.map(btn =>
                    `<a href="${btn.href}" class="btn btn-${btn.type || 'primary'}">${btn.text}</a>`
                ).join('');
            } else if (hero.cta && hero.cta.text) {
                // Old structure with single button
                cta.textContent = hero.cta.text;
            }
        }

        const image = document.getElementById('hero-image');
        if (image && hero.image) {
            image.innerHTML = `<img src="${hero.image}" alt="${name || title}">`;
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

// Load skills section (STANDARDIZED - was expertise)
async function loadSkills() {
    const skills = await loadJSON('skills');
    if (skills) {
        const title = document.getElementById('expertise-title');
        if (title) title.textContent = skills.sectionTitle || 'Skills & Expertise';

        const grid = document.getElementById('expertise-grid');
        if (grid && skills.categories) {
            grid.innerHTML = skills.categories.map((category, index) => `
                <div class="expertise-item">
                    <div class="expertise-number">${String(index + 1).padStart(2, '0')}</div>
                    <h4 class="expertise-title">${category.category}</h4>
                    <p class="expertise-description">${category.skills ? category.skills.map(s => s.name).join(', ') : ''}</p>
                </div>
            `).join('');
        }
    }
}

// Load work experience (STANDARDIZED - was work.json with "items")
async function loadExperience() {
    const experience = await loadJSON('experience');
    if (experience) {
        const title = document.getElementById('work-title');
        if (title) title.textContent = experience.sectionTitle || 'Professional Experience';

        const timeline = document.getElementById('work-timeline');
        if (timeline && experience.experiences) {
            timeline.innerHTML = experience.experiences.map(item => `
                <div class="work-item">
                    <div class="work-period">${item.period || ''}</div>
                    <h4 class="work-position">${item.title || ''}</h4>
                    <div class="work-company">${item.company || ''}</div>
                    <p class="work-description">${item.description || ''}</p>
                </div>
            `).join('');
        }
    }
}

// Load projects (STANDARDIZED - use "projects" instead of "items")
async function loadProjects() {
    const projectsData = await loadJSON('projects');
    if (projectsData) {
        const title = document.getElementById('projects-title');
        if (title) title.textContent = projectsData.sectionTitle || 'Selected Projects';

        const grid = document.getElementById('projects-grid');
        const projects = projectsData.projects || projectsData.items || []; // Support both

        if (grid && projects.length > 0) {
            grid.innerHTML = projects.map(project => {
                // Support both "tags" and "technologies"
                const tags = project.technologies || project.tags || [];

                return `
                    <div class="project-item">
                        <div class="project-image">
                            ${project.image ? `<img src="${project.image}" alt="${project.title}">` : ''}
                        </div>
                        <div class="project-content">
                            ${project.category ? `<div class="project-category">${project.category}</div>` : ''}
                            <h4 class="project-title">${project.title}</h4>
                            <p class="project-description">${project.description}</p>
                            ${tags.length > 0 ? `
                                <div class="project-tags">
                                    ${tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `;
            }).join('');
        }
    }
}

// Load education section (NEW - standardized)
async function loadEducation() {
    const education = await loadJSON('education');
    // Editorial template doesn't display education by default
    // But it's available if needed for data generation
    console.log('Education data loaded (not displayed in this template):', education);
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
