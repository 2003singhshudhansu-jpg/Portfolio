/* ==========================================================================
   Sudhanshu Singh - Data Analyst Portfolio Logic & Interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Navbar Scroll & Active Section Highlighting (Scroll-Spy)
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Sticky Header Class
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // ScrollSpy Active Link Tracking
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // 2. Mobile Menu Navigation Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinksContainer = document.getElementById('nav-links');

    if (mobileToggle && navLinksContainer) {
        mobileToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('open');
            const icon = mobileToggle.querySelector('i');
            if (navLinksContainer.classList.contains('open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile nav when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('open');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            });
        });
    }

    // 3. Animated Number Counters on Viewport Scroll
    const statNumbers = document.querySelectorAll('.stat-number');
    let animatedStats = false;

    const animateCounters = () => {
        const statsSection = document.getElementById('about');
        if (!statsSection) return;

        const sectionPos = statsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.2;

        if (sectionPos < screenPos && !animatedStats) {
            animatedStats = true;
            statNumbers.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // 2 seconds
                const stepTime = 20;
                const steps = duration / stepTime;
                const increment = target / steps;
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target.toLocaleString();
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current).toLocaleString();
                    }
                }, stepTime);
            });
        }
    };

    window.addEventListener('scroll', animateCounters);
    animateCounters(); // Trigger on load if already in view

    // 4. Skills Category Tabs Filter
    const tabBtns = document.querySelectorAll('.tab-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-tab');

            skillCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
    });

    // 5. Initialize Live Interactive Chart.js Graphs for Projects
    initProjectCharts();

    // 6. Interactive Modals Management
    initModals();

    // 7. Contact Form Handling
    initContactForm();
});

/* ==========================================================================
   Chart.js Initialization for Project Metrics
   ========================================================================== */
function initProjectCharts() {
    Chart.defaults.color = '#94A3B8';
    Chart.defaults.font.family = 'Inter';

    // Chart 1: Employee Attrition by Department
    const attritionCtx = document.getElementById('attritionChart');
    if (attritionCtx) {
        new Chart(attritionCtx, {
            type: 'bar',
            data: {
                labels: ['Research & Dev', 'Sales', 'Human Resources'],
                datasets: [{
                    label: 'Attrition Count',
                    data: [133, 92, 12],
                    backgroundColor: ['rgba(0, 240, 255, 0.8)', 'rgba(59, 130, 246, 0.8)', 'rgba(139, 92, 246, 0.8)'],
                    borderColor: ['#00F0FF', '#3B82F6', '#8B5CF6'],
                    borderWidth: 1,
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return ` Attrition: ${context.raw} employees`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        grid: { color: 'rgba(255, 255, 255, 0.06)' },
                        ticks: { color: '#94A3B8' }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#94A3B8' }
                    }
                }
            }
        });
    }

    // Chart 2: E-Commerce Category Revenue vs Profit
    const salesCtx = document.getElementById('salesChart');
    if (salesCtx) {
        new Chart(salesCtx, {
            type: 'line',
            data: {
                labels: ['Electronics', 'Fashion', 'Home Decor', 'Beauty', 'Sports'],
                datasets: [
                    {
                        label: 'Sales Revenue ($k)',
                        data: [145, 98, 64, 42, 38],
                        borderColor: '#10B981',
                        backgroundColor: 'rgba(16, 185, 129, 0.15)',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Net Profit ($k)',
                        data: [42, 28, 18, 14, 9],
                        borderColor: '#00F0FF',
                        borderDash: [5, 5],
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: '#F8FAFC', font: { size: 11 } }
                    }
                },
                scales: {
                    y: {
                        grid: { color: 'rgba(255, 255, 255, 0.06)' },
                        ticks: { color: '#94A3B8' }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#94A3B8' }
                    }
                }
            }
        });
    }

    // Chart 3: Netflix Movies vs TV Shows Doughnut
    const netflixCtx = document.getElementById('netflixChart');
    if (netflixCtx) {
        new Chart(netflixCtx, {
            type: 'doughnut',
            data: {
                labels: ['Movies (68%)', 'TV Shows (32%)'],
                datasets: [{
                    data: [6131, 2676],
                    backgroundColor: ['#8B5CF6', '#00F0FF'],
                    borderColor: '#090C15',
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: { color: '#F8FAFC', font: { size: 12 } }
                    }
                },
                cutout: '70%'
            }
        });
    }
}

/* ==========================================================================
   Modals Management (Resume & Project Deep Dives)
   ========================================================================== */
function initModals() {
    // Resume Modal Elements
    const resumeModal = document.getElementById('resume-modal');
    const openResumeBtn = document.getElementById('open-resume-modal');
    const heroResumeBtn = document.getElementById('hero-resume-btn');
    const contactResumeBtn = document.getElementById('contact-resume-btn');
    const closeResumeBtn = document.getElementById('close-resume-modal');
    const resumeOverlay = document.getElementById('resume-modal-overlay');

    const toggleResumeModal = (show) => {
        if (show) {
            resumeModal.classList.add('open');
            resumeModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        } else {
            resumeModal.classList.remove('open');
            resumeModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    };

    [openResumeBtn, heroResumeBtn, contactResumeBtn].forEach(btn => {
        if (btn) btn.addEventListener('click', () => toggleResumeModal(true));
    });

    if (closeResumeBtn) closeResumeBtn.addEventListener('click', () => toggleResumeModal(false));
    if (resumeOverlay) resumeOverlay.addEventListener('click', () => toggleResumeModal(false));

    // Project Deep Dive Modal Elements
    const projectModal = document.getElementById('project-modal');
    const closeProjectBtn = document.getElementById('close-project-modal');
    const projectOverlay = document.getElementById('project-modal-overlay');
    const projectModalContent = document.getElementById('project-modal-content');
    const openProjectBtns = document.querySelectorAll('.open-project-modal');

    const projectData = {
        attrition: {
            title: "Employee Attrition Analysis (SQL, Python, Power BI)",
            category: "HR Business Intelligence Case Study",
            content: `
                <div class="modal-project-details">
                    <span class="badge-tag">Dataset: 1,470 Employee Records | 30+ HR Attributes</span>
                    <h3 class="margin-top-10">Project Overview</h3>
                    <p>Analyzed employee turnover patterns for enterprise HR management using SQL data extraction, Python exploratory analysis, and DAX calculations in Power BI.</p>
                    
                    <h4>Key Business Insights Uncovered</h4>
                    <ul>
                        <li><strong>Overtime Impact:</strong> Employees working overtime exhibited a 30.5% attrition rate compared to only 10.4% for non-overtime staff.</li>
                        <li><strong>Job Satisfaction:</strong> Low satisfaction rating (1/4) combined with monthly income below $3,000 accounted for over 45% of total resignations.</li>
                        <li><strong>Departmental Variations:</strong> Sales Representatives experienced the highest percentage of turnover (39.8%).</li>
                    </ul>

                    <h4>Power BI DAX Formula Example</h4>
                    <pre class="code-box"><code>Attrition Rate % = 
DIVIDE(
    CALCULATE(COUNT(HR_Data[EmployeeID]), HR_Data[Attrition] = "Yes"),
    COUNT(HR_Data[EmployeeID]),
    0
)</code></pre>
                </div>
            `
        },
        ecommerce: {
            title: "E-Commerce Sales Performance Analysis (SQL, MySQL)",
            category: "Relational Database & SQL Views Case Study",
            content: `
                <div class="modal-project-details">
                    <span class="badge-tag">Normalized 3NF Relational DB | 500+ Sales Records</span>
                    <h3 class="margin-top-10">Project Overview</h3>
                    <p>Designed a normalized MySQL schema integrating Customer, Product, and Transaction tables to perform sales performance reporting and data quality audits.</p>
                    
                    <h4>SQL CTE & Aggregation Sample Query</h4>
                    <pre class="code-box"><code>WITH CategorySales AS (
    SELECT 
        p.category_name,
        COUNT(t.transaction_id) AS total_orders,
        SUM(t.sale_amount) AS total_revenue,
        SUM(t.sale_amount - (p.cost_price * t.quantity)) AS net_profit
    FROM transactions t
    JOIN products p ON t.product_id = p.product_id
    GROUP BY p.category_name
)
SELECT 
    category_name,
    total_revenue,
    net_profit,
    ROUND((net_profit / total_revenue) * 100, 2) AS profit_margin_pct
FROM CategorySales
ORDER BY total_revenue DESC;</code></pre>
                </div>
            `
        },
        netflix: {
            title: "Netflix Content & Growth Analysis (Python, Pandas, Power BI)",
            category: "Exploratory Data Analysis Case Study",
            content: `
                <div class="modal-project-details">
                    <span class="badge-tag">8,800+ Catalog Titles | 1,200+ Missing Values Resolved</span>
                    <h3 class="margin-top-10">Project Overview</h3>
                    <p>Explored Netflix's full catalog to understand title additions over time, rating distribution, and genre diversification.</p>
                    
                    <h4>Python Pandas Cleaning Pipeline</h4>
                    <pre class="code-box"><code>import pandas as pd

# Load dataset and resolve null values
df = pd.read_csv('netflix_titles.csv')
df['director'].fillna('Unknown Director', inplace=True)
df['cast'].fillna('Unknown Cast', inplace=True)
df['country'].fillna(df['country'].mode()[0], inplace=True)

# Extract date components
df['date_added'] = pd.to_datetime(df['date_added'].str.strip())
df['year_added'] = df['date_added'].dt.year

print("Movies vs TV Shows Ratio:")
print(df['type'].value_counts(normalize=True) * 100)</code></pre>
                </div>
            `
        }
    };

    openProjectBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-project');
            const data = projectData[key];
            if (data) {
                projectModalContent.innerHTML = `
                    <div class="badge-tag" style="margin-bottom: 10px;">${data.category}</div>
                    <h2 style="margin-bottom: 15px;">${data.title}</h2>
                    ${data.content}
                `;
                projectModal.classList.add('open');
                projectModal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    const toggleProjectModal = (show) => {
        if (show) {
            projectModal.classList.add('open');
        } else {
            projectModal.classList.remove('open');
            projectModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    };

    if (closeProjectBtn) closeProjectBtn.addEventListener('click', () => toggleProjectModal(false));
    if (projectOverlay) projectOverlay.addEventListener('click', () => toggleProjectModal(false));
}

/* ==========================================================================
   Contact Form Validation & Feedback Toast
   ========================================================================== */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const toast = document.getElementById('toast');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Trigger mailto fallback for direct email client opening
            const mailtoLink = `mailto:2003singhshudhanshu@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            window.location.href = mailtoLink;

            // Show Toast Notification
            if (toast) {
                toast.textContent = `Thank you, ${name}! Opening your email client...`;
                toast.classList.add('show');
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 4000);
            }

            contactForm.reset();
        });
    }
}
