// Mobile menu
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  burger.classList.toggle('is-active');
  burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    burger?.classList.remove('is-active');
  });
});

// Header accent on scroll
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  header.style.borderBottomColor = window.scrollY > 50
    ? 'rgba(184, 149, 74, 0.2)'
    : '';
}, { passive: true });

// Cursor glow (desktop only)
const cursorGlow = document.getElementById('cursorGlow');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (cursorGlow && window.matchMedia('(hover: hover)').matches && !prefersReducedMotion) {
  let glowX = 0;
  let glowY = 0;
  let targetX = 0;
  let targetY = 0;

  document.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  function animateGlow() {
    glowX += (targetX - glowX) * 0.08;
    glowY += (targetY - glowY) * 0.08;
    cursorGlow.style.left = `${glowX}px`;
    cursorGlow.style.top = `${glowY}px`;
    requestAnimationFrame(animateGlow);
  }

  animateGlow();
}

// Scroll reveal
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
);

document.querySelectorAll('.reveal, .section__header, .pricing__card, .author, .card').forEach((el) => {
  revealObserver.observe(el);
});

// Stagger cards
document.querySelectorAll('.card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
});

// Parallax on hero chips (desktop only)
if (!prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
  const heroSection = document.querySelector('.hero');
  const visual = document.querySelector('.hero__visual');
  const chips = document.querySelectorAll('.agent-chip');

  heroSection?.addEventListener('mousemove', (e) => {
    if (!visual) return;
    const rect = visual.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    chips.forEach((chip, i) => {
      const depth = (i + 1) * 6;
      chip.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
    });
  });

  heroSection?.addEventListener('mouseleave', () => {
    chips.forEach((chip) => {
      chip.style.transform = '';
    });
  });
}

// Magnetic buttons
document.querySelectorAll('.btn--magnetic').forEach((btn) => {
  if (!window.matchMedia('(hover: hover)').matches || prefersReducedMotion) return;

  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.2}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// FAQ: close others when one opens
document.querySelectorAll('.faq__item').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (item.open) {
      document.querySelectorAll('.faq__item').forEach((other) => {
        if (other !== item) other.open = false;
      });
    }
  });
});

// ─── Quiz ───
const quizResults = {
  content: {
    title: 'Контент-специалист с AI-командой',
    agents: ['SMM-стратег', 'Контент-планировщик', 'Копирайтер'],
    earn: 'Ведение контента экспертов — от 30 000 ₽/мес за клиента',
    desc: 'Вы сможете предлагать экспертам контент-планы, шаблоны постов и ведение соцсетей — всё на базе AI-агентов, которые создадите на курсе.',
    modules: ['Модуль 2 — AI-агенты для маркетинга', 'Модуль 7 — Упаковка и готовые решения', 'Модуль 8 — Монетизация'],
  },
  sales: {
    title: 'AI-продажник и генератор офферов',
    agents: ['AI-продажник', 'Генератор офферов', 'Обработчик возражений'],
    earn: 'Услуга «AI для продаж» — от 15 000 ₽ за проект',
    desc: 'Создайте агентов, которые пишут офферы, обрабатывают возражения и ведут переписку — и продавайте это бизнесу как готовое решение.',
    modules: ['Модуль 3 — AI-агенты для продаж', 'Модуль 0 — Поиск первых клиентов', 'Модуль 8 — Монетизация'],
  },
  expert: {
    title: 'AI-помощник для экспертного бизнеса',
    agents: ['Помощник коуча', 'Методолог', 'Создатель уроков'],
    earn: 'Внедрение AI в экспертный бизнес — от 25 000 ₽',
    desc: 'Эксперты платят за автоматизацию консультаций, создание уроков и методических материалов. Вы станете тем, кто это настраивает.',
    modules: ['Модуль 4 — AI-агенты для экспертов', 'Модуль 7 — Упаковка и готовые решения', 'Модуль 8 — Монетизация'],
  },
  ops: {
    title: 'Личная AI-команда и автоматизация',
    agents: ['Личный ассистент', 'Планировщик дня', 'AI-продажник'],
    earn: 'Экономия 15+ часов в неделю — или услуга автоматизации от 20 000 ₽',
    desc: 'Сначала автоматизируете себя, затем упакуете опыт в услугу для других предпринимателей и фрилансеров.',
    modules: ['Модуль 5 — Личные AI-агенты', 'Модуль 1 — Фундамент AI-агентов', 'Модуль 8 — Монетизация'],
  },
  creative: {
    title: 'AI для творческих профессий',
    agents: ['Помощник блогера', 'Генератор идей', 'Контент-редактор'],
    earn: 'Контент-пакеты для блогеров — от 20 000 ₽/мес',
    desc: 'Блогеры и авторы ищут тех, кто возьмёт на себя идеи, сценарии и редактуру. AI-агенты делают это в разы быстрее.',
    modules: ['Модуль 6 — AI-агенты для творческих профессий', 'Модуль 2 — AI-агенты для маркетинга', 'Модуль 8 — Монетизация'],
  },
  hybrid: {
    title: 'Универсальный AI-специалист',
    agents: ['SMM-стратег', 'AI-продажник', 'Универсальный конструктор'],
    earn: '3 услуги × 15 000 ₽ = 45 000 ₽ потенциала в месяц',
    desc: 'Комбинируйте контент, продажи и автоматизацию — на курсе вы получите более 50 готовых схем под любой запрос клиента.',
    modules: ['Модули 0–8 — полная программа', '50+ готовых AI-агентов', 'Бонус: агент по продаже агентов'],
  },
};

(function initQuiz() {
  const app = document.getElementById('quizApp');
  if (!app) return;

  const steps = app.querySelectorAll('.quiz__step');
  const resultEl = document.getElementById('quizResult');
  const progressBar = document.getElementById('quizProgress');
  const progressText = document.getElementById('quizProgressText');
  const answers = {};
  let currentStep = 0;
  const totalSteps = steps.length;

  function setProgress(step) {
    const pct = ((step + 1) / totalSteps) * 100;
    progressBar.style.setProperty('--progress', `${pct}%`);
    progressText.textContent = step < totalSteps ? `${step + 1} / ${totalSteps}` : '✓';
  }

  function showStep(index) {
    steps.forEach((s, i) => {
      s.classList.toggle('quiz__step--active', i === index);
    });
    setProgress(index);
  }

  function resolveResult() {
    const { role, goal, task, time } = answers;
    const scores = { content: 0, sales: 0, expert: 0, ops: 0, creative: 0 };

    if (task === 'content') scores.content += 3;
    if (task === 'sales') scores.sales += 3;
    if (task === 'expert') scores.expert += 3;
    if (task === 'ops') scores.ops += 3;

    if (role === 'marketer') scores.content += 2;
    if (role === 'freelancer') scores.sales += 1;
    if (role === 'expert') scores.expert += 2;
    if (role === 'creative') scores.creative += 3;
    if (role === 'business') scores.ops += 2;

    if (goal === 'earn' || goal === 'sell') scores.sales += 1;
    if (goal === 'automate') scores.ops += 2;
    if (goal === 'both') { scores.content += 1; scores.sales += 1; }

    if (time === 'intense') scores.sales += 1;

    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const top = sorted[0][1];
    const second = sorted[1][1];

    if (top === second || goal === 'both') return quizResults.hybrid;
    return quizResults[sorted[0][0]] || quizResults.hybrid;
  }

  function showResult() {
    const data = resolveResult();

    document.getElementById('resultTitle').textContent = data.title;
    document.getElementById('resultAgents').innerHTML = data.agents
      .map((a) => `<span>${a}</span>`).join('');
    document.getElementById('resultEarn').textContent = data.earn;
    document.getElementById('resultDesc').textContent = data.desc;
    document.getElementById('resultModules').innerHTML = data.modules
      .map((m) => `<li>${m}</li>`).join('');

    steps.forEach((s) => s.classList.remove('quiz__step--active'));
    resultEl.hidden = false;
    progressBar.style.setProperty('--progress', '100%');
    progressText.textContent = '✓';
    resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  app.querySelectorAll('.quiz__option').forEach((btn) => {
    btn.addEventListener('click', () => {
      const q = btn.dataset.q;
      const v = btn.dataset.v;
      answers[q] = v;

      btn.closest('.quiz__options')?.querySelectorAll('.quiz__option')
        .forEach((o) => o.classList.remove('quiz__option--selected'));
      btn.classList.add('quiz__option--selected');

      setTimeout(() => {
        currentStep += 1;
        if (currentStep < totalSteps) {
          showStep(currentStep);
        } else {
          showResult();
        }
      }, 280);
    });
  });

  document.getElementById('quizRestart')?.addEventListener('click', () => {
    Object.keys(answers).forEach((k) => delete answers[k]);
    currentStep = 0;
    resultEl.hidden = true;
    app.querySelectorAll('.quiz__option--selected').forEach((o) => {
      o.classList.remove('quiz__option--selected');
    });
    showStep(0);
  });

  setProgress(0);
})();

// ─── Calculator ───
(function initCalculator() {
  const hoursInput = document.getElementById('calcHours');
  const rateInput = document.getElementById('calcRate');
  const checkboxes = document.querySelectorAll('.calc-task input');
  if (!hoursInput || !rateInput) return;

  const COURSE_PRICE = 45000;
  const INSTALLMENT_MONTHLY = 3750;

  function formatNum(n) {
    return n.toLocaleString('ru-RU');
  }

  function update() {
    let hours = Number(hoursInput.value);
    const rate = Number(rateInput.value);
    const checked = [...checkboxes].filter((c) => c.checked).length;

    if (checked > 0 && checked < 4) {
      hours = Math.round(hours * (0.6 + checked * 0.1));
    }

    const monthlyHours = hours * 4;
    const lost = monthlyHours * rate;
    const weeklyValue = hours * rate;
    const paybackWeeks = weeklyValue > 0 ? Math.max(1, Math.ceil(COURSE_PRICE / weeklyValue)) : 99;

    document.getElementById('calcHoursOut').textContent = `${hours} ч`;
    document.getElementById('calcRateOut').textContent = `${formatNum(rate)} ₽`;
    document.getElementById('calcMonthlyHours').textContent = `${monthlyHours} ч`;
    document.getElementById('calcLost').textContent = `${formatNum(lost)} ₽`;
    document.getElementById('calcLostShort').textContent = `${formatNum(lost)} ₽`;

    const paybackEl = document.getElementById('calcPayback');
    if (paybackWeeks >= 8) {
      paybackEl.textContent = `${Math.ceil(paybackWeeks / 4)} мес.`;
    } else {
      paybackEl.textContent = `${paybackWeeks} нед.`;
    }

    const ctaBtn = document.querySelector('#calcApp .btn--magnetic');
    if (ctaBtn) {
      ctaBtn.textContent = paybackWeeks <= 4
        ? `Окупить за ${paybackWeeks} нед. — записаться`
        : 'Записаться на курс — 45 000 ₽';
    }
  }

  hoursInput.addEventListener('input', update);
  rateInput.addEventListener('input', update);
  checkboxes.forEach((cb) => cb.addEventListener('change', update));
  update();
})();

// Observe quiz & calc for reveal
document.querySelectorAll('.quiz, .calc-panel').forEach((el) => {
  revealObserver.observe(el);
});

// ─── Contact modal ───
(function initContactModal() {
  const modal = document.getElementById('contactModal');
  const form = document.getElementById('contactForm');
  const formWrap = document.getElementById('contactFormWrap');
  const successEl = document.getElementById('contactSuccess');
  const submitBtn = document.getElementById('contactSubmit');
  if (!modal || !form) return;

  const FORM_EMAIL = 'galileya2008@yandex.ru';

  function openModal() {
    modal.removeAttribute('hidden');
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    nav?.classList.remove('is-open');
    burger?.classList.remove('is-active');
    const firstInput = form.querySelector('input:not([type="checkbox"])');
    setTimeout(() => firstInput?.focus(), 150);
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('hidden', '');
    document.body.classList.remove('modal-open');
  }

  function resetModal() {
    form.reset();
    formWrap.hidden = false;
    successEl.hidden = true;
    form.querySelectorAll('.is-invalid').forEach((el) => el.classList.remove('is-invalid'));
    form.querySelectorAll('[data-error]').forEach((el) => { el.textContent = ''; });
    submitBtn.disabled = false;
    submitBtn.textContent = 'Отправить';
  }

  document.getElementById('openContact')?.addEventListener('click', openModal);
  document.getElementById('openContactFooter')?.addEventListener('click', openModal);
  document.getElementById('openContactNav')?.addEventListener('click', openModal);

  modal.querySelectorAll('[data-close-modal]').forEach((el) => {
    el.addEventListener('click', () => {
      closeModal();
      setTimeout(resetModal, 400);
    });
  });

  document.getElementById('closeContact')?.addEventListener('click', () => {
    closeModal();
    setTimeout(resetModal, 400);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
      setTimeout(resetModal, 400);
    }
  });

  function setError(field, message) {
    const input = form.querySelector(`[name="${field}"]`);
    const errorEl = form.querySelector(`[data-error="${field}"]`);
    if (input) input.classList.toggle('is-invalid', Boolean(message));
    if (errorEl) errorEl.textContent = message || '';
  }

  function validatePhone(phone) {
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 10;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const consent = form.consent.checked;

    let valid = true;

    if (!name) { setError('name', 'Введите имя'); valid = false; }
    else setError('name', '');

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('email', 'Введите корректный email');
      valid = false;
    } else setError('email', '');

    if (!validatePhone(phone)) {
      setError('phone', 'Введите номер телефона');
      valid = false;
    } else setError('phone', '');

    if (!consent) {
      setError('consent', 'Необходимо согласие на обработку данных');
      valid = false;
    } else setError('consent', '');

    if (!valid) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправка…';

    const body = new FormData();
    body.append('name', name);
    body.append('email', email);
    body.append('phone', phone);
    body.append('_subject', 'Заявка с лендинга ИИ-агенты');
    body.append('_template', 'table');
    body.append('_captcha', 'false');

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${FORM_EMAIL}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body,
      });

      if (!res.ok) throw new Error('submit failed');

      formWrap.hidden = true;
      successEl.hidden = false;
    } catch {
      setError('email', 'Не удалось отправить. Напишите на galileya2008@yandex.ru');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Отправить';
    }
  });
})();

// ─── Cookie banner ───
(function initCookieBanner() {
  const banner = document.getElementById('cookieBanner');
  const acceptBtn = document.getElementById('cookieAccept');
  if (!banner || !acceptBtn) return;

  const STORAGE_KEY = 'cookieConsentAccepted';

  function hideBanner() {
    banner.classList.remove('is-visible');
    banner.setAttribute('aria-hidden', 'true');
  }

  function acceptCookies() {
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      /* localStorage unavailable */
    }
    hideBanner();
  }

  if (localStorage.getItem(STORAGE_KEY) === 'true') {
    hideBanner();
    return;
  }

  requestAnimationFrame(() => {
    banner.classList.add('is-visible');
    banner.setAttribute('aria-hidden', 'false');
  });

  acceptBtn.addEventListener('click', acceptCookies);
})();
