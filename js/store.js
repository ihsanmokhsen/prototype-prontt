/* PRO NTT — penyimpanan lokal & aturan domain bersama.
   Prototipe UI/UX tanpa backend: semua data disimpan di localStorage. */

window.PRONTT = (function(){
  var KEYS = {
    apps: 'prontt.apps.v1',
    appSeq: 'prontt.appseq.v1',
    skSeq: 'prontt.skseq.v1',
    rdBayar: 'prontt.rdbayar.v1',
    kendaraan: 'prontt.kendaraan.v1',
    file: 'prontt.file.'
  };
  var BULAN = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];

  function read(key, fallback){
    try{
      var raw = localStorage.getItem(key);
      if(raw === null) return fallback;
      var v = JSON.parse(raw);
      return v === null ? fallback : v;
    }catch(e){ return fallback; }
  }
  function write(key, value){
    try{ localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch(e){ return false; }
  }
  function readList(key){
    var v = read(key, []);
    return Array.isArray(v) ? v : [];
  }
  function nextSeq(key, start){
    var n = parseInt(localStorage.getItem(key) || '', 10);
    if(isNaN(n)) n = start;
    try{ localStorage.setItem(key, String(n + 1)); }catch(e){}
    return n;
  }

  function apps(){ return readList(KEYS.apps); }
  function saveApps(list){ return write(KEYS.apps, list); }
  function addApp(app){
    var list = apps();
    list.unshift(app);
    saveApps(list);
    return app;
  }
  function findApp(id){
    var list = apps();
    for(var i=0;i<list.length;i++){ if(list[i].id === id) return list[i]; }
    return null;
  }

  function payments(){ return readList(KEYS.rdBayar); }
  function addPayment(rec){
    var list = payments();
    list.unshift(rec);
    write(KEYS.rdBayar, list);
    return rec;
  }
  function recordPayment(app, metode){
    var now = new Date();
    return addPayment({
      ref: 'RD-' + now.getTime(),
      id: app.id,
      nama: app.nama,
      nominal: app.total,
      metode: metode,
      periode: now.getFullYear() + '-' + ('0' + (now.getMonth() + 1)).slice(-2),
      tanggal: now.toISOString()
    });
  }

  function isRumahDinas(item){ return !!item && /rumah dinas/i.test(item.n || item.nama || ''); }
  function isRumahDinasApp(app){ return !!app && /rumah dinas/i.test(app.nama || ''); }
  function runningApps(list){
    return (list || apps()).filter(function(a){
      return isRumahDinasApp(a) && (a.status === 'menunggu' || a.status === 'sk');
    });
  }
  function statusOf(status){
    if(status === 'menunggu') return 'Menunggu verifikasi OPD';
    if(status === 'sk') return 'SK terbit · bayar bulanan di Cek & Bayar';
    return 'Aktif';
  }

  function idSewaApp(a){
    if(!a) return '';
    if(a.idsewa) return a.idsewa;
    var n = String(a.id || '').replace(/\D/g, '').slice(-4);
    return n ? 'PW-' + n : '';
  }
  function durasiApp(a){
    var m = String((a && a.masa) || '').match(/(\d+)\s*bulan/);
    return clampBulan((a && a.durasi) || (m && m[1]) || 1);
  }
  function tarifBulananApp(a){ return Math.round((a.total || 0) / durasiApp(a)); }
  // permohonan rumah dinas yang SK-nya sudah terbit -> tagihan bulanan di Cek & Bayar
  function tagihanApp(a){
    return {
      id: idSewaApp(a), appId: a.id, sk: a.sk,
      nama: a.pemohon, jabatan: a.instansi,
      alamat: a.nama + (a.kode ? ' · ' + a.kode : ''),
      luas: null, tipe: null, statusAsn: null, kodeBayar: null,
      biaya: tarifBulananApp(a)
    };
  }
  function cariTagihanApp(query){
    var q = String(query || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
    var m = q.match(/^PW0*(\d+)$/);
    if(!m) return null;
    var list = apps();
    for(var i=0;i<list.length;i++){
      var a = list[i];
      if(!isRumahDinasApp(a) || !a.sk) continue;
      var n = idSewaApp(a).replace(/\D/g, '').replace(/^0+/, '');
      if(n === m[1]) return tagihanApp(a);
    }
    return null;
  }
  function aktifkanApp(id, metode){
    var list = apps();
    for(var i=0;i<list.length;i++){
      if(list[i].id === id){ list[i].status = 'aktif'; list[i].bayar = metode; }
    }
    saveApps(list);
  }

  function clampBulan(n){ return Math.max(1, Math.min(12, parseInt(n, 10) || 1)); }

  function fmtTanggal(iso){
    var p = (iso || '').split('-');
    if(p.length !== 3) return iso || '-';
    var d = new Date(+p[0], +p[1]-1, +p[2]);
    return d.getDate() + ' ' + BULAN[d.getMonth()] + ' ' + d.getFullYear();
  }
  function bulanRange(iso, months){
    var p = (iso || '').split('-');
    if(p.length !== 3) return iso || '-';
    var n = clampBulan(months);
    var s = new Date(+p[0], +p[1]-1, +p[2]);
    var target = s.getMonth() + n;
    var e = new Date(s.getFullYear(), target, s.getDate());
    if(e.getMonth() !== ((target % 12) + 12) % 12){
      e = new Date(s.getFullYear(), target + 1, 0);
    }
    e.setDate(e.getDate() - 1);
    var label = fmtTanggal(iso);
    if(e.getTime() !== s.getTime()){
      label = s.getDate() + ' ' + BULAN[s.getMonth()] + ' – '
        + e.getDate() + ' ' + BULAN[e.getMonth()] + ' ' + e.getFullYear();
    }
    return label + ' · ' + n + ' bulan';
  }

  function isDriveLink(url){
    return /^https?:\/\/(drive|docs)\.google\.com\//i.test(String(url || '').trim());
  }

  return {
    KEYS: KEYS,
    read: read, write: write, readList: readList, nextSeq: nextSeq,
    apps: apps, saveApps: saveApps, addApp: addApp, findApp: findApp,
    payments: payments, addPayment: addPayment, recordPayment: recordPayment,
    isRumahDinas: isRumahDinas, isRumahDinasApp: isRumahDinasApp,
    runningApps: runningApps, statusOf: statusOf,
    idSewaApp: idSewaApp, tarifBulananApp: tarifBulananApp, cariTagihanApp: cariTagihanApp, aktifkanApp: aktifkanApp,
    clampBulan: clampBulan, bulanRange: bulanRange, isDriveLink: isDriveLink
  };
})();

/* tanda kolom wajib hilang begitu pengguna mulai mengetik */
document.addEventListener('input', function(e){
  if(e.target && e.target.classList) e.target.classList.remove('inp-err');
});
