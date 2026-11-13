/* PRO NTT — API client
   Hubungkan ke backend Node.js.
   Ganti API_BASE jika backend berjalan di alamat berbeda. */

var API_BASE = 'http://localhost:3000/api';

var API = {
  /* Muat semua data sekaligus (LISTS, SK_SEED, RW) */
  init: function() {
    return fetch(API_BASE + '/init').then(function(r) {
      if (!r.ok) throw new Error('API error ' + r.status);
      return r.json();
    });
  },

  /* Aset */
  getAset: function(kategoriId) {
    var url = API_BASE + '/aset' + (kategoriId ? '?kategori=' + encodeURIComponent(kategoriId) : '');
    return fetch(url).then(function(r) { return r.json(); });
  },
  getKategori: function(id) {
    return fetch(API_BASE + '/aset/kategori/' + encodeURIComponent(id)).then(function(r) { return r.json(); });
  },
  createAset: function(data) {
    return fetch(API_BASE + '/aset', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    }).then(function(r) { return r.json(); });
  },
  updateAset: function(id, data) {
    return fetch(API_BASE + '/aset/' + id, {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    }).then(function(r) { return r.json(); });
  },
  deleteAset: function(id) {
    return fetch(API_BASE + '/aset/' + id, { method: 'DELETE' }).then(function(r) { return r.json(); });
  },
  updateKategori: function(id, data) {
    return fetch(API_BASE + '/aset/kategori/' + encodeURIComponent(id), {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    }).then(function(r) { return r.json(); });
  },

  /* Permohonan */
  getPermohonan: function(status) {
    var url = API_BASE + '/permohonan' + (status ? '?status=' + encodeURIComponent(status) : '');
    return fetch(url).then(function(r) { return r.json(); });
  },
  getPermohonanBySK: function(sk) {
    return fetch(API_BASE + '/permohonan/sk/' + encodeURIComponent(sk)).then(function(r) { return r.json(); });
  },
  createPermohonan: function(data) {
    return fetch(API_BASE + '/permohonan', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    }).then(function(r) { return r.json(); });
  },
  updatePermohonan: function(id, data) {
    return fetch(API_BASE + '/permohonan/' + id, {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    }).then(function(r) { return r.json(); });
  },
  deletePermohonan: function(id) {
    return fetch(API_BASE + '/permohonan/' + id, { method: 'DELETE' }).then(function(r) { return r.json(); });
  },

  /* Riwayat */
  getRiwayat: function() {
    return fetch(API_BASE + '/riwayat').then(function(r) { return r.json(); });
  },
  createRiwayat: function(data) {
    return fetch(API_BASE + '/riwayat', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    }).then(function(r) { return r.json(); });
  },
  updateRiwayat: function(id, data) {
    return fetch(API_BASE + '/riwayat/' + id, {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    }).then(function(r) { return r.json(); });
  },
  deleteRiwayat: function(id) {
    return fetch(API_BASE + '/riwayat/' + id, { method: 'DELETE' }).then(function(r) { return r.json(); });
  }
};
