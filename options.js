document.addEventListener('DOMContentLoaded', function() {
  var themeSelect = document.getElementById('theme');
  var opacityRange = document.getElementById('opacity');

  chrome.storage.sync.get(['theme', 'opacity'], function(items) {
    if (items.theme) {
      themeSelect.value = items.theme;
    }

    if (items.opacity) {
      opacityRange.value = items.opacity;
    }
  });

  document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    var theme = themeSelect.value;
    var opacity = opacityRange.value;
    chrome.storage.sync.set({
      theme: theme,
      opacity: opacity
    }, function() {
      alert('Options saved.');
    });
  });
});
