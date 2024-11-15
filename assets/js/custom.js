document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.card');
  const mainImage = document.getElementById('main-image');

  if (!mainImage || cards.length === 0) {
    console.warn(
      'Required elements not found. Check if IDs and classes are correct.'
    );
    return;
  }

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      try {
        // Remove selected state from all cards
        cards.forEach((c) => {
          c.classList.remove(
            'selected',
            'bg-gray-50',
            'border',
            'border-gray-100',
            'rounded-xl'
          );
          const linkContainer = c.querySelector('.link-container');
          if (linkContainer) linkContainer.remove();

          const h3 = c.querySelector('h3');
          const p = c.querySelector('p');
          if (h3) {
            h3.classList.remove(
              'font-medium',
              'text-gray-950',
              'text-2xl',
              'leading-8'
            );
            h3.classList.add('text-2xl', 'text-gray-500', 'font-medium');
          }
          if (p) {
            p.classList.remove(
              'pt-3',
              'max-w-[300px]',
              'font-normal',
              'text-lg',
              'leading-7',
              'text-gray-700'
            );
            p.classList.add('mt-3', 'text-gray-500', 'text-lg', 'font-normal');
          }
        });

        // Add selected state to clicked card
        card.classList.add(
          'selected',
          'bg-gray-50',
          'border',
          'border-gray-100',
          'rounded-xl'
        );
        const linkContainer = document.createElement('div');
        linkContainer.classList.add(
          'link-container',
          'flex',
          'items-center',
          'gap-0',
          'mt-12'
        );
        linkContainer.innerHTML = `
          <a href="#" class="hover-effect">Learn More</a>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="#234EFB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        `;
        card.appendChild(linkContainer);

        // Update main image
        const newImageSrc = card.getAttribute('data-image');
        if (newImageSrc) {
          mainImage.src = newImageSrc;
        }

        // Update text styles
        const h3 = card.querySelector('h3');
        const p = card.querySelector('p');
        if (h3) {
          h3.classList.remove('text-2xl', 'text-gray-500', 'font-medium');
          h3.classList.add(
            'font-medium',
            'text-gray-950',
            'text-2xl',
            'leading-8'
          );
        }
        if (p) {
          p.classList.remove('mt-3', 'text-gray-500', 'text-lg', 'font-normal');
          p.classList.add(
            'pt-3',
            'max-w-[300px]',
            'font-normal',
            'text-lg',
            'leading-7',
            'text-gray-700'
          );
        }
      } catch (error) {
        console.error('Error in card click handler:', error);
      }
    });
  });
});
//counter
function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = progress * (end - start) + start;
    obj.innerHTML = end % 1 === 0 ? Math.floor(value) : value.toFixed(1);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

let hasAnimated = false;

function initCounters() {
  if (hasAnimated) return;

  const counter1 = document.getElementById('counter1');
  const counter2 = document.getElementById('counter2');
  const counter4 = document.getElementById('counter4');

  if (counter1 && isInViewport(counter1)) {
    animateValue(counter1, 6.0, 6.5, 1000);
    animateValue(counter2, 100, 160, 1000);
    animateValue(counter4, 400, 500, 1000);
    hasAnimated = true;
  }
}

document.addEventListener('DOMContentLoaded', initCounters);
window.addEventListener('scroll', initCounters);
