(() => {
  try {
    document.documentElement.dataset.theme =
      localStorage.getItem('blueglasses-theme') === 'light' ? 'light' : 'dark';
  } catch {
    document.documentElement.dataset.theme = 'dark';
  }
  const theme = document.documentElement.dataset.theme;
  const favicon = document.getElementById('site-favicon');
  if (favicon) favicon.href = `/favicon-${theme}.svg`;
})();
