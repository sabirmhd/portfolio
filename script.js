document.addEventListener('DOMContentLoaded', function () {
    // --- Video Modal Logic ---
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('demoVideo');
    const modalTitle = document.getElementById('modalTitle');
    const closeButtons = document.querySelectorAll('.close-modal');

    document.querySelectorAll('.live-demo-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const videoSrc = this.getAttribute('data-video');
            const title = this.getAttribute('data-title');
            video.src = videoSrc;
            modalTitle.textContent = title;
            modal.style.visibility = "visible";
            modal.style.opacity = "1";
            setTimeout(() => video.play(), 300);
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            modal.style.visibility = "hidden";
            modal.style.opacity = "0";
            video.pause();
            video.currentTime = 0;
        });
    });

    // --- "View More" Projects Logic ---
    // Note: This script looks for projects with a class 'pro-hidden' to toggle.
    // You'll need to add class="pro-hidden hidden" to any project cards you want initially hidden.
    const viewMoreBtn = document.getElementById('view-more-btn');
    if (viewMoreBtn) {
        const btnText = document.getElementById('view-more-text');
        const downIcon = viewMoreBtn.querySelector('.chevron-down-icon');
        const upIcon = viewMoreBtn.querySelector('.chevron-up-icon');

        viewMoreBtn.addEventListener('click', () => {
            const extraProjects = document.querySelectorAll('.pro-hidden');
            const isShowingMore = btnText.textContent.trim() === 'View Less';

            extraProjects.forEach(project => project.classList.toggle('hidden'));

            btnText.textContent = isShowingMore ? 'View all Projects' : 'View Less';
            downIcon.classList.toggle('hidden');
            upIcon.classList.toggle('hidden');

            if (isShowingMore) {
                document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    document.querySelectorAll('section[id]').forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    const backToTopButton = document.getElementById('back-to-top');
    if (scrollPosition > 300) {
        backToTopButton.classList.remove('hidden');
    } else {
        backToTopButton.classList.add('hidden');
    }
});

// Back to top button
document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animate skill bars on scroll (runs once)
const animateSkillBars = () => {
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const skillBars = document.querySelectorAll('.skill-progress');
        const skillsSectionTop = skillsSection.offsetTop;
        const windowHeight = window.innerHeight;

        if (window.scrollY > skillsSectionTop - windowHeight + 200) {
            skillBars.forEach(bar => {
                const finalWidth = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = finalWidth;
                }, 10);
            });
            window.removeEventListener('scroll', animateSkillBars);
        }
    }
};
window.addEventListener('scroll', animateSkillBars);

// Contact Form Submission
document.getElementById("contact-form").addEventListener("submit", async function (e) {
    e.preventDefault();
    const form = e.target;
    const statusDiv = document.getElementById("form-status");

    function showMessage(message, bgColor) {
        statusDiv.innerHTML = `
            <span>${message}</span>
            <button id="close-status" class="ml-4 font-bold">&times;</button>
        `;
        statusDiv.className = `mt-4 p-4 rounded-lg text-white font-medium ${bgColor} flex justify-between items-center`;
        statusDiv.style.display = "flex";

        const timeoutId = setTimeout(() => {
            statusDiv.style.display = "none";
        }, 3000);

        document.getElementById("close-status").addEventListener("click", () => {
            statusDiv.style.display = "none";
            clearTimeout(timeoutId);
        });
    }

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
            showMessage("Message sent successfully!", "bg-green-500");
            form.reset();
        } else {
            showMessage("Oops! Something went wrong. Please try again.", "bg-red-500");
        }
    } catch (error) {
        showMessage("⚠️ Network error. Please try again later.", "bg-yellow-500");
    }
});

// Certificate Modal functions
function openCertificate(src) {
    document.getElementById("certificateImage").src = src;
    const modal = document.getElementById("certificateModal");
    modal.classList.remove("hidden");
    modal.classList.add("flex");
}

function closeCertificate() {
    const modal = document.getElementById("certificateModal");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
}