document.addEventListener('DOMContentLoaded', function() {
  const appsBtn = document.getElementById('apps-menu-btn');
  const appsDropdown = document.getElementById('apps-menu-dropdown');
  if (appsBtn && appsDropdown) {
    appsBtn.addEventListener('mouseenter', () => {
      appsDropdown.classList.remove('opacity-0', 'pointer-events-none');
      appsDropdown.classList.add('opacity-100');
    });
    appsBtn.addEventListener('mouseleave', () => {
      setTimeout(() => {
        if (!appsDropdown.matches(':hover')) {
          appsDropdown.classList.add('opacity-0', 'pointer-events-none');
          appsDropdown.classList.remove('opacity-100');
        }
      }, 100);
    });
    appsDropdown.addEventListener('mouseleave', () => {
      appsDropdown.classList.add('opacity-0', 'pointer-events-none');
      appsDropdown.classList.remove('opacity-100');
    });
    appsDropdown.addEventListener('mouseenter', () => {
      appsDropdown.classList.remove('opacity-0', 'pointer-events-none');
      appsDropdown.classList.add('opacity-100');
    });
  }
}); 