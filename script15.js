// scripts17.js
// Final, bug-free version of the CampusLife website JavaScript.
// This file handles all interactive functionality including dynamic content, forms, and special features.

document.addEventListener('DOMContentLoaded', () => {

    // --- Dynamic Content Data ---
    const eventsData = [
        { name: 'Cultural Fest 2025', day: 15, month: 11, year: 2024, time: '9:00 AM - 6:00 PM', location: 'Main Auditorium' },
        { name: 'Tech Workshop Series', day: 20, month: 11, year: 2024, time: '2:00 PM - 5:00 PM', location: 'Computer Lab' },
        { name: 'Christmas Celebration', day: 25, month: 11, year: 2024, time: '4:00 PM - 8:00 PM', location: 'College Grounds' },
    ];
    
    const clubsData = [
        { name: 'Coding Club', category: 'technical', members: 150, wins: 25, icon: 'fas fa-laptop-code', description: 'Learn programming, web development, and participate in hackathons' },
        { name: 'Music Society', category: 'cultural', members: 80, wins: 15, icon: 'fas fa-music', description: 'Explore your musical talents with instruments and vocals' },
        { name: 'Art & Design Club', category: 'cultural', members: 60, wins: 20, icon: 'fas fa-palette', description: 'Unleash your creativity with painting, sketching, and digital art' },
        { name: 'Sports Club', category: 'sports', members: 200, wins: 35, icon: 'fas fa-running', description: 'Stay fit and compete in various sports tournaments' },
        { name: 'Literary Society', category: 'literary', members: 45, wins: 18, icon: 'fas fa-book', description: 'Express through writing, poetry, and public speaking' },
        { name: 'Robotics Club', category: 'technical', members: 35, wins: 12, icon: 'fas fa-robot', description: 'Build and program robots for competitions' },
    ];
    
    const workshopsData = [
        { name: 'Photography Masterclass', date: 'Jan 10-12, 2025', expert: 'John Davis', hours: '3 hours/day', image: 'https://images.unsplash.com/photo-1491147334573-44cbb4602074?w=300&h=200&fit=crop' },
        { name: 'Web Development Bootcamp', date: 'Jan 15-20, 2025', expert: 'Sarah Chen', hours: '4 hours/day', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop' },
        { name: 'Public Speaking Workshop', date: 'Jan 25-27, 2025', expert: 'Mike Brown', hours: '2 hours/day', image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=200&fit=crop' },
    ];

    const tournamentsData = [
        { name: 'Inter-College Cricket Championship', dates: 'Jan 15-20, 2025', status: 'Registration Open', type: 'sports-form' },
        { name: 'Basketball Premier League', dates: 'Feb 5-10, 2025', status: 'Registration Open', type: 'sports-form' },
        { name: 'Annual Sports Meet', dates: 'Mar 1-3, 2025', status: 'Coming Soon', type: 'form' },
    ];
    
    const leaderboardData = [
        { rank: 1, team: 'Phoenix Warriors', points: 450 },
        { rank: 2, team: 'Titan Force', points: 420 },
        { rank: 3, team: 'Thunderbolts', points: 380 },
        { rank: 4, team: 'Eagle Strikers', points: 350 },
        { rank: 5, team: 'Dragon Riders', points: 320 },
    ];

    const spotlightData = [
        {
            name: 'Priya Sharma',
            major: 'Computer Science, 3rd Year',
            description: 'Won Gold Medal at State Level Swimming Championship and led the Tech Club to victory at National Hackathon',
            badges: ['Sports', 'Technology', 'Leadership']
        },
        {
            name: 'John Davis',
            major: 'Mechanical Engineering, 4th Year',
            description: 'Led the Robotics Club to victory in the National Robotics Challenge with a groundbreaking design.',
            badges: ['Engineering', 'Robotics', 'Innovation']
        },
        {
            name: 'Sarah Chen',
            major: 'Fine Arts, 2nd Year',
            description: 'Awarded first prize in the national "Canvas of Tomorrow" art competition for her unique painting style.',
            badges: ['Art', 'Creativity', 'Design']
        }
    ];

    // Function to populate the events section dynamically
    const populateEvents = () => {
        const eventsContainer = document.getElementById('events-grid-placeholder');
        if (!eventsContainer) return;

        const today = new Date();
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let html = '';

        eventsData.forEach(event => {
            const eventDate = new Date(event.year, event.month, event.day);
            const isUpcoming = eventDate >= today;
            const statusClass = isUpcoming ? 'upcoming' : '';
            
            html += `
                <div class="event-card ${statusClass}" data-searchable-text="${event.name} ${event.location} ${event.time} events">
                    <div class="event-date">
                        <span class="day">${event.day}</span>
                        <span class="month">${months[event.month]}</span>
                    </div>
                    <div class="event-info">
                        <h3>${event.name}</h3>
                        <p><i class="fas fa-clock"></i> ${event.time}</p>
                        <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                        <button class="btn-register" data-modal-btn="${event.name} Registration" data-modal-type="form">Register Now</button>
                    </div>
                </div>
            `;
        });

        eventsContainer.innerHTML = html;
    };

    // Function to populate the clubs section dynamically
    const populateClubs = (filteredClubs = clubsData) => {
        const clubsContainer = document.getElementById('clubs-grid-placeholder');
        if (!clubsContainer) return;

        let html = '';
        filteredClubs.forEach(club => {
            const badgeHtml = club.badges ? club.badges.map(badge => `<span class="badge">${badge}</span>`).join('') : '';
            html += `
                <div class="club-card" data-category="${club.category}" data-searchable-text="${club.name} ${club.description} ${club.category} club">
                    <div class="club-icon"><i class="${club.icon}"></i></div>
                    <h3>${club.name}</h3>
                    <p>${club.description}</p>
                    <div class="club-stats">
                        <span><i class="fas fa-users"></i> ${club.members}+ Members</span>
                        <span><i class="fas fa-trophy"></i> ${club.wins}+ Wins</span>
                    </div>
                    <button class="btn-join" data-modal-btn="Join ${club.name}" data-modal-type="form">Join Club</button>
                </div>
            `;
        });
        clubsContainer.innerHTML = html;
    };

    // Function to populate the workshops section dynamically
    const populateWorkshops = () => {
        const workshopsContainer = document.getElementById('workshops-grid-placeholder');
        if (!workshopsContainer) return;

        let html = '';
        workshopsData.forEach(workshop => {
            html += `
                <div class="workshop-card" data-searchable-text="${workshop.name} ${workshop.expert} ${workshop.date} workshop">
                    <img src="${workshop.image}" alt="${workshop.name}">
                    <h3>${workshop.name}</h3>
                    <p>Learn professional photography techniques from industry experts</p>
                    <div class="workshop-details">
                        <span class="date"><i class="fas fa-calendar"></i> ${workshop.date}</span>
                        <span><i class="fas fa-clock"></i> ${workshop.hours}</span>
                        <span><i class="fas fa-user"></i> Expert: ${workshop.expert}</span>
                    </div>
                    <button class="btn-register" data-modal-btn="${workshop.name} Registration" data-modal-type="form">Register Now</button>
                </div>
            `;
        });
        workshopsContainer.innerHTML = html;
    };

    // Function to populate the tournaments section dynamically
    const populateTournaments = () => {
        const tournamentsContainer = document.getElementById('tournaments-list-placeholder');
        if (!tournamentsContainer) return;

        let html = '';
        tournamentsData.forEach(tournament => {
            const actionHtml = tournament.status === 'Registration Open'
                ? `<button class="btn-register" data-modal-btn="${tournament.name}" data-modal-type="${tournament.type}">Register Now</button>`
                : `<span class="status">${tournament.status}</span>`;

            html += `
                <div class="tournament-item" data-searchable-text="${tournament.name} ${tournament.dates} sports tournament">
                    <h4>${tournament.name}</h4>
                    <p>Date: ${tournament.dates}</p>
                    ${actionHtml}
                </div>
            `;
        });
        tournamentsContainer.innerHTML = html;
    };
    
    // Function to populate the leaderboard dynamically
    const populateLeaderboard = () => {
        const leaderboardBody = document.getElementById('leaderboard-body');
        if (!leaderboardBody) return;

        let html = '';
        leaderboardData.forEach(team => {
            html += `
                <tr>
                    <td>${team.rank}</td>
                    <td>${team.team}</td>
                    <td>${team.points}</td>
                </tr>
            `;
        });
        leaderboardBody.innerHTML = html;
    };


    populateEvents();
    populateClubs();
    populateWorkshops();
    populateTournaments();
    populateLeaderboard();

    // --- Clubs Filter Functionality (UPDATED) ---
    const filterButtons = document.querySelectorAll('.clubs-filter .filter-btn');
    const clubsGrid = document.getElementById('clubs-grid-placeholder');

    filterButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            const category = event.target.dataset.category;
            
            const clubCards = clubsGrid.querySelectorAll('.club-card');
            clubCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- Student Spotlight Carousel (UPDATED) ---
    const spotlightCarousel = document.querySelector('.spotlight-carousel');
    let currentIndex = 0;

    const populateSpotlight = () => {
        if (!spotlightCarousel) return;

        let html = '';
        spotlightData.forEach((spotlight, index) => {
            const badgeHtml = spotlight.badges.map(badge => `<span class="badge">${badge}</span>`).join('');
            const isVisibleClass = index === 0 ? 'is-visible' : '';
            html += `
                <div class="spotlight-card ${isVisibleClass}" data-searchable-text="${spotlight.name} ${spotlight.major} ${spotlight.description} achievements">
                    <div class="spotlight-icon-container">
                        <i class="fas fa-user-circle"></i>
                    </div>
                    <div class="spotlight-info">
                        <h4>${spotlight.name}</h4>
                        <p>${spotlight.major}</p>
                        <p>${spotlight.description}</p>
                        <div class="achievement-badges">
                            ${badgeHtml}
                        </div>
                    </div>
                </div>
            `;
        });
        spotlightCarousel.innerHTML = html;
    };

    populateSpotlight();

    const spotlightCards = document.querySelectorAll('.spotlight-card');

    const showNextSpotlight = () => {
        spotlightCards[currentIndex].classList.remove('is-visible');
        currentIndex = (currentIndex + 1) % spotlightCards.length;
        spotlightCards[currentIndex].classList.add('is-visible');
    };

    setInterval(showNextSpotlight, 5000);

    // --- Modal Functionality ---
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.close-btn');

    // Function to create and return the registration form HTML
    const createForm = (title) => {
        return `
            <form id="registration-form" class="modal-form">
                <p>Please fill out your details to register for the <b>${title}</b>.</p>
                <div class="form-group">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" name="name" placeholder="Enter your full name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email" required>
                </div>
                <div class="form-group">
                    <label for="message">Message (Optional)</label>
                    <textarea id="message" name="message" rows="4" placeholder="Any special requests?"></textarea>
                </div>
                <button type="submit" class="btn-submit">Submit</button>
            </form>
            <div class="loading-spinner"></div>
            <div id="form-feedback" class="modal-message"></div>
        `;
    };

    // Function to create and return the competition test form HTML (NEW)
    const createTest = (title) => {
        const testQuestion = 'In which year was JavaScript first released?';
        return `
            <form id="competition-test-form" class="modal-form">
                <p>Welcome to the <b>${title}</b> qualifying test! Answer the question correctly to be considered for selection.</p>
                <div class="form-group">
                    <label for="test-answer">${testQuestion}</label>
                    <input type="text" id="test-answer" name="answer" placeholder="Your answer" required>
                </div>
                <button type="submit" class="btn-submit">Submit Answer</button>
            </form>
            <div class="loading-spinner"></div>
            <div id="form-feedback" class="modal-message"></div>
        `;
    };
    
    // Function to create and return the sports registration form HTML (NEW)
    const createSportsForm = (title) => {
        return `
            <form id="sports-registration-form" class="modal-form">
                <p>Register for <b>${title}</b> and tell us about your fitness goals.</p>
                <div class="form-group">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" name="name" placeholder="Enter your full name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email" required>
                </div>
                <div class="form-group">
                    <label>What is your primary fitness goal?</label>
                    <div class="radio-group">
                        <label><input type="radio" name="goal" value="weight-loss" required> Weight Loss</label>
                        <label><input type="radio" name="goal" value="strength-training"> Strength Training</label>
                        <label><input type="radio" name="goal" value="endurance"> Endurance</label>
                    </div>
                </div>
                <button type="submit" class="btn-submit">Submit</button>
            </form>
            <div class="loading-spinner"></div>
            <div id="form-feedback" class="modal-message"></div>
        `;
    };


    const createMessage = (title) => {
        return `
            <p class="modal-message">You are about to start a journey of discovery and fun! Thank you for your interest in <b>${title}</b>. We'll be in touch soon.</p>
        `;
    };

    const openModal = (title, type) => {
        try {
            if (modalTitle) modalTitle.textContent = title;
            if (modalBody) {
                modalBody.innerHTML = '';
                if (type === 'form') {
                    modalBody.innerHTML = createForm(title);
                    const registrationForm = document.getElementById('registration-form');
                    if (registrationForm) {
                        registrationForm.addEventListener('submit', (event) => handleFormSubmit(event, 'modal'));
                    }
                } else if (type === 'test') {
                    modalBody.innerHTML = createTest(title);
                    const testForm = document.getElementById('competition-test-form');
                    if (testForm) {
                        testForm.addEventListener('submit', handleTestSubmit);
                    }
                } else if (type === 'sports-form') {
                    modalBody.innerHTML = createSportsForm(title);
                    const sportsForm = document.getElementById('sports-registration-form');
                    if(sportsForm) {
                        sportsForm.addEventListener('submit', (event) => handleFormSubmit(event, 'modal'));
                    }
                } else {
                    modalBody.innerHTML = createMessage(title);
                }
            }
            if (modal) modal.classList.add('is-visible');
        } catch (error) {
            console.error("Error opening modal:", error);
        }
    };

    const handleFormSubmit = async (event, formType) => {
        event.preventDefault();

        const form = event.target;
        const submitBtn = form.querySelector('.btn-submit');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        let spinner, feedback;
        if (formType === 'modal') {
            spinner = form.parentNode.querySelector('.loading-spinner');
            feedback = form.parentNode.querySelector('#form-feedback');
        } else {
            spinner = document.getElementById('inquiry-spinner');
            feedback = document.getElementById('inquiry-feedback');
        }
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
        if (spinner) spinner.classList.add('is-visible');
        if (feedback) feedback.textContent = '';
        
    // Send data to the backend API
    try {
        const response = await fetch('/api/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (spinner) spinner.classList.remove('is-visible');

        if (response.ok) {
            if (feedback) {
                feedback.innerHTML = `<p>🎉 ${result.message}</p>`;
                feedback.classList.add('success-message');
                feedback.classList.remove('error-message');
            }
            if (formType !== 'modal') {
                form.reset();
            }
            form.style.display = 'none';
        } else {
            if (feedback) {
                feedback.innerHTML = `<p>❌ ${result.message}</p>`;
                feedback.classList.add('error-message');
                feedback.classList.remove('success-message');
            }
        }
    } catch (error) {
        if (spinner) spinner.classList.remove('is-visible');
        if (feedback) {
            feedback.innerHTML = `<p>❌ An error occurred. Please try again.</p>`;
            feedback.classList.add('error-message');
            feedback.classList.remove('success-message');
        }
        console.error('Submission error:', error);
    }

    // Re-enable the button
    submitBtn.disabled = false;
    submitBtn.textContent = (formType === 'modal') ? 'Submit' : 'Send Inquiry';
    };

    // New competition test submission handler
    const handleTestSubmit = (event) => {
        event.preventDefault();

        const form = event.target;
        const answerInput = form.querySelector('#test-answer');
        const spinner = form.parentNode.querySelector('.loading-spinner');
        const feedback = form.parentNode.querySelector('#form-feedback');
        const userAnswer = answerInput.value.trim().toLowerCase();
        const correctAnswer = '1995';

        const submitBtn = form.querySelector('.btn-submit');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Checking...';
        spinner.classList.add('is-visible');
        feedback.textContent = '';

        setTimeout(() => {
            spinner.classList.remove('is-visible');
            form.style.display = 'none';

            if (userAnswer === correctAnswer) {
                feedback.innerHTML = '<p>🎉 Congratulations! You have passed the qualifying test. An invitation has been sent to your email.</p>';
                feedback.classList.add('success-message');
                feedback.classList.remove('error-message');
            } else {
                feedback.innerHTML = '<p>Oops, that\'s incorrect. Please try again or study up on your web history!</p>';
                feedback.classList.add('error-message');
                feedback.classList.remove('success-message');
            }
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Answer';
        }, 2000);
    };

    const closeModal = () => {
        try {
            if (modal) modal.classList.remove('is-visible');
            if (modalBody) modalBody.innerHTML = '';
        } catch (error) {
            console.error("Error closing modal:", error);
        }
    };

    // Use event delegation to handle clicks on dynamically added modal buttons
    document.addEventListener('click', (event) => {
        const button = event.target.closest('[data-modal-btn]');
        if (button) {
            const title = button.dataset.modalBtn;
            const type = button.dataset.modalType;
            openModal(title, type);
        }
    });
    
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target === modal) closeModal();
    });
    
    // --- General Inquiry Form Functionality ---
    const inquiryForm = document.getElementById('inquiry-form');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', (event) => handleFormSubmit(event, 'inquiry'));
    }
    
    // --- Weekly Class Schedule Handler ---
    const scheduleData = {
        mon: [
            { time: '8:00 AM', name: 'Morning Yoga', instructor: 'Priya S.' },
            { time: '5:00 PM', name: 'HIIT Cardio', instructor: 'Rohan V.' },
            { time: '6:30 PM', name: 'Zumba Fitness', instructor: 'Anjali K.' }
        ],
        tue: [
            { time: '7:00 AM', name: 'Spin Class', instructor: 'Vikram R.' },
            { time: '6:00 PM', name: 'Strength Training', instructor: 'Rohan V.' }
        ],
        wed: [
            { time: '8:00 AM', name: 'Morning Yoga', instructor: 'Priya S.' },
            { time: '5:00 PM', name: 'Abs Core', instructor: 'Anjali K.' },
            { time: '7:00 PM', name: 'Boxing Basics', instructor: 'Vikram R.' }
        ],
        thu: [
            { time: '7:00 AM', name: 'Spin Class', instructor: 'Vikram R.' },
            { time: '6:00 PM', name: 'Strength Training', instructor: 'Rohan V.' }
        ],
        fri: [
            { time: '8:00 AM', name: 'Meditation & Stretch', instructor: 'Priya S.' },
            { time: '6:30 PM', name: 'Zumba Fitness', instructor: 'Anjali K.' }
        ]
    };

    const scheduleContainer = document.getElementById('schedule-content');
    const scheduleTabs = document.querySelectorAll('.schedule-tab');

    const renderSchedule = (day) => {
        if (!scheduleContainer) return;
        const classes = scheduleData[day] || [];
        scheduleContainer.innerHTML = classes.length > 0 ? classes.map(cls => `
            <div class="class-item">
                <div class="class-details"><h4>${cls.name}</h4><p>Instructor: ${cls.instructor}</p></div>
                <div class="class-time">${cls.time}</div>
            </div>`).join('') : '<p>No classes scheduled for this day.</p>';
    };

    if (scheduleTabs.length > 0 && scheduleContainer) {
        scheduleTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                scheduleTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                renderSchedule(tab.dataset.day);
            });
        });
        renderSchedule('mon'); // Initially render Monday's schedule
    }

    // --- Search Functionality ---
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const allSearchableCards = document.querySelectorAll('[data-searchable-text]');
        
        allSearchableCards.forEach(card => {
            const searchableData = card.getAttribute('data-searchable-text') ? card.getAttribute('data-searchable-text').toLowerCase() : '';
            if (searchableData.includes(searchTerm)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // --- Hamburger Menu Functionality ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // --- Smooth Scroll Functionality ---
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });

                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });
});