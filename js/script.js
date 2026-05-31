const loadingScreen = document.querySelector('.loadingScreen');
let numberOfDots = 0;

function genererDot() {
    if (numberOfDots < 5) {
        let dot = document.createElement('div');
        let classes = ['dotLight', 'dotPrimary', 'dotDark'];
        let randomClass = classes[Math.floor(Math.random() * classes.length)];
        dot.classList.add('dot');
        dot.classList.add(randomClass);

        loadingScreen.appendChild(dot);
        numberOfDots++;

        let randomX = Math.random() * (window.innerWidth - 20);
        dot.style.left = randomX + 'px';
        dot.style.top = '-100px';

        const hauteurDescente = window.innerHeight + 160;

        const animation = dot.animate([
            { transform: 'translateY(0px)' },
            { transform: `translateY(${hauteurDescente}px)` }
        ], {
            duration: 4000,
            easing: 'linear'
        });

        animation.onfinish = () => {
            dot.remove();
            numberOfDots--;
        };
    }
    let prochainDelai = Math.random() * (1500 - 200) + 200;

    setTimeout(genererDot, prochainDelai);
}

function loadGalerie() {
    fetch('json/galerie.json')
        .then(response => response.json())
        .then(data => {
            const gallery = document.getElementById('gallery');
            gallery.innerHTML = '';
            Object.values(data).forEach(item => {
                const galleryItem = document.createElement('div');
                galleryItem.classList.add('gallery-item');

                const img = document.createElement('img');
                img.src = item.url;
                img.alt = item.titre;

                const title = document.createElement('h4');
                title.textContent = item.titre;

                const divP = document.createElement('div');
                divP.classList.add('gallerieP');

                const author = document.createElement('p');
                author.classList.add('galleriePAstro');
                author.innerHTML = `${item.auteur || 'Auteur inconnu'}`;

                const date = document.createElement('p');
                date.classList.add('galleriePDate');
                date.innerHTML = `${item.date}`;

                divP.appendChild(author);
                divP.appendChild(date);

                galleryItem.appendChild(img);
                galleryItem.appendChild(title);
                galleryItem.appendChild(divP);
                gallery.appendChild(galleryItem);
            });
        })
        .catch(error => console.error('Erreur lors du chargement de la galerie :', error));
}

function loadDashboard() {
    fetch('json/dashboard.json')
        .then(response => response.json())
        .then(data => {
            const dashboard = document.getElementById('dashboard');
            dashboard.innerHTML = '';

            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    const item = data[key];
                    const card = document.createElement('div');
                    card.classList.add('card');

                    const title = document.createElement('h3');
                    title.classList.add('card-title');
                    title.textContent = "> " + item.titre;
                    card.appendChild(title);

                    const date = document.createElement('p');
                    date.classList.add('card-date');
                    date.innerHTML = `<span>$_Date : </span>${item.date}`;
                    card.appendChild(date);

                    const status = document.createElement('p');
                    status.classList.add('card-status');
                    status.innerHTML = `<span>$_Statut : </span>${item.statut}`;
                    card.appendChild(status);

                    const description = document.createElement('p');
                    description.classList.add('card-description');
                    description.innerHTML = `<span>$_Description : </span>${item.description}`;
                    card.appendChild(description);

                    dashboard.appendChild(card);
                }
            }
        })
        .catch(error => console.error('Erreur lors du chargement du dashboard :', error));
}


function loadAlertes(connected = false) {
    fetch('json/alertes.json')
        .then(response => response.json())
        .then(data => {
            data = data[0];
            const alertesMini = document.getElementById('alertesMini');
            alertesMini.innerHTML = '';

            const alertes = document.getElementById('alertes');
            alertes.innerHTML = '';

            let titreMini = document.createElement('h4');
            titreMini.classList.add('alert-title');
            titreMini.innerHTML = `<div class='alert-icon'></div> ${data.titre}`;
            alertesMini.appendChild(titreMini);
            alertesMini.addEventListener('click', () => {
                alertes.style.display = 'block';
                alertesMini.style.display = 'none';
            });


            let titre = document.createElement('h3');
            titre.classList.add('alert-title');
            titre.innerHTML = "<div class='alert-icon'></div> Alerte en cours:";

            let closeButton = document.createElement('button');
            closeButton.classList.add('close-button');
            closeButton.textContent = "X";
            closeButton.addEventListener('click', () => {
                alertes.style.display = 'none';
                alertesMini.style.display = 'block';
            });
            titre.appendChild(closeButton);

            let sousTitre = document.createElement('h4');
            sousTitre.classList.add('alert-sous-titre');
            sousTitre.textContent = data.titre;

            alertes.appendChild(titre);
            alertes.appendChild(sousTitre);

            if (connected === true) {
                let divStatus = document.createElement('div');
                divStatus.classList.add('alert-status-container');
                const status = document.createElement('p');
                status.classList.add('alert-status');
                status.innerHTML = `${data.statut}`;
                divStatus.appendChild(status);

                const switchButton = document.createElement('button');
                let toEnCours;

                if (data.statut === "Caché") {
                    switchButton.classList.add('switch-button');
                    switchButton.textContent = "Rendre public";
                    toEnCours = true;
                } else {
                    switchButton.classList.add('switch-button');
                    switchButton.textContent = "Rendre confidentiel";
                    toEnCours = false;
                }

                switchButton.addEventListener('click', () => {
                    fetch('php/update_alert_status.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ data: data, enCours: toEnCours })
                    })
                        .then(response => response.json())
                        .then(result => {
                            if (result.success) {
                                loadAlertes(connected);
                            }
                        })
                        .catch(error => console.error('Erreur lors de la mise à jour du statut de l\'alerte :', error));
                });
                divStatus.appendChild(switchButton);
                alertes.appendChild(divStatus);
            }

            const description = document.createElement('p');
            description.classList.add('alert-description');
            description.innerHTML = `${data.description}`;
            alertes.appendChild(description);
        })
        .catch(error => console.error('Erreur lors du chargement des alertes :', error));
}


function loadDecouvertes() {
    fetch('json/decouvertes.json')
        .then(response => response.json())
        .then(data => {
            const decouvertes = document.getElementById('decouvertes');
            decouvertes.innerHTML = '';

            Object.values(data).forEach(item => {
                const decouvertesItem = document.createElement('div');
                decouvertesItem.classList.add('decouvertes-item');

                const img = document.createElement('img');
                img.src = item.url;
                img.alt = item.titre;

                const title = document.createElement('h4');
                title.textContent = item.titre;

                const divP = document.createElement('div');
                divP.classList.add('gallerieP');



                const date = document.createElement('p');
                date.classList.add('galleriePDate');
                date.innerHTML = `${item.date}`;

                divP.appendChild(date);

                decouvertesItem.appendChild(img);
                decouvertesItem.appendChild(title);
                decouvertesItem.appendChild(divP);
                decouvertes.appendChild(decouvertesItem);
                decouvertesItem.addEventListener('click', () => {
                    const modal = document.createElement('div');
                    modal.classList.add('modalDecouvertes');

                    const modalContent = document.createElement('div');
                    modalContent.classList.add('modal-content');

                    const closeButton = document.createElement('span');
                    closeButton.classList.add('closeButtonDecouvertes');
                    closeButton.innerHTML = '&times;';
                    closeButton.addEventListener('click', () => {
                        modal.remove();
                    });

                    const imgModal = document.createElement('img');
                    imgModal.src = item.url;
                    imgModal.alt = item.titre;

                    const divTexts = document.createElement('div');
                    divTexts.classList.add('modal-texts');

                    const titleModal = document.createElement('h2');
                    titleModal.classList.add('modal-title');
                    titleModal.textContent = item.titre;

                    modalContent.appendChild(closeButton);
                    modalContent.appendChild(imgModal);
                    divTexts.appendChild(titleModal);
                    let divDesc = document.createElement('div');
                    if (item.descriptions) {
                        Object.values(item.descriptions).forEach(paragraphText => {
                            const p = document.createElement('p');
                            p.classList.add('modal-description');
                            p.textContent = paragraphText;
                            p.style.marginBottom = "5px";
                            divDesc.appendChild(p);
                        });
                    }

                    divTexts.appendChild(divDesc);

                    if (item["Q/A"]) {
                        // 1. Créer un conteneur global pour la FAQ à l'intérieur de la modale
                        const faqContainer = document.createElement('div');
                        faqContainer.classList.add('modal-faq-container');
                        faqContainer.style.marginTop = "30px"; // Espace avec les paragraphes du dessus

                        // 2. Parcourir les questions/réponses
                        Object.values(item["Q/A"]).forEach(faqData => {
                            const faqItem = document.createElement('div');
                            faqItem.classList.add('faq-item');

                            // L'en-tête (Question)
                            const faqHeader = document.createElement('div');
                            faqHeader.classList.add('faq-header');

                            const questionText = document.createElement('span');
                            questionText.classList.add('faq-question');
                            questionText.textContent = `Q. “${faqData.q}”`; // Récupère le "q" du JSON

                            const arrow = document.createElement('span');
                            arrow.classList.add('faq-arrow');
                            arrow.innerHTML = '&#9660;';

                            faqHeader.appendChild(questionText);
                            faqHeader.appendChild(arrow);

                            // Le corps (Réponse)
                            const faqBody = document.createElement('div');
                            faqBody.classList.add('faq-body');

                            const reponseText = document.createElement('p');
                            reponseText.classList.add('faq-reponse');
                            reponseText.textContent = `R. “${faqData.r}”`; // Récupère le "r" du JSON

                            faqBody.appendChild(reponseText);
                            faqItem.appendChild(faqHeader);
                            faqItem.appendChild(faqBody);
                            faqContainer.appendChild(faqItem);

                            // Logique d'ouverture au clic
                            faqHeader.addEventListener('click', (e) => {
                                e.stopPropagation(); // Évite que le clic ferme la modale par erreur
                                const isOpen = faqItem.classList.contains('open');

                                // Ferme les autres questions du même bloc
                                faqContainer.querySelectorAll('.faq-item').forEach(el => {
                                    el.classList.remove('open');
                                    el.querySelector('.faq-arrow').innerHTML = '&#9660;';
                                });

                                if (!isOpen) {
                                    faqItem.classList.add('open');
                                    arrow.innerHTML = '&#9650;';
                                }
                            });
                        });

                        // Injecter la FAQ dans la zone de texte de la modale
                        divTexts.appendChild(faqContainer);
                    }
                    modalContent.appendChild(divTexts);
                    modal.appendChild(modalContent);
                    decouvertes.appendChild(modal);
                });
            })
                .catch(error => console.error('Erreur lors du chargement des découvertes :', error));

        });
}

