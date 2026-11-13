/* PRO NTT — data lokal aplikasi (pengganti database).
   Sumber: SK Penghuni Rumah Dinas No. 000.1.4/73/BPAD1.2/2026 & daftar aset daerah. */

var DATA_LISTS = {
 "gedung": {
  "opd": "Biro Umum Setda Prov. NTT",
  "title": "Sewa Gedung",
  "sub": "Gedung milik Pemprov NTT",
  "cat": "Sewa Aset",
  "sewa": true,
  "sky": [
   "#8ec9f2",
   "#e7f3fd"
  ],
  "ground": "#d3e4f1",
  "items": [
   {
    "id": 1,
    "n": "Rumah Dinas",
    "tag": "Hunian · Type E",
    "loc": "Jl. Timor Raya, UPTD Veteriner",
    "cap": "Untuk tinggal · Luas < 36 M2",
    "p": 400000,
    "un": "per bulan",
    "k": "RTB-SWA-214",
    "stok": 8,
    "st": "Tersedia",
    "opd": "Dinas Peternakan Prov. NTT (UPTD Veteriner)",
    "img": "../img/rumah-dinas-1.jpg",
    "imgCredit": "Foto: Ozymandros Caelum / CC BY-SA 4.0"
   },
   {
    "id": 2,
    "n": "Sewa Rumah Dinas",
    "tag": "Hunian · Type D",
    "loc": "BTN Kolhua, Kupang",
    "cap": "Untuk tinggal · Luas < 50 M2",
    "p": 500000,
    "un": "per bulan",
    "k": "RTB-SWA-017",
    "stok": 0,
    "st": "Disewa",
    "opd": null,
    "img": "../img/rumah-dinas-2.jpg",
    "imgCredit": "Foto: Pijri Paijar / CC BY-SA 4.0"
   },
   {
    "id": 3,
    "n": "Sewa Rumah Dinas",
    "tag": "Hunian · Semi Permanen",
    "loc": "BTN Kolhua, Kupang",
    "cap": "Untuk tinggal · Luas < 36 M2",
    "p": 250000,
    "un": "per bulan",
    "k": "RTB-SWA-019",
    "stok": 0,
    "st": "Disewa",
    "opd": null,
    "img": "../img/rumah-dinas-3.jpg",
    "imgCredit": "Foto: Wong Langsep / CC BY-SA 4.0"
   },
   {
    "id": 4,
    "n": "Sewa Rumah Dinas",
    "tag": "Hunian · Semi Permanen",
    "loc": "Jl. Motoain No. 3, Naikolan",
    "cap": "Untuk tinggal · Luas < 36 M2",
    "p": 250000,
    "un": "per bulan",
    "k": "RTB-SWA-020",
    "stok": 0,
    "st": "Disewa",
    "opd": null,
    "img": "../img/rumah-dinas-3.jpg",
    "imgCredit": "Foto: Wong Langsep / CC BY-SA 4.0"
   },
   {
    "id": 5,
    "n": "Sewa Ruko Friendship",
    "tag": "Blok Besar",
    "loc": "Jl. Basuki Rahmad No. 1, Naikoten",
    "cap": "Luas 50 M2",
    "p": 30000000,
    "un": "per tahun",
    "k": "RTB-SWA-001",
    "stok": 0,
    "st": "Disewa",
    "opd": null,
    "img": "../img/ruko-friendship.jpg",
    "imgCredit": "Foto: Indonesiagood / CC BY 4.0"
   },
   {
    "id": 6,
    "n": "Kuliner Oepoi",
    "tag": "Blok A",
    "loc": "Jl. W.J. Lalamentik, Oebufu Kupang",
    "cap": "Luas 32 M2",
    "p": 13600000,
    "un": "per tahun",
    "k": "RTB-SWA-005",
    "stok": 0,
    "st": "Disewa",
    "opd": null,
    "img": "../img/kuliner-oepoi.jpg",
    "imgCredit": "Foto: Indonesiagood / CC BY 3.0"
   }
  ]
 },
 "it": {
  "opd": "Dinas Kesehatan Prov. NTT",
  "title": "Sewa Peralatan IT",
  "sub": "Perangkat IT milik daerah",
  "cat": "Sewa Aset",
  "sewa": true,
  "sky": [
   "#bfe0f2",
   "#eef6fc"
  ],
  "ground": "#d6e2ec",
  "items": [
   {
    "id": 13,
    "n": "Sewa Infokus",
    "tag": "Proyektor",
    "loc": "UPTD Laboratorium Kesehatan",
    "cap": "1 unit",
    "p": 100000,
    "un": "per hari",
    "k": "RTB-SWA-729",
    "stok": 0,
    "st": "Tidak Tersedia",
    "opd": null,
    "img": "../img/it-proyektor.jpg",
    "imgCredit": "Foto: Aivar Luist / Public domain"
   },
   {
    "id": 14,
    "n": "Sewa Komputer",
    "tag": "Komputer",
    "loc": "UPTD Laboratorium Kesehatan",
    "cap": "1 unit",
    "p": 100000,
    "un": "per hari",
    "k": "RTB-SWA-730",
    "stok": 0,
    "st": "Tidak Tersedia",
    "opd": null,
    "img": "../img/it-komputer.jpg",
    "imgCredit": "Foto: Terraflorin / CC BY-SA 4.0"
   },
   {
    "id": 15,
    "n": "Sewa Sound System",
    "tag": "Sound System",
    "loc": "UPTD Laboratorium Kesehatan",
    "cap": "1 unit",
    "p": 300000,
    "un": "per hari",
    "k": "RTB-SWA-731",
    "stok": 0,
    "st": "Tidak Tersedia",
    "opd": null,
    "img": "../img/it-sound.jpg",
    "imgCredit": "Foto: Dubdem e FabDub / CC BY 2.0"
   }
  ]
 },
 "kesehatan": {
  "opd": "Dinas Kesehatan Prov. NTT",
  "title": "Jasa Laboratorium Kesehatan",
  "sub": "Layanan pemeriksaan lab kesehatan",
  "cat": "Jasa Kesehatan",
  "sewa": false,
  "sky": [
   "#d5ecf7",
   "#f6fbfe"
  ],
  "ground": "#dce7ef",
  "items": [
   {
    "id": 25,
    "n": "Pemeriksaan Alkohol dalam Darah",
    "tag": "Alkohol",
    "loc": "UPTD Laboratorium Kesehatan",
    "cap": "1 orang",
    "p": 97500,
    "un": "per orang",
    "k": "RTB-KES-401",
    "stok": 0,
    "st": "Tersedia",
    "opd": null,
    "img": "../img/kes-alkohol.jpg",
    "imgCredit": "Foto: Frankincense Diala / CC0"
   },
   {
    "id": 26,
    "n": "Pemeriksaan Narkoba",
    "tag": "Narkoba",
    "loc": "UPTD Laboratorium Kesehatan",
    "cap": "1 orang",
    "p": 75000,
    "un": "per orang",
    "k": "RTB-KES-402",
    "stok": 0,
    "st": "Tersedia",
    "opd": null,
    "img": "../img/kes-narkoba.jpg",
    "imgCredit": "Foto: Spicy / CC BY-SA 4.0"
   },
   {
    "id": 27,
    "n": "Pemeriksaan HIV/AIDS",
    "tag": "HIV/AIDS",
    "loc": "UPTD Laboratorium Kesehatan",
    "cap": "1 orang",
    "p": 120000,
    "un": "per orang",
    "k": "RTB-KES-403",
    "stok": 0,
    "st": "Tersedia",
    "opd": null,
    "img": "../img/kes-hiv.jpg",
    "imgCredit": "Foto: Ajay Kumar Chaurasiya / CC BY-SA 4.0"
   }
  ]
 },
 "klinik": {
  "opd": "Dinas Kesehatan Prov. NTT",
  "title": "Pelayanan Jasa Laboratorium",
  "sub": "Pemeriksaan laboratorium klinik",
  "cat": "Jasa Kesehatan",
  "sewa": false,
  "sky": [
   "#d3ecf6",
   "#f4fafd"
  ],
  "ground": "#dce7ef",
  "items": [
   {
    "id": 28,
    "n": "Pemeriksaan Hematologi",
    "tag": "Darah Lengkap",
    "loc": "UPTD Laboratorium Kesehatan",
    "cap": "Kelompok Canggih",
    "p": 80000,
    "un": "per parameter",
    "k": "RTB-KES-431",
    "stok": 0,
    "st": "Tersedia",
    "opd": null,
    "img": "../img/klinik-hematologi.jpg",
    "imgCredit": "Foto: Ptrump16 / CC BY-SA 4.0"
   },
   {
    "id": 29,
    "n": "Pemeriksaan Hematologi",
    "tag": "Darah Rutin",
    "loc": "UPTD Laboratorium Kesehatan",
    "cap": "Kelompok Sederhana",
    "p": 35000,
    "un": "per parameter",
    "k": "RTB-KES-408",
    "stok": 0,
    "st": "Tersedia",
    "opd": null,
    "img": "../img/klinik-darah.jpg",
    "imgCredit": "Foto: Ptrump16 / CC BY-SA 4.0"
   },
   {
    "id": 30,
    "n": "Pemeriksaan Alkohol dalam Darah",
    "tag": "Alkohol",
    "loc": "UPTD Laboratorium Kesehatan",
    "cap": "-",
    "p": 150000,
    "un": "per hari",
    "k": "RTB-KES-725",
    "stok": 0,
    "st": "Tersedia",
    "opd": null,
    "img": "../img/klinik-alkohol.jpg",
    "imgCredit": "Foto: VIA Gallery / CC BY 2.0"
   }
  ]
 },
 "labhewan": {
  "opd": "Dinas Peternakan Prov. NTT",
  "title": "Pemeriksaan Lab Hewan",
  "sub": "Laboratorium kesehatan hewan daerah",
  "cat": "Ternak",
  "sewa": false,
  "sky": [
   "#cfe8f7",
   "#f2f9fd"
  ],
  "ground": "#dce7ef",
  "items": [
   {
    "id": 22,
    "n": "Pemeriksaan Lab. Parasitologik",
    "tag": "Diferensial",
    "loc": "UPTD Veteriner",
    "cap": "1 sampel",
    "p": 10000,
    "un": "per sampel",
    "k": "RTB-TRN-229",
    "stok": 0,
    "st": "Tersedia",
    "opd": null,
    "img": "../img/labhewan-parasit.jpg",
    "imgCredit": "Foto: Kneoli / CC BY 4.0"
   },
   {
    "id": 23,
    "n": "Pemeriksaan Lab. Parasitologik",
    "tag": "Parasit Darah",
    "loc": "UPTD Veteriner",
    "cap": "1 sampel",
    "p": 10000,
    "un": "per sampel",
    "k": "RTB-TRN-227",
    "stok": 0,
    "st": "Tersedia",
    "opd": null,
    "img": "../img/labhewan-darah.jpg",
    "imgCredit": "Foto: F.hoxhaj / CC BY-SA 4.0"
   },
   {
    "id": 24,
    "n": "Pemeriksaan Lab. Parasitologik",
    "tag": "Parasit Eksternal",
    "loc": "UPTD Veteriner",
    "cap": "1 sampel",
    "p": 5000,
    "un": "per sampel",
    "k": "RTB-TRN-226",
    "stok": 0,
    "st": "Tersedia",
    "opd": null,
    "img": "../img/labhewan-mikroskop.jpg",
    "imgCredit": "Foto: Punlop Anusonpornperm / CC BY 4.0"
   }
  ]
 },
 "labkesehatan": {
  "opd": "Dinas Kesehatan Prov. NTT",
  "title": "Sewa Alat Lab Kesehatan",
  "sub": "Peralatan laboratorium daerah",
  "cat": "Sewa Aset",
  "sewa": true,
  "sky": [
   "#cfe8f7",
   "#f2f9fd"
  ],
  "ground": "#dce7ef",
  "items": [
   {
    "id": 10,
    "n": "Sewa Peralatan PKL Mahasiswa",
    "tag": "PKL Kelompok",
    "loc": "UPTD Laboratorium Kesehatan",
    "cap": "1 s/d 4 Orang",
    "p": 250000,
    "un": "per 15 hari",
    "k": "RTB-SWA-734",
    "stok": 0,
    "st": "Tidak Tersedia",
    "opd": null,
    "img": "../img/labkes-1.jpg",
    "imgCredit": "Foto: Belikov Maxim / CC BY 4.0"
   },
   {
    "id": 11,
    "n": "Sewa Peralatan PKL Mahasiswa",
    "tag": "PKL Kelompok",
    "loc": "UPTD Laboratorium Kesehatan",
    "cap": "1 s/d 4 Orang",
    "p": 500000,
    "un": "per bulan",
    "k": "RTB-SWA-735",
    "stok": 0,
    "st": "Tidak Tersedia",
    "opd": null,
    "img": "../img/labkes-2.jpg",
    "imgCredit": "Foto: Goleisureintl / CC BY 4.0"
   },
   {
    "id": 12,
    "n": "Sewa Peralatan PKL Mahasiswa",
    "tag": "PKL Kelompok",
    "loc": "UPTD Laboratorium Kesehatan",
    "cap": "1 s/d 4 Orang",
    "p": 750000,
    "un": "per 2 bulan",
    "k": "RTB-SWA-736",
    "stok": 0,
    "st": "Tidak Tersedia",
    "opd": null,
    "img": "../img/labkes-3.jpg",
    "imgCredit": "Foto: Belikov Maxim / CC BY 4.0"
   }
  ]
 },
 "pakan": {
  "opd": "Dinas Peternakan Prov. NTT",
  "title": "Pakan Ternak",
  "sub": "Pakan hasil produksi daerah",
  "cat": "Ternak",
  "sewa": false,
  "sky": [
   "#ffe3ae",
   "#fff6e8"
  ],
  "ground": "#e2d4bd",
  "items": [
   {
    "id": 19,
    "n": "Legumenosa Unggul",
    "tag": "Benih Lamtoro",
    "loc": "UPTD Pembibitan Ternak",
    "cap": "Benih Lamtoro Teramba",
    "p": 75000,
    "un": "per kg",
    "k": "RTB-TRN-112",
    "stok": 0,
    "st": "Tersedia",
    "opd": null,
    "img": "../img/pakan-lamtoro.jpg",
    "imgCredit": "Foto: Ajtjohnsingh / CC BY-SA 4.0"
   },
   {
    "id": 20,
    "n": "Legumenosa Unggul",
    "tag": "Anakan Gung",
    "loc": "UPTD Pembibitan Ternak",
    "cap": "Anakan Gung",
    "p": 2500,
    "un": "per koker",
    "k": "RTB-TRN-106",
    "stok": 0,
    "st": "Tersedia",
    "opd": null,
    "img": "../img/pakan-gung.jpg",
    "imgCredit": "Foto: Vijayanrajapuram / CC BY-SA 4.0"
   },
   {
    "id": 21,
    "n": "Legumenosa Unggul",
    "tag": "Pakan Ayam",
    "loc": "UPTD Pembibitan Ternak",
    "cap": "Pakan Ternak Ayam",
    "p": 6000,
    "un": "per kg",
    "k": "RTB-TRN-109",
    "stok": 0,
    "st": "Tersedia",
    "opd": null,
    "img": "../img/pakan-ayam.jpg",
    "imgCredit": "Foto: MakaLeanne / CC BY-SA 4.0"
   }
  ]
 },
 "tanah": {
  "opd": "Biro Umum Setda Prov. NTT",
  "title": "Sewa Tanah Daerah",
  "sub": "Aset tanah milik Pemprov NTT",
  "cat": "Sewa Aset",
  "sewa": true,
  "sky": [
   "#a9d9ec",
   "#eef8f4"
  ],
  "ground": "#b9e0a8",
  "items": [
   {
    "id": 7,
    "n": "Eks Flobamor",
    "tag": "Tanah Kas",
    "loc": "Naikolan, Maulafa, Kupang",
    "cap": "-",
    "p": 75000000,
    "un": "per tahun",
    "k": "RTB-SWA-021",
    "stok": 0,
    "st": "Disewa",
    "opd": null,
    "img": "../img/tanah-1.jpg",
    "imgCredit": "Foto: Abdul Hanif Arromy / CC BY 4.0"
   },
   {
    "id": 8,
    "n": "Kawasan Eks Sekolah Cina",
    "tag": "Tanah Kawasan",
    "loc": "Jl. Cendrawasih Bonipoi, Kota Lama",
    "cap": "Luas 127,8 M2",
    "p": 5800000,
    "un": "per tahun",
    "k": "RTB-SWA-049",
    "stok": 0,
    "st": "Disewa",
    "opd": null,
    "img": "../img/tanah-2.jpg",
    "imgCredit": "Foto: Abdul Hanif Arromy / CC BY 4.0"
   },
   {
    "id": 9,
    "n": "Kawasan Eks Sekolah Cina",
    "tag": "Tanah Kawasan",
    "loc": "Jl. Cendrawasih Bonipoi, Kota Lama",
    "cap": "Luas 13,77 M2",
    "p": 650000,
    "un": "per tahun",
    "k": "RTB-SWA-040",
    "stok": 0,
    "st": "Disewa",
    "opd": null,
    "img": "../img/tanah-1.jpg",
    "imgCredit": "Foto: Abdul Hanif Arromy / CC BY 4.0"
   }
  ]
 },
 "ternak": {
  "opd": "Dinas Peternakan Prov. NTT",
  "title": "Retribusi Ternak",
  "sub": "Penjualan hasil produksi ternak daerah",
  "cat": "Ternak",
  "sewa": false,
  "sky": [
   "#b5dffc",
   "#eaf6fd"
  ],
  "ground": "#cde3b9",
  "items": [
   {
    "id": 16,
    "n": "Ayam Buras",
    "tag": "Ayam Buras",
    "loc": "UPTD Pembibitan Ternak",
    "cap": "Umur 1-2 Bulan",
    "p": 65000,
    "un": "per ekor",
    "k": "RTB-TRN-206",
    "stok": 0,
    "st": "Tersedia",
    "opd": null,
    "img": "../img/ternak-ayam.jpg",
    "imgCredit": "Foto: Fata Teguh Prasetya / CC BY-SA 4.0"
   },
   {
    "id": 17,
    "n": "Babi",
    "tag": "Babi",
    "loc": "Instalasi Tarus",
    "cap": "Umur 1,5-2 Bulan",
    "p": 1200000,
    "un": "per ekor",
    "k": "RTB-TRN-176",
    "stok": 0,
    "st": "Tersedia",
    "opd": null,
    "img": "../img/ternak-babi.jpg",
    "imgCredit": "Foto: Gzen92 / CC BY-SA 4.0"
   },
   {
    "id": 18,
    "n": "Kambing",
    "tag": "Kambing",
    "loc": "Instalasi Sumlili",
    "cap": "Betina, Umur 2-3 Bulan",
    "p": 1250000,
    "un": "per ekor",
    "k": "RTB-TRN-190",
    "stok": 0,
    "st": "Tersedia",
    "opd": null,
    "img": "../img/ternak-kambing.jpg",
    "imgCredit": "Foto: Asatama / CC BY-SA 4.0"
   }
  ]
 }
};

var DATA_TAGIHAN_RD = [
 {
  "id": "RD-001",
  "nama": "Em***el Mu***an M. Su***in, S.Pi",
  "jabatan": "Staf pada Dinas Kelautan dan Perikanan Prov. NTT",
  "alamat": "Perumahan BTN Kolhua No. D. I",
  "luas": 36,
  "tipe": "D",
  "biaya": 500000,
  "statusAsn": "PNS Aktif"
 },
 {
  "id": "RD-002",
  "nama": "Si***us To***an Ab**",
  "jabatan": "Staf pada Biro Perekonomian Setda Prov. NTT",
  "alamat": "Perumahan BTN Kolhua No. D. II",
  "luas": 36,
  "tipe": "D",
  "biaya": 500000,
  "statusAsn": "Pegawai P3K"
 },
 {
  "id": "RD-004",
  "nama": "Ja***es P. Ne***is, S.STP",
  "jabatan": "Staf pada Biro PBJ Setda Prov. NTT",
  "alamat": "Perumahan BTN Kolhua No. D. IV",
  "luas": 36,
  "tipe": "D",
  "biaya": 500000,
  "statusAsn": "PNS Aktif"
 },
 {
  "id": "RD-005",
  "nama": "No***ti Ar***yn Mau",
  "jabatan": "Staf pada BPAD Prov.NTT",
  "alamat": "Perumahan BTN Kolhua No. D. V",
  "luas": 36,
  "tipe": "D",
  "biaya": 500000,
  "statusAsn": "Pegawai P3K"
 },
 {
  "id": "RD-006",
  "nama": "Me** Sh***ni Ma***fe",
  "jabatan": "Staf pada BPAD Prov.NTT",
  "alamat": "Perumahan BTN Kolhua No. D. VI",
  "luas": 36,
  "tipe": "D",
  "biaya": 500000,
  "statusAsn": "Pegawai P3K"
 },
 {
  "id": "RD-007",
  "nama": "Ad***us La***da",
  "jabatan": "Staf pada BPAD Prov.NTT",
  "alamat": "Perumahan BTN Kolhua No. D. VII",
  "luas": 36,
  "tipe": "D",
  "biaya": 500000,
  "statusAsn": "PNS Aktif"
 },
 {
  "id": "RD-008",
  "nama": "Ma***us La***lo",
  "jabatan": "Staf pada DLHK Prov NTT",
  "alamat": "Perumahan BTN Kolhua No. D. VIII",
  "luas": 36,
  "tipe": "D",
  "biaya": 500000,
  "statusAsn": "Pegawai P3K"
 },
 {
  "id": "RD-010",
  "nama": "Ch***na Me** Pu***ri Ko***ar",
  "jabatan": "Staf pada Biro Umum Setda Prov. NTT",
  "alamat": "Perumahan BTN Kolhua No. D. X",
  "luas": 36,
  "tipe": "D",
  "biaya": 500000,
  "statusAsn": "PNS Aktif"
 },
 {
  "id": "RD-011",
  "nama": "Ap***us Ar***ho Ro***ak, S.STP",
  "jabatan": "Staf pada BPAD Prov.NTT",
  "alamat": "Perumahan BTN Kolhua No. E. 11",
  "luas": 36,
  "tipe": "D",
  "biaya": 500000,
  "statusAsn": "PNS Aktif"
 },
 {
  "id": "RD-012",
  "nama": "Em***ia So***ia Fe***ez, S.STP",
  "jabatan": "Staf pada Bapperida Provinsi NTT",
  "alamat": "Perumahan BTN Kolhua No. E. 12",
  "luas": 36,
  "tipe": "D",
  "biaya": 500000,
  "statusAsn": "PNS Aktif"
 },
 {
  "id": "RD-013",
  "nama": "Ma***na Ra**, A.Md.",
  "jabatan": "Staf pada Dinas Perindag Prov.NTT",
  "alamat": "Perumahan BTN Kolhua No. E. 13",
  "luas": 36,
  "tipe": "D",
  "biaya": 500000,
  "statusAsn": "PNS Aktif"
 },
 {
  "id": "RD-014",
  "nama": "Al***ed D. I. Tu***iu, S.Kom",
  "jabatan": "Staf pada BPAD Prov.NTT",
  "alamat": "Perumahan BTN Kolhua No. E. 14",
  "luas": 36,
  "tipe": "D",
  "biaya": 500000,
  "statusAsn": "PNS Aktif"
 },
 {
  "id": "RD-015",
  "nama": "Hi***us T. Ba***nu, S.IP",
  "jabatan": "Anggota DPRD Provinsi NTT",
  "alamat": "Perumahan BTN Kolhua No. E. 15",
  "luas": 36,
  "tipe": "D",
  "biaya": 500000,
  "statusAsn": "DPRD Aktif"
 },
 {
  "id": "RD-016",
  "nama": "Ga***el Na***no La***ng",
  "jabatan": "Staf pada Bapperida Provinsi NTT",
  "alamat": "Perumahan BTN Kolhua No. T. 1",
  "luas": 36,
  "tipe": "D",
  "biaya": 500000,
  "statusAsn": "Pegawai P3K"
 },
 {
  "id": "RD-017",
  "nama": "Ne***on Pe***en",
  "jabatan": "Staf pada BPAD Prov.NTT",
  "alamat": "Perumahan BTN Kolhua No. T. 2",
  "luas": 36,
  "tipe": "D",
  "biaya": 500000,
  "statusAsn": "Pegawai P3K"
 },
 {
  "id": "RD-018",
  "nama": "Sh***ia De** M. A. Mae",
  "jabatan": "Staf pada Bapperida Provinsi NTT",
  "alamat": "Perumahan BTN Kolhua No. T. 3",
  "luas": 36,
  "tipe": "D",
  "biaya": 500000,
  "statusAsn": "PNS Aktif"
 },
 {
  "id": "RD-019",
  "nama": "Do***us Wi***ki",
  "jabatan": "Staf pada BPAD Prov.NTT",
  "alamat": "Perumahan BTN Kolhua No. T. 4",
  "luas": 36,
  "tipe": "D",
  "biaya": 500000,
  "statusAsn": "Pegawai P3K"
 },
 {
  "id": "RD-020",
  "nama": "Ar***na Ma***ll Adu",
  "jabatan": "Staf pada BPAD Prov.NTT",
  "alamat": "Perumahan BTN Kolhua No. U. 1",
  "luas": 36,
  "tipe": "D",
  "biaya": 500000,
  "statusAsn": "PNS Aktif"
 },
 {
  "id": "RD-022",
  "nama": "Mi***ti Ke***he To***an, S.Pd",
  "jabatan": "Staf pada BPAD Prov.NTT",
  "alamat": "Perumahan Pondok Sawah No. 01",
  "luas": 30,
  "tipe": "E",
  "biaya": 250000,
  "statusAsn": "Pegawai P3K"
 },
 {
  "id": "RD-023",
  "nama": "Sa** Ju** Ul***ri Gu***om",
  "jabatan": "Staf pada Biro PBJ Setda Prov. NTT",
  "alamat": "Perumahan Pondok Sawah No. 02",
  "luas": 30,
  "tipe": "E",
  "biaya": 250000,
  "statusAsn": "Pegawai P3K"
 },
 {
  "id": "RD-024",
  "nama": "Ko***is Ko** Ha**",
  "jabatan": "Staf Dinas Sosial Provinsi NTT",
  "alamat": "Perumahan Pondok Sawah No. 03",
  "luas": 30,
  "tipe": "E",
  "biaya": 250000,
  "statusAsn": "Pegawai P3K"
 },
 {
  "id": "RD-025",
  "nama": "Fl***da da Co***ta So***es",
  "jabatan": "Staf pada BPAD Prov.NTT",
  "alamat": "Perumahan Pondok Sawah No. 04",
  "luas": 30,
  "tipe": "E",
  "biaya": 250000,
  "statusAsn": "PNS Aktif"
 }
];
