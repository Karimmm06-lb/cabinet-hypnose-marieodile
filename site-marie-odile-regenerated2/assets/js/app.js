document.addEventListener('DOMContentLoaded', () => {
  // 👉 Quand la page est totalement chargée, on ajoute une classe au <body>
  //    pour déclencher une animation CSS d'apparition globale.
  document.body.classList.add('is-loaded');

  // 👉 Animation de fade-in pour tous les éléments ayant la classe .will-fade
  const fadingEls = document.querySelectorAll('.will-fade');

  // On crée un observateur qui détecte si un élément entre dans la zone visible
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Si l’élément devient visible (threshold 20%), on lance l’animation
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          // On arrête d'observer cet élément car l'animation ne doit se produire qu'une fois
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 } // 20 % visible pour déclencher l’effet
  );

  // On applique l’observateur à chaque élément concerné
  fadingEls.forEach((el) => observer.observe(el));

  // 👉 Remplacement des iframes Acuity par un message de prise de RDV sécurisé
  const phoneHref = '+33652353671';
  const phoneDisplay = '06 52 35 36 71';
  const email = 'marieodilemath@gmail.com';

  document.querySelectorAll('iframe.acuity').forEach((iframe) => {
    // On crée un bloc de remplacement
    const wrapper = document.createElement('div');
    wrapper.className = 'book-by-phone';

    // Message alternatif pour réserver
    wrapper.innerHTML = `
      <h2 id="reserver" class="section-title">Réserver</h2>
      <p>Pour prendre rendez-vous, merci d'appeler au
        <a href="tel:${phoneHref}">${phoneDisplay}</a>
        ou d'envoyer un email à
        <a href="mailto:${email}">${email}</a>.
      </p>`;

    // On remplace l’iframe par notre message
    iframe.parentNode.replaceChild(wrapper, iframe);
  });

  // 👉 Création du bouton flottant "Me contacter" (si non déjà présent)
  if (!document.getElementById('site-contact-btn')) {
    const a = document.createElement('a');
    a.id = 'site-contact-btn';
    a.href = 'contact.html';
    a.title = 'Me contacter';
    a.setAttribute('aria-label', 'Me contacter');

    // Style du bouton flottant
    a.style.position = 'fixed';
    a.style.left = '18px';
    a.style.bottom = '18px';
    a.style.zIndex = '60';
    a.style.background = '#3d6a64';
    a.style.color = '#fff';
    a.style.padding = '12px 14px';
    a.style.borderRadius = '999px';
    a.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
    a.style.fontWeight = '700';
    a.style.textDecoration = 'none';
    a.style.display = 'inline-flex';
    a.style.alignItems = 'center';
    a.style.gap = '8px';

    // Contenu du bouton
    a.innerHTML = '📞 Me contacter';

    document.body.appendChild(a);
  }

  // 👉 Remplacement automatique des liens Acuity restants (liens <a>)
  document.querySelectorAll('a[href*="as.me/schedule.php"]').forEach((el) => {
    const p = document.createElement('p');
    p.className = 'mt-4';
    p.innerHTML = `Pour prendre rendez-vous, appelez au
      <a href="tel:${phoneHref}">${phoneDisplay}</a>
      ou écrivez à
      <a href="mailto:${email}">${email}</a>.`;

    // On remplace le lien par notre message
    el.parentNode.replaceChild(p, el);
  });

  // 👉 FAQ : ouverture / fermeture des questions
  document.querySelectorAll('.faq-item button').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Optionnel : fermer les autres éléments déjà ouverts
      document.querySelectorAll('.faq-item.open').forEach((i) => {
        if (i !== item) i.classList.remove('open');
      });

      // Ouvre ou ferme l’item actuel
      item.classList.toggle('open', !isOpen);
    });
  });
});
