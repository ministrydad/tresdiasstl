/* =========================================================
   Loads the latest weekend dates and Secuela details saved
   from the admin page. If nothing is saved yet (or the site is
   opened without the server), the pages keep using the info in
   js/weekends.js and js/secuela.js.
   ========================================================= */
window.TDesc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

window.TDContent = {
  ready: (location.protocol.startsWith('http')
    ? fetch('/api/content', { headers: { Accept: 'application/json' } })
        .then(r => (r.ok ? r.json() : null))
        .catch(() => null)
    : Promise.resolve(null))
    .then(d => {
      if (!d) return null;
      if (Array.isArray(d.weekends) && d.weekends.length) window.TD_WEEKENDS = d.weekends;
      if (d.secuela && typeof d.secuela === 'object') window.TD_SECUELA = Object.assign({}, window.TD_SECUELA, d.secuela);
      return d;
    })
};
