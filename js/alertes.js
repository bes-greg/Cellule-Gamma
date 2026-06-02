function loadAlertes(connected = false) {
    fetch(`data/alertes.json?_=${new Date().getTime()}`)
        .then(response => response.json())
        .then(data => {
            data = data[0];
            const alertesMini = document.getElementById('alertesMini');
            alertesMini.innerHTML = '';

            const alertes = document.getElementById('alertes');
            alertes.innerHTML = '';

            if (!connected && data.statut === "Caché") {
                alertesMini.style.display = 'none';
                alertes.style.display = 'none';
                return;
            }

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

            if (connected) {
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
