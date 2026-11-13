/* PRO NTT — data & helper modul retribusi (dipakai halaman terpisah) */

var BULAN = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
function pad(n){ return ('0'+n).slice(-2); }
function isoDate(d){ return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate()); }
function fmtTgl(iso){
  var p = (iso||'').split('-'); if(p.length!==3) return iso||'-';
  var d = new Date(+p[0], +p[1]-1, +p[2]);
  return d.getDate()+' '+BULAN[d.getMonth()]+' '+d.getFullYear();
}
function rupiah(n){ return 'Rp '+Number(n||0).toLocaleString('id-ID'); }
function unitShort(u){ return (u||'').replace('per ',''); }
function chipCls(s){
  if(s==='Tersedia') return 'tersedia';
  if(s==='Dalam Permohonan') return 'proses';
  if(s==='Disewa') return 'disewa';
  return 'tidak';
}

var ICP = {
  gedung:'<path d="M4 22V4a1 1 0 011-1h10a1 1 0 011 1v18M16 8h3a1 1 0 011 1v13M8 7h0M12 7h0M8 11h0M12 11h0M9 22v-4h3v4"/>',
  tanah:'<path d="M9 20l-5.4 1.8a1 1 0 01-1.3-1V6.4a1 1 0 01.7-1L9 3m0 17l6-2m-6 2V3m6 15l5.4 1.8a1 1 0 001.3-1V4.6a1 1 0 00-.7-1L15 1.8M15 18V1.8"/>',
  labkesehatan:'<path d="M9 2v7.5L5 17a2 2 0 001.8 3h10.4A2 2 0 0019 17l-4-7.5V2M8 2h8M8 14h8"/>',
  it:'<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
  ternak:'<path d="M4 10c0-2 1-3 2-4M20 10c0-2-1-3-2-4M4 10c0 4 3 8 8 8s8-4 8-8M8 6c0-2 1.5-3 4-3s4 1 4 3M9 13h0M15 13h0"/>',
  pakan:'<path d="M3 8l9-5 9 5-9 5-9-5zM3 8v8l9 5 9-5V8"/>',
  labhewan:'<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3M11 8v6M8 11h6"/>',
  kesehatan:'<path d="M11 2a2 2 0 00-2 2v3H6a2 2 0 00-2 2v2a2 2 0 002 2h3v3a2 2 0 002 2h2a2 2 0 002-2v-3h3a2 2 0 002-2V9a2 2 0 00-2-2h-3V4a2 2 0 00-2-2z"/>',
  klinik:'<path d="M10 2v6L5.5 16A2 2 0 007.3 19h9.4a2 2 0 001.8-3L14 8V2M9 2h6"/>'
};
var DESCT = {
  gedung:'Sewa {} milik Pemprov NTT untuk kegiatan sesuai peruntukan. Data contoh presentasi.',
  tanah:'Sewa pemanfaatan {} milik daerah untuk usaha atau kegiatan sesuai peruntukan.',
  labkesehatan:'Sewa {} untuk kegiatan penelitian dan pelayanan laboratorium kesehatan.',
  it:'Sewa {} milik daerah untuk rapat, pelatihan, dan kegiatan instansi.',
  ternak:'Retribusi pelayanan dan pemeriksaan {} di wilayah Prov. NTT.',
  pakan:'Penyediaan {} bersubsidi dari dinas peternakan daerah.',
  labhewan:'Pemeriksaan laboratorium kesehatan hewan untuk {}.',
  kesehatan:'Retribusi {} pada fasilitas kesehatan milik daerah.',
  klinik:'Pemeriksaan laboratorium klinik untuk {}.'
};
function descOf(key,g){
  var n = String(g.n||'');
  var t = DESCT[key];
  if(/^sewa\s/i.test(n)) t = t.replace(/^Sewa /,'');
  return t.replace('{}', n);
}

var ART_HALL = '<svg viewBox="0 0 320 120" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="ga1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7cc0ee"/><stop offset="1" stop-color="#e7f3fd"/></linearGradient></defs><rect width="320" height="120" fill="url(#ga1)"/><circle cx="270" cy="24" r="12" fill="#ffd54a"/><ellipse cx="66" cy="22" rx="26" ry="8" fill="#fff" opacity=".85"/><ellipse cx="90" cy="27" rx="18" ry="6" fill="#fff" opacity=".65"/><rect y="98" width="320" height="22" fill="#d3e4f1"/><rect x="58" y="44" width="204" height="56" rx="4" fill="#1572c7"/><rect x="66" y="50" width="188" height="44" rx="2" fill="#0f5fb0"/><g fill="#9fd0f4"><rect x="72" y="56" width="22" height="32" rx="1"/><rect x="100" y="56" width="22" height="32" rx="1"/><rect x="128" y="56" width="22" height="32" rx="1"/><rect x="170" y="56" width="22" height="32" rx="1"/><rect x="198" y="56" width="22" height="32" rx="1"/><rect x="226" y="56" width="22" height="32" rx="1"/></g><rect x="150" y="60" width="20" height="40" rx="2" fill="#083e79"/><path d="M34 98V60M286 98V60" stroke="#395066" stroke-width="3" stroke-linecap="round"/><path d="M34 60l16 5-16 5zM286 60l16 5-16 5z" fill="#e5484d"/><path d="M22 98c1-8-1-14-1-14M21 84c-6-2-9-6-9-6M23 82c5-4 8-4 8-4" stroke="#2f8f5b" stroke-width="3" stroke-linecap="round" fill="none"/></svg>';
var ART_GABLE = '<svg viewBox="0 0 320 120" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="ga2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe3ae"/><stop offset="1" stop-color="#fff6e8"/></linearGradient></defs><rect width="320" height="120" fill="url(#ga2)"/><circle cx="52" cy="26" r="12" fill="#f6a723" opacity=".85"/><ellipse cx="240" cy="20" rx="24" ry="7" fill="#fff" opacity=".8"/><rect y="98" width="320" height="22" fill="#e2d4bd"/><rect x="70" y="52" width="180" height="48" rx="3" fill="#fdfdfd"/><path d="M56 54L160 22l104 32z" fill="#d95a5e"/><rect x="66" y="48" width="188" height="8" rx="4" fill="#b64649"/><g fill="#7fb2d9"><rect x="82" y="64" width="18" height="20" rx="1"/><rect x="106" y="64" width="18" height="20" rx="1"/><rect x="196" y="64" width="18" height="20" rx="1"/><rect x="220" y="64" width="18" height="20" rx="1"/></g><rect x="146" y="62" width="28" height="38" rx="2" fill="#5a3c05"/><path d="M40 98c1-8-1-14-1-14M39 84c-6-2-9-6-9-6M41 82c5-4 8-4 8-4" stroke="#2f8f5b" stroke-width="3" stroke-linecap="round" fill="none"/><path d="M282 98c1-8-1-14-1-14M281 84c-6-2-9-6-9-6M283 82c5-4 8-4 8-4" stroke="#2f8f5b" stroke-width="3" stroke-linecap="round" fill="none"/></svg>';
var ART_TOWER = '<svg viewBox="0 0 320 120" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="ga3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9ed3ea"/><stop offset="1" stop-color="#e9f6fb"/></linearGradient></defs><rect width="320" height="120" fill="url(#ga3)"/><circle cx="286" cy="22" r="10" fill="#ffd54a"/><ellipse cx="84" cy="20" rx="22" ry="7" fill="#fff" opacity=".8"/><rect y="98" width="320" height="22" fill="#cfe0ea"/><rect x="96" y="40" width="56" height="60" rx="4" fill="#0e6a7c"/><g fill="#bfe9f2"><rect x="102" y="48" width="12" height="44"/><rect x="118" y="48" width="12" height="44"/><rect x="134" y="48" width="12" height="44"/></g><rect x="164" y="56" width="46" height="44" rx="3" fill="#17758a"/><g fill="#bfe9f2"><rect x="170" y="62" width="10" height="32"/><rect x="184" y="62" width="10" height="32"/><rect x="198" y="62" width="8" height="32"/></g><rect x="152" y="78" width="12" height="22" rx="1" fill="#0a4a58"/><path d="M70 98c1-8-1-14-1-14M69 84c-6-2-9-6-9-6M71 82c5-4 8-4 8-4" stroke="#2f8f5b" stroke-width="3" stroke-linecap="round" fill="none"/></svg>';

/* LISTS, SK_SEED, RW diisi oleh initData() dari data lokal */
var LISTS   = {};
var SK_SEED = [];
var RW      = [];

var sceneN = 0;
function scene(sky, ground, ic){
  sceneN++;
  var id = 'gl'+sceneN;
  return '<svg viewBox="0 0 320 120" preserveAspectRatio="xMidYMid slice">'
    + '<defs><linearGradient id="'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+sky[0]+'"/><stop offset="1" stop-color="'+sky[1]+'"/></linearGradient></defs>'
    + '<rect width="320" height="120" fill="url(#'+id+')"/>'
    + '<circle cx="272" cy="24" r="12" fill="#ffd54a" opacity=".85"/>'
    + '<ellipse cx="64" cy="24" rx="26" ry="8" fill="#fff" opacity=".8"/>'
    + '<ellipse cx="88" cy="29" rx="16" ry="6" fill="#fff" opacity=".6"/>'
    + '<rect y="98" width="320" height="22" fill="'+ground+'"/>'
    + '<rect x="128" y="26" width="64" height="64" rx="16" fill="rgba(255,255,255,.9)"/>'
    + '<g transform="translate(146,44) scale(1.15)" fill="none" stroke="#1572c7" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">'+ic+'</g>'
    + '</svg>';
}

function riwayatOf(g){
  if (!RW.length) return [];
  var seed = parseInt((g.k||'').replace(/[^0-9]/g,''),10) || 0;
  var out = [];
  for(var x=0; x<2; x++){
    var r = RW[(x+seed) % RW.length];
    out.push({pemohon:r[0], status:r[1], sk:r[2], masa:r[3], nilai:rupiah(g.p*3)});
  }
  return out;
}

function qs(name){
  return new URLSearchParams(location.search).get(name);
}

/* Kontak admin OPD untuk follow up verifikasi (nomor contoh prototipe — ganti dengan nomor resmi). */
var OPD_CONTACT = {
  'Biro Umum Setda Prov. NTT': {nama:'Admin Aset Daerah', wa:'6280000000000'},
  'Dinas Kesehatan Prov. NTT': {nama:'Admin Retribusi Kesehatan', wa:'6280000000001'},
  'Dinas Peternakan Prov. NTT': {nama:'Admin Retribusi Peternakan', wa:'6280000000002'}
};
function contactOf(opd){
  var keys = Object.keys(OPD_CONTACT);
  for(var i=0;i<keys.length;i++){
    if((opd||'').indexOf(keys[i]) === 0) return OPD_CONTACT[keys[i]];
  }
  return {nama:'Admin OPD', wa:'6280000000000'};
}

/* SK_SEED & RW sengaja kosong: aplikasi hanya menampilkan data milik pengguna sendiri. */
function initData(cb) {
  LISTS = DATA_LISTS;
  if (cb) cb(null);
}

/* ===== Rumah dinas: tagihan & pembayaran milik pengguna ===== */
var RD_BAYAR_KEY = PRONTT.KEYS.rdBayar;

function periodeIni(){
  var d = new Date();
  return d.getFullYear() + '-' + pad(d.getMonth() + 1);
}
function cariTagihanRD(idPegawai){
  var q = String(idPegawai || '').trim().toUpperCase();
  for (var i = 0; i < DATA_TAGIHAN_RD.length; i++) {
    if (DATA_TAGIHAN_RD[i].id === q) return DATA_TAGIHAN_RD[i];
  }
  return null;
}
function pembayaranRD(){
  return PRONTT.payments();
}
function sudahBayarRD(idPegawai){
  var per = periodeIni();
  return pembayaranRD().some(function(p){ return p.id === idPegawai && p.periode === per; });
}
function simpanBayarRD(tagihan, metode){
  var now = new Date();
  return PRONTT.addPayment({
    ref: 'RD-' + now.getTime(),
    id: tagihan.id, nama: tagihan.nama, alamat: tagihan.alamat, tipe: tagihan.tipe,
    nominal: tagihan.biaya, metode: metode, periode: periodeIni(), tanggal: now.toISOString()
  });
}
