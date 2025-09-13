// scripts0.js
// Final version with separate forms + fixed clubs filter + updated sports dates + leaderboard + weekly schedule

document.addEventListener("DOMContentLoaded", () => {
  // --- Dynamic Content Data ---
  const eventsData = [
    { name: "Cultural Fest 2025", day: 15, month: 9, year: 2025, time: "9:00 AM - 6:00 PM", location: "Main Auditorium", type: "cultural" },
    { name: "Tech Workshop Series", day: 20, month: 9, year: 2025, time: "2:00 PM - 5:00 PM", location: "Computer Lab", type: "workshop" },
    { name: "Christmas Celebration", day: 25, month: 12, year: 2025, time: "4:00 PM - 8:00 PM", location: "College Grounds", type: "cultural" },
  ];

  const clubsData = [
    { name: "Coding Club", category: "technical", members: 150, wins: 25, icon: "fas fa-laptop-code", description: "Learn programming, web development, and participate in hackathons", type: "technical" },
    { name: "Music Society", category: "cultural", members: 80, wins: 15, icon: "fas fa-music", description: "Explore your musical talents with instruments and vocals", type: "cultural" },
    { name: "Sports Club", category: "sports", members: 200, wins: 35, icon: "fas fa-running", description: "Stay fit and compete in various sports tournaments", type: "sports" },
    { name: "Literary Society", category: "literary", members: 60, wins: 18, icon: "fas fa-book", description: "Express through writing, poetry, and public speaking", type: "literary" },
  ];

  const workshopsData = [
    { name: "Photography Masterclass", date: "Sep 10-12, 2025", expert: "John Davis", hours: "3 hours/day", image: "https://images.unsplash.com/photo-1491147334573-44cbb4602074?w=300&h=200&fit=crop", type: "workshop" },
    { name: "Web Development Bootcamp", date: "Oct 15-20, 2025", expert: "Sarah Chen", hours: "4 hours/day", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop", type: "workshop" },
  ];

  const tournamentsData = [
    { name: "Inter-College Cricket Championship", dates: "Oct 5-10, 2025", status: "Registration Open", type: "sports" },
    { name: "Basketball Premier League", dates: "Nov 12-16, 2025", status: "Registration Open", type: "sports" },
    { name: "Annual Sports Meet", dates: "Dec 1-3, 2025", status: "Coming Soon", type: "sports" },
  ];

  const leaderboardData = [
    { rank: 1, team: "Phoenix Warriors", points: 450 },
    { rank: 2, team: "Titan Force", points: 420 },
    { rank: 3, team: "Thunderbolts", points: 380 },
    { rank: 4, team: "Eagle Strikers", points: 350 },
    { rank: 5, team: "Dragon Riders", points: 320 },
  ];

  const scheduleData = {
    mon: [
      { time: "8:00 AM", name: "Morning Yoga", instructor: "Priya S." },
      { time: "6:30 PM", name: "Zumba Fitness", instructor: "Anjali K." },
    ],
    tue: [
      { time: "7:00 AM", name: "Spin Class", instructor: "Vikram R." },
      { time: "6:00 PM", name: "Strength Training", instructor: "Rohan V." },
    ],
    wed: [
      { time: "8:00 AM", name: "Meditation", instructor: "Priya S." },
      { time: "7:00 PM", name: "Boxing Basics", instructor: "Vikram R." },
    ],
    thu: [
      { time: "7:00 AM", name: "CrossFit", instructor: "Rohan V." },
    ],
    fri: [
      { time: "6:30 PM", name: "Dance Aerobics", instructor: "Anjali K." },
    ],
  };

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  // --- Populate Sections ---
  const populateEvents = () => {
    const container = document.getElementById("events-grid-placeholder");
    if (!container) return;
    container.innerHTML = eventsData.map(e => `
      <div class="event-card">
        <div class="event-date">
          <span class="day">${e.day}</span>
          <span class="month">${months[e.month-1]}</span>
        </div>
        <div class="event-info">
          <h3>${e.name}</h3>
          <p><i class="fas fa-clock"></i> ${e.time}</p>
          <p><i class="fas fa-map-marker-alt"></i> ${e.location}</p>
          <button class="btn-register" data-modal-btn="${e.name}" data-modal-type="${e.type}">Register Now</button>
        </div>
      </div>
    `).join("");
  };

  const populateClubs = () => {
    const container = document.getElementById("clubs-grid-placeholder");
    if (!container) return;
    container.innerHTML = clubsData.map(c => `
      <div class="club-card" data-category="${c.category}">
        <div class="club-icon"><i class="${c.icon}"></i></div>
        <h3>${c.name}</h3>
        <p>${c.description}</p>
        <button class="btn-join" data-modal-btn="${c.name}" data-modal-type="${c.type}">Join Club</button>
      </div>
    `).join("");
  };

  const populateWorkshops = () => {
    const container = document.getElementById("workshops-grid-placeholder");
    if (!container) return;
    container.innerHTML = workshopsData.map(w => `
      <div class="workshop-card">
        <img src="${w.image}" alt="${w.name}">
        <h3>${w.name}</h3>
        <p>By ${w.expert}</p>
        <button class="btn-register" data-modal-btn="${w.name}" data-modal-type="${w.type}">Register</button>
      </div>
    `).join("");
  };

  const populateTournaments = () => {
    const container = document.getElementById("tournaments-list-placeholder");
    if (!container) return;
    container.innerHTML = tournamentsData.map(t => `
      <div class="tournament-item">
        <h4>${t.name}</h4>
        <p>${t.dates}</p>
        ${t.status === "Registration Open" ? 
          <button class="btn-register" data-modal-btn="${t.name}" data-modal-type="${t.type}">Register</button> : 
          <span class="status">${t.status}</span>}
      </div>
    `).join("");
  };

  const populateLeaderboard = () => {
    const body = document.getElementById("leaderboard-body");
    if (!body) return;
    body.innerHTML = leaderboardData.map(t => <tr><td>${t.rank}</td><td>${t.team}</td><td>${t.points}</td></tr>).join("");
  };

  const renderSchedule = (day) => {
    const container = document.getElementById("schedule-content");
    if (!container) return;
    const classes = scheduleData[day] || [];
    container.innerHTML = classes.length === 0 
      ? "<p>No classes scheduled for this day.</p>" 
      : classes.map(c => `
          <div class="class-item">
            <div class="class-details">
              <h4>${c.name}</h4>
              <p>Instructor: ${c.instructor}</p>
            </div>
            <div class="class-time">${c.time}</div>
          </div>
        `).join("");
  };

  populateEvents();
  populateClubs();
  populateWorkshops();
  populateTournaments();
  populateLeaderboard();
  renderSchedule("mon");

  // --- Clubs Filter ---
  document.querySelectorAll(".clubs-filter .filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".clubs-filter .filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.dataset.category;
      document.querySelectorAll(".club-card").forEach(card => {
        card.style.display = category === "all" || card.dataset.category === category ? "" : "none";
      });
    });
  });

  // --- Schedule Tabs ---
  document.querySelectorAll(".schedule-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".schedule-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      renderSchedule(tab.dataset.day);
    });
  });

  // --- Modal & Forms ---
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalBody = document.getElementById("modal-body");
  const closeBtn = document.querySelector(".close-btn");

  const createGeneralForm = (title) => `
    <form class="modal-form" data-event="${title}">
      <p>Register for <b>${title}</b></p>
      <label>Full Name <input type="text" name="name" required></label>
      <label>Email <input type="email" name="email" required></label>
      <button type="submit" class="btn-submit">Submit</button>
    </form>
    <div class="loading-spinner"></div><div class="form-feedback"></div>`;

  const createWorkshopForm = (title) => `
    <form class="modal-form" data-event="${title}">
      <p>Register for <b>${title}</b></p>
      <label>Full Name <input type="text" name="name" required></label>
      <label>Email <input type="email" name="email" required></label>
      <label>Experience Level
        <select name="experience" required>
          <option value="">Select</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
      </label>
      <button type="submit" class="btn-submit">Register</button>
    </form>
    <div class="loading-spinner"></div><div class="form-feedback"></div>`;

  const createSportsForm = (title) => `
    <form class="modal-form" data-event="${title}">
      <p>Register for <b>${title}</b></p>
      <label>Team Name <input type="text" name="teamName" required></label>
      <label>Captain Name <input type="text" name="captainName" required></label>
      <label>Number of Players <input type="number" name="players" min="1" required></label>
      <button type="submit" class="btn-submit">Submit Team</button>
    </form>
    <div class="loading-spinner"></div><div class="form-feedback"></div>`;

  const createCulturalFestForm = (title) => `
    <form class="modal-form" data-event="${title}">
      <p>Register for <b>${title}</b></p>
      <label>Full Name <input type="text" name="name" required></label>
      <label>Performance Type
        <select name="performance" required>
          <option value="">Select</option>
          <option>Dance</option>
          <option>Singing</option>
          <option>Drama</option>
          <option>Other</option>
        </select>
      </label>
      <button type="submit" class="btn-submit">Register</button>
    </form>
    <div class="loading-spinner"></div><div class="form-feedback"></div>`;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector(".btn-submit");
    const spinner = form.parentNode.querySelector(".loading-spinner");
    const feedback = form.parentNode.querySelector(".form-feedback");

    const formData = {
      event: form.dataset.event || "",
      name: form.querySelector('input[name="name"]')?.value || "",
      email: form.querySelector('input[name="email"]')?.value || "",
     experience: form.querySelector('select[name="experience"]')?.value || "",
  teamName: form.querySelector('input[name="teamName"]')?.value || "",
  captainName: form.querySelector('input[name="captainName"]')?.value || "",
  players: form.querySelector('input[name="players"]')?.value || "",
  performanceType: form.querySelector('select[name="performance"]')?.value || "",
  
    };

    const experienceSelect = form.querySelector('select[name="experience"]');
    if (experienceSelect) formData.experience = experienceSelect.value;

    const teamNameInput = form.querySelector('input[name="teamName"]');
    if (teamNameInput) formData.teamName = teamNameInput.value;

    const captainNameInput = form.querySelector('input[name="captainName"]');
    if (captainNameInput) formData.captainName = captainNameInput.value;

    const playersInput = form.querySelector('input[name="players"]');
    if (playersInput) formData.players = playersInput.value;

    const performanceSelect = form.querySelector('select[name="performance"]');
    if (performanceSelect) formData.performanceType = performanceSelect.value;

    btn.disabled = true;
    btn.textContent = "Submitting...";
    spinner.classList.add("is-visible");

    try {
      const res = await fetch("http://localhost:5000/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      spinner.classList.remove("is-visible");
      if (res.ok) {
        feedback.textContent = "🎉 Registration successful!";
        feedback.classList.add("success-message");
        form.style.display = "none";
      } else {
        feedback.textContent = "❌ Error: " + (data.error || "Failed to save");
        feedback.classList.add("error-message");
      }
    } catch (error) {
      spinner.classList.remove("is-visible");
      feedback.textContent = "⚠ Server not reachable!";
      feedback.classList.add("error-message");
    }

    btn.disabled = false;
    btn.textContent = "Submit";
  };


  const openModal = (title, type) => {
    modalTitle.textContent = title;
    if (type === "workshop") modalBody.innerHTML = createWorkshopForm(title);
    else if (type === "sports") modalBody.innerHTML = createSportsForm(title);
    else if (type === "cultural") modalBody.innerHTML = createCulturalFestForm(title);
    else modalBody.innerHTML = createGeneralForm(title);

    modal.classList.add("is-visible");
    const form = modalBody.querySelector("form");
    if (form) form.addEventListener("submit", handleFormSubmit);
  };

  const closeModal = () => { modal.classList.remove("is-visible"); modalBody.innerHTML = ""; };

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-modal-btn]");
    if (btn) openModal(btn.dataset.modalBtn, btn.dataset.modalType);
  });

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  window.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

});