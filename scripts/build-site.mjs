import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');

const logo = (variant = 'default') => {
  if (variant === 'white') {
    return `<a href="index.html" class="save-us-logo-link"><img src="assets/img/save-us-logo.png" alt="Save Us" class="save-us-logo"></a>`;
  }
  return `<a href="index.html" class="save-us-logo-link"><img src="assets/img/save-us-logo.png" alt="Save Us" class="save-us-logo" onerror="this.onerror=null;this.src='assets/img/save-us-logo.svg'"></a>`;
};

const head = (title) => `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Save Us</title>
    <link rel="stylesheet" href="assets/icon/flaticon_charitics.css">
    <link rel="stylesheet" href="assets/vendor/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="assets/vendor/splide/splide.min.css">
    <link rel="stylesheet" href="assets/vendor/swiper/swiper-bundle.min.css">
    <link rel="stylesheet" href="assets/vendor/slim-select/slimselect.css">
    <link rel="stylesheet" href="assets/vendor/animate-wow/animate.min.css">
    <link rel="stylesheet" href="assets/vendor/flatpickr/flatpickr.min.css">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/save-us.css">
</head>`;

const sidebar = `
    <div class="ul-sidebar">
        <div class="ul-sidebar-header">
            <div class="ul-sidebar-header-logo">
                ${logo()}
            </div>
            <button class="ul-sidebar-closer"><i class="flaticon-close"></i></button>
        </div>
        <div class="ul-sidebar-header-nav-wrapper d-block d-lg-none"></div>
        <div class="ul-sidebar-footer">
            <span class="ul-sidebar-footer-title">Suivez-nous</span>
            <div class="ul-sidebar-footer-social">
                <a href="#"><i class="flaticon-facebook"></i></a>
                <a href="#"><i class="flaticon-twitter"></i></a>
                <a href="#"><i class="flaticon-instagram"></i></a>
                <a href="#"><i class="flaticon-youtube"></i></a>
            </div>
        </div>
    </div>`;

const searchModal = `
    <div class="ul-search-form-wrapper flex-grow-1 flex-shrink-0">
        <button class="ul-search-closer"><i class="flaticon-close"></i></button>
        <form action="#" class="ul-search-form">
            <div class="ul-search-form-right">
                <input type="search" name="search" id="ul-search" placeholder="Rechercher...">
                <button type="submit"><span class="icon"><i class="flaticon-search"></i></span></button>
            </div>
        </form>
    </div>`;

const header = (activePage) => `
    <header class="ul-header">
        <div class="ul-header-bottom to-be-sticky">
            <div class="ul-header-bottom-wrapper ul-header-container">
                <div class="logo-container">
                    ${logo()}
                </div>
                <div class="ul-header-nav-wrapper">
                    <div class="to-go-to-sidebar-in-mobile">
                        <nav class="ul-header-nav">
                            <a href="index.html" data-nav="accueil"${activePage === 'accueil' ? ' class="active"' : ''}>Accueil</a>
                            <a href="actualites.html" data-nav="actualites"${activePage === 'actualites' ? ' class="active"' : ''}>Actualités</a>
                            <a href="a-propos.html" data-nav="apropos"${activePage === 'apropos' ? ' class="active"' : ''}>À Propos</a>
                            <a href="faire-un-don.html" data-nav="don"${activePage === 'don' ? ' class="active"' : ''}>Faire un don</a>
                            <a href="devenir-benevole.html" data-nav="benevole"${activePage === 'benevole' ? ' class="active"' : ''}>Devenir bénévole</a>
                            <a href="activites.html" data-nav="activites"${activePage === 'activites' ? ' class="active"' : ''}>Nos Activités</a>
                        </nav>
                    </div>
                </div>
                <div class="ul-header-actions">
                    <button class="ul-header-search-opener"><i class="flaticon-search"></i></button>
                    <a href="faire-un-don.html" class="ul-btn d-sm-inline-flex d-none"><i class="flaticon-fast-forward-double-right-arrows-symbol"></i> Faire un don</a>
                    <button class="ul-header-sidebar-opener d-lg-none d-inline-flex"><i class="flaticon-menu"></i></button>
                </div>
            </div>
        </div>
    </header>`;

const breadcrumb = (title, parent) => `
        <section class="ul-breadcrumb save-us-breadcrumb ul-section-spacing">
            <div class="ul-container">
                <h2 class="ul-breadcrumb-title" id="breadcrumb-title">${title}</h2>
                <ul class="ul-breadcrumb-nav">
                    <li><a href="index.html">Accueil</a></li>
                    <li><span class="separator"><i class="flaticon-right"></i></span></li>
                    ${parent ? `<li><a href="${parent.href}">${parent.label}</a></li><li><span class="separator"><i class="flaticon-right"></i></span></li>` : ''}
                    <li>${title}</li>
                </ul>
            </div>
        </section>`;

const ctaBand = `
    <section class="ul-section-spacing">
        <div class="ul-container">
            <div class="save-us-cta-band wow animate__fadeInUp">
                <span class="save-us-cta-band__label">Agissez maintenant</span>
                <h2>Ensemble, offrons un avenir aux enfants et aux femmes des zones de guerre</h2>
                <p>Votre don ou votre engagement bénévole change concrètement des vies. Rejoignez les 12 personnes qui nous font confiance.</p>
                <div class="save-us-cta-band__btns">
                    <a href="faire-un-don.html" class="ul-btn ul-btn--white"><i class="flaticon-fast-forward-double-right-arrows-symbol"></i> Faire un don</a>
                    <a href="devenir-benevole.html" class="ul-btn ul-btn--outline-white"><i class="flaticon-fast-forward-double-right-arrows-symbol"></i> Devenir bénévole</a>
                </div>
            </div>
        </div>
    </section>`;

const valuesSection = `
    <section class="save-us-values ul-section-spacing">
        <div class="ul-container">
            <div class="ul-section-heading text-center justify-content-center mb-5 wow animate__fadeInUp">
                <div>
                    <span class="ul-section-sub-title">Nos piliers</span>
                    <h2 class="ul-section-title">Ce qui guide chaque action</h2>
                </div>
            </div>
            <div class="row row-cols-md-3 row-cols-1 ul-bs-row gy-4">
                <div class="col wow animate__fadeInUp">
                    <div class="save-us-value-card">
                        <div class="save-us-value-card__icon save-us-value-card__icon--green"><i class="flaticon-love"></i></div>
                        <h3>Protection</h3>
                        <p>Extraire et mettre en sécurité les enfants et les femmes exposés aux violences et aux conflits armés.</p>
                    </div>
                </div>
                <div class="col wow animate__fadeInUp" data-wow-delay="0.1s">
                    <div class="save-us-value-card">
                        <div class="save-us-value-card__icon save-us-value-card__icon--blue"><i class="flaticon-team"></i></div>
                        <h3>Accompagnement</h3>
                        <p>Hébergement, soins, éducation et soutien psychologique pour reconstruire une vie digne.</p>
                    </div>
                </div>
                <div class="col wow animate__fadeInUp" data-wow-delay="0.2s">
                    <div class="save-us-value-card">
                        <div class="save-us-value-card__icon save-us-value-card__icon--gradient"><i class="flaticon-relationship"></i></div>
                        <h3>Autonomie</h3>
                        <p>Former, réinsérer et donner les moyens aux femmes et aux familles de reprendre leur destin en main.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>`;

const footer = `
    <footer class="ul-footer">
        <div class="ul-footer-top">
            <div class="ul-footer-container">
                <div class="ul-footer-top-contact-infos">
                    <div class="ul-footer-top-contact-info">
                        <div class="ul-footer-top-contact-info-icon"><div class="ul-footer-top-contact-info-icon-inner"><i class="flaticon-pin"></i></div></div>
                        <div class="ul-footer-top-contact-info-txt">
                            <span class="ul-footer-top-contact-info-label">Adresse</span>
                            <h5 class="ul-footer-top-contact-info-address">Yaoundé, Cameroun</h5>
                        </div>
                    </div>
                    <div class="ul-footer-top-contact-info">
                        <div class="ul-footer-top-contact-info-icon"><div class="ul-footer-top-contact-info-icon-inner"><i class="flaticon-email"></i></div></div>
                        <div class="ul-footer-top-contact-info-txt">
                            <span class="ul-footer-top-contact-info-label">Email</span>
                            <h5 class="ul-footer-top-contact-info-address"><a href="mailto:save.us.cm@gmail.com">save.us.cm@gmail.com</a></h5>
                        </div>
                    </div>
                    <div class="ul-footer-top-contact-info">
                        <div class="ul-footer-top-contact-info-icon"><div class="ul-footer-top-contact-info-icon-inner"><i class="flaticon-telephone-call-1"></i></div></div>
                        <div class="ul-footer-top-contact-info-txt">
                            <span class="ul-footer-top-contact-info-label">Contact</span>
                            <h5 class="ul-footer-top-contact-info-address"><a href="tel:+33142000000">+237 6 99 90 99 90</a></h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="ul-footer-middle">
            <div class="ul-footer-container">
                <div class="ul-footer-middle-wrapper wow animate__fadeInUp">
                    <div class="ul-footer-about">
                        ${logo('white')}
                        <p class="ul-footer-about-txt">Association humanitaire dédiée à l'éducation des femmes et enfants victimes des conflits armés à travers le monde.</p>
                        <div class="ul-footer-socials">
                            <a href="#"><i class="flaticon-facebook"></i></a>
                            <a href="#"><i class="flaticon-twitter"></i></a>
                            <a href="#"><i class="flaticon-linkedin-big-logo"></i></a>
                            <a href="#"><i class="flaticon-youtube"></i></a>
                        </div>
                    </div>
                    <div class="ul-footer-widget">
                        <h3 class="ul-footer-widget-title">Liens rapides</h3>
                        <div class="ul-footer-widget-links">
                            <a href="a-propos.html">À Propos</a>
                            <a href="activites.html">Nos Activités</a>
                            <a href="actualites.html">Actualités</a>
                            <a href="faire-un-don.html">Faire un don</a>
                            <a href="devenir-benevole.html">Devenir bénévole</a>
                        </div>
                    </div>
                    <div class="ul-footer-widget ul-footer-recent-posts">
                        <h3 class="ul-footer-widget-title">Dernières actualités</h3>
                        <div class="ul-blog-sidebar-posts">
                            <div class="ul-blog-sidebar-post ul-footer-post">
                                <div class="img"><img src="assets/img/blog-2.jpg" alt=""></div>
                                <div class="txt">
                                    <span class="date"><span class="icon"><i class="flaticon-calendar"></i></span><span>15 Mars 2025</span></span>
                                    <h4 class="title"><a href="actualite-details.html?id=campagne2025">Campagne Enfants d'abord 2025</a></h4>
                                </div>
                            </div>
                            <div class="ul-blog-sidebar-post ul-footer-post">
                                <div class="img"><img src="assets/img/blog-1.jpg" alt=""></div>
                                <div class="txt">
                                    <span class="date"><span class="icon"><i class="flaticon-calendar"></i></span><span>28 Fév. 2025</span></span>
                                    <h4 class="title"><a href="actualite-details.html?id=partenariat">Partenariat UNICEF</a></h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ul-footer-widget ul-nwsltr-widget">
                        <h3 class="ul-footer-widget-title">Newsletter</h3>
                        <form action="#" class="ul-nwsltr-form save-us-form">
                            <div class="top">
                                <input type="email" name="email" placeholder="Votre adresse email" class="ul-nwsltr-input" required>
                                <button type="submit"><i class="flaticon-next"></i></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="ul-footer-bottom">
            <div class="ul-footer-container">
                <div class="ul-footer-bottom-wrapper">
                    <p class="copyright-txt">&copy; <span id="footer-copyright-year"></span> Save Us. Tous droits réservés.</p>
                    <div class="ul-footer-bottom-nav"><a href="#">Mentions légales</a> <a href="#">Politique de confidentialité</a></div>
                </div>
            </div>
        </div>
        <div class="ul-footer-vectors"><img src="assets/img/footer-vector-img.png" alt="" class="ul-footer-vector-1"></div>
    </footer>`;

const scripts = (extra = '') => `
    <script src="assets/vendor/bootstrap/bootstrap.bundle.min.js"></script>
    <script src="assets/vendor/splide/splide.min.js"></script>
    <script src="assets/vendor/splide/splide-extension-auto-scroll.min.js"></script>
    <script src="assets/vendor/swiper/swiper-bundle.min.js"></script>
    <script src="assets/vendor/slim-select/slimselect.min.js"></script>
    <script src="assets/vendor/animate-wow/wow.min.js"></script>
    <script src="assets/vendor/splittype/index.min.js"></script>
    <script src="assets/vendor/mixitup/mixitup.min.js"></script>
    <script src="assets/vendor/fslightbox/fslightbox.js"></script>
    <script src="assets/vendor/flatpickr/flatpickr.js"></script>
    <script src="assets/js/main.js"></script>
    <script src="assets/js/tab.js"></script>
    <script src="assets/js/accordion.js"></script>
    <script src="assets/js/progressbar.js"></script>
    <script src="assets/js/donate-form.js"></script>
    ${extra}
    <script src="assets/js/save-us.js"></script>`;

const pageShell = (title, activePage, bodyContent, bodyAttrs = '', extraScripts = '') => `${head(title)}
<body class="save-us-theme" data-page="${activePage}"${bodyAttrs}>
    <div class="preloader" id="preloader"><div class="loader"></div></div>
    ${sidebar}
    ${searchModal}
    ${header(activePage)}
    <main>
        ${bodyContent}
    </main>
    ${footer}
    ${scripts(extraScripts)}
</body>
</html>`;

// --- INDEX ---
const indexContent = `
    <div class="overflow-hidden">
        <section class="ul-banner">
            <div class="ul-banner-container">
                <div class="row gy-4 row-cols-lg-2 row-cols-1 align-items-center flex-column-reverse flex-lg-row">
                    <div class="col">
                        <div class="ul-banner-txt">
                            <div class="wow animate__fadeInUp">
                                <span class="save-us-hero-badge">Association humanitaire active</span>
                                <span class="ul-banner-sub-title ul-section-sub-title">Ensemble, sauvons des vies</span>
                                <h1 class="ul-banner-title">Protéger les enfants et les femmes des zones de guerre</h1>
                                <p class="ul-banner-descr">Save Us évacue, héberge et accompagne les populations les plus vulnérables touchées par les conflits armés. Chaque geste compte.</p>
                                <div class="ul-banner-btns">
                                    <a href="faire-un-don.html" class="ul-btn"><i class="flaticon-fast-forward-double-right-arrows-symbol"></i> Faire un don</a>
                                    <a href="devenir-benevole.html" class="ul-btn ul-btn--secondary"><i class="flaticon-fast-forward-double-right-arrows-symbol"></i> Devenir bénévole</a>
                                </div>
                                <div class="save-us-hero-trust">
                                    <div class="save-us-hero-trust__avatars">
                                        <img src="assets/img/user-1.png" alt="">
                                        <img src="assets/img/user-2.png" alt="">
                                        <img src="assets/img/user-3.png" alt="">
                                    </div>
                                    <div>
                                        <strong>10+ donateurs</strong>
                                        <span>nous font confiance</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col align-self-start">
                        <div class="ul-banner-img">
                            <div class="img-wrapper">
                                <img src="assets/img/banner-img.png" alt="Enfants et femmes en zone de conflit">
                            </div>
                            <div class="save-us-hero-float">
                                <span class="save-us-hero-float__number">10+</span>
                                <span class="save-us-hero-float__label">Vies sauvées depuis 2018</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="ul-about ul-section-spacing wow animate__fadeInUp">
            <div class="ul-container">
                <div class="row row-cols-md-2 row-cols-1 align-items-center gy-4 ul-about-row">
                    <div class="col">
                        <div class="ul-about-imgs">
                            <div class="img-wrapper"><img src="assets/img/about-img.png" alt="Notre mission"></div>
                            <div class="ul-about-imgs-vectors">
                                <img src="assets/img/about-img-vector-1.svg" alt="" class="vector-1">
                                <img src="assets/img/about-img-vector-2.svg" alt="" class="vector-2">
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="ul-about-txt">
                            <span class="ul-section-sub-title ul-section-sub-title--2">Qui sommes-nous</span>
                            <h2 class="ul-section-title">Une voix pour ceux que la guerre a réduits au silence</h2>
                            <p class="ul-section-descr">Fondée en 2018, Save Us intervient sur les fronts humanitaires pour extraire, protéger et reconstruire la vie des enfants et des femmes piégés dans les conflits. Notre réseau de bénévoles et de partenaires s'étend à travers l'Europe et les zones de crise.</p>
                            <div class="ul-about-block">
                                <div class="block-left">
                                    <div class="block-heading">
                                        <div class="icon"><i class="flaticon-love"></i></div>
                                        <h3 class="block-title">Notre engagement</h3>
                                    </div>
                                    <ul class="block-list">
                                        <li>Évacuation d'urgence 24h/24</li>
                                        <li>Hébergement et soins médicaux</li>
                                        <li>Éducation et réinsertion</li>
                                    </ul>
                                </div>
                                <div class="block-right"><img src="assets/img/about-block-img.jpg" alt=""></div>
                            </div>
                            <div class="ul-about-bottom">
                                <a href="a-propos.html" class="ul-btn"><i class="flaticon-fast-forward-double-right-arrows-symbol"></i> En savoir plus</a>
                                <div class="ul-about-call">
                                    <div class="icon"><i class="flaticon-telephone-call"></i></div>
                                    <div class="txt">
                                        <span class="call-title">Contact</span>
                                        <a href="tel:+33142000000">+237 6 99 90 99 90</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ul-about-vectors"><img src="assets/img/about-vector-1.png" alt="" class="vector-1"></div>
        </section>

        <div class="ul-stats ul-section-spacing">
            <div class="ul-container">
                <div class="ul-stats-wrapper wow animate__fadeInUp">
                    <div class="row row-cols-md-4 row-cols-sm-3 row-cols-2 row-cols-xxs-1 ul-bs-row justify-content-center">
                        <div class="col"><div class="ul-stats-item"><i class="flaticon-costumer"></i><span class="number">10+</span><span class="txt">Vies sauvées</span></div></div>
                        <div class="col"><div class="ul-stats-item"><i class="flaticon-team"></i><span class="number">10+</span><span class="txt">Bénévoles actifs</span></div></div>
                        <div class="col"><div class="ul-stats-item"><i class="flaticon-package"></i><span class="number">2</span><span class="txt">Pays d'intervention</span></div></div>
                        <div class="col"><div class="ul-stats-item"><i class="flaticon-relationship"></i><span class="number">10+</span><span class="txt">Donateurs</span></div></div>
                    </div>
                </div>
            </div>
        </div>

        ${valuesSection}

        <section class="ul-section-spacing">
            <div class="ul-container">
                <div class="ul-section-heading text-center justify-content-center wow animate__fadeInUp">
                    <div>
                        <span class="ul-section-sub-title">Sur le terrain</span>
                        <h2 class="ul-section-title">Nos activités en action</h2>
                    </div>
                </div>
                <div class="row row-cols-md-3 row-cols-1 ul-bs-row gy-4 wow animate__fadeInUp">
                    <div class="col">
                        <div class="save-us-activite-card">
                            <div class="card-img"><img src="assets/img/donation-1.jpg" alt="Évacuation"></div>
                            <div class="card-body">
                                <span class="card-tag">Sécurité</span>
                                <h3 class="card-title"><a href="activite-details.html?id=evacuation">Évacuation d'urgence</a></h3>
                                <p class="card-excerpt">Extraction sécurisée des enfants et femmes menacés dans les zones de combat.</p>
                                <a href="activite-details.html?id=evacuation" class="card-link">Voir les détails <i class="flaticon-next"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="save-us-activite-card">
                            <div class="card-img"><img src="assets/img/donation-2.jpg" alt="Hébergement"></div>
                            <div class="card-body">
                                <span class="card-tag">Logement</span>
                                <h3 class="card-title"><a href="activite-details.html?id=hebergement">Hébergement temporaire</a></h3>
                                <p class="card-excerpt">Centres d'accueil sécurisés pour les familles déplacées par les conflits.</p>
                                <a href="activite-details.html?id=hebergement" class="card-link">Voir les détails <i class="flaticon-next"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="save-us-activite-card">
                            <div class="card-img"><img src="assets/img/donation-3.jpg" alt="Éducation"></div>
                            <div class="card-body">
                                <span class="card-tag">Éducation</span>
                                <h3 class="card-title"><a href="activite-details.html?id=education">École mobile</a></h3>
                                <p class="card-excerpt">Continuité scolaire pour les enfants privés d'école à cause de la guerre.</p>
                                <a href="activite-details.html?id=education" class="card-link">Voir les détails <i class="flaticon-next"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-center mt-5">
                    <a href="activites.html" class="ul-btn"><i class="flaticon-fast-forward-double-right-arrows-symbol"></i> Toutes nos activités</a>
                </div>
            </div>
        </section>

        <section class="ul-blogs ul-section-spacing save-us-section-alt">
            <div class="ul-container wow animate__fadeInUp">
                <div class="ul-section-heading justify-content-between">
                    <div>
                        <span class="ul-section-sub-title">Restez informés</span>
                        <h2 class="ul-section-title">Dernières actualités</h2>
                    </div>
                    <a href="actualites.html" class="ul-btn d-none d-md-inline-flex"><i class="flaticon-fast-forward-double-right-arrows-symbol"></i> Toutes les actualités</a>
                </div>
                <div class="row row-cols-md-3 row-cols-1 ul-bs-row gy-4">
                    <div class="col">
                        <div class="ul-blog ul-blog-2">
                            <div class="ul-blog-img"><img src="assets/img/blog-b-1.jpg" alt=""><div class="date"><span class="number">15</span><span class="txt">Mar</span></div></div>
                            <div class="ul-blog-txt">
                                <div class="ul-blog-infos"><div class="ul-blog-info"><span class="icon"><i class="flaticon-price-tag"></i></span><span class="text">Campagne</span></div></div>
                                <a href="actualite-details.html?id=campagne2025" class="ul-blog-title">Lancement de la campagne « Enfants d'abord » 2025</a>
                                <a href="actualite-details.html?id=campagne2025" class="ul-blog-btn">Lire la suite <span class="icon"><i class="flaticon-next"></i></span></a>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="ul-blog ul-blog-2">
                            <div class="ul-blog-img"><img src="assets/img/blog-2.jpg" alt=""><div class="date"><span class="number">28</span><span class="txt">Fév</span></div></div>
                            <div class="ul-blog-txt">
                                <div class="ul-blog-infos"><div class="ul-blog-info"><span class="icon"><i class="flaticon-price-tag"></i></span><span class="text">Partenariat</span></div></div>
                                <a href="actualite-details.html?id=partenariat" class="ul-blog-title">Nouveau partenariat avec l'UNICEF</a>
                                <a href="actualite-details.html?id=partenariat" class="ul-blog-btn">Lire la suite <span class="icon"><i class="flaticon-next"></i></span></a>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="ul-blog ul-blog-2">
                            <div class="ul-blog-img"><img src="assets/img/blog-3.jpg" alt=""><div class="date"><span class="number">10</span><span class="txt">Fév</span></div></div>
                            <div class="ul-blog-txt">
                                <div class="ul-blog-infos"><div class="ul-blog-info"><span class="icon"><i class="flaticon-price-tag"></i></span><span class="text">Témoignage</span></div></div>
                                <a href="actualite-details.html?id=temoignage" class="ul-blog-title">Le parcours de Nadia et ses trois enfants</a>
                                <a href="actualite-details.html?id=temoignage" class="ul-blog-btn">Lire la suite <span class="icon"><i class="flaticon-next"></i></span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        ${ctaBand}

        <div class="ul-section-spacing">
            <div class="ul-container">
                <div class="ul-donate-form-section">
                    <div class="row justify-content-between align-items-center">
                        <div class="col-lg-6 position-relative">
                            <div class="ul-donate-form-wrapper">
                                <h3 class="ul-donate-form-title">Faites un don maintenant</h3>
                                <form action="#" class="ul-donate-form save-us-form">
                                    <div><input type="radio" name="donate-amount" id="donate-amount-1" checked hidden><label for="donate-amount-1" class="ul-donate-form-label">25 000 FCFA</label></div>
                                    <div><input type="radio" name="donate-amount" id="donate-amount-2" hidden><label for="donate-amount-2" class="ul-donate-form-label">50 000 FCFA</label></div>
                                    <div><input type="radio" name="donate-amount" id="donate-amount-3" hidden><label for="donate-amount-3" class="ul-donate-form-label">100 000 FCFA</label></div>
                                    <div><input type="radio" name="donate-amount" id="donate-amount-4" hidden><label for="donate-amount-4" class="ul-donate-form-label">250 000 FCFA</label></div>
                                    <div><input type="radio" name="donate-amount" id="donate-amount-5" hidden><label for="donate-amount-5" class="ul-donate-form-label">500 000 FCFA</label></div>
                                    <div class="custom-amount-wrapper">
                                        <input type="radio" name="donate-amount" id="custom-amount">
                                        <label for="donate-amount-custom" class="ul-donate-form-label">
                                            <input type="number" name="custom-amount" id="donate-amount-custom" placeholder="Montant libre" class="ul-donate-form-custom-input">
                                        </label>
                                    </div>
                                    <div><button type="submit" class="ul-btn"><i class="flaticon-fast-forward-double-right-arrows-symbol"></i> Donner</button></div>
                                    <div class="form-success-msg d-none">Merci pour votre générosité ! Votre don fait la différence.</div>
                                </form>
                            </div>
                            <img src="assets/img/donate-form-vector.svg" alt="" class="ul-donate-form-vector">
                        </div>
                        <div class="col-xl-5 col-lg-6">
                            <div class="ul-donate-form-section-txt">
                                <span class="ul-section-sub-title text-white">Agir maintenant</span>
                                <h2 class="ul-section-title text-white">Chaque cfa sauve une vie</h2>
                                <p class="text-white mb-4">50 € financent un kit de survie. 100 € couvrent les soins médicaux d'urgence. 250 € permettent l'évacuation d'une famille.</p>
                                <div class="ul-donation-progress">
                                    <div class="donation-progress-container ul-progress-container">
                                        <div class="donation-progressbar ul-progressbar" data-ul-progress-value="72"><div class="donation-progress-label ul-progress-label"></div></div>
                                    </div>
                                    <div class="ul-donation-progress-labels">
                                        <span class="ul-donation-progress-label">Collecté : 1 440 000 €</span>
                                        <span class="ul-donation-progress-label">Objectif : 2 000 000 €</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

// Fix index - main tag wraps content differently
const indexPage = `${head('Accueil')}
<body class="save-us-theme" data-page="accueil">
    <div class="preloader" id="preloader"><div class="loader"></div></div>
    ${sidebar}
    ${searchModal}
    ${header('accueil')}
    <main class="overflow-hidden">${indexContent.replace('<div class="overflow-hidden">', '').replace(/<\/div>\s*$/, '')}</main>
    ${footer}
    ${scripts()}
</body>
</html>`;

// --- ACTUALITES ---
const actualitesCards = [
  ['campagne2025', 'blog-b-1.jpg', '15', 'Mar', 'Campagne', "Lancement de la campagne « Enfants d'abord » 2025"],
  ['partenariat', 'blog-2.jpg', '28', 'Fév', 'Partenariat', "Nouveau partenariat avec l'UNICEF"],
  ['temoignage', 'blog-3.jpg', '10', 'Fév', 'Témoignage', 'Le parcours de Nadia et ses trois enfants'],
  ['benevoles', 'event-img.jpg', '5', 'Jan', 'Bénévolat', 'Recrutement de 50 nouveaux bénévoles en France'],
  ['urgence', 'blog-1.jpg', '20', 'Déc', 'Urgence', "Appel d'urgence : situation critique dans l'Est"],
  ['bilan', 'why-join.jpg', '15', 'Déc', 'Bilan', 'Bilan 2024 : 50 vies impactées'],
].map(([id, img, day, month, cat, title]) => `
    <div class="col">
        <div class="ul-blog ul-blog-2">
            <div class="ul-blog-img"><img src="assets/img/${img}" alt=""><div class="date"><span class="number">${day}</span><span class="txt">${month}</span></div></div>
            <div class="ul-blog-txt">
                <div class="ul-blog-infos">
                    <div class="ul-blog-info"><span class="icon"><i class="flaticon-account"></i></span><span class="text">Save Us</span></div>
                    <div class="ul-blog-info"><span class="icon"><i class="flaticon-price-tag"></i></span><span class="text">${cat}</span></div>
                </div>
                <a href="actualite-details.html?id=${id}" class="ul-blog-title">${title}</a>
                <a href="actualite-details.html?id=${id}" class="ul-blog-btn">Lire la suite <span class="icon"><i class="flaticon-next"></i></span></a>
            </div>
        </div>
    </div>`).join('');

const actualitesPage = pageShell('Actualités', 'actualites', `
    ${breadcrumb('Actualités')}
    <section class="ul-blogs-2 ul-section-spacing">
        <div class="ul-container wow animate__fadeInUp">
            <div class="ul-section-heading text-center justify-content-center mb-5">
                <div>
                    <span class="ul-section-sub-title">Nos nouvelles</span>
                    <h2 class="ul-section-title">Actualités de l'association</h2>
                    <p class="ul-section-descr mt-3">Suivez nos interventions sur le terrain, nos campagnes et les histoires de celles et ceux que nous accompagnons.</p>
                </div>
            </div>
            <div class="row row-cols-md-3 row-cols-2 row-cols-xxs-1 ul-bs-row justify-content-center gy-4">${actualitesCards}</div>
        </div>
    </section>
    ${ctaBand}`);

// --- A PROPOS ---
const aProposPage = pageShell('À Propos', 'apropos', `
    ${breadcrumb('À Propos')}
    <section class="ul-about ul-section-spacing wow animate__fadeInUp">
        <div class="ul-container">
            <div class="row row-cols-md-2 row-cols-1 align-items-center gy-4 ul-about-row">
                <div class="col">
                    <div class="ul-about-imgs">
                        <div class="img-wrapper"><img src="assets/img/about-img.png" alt="Save Us"></div>
                    </div>
                </div>
                <div class="col">
                    <div class="ul-about-txt">
                        <span class="ul-section-sub-title ul-section-sub-title--2">Save Us</span>
                        <h2 class="ul-section-title">Une association au service des plus vulnérables</h2>
                        <p class="ul-section-descr">Save Us est née de l'urgence humanitaire. Face à l'ampleur des conflits et à la détresse des civils — en particulier des femmes et des enfants —, un groupe de citoyens engagés a décidé d'agir concrètement sur le terrain et en métropole.</p>
                        <p class="ul-section-descr">Aujourd'hui, nous sommes une équipe de 340 bénévoles et une dizaine de salariés, soutenus par 12 donateurs. Nous intervenons dans 2 pays et avons sauvé plus de 50 vies depuis notre création.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div class="ul-stats ul-section-spacing pt-0">
        <div class="ul-container">
            <div class="ul-stats-wrapper wow animate__fadeInUp">
                <div class="row row-cols-md-4 row-cols-sm-2 row-cols-1 ul-bs-row justify-content-center">
                    <div class="col"><div class="ul-stats-item"><i class="flaticon-costumer"></i><span class="number">10+</span><span class="txt">Personnes aidées</span></div></div>
                    <div class="col"><div class="ul-stats-item"><i class="flaticon-team"></i><span class="number">10+</span><span class="txt">Bénévoles</span></div></div>
                    <div class="col"><div class="ul-stats-item"><i class="flaticon-package"></i><span class="number">2</span><span class="txt">Pays</span></div></div>
                    <div class="col"><div class="ul-stats-item"><i class="flaticon-relationship"></i><span class="number">10+</span><span class="txt">Donateurs</span></div></div>
                </div>
            </div>
        </div>
    </div>
    <section class="ul-about-tabs ul-events ul-section-spacing pt-0">
        <div class="ul-container">
            <div class="ul-section-heading align-items-center wow animate__fadeInUp">
                <div class="left">
                    <span class="ul-section-sub-title">Notre organisation</span>
                    <h2 class="ul-section-title text-white">Mission, Vision & Objectifs</h2>
                </div>
                <a href="faire-un-don.html" class="ul-btn"><i class="flaticon-fast-forward-double-right-arrows-symbol"></i> Nous soutenir</a>
            </div>
            <div class="tab-group">
                <div class="ul-about-tabs-wrapper">
                    <div id="tab-mission" class="ul-tab ul-about-tab active">
                        <div class="ul-about-tab-img"><img src="assets/img/mission-img.jpg" alt="Notre Mission"></div>
                        <div class="ul-about-tab-txt">
                            <h3 class="ul-about-tab-title">Notre Mission</h3>
                            <p class="ul-about-tab-descr">Sauver et protéger les enfants et les femmes victimes des conflits armés en leur offrant une évacuation sécurisée, un hébergement digne, des soins médicaux et un accompagnement vers l'autonomie.</p>
                            <ul class="ul-about-tab-list">
                                <li>Extraire les populations civiles des zones de combat actives</li>
                                <li>Assurer les besoins vitaux : abri, nourriture, eau, soins</li>
                                <li>Protéger les droits fondamentaux des enfants et des femmes</li>
                                <li>Travailler en transparence avec nos donateurs et partenaires</li>
                            </ul>
                        </div>
                    </div>
                    <div id="tab-vision" class="ul-tab ul-about-tab">
                        <div class="ul-about-tab-img"><img src="assets/img/why-join.jpg" alt="Notre Vision"></div>
                        <div class="ul-about-tab-txt">
                            <h3 class="ul-about-tab-title">Notre Vision</h3>
                            <p class="ul-about-tab-descr">Un monde où aucun enfant ni aucune femme ne sera laissé sans protection face à la guerre. Nous aspirons à bâtir un réseau humanitaire mondial capable de réagir en moins de 24 heures à toute crise touchant les civils.</p>
                            <ul class="ul-about-tab-list">
                                <li>Zéro enfant soldat, zéro femme abandonnée en zone de conflit</li>
                                <li>Des corridors humanitaires reconnus par la communauté internationale</li>
                                <li>Une société civile mobilisée et informée</li>
                                <li>La paix durable par l'éducation et l'autonomisation des femmes</li>
                            </ul>
                        </div>
                    </div>
                    <div id="tab-objectif" class="ul-tab ul-about-tab">
                        <div class="ul-about-tab-img"><img src="assets/img/contact-img.jpg" alt="Nos Objectifs"></div>
                        <div class="ul-about-tab-txt">
                            <h3 class="ul-about-tab-title">Notre Objectif</h3>
                            <p class="ul-about-tab-descr">D'ici 2027, Save Us vise à doubler sa capacité d'intervention pour porter assistance à 10 000 personnes par an, tout en renforçant nos programmes de réinsertion et d'éducation.</p>
                            <ul class="ul-about-tab-list">
                                <li><strong>2025 :</strong> Évacuer 2 000 personnes supplémentaires</li>
                                <li><strong>2025 :</strong> Ouvrir 3 nouveaux centres d'hébergement en Europe</li>
                                <li><strong>2026 :</strong> Scolariser 5 000 enfants déplacés</li>
                                <li><strong>2027 :</strong> Former et employer 1 000 femmes réfugiées</li>
                            </ul>
                            <p class="ul-about-tab-descr mt-3">Ces objectifs ne sont atteignables qu'avec votre soutien. <a href="faire-un-don.html" style="color:var(--ul-primary)">Faites un don</a> ou <a href="devenir-benevole.html" style="color:var(--ul-primary)">devenez bénévole</a>.</p>
                        </div>
                    </div>
                </div>
                <div class="tab-navs ul-about-tabs-nav">
                    <button class="tab-nav active" data-tab="tab-mission">Notre Mission</button>
                    <button class="tab-nav" data-tab="tab-vision">Notre Vision</button>
                    <button class="tab-nav" data-tab="tab-objectif">Notre Objectif</button>
                </div>
            </div>
            <div class="ul-events-vectors"><img src="assets/img/events-vector-2.svg" alt="" class="vector-2"></div>
        </div>
    </section>
    ${ctaBand}`);

// --- FAIRE UN DON ---
const faireUnDonPage = pageShell('Faire un don', 'don', `
    ${breadcrumb('Faire un don')}
    <section class="ul-section-spacing">
        <div class="ul-container">
            <div class="ul-section-heading text-center justify-content-center mb-5 wow animate__fadeInUp">
                <div>
                    <span class="ul-section-sub-title">Votre générosité compte</span>
                    <h2 class="ul-section-title">Faire un don à Save Us</h2>
                    <p class="ul-section-descr mt-3">100 % de votre don est affecté à nos programmes sur le terrain. Reçu fiscal disponible pour les résidents français.</p>
                </div>
            </div>
            <div class="row gy-5 align-items-start">
                <div class="col-lg-7">
                    <div class="ul-donate-form-wrapper save-us-form-card">
                        <h3 class="ul-donate-form-title">Formulaire de don</h3>
                        <form action="#" class="ul-donate-form-extended save-us-form">
                            <div class="row ul-bs-row gy-3">
                                <div class="col-md-6"><div class="form-group"><label for="don-prenom">Prénom *</label><input type="text" id="don-prenom" name="prenom" required placeholder="Votre prénom"></div></div>
                                <div class="col-md-6"><div class="form-group"><label for="don-nom">Nom *</label><input type="text" id="don-nom" name="nom" required placeholder="Votre nom"></div></div>
                                <div class="col-md-6"><div class="form-group"><label for="don-email">Email *</label><input type="email" id="don-email" name="email" required placeholder="votre@email.com"></div></div>
                                <div class="col-md-6"><div class="form-group"><label for="don-tel">Téléphone</label><input type="tel" id="don-tel" name="telephone" placeholder="+33 6 00 00 00 00"></div></div>
                                <div class="col-12"><div class="form-group"><label>Montant du don *</label>
                                    <div class="ul-donate-form mt-2" style="display:flex;flex-wrap:wrap;gap:10px">
                                        <div><input type="radio" name="donate-amount" id="d-25" value="25" checked hidden><label for="d-25" class="ul-donate-form-label">25 000 FCFA</label></div>
                                        <div><input type="radio" name="donate-amount" id="d-50" value="50" hidden><label for="d-50" class="ul-donate-form-label">50 000 FCFA</label></div>
                                        <div><input type="radio" name="donate-amount" id="d-100" value="100" hidden><label for="d-100" class="ul-donate-form-label">100 000 FCFA</label></div>
                                        <div><input type="radio" name="donate-amount" id="d-250" value="250" hidden><label for="d-250" class="ul-donate-form-label">250 000 FCFA</label></div>
                                        <div><input type="radio" name="donate-amount" id="d-custom" value="custom" hidden><label for="d-custom" class="ul-donate-form-label"><input type="number" name="custom-amount" placeholder="Autre montant" class="ul-donate-form-custom-input" style="width:100px"></label></div>
                                    </div>
                                </div></div>
                                <div class="col-12"><div class="form-group"><label for="don-projet">Affecter mon don à</label>
                                    <select id="don-projet" name="projet">
                                        <option value="general">Fonds général (là où le besoin est le plus urgent)</option>
                                        <option value="evacuation">Évacuation d'urgence</option>
                                        <option value="hebergement">Hébergement temporaire</option>
                                        <option value="education">École mobile</option>
                                        <option value="sante">Soins médicaux</option>
                                    </select>
                                </div></div>
                                <div class="col-12"><div class="form-group"><label for="don-message">Message (optionnel)</label><textarea id="don-message" name="message" rows="3" placeholder="Un mot pour nos équipes..."></textarea></div></div>
                                <div class="col-12"><label class="ul-checkbox-wrapper"><input type="checkbox" name="recu" id="don-recu"><span class="ul-checkbox"><i class="flaticon-tick"></i></span><span class="ul-checkbox-txt">Je souhaite recevoir un reçu fiscal</span></label></div>
                                <div class="col-12"><button type="submit" class="ul-btn"><i class="flaticon-fast-forward-double-right-arrows-symbol"></i> Confirmer mon don</button></div>
                                <div class="col-12"><div class="form-success-msg d-none">Merci infiniment ! Votre don a bien été enregistré. Un email de confirmation vous sera envoyé.</div></div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="ul-donate-form-section-txt" style="border-radius:20px;padding:40px">
                        <span class="ul-section-sub-title text-white">Impact de votre don</span>
                        <h2 class="ul-section-title text-white mb-4">Où va votre argent ?</h2>
                        <ul class="text-white" style="list-style:none;padding:0">
                            <li class="mb-3"><strong>25 000 FCFA</strong> — Kit de survie (nourriture, eau, couverture)</li>
                            <li class="mb-3"><strong>50 000 FCFA</strong> — Consultation médicale d'urgence</li>
                            <li class="mb-3"><strong>100 000 FCFA</strong> — Une semaine d'hébergement pour une famille</li>
                            <li class="mb-3"><strong>250 000 FCFA</strong> — Évacuation sécurisée d'une famille</li>
                            <li class="mb-3"><strong>500 000 FCFA</strong> — Scolarisation d'un enfant pendant un an</li>
                        </ul>
                        <div class="ul-donation-progress mt-4">
                            <div class="donation-progress-container ul-progress-container">
                                <div class="donation-progressbar ul-progressbar" data-ul-progress-value="72"><div class="donation-progress-label ul-progress-label"></div></div>
                            </div>
                            <div class="ul-donation-progress-labels">
                                <span class="ul-donation-progress-label">Collecté : 1 440 000 FCFA</span>
                                <span class="ul-donation-progress-label">Objectif 2025 : 2 000 000 FCFA</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`);

// --- DEVENIR BENEVOLE ---
const devenirBenevolePage = pageShell('Devenir bénévole', 'benevole', `
    ${breadcrumb('Devenir bénévole')}
    <section class="ul-why-join ul-section-spacing">
        <div class="ul-container">
            <div class="row row-cols-md-2 row-cols-1 gy-5 align-items-center">
                <div class="col">
                    <div class="ul-why-join-img"><img src="assets/img/why-join.jpg" alt="Bénévoles Save Us"></div>
                </div>
                <div class="col">
                    <div class="ul-why-join-txt">
                        <span class="ul-section-sub-title">Rejoignez-nous</span>
                        <h2 class="ul-section-title">Pourquoi devenir bénévole ?</h2>
                        <p class="ul-section-descr">Nos bénévoles sont le cœur battant de Save Us. Sur le terrain ou depuis la France, ils accueillent, traduisent, organisent et soutiennent les familles en reconstruction.</p>
                        <div class="ul-accordion">
                            <div class="ul-single-accordion-item open">
                                <div class="ul-single-accordion-item__header"><div class="left"><h3 class="ul-single-accordion-item__title">Un impact direct et mesurable</h3></div><span class="icon"><i class="flaticon-next"></i></span></div>
                                <div class="ul-single-accordion-item__body"><p>Chaque heure de bénévolat se traduit concrètement : une famille accueillie, un enfant scolarisé, une femme accompagnée vers l'emploi.</p></div>
                            </div>
                            <div class="ul-single-accordion-item">
                                <div class="ul-single-accordion-item__header"><div class="left"><h3 class="ul-single-accordion-item__title">Formation et accompagnement</h3></div><span class="icon"><i class="flaticon-next"></i></span></div>
                                <div class="ul-single-accordion-item__body"><p>Tous nos bénévoles bénéficient d'une formation initiale de 2 jours et d'un parrainage par un bénévole expérimenté.</p></div>
                            </div>
                            <div class="ul-single-accordion-item">
                                <div class="ul-single-accordion-item__header"><div class="left"><h3 class="ul-single-accordion-item__title">Missions variées</h3></div><span class="icon"><i class="flaticon-next"></i></span></div>
                                <div class="ul-single-accordion-item__body"><p>Accueil, logistique, traduction, soutien administratif, communication, collecte de fonds — il y a une place pour chaque compétence.</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="ul-inner-contact ul-section-spacing pt-0">
        <div class="ul-section-heading justify-content-center text-center">
            <div>
                <span class="ul-section-sub-title">Candidature</span>
                <h2 class="ul-section-title">Formulaire de bénévolat</h2>
            </div>
        </div>
        <div class="ul-inner-contact-container">
            <form action="#" class="ul-contact-form ul-form save-us-form ul-donate-form-extended">
                <div class="row row-cols-md-2 row-cols-1 ul-bs-row">
                    <div class="col"><div class="form-group"><input type="text" name="prenom" required placeholder="Prénom *"></div></div>
                    <div class="col"><div class="form-group"><input type="text" name="nom" required placeholder="Nom *"></div></div>
                    <div class="col"><div class="form-group"><input type="email" name="email" required placeholder="Email *"></div></div>
                    <div class="col"><div class="form-group"><input type="tel" name="telephone" required placeholder="Téléphone *"></div></div>
                    <div class="col"><div class="form-group"><input type="text" name="ville" required placeholder="Ville de résidence *"></div></div>
                    <div class="col"><div class="form-group">
                        <select name="disponibilite" required>
                            <option value="">Disponibilité *</option>
                            <option value="weekend">Week-ends</option>
                            <option value="semaine">En semaine</option>
                            <option value="flexible">Flexible</option>
                            <option value="terrain">Mission terrain (longue durée)</option>
                        </select>
                    </div></div>
                    <div class="col-12"><div class="form-group"><label class="mb-2 d-block">Compétences / domaines d'intérêt</label>
                        <div class="volunteer-skills">
                            <label><input type="checkbox" name="skills" value="accueil" hidden><span>Accueil</span></label>
                            <label><input type="checkbox" name="skills" value="traduction" hidden><span>Traduction</span></label>
                            <label><input type="checkbox" name="skills" value="sante" hidden><span>Santé</span></label>
                            <label><input type="checkbox" name="skills" value="education" hidden><span>Éducation</span></label>
                            <label><input type="checkbox" name="skills" value="logistique" hidden><span>Logistique</span></label>
                            <label><input type="checkbox" name="skills" value="communication" hidden><span>Communication</span></label>
                            <label><input type="checkbox" name="skills" value="juridique" hidden><span>Juridique</span></label>
                        </div>
                    </div></div>
                    <div class="col-12"><div class="form-group"><textarea name="motivation" required placeholder="Pourquoi souhaitez-vous rejoindre Save Us ? *" rows="5"></textarea></div></div>
                    <div class="col-12"><label class="ul-checkbox-wrapper"><input type="checkbox" name="rgpd" required hidden><span class="ul-checkbox"><i class="flaticon-tick"></i></span><span class="ul-checkbox-txt">J'accepte que mes données soient traitées conformément à la politique de confidentialité *</span></label></div>
                    <div class="col-12 text-center">
                        <button type="submit" class="ul-btn"><i class="flaticon-fast-forward-double-right-arrows-symbol"></i> Envoyer ma candidature</button>
                        <div class="form-success-msg d-none">Merci ! Votre candidature a été envoyée. Notre équipe vous contactera sous 5 jours ouvrés.</div>
                    </div>
                </div>
            </form>
        </div>
    </section>`);

// --- ACTIVITES ---
const activitesList = [
  ['evacuation', 'donation-1.jpg', 'Sécurité', 'Évacuation d\'urgence', 'Extraction sécurisée des enfants et femmes menacés dans les zones de combat.'],
  ['hebergement', 'donation-2.jpg', 'Logement', 'Hébergement temporaire', 'Centres d\'accueil sécurisés pour les familles déplacées par les conflits.'],
  ['education', 'donation-3.jpg', 'Éducation', 'École mobile', 'Continuité scolaire pour les enfants privés d\'école à cause de la guerre.'],
  ['sante', 'donation-4.jpg', 'Santé', 'Soins médicaux d\'urgence', 'Accès aux soins pour les blessés et aux soins maternels en zone de crise.'],
  ['psychologie', 'blog-1.jpg', 'Bien-être', 'Soutien psychologique', 'Thérapie et groupes de parole pour surmonter les traumatismes de guerre.'],
  ['reinsertion', 'blog-2.jpg', 'Emploi', 'Réinsertion & autonomie', 'Formation professionnelle et aide à l\'emploi pour les femmes réfugiées.'],
].map(([id, img, tag, title, excerpt]) => `
    <div class="col">
        <div class="save-us-activite-card wow animate__fadeInUp">
            <div class="card-img"><img src="assets/img/${img}" alt="${title}"></div>
            <div class="card-body">
                <span class="card-tag">${tag}</span>
                <h3 class="card-title"><a href="activite-details.html?id=${id}">${title}</a></h3>
                <p class="card-excerpt">${excerpt}</p>
                <a href="activite-details.html?id=${id}" class="card-link">Découvrir l'activité <i class="flaticon-next"></i></a>
            </div>
        </div>
    </div>`).join('');

const activitesPage = pageShell('Nos Activités', 'activites', `
    ${breadcrumb('Nos Activités')}
    <section class="ul-section-spacing">
        <div class="ul-container">
            <div class="ul-section-heading text-center justify-content-center mb-5 wow animate__fadeInUp">
                <div>
                    <span class="ul-section-sub-title">Sur le terrain</span>
                    <h2 class="ul-section-title">Nos activités humanitaires</h2>
                    <p class="ul-section-descr mt-3">Découvrez les programmes que nous déployons pour protéger et reconstruire la vie des enfants et des femmes touchés par la guerre.</p>
                </div>
            </div>
            <div class="row row-cols-md-3 row-cols-1 ul-bs-row gy-4">${activitesList}</div>
        </div>
    </section>
    ${ctaBand}`);

// --- DETAIL PAGES ---
const activiteDetailsPage = pageShell('Détail activité', 'activites', `
    ${breadcrumb('Détail activité', { href: 'activites.html', label: 'Nos Activités' })}
    <div class="ul-container ul-section-spacing overflow-hidden" id="activite-detail"></div>
    ${ctaBand}`, '', '<script src="assets/js/save-us-data.js"></script>');

const actualiteDetailsPage = pageShell('Détail actualité', 'actualites', `
    ${breadcrumb('Détail actualité', { href: 'actualites.html', label: 'Actualités' })}
    <div class="ul-section-spacing">
        <div class="ul-container" id="actualite-detail"></div>
    </div>
    ${ctaBand}`, '', '<script src="assets/js/save-us-data.js"></script>');

const pages = {
  'index.html': indexPage,
  'actualites.html': actualitesPage,
  'a-propos.html': aProposPage,
  'faire-un-don.html': faireUnDonPage,
  'devenir-benevole.html': devenirBenevolePage,
  'activites.html': activitesPage,
  'activite-details.html': activiteDetailsPage,
  'actualite-details.html': actualiteDetailsPage,
};

await rm(DIST, { recursive: true, force: true });
await mkdir(DIST, { recursive: true });
await cp(join(ROOT, 'assets'), join(DIST, 'assets'), { recursive: true });
console.log('Copied: assets/ → dist/assets/\n');

for (const [file, content] of Object.entries(pages)) {
  await writeFile(join(DIST, file), content, 'utf8');
  console.log(`Generated: dist/${file}`);
}

console.log('\nBuild complete! Output in dist/');
