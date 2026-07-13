const SAVE_US_ACTIVITES = {
  evacuation: {
    id: 'evacuation',
    title: 'Évacuation d\'urgence',
    category: 'Sécurité',
    image: 'assets/img/donation-1.jpg',
    excerpt: 'Extraction sécurisée des enfants et femmes menacés dans les zones de combat.',
    zone: 'Ukraine, Moyen-Orient',
    beneficiaires: '1 200+ personnes',
    date: 'En cours depuis 2022',
    description: 'Notre programme d\'évacuation d\'urgence permet de retirer les populations les plus vulnérables des zones de guerre active. Nous coordonnons avec des partenaires locaux pour organiser des convois sécurisés, des points de rassemblement et des transferts vers des pays d\'accueil.',
    challenge: 'Les routes sont souvent coupées, les checkpoints dangereux et le temps est compté. Chaque minute peut faire la différence entre la vie et la mort pour une mère et ses enfants.',
    solution: 'Nous avons mis en place un réseau de correspondants sur le terrain, des véhicules dédiés et des protocoles d\'urgence testés. Nos équipes travaillent 24h/24 pour identifier les familles en danger prioritaire.',
    result: 'Plus de 1 200 enfants et femmes ont été évacués en sécurité vers des centres d\'hébergement temporaire en Europe et au Canada.'
  },
  hebergement: {
    id: 'hebergement',
    title: 'Hébergement temporaire',
    category: 'Logement',
    image: 'assets/img/donation-2.jpg',
    excerpt: 'Centres d\'accueil sécurisés pour les familles déplacées par les conflits.',
    zone: 'France, Belgique, Pologne',
    beneficiaires: '850 familles',
    date: '2023 – présent',
    description: 'Save Us gère et finance des centres d\'hébergement temporaire offrant un toit, des repas chauds et un environnement sécurisant aux femmes et enfants réfugiés.',
    challenge: 'L\'afflux massif de déplacés dépasse souvent les capacités des structures existantes, laissant des familles à la rue.',
    solution: 'Nous louons et aménageons des bâtiments, formons du personnel d\'accueil et assurons un suivi psychosocial dès l\'arrivée.',
    result: '850 familles ont trouvé un refuge digne en attendant une solution durable de réinstallation.'
  },
  education: {
    id: 'education',
    title: 'École mobile',
    category: 'Éducation',
    image: 'assets/img/donation-3.jpg',
    excerpt: 'Continuité scolaire pour les enfants privés d\'école à cause de la guerre.',
    zone: 'Zones de déplacement interne',
    beneficiaires: '2 400 enfants',
    date: '2024',
    description: 'Des unités pédagogiques mobiles se déplacent dans les camps et centres d\'hébergement pour maintenir l\'accès à l\'éducation des enfants déscolarisés.',
    challenge: 'La guerre interrompt brutalement le parcours scolaire, exposant les enfants à l\'analphabétisme et à l\'exploitation.',
    solution: 'Enseignants volontaires, matériel pédagogique adapté et programmes de soutien psychologique intégrés à l\'apprentissage.',
    result: '2 400 enfants ont repris un cursus adapté avec un taux de présence de 87 %.'
  },
  sante: {
    id: 'sante',
    title: 'Soins médicaux d\'urgence',
    category: 'Santé',
    image: 'assets/img/donation-4.jpg',
    excerpt: 'Accès aux soins pour les blessés et aux soins maternels en zone de crise.',
    zone: 'Frontières et camps',
    beneficiaires: '3 100 patients',
    date: 'En continu',
    description: 'Cliniques de campagne, kits médicaux et consultations spécialisées pour femmes enceintes et enfants malnutris.',
    challenge: 'Les hôpitaux locaux sont saturés ou détruits ; les femmes et enfants sont les premières victimes du manque de soins.',
    solution: 'Unités médicales mobiles, partenariats avec des ONG de santé et formation de premiers secours aux bénévoles.',
    result: '3 100 consultations réalisées, dont 420 accouchements assistés en toute sécurité.'
  },
  psychologie: {
    id: 'psychologie',
    title: 'Soutien psychologique',
    category: 'Bien-être',
    image: 'assets/img/blog-1.jpg',
    excerpt: 'Thérapie et groupes de parole pour surmonter les traumatismes de guerre.',
    zone: 'Tous nos centres',
    beneficiaires: '960 personnes',
    date: '2023 – présent',
    description: 'Psychologues et travailleurs sociaux accompagnent enfants et femmes victimes de violences, de pertes familiales et de déplacements forcés.',
    challenge: 'Le trauma post-traumatique non traité handicape la reconstruction et expose à des risques de dépression chronique.',
    solution: 'Séances individuelles, art-thérapie pour enfants et groupes de soutien entre pairs animés par des professionnels.',
    result: '78 % des participantes rapportent une amélioration significative de leur état émotionnel après 3 mois.'
  },
  reinsertion: {
    id: 'reinsertion',
    title: 'Réinsertion & autonomie',
    category: 'Emploi',
    image: 'assets/img/blog-2.jpg',
    excerpt: 'Formation professionnelle et aide à l\'emploi pour les femmes réfugiées.',
    zone: 'Europe de l\'Ouest',
    beneficiaires: '320 femmes',
    date: '2024 – présent',
    description: 'Programmes de formation linguistique, compétences numériques et micro-crédits pour permettre aux femmes de reconstruire une vie autonome.',
    challenge: 'Sans revenus stables, les femmes réfugiées restent dépendantes de l\'aide humanitaire et vulnérables à l\'exploitation.',
    solution: 'Partenariats avec des entreprises locales, mentorat et accompagnement administratif pour l\'accès à l\'emploi.',
    result: '320 femmes ont obtenu un emploi ou lancé une activité génératrice de revenus.'
  }
};

const SAVE_US_ACTUALITES = {
  campagne2025: {
    id: 'campagne2025',
    title: 'Lancement de la campagne « Enfants d\'abord » 2025',
    category: 'Campagne',
    author: 'Équipe Save Us',
    date: '15 Mars 2025',
    day: '15',
    month: 'Mar',
    image: 'assets/img/blog-b-1.jpg',
    excerpt: 'Une campagne nationale pour financer l\'évacuation de 500 enfants supplémentaires des zones de conflit.',
    content: [
      'Save Us lance aujourd\'hui sa campagne annuelle « Enfants d\'abord », visant à lever 2 millions d\'#s pour évacuer 500 enfants supplémentaires des zones de conflit actives.',
      'Face à l\'intensification des combats dans plusieurs régions, notre association renforce ses équipes sur le terrain et ouvre de nouveaux corridors humanitaires en partenariat avec les autorités locales et internationales.',
      'Chaque don, quel que soit son montant, contribue directement au financement des convois sécurisés, des soins médicaux d\'urgence et de l\'hébergement des familles accueillies.',
      'Rejoignez-nous : ensemble, nous pouvons offrir un avenir à ceux qui n\'ont plus de voix.'
    ]
  },
  partenariat: {
    id: 'partenariat',
    title: 'Nouveau partenariat avec l\'UNICEF',
    category: 'Partenariat',
    author: 'Direction Save Us',
    date: '28 Février 2025',
    day: '28',
    month: 'Fév',
    image: 'assets/img/blog-2.jpg',
    excerpt: 'Un accord historique pour renforcer la protection de l\'enfance en zone de guerre.',
    content: [
      'Save Us et l\'UNICEF ont signé un protocole de coopération visant à mutualiser leurs ressources pour la protection de l\'enfance dans les zones de conflit.',
      'Ce partenariat permettra de déployer des unités médicales mobiles supplémentaires et d\'étendre nos programmes d\'éducation d\'urgence à trois nouvelles régions.',
      '« Cette alliance renforce considérablement notre capacité d\'intervention », déclare Marie Dupont, directrice de Save Us. « Nos bénévoles et donateurs peuvent être fiers de contribuer à un impact encore plus large. »'
    ]
  },
  temoignage: {
    id: 'temoignage',
    title: 'Témoignage : Le parcours de Nadia et ses trois enfants',
    category: 'Témoignage',
    author: 'Rédaction',
    date: '10 Février 2025',
    day: '10',
    month: 'Fév',
    image: 'assets/img/blog-3.jpg',
    excerpt: 'De la fuite éperdue à la reconstruction : l\'histoire d\'une famille sauvée par nos équipes.',
    content: [
      'Nadia, 34 ans, a fui son village avec ses trois enfants âgés de 4 à 11 ans lorsque les bombardements ont détruit leur maison. Pendant cinq jours, la famille a marché sans eau ni nourriture suffisante.',
      'Contactée par un correspondant local, l\'équipe Save Us a organisé leur évacuation vers un centre d\'hébergement en Pologne, puis leur réinstallation en France.',
      '« Save Us nous a rendu notre dignité », confie Nadia. « Mes enfants sont retournés à l\'école et je suis en formation pour devenir aide-soignante. »',
      'Son histoire illustre pourquoi chaque don et chaque heure de bénévolat compte.'
    ]
  },
  benevoles: {
    id: 'benevoles',
    title: 'Recrutement de 50 nouveaux bénévoles en France',
    category: 'Bénévolat',
    author: 'Service Bénévoles',
    date: '5 Janvier 2025',
    day: '5',
    month: 'Jan',
    image: 'assets/img/event-img.jpg',
    excerpt: 'Rejoignez nos équipes d\'accueil, de traduction et de soutien psychologique.',
    content: [
      'Save Us recrute 50 bénévoles supplémentaires en France pour renforcer l\'accueil dans nos centres et accompagner les familles dans leurs démarches administratives.',
      'Nous recherchons particulièrement des personnes parlant l\'arabe, l\'ukrainien ou le farsi, ainsi que des professionnels de santé et de l\'éducation.',
      'Une formation de deux jours est offerte à tous les nouveaux bénévoles. Postulez dès maintenant via notre page Devenir bénévole.'
    ]
  },
  urgence: {
    id: 'urgence',
    title: 'Appel d\'urgence : situation critique dans l\'Est',
    category: 'Urgence',
    author: 'Cellule de crise',
    date: '20 Décembre 2024',
    day: '20',
    month: 'Déc',
    image: 'assets/img/blog-1.jpg',
    excerpt: 'Des centaines de familles piégées nécessitent une évacuation immédiate.',
    content: [
      'La cellule de crise Save Us a activé son protocole d\'urgence maximale suite à l\'aggravation de la situation humanitaire dans l\'Est européen.',
      'Plus de 300 familles — principalement des femmes et enfants — sont actuellement bloquées sans accès à l\'eau potable ni aux soins médicaux.',
      'Nous lançons un appel urgent à nos donateurs pour financer trois convois d\'évacuation dans les 72 prochaines heures. Chaque heure compte.'
    ]
  },
  bilan: {
    id: 'bilan',
    title: 'Bilan 2024 : 50 vies impactées',
    category: 'Bilan',
    author: 'Direction Save Us',
    date: '15 Décembre 2024',
    day: '15',
    month: 'Déc',
    image: 'assets/img/why-join.jpg',
    excerpt: 'Retour sur une année record d\'interventions humanitaires.',
    content: [
      'L\'année 2024 restera gravée dans l\'histoire de Save Us : 50 enfants et femmes ont bénéficié directement de nos programmes sur le terrain.',
      'Les chiffres clés : 1 200 évacuations, 850 familles hébergées, 2 400 enfants scolarisés et 320 femmes réinsérées professionnellement.',
      'Ces résultats sont le fruit du dévouement de 340 bénévoles et de la générosité de 10 donateurs. Merci à tous.'
    ]
  }
};
