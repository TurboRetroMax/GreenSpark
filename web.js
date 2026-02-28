document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links li');

  burger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');

    navItems.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
      }
    });

    burger.classList.toggle('toggle');
  });


  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('nav-active')) {
        navLinks.classList.remove('nav-active');
        burger.classList.remove('toggle');
        navItems.forEach(item => (item.style.animation = ''));
      }
    });
  });


  const sections = document.querySelectorAll('section');

  const revealSection = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  };

  const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
  });

  sections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    sectionObserver.observe(section);
  });
});

window.addEventListener('load', () => {
  const welcomeScreen = document.querySelector('.welcome-screen');
  const enterBtn = document.getElementById('enter-btn');

  document.body.style.overflow = 'hidden';

  enterBtn.addEventListener('click', () => {

    welcomeScreen.classList.add('hidden');


    setTimeout(() => {
      document.body.style.overflow = 'auto';
    }, 1000); 
  });
});

function animateCount(id, target) {
  const el = document.getElementById(id);
  let count = 0, step = Math.ceil(target/60);
  const interval = setInterval(()=> {
    count += step;
    if(count >= target) { count = target; clearInterval(interval);}
    el.textContent = count;
  }, 20);
}
window.onload = ()=>{
  animateCount("count1", 540);
  animateCount("count2", 10000);
  animateCount("count3", 85);
};
