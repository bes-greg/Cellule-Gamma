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

genererDot();

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
