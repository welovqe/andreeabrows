
emailjs.init("KP5xzzN1sr1Q6WHsq");

function getBookedSlots() {
  const data = localStorage.getItem('bookedSlots');
  return data ? JSON.parse(data) : [];
}

function addBookedSlot(dateKey, time) {
  const slots = getBookedSlots();
  slots.push(`${dateKey}_${time}`);
  localStorage.setItem('bookedSlots', JSON.stringify(slots));
}

function isSlotBooked(dateKey, time) {
  return getBookedSlots().includes(`${dateKey}_${time}`);
}

function dateToKey(date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

const categories = [
  {
    id: "gene",
    name: "Gene",
    services: [
      { name: "Laminarea genelor inferioare cu vopsire+botox", price: "100 lei", duration: "45 min" },
      { name: "Laminarea genelor cu vopsire și botox", price: "400 lei", duration: "1 h 15 min" },
      { name: "Vopsirea genelor fără laminare", price: "100 lei", duration: "30 min" }
    ]
  },
  {
    id: "combo",
    name: "Laminare Sprâncene&Gene",
    services: [
      { name: "Combo set (Laminarea genelor și sprâncenelor fără vopsire)", price: "650 lei", duration: "1 h 15 min" },
      { name: "Combo set (Laminarea genelor & stilizarea sprâncenelor cu vopsirea și corecția)", price: "650 lei", duration: "1 h 45 min" },
      { name: "Combo set (Laminarea genelor și sprâncenelor + vopsire)", price: "750 lei", duration: "1 h 45 min" }
    ]
  },
  {
    id: "micro",
    name: "Micropigmentare",
    services: [
      { name: "Consultarea înainte de procedura de micropigmentare", price: "Gratis", duration: "20 min" },
      { name: "Corecția micropigmentarea sprâncenelor (1-3 luni)", price: "1200 lei", duration: "2 h" },
      { name: "Micropigmentarea sprâncenelor", price: "2500 lei", duration: "2 h 30 min" },
      { name: "Refresh micropigmentarea sprâncenelor (10-18 luni)", price: "1800 lei", duration: "2 h" },
      { name: "Refresh micropigmentarea sprâncenelor (3-10 luni)", price: "1500 lei", duration: "2 h" }
    ]
  },
  {
    id: "stilizare",
    name: "Stilizare/laminare sprâncene",
    services: [
      { name: "Scoaterea mustața", price: "30 lei", duration: "10 min" },
      { name: "Corecția/rărirea sprâncenelor", price: "200 lei", duration: "30 min" },
      { name: "Decolorare chimică + mecanică a sprâncenelor", price: "250 lei", duration: "40 min" },
      { name: "Decolorare chimică + mecanică a sprâncenelor + vopsire", price: "350 lei", duration: "50 min" },
      { name: "Laminarea sprâncenelor și stilizare cu vopsire", price: "400 lei", duration: "1 h" },
      { name: "Laminarea sprâncenelor și stilizare fără vopsire", price: "300 lei", duration: "45 min" },
      { name: "Stilizarea și vopsirea sprâncenelor", price: "350 lei", duration: "45 min" }
    ]
  }
];

let activeCategory = categories[0].id;
let selectedService = null;
let selectedDate = null;
let selectedTime = null;

const MONTHS_RO = ["ian","feb","mar","apr","mai","iun","iul","aug","sep","oct","nov","dec"];
const DAYS_RO = ["Dum","Lun","Mar","Mie","Joi","Vin","Sâm"];


function renderTabs() {
  const container = document.getElementById('tabs-container');
  container.innerHTML = '';

  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'tab-btn' + (cat.id === activeCategory ? ' active' : '');
    btn.textContent = cat.name;
    btn.addEventListener('click', () => {
      activeCategory = cat.id;
      document.getElementById('search-input').value = '';
      renderTabs();
      renderServiceList();
    });
    container.appendChild(btn);
  });
}

function renderServiceList() {
  const list = document.getElementById('service-list');
  const searchTerm = document.getElementById('search-input').value.trim().toLowerCase();
  list.innerHTML = '';

  const categoriesToShow = searchTerm
    ? categories
    : categories.filter(cat => cat.id === activeCategory);

  categoriesToShow.forEach(cat => {
    const filteredServices = cat.services.filter(s =>
      s.name.toLowerCase().includes(searchTerm)
    );

    if (filteredServices.length === 0) return;

    if (searchTerm) {
      const heading = document.createElement('div');
      heading.className = 'category-heading';
      heading.textContent = cat.name;
      list.appendChild(heading);
    }

    filteredServices.forEach(service => {
      const item = document.createElement('div');
      item.className = 'service-item';
      item.innerHTML = `
        <div>
          <h4>${service.name}</h4>
          <div class="meta">${service.price} • ${service.duration}</div>
        </div>
        <button class="btn-select">Alege</button>
      `;
      item.querySelector('.btn-select').addEventListener('click', () => {
        selectedService = { ...service, category: cat.name };
        goToStep2();
      });
      list.appendChild(item);
    });
    filteredServices.forEach(service => {
      const item = document.createElement('div');
      item.className = 'service-item';
    })
  });
}

document.getElementById('search-input').addEventListener('input', renderServiceList);


const stepTitles = {
  1: "Alege serviciul",
  2: "Serviciu",
  3: "Dată și oră",
  4: "Datele tale",
  5: "Programare"
};

let currentStep = 1;

function showStep(step) {
  document.querySelectorAll('.wizard-step').forEach(el => el.classList.remove('active'));

  const target = document.getElementById('step-' + step);
  target.classList.remove('active');
  void target.offsetWidth;
  target.classList.add('active');

  document.getElementById('wizard-title').textContent = stepTitles[step];
  document.getElementById('back-btn').style.visibility = step === 1 ? 'hidden' : 'visible';
  currentStep = step;
}

function goBack() {
  if (currentStep > 1) showStep(currentStep - 1);
}

function goToStep2() {
  const detail = document.getElementById('service-detail');
  detail.innerHTML = `
    <div class="cat">${selectedService.category}</div>
    <h3>${selectedService.name}</h3>
    <div class="price-time">${selectedService.price} • ${selectedService.duration}</div>
  `;
  showStep(2);
}

function goToStep3() {
  renderDateStrip();
  renderTimeGrid();
  showStep(3);
}


function renderDateStrip() {
  const strip = document.getElementById('date-strip');
  strip.innerHTML = '';
  selectedDate = null;
  selectedTime = null;
  document.getElementById('confirm-date-btn').disabled = true;

  const today = new Date();

  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);

    const btn = document.createElement('div');
    btn.className = 'date-btn';
    btn.innerHTML = `
      <span class="day-name">${DAYS_RO[d.getDay()]}</span>
      <span class="day-num">${d.getDate()} ${MONTHS_RO[d.getMonth()]}</span>
    `;

    btn.addEventListener('click', () => {
      document.querySelectorAll('.date-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedDate = d;
      selectedTime = null;
      renderTimeGrid();
      updateConfirmState();
    });

    strip.appendChild(btn);
  }
}

function renderTimeGrid() {
  const grid = document.getElementById('time-grid');
  grid.innerHTML = '';

  if (!selectedDate) return;

  const slots = ["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"];
  const dateKey = dateToKey(selectedDate);

  slots.forEach(slot => {
    const btn = document.createElement('div');
    btn.className = 'time-btn';
    btn.textContent = slot;

    if (isSlotBooked(dateKey, slot)) {
      btn.classList.add('booked');
      btn.textContent = slot + ' (ocupat)';
    } else {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedTime = slot;
        updateConfirmState();
      });
    }

    grid.appendChild(btn);
  });
}

function updateConfirmState() {
  document.getElementById('confirm-date-btn').disabled = !(selectedDate && selectedTime);
}

function goToStep4() {
  const dateStr = `${selectedDate.getDate()} ${MONTHS_RO[selectedDate.getMonth()]}`;
  document.getElementById('booking-summary').innerHTML = `
    <div><b>Serviciu:</b> ${selectedService.name}</div>
    <div><b>Preț:</b> ${selectedService.price} (${selectedService.duration})</div>
    <div><b>Specialist:</b> Andrea Brows</div>
    <div><b>Data:</b> ${dateStr}, ora ${selectedTime}</div>
  `;
  showStep(4);
}


document.getElementById('booking-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('client-name').value.trim();
  const phone = document.getElementById('client-phone').value.trim();
  const dateStr = `${selectedDate.getDate()} ${MONTHS_RO[selectedDate.getMonth()]}`;

  const submitBtn = e.target.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Se trimite...';

  const templateParams = {
    client_name: name,
    client_phone: phone,
    service_name: selectedService.name,
    service_price: selectedService.price,
    booking_date: dateStr,
    booking_time: selectedTime
  };

  emailjs.send("service_tr85xev", "template_rxo2igr", templateParams)
    .then(function() {
      document.getElementById('final-message').textContent =
        `Mulțumim, ${name}! Te așteptăm pe ${dateStr}, ora ${selectedTime}, la procedura "${selectedService.name}".`;
      showStep(5);
    })
    .catch(function(error) {
      alert("A apărut o eroare la trimitere. Te rugăm să ne suni direct.");
      console.error(error);
    })
    .finally(function() {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Confirmă programarea';
    });
});

function resetWizard() {
  selectedService = null;
  selectedDate = null;
  selectedTime = null;
  document.getElementById('booking-form').reset();
  showStep(1);
}

function scrollToBooking() {
  document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
  showStep(1);
}
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));


renderTabs();
renderServiceList();
showStep(1);