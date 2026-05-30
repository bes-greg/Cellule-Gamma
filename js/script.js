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