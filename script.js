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


let currentLang = localStorage.getItem('site-lang') || 'ro';

const categoriesData = {
  ro: [
    {
      id: "gene", name: "Gene",
      services: [
        { name: "Laminarea genelor inferioare cu vopsire+botox", price: "100 lei", duration: "45 min" },
        { name: "Laminarea genelor cu vopsire și botox", price: "400 lei", duration: "1 h 15 min" },
        { name: "Vopsirea genelor fără laminare", price: "100 lei", duration: "30 min" }
      ]
    },
    {
      id: "combo", name: "Laminare Sprâncene&Gene",
      services: [
        { name: "Combo set (Laminarea genelor și sprâncenelor fără vopsire)", price: "650 lei", duration: "1 h 15 min" },
        { name: "Combo set (Laminarea genelor & stilizarea sprâncenelor cu vopsirea și corecția)", price: "650 lei", duration: "1 h 45 min" },
        { name: "Combo set (Laminarea genelor și sprâncenelor + vopsire)", price: "750 lei", duration: "1 h 45 min" }
      ]
    },
    {
      id: "micro", name: "Micropigmentare",
      services: [
        { name: "Consultarea înainte de procedura de micropigmentare", price: "Gratis", duration: "20 min" },
        { name: "Corecția micropigmentarea sprâncenelor (1-3 luni)", price: "1200 lei", duration: "2 h" },
        { name: "Micropigmentarea sprâncenelor", price: "2500 lei", duration: "2 h 30 min" },
        { name: "Refresh micropigmentarea sprâncenelor (10-18 luni)", price: "1800 lei", duration: "2 h" },
        { name: "Refresh micropigmentarea sprâncenelor (3-10 luni)", price: "1500 lei", duration: "2 h" }
      ]
    },
    {
      id: "stilizare", name: "Stilizare/laminare sprâncene",
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
  ],
  ru: [
    {
      id: "gene", name: "Ресницы",
      services: [
        { name: "Ламинирование нижних ресниц с окрашиванием+ботокс", price: "100 lei", duration: "45 min" },
        { name: "Ламинирование ресниц с окрашиванием и ботоксом", price: "400 lei", duration: "1 ч 15 мин" },
        { name: "Окрашивание ресниц без ламинирования", price: "100 lei", duration: "30 min" }
      ]
    },
    {
      id: "combo", name: "Ламинирование бровей и ресниц",
      services: [
        { name: "Комбо (ламинирование ресниц и бровей без окрашивания)", price: "650 lei", duration: "1 ч 15 мин" },
        { name: "Комбо (ламинирование ресниц и укладка бровей с окрашиванием и коррекцией)", price: "650 lei", duration: "1 ч 45 мин" },
        { name: "Комбо (ламинирование ресниц и бровей + окрашивание)", price: "750 lei", duration: "1 ч 45 мин" }
      ]
    },
    {
      id: "micro", name: "Микропигментация",
      services: [
        { name: "Консультация перед микропигментацией", price: "Бесплатно", duration: "20 min" },
        { name: "Коррекция микропигментации бровей (1-3 месяца)", price: "1200 lei", duration: "2 ч" },
        { name: "Микропигментация бровей", price: "2500 lei", duration: "2 ч 30 мин" },
        { name: "Обновление микропигментации (10-18 месяцев)", price: "1800 lei", duration: "2 ч" },
        { name: "Обновление микропигментации (3-10 месяцев)", price: "1500 lei", duration: "2 ч" }
      ]
    },
    {
      id: "stilizare", name: "Укладка/ламинирование бровей",
      services: [
        { name: "Удаление усиков", price: "30 lei", duration: "10 min" },
        { name: "Коррекция/прореживание бровей", price: "200 lei", duration: "30 min" },
        { name: "Химическое + механическое осветление бровей", price: "250 lei", duration: "40 min" },
        { name: "Осветление бровей + окрашивание", price: "350 lei", duration: "50 min" },
        { name: "Ламинирование бровей и укладка с окрашиванием", price: "400 lei", duration: "1 ч" },
        { name: "Ламинирование бровей и укладка без окрашивания", price: "300 lei", duration: "45 min" },
        { name: "Укладка и окрашивание бровей", price: "350 lei", duration: "45 min" }
      ]
    }
  ],
  en: [
    {
      id: "gene", name: "Lashes",
      services: [
        { name: "Lower lash lamination with tint+botox", price: "100 lei", duration: "45 min" },
        { name: "Lash lamination with tint and botox", price: "400 lei", duration: "1 h 15 min" },
        { name: "Lash tint without lamination", price: "100 lei", duration: "30 min" }
      ]
    },
    {
      id: "combo", name: "Brow & Lash Lamination",
      services: [
        { name: "Combo set (lash & brow lamination, no tint)", price: "650 lei", duration: "1 h 15 min" },
        { name: "Combo set (lash lamination & brow styling with tint and shaping)", price: "650 lei", duration: "1 h 45 min" },
        { name: "Combo set (lash & brow lamination + tint)", price: "750 lei", duration: "1 h 45 min" }
      ]
    },
    {
      id: "micro", name: "Micropigmentation",
      services: [
        { name: "Consultation before micropigmentation", price: "Free", duration: "20 min" },
        { name: "Brow micropigmentation touch-up (1-3 months)", price: "1200 lei", duration: "2 h" },
        { name: "Brow micropigmentation", price: "2500 lei", duration: "2 h 30 min" },
        { name: "Micropigmentation refresh (10-18 months)", price: "1800 lei", duration: "2 h" },
        { name: "Micropigmentation refresh (3-10 months)", price: "1500 lei", duration: "2 h" }
      ]
    },
    {
      id: "stilizare", name: "Brow Styling/Lamination",
      services: [
        { name: "Upper lip hair removal", price: "30 lei", duration: "10 min" },
        { name: "Brow correction/thinning", price: "200 lei", duration: "30 min" },
        { name: "Chemical + mechanical brow bleaching", price: "250 lei", duration: "40 min" },
        { name: "Brow bleaching + tint", price: "350 lei", duration: "50 min" },
        { name: "Brow lamination and styling with tint", price: "400 lei", duration: "1 h" },
        { name: "Brow lamination and styling without tint", price: "300 lei", duration: "45 min" },
        { name: "Brow styling and tint", price: "350 lei", duration: "45 min" }
      ]
    }
  ]
};

const MONTHS = {
  ro: ["ian","feb","mar","apr","mai","iun","iul","aug","sep","oct","nov","dec"],
  ru: ["янв","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек"],
  en: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
};

const DAYS = {
  ro: ["Dum","Lun","Mar","Mie","Joi","Vin","Sâm"],
  ru: ["Вс","Пн","Вт","Ср","Чт","Пт","Сб"],
  en: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
};

const UI = {
  ro: {
    address: "Chișinău, Botanica, str Sarmizegetusa 18",
    book_now: "Programează-te",
    hero_title: "Sprâncene și gene perfecte",
    hero_sub: "Micropigmentare, laminare, corecție și stilizare",
    master_name: "Andrea Brows",
    master_role: "Specialist sprâncene & gene",
    master_bio: "Meșter în sprâncene cu experiența de 4 ani🌸 datorită mie o să dormi dimineața cu 20 minute. Laminarea genelor și sprâncenelor într-o oră. Fără sprâncene groase și negre‼️ Activez într-un cabinet cu atmosferă plăcută și locație accesibilă✨",
    search_service: "Caută un serviciu...",
    schedule_title: "Program",
    schedule_days: "Luni - Sâmbătă: 8:00 - 21:00",
    schedule_off: "Duminică: Zi liberă",
    contacts_title: "Contacte",
    footer_desc: "Studio specializat în sprâncene și gene din Chișinău. Te așteptăm cu drag!",
    choose_btn: "Alege",
    booked_label: "(ocupat)",
    continue_btn: "Continuă",
    name_placeholder: "Numele Prenumele",
    phone_placeholder: "Numărul de telefon",
    confirm_btn: "Confirmă programarea",
    sending: "Se trimite...",
    success_title: "Programare confirmată!",
    new_booking_btn: "Fă o nouă programare",
    error_msg: "A apărut o eroare la trimitere. Te rugăm să ne suni direct.",
    thank_you: (name, date, time, service) => `Mulțumim, ${name}! Te așteptăm pe ${date}, ora ${time}, la procedura "${service}".`,
    summary_service: "Serviciu:",
    summary_price: "Preț:",
    summary_specialist: "Specialist:",
    summary_date: "Data:",
    specialist_title: "Specialist pentru programare",
    steps: { 1: "Alege serviciul", 2: "Serviciu", 3: "Dată și oră", 4: "Datele tale", 5: "Programare" }
  },
  ru: {
    address: "Кишинёв, Ботаника, ул. Сармизегетуза 18",
    book_now: "Записаться",
    hero_title: "Идеальные брови и ресницы",
    hero_sub: "Микропигментация, ламинирование, коррекция и укладка",
    master_name: "Andrea Brows",
    master_role: "Специалист по бровям и ресницам",
    master_bio: "Мастер бровей с опытом 4 года🌸 благодаря мне вы сможете поспать утром на 20 минут дольше. Ламинирование ресниц и бровей за один час. Никаких густых и тёмных бровей‼️ Работаю в уютном кабинете с удобным расположением✨",
    search_service: "Найти услугу...",
    schedule_title: "График работы",
    schedule_days: "Понедельник - Суббота: 8:00 - 21:00",
    schedule_off: "Воскресенье: выходной",
    contacts_title: "Контакты",
    footer_desc: "Студия бровей и ресниц в Кишинёве. Будем рады видеть вас!",
    choose_btn: "Выбрать",
    booked_label: "(занято)",
    continue_btn: "Продолжить",
    name_placeholder: "Имя Фамилия",
    phone_placeholder: "Номер телефона",
    confirm_btn: "Подтвердить запись",
    sending: "Отправка...",
    success_title: "Запись подтверждена!",
    new_booking_btn: "Записаться ещё раз",
    error_msg: "Произошла ошибка при отправке. Пожалуйста, позвоните нам напрямую.",
    thank_you: (name, date, time, service) => `Спасибо, ${name}! Ждём вас ${date}, в ${time}, на процедуру "${service}".`,
    summary_service: "Услуга:",
    summary_price: "Цена:",
    summary_specialist: "Специалист:",
    summary_date: "Дата:",
    specialist_title: "Специалист для записи",
    steps: { 1: "Выберите услугу", 2: "Услуга", 3: "Дата и время", 4: "Ваши данные", 5: "Запись" }
  },
  en: {
    address: "Chișinău, Botanica, Sarmizegetusa St. 18",
    book_now: "Book Now",
    hero_title: "Perfect Brows & Lashes",
    hero_sub: "Micropigmentation, lamination, correction and styling",
    master_name: "Andrea Brows",
    master_role: "Brows & Lashes Specialist",
    master_bio: "Brow master with 4 years of experience🌸 thanks to me you'll sleep in 20 extra minutes. Lash and brow lamination in one hour. No thick, dark brows‼️ I work in a cozy studio with a convenient location✨",
    search_service: "Search a service...",
    schedule_title: "Schedule",
    schedule_days: "Monday - Saturday: 8:00 - 21:00",
    schedule_off: "Sunday: Closed",
    contacts_title: "Contacts",
    footer_desc: "Brow & lash studio in Chișinău. We look forward to seeing you!",
    choose_btn: "Choose",
    booked_label: "(booked)",
    continue_btn: "Continue",
    name_placeholder: "Full Name",
    phone_placeholder: "Phone Number",
    confirm_btn: "Confirm Booking",
    sending: "Sending...",
    success_title: "Booking Confirmed!",
    new_booking_btn: "Make a New Booking",
    error_msg: "An error occurred while sending. Please call us directly.",
    thank_you: (name, date, time, service) => `Thank you, ${name}! We'll see you on ${date} at ${time} for "${service}".`,
    summary_service: "Service:",
    summary_price: "Price:",
    summary_specialist: "Specialist:",
    summary_date: "Date:",
    specialist_title: "Booking specialist",
    steps: { 1: "Choose a service", 2: "Service", 3: "Date & time", 4: "Your details", 5: "Booking" }
  }
};

let categories = categoriesData[currentLang];
let activeCategory = categories[0].id;
let selectedService = null;
let selectedDate = null;
let selectedTime = null;
let currentStep = 1;

function t() { return UI[currentLang]; }


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

  const categoriesToShow = searchTerm ? categories : categories.filter(cat => cat.id === activeCategory);

  categoriesToShow.forEach(cat => {
    const filteredServices = cat.services.filter(s => s.name.toLowerCase().includes(searchTerm));
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
        <button class="btn-select">${t().choose_btn}</button>
      `;
      item.querySelector('.btn-select').addEventListener('click', () => {
        selectedService = { ...service, category: cat.name };
        goToStep2();
      });
      list.appendChild(item);
    });
  });
}

document.getElementById('search-input').addEventListener('input', renderServiceList);

function showStep(step) {
  document.querySelectorAll('.wizard-step').forEach(el => el.classList.remove('active'));
  const target = document.getElementById('step-' + step);
  target.classList.remove('active');
  void target.offsetWidth;
  target.classList.add('active');
  document.getElementById('wizard-title').textContent = t().steps[step];
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
  document.querySelector('.specialist-title').textContent = t().specialist_title;
  document.querySelector('#step-2 .btn-select').textContent = t().choose_btn;
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
      <span class="day-name">${DAYS[currentLang][d.getDay()]}</span>
      <span class="day-num">${d.getDate()} ${MONTHS[currentLang][d.getMonth()]}</span>
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
      btn.textContent = slot + ' ' + t().booked_label;
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
  const dateStr = `${selectedDate.getDate()} ${MONTHS[currentLang][selectedDate.getMonth()]}`;
  document.getElementById('booking-summary').innerHTML = `
    <div><b>${t().summary_service}</b> ${selectedService.name}</div>
    <div><b>${t().summary_price}</b> ${selectedService.price} (${selectedService.duration})</div>
    <div><b>${t().summary_specialist}</b> Andrea Brows</div>
    <div><b>${t().summary_date}</b> ${dateStr}, ${selectedTime}</div>
  `;
  showStep(4);
}

document.getElementById('booking-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('client-name').value.trim();
  const phone = document.getElementById('client-phone').value.trim();
  const dateStr = `${selectedDate.getDate()} ${MONTHS[currentLang][selectedDate.getMonth()]}`;

  const submitBtn = e.target.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = t().sending;

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
        t().thank_you(name, dateStr, selectedTime, selectedService.name);
      document.querySelector('.success-box h3').textContent = t().success_title;
      document.querySelector('.success-box .btn-select').textContent = t().new_booking_btn;
      showStep(5);
    })
    .catch(function(error) {
      alert(t().error_msg);
      console.error(error);
    })
    .finally(function() {
      submitBtn.disabled = false;
      submitBtn.textContent = t().confirm_btn;
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

function applyStaticTexts() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t()[key]) el.textContent = t()[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t()[key]) el.placeholder = t()[key];
  });
  document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang-btn') === currentLang);
  });
  document.getElementById('confirm-date-btn').textContent = t().continue_btn;
  document.getElementById('client-name').placeholder = t().name_placeholder;
  document.getElementById('client-phone').placeholder = t().phone_placeholder;
  document.querySelector('#booking-form button[type="submit"]').innerHTML =
    `<i class="fa-solid fa-calendar-check"></i> ${t().confirm_btn}`;
  document.documentElement.lang = currentLang;
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('site-lang', lang);
  categories = categoriesData[lang];
  activeCategory = categories[0].id;

  applyStaticTexts();
  renderTabs();
  renderServiceList();
  showStep(currentStep);
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

applyStaticTexts();
renderTabs();
renderServiceList();
showStep(1);