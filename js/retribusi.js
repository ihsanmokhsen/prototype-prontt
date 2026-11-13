/* PRO NTT — logika modul retribusi untuk halaman terpisah */

var rState = {cat:null, idx:0, qty:1};
var BULAN_LONG = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
var APP_KEY = PRONTT.KEYS.apps;
var APP_SEQ = PRONTT.KEYS.appSeq;

function goList(cat){ location.href = 'itemlist.html?cat=' + encodeURIComponent(cat); }

// ================= daftar item =================
var listState = {key:null, f:'all'};

function itemCard(key, g, i){
  var L = LISTS[key];
  var art = g.art || scene(g.sky||L.sky, g.ground||L.ground, ICP[key]);
  var media = g.img ? '<img src="'+g.img+'" alt="'+g.n+'" loading="lazy">' : art;
  var stat = L.sewa ? '<div class="istat"><span class="chip '+chipCls(g.st)+'">'+g.st+'</span><span class="istok">Stok: '+g.stok+' unit</span></div>' : '';
  return '<button class="icard'+(L.sewa&&g.st!=='Tersedia'?' dis':'')+'" onclick="openItem('+i+')">'
    + '<div class="iimg">'+media+'<span class="itag">'+g.tag+'</span></div>'
    + '<div class="ibody"><div class="iname">'+g.n+'</div>'
    + '<div class="isub">'+g.loc+' &middot; '+g.cap+'</div>'+stat
    + '<div class="ifoot"><div class="iprice">'+rupiah(g.p)+' <span>/ '+unitShort(g.un)+'</span></div><span class="ibtn">Detail &rarr;</span></div>'
    + '</div></button>';
}
function priceBand(p){ return p < 100000 ? 'low' : (p <= 1000000 ? 'mid' : 'high'); }
function renderFilters(){
  var L = LISTS[listState.key], opts;
  if(L.sewa){
    opts = [['all','Semua ('+L.items.length+')']];
    ['Tersedia','Disewa','Tidak Tersedia'].forEach(function(st){
      var n = L.items.filter(function(g){ return g.st === st; }).length;
      if(n) opts.push([st, st+' ('+n+')']);
    });
  } else if(listState.key === 'ternak'){
    opts = [['all','Semua ('+L.items.length+')']];
    listState.tags = [];
    L.items.forEach(function(g){ if(listState.tags.indexOf(g.tag) < 0) listState.tags.push(g.tag); });
    listState.tags.forEach(function(t, i){
      var n = L.items.filter(function(g){ return g.tag === t; }).length;
      opts.push(['t:'+i, t+' ('+n+')']);
    });
  } else {
    opts = [['all','Semua ('+L.items.length+')']];
    [['p:low','< Rp 100 rb'],['p:mid','Rp 100 rb – 1 jt'],['p:high','> Rp 1 jt']].forEach(function(b){
      var n = L.items.filter(function(g){ return priceBand(g.p) === b[0].slice(2); }).length;
      if(n) opts.push([b[0], b[1]+' ('+n+')']);
    });
  }
  var valid = opts.some(function(o){ return o[0] === listState.f; });
  if(!valid) listState.f = 'all';
  var box = document.getElementById('il-filters');
  // satu kelompok saja = filter tidak berguna, sembunyikan
  box.hidden = opts.length <= 2;
  box.innerHTML = opts.map(function(o){
    return '<button class="fchip'+(listState.f===o[0]?' on':'')+'" onclick="setFilter(\''+o[0]+'\')">'+o[1]+'</button>';
  }).join('');
}
function setFilter(f){
  listState.f = f;
  renderFilters();
  applyFilter();
}
function applyFilter(){
  var L = LISTS[listState.key];
  var q = (document.getElementById('il-search').value||'').trim().toLowerCase();
  var f = listState.f;
  var rows = [];
  L.items.forEach(function(g,i){
    var hay = (g.n+' '+g.loc+' '+g.cap+' '+g.tag+' '+g.k).toLowerCase();
    var okQ = !q || hay.indexOf(q) >= 0;
    var okF = f === 'all'
      || (f.indexOf('t:') === 0 ? g.tag === listState.tags[+f.slice(2)]
        : f.indexOf('p:') === 0 ? priceBand(g.p) === f.slice(2) : g.st === f);
    if(okQ && okF) rows.push({g:g, i:i});
  });
  document.getElementById('item-list').innerHTML = rows.map(function(r){ return itemCard(listState.key, r.g, r.i); }).join('');
  document.getElementById('il-empty').hidden = rows.length > 0;
  document.getElementById('il-count').textContent = 'Menampilkan '+rows.length+' dari '+L.items.length+' item';
}
function initList(){
  var key = qs('cat');
  if(!LISTS[key]){ location.replace('retribusi.html'); return; }
  rState.cat = key;
  listState.key = key;
  listState.f = 'all';
  var L = LISTS[key];
  document.getElementById('il-title').textContent = L.title;
  document.getElementById('il-sub').textContent = L.sub;
  renderFilters();
  applyFilter();
}
function openItem(i){
  var L = LISTS[rState.cat];
  if(!L || !L.items[i]) return;
  if(L.sewa){ location.href = 'retridetail.html?cat='+rState.cat+'&item='+i; }
  else { location.href = 'bill.html?cat='+rState.cat+'&item='+i; }
}

// ================= detail aset / layanan =================
function isRumahDinas(key,g){
  return key==='gedung' && PRONTT.isRumahDinas(g);
}
function isRumahDinasApp(a){
  return PRONTT.isRumahDinasApp(a);
}
function renderDetail(){
  var L = LISTS[rState.cat], g = L.items[rState.idx];
  var sewa = L.sewa;
  document.getElementById('rd-cat').textContent = sewa ? 'Detail Aset' : L.title;
  document.getElementById('rd-sub').textContent = sewa ? 'Sewa aset daerah' : 'Detail layanan retribusi';
  document.getElementById('rd-cat2').textContent = sewa ? 'Sewa Aset' : L.cat;
  document.getElementById('rd-name').textContent = g.n;
  document.getElementById('rd-kode').textContent = g.k;
  document.getElementById('rd-opd').textContent = g.opd || L.opd || '—';
  document.getElementById('rd-unit').textContent = rupiah(g.p)+' / '+unitShort(g.un);
  document.getElementById('rd-desc').textContent = sewa ? descOf(rState.cat,g)
    : 'Layanan '+g.n+' pada '+g.loc+'. Data contoh presentasi.';
  document.getElementById('rd-ic').innerHTML = '<svg class="rd-ic-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+ICP[rState.cat]+'</svg>';

  var photo = document.getElementById('rd-photo');
  if(photo){
    if(g.img){
      photo.hidden = false;
      var im = document.getElementById('rd-photo-img');
      im.src = g.img; im.alt = g.n;
      document.getElementById('rd-photo-credit').textContent = g.imgCredit || '';
    } else {
      photo.hidden = true;
    }
  }

  var sr = document.getElementById('rd-statusrow');
  var stokrow = document.getElementById('rd-stokrow');
  var flowblock = document.getElementById('rd-flowblock');
  var formblock = document.getElementById('rd-formblock');
  var btn = document.getElementById('rd-btn');
  var rumahDinas = sewa && isRumahDinas(rState.cat,g);
  if(formblock) formblock.hidden = !rumahDinas;
  var locrow = document.getElementById('rd-locrow');
  if(locrow){
    locrow.hidden = !rumahDinas;
    if(rumahDinas){
      document.getElementById('rd-loc').textContent = g.loc || '—';
      var mapUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent((g.loc || '') + ', Kupang, NTT');
      document.getElementById('rd-map').href = mapUrl;
    }
  }

  if(sewa){
    sr.hidden = false;
    if(rumahDinas){
      sr.innerHTML = '<span class="chip '+chipCls(g.st)+'">'+g.st+'</span>'
        + '<span style="font-size:11.5px;color:var(--muted);font-weight:600">Stok aset: '+g.stok+' unit</span>';
      stokrow.hidden = false;
      document.getElementById('rd-stok').textContent = g.stok+' unit';
    } else {
      sr.innerHTML = '<span class="chip tersedia">Bayar Langsung</span>'
        + '<span style="font-size:11.5px;color:var(--muted);font-weight:600">Tanpa permohonan &amp; SK</span>';
      stokrow.hidden = true;
    }
    document.getElementById('rd-qtylabel').textContent = rumahDinas ? 'Durasi (bulan)' : 'Durasi ('+unitShort(g.un)+')';
    if(flowblock) flowblock.hidden = !rumahDinas;
    var avail = g.st === 'Tersedia';
    btn.disabled = rumahDinas ? !avail : false;
    btn.textContent = rumahDinas
      ? (avail ? 'Ajukan Permohonan Sewa' : 'Tidak Dapat Diajukan')
      : 'Lanjut ke Pembayaran';
    document.getElementById('rd-hint').textContent = rumahDinas
      ? 'Sewa aktif setelah SK Kerjasama terbit dan retribusi dibayar. Aset berstatus selain Tersedia tidak dapat diajukan.'
      : 'Retribusi sewa dibayar langsung tanpa permohonan dan SK. Tarif mengacu pada Perda Retribusi Daerah Prov. NTT.';
  } else {
    sr.hidden = true;
    stokrow.hidden = true;
    if(flowblock) flowblock.hidden = true;
    document.getElementById('rd-qtylabel').textContent = 'Masa / Jumlah';
    btn.disabled = false;
    btn.textContent = 'Lanjut ke Pembayaran';
    document.getElementById('rd-hint').textContent = 'Tarif mengacu pada Perda Retribusi Daerah Prov. NTT (data contoh presentasi).';
  }
  rdRender();
}
function initDetail(){
  var key = qs('cat'), i = parseInt(qs('item'),10);
  if(!LISTS[key] || isNaN(i) || !LISTS[key].items[i]){ location.replace('retribusi.html'); return; }
  rState.cat = key; rState.idx = i;
  rState.qty = PRONTT.clampBulan(qs('qty'));
  renderDetail();
}
function rdQty(d){
  var g = LISTS[rState.cat].items[rState.idx];
  var max = isRumahDinas(rState.cat,g) ? 12 : 999;
  rState.qty = Math.max(1, Math.min(max, rState.qty + d));
  if(history.replaceState){
    var url = 'retridetail.html?cat='+rState.cat+'&item='+rState.idx+'&qty='+rState.qty;
    history.replaceState(null, '', url);
  }
  rdRender();
}
function rdRender(){
  var g = LISTS[rState.cat].items[rState.idx];
  document.getElementById('rd-qty').textContent = rState.qty;
  document.getElementById('rd-total').textContent = rupiah(g.p * rState.qty);
}
function rdCta(){
  var L = LISTS[rState.cat];
  var g = L && L.items[rState.idx];
  if(L && L.sewa && isRumahDinas(rState.cat,g)){
    location.href = 'permohonan.html?cat='+rState.cat+'&item='+rState.idx+'&qty='+rState.qty;
  } else {
    location.href = 'bill.html?cat='+rState.cat+'&item='+rState.idx+'&qty='+rState.qty;
  }
}
function backDetail(){
  if(document.getElementById('permohonan')){
    location.href = 'retridetail.html?cat='+rState.cat+'&item='+rState.idx+'&qty='+rState.qty;
    return;
  }
  if(rState.cat) location.href = 'itemlist.html?cat='+rState.cat;
  else location.href = 'retribusi.html';
}

// ================= form permohonan =================
function valOr(id, fb){
  var el = document.getElementById(id);
  var v = el ? el.value.trim() : '';
  return v || fb;
}
function initForm(){
  var key = qs('cat'), i = parseInt(qs('item'),10);
  if(!LISTS[key] || isNaN(i) || !LISTS[key].items[i]){ location.replace('retribusi.html'); return; }
  rState.cat = key; rState.idx = i;
  rState.qty = PRONTT.clampBulan(qs('qty'));
  var g = LISTS[key].items[i];
  if(!isRumahDinas(key,g)){
    location.replace('bill.html?cat='+key+'&item='+i+'&qty='+rState.qty);
    return;
  }
  document.getElementById('pf-name').textContent = g.n;
  document.getElementById('pf-kode').textContent = g.k+' · '+rupiah(g.p)+' / '+unitShort(g.un);
  document.getElementById('pf-nama').value = 'Muhammad Ihsanul';
  document.getElementById('pf-opd').value = '';
  document.getElementById('pf-keperluan').value = '';
  document.getElementById('pf-mulai').value = isoDate(new Date());
  document.getElementById('pf-durasi').value = String(rState.qty);
  pfDurasi();
  var drv = document.getElementById('pf-drive');
  if(drv) drv.value = '';
  pfDriveLink = '';
  pfDriveHint('');

  var rumahDinas = isRumahDinas(key,g);
  var docblock = document.getElementById('pf-docblock');
  if(docblock) docblock.hidden = !rumahDinas;
  if(rumahDinas){
    var c = contactOf(g.opd || LISTS[key].opd || '');
    var msg = 'Halo '+c.nama+', saya ingin mengajukan permohonan sewa '+g.n+' ('+g.k+'). Mohon informasi kelengkapan berkas. Terima kasih.';
    document.getElementById('pf-wa').innerHTML = '<div class="wi">'+WA_ICON+'</div>'
      + '<div class="wb"><div class="wt">Hubungi Admin OPD</div>'
      + '<div class="wd">'+c.nama+' · '+(g.opd || LISTS[key].opd || 'OPD terkait')+'<br><span class="wn">'+fmtWa(c.wa)+'</span></div></div>'
      + '<a class="wbtn" href="https://wa.me/'+c.wa+'?text='+encodeURIComponent(msg)+'" target="_blank" rel="noopener">Chat WA</a>';
  }
}
var pfDriveLink = '';
function pfDriveHint(state, msg){
  var h = document.getElementById('pf-drivehint');
  if(!h) return;
  var icon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01" stroke-linecap="round"/></svg>';
  if(state === 'ok') icon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';
  if(state === 'err') icon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>';
  var text = msg || 'Tempelkan link file/folder Drive yang sudah diatur <b>open access</b> (siapa saja yang memiliki link).';
  h.innerHTML = icon + '<span>' + text + '</span>';
  h.style.color = state === 'ok' ? '#0f7a4d' : state === 'err' ? '#b3261e' : '';
}
function pfDrive(){
  var inp = document.getElementById('pf-drive');
  var v = inp ? inp.value.trim() : '';
  pfDriveLink = '';
  if(!v){ pfDriveHint(''); return; }
  if(!PRONTT.isDriveLink(v)){
    pfDriveHint('err', 'Link harus dari Google Drive (contoh: https://drive.google.com/...).');
    return;
  }
  pfDriveLink = v;
  pfDriveHint('ok', 'Link Drive siap dikirim. Pastikan aksesnya sudah <b>open access</b>.');
}
function pfDurasi(){
  var g = LISTS[rState.cat].items[rState.idx];
  var el = document.getElementById('pf-durasi');
  var d = PRONTT.clampBulan(el.value);
  if(el.value !== String(d)) el.value = String(d);
  document.getElementById('pf-total').textContent = rupiah(g.p*d);
}
function submitPermohonan(){
  var g = LISTS[rState.cat].items[rState.idx];
  if(!isRumahDinas(rState.cat,g)){
    location.replace('bill.html?cat='+rState.cat+'&item='+rState.idx+'&qty='+rState.qty);
    return;
  }
  var durasi = PRONTT.clampBulan(document.getElementById('pf-durasi').value);
  var mulai = document.getElementById('pf-mulai').value || isoDate(new Date());
  var apps = loadApps();
  var seq = parseInt(localStorage.getItem(APP_SEQ)||'8',10);
  var id = 'PRM-'+('000'+seq).slice(-4);
  var app = {
    id:id, idsewa:'PW-'+('000'+seq).slice(-4), nama:g.n, kode:g.k, unit:g.un,
    cat:rState.cat, opd:g.opd || LISTS[rState.cat].opd || '',
    pemohon:valOr('pf-nama','Muhammad Ihsanul'),
    instansi:valOr('pf-opd','Perorangan'),
    keperluan:valOr('pf-keperluan','Kegiatan'),
    mulai:mulai, masa:PRONTT.bulanRange(mulai,durasi), total:g.p*durasi,
    status:'menunggu', sk:'', bayar:''
  };
  if(pfDriveLink){
    app.driveLink = pfDriveLink;
  }
  apps.unshift(app);
  localStorage.setItem(APP_SEQ, String(seq+1));
  saveApps(apps);
  location.href = 'permohonansaya.html?submitted=1';
}

// ================= permohonan saya =================
function loadApps(){ return PRONTT.apps(); }
function saveApps(apps){ return PRONTT.saveApps(apps); }
function findApp(id){ return PRONTT.findApp(id); }
var WA_ICON = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.6s1.1 3 1.3 3.2c.2.2 2.2 3.4 5.3 4.7.7.3 1.3.5 1.8.7.7.2 1.3.2 1.8.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3z"/><path d="M12 2a10 10 0 00-8.6 15L2 22l5.2-1.4A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1112 20z"/></svg>';
var FILE_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>';
function dataURLtoBlob(d){
  var parts = String(d||'').split(',');
  if(parts.length < 2) return null;
  var mime = (parts[0].match(/:(.*?);/)||[])[1] || 'application/octet-stream';
  var bin = atob(parts[1]);
  var arr = new Uint8Array(bin.length);
  for(var i=0;i<bin.length;i++) arr[i] = bin.charCodeAt(i);
  return new Blob([arr], {type:mime});
}
function viewBerkas(id){
  var raw = null;
  try{ raw = sessionStorage.getItem(PRONTT.KEYS.file+id); }catch(e){}
  if(!raw){ alert('Berkas hanya tersimpan selama sesi ini. Silakan unggah ulang atau kirim langsung ke admin OPD.'); return; }
  var f = null;
  try{ f = JSON.parse(raw); }catch(e){ return; }
  var blob = dataURLtoBlob(f.data);
  if(!blob){ alert('Berkas tidak dapat dibuka.'); return; }
  var url = URL.createObjectURL(blob);
  if(/^image\//.test(f.type) || f.type==='application/pdf'){
    window.open(url, '_blank');
  } else {
    var a = document.createElement('a');
    a.href = url; a.download = f.name || 'surat-permohonan';
    document.body.appendChild(a); a.click(); a.remove();
  }
  setTimeout(function(){ URL.revokeObjectURL(url); }, 60000);
}
function fmtWa(n){
  var s = String(n||'');
  if(s.indexOf('62') === 0){
    var rest = s.slice(2);
    if(rest.length >= 9) return '+62 '+rest.slice(0,3)+'-'+rest.slice(3,7)+'-'+rest.slice(7);
  }
  return s ? '+'+s : '—';
}
function renderMyApps(){
  var el = document.getElementById('apps-list'); if(!el) return;
  var apps = loadApps().filter(isRumahDinasApp);
  var head = '';
  if(qs('submitted')){
    var latest = apps[0];
    head = '<div class="note-ok">Permohonan berhasil dikirim'
      + (latest && (latest.driveLink || latest.berkas) ? ' beserta surat permohonan' : '')
      + '. Menunggu verifikasi OPD.</div>';
    if(history.replaceState) history.replaceState(null, '', 'permohonansaya.html');
  }
  if(!apps.length){
    el.innerHTML = head + '<div class="empty"><div class="t">Belum ada permohonan</div><div class="d">Ajukan sewa rumah dinas dari menu Retribusi.</div></div>';
    return;
  }
  el.innerHTML = head + apps.map(function(a){
    var chip = a.status==='menunggu' ? '<span class="chip proses">Menunggu Verifikasi OPD</span>'
      : a.status==='sk' ? '<span class="chip disewa">SK Terbit · Bayar Bulanan</span>'
      : '<span class="chip tersedia">Aktif</span>';
    var act = '';
    if(a.status==='menunggu') act = '<button class="btn-sm" onclick="verifyApp(\''+a.id+'\')">Simulasi Verifikasi OPD</button>';
    if(a.status==='sk' || a.status==='aktif') act = '<button class="btn-sm gold" onclick="location.href=\'cek-retribusi.html?id='+encodeURIComponent(idSewaOfApp(a))+'\'">Bayar Bulan Ini</button>';
    var berkasBlock = a.driveLink
      ? '<div class="berkas">'+FILE_ICON+'<span>Surat Permohonan (Google Drive)</span><a href="'+a.driveLink+'" target="_blank" rel="noopener">Buka</a></div>'
      : (a.berkas
        ? '<div class="berkas">'+FILE_ICON+'<span>'+a.berkas+'</span><button onclick="viewBerkas(\''+a.id+'\')">Lihat</button></div>'
        : '');
    var waBlock = '';
    if(a.status==='menunggu'){
      var opdName = a.opd || (a.cat && LISTS[a.cat] ? LISTS[a.cat].opd : '');
      var c = contactOf(opdName);
      var msg = 'Halo '+c.nama+', saya ingin menindaklanjuti permohonan sewa aset PRO NTT '+a.id+' ('+a.nama+').'
        + (a.driveLink ? ' Link surat permohonan: '+a.driveLink+'.' : (a.berkas ? ' Saya sudah mengunggah surat permohonan ('+a.berkas+').' : ''))
        + ' Mohon bantu verifikasi. Terima kasih.';
      waBlock = '<div class="wa-follow">'
        + '<div class="wi">'+WA_ICON+'</div>'
        + '<div class="wb"><div class="wt">Bantu follow up verifikasi</div>'
        + '<div class="wd">'+c.nama+' · '+(opdName||'OPD terkait')+'<br><span class="wn">'+fmtWa(c.wa)+'</span></div></div>'
        + '<a class="wbtn" href="https://wa.me/'+c.wa+'?text='+encodeURIComponent(msg)+'" target="_blank" rel="noopener">Chat WA</a>'
        + '</div>';
    }
    return '<div class="approw"><div class="ar1"><div><div class="aid">'+idSewaOfApp(a)+'</div><div class="anm">'+a.nama+'</div></div>'+chip+'</div>'
      + '<div class="ameta">Pemohon: '+a.pemohon+' ('+a.instansi+')<br>Masa sewa: '+a.masa
      + (a.sk?'<br>No. SK: '+a.sk:'') + '<br>Keperluan: '+a.keperluan+'</div>'
      + berkasBlock
      + waBlock
      + (a.sk ? '<div class="hint" style="margin:8px 0 0">Bayar tiap bulan di Cek &amp; Bayar dengan ID <b>'+idSewaOfApp(a)+'</b>.</div>' : '')
      + '<div class="afoot"><span class="anilai">'+rupiah(PRONTT.tarifBulananApp(a))+' <small style="font-weight:600;color:var(--muted)">/ bulan</small></span>'+act+'</div></div>';
  }).join('');
}
function verifyApp(id){
  var apps = loadApps();
  for(var i=0;i<apps.length;i++){
    if(apps[i].id===id){
      var seq = parseInt(localStorage.getItem('prontt.skseq.v1')||'57',10);
      apps[i].status = 'sk';
      apps[i].sk = 'SK/'+('00'+seq).slice(-3)+'/PRO-NTT/2026';
      apps[i].tglSk = fmtTgl(isoDate(new Date()));
      localStorage.setItem('prontt.skseq.v1', String(seq+1));
      break;
    }
  }
  saveApps(apps);
  renderMyApps();
}
function openSheetApp(id){
  var a = findApp(id); if(!a) return;
  openSheet('Retribusi Sewa · '+a.sk+' · '+a.pemohon, rupiah(a.total), function(metode){
    var apps = loadApps();
    for(var i=0;i<apps.length;i++){
      if(apps[i].id===id){ apps[i].status='aktif'; apps[i].bayar=metode; }
    }
    saveApps(apps);
    PRONTT.recordPayment(a, metode);
    goSukses({
      jenis:'Retribusi Sewa · '+a.sk,
      total:rupiah(a.total),
      metode:metode,
      sub:'Retribusi sewa berhasil dibayar.<br>ID Penyewa: '+idSewaOfApp(a)+'<br>No. SK: '+a.sk+'<br>Nama: '+a.pemohon+'<br>Sewa aktif hingga '+a.masa+'.',
      back:'permohonansaya.html'
    });
  });
}

// ================= tagihan retribusi non-sewa =================
var billState = null;
function rnd(n){ var s=''; for(var x=0;x<n;x++) s += Math.floor(Math.random()*10); return s.replace(/^0/,'1'); }
function fmtBatas(d){
  var h=d.getHours(), m=pad(d.getMinutes()), ap=h>=12?'PM':'AM';
  h=h%12; if(h===0) h=12;
  return BULAN[d.getMonth()]+' '+d.getDate()+' '+d.getFullYear()+' '+h+':'+m+ap;
}
function billStoreKey(){ return 'prontt.bill.'+billState.key+'.'+billState.idx+'.'+(billState.qty||1); }
function saveBill(){
  try{ sessionStorage.setItem(billStoreKey(), JSON.stringify(billState)); }catch(e){}
}
function initBill(){
  var key = qs('cat'), i = parseInt(qs('item'),10);
  if(!LISTS[key] || isNaN(i) || !LISTS[key].items[i]){ location.replace('retribusi.html'); return; }
  var g = LISTS[key].items[i], now = new Date();
  var qty = Math.max(1, parseInt(qs('qty'),10)||1);
  var raw = null;
  try{ raw = sessionStorage.getItem('prontt.bill.'+key+'.'+i+'.'+qty); }catch(e){}
  if(raw){
    try{ billState = JSON.parse(raw); }catch(e){ billState = null; }
  }
  if(!billState){
    billState = {
      key:key, idx:i, qty:qty, nama:g.n, total:g.p*qty, paid:false,
      nomor:'34'+rnd(5),
      booking:'1231571794'+rnd(6),
      tgl:now.getDate()+' '+BULAN_LONG[now.getMonth()]+' '+now.getFullYear(),
      batas:fmtBatas(new Date(now.getTime()+2*3600000))
    };
    saveBill();
  }
  document.getElementById('bl-nomor').textContent = billState.nomor;
  document.getElementById('bl-booking').textContent = billState.booking;
  document.getElementById('bl-total').textContent = rupiah(billState.total);
  document.getElementById('bl-pesanan').textContent = billState.nama;
  document.getElementById('bl-opd').textContent = g.opd || LISTS[key].opd || '—';
  var bphoto = document.getElementById('bl-photo');
  if(bphoto){
    if(g.img){
      bphoto.hidden = false;
      var bim = document.getElementById('bl-photo-img');
      bim.src = g.img; bim.alt = g.n;
      document.getElementById('bl-photo-credit').textContent = g.imgCredit || '';
    } else {
      bphoto.hidden = true;
    }
  }
  document.getElementById('bl-tgl').textContent = billState.tgl;
  document.getElementById('bl-batas').textContent = billState.batas;
  renderBill();
}
function renderBill(){
  var st = document.getElementById('bl-status'), btn = document.getElementById('bl-btn');
  if(!st || !btn) return;
  if(billState.paid){
    st.className = 'chip tersedia'; st.textContent = 'Lunas';
    btn.disabled = true; btn.textContent = 'Sudah Dibayar';
  } else {
    st.className = 'chip proses'; st.textContent = 'Kode Bayar Aktif';
    btn.disabled = false; btn.textContent = 'Bayar Sekarang';
  }
}
function backBill(){
  if(billState && billState.key) location.href = 'itemlist.html?cat='+billState.key;
  else location.href = 'retribusi.html';
}
function payBill(){
  if(!billState || billState.paid) return;
  openSheet(billState.nama, rupiah(billState.total), function(metode){
    billState.paid = true;
    saveBill();
    goSukses({
      jenis:billState.nama,
      total:rupiah(billState.total),
      metode:metode,
      sub:'Retribusi '+billState.nama+' telah dibayar.<br>Kode booking: '+billState.booking+'. Tunjukkan bukti ini ke instansi terkait.',
      back:'bill.html?cat='+billState.key+'&item='+billState.idx+'&qty='+(billState.qty||1)
    });
  });
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

// ================= cek & bayar retribusi (No SK / Kerjasama) =================
var CEK_PAID = 'prontt.skpaid.v1';
var cekState = null;

function normId(s){ return String(s||'').toUpperCase().replace(/[^A-Z0-9]/g,''); }
function loadPaid(){
  try{ return JSON.parse(localStorage.getItem(CEK_PAID)||'{}'); }catch(e){ return {}; }
}
function savePaid(m){
  try{ localStorage.setItem(CEK_PAID, JSON.stringify(m)); }catch(e){}
}
function idSewaOfApp(a){
  if(!a) return '';
  if(a.idsewa) return a.idsewa;
  var n = String(a.id||'').replace(/\D/g,'').slice(-4);
  return n ? 'PW-'+n : '';
}
function appToBill(a){
  var paid = a.status === 'aktif';
  return {
    source:'app', appId:a.id, sk:a.sk, idsewa:idSewaOfApp(a),
    kerjasama:'PKS/'+a.sk.replace(/^SK\//,''),
    nama:a.nama, kode:a.kode, pemohon:a.pemohon, instansi:a.instansi,
    penyewa:[a.pemohon],
    keperluan:a.keperluan, masa:a.masa, tglSk:a.tglSk || '—',
    opd:a.instansi, pokok:a.total, denda:0, total:a.total,
    status: paid ? 'lunas' : 'belum'
  };
}
function seedToBill(s, paidMap){
  var paid = !!paidMap[s.sk] || s.status === 'lunas';
  return {
    source:'seed', sk:s.sk, idsewa:s.idsewa, kerjasama:s.kerjasama,
    nama:s.nama, kode:s.kode, pemohon:s.pemohon, instansi:s.instansi,
    penyewa:s.penyewa || [],
    keperluan:s.keperluan, masa:s.masa, tglSk:s.tglSk, opd:s.opd,
    pokok:s.pokok, denda:s.denda || 0, total:s.pokok + (s.denda||0),
    status: paid ? 'lunas' : 'belum'
  };
}
function allBills(){
  var paidMap = loadPaid();
  var cands = [];
  loadApps().forEach(function(a){ if(a.sk) cands.push(appToBill(a)); });
  SK_SEED.forEach(function(s){ cands.push(seedToBill(s, paidMap)); });
  return cands;
}
function findSewa(query){
  var q = normId(query);
  if(!q) return null;
  var cands = allBills();
  var exact = cands.filter(function(c){ return normId(c.idsewa)===q; });
  if(exact.length) return exact[0];
  var part = cands.filter(function(c){ return normId(c.idsewa).indexOf(q)>=0; });
  return part.length===1 ? part[0] : null;
}
function initCek(){
  var pre = qs('id');
  var el = document.getElementById('ck-idsewa');
  if(pre && el) el.value = pre;
  var box = document.getElementById('ck-samples');
  if(box){
    box.innerHTML = SK_SEED.map(function(s){
      return '<button class="btn-sm" onclick="cekFill(\''+s.idsewa+'\')">'+s.idsewa+'</button>';
    }).join('');
  }
}
function cekFill(v){
  var el = document.getElementById('ck-idsewa');
  if(!el) return;
  el.value = v;
  el.focus();
}
function cekRetribusi(){
  var el = document.getElementById('ck-idsewa');
  var v = el ? (el.value||'').trim() : '';
  if(!v){ if(el) el.focus(); return; }
  location.href = 'cek-hasil.html?id='+encodeURIComponent(v);
}
function initCekHasil(){
  var bill = findSewa(qs('id'));
  cekState = bill || null;
  var notfound = document.getElementById('cek-notfound');
  var found = document.getElementById('cek-found');
  var footer = document.getElementById('ck-footer');
  if(!bill){
    notfound.hidden = false;
    found.hidden = true;
    footer.hidden = true;
    return;
  }
  notfound.hidden = true;
  found.hidden = false;
  footer.hidden = false;

  var c = cekState, lunas = c.status === 'lunas';
  document.getElementById('ck-sk').textContent = c.sk;
  document.getElementById('ck-nama').textContent = c.nama;
  document.getElementById('ck-sub').textContent = c.instansi+' · '+c.kode;
  document.getElementById('ck-kerjasama').textContent = c.kerjasama;
  document.getElementById('ck-kode').textContent = c.kode;
  document.getElementById('ck-idsewa').textContent = c.idsewa || '—';
  document.getElementById('ck-pemohon').textContent = c.pemohon || '—';
  document.getElementById('ck-instansi').textContent = c.instansi;
  document.getElementById('ck-keperluan').textContent = c.keperluan;
  document.getElementById('ck-masa').textContent = c.masa;
  document.getElementById('ck-tglsk').textContent = c.tglSk;
  document.getElementById('ck-pokok').textContent = rupiah(c.pokok);
  document.getElementById('ck-denda').textContent = rupiah(c.denda);
  document.getElementById('ck-dendarow').hidden = !c.denda;
  document.getElementById('ck-total').textContent = rupiah(c.total);
  document.getElementById('ck-statusrow').innerHTML =
    '<span class="chip '+(lunas?'tersedia':'proses')+'">'+(lunas?'Lunas':'Belum Dibayar')+'</span>'
    + '<span class="tag info">'+(c.source==='app'?'SK Permohonan':'Data Contoh SK')+'</span>';

  var btn = document.getElementById('ck-bayar');
  btn.disabled = lunas;
  btn.textContent = lunas ? 'Sudah Dibayar' : 'Bayar Sekarang · '+rupiah(c.total);
}
function backCek(){
  var id = (cekState && cekState.idsewa) || qs('id') || '';
  location.href = 'cek-retribusi.html'+(id ? '?id='+encodeURIComponent(id) : '');
}
function bayarCek(){
  var c = cekState;
  if(!c || c.status === 'lunas') return;
  openSheet('Retribusi · '+c.sk, rupiah(c.total), function(metode){
    if(c.source === 'app'){
      var apps = loadApps();
      for(var i=0;i<apps.length;i++){
        if(apps[i].id === c.appId){
          apps[i].status = 'aktif';
          apps[i].bayar = metode;
          if(!apps[i].tglSk) apps[i].tglSk = fmtTgl(isoDate(new Date()));
        }
      }
      saveApps(apps);
    } else {
      var m = loadPaid(); m[c.sk] = true; savePaid(m);
    }
    goSukses({
      jenis:'Retribusi · '+c.sk,
      total:rupiah(c.total),
      metode:metode,
      sub:'Retribusi <b>'+c.nama+'</b> telah dibayar.<br>ID Penyewa: '+c.idsewa+'<br>No. SK: '+c.sk+'.',
      back:'cek-hasil.html?id='+encodeURIComponent(c.idsewa||''),
      backLabel:'Kembali ke Tagihan'
    });
  });
}

// ================= sukses =================
function initSukses(){
  var jenis = qs('jenis'), metode = qs('metode'), total = qs('total'), sub = qs('sub');
  if(jenis) document.getElementById('rc-jenis').textContent = jenis;
  if(metode) document.getElementById('rc-metode').textContent = metode;
  if(total) document.getElementById('rc-total').textContent = total;
  if(sub) document.getElementById('sukses-sub').innerHTML = sub;
  var back = qs('back'), backLabel = qs('backLabel');
  var backBtn = document.getElementById('rc-back');
  if(backBtn && back){
    backBtn.textContent = backLabel || 'Kembali';
    backBtn.onclick = function(){ location.href = back; };
  }
  var y = new Date().getFullYear();
  document.getElementById('rc-ref').textContent = 'PRONTT-'+y+('0000'+Math.floor(Math.random()*10000)).slice(-4);
}

// ================= router halaman =================
document.addEventListener('DOMContentLoaded', function(){
  if(document.getElementById('retribusi')) return;
  var needsData = document.getElementById('itemlist')
    || document.getElementById('retridetail')
    || document.getElementById('permohonan')
    || document.getElementById('permohonansaya')
    || document.getElementById('bill')
    || document.getElementById('cekretribusi')
    || document.getElementById('cekhasil')
    || document.getElementById('sukses');
  if(!needsData) return;
  initData(function(err){
    if(err){ console.error('Gagal memuat data:', err); return; }
    if(document.getElementById('itemlist')) return initList();
    if(document.getElementById('retridetail')) return initDetail();
    if(document.getElementById('permohonan')) return initForm();
    if(document.getElementById('permohonansaya')) return renderMyApps();
    if(document.getElementById('bill')) return initBill();
    if(document.getElementById('cekretribusi')) return initCek();
    if(document.getElementById('cekhasil')) return initCekHasil();
    if(document.getElementById('sukses')) return initSukses();
  });
});
