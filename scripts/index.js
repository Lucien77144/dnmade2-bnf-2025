
document.addEventListener('DOMContentLoaded', () => {
  fetch('../public/data/data.json')
    .then((response) => response.json())
    .then((data) => {
      document.querySelector('#title').textContent = data.title;

      gsap.fromTo(
        '#title',
        {
          opacity: 0,
        },
        {
          duration: 3,
          opacity: 1,
        }
      );
    });
});
