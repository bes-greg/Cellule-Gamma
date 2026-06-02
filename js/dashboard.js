function loadDashboard() {
    fetch('data/dashboard.json')
        .then(response => response.json())
        .then(data => {
            const dashboard = document.getElementById('dashboard');
            dashboard.innerHTML = '';

            const items = Object.values(data);

            items.forEach((item, index) => {
                if (index > 0) {
                    const hr = document.createElement('hr');
                    hr.classList.add('card-separator');
                    dashboard.appendChild(hr);
                }

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
            });
        })
        .catch(error => console.error('Erreur lors du chargement du dashboard :', error));
}

document.addEventListener('DOMContentLoaded', loadDashboard);