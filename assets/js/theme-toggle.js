(function() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  function labelFor(theme) {
    return theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
  }

  toggle.setAttribute('aria-label', labelFor(document.documentElement.getAttribute('data-theme')));

  toggle.addEventListener('click', function() {
    const html = document.documentElement;
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    toggle.setAttribute('aria-label', labelFor(next));
  });
})();
