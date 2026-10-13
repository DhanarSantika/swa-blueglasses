(() => {
  try {
    document.documentElement.dataset.theme =
      localStorage.getItem('blueglasses-theme') === 'light' ? 'light' : 'dark';
  } catch {
    document.documentElement.dataset.theme = 'dark';
  }
})();
