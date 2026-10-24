'use strict';
(() => {
  const params = new URLSearchParams(window.location.search);
  // Remove the one-use authorization response from the visible URL immediately.
  window.history.replaceState(null, '', window.location.pathname);
  const status = document.getElementById('status');
  const state = params.get('state');
  const hasCode = params.has('code');
  const hasError = params.has('error');
  if (params.getAll('state').length !== 1 || !/^[A-Za-z0-9_-]{24,256}$/.test(state || '') ||
      hasCode === hasError || params.has('access_token') ||
      (hasCode && (params.getAll('code').length !== 1 || !params.get('code') || params.get('code').length > 16384)) ||
      (hasError && (params.getAll('error').length !== 1 || !/^[A-Za-z0-9_]{1,128}$/.test(params.get('error'))))) {
    status.textContent = 'Geçerli bir giriş dönüşü bulunamadı. Bağlantıyı açık FastTrack Windows uygulamasının Hesaplar ekranından yeniden başlatın.';
    return;
  }
  // Fixed loopback destination: incoming parameters can never choose a host or port.
  const target = new URL('http://localhost:8811/oauth/threads/callback');
  target.searchParams.set('state', state);
  target.searchParams.set(hasCode ? 'code' : 'error', params.get(hasCode ? 'code' : 'error'));
  status.textContent = 'FastTrack Windows uygulamasına dönülüyor… Uygulamanın bu bilgisayarda açık olması gerekir.';
  window.location.replace(target.href);
})();
