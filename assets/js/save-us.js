/* Save Us - scripts utilitaires */

document.addEventListener('DOMContentLoaded', () => {
  initDetailPage();
  initForms();
  highlightActiveNav();
  initScrollReveal();
});

function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.save-us-activite-card, .save-us-value-card, .ul-blog-2, .ul-stats-item, .save-us-cta-band'
  );
  if (!targets.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => {
    el.classList.add('save-us-reveal');
    observer.observe(el);
  });
}

function highlightActiveNav() {
  const page = document.body.dataset.page;
  if (!page) return;
  document.querySelectorAll('.ul-header-nav a[data-nav]').forEach((link) => {
    if (link.dataset.nav === page) {
      link.classList.add('active');
    }
  });
}

function initDetailPage() {
  const activiteContainer = document.getElementById('activite-detail');
  const actualiteContainer = document.getElementById('actualite-detail');

  if (activiteContainer && typeof SAVE_US_ACTIVITES !== 'undefined') {
    loadActiviteDetail(activiteContainer);
  }
  if (actualiteContainer && typeof SAVE_US_ACTUALITES !== 'undefined') {
    loadActualiteDetail(actualiteContainer);
  }
}

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function loadActiviteDetail(container) {
  const id = getQueryParam('id');
  const data = SAVE_US_ACTIVITES[id];
  if (!data) {
    container.innerHTML = '<p class="text-center py-5">Activité introuvable. <a href="activites.html">Retour aux activités</a></p>';
    return;
  }

  document.title = `${data.title} - Save Us`;
  const breadcrumbTitle = document.getElementById('breadcrumb-title');
  if (breadcrumbTitle) breadcrumbTitle.textContent = data.title;

  const ids = Object.keys(SAVE_US_ACTIVITES);
  const idx = ids.indexOf(id);
  const prevId = idx > 0 ? ids[idx - 1] : null;
  const nextId = idx < ids.length - 1 ? ids[idx + 1] : null;

  container.innerHTML = `
    <div class="ul-project-details-img-slider swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide"><div><img src="${data.image}" alt="${data.title}"></div></div>
      </div>
      <div class="ul-project-details-slider-nav ul-slider-nav">
        <button class="prev"><i class="flaticon-back"></i></button>
        <button class="next"><i class="flaticon-next"></i></button>
      </div>
    </div>
    <div class="row gx-5 gy-4 flex-column-reverse flex-lg-row">
      <div class="col-md-8">
        <div class="ul-event-details">
          <h2 class="ul-event-details-title">${data.title}</h2>
          <p class="ul-event-details-descr">${data.description}</p>
          <h3 class="ul-event-details-inner-title">Défi & Solution</h3>
          <p class="ul-event-details-descr"><strong>Défi :</strong> ${data.challenge}</p>
          <p class="ul-event-details-descr"><strong>Solution :</strong> ${data.solution}</p>
          <h3 class="ul-event-inner-title">Résultats</h3>
          <p>${data.result}</p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="ul-project-details-infos">
          <h4 class="ul-project-details-infos-title">Informations</h4>
          <ul class="ul-project-details-infos-list">
            <li><span class="key">CATÉGORIE</span>:<span class="value">${data.category}</span></li>
            <li><span class="key">ZONE</span>:<span class="value">${data.zone}</span></li>
            <li><span class="key">BÉNÉFICIAIRES</span>:<span class="value">${data.beneficiaires}</span></li>
            <li><span class="key">PÉRIODE</span>:<span class="value">${data.date}</span></li>
          </ul>
          <a href="faire-un-don.html" class="ul-btn w-100 justify-content-center mt-3"><i class="flaticon-fast-forward-double-right-arrows-symbol"></i> Soutenir cette activité</a>
        </div>
      </div>
    </div>
    <div class="ul-project-details-nav">
      ${prevId ? `<a href="activite-details.html?id=${prevId}"><i class="flaticon-back"></i> <span>Activité précédente</span></a>` : '<span></span>'}
      ${nextId ? `<a href="activite-details.html?id=${nextId}"><span>Activité suivante</span> <i class="flaticon-next"></i></a>` : '<span></span>'}
    </div>
  `;

  if (typeof Swiper !== 'undefined') {
    new Swiper('.ul-project-details-img-slider', {
      slidesPerView: 1,
      navigation: { nextEl: '.ul-project-details-slider-nav .next', prevEl: '.ul-project-details-slider-nav .prev' }
    });
  }
}

function loadActualiteDetail(container) {
  const id = getQueryParam('id');
  const data = SAVE_US_ACTUALITES[id];
  if (!data) {
    container.innerHTML = '<p class="text-center py-5">Article introuvable. <a href="actualites.html">Retour aux actualités</a></p>';
    return;
  }

  document.title = `${data.title} - Save Us`;
  const breadcrumbTitle = document.getElementById('breadcrumb-title');
  if (breadcrumbTitle) breadcrumbTitle.textContent = data.title;

  const paragraphs = data.content.map((p) => `<p>${p}</p>`).join('');

  container.innerHTML = `
    <div class="ul-blog-details ul-blog-inner mb-0">
      <div class="ul-blog-2 ul-blog-inner">
        <div class="ul-blog-img"><img src="${data.image}" alt="${data.title}"></div>
        <div class="ul-blog-txt">
          <div class="ul-blog-infos">
            <div class="ul-blog-info"><span class="icon"><i class="flaticon-account"></i></span><span class="text">${data.author}</span></div>
            <div class="ul-blog-info"><span class="icon"><i class="flaticon-price-tag"></i></span><span class="text">${data.category}</span></div>
            <div class="ul-blog-info"><span class="icon"><i class="flaticon-calendar"></i></span><span class="text">${data.date}</span></div>
          </div>
          <h2 class="ul-blog-title">${data.title}</h2>
          <div class="ul-donation-details-summary-txt ul-blog-details-txt">${paragraphs}</div>
        </div>
      </div>
    </div>
  `;
}

function initForms() {
  document.querySelectorAll('.save-us-form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = form.querySelector('.form-success-msg');
      if (msg) {
        msg.classList.remove('d-none');
        form.reset();
        setTimeout(() => msg.classList.add('d-none'), 5000);
      }
    });
  });
}
