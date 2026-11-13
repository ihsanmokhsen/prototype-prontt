/* PRO NTT — shell bersama untuk halaman terpisah:
   bingkai perangkat, status bar, tab bar, dan sheet pembayaran. */

var SHELL_TABS = [
  {id:'dashboard', label:'Beranda', img:'https://app.iwana.id/assets/prontt/prontt-beranda.jpg', href:'../index.html#dashboard'},
  {id:'pesan', label:'Pesan', img:'https://app.iwana.id/assets/prontt/prontt-pesanan.jpg', href:'../index.html#pesan'},
  {id:'riwayat', label:'Riwayat', img:'https://app.iwana.id/assets/prontt/prontt-riwayat.jpg', href:'../index.html#riwayat'},
  {id:'akun', label:'Akun', img:'https://app.iwana.id/assets/prontt/prontt-akun.jpg', href:'../index.html#akun'}
];

var STATUS_DOTS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 20h.01M6 20v-4M10 20v-8M14 20v-12M18 20V4" stroke-linecap="round"/></svg>'
  + '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 6c3.3 0 6.3 1.3 8.5 3.4l-1.4 1.4C17.3 9 14.8 8 12 8S6.7 9 4.9 10.8L3.5 9.4C5.7 7.3 8.7 6 12 6zm0 4c1.9 0 3.6.7 4.9 1.9l-1.5 1.5c-.9-.8-2.1-1.4-3.4-1.4s-2.5.6-3.4 1.4L7.1 11.9C8.4 10.7 10.1 10 12 10zm0 4c.8 0 1.5.3 2 .8L12 17l-2-2.2c.5-.5 1.2-.8 2-.8z"/></svg>'
  + '<svg viewBox="0 0 26 16" fill="none"><rect x="1" y="2" width="20" height="12" rx="3" stroke="currentColor" stroke-width="1.6"/><rect x="3" y="4" width="15" height="8" rx="1.5" fill="currentColor"/><rect x="22.5" y="5.5" width="2" height="5" rx="1" fill="currentColor"/></svg>';

var SHEET_HTML = ''
  + '<div class="sheet-mask" id="sheetMask" onclick="if(event.target===this)closeSheet()">'
  +   '<div class="sheet">'
  +     '<div class="grab"></div>'
  +     '<h3>Pilih Metode Pembayaran</h3>'
  +     '<div class="ssub" id="sheet-item">Retribusi</div>'
  +     '<div class="paytotal"><span class="k">Total Pembayaran</span><span class="v" id="sheet-total">Rp 0</span></div>'
  +     '<div class="paygroup">Scan QRIS</div>'
  +     '<div class="pm sel" data-pay="QRIS" onclick="pick(this)">'
  +       '<div class="logo" style="background:linear-gradient(135deg,#d2232a,#9a1b20)">QRIS</div>'
  +       '<div style="flex:1"><div class="pmn">QRIS</div><div class="pmd">Semua bank &amp; e-wallet</div></div>'
  +       '<div class="radio"></div>'
  +     '</div>'
  +     '<div class="paygroup">E-Wallet</div>'
  +     '<div class="pm" data-pay="GoPay" onclick="pick(this)"><div class="logo" style="background:#00aed6">Go</div><div style="flex:1"><div class="pmn">GoPay</div><div class="pmd">Saldo Rp 320.000</div></div><div class="radio"></div></div>'
  +     '<div class="pm" data-pay="DANA" onclick="pick(this)"><div class="logo" style="background:#118eea">DANA</div><div style="flex:1"><div class="pmn">DANA</div><div class="pmd">Terhubung</div></div><div class="radio"></div></div>'
  +     '<div class="pm" data-pay="ShopeePay" onclick="pick(this)"><div class="logo" style="background:#ee4d2d">SPay</div><div style="flex:1"><div class="pmn">ShopeePay</div><div class="pmd">Terhubung</div></div><div class="radio"></div></div>'
  +     '<div class="paygroup">Virtual Account</div>'
  +     '<div class="pm" data-pay="VA Bank NTT" onclick="pick(this)"><div class="logo" style="background:#0f5fb0">NTT</div><div style="flex:1"><div class="pmn">Bank NTT</div><div class="pmd">Virtual Account</div></div><div class="radio"></div></div>'
  +     '<div class="pm" data-pay="VA BRI" onclick="pick(this)"><div class="logo" style="background:#00529c">BRI</div><div style="flex:1"><div class="pmn">BRI</div><div class="pmd">Virtual Account</div></div><div class="radio"></div></div>'
  +     '<div style="height:8px"></div>'
  +     '<button class="btn btn-blue" onclick="payNow()">Bayar Sekarang</button>'
  +     '<div style="height:10px"></div>'
  +     '<button class="btn" style="background:#fff;color:var(--muted)" onclick="closeSheet()">Batal</button>'
  +   '</div>'
  + '</div>';

function buildTabs(){
  document.querySelectorAll('[data-tabbar]').forEach(function(nav){
    nav.innerHTML = SHELL_TABS.map(function(t){
      return '<button class="tab" onclick="location.href=\''+t.href+'\'">'
        + '<img src="'+t.img+'" alt="'+t.label+'">'
        + '<span>'+t.label+'</span></button>';
    }).join('');
  });
}

function tick(){
  var d = new Date(), h = ('0'+d.getHours()).slice(-2), m = ('0'+d.getMinutes()).slice(-2);
  var c = document.getElementById('clock'); if(c) c.textContent = h+':'+m;
}

var sheetCtx = {item:'', total:'', onPaid:null};

function openSheet(item, total, onPaid){
  sheetCtx.item = item || 'Retribusi';
  sheetCtx.total = total || 'Rp 0';
  sheetCtx.onPaid = onPaid || null;
  document.getElementById('sheet-item').textContent = sheetCtx.item;
  document.getElementById('sheet-total').textContent = sheetCtx.total;
  document.getElementById('sheetMask').classList.add('show');
}
function closeSheet(){
  var mask = document.getElementById('sheetMask');
  if(mask) mask.classList.remove('show');
}
function pick(el){
  document.querySelectorAll('.pm').forEach(function(p){ p.classList.remove('sel'); });
  el.classList.add('sel');
}
function payNow(){
  var sel = document.querySelector('.pm.sel');
  var metode = sel ? sel.getAttribute('data-pay') : 'QRIS';
  var cb = sheetCtx.onPaid;
  sheetCtx.onPaid = null;
  closeSheet();
  if(cb) cb(metode);
}
function goSukses(data){
  location.href = 'sukses.html?' + new URLSearchParams(data).toString();
}

function initShell(){
  var page = document.querySelector('body > section.screen');
  if(!page) return;
  var stage = document.createElement('div');
  stage.className = 'stage';
  stage.innerHTML = '<div class="screen-wrap">'
    + '<div class="viewport"></div>'
    + SHEET_HTML
    + '</div>';
  document.body.appendChild(stage);
  stage.querySelector('.viewport').appendChild(page);
  buildTabs();
}

document.addEventListener('DOMContentLoaded', initShell);
