// Registers the service worker and shows a custom "Install app" button when
// the browser fires `beforeinstallprompt`. Resolves all asset URLs relative to
// this script so it can be loaded from pages at any depth.
(() => {
  const script = document.currentScript;
  const swUrl = new URL('sw.js', script.src).href;
  const scope = new URL('./', script.src).href;

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register(swUrl, { scope }).catch(() => {});
    });
  }

  let deferredPrompt = null;
  let installBtn = null;

  function ensureButton() {
    if (installBtn) return installBtn;
    installBtn = document.createElement('button');
    installBtn.id = 'pwa-install-btn';
    installBtn.type = 'button';
    installBtn.textContent = 'Install app';
    installBtn.setAttribute('aria-label', 'Install Insights as an app');
    installBtn.style.cssText = [
      'position:fixed',
      'right:16px',
      'bottom:16px',
      'z-index:9999',
      'padding:10px 16px',
      'border:none',
      'border-radius:999px',
      'background:#1e3a8a',
      'color:#fff',
      "font:600 14px/1 'Segoe UI',Tahoma,Geneva,Verdana,sans-serif",
      'box-shadow:0 4px 12px rgba(30,58,138,0.3)',
      'cursor:pointer'
    ].join(';');
    installBtn.addEventListener('click', async () => {
      if (!deferredPrompt) return;
      installBtn.disabled = true;
      deferredPrompt.prompt();
      try { await deferredPrompt.userChoice; } catch (_) {}
      deferredPrompt = null;
      removeButton();
    });
    const attach = () => document.body && document.body.appendChild(installBtn);
    if (document.body) attach();
    else window.addEventListener('DOMContentLoaded', attach, { once: true });
    return installBtn;
  }

  function removeButton() {
    if (installBtn && installBtn.parentNode) installBtn.parentNode.removeChild(installBtn);
    installBtn = null;
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    ensureButton();
  });

  window.addEventListener('appinstalled', () => {
    removeButton();
    deferredPrompt = null;
  });
})();
