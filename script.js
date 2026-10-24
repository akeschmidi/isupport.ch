// Screenshot lightbox: gallery links open the full image in a native <dialog>; arrows step through the same gallery.
const galleries = document.querySelectorAll('.gallery');

if (galleries.length) {
    const lightbox = document.createElement('dialog');
    lightbox.className = 'lightbox';
    lightbox.setAttribute('aria-label', 'Screenshot');
    lightbox.innerHTML = `
        <button type="button" class="lightbox-close" aria-label="Schliessen">&times;</button>
        <button type="button" class="lightbox-prev" aria-label="Vorheriges Bild">&lsaquo;</button>
        <figure><img alt=""><figcaption></figcaption></figure>
        <button type="button" class="lightbox-next" aria-label="Nächstes Bild">&rsaquo;</button>
    `;
    document.body.append(lightbox);

    const image = lightbox.querySelector('img');
    const caption = lightbox.querySelector('figcaption');
    let links = [];
    let index = 0;

    const show = (i) => {
        index = (i + links.length) % links.length;
        const thumb = links[index].querySelector('img');
        image.src = links[index].href;
        image.alt = thumb.alt;
        caption.textContent = thumb.alt;
    };

    galleries.forEach((gallery) => {
        gallery.addEventListener('click', (event) => {
            const link = event.target.closest('a');
            if (!link) return;
            event.preventDefault();
            links = [...gallery.querySelectorAll('a')];
            show(links.indexOf(link));
            lightbox.showModal();
        });
    });

    lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
    lightbox.querySelector('.lightbox-prev').addEventListener('click', () => show(index - 1));
    lightbox.querySelector('.lightbox-next').addEventListener('click', () => show(index + 1));
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) lightbox.close();
    });
    lightbox.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') show(index - 1);
        if (event.key === 'ArrowRight') show(index + 1);
    });
}
