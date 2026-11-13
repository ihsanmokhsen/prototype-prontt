  var MAIN = ['dashboard','retribusi','riwayat','pesan','akun'];
  var TABS = [
    {id:'dashboard', label:'Beranda', img:'https://app.iwana.id/assets/prontt/prontt-beranda.jpg'},
    {id:'pesan', label:'Pesan', img:'https://app.iwana.id/assets/prontt/prontt-pesanan.jpg'},
    {id:'riwayat', label:'Riwayat', img:'https://app.iwana.id/assets/prontt/prontt-riwayat.jpg'},
    {id:'akun', label:'Akun', img:'https://app.iwana.id/assets/prontt/prontt-akun.jpg'}
  ];
  function buildTabs(){
    document.querySelectorAll('[data-tabbar]').forEach(function(nav){
      var cur = nav.closest('.screen').id;
      nav.innerHTML = TABS.map(function(t){
        return '<button class="tab '+(t.id===cur?'on':'')+'" onclick="go(\''+t.id+'\')">'+
          '<img src="'+t.img+'" alt="'+t.label+'" style="width:32px;height:32px;object-fit:contain">'+
          '<span>'+t.label+'</span></button>';
      }).join('');
    });
  }
  function go(id){
    var cur = document.querySelector('.screen.active');
    var next = document.getElementById(id);
    if(!next || next===cur) { if(next===cur){closeSheet();} return; }
    closeSheet();
    if(cur) cur.classList.remove('active');
    next.classList.add('active');
    var sc = next.querySelector('.scroll'); if(sc) sc.scrollTop = 0;
    var sb = document.getElementById('statusbar');
    if(sb) sb.classList.toggle('onblue', id==='splash');
  }
  function seg(which){
    document.getElementById('seg-samsat').classList.toggle('on', which==='samsat');
    document.getElementById('seg-retribusi').classList.toggle('on', which==='retribusi');
    document.getElementById('seg-rumahdinas').classList.toggle('on', which==='rumahdinas');
    document.getElementById('riw-samsat').hidden = which!=='samsat';
    document.getElementById('riw-retribusi').hidden = which!=='retribusi';
    document.getElementById('riw-rumahdinas').hidden = which!=='rumahdinas';
    if(which==='rumahdinas') loadRwRumahDinas();
  }

  function loadRwRumahDinas(){
    var el = document.getElementById('riw-rd-list');
    if(!el) return;
    var rows;
    try{ rows = JSON.parse(localStorage.getItem('prontt.rdbayar.v1') || '[]'); }catch(e){ rows = []; }
    if(!rows.length){
      el.innerHTML = '<div class="empty"><div class="d">Belum ada pembayaran sewa rumah dinas.</div></div>';
      return;
    }
    var MONTHS = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
    el.innerHTML = rows.map(function(d){
      var t = new Date(d.tanggal);
      var tgl = t.getDate() + ' ' + MONTHS[t.getMonth()] + ' ' + t.getFullYear()
        + ' · ' + ('0'+t.getHours()).slice(-2) + ':' + ('0'+t.getMinutes()).slice(-2);
      var p = (d.periode||'').split('-');
      var periode = p.length === 2 ? MONTHS[+p[1]-1] + ' ' + p[0] : '';
      return '<div class="trx">'
        + '<div class="ic blue" style="width:44px;height:44px;border-radius:13px;flex:0 0 44px">'
        + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>'
        + '</div>'
        + '<div class="m">'
        + '<div class="tt">Sewa Rumah Dinas · ' + periode + '</div>'
        + '<div class="ts">' + tgl + ' · ' + (d.metode||'—') + '</div>'
        + '</div>'
        + '<div class="r"><div class="amt">' + rupiah(d.nominal) + '</div><div class="st paid">Lunas</div></div>'
        + '</div>';
    }).join('');
  }
  function pseg(which){
    document.getElementById('pseg-samsat').classList.toggle('on', which==='samsat');
    document.getElementById('pseg-retribusi').classList.toggle('on', which==='retribusi');
    document.getElementById('pesan-samsat').hidden = which!=='samsat';
    document.getElementById('pesan-retribusi').hidden = which!=='retribusi';
  }

  // ===== helpers =====
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
  function valOr(id,fb){ var el=document.getElementById(id); var v=el?el.value.trim():''; return v||fb; }

  // ===== payment sheet =====
  var payCtx = {item:'Pajak Kendaraan Bermotor', total:'Rp 1.247.500', jenis:'Pajak Kendaraan (PKB)', appId:null, bill:false, kendaraanId:null};
  function openSheet(item,total){
    payCtx.appId = null; payCtx.bill = false; payCtx.kendaraanId = null;
    if(item){ payCtx.item=item; payCtx.total=total; payCtx.jenis=item; }
    else { payCtx.item='Pajak Kendaraan Bermotor'; payCtx.total='Rp 1.247.500'; payCtx.jenis='Pajak Kendaraan (PKB)'; }
    document.getElementById('sheet-item').textContent = payCtx.item;
    document.getElementById('sheet-total').textContent = payCtx.total;
    document.getElementById('sheetMask').classList.add('show');
  }
  function openSheetApp(id){
    var a = findApp(id); if(!a) return;
    payCtx.appId = id; payCtx.bill = false; payCtx.item = 'Retribusi Sewa · '+a.id; payCtx.total = rupiah(a.total); payCtx.jenis = payCtx.item;
    document.getElementById('sheet-item').textContent = payCtx.item;
    document.getElementById('sheet-total').textContent = payCtx.total;
    document.getElementById('sheetMask').classList.add('show');
  }
  function closeSheet(){ document.getElementById('sheetMask').classList.remove('show'); }
  function pick(el){
    document.querySelectorAll('.pm').forEach(function(p){p.classList.remove('sel')});
    el.classList.add('sel');
  }
  function payNow(){
    var sel = document.querySelector('.pm.sel');
    var metode = sel ? sel.getAttribute('data-pay') : 'QRIS';
    if(payCtx.bill){
      payCtx.bill = false;
      bill.paid = true; renderBill();
      document.getElementById('rc-jenis').textContent = bill.nama;
      document.getElementById('rc-metode').textContent = metode;
      document.getElementById('rc-total').textContent = rupiah(bill.total);
      document.getElementById('sukses-sub').innerHTML = 'Retribusi '+bill.nama+' telah dibayar.<br>Kode booking: '+bill.booking+'. Tunjukkan bukti ini ke instansi terkait.';
      closeSheet(); go('sukses');
      return;
    }
    if(payCtx.appId){
      var a = findApp(payCtx.appId);
      if(a){ a.status='aktif'; a.bayar=metode; }
      document.getElementById('rc-jenis').textContent = payCtx.item;
      document.getElementById('rc-metode').textContent = metode;
      document.getElementById('rc-total').textContent = payCtx.total;
      document.getElementById('sukses-sub').innerHTML = 'Retribusi sewa berhasil dibayar.'+
        (a ? '<br>Sewa aktif hingga '+a.masa+'. SK: '+a.sk+'.' : '');
      closeSheet(); renderMyApps(); go('sukses');
      return;
    }
    document.getElementById('rc-jenis').textContent = payCtx.jenis;
    document.getElementById('rc-metode').textContent = metode;
    document.getElementById('rc-total').textContent = payCtx.total;
    var sub = document.getElementById('sukses-sub');
    if(payCtx.jenis.indexOf('Pajak')>=0){
      var kv = payCtx.kendaraanId ? cariKendaraan(payCtx.kendaraanId) : null;
      if(kv){
        var list = loadKendaraan();
        for(var i=0;i<list.length;i++){
          if(list[i].id===kv.id){ kv = list[i]; kv.tempo = tambahTahun(kv.tempo); break; }
        }
        simpanKendaraan(list);
        renderKendaraanList();
        sub.innerHTML = 'Pajak kendaraan '+kv.nopol+' telah lunas.<br>Masa berlaku diperbarui hingga '+fmtTgl(kv.tempo)+'.';
      } else {
        sub.innerHTML = 'Pajak kendaraan DH 1234 ABC telah lunas.<br>E-TBPKP &amp; bukti bayar dikirim ke akun Anda.';
      }
    } else {
      sub.innerHTML = payCtx.item+' telah lunas.<br>Bukti bayar dikirim ke akun Anda.';
    }
    closeSheet();
    go('sukses');
  }

  // ===== data retribusi =====
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
    gedung:{title:'Sewa Gedung', sub:'Gedung milik Pemprov NTT', cat:'Sewa Aset', sewa:true, sky:['#8ec9f2','#e7f3fd'], ground:'#d3e4f1', items:[
      {n:'Rumah Dinas', tag:'Hunian · Type E', loc:'Jl. Timor Raya, UPTD Veteriner', cap:'Untuk tinggal · Luas < 36 M2', p:400000, un:'per bulan', k:'RTB-SWA-214', stok:8, st:'Tersedia', art:ART_HALL},
      {n:'Sewa Rumah Dinas', tag:'Hunian · Type D', loc:'BTN Kolhua, Kupang', cap:'Untuk tinggal · Luas < 50 M2', p:500000, un:'per bulan', k:'RTB-SWA-017', stok:0, st:'Disewa', art:ART_GABLE},
      {n:'Sewa Rumah Dinas', tag:'Hunian · Semi Permanen', loc:'BTN Kolhua, Kupang', cap:'Untuk tinggal · Luas < 36 M2', p:250000, un:'per bulan', k:'RTB-SWA-019', stok:0, st:'Disewa', art:ART_TOWER},
      {n:'Sewa Rumah Dinas', tag:'Hunian · Semi Permanen', loc:'Jl. Motoain No. 3, Naikolan', cap:'Untuk tinggal · Luas < 36 M2', p:250000, un:'per bulan', k:'RTB-SWA-020', stok:0, st:'Disewa', art:ART_HALL},
      {n:'Sewa Ruko Friendship', tag:'Blok Besar', loc:'Jl. Basuki Rahmad No. 1, Naikoten', cap:'Luas 50 M2', p:30000000, un:'per tahun', k:'RTB-SWA-001', stok:0, st:'Disewa', art:ART_GABLE},
      {n:'Kuliner Oepoi', tag:'Blok A', loc:'Jl. W.J. Lalamentik, Oebufu Kupang', cap:'Luas 32 M2', p:13600000, un:'per tahun', k:'RTB-SWA-005', stok:0, st:'Disewa', art:ART_TOWER}
    ]},
    tanah:{title:'Sewa Tanah Daerah', sub:'Aset tanah milik Pemprov NTT', cat:'Sewa Aset', sewa:true, sky:['#a9d9ec','#eef8f4'], ground:'#b9e0a8', items:[
      {n:'Eks Flobamor', tag:'Tanah Kas', loc:'Naikolan, Maulafa, Kupang', cap:'-', p:75000000, un:'per tahun', k:'RTB-SWA-021', stok:0, st:'Disewa'},
      {n:'Kawasan Eks Sekolah Cina', tag:'Tanah Kawasan', loc:'Jl. Cendrawasih Bonipoi, Kota Lama', cap:'Luas 127,8 M2', p:5800000, un:'per tahun', k:'RTB-SWA-049', stok:0, st:'Disewa'},
      {n:'Kawasan Eks Sekolah Cina', tag:'Tanah Kawasan', loc:'Jl. Cendrawasih Bonipoi, Kota Lama', cap:'Luas 13,77 M2', p:650000, un:'per tahun', k:'RTB-SWA-040', stok:0, st:'Disewa'}
    ]},
    labkesehatan:{title:'Sewa Alat Lab Kesehatan', sub:'Peralatan laboratorium daerah', cat:'Sewa Aset', sewa:true, sky:['#cfe8f7','#f2f9fd'], ground:'#dce7ef', items:[
      {n:'Sewa Peralatan PKL Mahasiswa', tag:'PKL Kelompok', loc:'UPTD Laboratorium Kesehatan', cap:'1 s/d 4 Orang', p:250000, un:'per 15 hari', k:'RTB-SWA-734', stok:0, st:'Tidak Tersedia'},
      {n:'Sewa Peralatan PKL Mahasiswa', tag:'PKL Kelompok', loc:'UPTD Laboratorium Kesehatan', cap:'1 s/d 4 Orang', p:500000, un:'per bulan', k:'RTB-SWA-735', stok:0, st:'Tidak Tersedia'},
      {n:'Sewa Peralatan PKL Mahasiswa', tag:'PKL Kelompok', loc:'UPTD Laboratorium Kesehatan', cap:'1 s/d 4 Orang', p:750000, un:'per 2 bulan', k:'RTB-SWA-736', stok:0, st:'Tidak Tersedia'}
    ]},
    it:{title:'Sewa Peralatan IT', sub:'Perangkat IT milik daerah', cat:'Sewa Aset', sewa:true, sky:['#bfe0f2','#eef6fc'], ground:'#d6e2ec', items:[
      {n:'Sewa Infokus', tag:'Proyektor', loc:'UPTD Laboratorium Kesehatan', cap:'1 unit', p:100000, un:'per hari', k:'RTB-SWA-729', stok:0, st:'Tidak Tersedia'},
      {n:'Sewa Komputer', tag:'Komputer', loc:'UPTD Laboratorium Kesehatan', cap:'1 unit', p:100000, un:'per hari', k:'RTB-SWA-730', stok:0, st:'Tidak Tersedia'},
      {n:'Sewa Sound System', tag:'Sound System', loc:'UPTD Laboratorium Kesehatan', cap:'1 unit', p:300000, un:'per hari', k:'RTB-SWA-731', stok:0, st:'Tidak Tersedia'}
    ]},
    ternak:{title:'Retribusi Ternak', sub:'Penjualan hasil produksi ternak daerah', cat:'Ternak', sewa:false, sky:['#b5dffc','#eaf6fd'], ground:'#cde3b9', items:[
      {n:'Ayam Buras', tag:'Ayam Buras', loc:'UPTD Pembibitan Ternak', cap:'Umur 1-2 Bulan', p:65000, un:'per ekor', k:'RTB-TRN-206'},
      {n:'Babi', tag:'Babi', loc:'Instalasi Tarus', cap:'Umur 1,5-2 Bulan', p:1200000, un:'per ekor', k:'RTB-TRN-176'},
      {n:'Kambing', tag:'Kambing', loc:'Instalasi Sumlili', cap:'Betina, Umur 2-3 Bulan', p:1250000, un:'per ekor', k:'RTB-TRN-190'}
    ]},
    pakan:{title:'Pakan Ternak', sub:'Pakan hasil produksi daerah', cat:'Ternak', sewa:false, sky:['#ffe3ae','#fff6e8'], ground:'#e2d4bd', items:[
      {n:'Legumenosa Unggul', tag:'Benih Lamtoro', loc:'UPTD Pembibitan Ternak', cap:'Benih Lamtoro Teramba', p:75000, un:'per kg', k:'RTB-TRN-112'},
      {n:'Legumenosa Unggul', tag:'Anakan Gung', loc:'UPTD Pembibitan Ternak', cap:'Anakan Gung', p:2500, un:'per koker', k:'RTB-TRN-106'},
      {n:'Legumenosa Unggul', tag:'Pakan Ayam', loc:'UPTD Pembibitan Ternak', cap:'Pakan Ternak Ayam', p:6000, un:'per kg', k:'RTB-TRN-109'}
    ]},
    labhewan:{title:'Pemeriksaan Lab Hewan', sub:'Laboratorium kesehatan hewan daerah', cat:'Ternak', sewa:false, sky:['#cfe8f7','#f2f9fd'], ground:'#dce7ef', items:[
      {n:'Pemeriksaan Lab. Parasitologik', tag:'Diferensial', loc:'UPTD Veteriner', cap:'1 sampel', p:10000, un:'per sampel', k:'RTB-TRN-229'},
      {n:'Pemeriksaan Lab. Parasitologik', tag:'Parasit Darah', loc:'UPTD Veteriner', cap:'1 sampel', p:10000, un:'per sampel', k:'RTB-TRN-227'},
      {n:'Pemeriksaan Lab. Parasitologik', tag:'Parasit Eksternal', loc:'UPTD Veteriner', cap:'1 sampel', p:5000, un:'per sampel', k:'RTB-TRN-226'}
    ]},
    kesehatan:{title:'Jasa Laboratorium Kesehatan', sub:'Layanan pemeriksaan lab kesehatan', cat:'Jasa Kesehatan', sewa:false, sky:['#d5ecf7','#f6fbfe'], ground:'#dce7ef', items:[
      {n:'Pemeriksaan Alkohol dalam Darah', tag:'Alkohol', loc:'UPTD Laboratorium Kesehatan', cap:'1 orang', p:97500, un:'per orang', k:'RTB-KES-401'},
      {n:'Pemeriksaan Narkoba', tag:'Narkoba', loc:'UPTD Laboratorium Kesehatan', cap:'1 orang', p:75000, un:'per orang', k:'RTB-KES-402'},
      {n:'Pemeriksaan HIV/AIDS', tag:'HIV/AIDS', loc:'UPTD Laboratorium Kesehatan', cap:'1 orang', p:120000, un:'per orang', k:'RTB-KES-403'}
    ]},
    klinik:{title:'Pelayanan Jasa Laboratorium', sub:'Pemeriksaan laboratorium klinik', cat:'Jasa Kesehatan', sewa:false, sky:['#d3ecf6','#f4fafd'], ground:'#dce7ef', items:[
      {n:'Pemeriksaan Hematologi', tag:'Darah Lengkap', loc:'UPTD Laboratorium Kesehatan', cap:'Kelompok Canggih', p:80000, un:'per parameter', k:'RTB-KES-431'},
      {n:'Pemeriksaan Hematologi', tag:'Darah Rutin', loc:'UPTD Laboratorium Kesehatan', cap:'Kelompok Sederhana', p:35000, un:'per parameter', k:'RTB-KES-408'},
      {n:'Pemeriksaan Alkohol dalam Darah', tag:'Alkohol', loc:'UPTD Laboratorium Kesehatan', cap:'-', p:150000, un:'per hari', k:'RTB-KES-725'}
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

  // ===== daftar item & detail =====
  var rd = {unit:0, qty:1, name:'', cat:'', sewa:false, key:null, idx:0, from:'retribusi'};

  function renderList(key){
    var L = LISTS[key];
    document.getElementById('il-title').textContent = L.title;
    document.getElementById('il-sub').textContent = L.sub;
    document.getElementById('item-list').innerHTML = L.items.map(function(g,i){
      var art = g.art || scene(g.sky||L.sky, g.ground||L.ground, ICP[key]);
      var stat = L.sewa ? '<div class="istat"><span class="chip '+chipCls(g.st)+'">'+g.st+'</span><span class="istok">Stok: '+g.stok+' unit</span></div>' : '';
      return '<button class="icard'+(L.sewa&&g.st!=='Tersedia'?' dis':'')+'" onclick="openItem(\''+key+'\','+i+')">'
        + '<div class="iimg">'+art+'<span class="itag">'+g.tag+'</span></div>'
        + '<div class="ibody"><div class="iname">'+g.n+'</div>'
        + '<div class="isub">'+g.loc+' &middot; '+g.cap+'</div>'+stat
        + '<div class="ifoot"><div class="iprice">'+rupiah(g.p)+' <span>/ '+unitShort(g.un)+'</span></div><span class="ibtn">Detail &rarr;</span></div>'
        + '</div></button>';
    }).join('');
  }
  function openList(key){ renderList(key); go('itemlist'); }
  function openItem(key, i){
    var L = LISTS[key], g = L.items[i];
    if(L.sewa){ openAset(key,i); }
    else { openBill(key,i); }
  }

  function openRetri(name, price, info){
    var info = info || {cat:'Retribusi',kode:'RTB-000',unit:'per unit',desc:'Layanan retribusi daerah.',ic:'<path d="M3 21h18M5 21V7l7-4 7 4v14"/>'};
    rd.from = info.from || 'retribusi';
    rd.sewa = false;
    rd.unit = parseInt((price||'0').replace(/[^0-9]/g,''),10) || 0;
    rd.qty = 1; rd.name = name; rd.cat = info.cat;
    document.getElementById('rd-cat').textContent = info.cat;
    document.getElementById('rd-sub').textContent = 'Detail layanan retribusi';
    document.getElementById('rd-cat2').textContent = info.cat;
    document.getElementById('rd-name').textContent = name;
    document.getElementById('rd-kode').textContent = info.kode;
    document.getElementById('rd-unit').textContent = rupiah(rd.unit)+' / '+unitShort(info.unit);
    document.getElementById('rd-desc').textContent = info.desc;
    document.getElementById('rd-ic').innerHTML = '<svg class="rd-ic-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+info.ic+'</svg>';
    document.getElementById('rd-statusrow').hidden = true;
    document.getElementById('rd-stokrow').hidden = true;
    document.getElementById('rd-docblock').hidden = true;
    document.getElementById('rd-qtylabel').textContent = 'Masa / Jumlah';
    document.getElementById('rd-hint').textContent = 'Tarif mengacu pada Perda Retribusi Daerah Prov. NTT (data contoh presentasi).';
    var btn = document.getElementById('rd-btn');
    btn.disabled = false; btn.textContent = 'Lanjut ke Pembayaran';
    rdRender();
    go('retridetail');
  }

  function openAset(key, i){
    var g = LISTS[key].items[i];
    rd.sewa = true; rd.key = key; rd.idx = i;
    rd.unit = g.p; rd.qty = 1;
    rd.name = g.n; rd.cat = 'Sewa Aset'; rd.from = 'itemlist';
    document.getElementById('rd-cat').textContent = 'Detail Aset';
    document.getElementById('rd-sub').textContent = 'Sewa aset daerah';
    document.getElementById('rd-cat2').textContent = 'Sewa Aset';
    document.getElementById('rd-name').textContent = g.n;
    document.getElementById('rd-kode').textContent = g.k;
    document.getElementById('rd-unit').textContent = rupiah(g.p)+' / '+unitShort(g.un);
    document.getElementById('rd-desc').textContent = descOf(key,g);
    document.getElementById('rd-ic').innerHTML = '<svg class="rd-ic-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+ICP[key]+'</svg>';
    var sr = document.getElementById('rd-statusrow');
    sr.hidden = false;
    sr.innerHTML = '<span class="chip '+chipCls(g.st)+'">'+g.st+'</span>'
      + '<span style="font-size:11.5px;color:var(--muted);font-weight:600">Stok aset: '+g.stok+' unit</span>';
    document.getElementById('rd-stokrow').hidden = false;
    document.getElementById('rd-stok').textContent = g.stok+' unit';
    document.getElementById('rd-qtylabel').textContent = 'Durasi ('+unitShort(g.un)+')';
    document.getElementById('rd-docblock').hidden = false;
    renderDocs();
    var avail = g.st === 'Tersedia';
    var btn = document.getElementById('rd-btn');
    btn.disabled = !avail;
    btn.textContent = avail ? 'Ajukan Permohonan Sewa' : 'Tidak Dapat Diajukan';
    document.getElementById('rd-hint').textContent = 'Sewa aktif setelah SK Kerjasama terbit dan retribusi dibayar. Aset berstatus selain Tersedia tidak dapat diajukan.';
    rdRender();
    go('retridetail');
  }

  function renderDocs(){
    var docs = [
      ['SK Kerjasama','Contoh SK Kerjasama sewa aset','SK'],
      ['Perjanjian Sewa','Draf perjanjian sewa-menyewa','PDF'],
      ['Perda Retribusi','Perda No. 6 Tahun 2023','PDF']
    ];
    document.getElementById('rd-docs').innerHTML = docs.map(function(d){
      return '<div class="docrow"><div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h6"/></svg></div>'
        + '<div class="dn">'+d[0]+'<small>'+d[1]+'</small></div><span class="pdf">'+d[2]+'</span></div>';
    }).join('');
  }

  function rdQty(d){ rd.qty = Math.max(1, rd.qty + d); rdRender(); }
  function rdRender(){
    document.getElementById('rd-qty').textContent = rd.qty;
    document.getElementById('rd-total').textContent = rupiah(rd.unit * rd.qty);
  }
  function payRetri(){ openSheet(rd.name, rupiah(rd.unit * rd.qty)); }
  function rdCta(){ if(rd.sewa){ openForm(); } else { payRetri(); } }
  function backDetail(){ go(rd.from || 'retribusi'); }

  // ===== detail retribusi non-sewa (rincian pembayaran) =====
  var BULAN_LONG = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  var bill = {key:null, i:0, nama:'', total:0, nomor:'', booking:'', paid:false};

  function rnd(n){ var s=''; for(var x=0;x<n;x++) s += Math.floor(Math.random()*10); return s.replace(/^0/,'1'); }
  function fmtBatas(d){
    var h=d.getHours(), m=pad(d.getMinutes()), ap=h>=12?'PM':'AM';
    h=h%12; if(h===0) h=12;
    return BULAN[d.getMonth()]+' '+d.getDate()+' '+d.getFullYear()+' '+h+':'+m+ap;
  }
  function openBill(key,i){
    var g = LISTS[key].items[i], now = new Date();
    bill.key=key; bill.i=i; bill.nama=g.n; bill.total=g.p; bill.paid=false;
    bill.nomor = '34'+rnd(5);
    bill.booking = '1231571794'+rnd(6);
    document.getElementById('bl-nomor').textContent = bill.nomor;
    document.getElementById('bl-booking').textContent = bill.booking;
    document.getElementById('bl-total').textContent = rupiah(bill.total);
    document.getElementById('bl-pesanan').textContent = g.n;
    document.getElementById('bl-tgl').textContent = now.getDate()+' '+BULAN_LONG[now.getMonth()]+' '+now.getFullYear();
    document.getElementById('bl-batas').textContent = fmtBatas(new Date(now.getTime()+2*3600000));
    renderBill();
    go('bill');
  }
  function renderBill(){
    var st = document.getElementById('bl-status'), btn = document.getElementById('bl-btn');
    if(bill.paid){
      st.className = 'chip tersedia'; st.textContent = 'Lunas';
      btn.disabled = true; btn.textContent = 'Sudah Dibayar';
    } else {
      st.className = 'chip proses'; st.textContent = 'Kode Bayar Aktif';
      btn.disabled = false; btn.textContent = 'Bayar Sekarang';
    }
  }
  function copyTxt(id){
    var el = document.getElementById(id); if(!el) return;
    var t = el.textContent.trim();
    var row = el.closest ? el.closest('.billrow') : null;
    var done = function(){ if(row){ row.classList.add('copied'); setTimeout(function(){ row.classList.remove('copied'); }, 1200); } };
    function fallback(){
      var ta = document.createElement('textarea');
      ta.value = t; ta.style.position='fixed'; ta.style.opacity='0';
      document.body.appendChild(ta); ta.select();
      try{ document.execCommand('copy'); }catch(e){}
      document.body.removeChild(ta); done();
    }
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(t).then(done, fallback);
    } else { fallback(); }
  }
  function payBill(){
    if(bill.paid) return;
    openSheet(bill.nama, rupiah(bill.total));
    payCtx.bill = true;
  }

  // ===== permohonan sewa =====
  var apps = [], appSeq = 8, skSeq = 57, justSubmitted = false;

  function findApp(id){
    for(var i=0;i<apps.length;i++){ if(apps[i].id===id) return apps[i]; }
    return null;
  }
  function openForm(){
    var g = LISTS[rd.key].items[rd.idx];
    document.getElementById('pf-name').textContent = g.n;
    document.getElementById('pf-kode').textContent = g.k+' · '+rupiah(g.p)+' / '+unitShort(g.un);
    document.getElementById('pf-nama').value = 'Muhammad Ihsanul';
    document.getElementById('pf-opd').value = '';
    document.getElementById('pf-keperluan').value = '';
    document.getElementById('pf-mulai').value = isoDate(new Date());
    document.getElementById('pf-durasi').value = rd.qty;
    pfDurasi();
    go('permohonan');
  }
  function pfDurasi(){
    var d = Math.max(1, parseInt(document.getElementById('pf-durasi').value,10)||1);
    document.getElementById('pf-total').textContent = rupiah(rd.unit*d);
  }
  function submitPermohonan(){
    var g = LISTS[rd.key].items[rd.idx];
    var durasi = Math.max(1, parseInt(document.getElementById('pf-durasi').value,10)||1);
    var mulai = document.getElementById('pf-mulai').value || isoDate(new Date());
    apps.unshift({
      id:'PRM-'+('000'+appSeq++).slice(-4), nama:g.n, kode:g.k, unit:g.un,
      pemohon:valOr('pf-nama','Muhammad Ihsanul'),
      instansi:valOr('pf-opd','Perorangan'),
      keperluan:valOr('pf-keperluan','Kegiatan'),
      mulai:mulai, masa:fmtMasa(mulai,durasi), total:g.p*durasi,
      status:'menunggu', sk:'', bayar:''
    });
    justSubmitted = true;
    renderMyApps();
    go('permohonansaya');
  }
  function verifyApp(id){
    var a = findApp(id); if(!a) return;
    a.status = 'sk';
    a.sk = 'SK/'+('00'+skSeq++).slice(-3)+'/PRO-NTT/2026';
    renderMyApps();
  }
  function renderMyApps(){
    var el = document.getElementById('apps-list'); if(!el) return;
    var head = '';
    if(justSubmitted){ head = '<div class="note-ok">Permohonan berhasil dikirim. Menunggu verifikasi OPD.</div>'; justSubmitted = false; }
    if(!apps.length){
      el.innerHTML = head + '<div class="empty"><div class="t">Belum ada permohonan</div><div class="d">Ajukan sewa aset dari menu Retribusi.</div></div>';
      return;
    }
    el.innerHTML = head + apps.map(function(a){
      var chip = a.status==='menunggu' ? '<span class="chip proses">Menunggu Verifikasi OPD</span>'
        : a.status==='sk' ? '<span class="chip disewa">SK Terbit · Menunggu Retribusi</span>'
        : '<span class="chip tersedia">Aktif</span>';
      var act = '';
      if(a.status==='menunggu') act = '<button class="btn-sm" onclick="verifyApp(\''+a.id+'\')">Simulasi Verifikasi OPD</button>';
      if(a.status==='sk') act = '<button class="btn-sm gold" onclick="openSheetApp(\''+a.id+'\')">Bayar Retribusi</button>';
      return '<div class="approw"><div class="ar1"><div><div class="aid">'+a.id+'</div><div class="anm">'+a.nama+'</div></div>'+chip+'</div>'
        + '<div class="ameta">Pemohon: '+a.pemohon+' ('+a.instansi+')<br>Masa sewa: '+a.masa
        + (a.sk?'<br>No. SK: '+a.sk:'') + '<br>Keperluan: '+a.keperluan+'</div>'
        + '<div class="afoot"><span class="anilai">'+rupiah(a.total)+'</span>'+act+'</div></div>';
    }).join('');
  }
  function openMyApps(){ renderMyApps(); go('permohonansaya'); }

  // ===== kendaraan saya & pengingat pajak =====
  var KD_KEY = 'prontt.kendaraan.v1';
  var kdAktif = null;

  function gv(id){ var e=document.getElementById(id); return e ? e.value.trim() : ''; }
  function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
  }); }
  function tambahHari(n){
    var d=new Date(); d.setHours(0,0,0,0); d.setDate(d.getDate()+n);
    return isoDate(d);
  }
  function tambahTahun(iso){
    var p=(iso||'').split('-'); if(p.length!==3) return iso;
    return (+p[0]+1)+'-'+pad(+p[1])+'-'+pad(+p[2]);
  }
  function hariKeTempo(iso){
    var p=(iso||'').split('-'); if(p.length!==3) return null;
    var t=new Date(+p[0],+p[1]-1,+p[2]); var now=new Date(); now.setHours(0,0,0,0);
    return Math.round((t.getTime()-now.getTime())/86400000);
  }
  function loadKendaraan(){
    var raw = localStorage.getItem(KD_KEY);
    if(raw===null){
      var seed = [
        {id:'K'+Date.now(), nopol:'DH 1234 ABC', merk:'Toyota Avanza 1.3 G', tahun:2019, warna:'Hitam', rangka:'84213', tempo:tambahHari(24), pkb:1045000, swd:143000},
        {id:'K'+(Date.now()+1), nopol:'DH 8821 AB', merk:'Honda Vario 125', tahun:2021, warna:'Merah', rangka:'55120', tempo:tambahHari(-61), pkb:248000, swd:35000}
      ];
      localStorage.setItem(KD_KEY, JSON.stringify(seed));
      return seed;
    }
    try{ return JSON.parse(raw) || []; }catch(e){ return []; }
  }
  function simpanKendaraan(list){ try{ localStorage.setItem(KD_KEY, JSON.stringify(list)); }catch(e){} }
  function cariKendaraan(id){
    var list=loadKendaraan();
    for(var i=0;i<list.length;i++){ if(list[i].id===id) return list[i]; }
    return null;
  }
  function statusTempo(d){
    if(d===null) return {cls:'tidak', text:'Tempo belum diisi'};
    if(d<0) return {cls:'tidak', text:'Lewat '+Math.abs(d)+' hari'};
    if(d===0) return {cls:'proses', text:'Jatuh tempo hari ini'};
    if(d<=30) return {cls:'proses', text:d+' hari lagi'};
    return {cls:'tersedia', text:'Aktif · '+d+' hari lagi'};
  }
  function statusShort(d){
    if(d===null) return {cls:'tidak', text:'Belum diatur'};
    if(d<0) return {cls:'tidak', text:'Lewat '+Math.abs(d)+' hr'};
    if(d===0) return {cls:'proses', text:'Hari ini'};
    if(d<=30) return {cls:'proses', text:d+' hari'};
    return {cls:'tersedia', text:'Aktif'};
  }
  function renderKendaraanList(){
    var list=loadKendaraan();
    var overdue = 0;
    list.forEach(function(v){
      var d=hariKeTempo(v.tempo);
      if(d!==null && d<0) overdue++;
    });
    var sum=document.getElementById('kd-summary');
    if(sum){
      sum.textContent = list.length
        ? list.length+' kendaraan'+(overdue ? ' · '+overdue+' lewat jatuh tempo' : '')
        : 'Belum ada kendaraan';
    }
    var el=document.getElementById('kendaraan-list'); if(!el) return;
    if(!list.length){
      el.innerHTML = '<div class="empty"><div class="t">Belum ada kendaraan</div><div class="d">Tambahkan kendaraan untuk melihat masa berlaku dan jadwal bayar pajaknya.</div></div>';
      return;
    }
    var cards = list.map(function(v){
      var st=statusShort(hariKeTempo(v.tempo));
      return '<div class="kcard" onclick="bukaKendaraan(\''+v.id+'\')">'
        + '<div class="kplate">'+esc(v.nopol)+'</div>'
        + '<div class="km"><div class="kt">'+esc(v.merk||'Kendaraan')+'</div>'
        +   '<div class="ks">Jatuh tempo '+fmtTgl(v.tempo)+'</div></div>'
        + '<span class="chip '+st.cls+'">'+st.text+'</span>'
        + '</div>';
    }).join('');
    var note = overdue
      ? '<div class="note-warn">'+overdue+' kendaraan melewati jatuh tempo pajak. Segera lakukan pembayaran.</div>'
      : '';
    el.innerHTML = note + cards;
  }
  function hapusKendaraanAktif(){
    if(!kdAktif) return;
    simpanKendaraan(loadKendaraan().filter(function(v){ return v.id!==kdAktif; }));
    kdAktif=null;
    renderKendaraanList();
    go('kendaraansaya');
  }
  function hapusKendaraan(id){
    simpanKendaraan(loadKendaraan().filter(function(v){ return v.id!==id; }));
    renderKendaraanList();
  }
  function openTambahKendaraan(){
    ['tk2','tk3','tk-merk','tk-tahun','tk-warna','tk-rangka','tk-tempo'].forEach(function(id){
      var e=document.getElementById(id); if(e) e.value='';
    });
    var p1=document.getElementById('tk1'); if(p1) p1.value='DH';
    var pkb=document.getElementById('tk-pkb'); if(pkb) pkb.value='1045000';
    var err=document.getElementById('tk-error'); if(err) err.hidden=true;
    go('tambahkendaraan');
  }
  function simpanKendaraanBaru(){
    var err=document.getElementById('tk-error');
    var p1=gv('tk1'), p2=gv('tk2'), p3=gv('tk3');
    var tempo=gv('tk-tempo');
    var pkb=parseInt(gv('tk-pkb'),10)||0;
    var msg='';
    if(!p1 || !p2 || !p3) msg='Nomor polisi belum lengkap.';
    else if(!tempo) msg='Jatuh tempo pajak wajib diisi.';
    else if(pkb<=0) msg='Nilai PKB wajib diisi.';
    if(msg){ if(err){ err.textContent=msg; err.hidden=false; } return; }
    if(err) err.hidden=true;
    var list=loadKendaraan();
    list.unshift({
      id:'K'+Date.now(), nopol:(p1+' '+p2+' '+p3).toUpperCase(),
      merk:gv('tk-merk')||'Kendaraan', tahun:gv('tk-tahun')||'-', warna:gv('tk-warna')||'-',
      rangka:gv('tk-rangka'), tempo:tempo, pkb:pkb, swd:143000
    });
    simpanKendaraan(list);
    renderKendaraanList();
    go('kendaraansaya');
  }
  function hitungPajak(v){
    var d=hariKeTempo(v.tempo);
    var bln = (d!==null && d<0) ? Math.min(24, Math.ceil(Math.abs(d)/30)) : 0;
    var pkb=+v.pkb||0, swd=+v.swd||143000;
    var dpkb=Math.round(pkb*0.02*bln);
    var dswd=bln>0 ? 7000 : 0;
    return {hari:d, bln:bln, pkb:pkb, swd:swd, dpkb:dpkb, dswd:dswd, total:pkb+swd+dpkb+dswd};
  }
  function renderHasilPajak(v){
    var h=hitungPajak(v), st=statusTempo(h.hari);
    document.getElementById('hp-plate').textContent=v.nopol;
    document.getElementById('hp-name').textContent=v.merk||'Kendaraan';
    document.getElementById('hp-meta').textContent='Tahun '+(v.tahun||'-')+' · '+(v.warna||'-')+' · Rangka ••••'+(v.rangka||'');
    document.getElementById('hp-sub').textContent='Jatuh tempo '+fmtTgl(v.tempo);
    document.getElementById('hp-tags').innerHTML =
      '<span class="tag '+(h.hari<0?'warn':'info')+'">'+st.text+'</span>'
      + (h.bln>0 ? '<span class="tag info">Terlambat '+h.bln+' bulan</span>' : '');
    document.getElementById('hp-pkb').textContent=rupiah(h.pkb);
    document.getElementById('hp-swd').textContent=rupiah(h.swd);
    document.getElementById('hp-dendapkb').textContent=rupiah(h.dpkb);
    document.getElementById('hp-dendaswd').textContent=rupiah(h.dswd);
    document.getElementById('hp-dendapkb-row').hidden = h.dpkb===0;
    document.getElementById('hp-dendaswd-row').hidden = h.dswd===0;
    document.getElementById('hp-tempo').textContent=fmtTgl(v.tempo);
    document.getElementById('hp-total').textContent=rupiah(h.total);
    document.getElementById('hp-btn').textContent='Bayar Sekarang · '+rupiah(h.total);
  }
  function bukaKendaraan(id){
    var v=cariKendaraan(id); if(!v) return;
    kdAktif=id;
    renderHasilPajak(v);
    go('hasilpajak');
  }
  function bayarKendaraan(){
    var v=cariKendaraan(kdAktif); if(!v) return;
    var h=hitungPajak(v);
    openSheet('Pajak Kendaraan · '+v.nopol, rupiah(h.total));
    payCtx.kendaraanId=v.id;
  }
  function cekPajakManual(){
    var nopol=(gv('p1')+' '+gv('p2')+' '+gv('p3')).replace(/\s+/g,'').toUpperCase();
    var rangka=gv('rangka');
    var list=loadKendaraan(), found=null;
    for(var i=0;i<list.length;i++){
      var v=list[i];
      if(String(v.nopol).replace(/\s+/g,'').toUpperCase()===nopol && (!rangka || String(v.rangka)===rangka)){ found=v; break; }
    }
    var err=document.getElementById('cp-error');
    if(!found){
      if(err){ err.textContent='Kendaraan tidak ditemukan. Tambahkan kendaraan terlebih dahulu di menu Samsat.'; err.hidden=false; }
      return;
    }
    if(err) err.hidden=true;
    bukaKendaraan(found.id);
  }

  // live-ish clock
  function tick(){
    var d=new Date(), h=('0'+d.getHours()).slice(-2), m=('0'+d.getMinutes()).slice(-2);
    var c=document.getElementById('clock'); if(c) c.textContent=h+':'+m;
  }
  buildTabs(); tick(); renderKendaraanList(); setInterval(tick, 10000);
