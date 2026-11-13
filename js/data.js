/* PRO NTT — data & helper modul retribusi (dipakai halaman terpisah) */

var BULAN = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
function pad(n){ return ('0'+n).slice(-2); }
function isoDate(d){ return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate()); }
function fmtTgl(iso){
  var p = (iso||'').split('-'); if(p.length!==3) return iso||'-';
  var d = new Date(+p[0], +p[1]-1, +p[2]);
  return d.getDate()+' '+BULAN[d.getMonth()]+' '+d.getFullYear();
}
function fmtMasa(iso, days){
  var p = (iso||'').split('-'); if(p.length!==3) return iso||'-';
  var s = new Date(+p[0], +p[1]-1, +p[2]);
  var e = new Date(s.getTime() + Math.max(1,days-1)*86400000);
  var label = fmtTgl(iso);
  if(e.getTime()!==s.getTime()) label = s.getDate()+' '+BULAN[s.getMonth()]+' – '+e.getDate()+' '+BULAN[e.getMonth()]+' '+e.getFullYear();
  return label+' · '+Math.max(1,days)+' hari';
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
function descOf(key,g){ return DESCT[key].replace('{}', g.n); }

var ART_HALL = '<svg viewBox="0 0 320 120" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="ga1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7cc0ee"/><stop offset="1" stop-color="#e7f3fd"/></linearGradient></defs><rect width="320" height="120" fill="url(#ga1)"/><circle cx="270" cy="24" r="12" fill="#ffd54a"/><ellipse cx="66" cy="22" rx="26" ry="8" fill="#fff" opacity=".85"/><ellipse cx="90" cy="27" rx="18" ry="6" fill="#fff" opacity=".65"/><rect y="98" width="320" height="22" fill="#d3e4f1"/><rect x="58" y="44" width="204" height="56" rx="4" fill="#1572c7"/><rect x="66" y="50" width="188" height="44" rx="2" fill="#0f5fb0"/><g fill="#9fd0f4"><rect x="72" y="56" width="22" height="32" rx="1"/><rect x="100" y="56" width="22" height="32" rx="1"/><rect x="128" y="56" width="22" height="32" rx="1"/><rect x="170" y="56" width="22" height="32" rx="1"/><rect x="198" y="56" width="22" height="32" rx="1"/><rect x="226" y="56" width="22" height="32" rx="1"/></g><rect x="150" y="60" width="20" height="40" rx="2" fill="#083e79"/><path d="M34 98V60M286 98V60" stroke="#395066" stroke-width="3" stroke-linecap="round"/><path d="M34 60l16 5-16 5zM286 60l16 5-16 5z" fill="#e5484d"/><path d="M22 98c1-8-1-14-1-14M21 84c-6-2-9-6-9-6M23 82c5-4 8-4 8-4" stroke="#2f8f5b" stroke-width="3" stroke-linecap="round" fill="none"/></svg>';
var ART_GABLE = '<svg viewBox="0 0 320 120" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="ga2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe3ae"/><stop offset="1" stop-color="#fff6e8"/></linearGradient></defs><rect width="320" height="120" fill="url(#ga2)"/><circle cx="52" cy="26" r="12" fill="#f6a723" opacity=".85"/><ellipse cx="240" cy="20" rx="24" ry="7" fill="#fff" opacity=".8"/><rect y="98" width="320" height="22" fill="#e2d4bd"/><rect x="70" y="52" width="180" height="48" rx="3" fill="#fdfdfd"/><path d="M56 54L160 22l104 32z" fill="#d95a5e"/><rect x="66" y="48" width="188" height="8" rx="4" fill="#b64649"/><g fill="#7fb2d9"><rect x="82" y="64" width="18" height="20" rx="1"/><rect x="106" y="64" width="18" height="20" rx="1"/><rect x="196" y="64" width="18" height="20" rx="1"/><rect x="220" y="64" width="18" height="20" rx="1"/></g><rect x="146" y="62" width="28" height="38" rx="2" fill="#5a3c05"/><path d="M40 98c1-8-1-14-1-14M39 84c-6-2-9-6-9-6M41 82c5-4 8-4 8-4" stroke="#2f8f5b" stroke-width="3" stroke-linecap="round" fill="none"/><path d="M282 98c1-8-1-14-1-14M281 84c-6-2-9-6-9-6M283 82c5-4 8-4 8-4" stroke="#2f8f5b" stroke-width="3" stroke-linecap="round" fill="none"/></svg>';
var ART_TOWER = '<svg viewBox="0 0 320 120" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="ga3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9ed3ea"/><stop offset="1" stop-color="#e9f6fb"/></linearGradient></defs><rect width="320" height="120" fill="url(#ga3)"/><circle cx="286" cy="22" r="10" fill="#ffd54a"/><ellipse cx="84" cy="20" rx="22" ry="7" fill="#fff" opacity=".8"/><rect y="98" width="320" height="22" fill="#cfe0ea"/><rect x="96" y="40" width="56" height="60" rx="4" fill="#0e6a7c"/><g fill="#bfe9f2"><rect x="102" y="48" width="12" height="44"/><rect x="118" y="48" width="12" height="44"/><rect x="134" y="48" width="12" height="44"/></g><rect x="164" y="56" width="46" height="44" rx="3" fill="#17758a"/><g fill="#bfe9f2"><rect x="170" y="62" width="10" height="32"/><rect x="184" y="62" width="10" height="32"/><rect x="198" y="62" width="8" height="32"/></g><rect x="152" y="78" width="12" height="22" rx="1" fill="#0a4a58"/><path d="M70 98c1-8-1-14-1-14M69 84c-6-2-9-6-9-6M71 82c5-4 8-4 8-4" stroke="#2f8f5b" stroke-width="3" stroke-linecap="round" fill="none"/></svg>';

var LISTS = {
  gedung:{opd:'Biro Umum Setda Prov. NTT', title:'Sewa Gedung', sub:'Gedung milik Pemprov NTT', cat:'Sewa Aset', sewa:true, sky:['#8ec9f2','#e7f3fd'], ground:'#d3e4f1', items:[
    {n:'Rumah Dinas', tag:'Hunian · Type E', loc:'Jl. Timor Raya, UPTD Veteriner', cap:'Untuk tinggal · Luas < 36 M2', p:400000, un:'per bulan', k:'RTB-SWA-214', stok:8, st:'Tersedia', opd:'Dinas Peternakan Prov. NTT (UPTD Veteriner)', img:'../img/rumah-dinas-1.jpg', imgCredit:'Foto: Ozymandros Caelum / CC BY-SA 4.0', art:ART_HALL},
    {n:'Sewa Rumah Dinas', tag:'Hunian · Type D', loc:'BTN Kolhua, Kupang', cap:'Untuk tinggal · Luas < 50 M2', p:500000, un:'per bulan', k:'RTB-SWA-017', stok:0, st:'Disewa', img:'../img/rumah-dinas-2.jpg', imgCredit:'Foto: Pijri Paijar / CC BY-SA 4.0', art:ART_GABLE},
    {n:'Sewa Rumah Dinas', tag:'Hunian · Semi Permanen', loc:'BTN Kolhua, Kupang', cap:'Untuk tinggal · Luas < 36 M2', p:250000, un:'per bulan', k:'RTB-SWA-019', stok:0, st:'Disewa', img:'../img/rumah-dinas-3.jpg', imgCredit:'Foto: Wong Langsep / CC BY-SA 4.0', art:ART_TOWER},
    {n:'Sewa Rumah Dinas', tag:'Hunian · Semi Permanen', loc:'Jl. Motoain No. 3, Naikolan', cap:'Untuk tinggal · Luas < 36 M2', p:250000, un:'per bulan', k:'RTB-SWA-020', stok:0, st:'Disewa', img:'../img/rumah-dinas-3.jpg', imgCredit:'Foto: Wong Langsep / CC BY-SA 4.0', art:ART_HALL},
    {n:'Sewa Ruko Friendship', tag:'Blok Besar', loc:'Jl. Basuki Rahmad No. 1, Naikoten', cap:'Luas 50 M2', p:30000000, un:'per tahun', k:'RTB-SWA-001', stok:0, st:'Disewa', art:ART_GABLE, img:'../img/ruko-friendship.jpg', imgCredit:'Foto: Indonesiagood / CC BY 4.0'},
    {n:'Kuliner Oepoi', tag:'Blok A', loc:'Jl. W.J. Lalamentik, Oebufu Kupang', cap:'Luas 32 M2', p:13600000, un:'per tahun', k:'RTB-SWA-005', stok:0, st:'Disewa', art:ART_TOWER, img:'../img/kuliner-oepoi.jpg', imgCredit:'Foto: Indonesiagood / CC BY 3.0'}
  ]},
  tanah:{opd:'Biro Umum Setda Prov. NTT', title:'Sewa Tanah Daerah', sub:'Aset tanah milik Pemprov NTT', cat:'Sewa Aset', sewa:true, sky:['#a9d9ec','#eef8f4'], ground:'#b9e0a8', items:[
    {n:'Eks Flobamor', tag:'Tanah Kas', loc:'Naikolan, Maulafa, Kupang', cap:'-', p:75000000, un:'per tahun', k:'RTB-SWA-021', stok:0, st:'Disewa', img:'../img/tanah-1.jpg', imgCredit:'Foto: Abdul Hanif Arromy / CC BY 4.0'},
    {n:'Kawasan Eks Sekolah Cina', tag:'Tanah Kawasan', loc:'Jl. Cendrawasih Bonipoi, Kota Lama', cap:'Luas 127,8 M2', p:5800000, un:'per tahun', k:'RTB-SWA-049', stok:0, st:'Disewa', img:'../img/tanah-2.jpg', imgCredit:'Foto: Abdul Hanif Arromy / CC BY 4.0'},
    {n:'Kawasan Eks Sekolah Cina', tag:'Tanah Kawasan', loc:'Jl. Cendrawasih Bonipoi, Kota Lama', cap:'Luas 13,77 M2', p:650000, un:'per tahun', k:'RTB-SWA-040', stok:0, st:'Disewa', img:'../img/tanah-1.jpg', imgCredit:'Foto: Abdul Hanif Arromy / CC BY 4.0'}
  ]},
  labkesehatan:{opd:'Dinas Kesehatan Prov. NTT', title:'Sewa Alat Lab Kesehatan', sub:'Peralatan laboratorium daerah', cat:'Sewa Aset', sewa:true, sky:['#cfe8f7','#f2f9fd'], ground:'#dce7ef', items:[
    {n:'Sewa Peralatan PKL Mahasiswa', tag:'PKL Kelompok', loc:'UPTD Laboratorium Kesehatan', cap:'1 s/d 4 Orang', p:250000, un:'per 15 hari', k:'RTB-SWA-734', stok:0, st:'Tidak Tersedia', img:'../img/labkes-1.jpg', imgCredit:'Foto: Belikov Maxim / CC BY 4.0'},
    {n:'Sewa Peralatan PKL Mahasiswa', tag:'PKL Kelompok', loc:'UPTD Laboratorium Kesehatan', cap:'1 s/d 4 Orang', p:500000, un:'per bulan', k:'RTB-SWA-735', stok:0, st:'Tidak Tersedia', img:'../img/labkes-2.jpg', imgCredit:'Foto: Goleisureintl / CC BY 4.0'},
    {n:'Sewa Peralatan PKL Mahasiswa', tag:'PKL Kelompok', loc:'UPTD Laboratorium Kesehatan', cap:'1 s/d 4 Orang', p:750000, un:'per 2 bulan', k:'RTB-SWA-736', stok:0, st:'Tidak Tersedia', img:'../img/labkes-3.jpg', imgCredit:'Foto: Belikov Maxim / CC BY 4.0'}
  ]},
  it:{opd:'Dinas Kesehatan Prov. NTT', title:'Sewa Peralatan IT', sub:'Perangkat IT milik daerah', cat:'Sewa Aset', sewa:true, sky:['#bfe0f2','#eef6fc'], ground:'#d6e2ec', items:[
    {n:'Sewa Infokus', tag:'Proyektor', loc:'UPTD Laboratorium Kesehatan', cap:'1 unit', p:100000, un:'per hari', k:'RTB-SWA-729', stok:0, st:'Tidak Tersedia', img:'../img/it-proyektor.jpg', imgCredit:'Foto: Aivar Luist / Public domain'},
    {n:'Sewa Komputer', tag:'Komputer', loc:'UPTD Laboratorium Kesehatan', cap:'1 unit', p:100000, un:'per hari', k:'RTB-SWA-730', stok:0, st:'Tidak Tersedia', img:'../img/it-komputer.jpg', imgCredit:'Foto: Terraflorin / CC BY-SA 4.0'},
    {n:'Sewa Sound System', tag:'Sound System', loc:'UPTD Laboratorium Kesehatan', cap:'1 unit', p:300000, un:'per hari', k:'RTB-SWA-731', stok:0, st:'Tidak Tersedia', img:'../img/it-sound.jpg', imgCredit:'Foto: Dubdem e FabDub / CC BY 2.0'}
  ]},
  ternak:{opd:'Dinas Peternakan Prov. NTT', title:'Retribusi Ternak', sub:'Penjualan hasil produksi ternak daerah', cat:'Ternak', sewa:false, sky:['#b5dffc','#eaf6fd'], ground:'#cde3b9', items:[
    {n:'Ayam Buras', tag:'Ayam Buras', loc:'UPTD Pembibitan Ternak', cap:'Umur 1-2 Bulan', p:65000, un:'per ekor', k:'RTB-TRN-206', img:'../img/ternak-ayam.jpg', imgCredit:'Foto: Fata Teguh Prasetya / CC BY-SA 4.0'},
    {n:'Babi', tag:'Babi', loc:'Instalasi Tarus', cap:'Umur 1,5-2 Bulan', p:1200000, un:'per ekor', k:'RTB-TRN-176', img:'../img/ternak-babi.jpg', imgCredit:'Foto: Gzen92 / CC BY-SA 4.0'},
    {n:'Kambing', tag:'Kambing', loc:'Instalasi Sumlili', cap:'Betina, Umur 2-3 Bulan', p:1250000, un:'per ekor', k:'RTB-TRN-190', img:'../img/ternak-kambing.jpg', imgCredit:'Foto: Asatama / CC BY-SA 4.0'}
  ]},
  pakan:{opd:'Dinas Peternakan Prov. NTT', title:'Pakan Ternak', sub:'Pakan hasil produksi daerah', cat:'Ternak', sewa:false, sky:['#ffe3ae','#fff6e8'], ground:'#e2d4bd', items:[
    {n:'Legumenosa Unggul', tag:'Benih Lamtoro', loc:'UPTD Pembibitan Ternak', cap:'Benih Lamtoro Teramba', p:75000, un:'per kg', k:'RTB-TRN-112', img:'../img/pakan-lamtoro.jpg', imgCredit:'Foto: Ajtjohnsingh / CC BY-SA 4.0'},
    {n:'Legumenosa Unggul', tag:'Anakan Gung', loc:'UPTD Pembibitan Ternak', cap:'Anakan Gung', p:2500, un:'per koker', k:'RTB-TRN-106', img:'../img/pakan-gung.jpg', imgCredit:'Foto: Vijayanrajapuram / CC BY-SA 4.0'},
    {n:'Legumenosa Unggul', tag:'Pakan Ayam', loc:'UPTD Pembibitan Ternak', cap:'Pakan Ternak Ayam', p:6000, un:'per kg', k:'RTB-TRN-109', img:'../img/pakan-ayam.jpg', imgCredit:'Foto: MakaLeanne / CC BY-SA 4.0'}
  ]},
  labhewan:{opd:'Dinas Peternakan Prov. NTT', title:'Pemeriksaan Lab Hewan', sub:'Laboratorium kesehatan hewan daerah', cat:'Ternak', sewa:false, sky:['#cfe8f7','#f2f9fd'], ground:'#dce7ef', items:[
    {n:'Pemeriksaan Lab. Parasitologik', tag:'Diferensial', loc:'UPTD Veteriner', cap:'1 sampel', p:10000, un:'per sampel', k:'RTB-TRN-229', img:'../img/labhewan-parasit.jpg', imgCredit:'Foto: Kneoli / CC BY 4.0'},
    {n:'Pemeriksaan Lab. Parasitologik', tag:'Parasit Darah', loc:'UPTD Veteriner', cap:'1 sampel', p:10000, un:'per sampel', k:'RTB-TRN-227', img:'../img/labhewan-darah.jpg', imgCredit:'Foto: F.hoxhaj / CC BY-SA 4.0'},
    {n:'Pemeriksaan Lab. Parasitologik', tag:'Parasit Eksternal', loc:'UPTD Veteriner', cap:'1 sampel', p:5000, un:'per sampel', k:'RTB-TRN-226', img:'../img/labhewan-mikroskop.jpg', imgCredit:'Foto: Punlop Anusonpornperm / CC BY 4.0'}
  ]},
  kesehatan:{opd:'Dinas Kesehatan Prov. NTT', title:'Jasa Laboratorium Kesehatan', sub:'Layanan pemeriksaan lab kesehatan', cat:'Jasa Kesehatan', sewa:false, sky:['#d5ecf7','#f6fbfe'], ground:'#dce7ef', items:[
    {n:'Pemeriksaan Alkohol dalam Darah', tag:'Alkohol', loc:'UPTD Laboratorium Kesehatan', cap:'1 orang', p:97500, un:'per orang', k:'RTB-KES-401', img:'../img/kes-alkohol.jpg', imgCredit:'Foto: Frankincense Diala / CC0'},
    {n:'Pemeriksaan Narkoba', tag:'Narkoba', loc:'UPTD Laboratorium Kesehatan', cap:'1 orang', p:75000, un:'per orang', k:'RTB-KES-402', img:'../img/kes-narkoba.jpg', imgCredit:'Foto: Spicy / CC BY-SA 4.0'},
    {n:'Pemeriksaan HIV/AIDS', tag:'HIV/AIDS', loc:'UPTD Laboratorium Kesehatan', cap:'1 orang', p:120000, un:'per orang', k:'RTB-KES-403', img:'../img/kes-hiv.jpg', imgCredit:'Foto: Ajay Kumar Chaurasiya / CC BY-SA 4.0'}
  ]},
  klinik:{opd:'Dinas Kesehatan Prov. NTT', title:'Pelayanan Jasa Laboratorium', sub:'Pemeriksaan laboratorium klinik', cat:'Jasa Kesehatan', sewa:false, sky:['#d3ecf6','#f4fafd'], ground:'#dce7ef', items:[
    {n:'Pemeriksaan Hematologi', tag:'Darah Lengkap', loc:'UPTD Laboratorium Kesehatan', cap:'Kelompok Canggih', p:80000, un:'per parameter', k:'RTB-KES-431', img:'../img/klinik-hematologi.jpg', imgCredit:'Foto: Ptrump16 / CC BY-SA 4.0'},
    {n:'Pemeriksaan Hematologi', tag:'Darah Rutin', loc:'UPTD Laboratorium Kesehatan', cap:'Kelompok Sederhana', p:35000, un:'per parameter', k:'RTB-KES-408', img:'../img/klinik-darah.jpg', imgCredit:'Foto: Ptrump16 / CC BY-SA 4.0'},
    {n:'Pemeriksaan Alkohol dalam Darah', tag:'Alkohol', loc:'UPTD Laboratorium Kesehatan', cap:'-', p:150000, un:'per hari', k:'RTB-KES-725', img:'../img/klinik-alkohol.jpg', imgCredit:'Foto: VIA Gallery / CC BY 2.0'}
  ]}
};

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

var RW = [
  ['Dinas Pendidikan Prov. NTT','Selesai','SK/118/PRO-NTT/2025','20–22 Des 2025'],
  ['Biro Umum Setda NTT','Selesai','SK/097/PRO-NTT/2025','14 Nov 2025'],
  ['Kantor Wilayah Kemenag','Selesai','SK/066/PRO-NTT/2025','05–07 Okt 2025'],
  ['Panitia Festival Daerah','Aktif','SK/042/PRO-NTT/2026','10–12 Feb 2026']
];
function riwayatOf(g){
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

/* Data contoh SK / Perjanjian Kerjasama untuk fitur "Cek & Bayar Retribusi".
   Nomor SK juga bisa berasal dari permohonan yang dibuat di aplikasi (localStorage). */
var SK_SEED = [
  {
    sk:'SK/042/PRO-NTT/2026', kerjasama:'PKS/042/PRO-NTT/2026',
    nama:'Sewa Gedung Serbaguna', kode:'RTB-SWA-101',
    pemohon:'Panitia Festival Daerah', instansi:'Biro Umum Setda NTT',
    keperluan:'Festival Daerah NTT', mulai:'2026-02-10',
    masa:'10–12 Feb 2026 · 3 hari', tglSk:'05 Feb 2026',
    opd:'Biro Umum Setda Prov. NTT', pokok:2250000, denda:0, status:'belum'
  },
  {
    sk:'SK/118/PRO-NTT/2025', kerjasama:'PKS/118/PRO-NTT/2025',
    nama:'Sewa Rumah Dinas Type E', kode:'RTB-SWA-214',
    pemohon:'Dinas Pendidikan Prov. NTT', instansi:'Dinas Pendidikan Prov. NTT',
    keperluan:'Penempatan tenaga pendidik', mulai:'2025-12-20',
    masa:'20 Des 2025 – 19 Jan 2026 · 1 bulan', tglSk:'12 Des 2025',
    opd:'Biro Umum Setda Prov. NTT', pokok:400000, denda:20000, status:'belum'
  },
  {
    sk:'SK/097/PRO-NTT/2025', kerjasama:'PKS/097/PRO-NTT/2025',
    nama:'Sewa Ruko Friendship Blok Besar', kode:'RTB-SWA-001',
    pemohon:'Koperasi Serba Usaha NTT', instansi:'Koperasi Serba Usaha NTT',
    keperluan:'Usaha perdagangan', mulai:'2025-11-14',
    masa:'14 Nov 2025 – 13 Nov 2026 · 1 tahun', tglSk:'07 Nov 2025',
    opd:'Biro Umum Setda Prov. NTT', pokok:30000000, denda:0, status:'lunas'
  },
  {
    sk:'SK/066/PRO-NTT/2025', kerjasama:'PKS/066/PRO-NTT/2025',
    nama:'Sewa Aula Kantor Wilayah Kemenag', kode:'RTB-SWA-088',
    pemohon:'Kantor Wilayah Kemenag', instansi:'Kantor Wilayah Kemenag NTT',
    keperluan:'Kegiatan pembinaan', mulai:'2025-10-05',
    masa:'05–07 Okt 2025 · 3 hari', tglSk:'01 Okt 2025',
    opd:'Biro Umum Setda Prov. NTT', pokok:1750000, denda:0, status:'lunas'
  }
];
