(() => {
  'use strict';
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const brl = n => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 });

  /* ---------- Dados dos Produtos ---------- */
  const PROFILES = {
    gamer: {
      name: 'Setup Gamer',
      items: [
        { id: 'g1', icon: '🖥️', name: 'Monitor 144 Hz, 27 polegadas', note: 'Painel rápido, 24" a 27"', price: 701.10, link: 'https://meli.la/26cHgkG' },
        { id: 'g2', icon: '⌨️', name: 'Teclado mecânico', note: 'Switches responsivos', price: 198.09, link: 'https://meli.la/2zRvcgV' },
        { id: 'g3', icon: '🖱️', name: 'Mouse gamer leve', note: 'Sensor preciso', price: 190.00, link: 'https://meli.la/1Ujc3hM' },
        { id: 'g4', icon: '🎧', name: 'Headset com microfone', note: 'Som posicional e conforto', price: 239.00, link: 'https://meli.la/2CG9oX9' },
        { id: 'g5', icon: '🎮', name: 'Controle sem fio', note: 'Compatível com PC', price: 199.00, link: 'https://meli.la/2rZsmZY' },
        { id: 'g6', icon: '🟪', name: 'Mousepad grande', note: 'Cobre teclado e mouse', price: 49.90, link: 'https://meli.la/1StU1y3' },
        { id: 'g7', icon: '💡', name: 'Iluminação RGB', note: 'Fita de LED ou barra', price: 43.07, link: 'https://meli.la/1LPdqaM' },
        { id: 'g8', icon: '🪑', name: 'Cadeira gamer ergonômica', note: 'Apoio lombar ajustável', price: 1062.15, link: 'https://meli.la/2oy4ZDo' }
      ]
    },
    criativo: {
      name: 'Setup Criativo',
      items: [
        { id: 'c1', icon: '🖥️', name: 'Monitor com boa cobertura sRGB', note: 'Painel IPS calibrável', price: 1193.00, link: 'https://meli.la/2xp96Ph' },
        { id: 'c2', icon: '💻', name: 'Notebook ou PC com 16 GB RAM', note: 'Para edição e design', price: 5399.90, link: 'https://meli.la/1sFWZFU' },
        { id: 'c3', icon: '✏️', name: 'Mesa digitalizadora', note: 'Caneta com sensibilidade', price: 341.90, link: 'https://meli.la/13KfPsh' },
        { id: 'c4', icon: '📷', name: 'Webcam Full HD', note: 'Fotos e conteúdo', price: 469.90, link: 'https://meli.la/2eDCuQK' },
        { id: 'c5', icon: '💽', name: 'SSD externo 1 TB', note: 'Backup dos projetos', price: 1089.28, link: 'https://meli.la/1KMpnZE' },
        { id: 'c6', icon: '🎙️', name: 'Microfone USB', note: 'Narração e vídeo', price: 284.99, link: 'https://meli.la/33PqxmG' },
        { id: 'c7', icon: '🪴', name: 'Organização e decoração', note: 'Suportes, plantas, bandejas', price: 38.29, link: 'https://meli.la/32xKdkA' },
        { id: 'c8', icon: '💡', name: 'Luminária de mesa', note: 'Luz neutra e regulável', price: 162.90, link: 'https://meli.la/1ywgCFh' }
      ]
    },
    dev: {
      name: 'Setup Programador',
      items: [
        { id: 'd1', icon: '🖥️', name: 'Monitor 27" (QHD ou 4K)', note: 'Texto nítido, mais espaço', price: 1529.40, link: 'https://meli.la/25TJaCX' },
        { id: 'd2', icon: '🖥️', name: 'Segundo monitor', note: 'Docs, terminal e testes', price: 554.52, link: 'https://meli.la/1ZRSjUC' },
        { id: 'd3', icon: '⌨️', name: 'Teclado confortável', note: 'Mecânico ou low profile', price: 135.50, link: 'https://meli.la/1xCJGxB' },
        { id: 'd4', icon: '🖱️', name: 'Mouse ergonômico', note: 'Menos desconforto no pulso', price: 139.00, link: 'https://meli.la/23cY8FV' },
        { id: 'd5', icon: '🪑', name: 'Cadeira ergonômica', note: 'Ajuste de altura e lombar', price: 1062.15, link: 'https://meli.la/2oy4ZDo' },
        { id: 'd6', icon: '🎧', name: 'Fone com cancelamento de ruído', note: 'Foco e reuniões', price: 268.75, link: 'https://meli.la/1kH6YPH' },
        { id: 'd7', icon: '📐', name: 'Suporte articulado de monitor', note: 'Altura certa dos olhos', price: 179.82, link: 'https://meli.la/2uSudSY' },
        { id: 'd8', icon: '🔌', name: 'Hub USB-C / dock', note: 'Conecta tudo com um cabo', price: 63.99, link: 'https://meli.la/1x3XaoV' }
      ]
    }
  };

  /* ---------- QUIZ LOGIC ---------- */
  const quizData = [
    {
      q: 'O que você mais faz no computador?',
      opts: [
        { i: '🎮', t: 'Jogar', d: 'Jogos competitivos e casuais', v: 'gamer' },
        { i: '🎨', t: 'Criar', d: 'Design, vídeo, foto, ilustração', v: 'criativo' },
        { i: '💻', t: 'Programar', d: 'Desenvolvimento e estudos', v: 'dev' },
        { i: '⚖️', t: 'Um pouco de tudo', d: 'Uso variado no dia a dia', v: 'dev' }
      ]
    },
    {
      q: 'Quanto tempo você passa no setup por dia?',
      opts: [
        { i: '⏱️', t: 'Até 3 horas', d: 'Uso moderado', v: '1' },
        { i: '🕝', t: 'De 4 a 7 horas', d: 'Bastante tempo', v: '2' },
        { i: '🌙', t: 'Mais de 8 horas', d: 'Quase o dia todo', v: '3' }
      ]
    },
    {
      q: 'O que é mais importante para você?',
      opts: [
        { i: '⚡', t: 'Desempenho e velocidade', d: 'Quanto mais rápido, melhor', v: 'gamer' },
        { i: '🌈', t: 'Qualidade de imagem', d: 'Cores e detalhes fiéis', v: 'criativo' },
        { i: '🧘', t: 'Conforto e foco', d: 'Ergonomia e produtividade', v: 'dev' }
      ]
    }
  ];

  let currentStep = 0;
  let answers = [];
  const quizContent = $('#quizContent');
  const quizProgress = $('#quizProgress');

  const renderQuiz = () => {
    if (currentStep >= quizData.length) {
      finishQuiz();
      return;
    }
    const q = quizData[currentStep];
    quizProgress.style.width = `${((currentStep + 1) / quizData.length) * 100}%`;
    
    let html = `<div class="quiz-question">${q.q}</div><div class="quiz-options">`;
    q.opts.forEach((o, idx) => {
      html += `<button class="quiz-opt" data-val="${o.v}">
        <span class="quiz-opt-icon">${o.i}</span>
        <div class="quiz-opt-text"><h4>${o.t}</h4><p>${o.d}</p></div>
      </button>`;
    });
    html += `</div><div class="quiz-footer">`;
    if (currentStep > 0) {
      html += `<button class="btn-back" id="quizBack">Voltar</button>`;
    } else {
      html += `<div></div>`;
    }
    html += `<span class="quiz-step-text">Pergunta ${currentStep + 1} de ${quizData.length}</span></div>`;
    
    quizContent.innerHTML = html;
    
    $$('.quiz-opt', quizContent).forEach(btn => {
      btn.addEventListener('click', (e) => {
        answers[currentStep] = e.currentTarget.dataset.val;
        currentStep++;
        renderQuiz();
      });
    });

    const backBtn = $('#quizBack');
    if (backBtn) backBtn.addEventListener('click', () => { currentStep--; renderQuiz(); });
  };

  const finishQuiz = () => {
    let result = answers[0]; // Simple logic: use first answer for profile
    if (result === 'dev' && answers[2] === 'criativo') result = 'criativo';
    if (result === 'dev' && answers[2] === 'gamer') result = 'gamer';
    
    quizContent.innerHTML = `
      <div style="text-align:center; padding: 2rem 0;">
        <span style="font-size:3rem;display:block;margin-bottom:1rem;">🎉</span>
        <h3 style="font-size:1.5rem;margin-bottom:.5rem;">O seu perfil ideal é <strong>${PROFILES[result].name}</strong>!</h3>
        <p style="color:var(--muted);margin-bottom:2rem;">Preparamos uma lista de itens especialmente para o seu estilo.</p>
        <button class="btn btn--primary" id="btnGoToList">Ver minha lista</button>
      </div>
    `;

    $('#btnGoToList').addEventListener('click', () => {
      setListaTab(result);
      document.querySelector('#lista-sec').scrollIntoView({ behavior: 'smooth' });
      // Reset quiz for later
      currentStep = 0; answers = []; setTimeout(renderQuiz, 1000);
    });
  };

  if(quizContent) renderQuiz();


  /* ---------- SHOPPING LIST LOGIC ---------- */
  let activeProfile = 'gamer';
  let selectedItems = new Set();
  
  const listaTabs = $('#listaTabs');
  const listaItems = $('#listaItems');
  const summaryItems = $('#summaryItems');
  const summaryTotalValue = $('#summaryTotalValue');
  const budgetInput = $('#budgetInput');
  const budgetStatus = $('#budgetStatus');
  const btnClearList = $('#btnClearList');
  const btnCopyList = $('#btnCopyList');

  const setListaTab = (profile) => {
    activeProfile = profile;
    $$('.tab', listaTabs).forEach(t => {
      t.classList.toggle('active', t.dataset.profile === profile);
    });
    renderListaItems();
  };

  if (listaTabs) {
    $$('.tab', listaTabs).forEach(t => {
      t.addEventListener('click', (e) => setListaTab(e.target.dataset.profile));
    });
  }

  const renderListaItems = () => {
    if(!listaItems) return;
    const items = PROFILES[activeProfile].items;
    let html = '';
    items.forEach(item => {
      const isChecked = selectedItems.has(item.id) ? 'checked' : '';
      const selClass = isChecked ? 'selected' : '';
      html += `
        <label class="list-item ${selClass}" data-id="${item.id}">
          <div class="checkbox-wrap">
            <input type="checkbox" value="${item.id}" ${isChecked}>
            <span class="checkmark"></span>
          </div>
          <div class="item-info">
            <span class="item-icon">${item.icon}</span>
            <div class="item-text">
              <h4>${item.name}</h4>
              <p>${item.note}</p>
            </div>
          </div>
          <div class="item-price">
            <strong>${brl(item.price)}</strong>
            <a href="${item.link}" target="_blank" onclick="event.stopPropagation()">Comprar ↗</a>
          </div>
        </label>
      `;
    });
    listaItems.innerHTML = html;

    $$('input[type="checkbox"]', listaItems).forEach(chk => {
      chk.addEventListener('change', (e) => {
        const id = e.target.value;
        if (e.target.checked) selectedItems.add(id);
        else selectedItems.delete(id);
        
        e.target.closest('.list-item').classList.toggle('selected', e.target.checked);
        updateSummary();
      });
    });
  };

  const updateSummary = () => {
    if(!summaryItems) return;
    
    // Calculate total
    let total = 0;
    const allItems = [...PROFILES.gamer.items, ...PROFILES.criativo.items, ...PROFILES.dev.items];
    const sItems = [];
    
    selectedItems.forEach(id => {
      const item = allItems.find(i => i.id === id);
      if(item) {
        total += item.price;
        sItems.push(item);
      }
    });

    summaryTotalValue.textContent = brl(total);

    if (sItems.length === 0) {
      summaryItems.innerHTML = '<li class="empty">Nenhum item selecionado.</li>';
    } else {
      summaryItems.innerHTML = sItems.map(i => `<li><span>${i.name}</span> <span>${brl(i.price)}</span></li>`).join('');
    }

    // Budget Logic
    const budget = parseFloat(budgetInput.value) || 0;
    if (budget > 0) {
      if (total > budget) {
        budgetStatus.textContent = `Você passou ${brl(total - budget)} do limite.`;
        budgetStatus.className = 'over';
      } else {
        budgetStatus.textContent = `Você ainda tem ${brl(budget - total)} livre.`;
        budgetStatus.className = 'ok';
      }
    } else {
      budgetStatus.textContent = 'Defina um orçamento para acompanhar.';
      budgetStatus.className = '';
    }
  };

  if(budgetInput) budgetInput.addEventListener('input', updateSummary);

  if(btnClearList) {
    btnClearList.addEventListener('click', () => {
      selectedItems.clear();
      renderListaItems();
      updateSummary();
    });
  }

  if(btnCopyList) {
    btnCopyList.addEventListener('click', () => {
      if(selectedItems.size === 0) { alert('Selecione alguns itens primeiro!'); return; }
      const allItems = [...PROFILES.gamer.items, ...PROFILES.criativo.items, ...PROFILES.dev.items];
      let txt = 'Minha Lista de Setup:\n\n';
      let total = 0;
      selectedItems.forEach(id => {
        const i = allItems.find(x => x.id === id);
        if(i) { txt += `- ${i.name}: ${brl(i.price)}\n  Link: ${i.link}\n`; total += i.price; }
      });
      txt += `\nTotal Estimado: ${brl(total)}`;
      
      navigator.clipboard.writeText(txt).then(() => {
        const orig = btnCopyList.textContent;
        btnCopyList.textContent = 'Copiado! ✓';
        setTimeout(() => btnCopyList.textContent = orig, 2000);
      });
    });
  }

  // Init
  setListaTab('gamer');
  
  /* Brilho que segue o mouse */
  const glow = $('#glow');
  if (glow && !reduce && matchMedia('(hover:hover)').matches) {
    let x = innerWidth / 2, y = innerHeight / 3, tx = x, ty = y;
    addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
    const loop = () => {
      x += (tx - x) * 0.08; y += (ty - y) * 0.08;
      glow.style.left = x + 'px'; glow.style.top = y + 'px';
      requestAnimationFrame(loop);
    };
    loop();
  } else if (glow) {
    glow.style.display = 'none';
  }

  /* Alternador de Tema */
  const initThemeToggle = () => {
    const nav = $('#nav');
    if (!nav) return;
    const btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.innerHTML = '☀️/🌙';

    const savedTheme = localStorage.getItem('msi_theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
    }

    btn.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light-mode');
      localStorage.setItem('msi_theme', isLight ? 'light' : 'dark');
    });

    nav.insertBefore(btn, nav.querySelector('.pill'));
  };

  initThemeToggle();

  /* Menu mobile */
  const btn = $('#menuBtn');
  const links = $('#navLinks');
  if (btn && links) {
    btn.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
    $$('a', links).forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }));
  }

  /* Revelar ao rolar */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.12 });
  $$('.reveal').forEach((el, i) => {
    el.style.transitionDelay = (i % 3) * 90 + 'ms';
    io.observe(el);
  });

  /* Contadores */
  const co = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, end = +el.dataset.count, suf = el.dataset.suffix || '';
    const t0 = performance.now(), dur = 1500;
    const tick = t => {
      const p = Math.min((t - t0) / dur, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suf;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    co.unobserve(el);
  }), { threshold: 0.5 });
  $$('[data-count]').forEach(el => co.observe(el));

  /* Efeito 3D nos cards */
  if (!reduce && matchMedia('(hover:hover)').matches) {
    $$('.tilt').forEach(el => {
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg) translateY(-4px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  /* Formulário */
  const form = $('#form'), email = $('#email'), msg = $('#msg');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim());
      msg.className = 'form__msg ' + (ok ? 'ok' : 'err');
      msg.textContent = ok ? 'Tudo certo! Você entrou na lista. 🎉' : 'Digite um e-mail válido.';
      if (ok) form.reset();
    });
  }

  const yEl = $('#year');
  if (yEl) yEl.textContent = new Date().getFullYear();
})();