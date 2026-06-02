function loadGalerie() {
    fetch('data/gallery.json')
        .then(response => response.json())
        .then(data => {
            const gallery = document.getElementById('gallery');
            gallery.innerHTML = '';
            Object.values(data).forEach(item => {
                const galleryItem = document.createElement('div');
                galleryItem.classList.add('gallery-item');

                const img = document.createElement('img');
                img.src = item.src;

                const divP = document.createElement('div');
                divP.classList.add('gallerieP');

                const author = document.createElement('p');
                author.classList.add('galleriePAstro');
                author.innerHTML = `${item.astronaut || 'Auteur inconnu'}`;

                const date = document.createElement('p');
                date.classList.add('galleriePDate');
                date.innerHTML = `${item.date}`;

                divP.appendChild(author);
                divP.appendChild(date);

                galleryItem.appendChild(img);
                galleryItem.appendChild(divP);
                gallery.appendChild(galleryItem);
            });
        })
        .catch(error => console.error('Erreur lors du chargement de la galerie :', error));
}

loadGalerie();