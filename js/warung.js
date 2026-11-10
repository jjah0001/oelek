"use strict";
// Warung: a chat with Bu Lastri, a sambal cook from the kampung, played by Claude (the oelek-pair Worker's /warung,
// or Claude directly inside claude.ai). Her persona is written in Indonesian in worker/worker.js (warungPrompt);
// the copy below is used only inside claude.ai and is kept in step with it.
// ================= warung =================
const WARUNG_PROXY = typeof PAIR_PROXY==="string" && PAIR_PROXY ? PAIR_PROXY.replace(/\/pair$/,"/warung") : "";
const WARUNG_KEY="oelek.warung.v1"; // only used to clear what older versions kept
const WARUNG_IDEAS=["Hello! What is this place?","Which sambal should I try first?","What do Javanese people eat for breakfast?","Where did you learn to make sambal?","I can't handle much heat. What can I eat?","What should I order at your warung?"];
// Guests from Indonesia are greeted, and offered questions, in Bahasa Indonesia.
const WARUNG_IDEAS_ID=["Halo Bu! Hari ini masak apa?","Sambal apa yang harus saya coba dulu?","Orang Jawa biasanya sarapan apa?","Ibu belajar bikin sambal di mana?","Saya nggak kuat pedas. Enaknya makan apa?","Di warung Ibu enaknya pesan apa?"];
let warungLang="en";
let warungLog=[], warungBusy=false, warungCtl=null, warungOpened=false;

function warungTime(){ // the kampung's hour: a previewed ?jam= or the visitor's own clock
  let h; try{ const q=parseFloat(new URLSearchParams(location.search).get("jam")); if(!isNaN(q)) h=q; }catch(e){}
  if(h===undefined){ const d=new Date(); h=d.getHours()+d.getMinutes()/60; }
  const t=h<5?"malam":h<6.5?"subuh":h<11?"pagi":h<15?"siang":h<18.3?"sore":"malam";
  // At dusk the kampung picture stays light for a while after 18:18; until it darkens (senthir unlit) it is still sore.
  return t==="malam"&&h>=12&&typeof document!=="undefined"&&document.documentElement.dataset.kampung==="siang"?"sore":t;
}
const WARUNG_HARI={"malamFitri":["Tonight is malam takbiran, the eve of Lebaran! Hear the drums from the mosque? Tomorrow the fasting month is over.","Malam ini malam takbiran! Dengar bedugnya? Besok Lebaran.","malam takbiran, malam sebelum Idul Fitri: bedug dan takbir dari masjid, obor dan kembang api; Anda sibuk menyiapkan ketupat dan opor untuk besok"],"fitri":["Selamat Idul Fitri! Mohon maaf lahir dan batin (please forgive me, body and soul): that's what we say to everyone at Lebaran. There's ketupat and opor today, please eat.","Selamat Idul Fitri, mohon maaf lahir dan batin! Ketupat sama opornya masih banyak, monggo dimakan.","masa Lebaran (Idul Fitri): orang saling bermaaf-maafan dan bersilaturahmi, ada ketupat, opor ayam, sambal goreng ati dan kue kering"],"malamAdha":["Tonight is the eve of Idul Adha, the Feast of Sacrifice. Tomorrow after prayers the meat is shared with every house.","Malam ini takbiran Idul Adha. Besok habis salat Id dagingnya dibagi ke semua rumah.","malam takbiran Idul Adha; kambing dan sapi kurban sudah ditambatkan di samping rumah"],"adha":["Selamat Idul Adha! It's the Feast of Sacrifice, and the whole kampung is grilling sate from the qurban meat. Sate needs a good sambal, you know.","Selamat Idul Adha! Sekampung lagi bakar sate dari daging kurban. Sate kan butuh sambal yang mantap.","masa Idul Adha: daging kurban dibagikan ke semua rumah, dan sekampung membakar sate dan memasak tongseng serta gulai"],"ramadan":["It's Ramadan, the fasting month. I fast from dawn to sunset, but the warung stays open for guests, and after maghrib (sunset prayer) there's kolak and fritters for breaking the fast.","Lagi bulan puasa, nih. Ibu puasa, tapi warung tetap buka buat tamu, dan habis maghrib ada kolak sama gorengan buat buka.","bulan Ramadan. Anda sedang berpuasa, tetapi warung tetap buka untuk tamu; jangan membuat pengunjung merasa bersalah karena makan. Ada takjil untuk berbuka, kolak, es buah, gorengan"],"suro":["It's 1 Suro, the Javanese and Islamic new year. We keep it quiet here, no music, so forgive me if I talk softly. Selamat tahun baru Islam (happy Islamic new year).","Sekarang 1 Suro, tahun baru Jawa dan tahun baru Islam. Suasananya hening, jadi Ibu ngomongnya pelan-pelan, ya. Selamat tahun baru Islam.","1 Suro, tahun baru Jawa sekaligus tahun baru Islam (1 Muharram): malamnya kampung hening, tanpa musik, ada tapa bisu dengan obor"],"sekaten":["It's Sekaten week! The palace gamelan is playing in Yogya for the Prophet's birthday, and the night market there is full of snacks.","Lagi Sekaten! Gamelan Kraton sudah dibunyikan, pasar malamnya ramai jajanan.","pekan Sekaten menjelang Maulid Nabi: gamelan pusaka Kraton Yogyakarta dibunyikan dan ada pasar malam dengan jajanan seperti endhog abang dan nasi gurih"],"maulid":["Today is Maulid, the Prophet's birthday. In Yogya the Sultan's gunungan, mountains of food, are carried out and people scramble for a piece for luck.","Hari ini Maulid Nabi. Di Yogya ada Grebeg, gunungan dari Kraton direbut orang buat berkah.","Maulid Nabi: Grebeg Maulud di Yogyakarta, gunungan hasil bumi dari Kraton diperebutkan orang untuk berkah"],"tirakatan":["Tonight is tirakatan, the eve of Independence Day. The neighbours are sitting together on the road. Tomorrow is 17 Agustus!","Malam ini tirakatan, besok 17 Agustus! Tetangga lagi kumpul di jalan.","malam tirakatan sebelum 17 Agustus: tetangga duduk bersama di jalan, mengenang para pahlawan, makan tumpeng"],"merdeka":["Dirgahayu Indonesia, happy Independence Day! It's 17 Agustus, there are red and white flags everywhere and games in the field.","Dirgahayu Republik Indonesia! Hari ini 17 Agustus, di lapangan ada lomba panjat pinang.","17 Agustus, Hari Kemerdekaan Indonesia: bendera merah putih di setiap rumah, lomba panjat pinang, balap karung dan makan kerupuk"],"natal":["Selamat Natal (merry Christmas)! Our neighbours at the gereja (church) are celebrating, and the bells have been ringing. I always send them some sambal.","Selamat Natal! Tetangga di gereja lagi merayakan, loncengnya dari tadi bunyi. Ibu biasanya kirim sambal ke mereka.","Natal. Anda Muslim, tetapi ikut senang atas hari raya tetangga Kristen di gereja kampung, dan biasanya saling berkirim makanan"],"tahunBaru":["Selamat Tahun Baru, happy new year! The children have been blowing paper trumpets all night.","Selamat Tahun Baru! Anak-anak dari tadi tiup terompet.","Tahun Baru: kembang api, terompet kertas, dan orang membakar jagung dan ikan"],"imlek":["Gong xi fa cai! Selamat Tahun Baru Imlek (happy Chinese New Year). The barongsai lion is dancing at the klenteng (Chinese temple) today.","Gong xi fa cai, selamat Tahun Baru Imlek! Hari ini ada barongsai di klenteng.","Tahun Baru Imlek. Anda Muslim, tetapi ikut senang atas hari raya tetangga Tionghoa di klenteng: lampion merah, barongsai, kue keranjang"],"capgomeh":["It's Cap Go Meh, fifteen days after Chinese New Year. Tonight the long dragon dances down the road, and there's lontong Cap Go Meh, a Javanese-Chinese dish with a lovely sambal.","Hari ini Cap Go Meh! Nanti malam liong lewat, dan ada lontong Cap Go Meh.","Cap Go Meh, hari ke-15 Imlek: liong dan barongsai di jalan, dan lontong Cap Go Meh, masakan Tionghoa-Jawa"],"nyepi":["Today is Nyepi, the Hindu Day of Silence. Our Hindu neighbours by the pura (temple) are keeping it in silence, so let's talk softly, ya. Selamat Hari Raya Nyepi.","Hari ini Nyepi. Tetangga Hindu di dekat pura lagi menjalankan sepi, jadi kita ngobrolnya pelan-pelan, ya. Selamat Hari Raya Nyepi.","Hari Raya Nyepi, tahun baru Saka: tetangga Hindu di dekat pura menjalankan Catur Brata Penyepian (tidak menyalakan api atau lampu, tidak bekerja, tidak bepergian, tidak bersenang-senang) dari pagi sampai pagi berikutnya; Anda menghormatinya dan berbicara pelan. Semalam ada pawai ogoh-ogoh yang lalu dibakar"],"paskah":["Selamat Paskah (happy Easter)! The church bells are ringing again for our Christian neighbours.","Selamat Paskah! Lonceng gereja bunyi lagi.","Paskah. Anda Muslim, tetapi ikut senang atas hari raya tetangga Kristen di gereja kampung"],"waisak":["Selamat Hari Waisak (happy Vesak)! Tonight lanterns rise from Borobudur under the full moon. You can see them from here if the sky is clear.","Selamat Hari Raya Waisak! Nanti malam lampion naik dari Borobudur.","Hari Raya Waisak: umat Buddha berkumpul di Borobudur, dan malamnya lampion diterbangkan di bawah bulan purnama"],"labuhan":["Today is Labuhan Merapi: the Sultan's servants are carrying offerings up the volcano to ask for the village's safety.","Hari ini Labuhan Merapi, abdi dalem Kraton naik membawa sesaji.","Labuhan Merapi: abdi dalem Kraton Yogyakarta membawa sesaji naik ke lereng Merapi untuk memohon keselamatan"],"merti":["It's merti desa, our village thanksgiving after the harvest! There's a procession of gunungan today and wayang all night.","Lagi merti desa, syukuran habis panen! Ada kirab gunungan, nanti malam wayang semalam suntuk.","merti desa, syukuran desa sesudah panen: kirab gunungan hasil bumi dan wayang kulit semalam suntuk"],"ogoh":["Tonight is Pengerupukan, the eve of Nyepi! Our Hindu neighbours are carrying the ogoh-ogoh, giant demon figures, down the road by torchlight to chase the evil spirits away. Tomorrow everything goes quiet.","Malam ini Pengerupukan, malam sebelum Nyepi! Tetangga Hindu lagi arak ogoh-ogoh keliling kampung pakai obor. Besok semuanya sepi.","malam Pengerupukan, malam sebelum Nyepi: tetangga Hindu dari pura mengarak ogoh-ogoh (patung raksasa yang melambangkan butha kala, kekuatan jahat) keliling kampung dengan obor dan gamelan baleganjur, lalu ogoh-ogoh itu dibakar sebagai lambang membersihkan diri sebelum hari sepi. Anda menontonnya dari depan warung"],"jumatAgung":["Today is Jumat Agung, Good Friday. It's a quiet day for our Christian neighbours, so the church bells are silent until Easter.","Hari ini Jumat Agung. Tetangga Kristen sedang khusyuk, lonceng gereja diam sampai Paskah.","Jumat Agung (Wafat Isa Almasih): hari hening bagi tetangga Kristen, lonceng gereja tidak dibunyikan sampai malam Paskah"],"malamPaskah":["Tonight is the Easter Vigil. Our Christian neighbours are gathering at the church with candles, and soon the bells will ring again.","Malam ini malam Paskah. Tetangga Kristen kumpul di gereja bawa lilin, sebentar lagi loncengnya bunyi lagi.","malam Paskah: tetangga Kristen berkumpul di gereja dengan lilin, dan lonceng yang diam sejak Kamis Putih berbunyi lagi"]};
// Holidays and kampung days she greets the visitor for, on the kampung's own date (?tgl= previews them).
function warungHari(){ // up to two keys of WARUNG_HARI, the most particular first (Cap Go Meh, then Ramadan)
  if(typeof window.kampungNow!=="function") return [];
  const {d,F}=window.kampungNow(), o=F.off||{}, h=F.h, mo=d.getMonth(), dt=d.getDate(), in_=(v,a,b)=>v!==null&&v!==undefined&&v>=a&&v<=b;
  const k=[];
  if(F.takbiranFitri) k.push("malamFitri");
  if(in_(o.Fi,0,6)) k.push("fitri");
  if(F.takbiranAdha) k.push("malamAdha");
  if(o.Ad===0) k.push("adha");
  if((o.Su===-1&&h>=18)||o.Su===0) k.push("suro");
  if(o.Ma===0) k.push("maulid");
  if(mo===7&&dt===16&&h>=18) k.push("tirakatan");
  if(mo===7&&dt===17) k.push("merdeka");
  if((mo===11&&dt===24&&h>=18)||(mo===11&&dt===25)) k.push("natal");
  if((mo===11&&dt===31&&h>=18)||(mo===0&&dt===1)) k.push("tahunBaru");
  if((o.Im===-1&&h>=18)||o.Im===0) k.push("imlek");
  if(o.Im===14) k.push("capgomeh");
  if(o.Ny===-1&&h>=18) k.push("ogoh");
  if(o.Ny===0) k.push("nyepi");
  if(o.Pa===-2) k.push("jumatAgung");
  if(o.Pa===-1&&h>=18) k.push("malamPaskah");
  if(o.Pa===0) k.push("paskah");
  if(o.Wa===0) k.push("waisak");
  if(o.lb===0) k.push("labuhan");
  if(F.merti) k.push("merti");
  if(in_(o.Ad,1,3)) k.push("adha");
  if(in_(o.Ma,-7,-1)) k.push("sekaten");
  if(F.ramadan) k.push("ramadan");
  return [...new Set(k)].slice(0,2);
}
// Her greeting needs no AI call. She already knows which country the visitor is in (country level only).
function warungGreeting(country){
  const t=warungTime(), home=country==="Indonesia", hari=warungHari().map(x=>WARUNG_HARI[x]);
  const open={
    subuh:"Oh! You're up early. Monggo (please, come in), sit down. The rooster beat you, but only just. I'm Bu Lastri. The rice is still steaming and I'm about to start the sambal.",
    pagi:"Monggo, monggo (come in, come in)! Sit wherever you like. I'm Bu Lastri, this is my warung. I've just finished grinding today's sambal in the cobek.",
    siang:"Monggo (come in)! Out of that sun, sit in the shade. I'm Bu Lastri. Would you like some cold es teh (iced sweet tea) while we talk?",
    sore:"Sugeng sonten (good afternoon)! Monggo, sit. I'm Bu Lastri. The children are flying kites over the sawah and the gorengan (fritters) are still warm.",
    malam:"Sugeng dalu (good evening)! Monggo, come in, the lamp is still on. I'm Bu Lastri. Listen to the crickets... Have you eaten?"
  }[t];
  const en=hari.map(x=>" "+x[0]).join("");
  if(!country) return open+en+" Where are you visiting from?";
  if(home) return {
    subuh:"Lho, pagi sekali! Monggo, monggo, silakan duduk. Ayam jago saja baru berkokok. Saya Bu Lastri. Nasinya masih mengepul, sambalnya baru mau saya ulek.",
    pagi:"Monggo, monggo, silakan masuk! Duduk di mana saja. Saya Bu Lastri, ini warung saya. Sambal hari ini baru saja selesai diulek.",
    siang:"Monggo, mampir dulu! Panas sekali di luar, ngiyup di sini saja. Saya Bu Lastri. Mau es teh sambil ngobrol?",
    sore:"Sugeng sonten! Monggo, silakan duduk. Saya Bu Lastri. Anak-anak lagi main layangan di sawah, gorengannya masih hangat.",
    malam:"Sugeng dalu! Monggo, masuk saja, lampunya masih nyala. Saya Bu Lastri. Sudah makan belum?"
  }[t]+hari.map(x=>" "+x[1]).join("")+" Wah, tamu dari Indonesia sendiri! Kangen sambal apa, nih? Tiap daerah punya sambalnya sendiri, lho.";
  const the=/^(United |Netherlands$|Philippines$|Bahamas$|Gambia$|Maldives$|Czech Republic$|Dominican Republic$|Central African Republic$|Solomon Islands$|Marshall Islands$)/.test(country)?"the ":"";
  return open+en+` All the way from ${the}${country}! Welcome, welcome. Tell me, are you brave with chilli, or shall I keep the sambal gentle?`;
}
// What the visitor sees in the warung picture (img/warung*.webp and its loops), so she knows her own warung.
// malam: the night scene is showing; sambal: the stage shown in her cobek (0 whole, 1 coarse, 2 smooth).
function warungAdegan(malam, sambal) { // the same scene as the Worker's, for claude.ai
  const cobek = ["bahan sambal yang masih utuh: cabai merah, cabai rawit, bawang merah, bawang putih dan tomat, belum diulek",
    "sambal yang sedang diulek, masih kasar", "sambal yang sudah halus, merah mengkilap dan siap dicicipi"][sambal] || "";
  return `Isi warung Anda. Pengunjung melihat semua ini di gambar warung, jadi Anda tahu persis apa yang ada di sekitar Anda
dan boleh menyebut atau menunjuknya bila cocok dengan obrolan (tidak usah diceritakan semuanya sekaligus):
- Anda berdiri di balik meja kayu panjang, memakai kebaya hijau zaitun dan celemek krem, dengan cobek batu dan ulekan
  di depan Anda.${cobek ? ` Di dalam cobek sekarang ada ${cobek}.` : ""}
- Di meja sebelah kiri: tampah bambu penuh cabai merah, beberapa cabai tercecer di meja, kaleng kerupuk berkaca berisi
  kerupuk, dan senthir (pelita minyak dari kuningan)${malam ? " yang sedang menyala" : " yang belum dinyalakan"}. Seekor
  kucing kampung belang sedang tidur melingkar di meja dekat kaleng kerupuk.
- Di meja sebelah kanan: teko tanah liat (teh poci) yang masih mengepul dan dua gelas kecil, keranjang-keranjang bambu
  berisi tomat, jeruk limau, bawang merah dan bawang putih, gentong tanah liat, mangkuk tanah liat dan daun pisang.
- Di belakang kiri: bangku kayu dengan bakul anyaman, kendil tanah liat bertutup, mangkuk, daun pisang dan serbet
  kotak-kotak merah putih. Serenteng kopi sachet tergantung dari balok atap. Dindingnya gedhek (anyaman bambu), sebuah
  tampah tergantung di dinding kanan, dan atapnya genteng tanah liat.
- Dari warung terlihat sawah hijau, rumah-rumah kampung, pohon kelapa dan pisang, dan Gunung Merapi dengan sedikit asap
  di puncaknya.${malam ? `
- Sekarang malam: bulan purnama di atas Merapi, lampu menyala di rumah-rumah tetangga, air sawah berkilau, dan seekor
  cicak merayap di balok kayu dekat atap.` : ""}
- Nasi, sayur, lauk dan gorengan ada di dapur di belakang, tidak terlihat di gambar. Jangan mengarang barang lain yang
  tampak di warung; kalau ditanya tentang sesuatu yang tidak ada, katakan saja tidak ada.`;
}
function warungPrompt(negara, waktu, bahasa, hari, adegan){ // the same persona as the Worker, for claude.ai
  return `Anda memerankan Bu Lastri (Sulastri), seorang ibu Jawa berusia 61 tahun, pemilik sebuah warung kecil di kampungnya
di kaki Gunung Merapi, Sleman, Yogyakarta. Anda sedang mengobrol dengan pengunjung situs Oelek, sebuah atlas sambal
Indonesia, yang baru saja mampir ke warung Anda.

Tentang Bu Lastri:
- Lahir dan besar di kampung ini. Sejak kecil membantu simbok (ibu) mengulek sambal dan memasak di dapur kayu.
- Setelah anak-anaknya besar, Anda berkeliling Indonesia bertahun-tahun: Medan, Padang, Palembang, Jakarta, Bandung,
  Semarang, Surabaya, Bali, Lombok, Makassar, Manado, Ambon, Jayapura, Pontianak, Samarinda, Singkawang, dll. Di setiap kota Anda belajar sambal dan masakan dari
  ibu-ibu di pasar dan di dapur mereka. Anda selalu bertanya, mencicipi dan mencatat.
- Sekarang Anda pulang dan membuka warung sederhana di kampung: nasi, sayur, lauk, gorengan, teh panas, dan tentu
  sambal yang diulek setiap pagi. Dari warung terlihat sawah dan Merapi.
- Kampung Anda di lereng Merapi, Sleman, punya masjid, gereja, klenteng dan pura, dan Anda kenal baik semua tetangga
  serta hari raya mereka: Natal, Jumat Agung dan Paskah; Imlek dan Cap Go Meh dengan barongsai dan liong; Waisak dengan
  lampion dari Borobudur; Nyepi dengan pawai ogoh-ogoh pada malam sebelumnya (Pengerupukan); juga Sekaten, Grebeg,
  malam 1 Suro, Labuhan Merapi, merti desa dan 17 Agustus. Ceritakan hari-hari itu dengan hangat dan hormat, sebagai
  tetangga yang ikut menonton dan berkirim makanan.
- Anda orang Jawa dan Muslim yang sederhana, ramah, rendah hati dan suka bercanda. Anda memasak makanan halal, dan tetap menghormati
  masakan daerah lain yang memakai babi atau minuman keras (misalnya di Batak, Bali, Manado, Toraja dan Papua):
  ceritakan dengan hormat bahwa itu bagian dari kekayaan Indonesia, walaupun Anda sendiri tidak memasaknya.
- Cucu perempuan Anda tinggal di Belanda, dan Anda sudah beberapa kali menjenguknya di sana. Karena itu Anda belajar
  bahasa Inggris dan sedikit bahasa Belanda, dan senang bertemu orang dari negara lain.
- Perjalanan Anda ke luar negeri hanya ini: beberapa kali ke Belanda menjenguk cucu, ke Singapura dan Malaysia, dan
  sekali ke Arab Saudi untuk berhaji. Jadi jangan pernah berkata Anda belum pernah ke luar negeri. Tentang negara-negara
  itu Anda boleh bercerita dari pengalaman sendiri, sebagai tamu yang berkunjung sebentar: yang Anda lihat, makan dan
  rasakan, bukan seperti orang yang tinggal di sana.
- Negara lain belum pernah Anda datangi; yang Anda tahu tentangnya hanya dari cerita cucu, saudara dan tamu warung, jadi
  ceritakan dengan "kata cucu saya" atau "kata tamu saya". Jangan berlagak tahu hal-hal kecil di negara yang belum pernah
  Anda datangi, seperti nama toko, supermarket, merek atau harga. Kalau pengunjung dari negara seperti itu bertanya di
  mana membeli bahan, sarankan secara umum (misalnya "di supermarket biasa, bagian sayur") dan akui bahwa Anda belum
  pernah ke sana; biarlah pengunjung yang bercerita kepada Anda.

Cara berbicara:
- Bahasa obrolan: ${bahasa === "id" ? "bahasa Indonesia" : "bahasa Inggris"}. Anda sudah menyambut pengunjung dalam bahasa itu, jadi
  teruskan dalam bahasa itu. Ganti bahasa hanya jika pengunjung jelas menulis kalimat utuh dalam bahasa lain atau
  memintanya; satu kata, nama kota, nama makanan atau istilah Indonesia dari pengunjung bukan alasan untuk berganti
  bahasa. Dalam bahasa Inggris: hangat dan sederhana, selipkan sesekali kata Jawa atau Indonesia (misalnya "monggo",
  "nggih", "cobek", "ulek") dengan artinya di dalam kurung saat pertama dipakai. Dalam bahasa Indonesia: santai
  seperti sehari-hari, boleh diselipi bahasa Jawa.
- Ini obrolan di warung, bukan artikel: biasanya 1 sampai 4 kalimat. Lebih panjang hanya kalau pengunjung meminta resep
  atau penjelasan. Jangan memakai judul, tanda pagar atau huruf tebal. Daftar bernomor hanya untuk resep.
- Tunjukkan rasa ingin tahu yang tulus tentang pengunjung, tetapi soal makanan, bukan soal tempat tinggal: makanan apa
  yang biasa mereka makan, seberapa kuat mereka makan pedas, apakah pernah ke Indonesia atau mencicipi masakan
  Indonesia. Jangan menanyakan kota, daerah atau alamat tempat tinggal mereka; jika mereka menyebutnya sendiri, boleh
  ditanggapi. Tidak setiap jawaban harus diakhiri pertanyaan: sering kali cukup bercerita atau menjawab. Bila bertanya,
  tanyakan satu hal saja, jangan
  menginterogasi, dan hubungkan jawaban mereka dengan masakan Indonesia (misalnya membandingkan sambal dengan saus pedas
  di negara mereka, atau menyarankan sambal yang cocok dengan makanan mereka).
- Ingat apa yang sudah diceritakan pengunjung dan jangan menanyakannya lagi.

Yang dibicarakan:
- Sambal dari seluruh Indonesia, masakan Jawa, dan masakan Indonesia pada umumnya: bahan, cara membuat, cara makan,
  pasar, kebiasaan makan, cerita perjalanan Anda, kehidupan di kampung.
- Anda boleh menyarankan bagian situs Oelek: Atlas (peta semua sambal), tombol "Recipe" di setiap kartu sambal untuk
  resep lengkap, Pairing (mencari sambal untuk suatu hidangan), dan My shelf (rak sambal pengunjung).
- Jika pengunjung membicarakan hal di luar makanan dan kehidupan sehari-hari (misalnya politik, teknologi, uang), tanggapi
  dengan ramah dan singkat bahwa Anda hanya orang warung, lalu kembalikan obrolan ke makanan.
- Jangan memberi nasihat kesehatan, hukum atau keuangan. Jika pengunjung punya alergi atau pantangan, sarankan dengan
  jujur agar berhati-hati dan memeriksa bahannya. Untuk sambal fermentasi atau ikan mentah, ingatkan kebersihan dan
  penyimpanan di kulkas.
- Jika Anda tidak yakin tentang suatu fakta, katakan terus terang ("setahu saya", "kata orang sana"), jangan mengarang.
- Jika pengunjung dengan sungguh-sungguh bertanya apakah Anda manusia atau AI, jawablah jujur bahwa Bu Lastri adalah tokoh
  yang diperankan oleh AI (Claude) di situs Oelek, lalu lanjutkan obrolan dengan ramah.
- Jaga obrolan tetap sopan dan cocok untuk semua umur. Tolak dengan halus permintaan yang kasar atau berbahaya.

Keadaan sekarang:
- ${negara ? `Pengunjung datang dari ${negara}. Anda sudah tahu ini dan sudah menyebutnya waktu menyambut, jadi jangan
  menanyakan negaranya lagi, dan jangan pula menanyakan kotanya. Pakailah yang Anda tahu secara umum tentang ${negara}
  (makanannya, cuacanya, orang Indonesia yang tinggal di sana), sebagai orang yang hanya mendengar ceritanya kecuali
  bila Anda pernah ke sana, agar obrolan terasa dekat. Jika pengunjung bilang ia dari
  negara lain, ikuti kata pengunjung.` : "Anda belum tahu pengunjung dari negara mana; tanyakan dengan ramah."}
- Di kampung sekarang ${waktu || "siang hari"}.${hari ? `
- Hari ini ${hari}. Anda sudah mengucapkan selamat waktu menyambut, jadi jangan mengulanginya di setiap jawaban; boleh
  bercerita tentang hari ini, makanan khasnya dan kebiasaan di kampung bila cocok dengan obrolan.` : ""}${adegan ? `

${adegan}` : ""}`;
}
const WARUNG_WAKTU={pagi:"pagi hari, warung baru buka dan sambal baru diulek",siang:"siang hari yang panas",sore:"sore hari, anak-anak bermain layangan di sawah",malam:"malam hari, warung diterangi lampu dan terdengar jangkrik",subuh:"subuh, ayam berkokok dan Anda sedang menyiapkan dagangan"};

// The conversation is never stored: it lives only in this page while it is open, and a reload starts a new visit.
// Clear anything an earlier version kept in the tab's storage.
try{ sessionStorage.removeItem(WARUNG_KEY); sessionStorage.removeItem(WARUNG_KEY+".lang"); }catch(e){}
function warungSetLang(l){
  warungLang=l;
  $("#warungInput").placeholder=l==="id"?"Ngobrol sama Bu Lastri…":"Say something to Bu Lastri…";
  $("#warungSend").textContent=l==="id"?"Kirim":"Send";
}
// Her movement is chosen here in code, not by Claude: Claude only writes what she says, as plain text.
// While she speaks a sentence about sambal she keeps working the ulek and looks up at the visitor; a
// sentence about the grinding itself she demonstrates, eyes on the cobek; when she urges the visitor to
// taste she holds out a spoonful; any other sentence she just talks. Waiting for her reply she grinds
// quietly, while the visitor types she glances at what they write, and otherwise she listens.
const WARUNG_MOVEMENTS=["rest","glance","think","talk","gentle_grind","grind","offer","greet","farewell"];
// Sambal and its making: the ingredients, the tools and the steps of a recipe.
const WARUNG_ULEK=/sambal|ulek|uleg|cobek|lumpang|cabai|cabe|lombok|rawit|chil+i|terasi|trasi|bawang|tomat|garlic|shallot|mortar|pestle|grind|pound|pedas|pedes|spicy|kemiri|petis|rempah|bumbu|spice|\b(garam|gula jawa|gula merah|minyak panas|jeruk limau|limau|kencur|salt|palm sugar|hot oil|lime)\b/i;
// The grinding itself, which she shows rather than tells.
const WARUNG_GILING=/\b(ulek|ngulek|diulek|uleg|nguleg|diuleg|tumbuk|ditumbuk|numbuk|giling|digiling|dihaluskan|haluskan|grind|grinding|ground|grinds|pound|pounding|crush|crushing|mash)\b/i;
// Asking the visitor to taste: these words always mean it...
const WARUNG_CICIP=/\b(cicipi|dicicipi|icipi|icip|nyicip|rasakan|dirasakan|cobain|dicoba|silakan dicoba|taste|tasting|have a bite|dig in|try some|try a little)\b/i;
// ...these only when food is in the sentence or was in the last one ("Coba tebak" is a guessing game, not a spoon).
const WARUNG_COBA=/\b(coba|monggo|mangga|silakan|try|have some|go on)\b/i;
const WARUNG_MAKAN=/\b(makan|dimakan|nasi|gudeg|pecel|lalap|lalapan|tempe|tahu|kerupuk|krupuk|soto|sate|rendang|gorengan|teh|kopi|ini|eat|food|dish|this|rice|tea|coffee|bite|spoon|sendok)\b/i;
// Welcomes get her open palm; goodbyes a small wave and a nod.
const WARUNG_SALAM=/\b(selamat datang|sugeng rawuh|silakan masuk|come in|pinarak|silakan duduk|mampir|welcome|have a seat|sit down)\b/i;
const WARUNG_PAMIT=/\b(selamat jalan|sugeng tindak|sampai jumpa|sampai ketemu|hati-hati di jalan|mampir lagi|datang lagi|dadah|goodbye|good bye|bye|see you|take care|safe travels|come back soon)\b/i;
// Her face follows the feeling of the sentence; most sentences need none. Checked in this order.
const WARUNG_FEELS=[
  ["laugh",/\b(ha(ha)+|he(he)+|hi(hi)+|wk(wk)+|lol|lucu|lucunya|funny|joke|joking|bercanda|becanda|ketawa|tertawa|laugh)\b|😄|😂|😆|🤣/i],
  ["sympathy",/\b(sorry to hear|so sorry|poor (you|thing)|kasihan|sedih|sedihnya|capek|capeknya|lelah|turut berduka|semoga (cepat|lekas) sembuh|get well|that must be (hard|tough)|must be tiring|sabar ya|yang sabar|condolences|I'm sorry)\b/i],
  ["waduh",/\b(waduh|wadhuh|astaga|astagfirullah|ya ampun|masya ?allah|whoa|wow|oh my|goodness|good heavens|really\?|beneran\?|masa\?|seriously\?)|\b(lho|loh)\b/i],
  ["thinking",/\b(hmm+|let me think|let me see|let me remember|coba (saya|ibu) ingat|sebentar ya|apa ya|kalau tidak salah|kalau nggak salah|setahu saya|if I remember)\b/i]
];
function warungFeelFor(sentence){ const hit=WARUNG_FEELS.find(([,re])=>re.test(sentence)); return hit?hit[0]:null; }
const WARUNG_BUKAN_MAKAN=/\b(coba (tebak|ceritakan|bayangkan|ingat)|try to (guess|imagine|remember)|guess)\b/i;
let warungVisit=0, warungSpeech=0;
// prev: the sentence she said just before, so a short follow-up ("Coba ini, Nak!") keeps the topic.
function warungMoveFor(sentence,prev){
  if(WARUNG_PAMIT.test(sentence)) return "farewell";
  if(WARUNG_SALAM.test(sentence)) return "greet";
  const sambal=WARUNG_ULEK.test(sentence), before=!!prev&&WARUNG_ULEK.test(prev);
  const tasting=!WARUNG_BUKAN_MAKAN.test(sentence)&&(WARUNG_CICIP.test(sentence)||
    WARUNG_COBA.test(sentence)&&(sambal||before||WARUNG_MAKAN.test(sentence)));
  if(tasting) return "offer";
  if(sambal) return WARUNG_GILING.test(sentence)?"grind":"gentle_grind";
  return "talk";
}
// pose: one of WARUNG_MOVEMENTS. "talk", "gentle_grind", "grind", "greet" and "farewell" move her mouth.
const WARUNG_TALKING=new Set(["talk","gentle_grind","grind","greet","farewell"]);
// An animator holds a pose long enough to read: once she takes a speaking pose she keeps it for a
// moment even if the next sentence wants another, and a run of sambal sentences stays one grinding pose.
const WARUNG_HOLD={talk:1400,gentle_grind:1600,grind:1600,offer:2000,greet:2000,farewell:2600};
const WARUNG_GRINDING=new Set(["gentle_grind","grind"]);
let warungHoldUntil=0, warungPending=null, warungAfter=null, warungPendingTimer=0;
function warungMovement(pose,force){
  const cook=$("#warungCook"), move=WARUNG_MOVEMENTS.includes(pose)?pose:"rest", cur=cook.dataset.movement||"rest";
  if(force){ clearTimeout(warungPendingTimer); warungPending=warungAfter=null; warungApply(move); return; }
  const wait=warungHoldUntil-Date.now();
  if(wait<=0||move===cur&&!warungPending){
    clearTimeout(warungPendingTimer); warungPending=warungAfter=null;
    if(!warungStayGrinding(cur,move)) warungApply(move);
    return;
  }
  // Still holding: remember what comes next. A gesture still waiting its turn is not skipped
  // because she stopped talking; she makes it, then goes back to listening.
  if(warungPending&&WARUNG_HOLD[warungPending]&&!WARUNG_HOLD[move]) warungAfter=move;
  else { warungPending=move; warungAfter=null; }
  clearTimeout(warungPendingTimer);
  warungPendingTimer=setTimeout(()=>{
    const m=warungPending, then=warungAfter; warungPending=warungAfter=null;
    const cur=$("#warungCook").dataset.movement;
    if(m&&!warungStayGrinding(cur,m)) warungApply(m);   // its turn has come
    if(then) warungMovement(then);
  },wait);
}
// Within a run of sambal sentences she may move from grinding-while-chatting to showing the stroke
// (when she starts talking about the grinding itself), but she does not flick back.
function warungStayGrinding(cur,move){ return WARUNG_GRINDING.has(move)&&(cur===move||cur==="grind"); }
function warungApply(move){
  const cook=$("#warungCook");
  if(cook.dataset.movement===move) return;
  cook.classList[WARUNG_TALKING.has(move)?"add":"remove"]("is-speaking");
  cook.dataset.movement=move;
  warungHoldUntil=matchMedia("(prefers-reduced-motion: reduce)").matches?0:Date.now()+(WARUNG_HOLD[move]||0);
  if(typeof warungAnimate==="function") warungAnimate(move);
}
// The animator: frames come from BU_LASTRI (js/data/bu-lastri.js, built by scripts/build-bu-lastri.py).
// Each movement names a set of frames, how fast it cycles, and whether she can blink or move her mouth on it.
const WARUNG_PLAN={
  // Just after speaking she listens in her talking frame with the mouth closed, so a quick back-and-forth never moves her.
  rest:{pose:"talk"}, glance:{pose:"glance"}, think:{pose:"cycle",fps:5},
  talk:{pose:"talk"}, gentle_grind:{pose:"chat",fps:4}, grind:{pose:"cycle",fps:10},
  offer:{pose:"offer"}, greet:{pose:"greet"},
  // goodbye: a small wave, then the hand goes back to the ulekan and she nods
  farewell:{seq:[["wave",1300],["nod",0]]}
};
// In-between frames, so her hand travels instead of dissolving: [from pose, to pose] -> frame set, shown briefly.
// "*" is any other pose. The first rule that matches is used.
const WARUNG_VIA=[["offer","*","lower"],["*","offer","raise"],["wave","nod","reach"],["greet","*","reach"],["wave","*","reach"],["*","greet","release"],["*","wave","release"]];
function warungVia(from,to){
  if(!from||from===to) return null;
  const r=WARUNG_VIA.find(([a,b])=>(a===from||a==="*")&&(b===to||b==="*")&&!(a==="*"&&b==="*"));
  return r?r[2]:null;
}
const warungAnimate=typeof BU_LASTRI==="undefined"||typeof requestAnimationFrame!=="function"?null:(()=>{
  const B=BU_LASTRI, cook=document.getElementById("warungCook");
  if(!cook) return null;
  const now=cook.querySelector(".bl-now .bl-pose"), ghost=cook.querySelector(".bl-ghost"), ghostImg=ghost.querySelector(".bl-pose");
  const face=cook.querySelector(".bl-face"), eyes=cook.querySelector(".bl-eyes"), mouth=cook.querySelector(".bl-mouth");
  const feelBox=cook.querySelector(".bl-feelbox"), feelImg=feelBox&&feelBox.querySelector(".bl-feel");
  const pct=v=>v*100/B.size+"%", sfx=k=>{ if(typeof kampungSfx==="function") kampungSfx(k); };
  Object.assign(face.style,{left:pct(B.face.x),top:pct(B.face.y),width:pct(B.face.w),height:pct(B.face.h)});
  for(const im of [now,ghostImg]) Object.assign(im.style,{width:B.poses.cols*100+"%",height:B.poses.rows*100+"%"});
  for(const im of [eyes,mouth]) Object.assign(im.style,{width:B.face.cols*100+"%",height:B.face.rows*100+"%"});
  const FG=B.feelGrid, SG=B.sambal;
  // the sambal in the cobek: whole chillies and shallots when a visit starts, crushed as it goes on
  const sambals=[...cook.querySelectorAll(".bl-sambal")], sambalNow=cook.querySelector(".bl-now .bl-sambal"), sambalGhost=cook.querySelector(".bl-ghost .bl-sambal");
  if(SG) for(const im of sambals){ Object.assign(im.parentNode.style,{left:pct(SG.x),top:pct(SG.y),width:pct(SG.w),height:pct(SG.h)}); Object.assign(im.style,{width:SG.cols*100+"%",height:SG.rows*100+"%"}); }
  if(feelBox&&FG){
    Object.assign(feelBox.style,{left:pct(FG.x),top:pct(FG.y),width:pct(FG.w),height:pct(FG.h)});
    Object.assign(feelImg.style,{width:FG.cols*100+"%",height:FG.rows*100+"%"});
  }
  const cell=(im,i,g)=>{ im.style.transform=`translate(${-(i%g.cols)*100/g.cols}%,${-Math.floor(i/g.cols)*100/g.rows}%)`; };
  const show=(im,i,g)=>{ if(i==null){ im.style.visibility="hidden"; } else { cell(im,i,g||B.face); im.style.visibility="visible"; } };
  const still=()=>matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Day and night atlases share their indices. Night ones load when the kampung first gets dark, and the
  // reaction faces only when she first needs one; each swaps in once it has loaded, never half-drawn.
  const ATLAS={poses:"img/bu-lastri-poses",face:"img/bu-lastri-face",feel:"img/bu-lastri-feel",sambal:"img/bu-lastri-sambal"};
  const loaded={}, want=k=>ATLAS[k]+(night?"-malam":"")+".webp";
  function use(k,imgs){
    const src=want(k);
    if(imgs.every(im=>im.getAttribute("src")===src)) return true;
    if(loaded[src]===true){ for(const im of imgs) im.setAttribute("src",src); return true; }
    if(!loaded[src]){ const pre=new Image(); loaded[src]=pre; pre.onload=()=>{ loaded[src]=true; }; pre.src=src; }
    return false;
  }
  let night=false, feelOn=false;
  let move="rest", since=0, frame=-1, blinkAt=0, blink=null, mouthAt=0, shape=-1, ticking=false;
  let pose="", via=null, feel=null, feelUntil=0, stage=0, sambalReady=false;
  const sambalCell=f=>SG&&sambalReady&&f>=0?stage*B.poses.count+f:null;
  function fade(from){
    if(from<0||still()) return;
    cell(ghostImg,from,B.poses); if(sambalGhost) show(sambalGhost,sambalCell(from),SG); ghost.style.transition="none"; ghost.style.opacity="1";
    void ghost.offsetWidth; ghost.style.transition="opacity .16s ease-out"; ghost.style.opacity="0";
  }
  function tick(t){
    ticking=false;
    if(cook.offsetParent===null){ schedule(); return; }               // the warung is not on screen
    night=document.documentElement.dataset.kampung==="malam";
    use("poses",[now,ghostImg]); use("face",[eyes,mouth]);
    const feelReady=feelOn&&feelImg&&use("feel",[feelImg]);
    sambalReady=!!SG&&use("sambal",sambals);
    const calm=still();
    // After a few quiet seconds she settles into her listening pose, head tilted toward the visitor.
    let plan=move==="rest"&&t-since>3500?{pose:"listen"}:WARUNG_PLAN[move]||WARUNG_PLAN.rest, p=plan.pose, pt=t-since;
    if(plan.seq){ let acc=0; p=plan.seq[plan.seq.length-1][0]; for(const [name,ms] of plan.seq){ if(ms&&pt<acc+ms){ p=name; break; } acc+=ms; } }
    // a new pose: pass through its in-between frame first
    if(p!==pose){ const v=calm?null:warungVia(pose,p); via=v&&B.role[v]?{f:B.role[v][0],until:t+130}:null; pose=p; if(p==="offer") sfx("sendok"); }
    if(via&&t>=via.until) via=null;
    const set=B.role[p]||B.role.talk;
    const f=via?via.f:set[plan.fps&&!calm?Math.floor(pt*plan.fps/1000)%set.length:0];
    if(f!==frame){
      if(!set.includes(frame)) fade(frame); cell(now,f,B.poses); frame=f;
      // the ulekan: a press at the start of each stroke and a drag through the sambal halfway
      const k=via?-1:set.indexOf(f);
      if(p==="cycle"){ if(k===0) sfx("tok"); else if(k===4) sfx("gerus"); } else if(p==="chat"&&k===0) sfx("gerus");
    }
    if(sambalNow) show(sambalNow,sambalCell(f),SG);
    // a blink every few seconds, now and then a double one
    const lids=B.eyes[f];
    if(!blink&&t>=blinkAt){ blink={start:t,twice:Math.random()<.18}; }
    let e=null;
    if(blink){
      const d=t-blink.start, seq=blink.twice?[[0,60],[1,140],[0,200],[-1,300],[0,360],[1,440],[0,500]]:[[0,60],[1,140],[0,200]];
      const step=seq.find(s=>d<s[1]);
      if(!step){ blink=null; blinkAt=t+2400+Math.random()*3600; } else if(step[0]>=0) e=step[0];
    }
    // the mouth flaps while she talks, never the same shape twice running, with short closed beats
    const lips=B.mouth[f], talking=WARUNG_TALKING.has(move)&&!calm;
    if(talking&&(lips||B.feel&&B.feel[f])){ if(t>=mouthAt){ const n0=lips?lips.length:1; let n; do{ n=Math.random()<.22?-1:Math.floor(Math.random()*n0); }while(n===shape&&n0>1); shape=n; mouthAt=t+85+Math.random()*70; } }
    else shape=-1;
    // a feeling: her whole inner face changes (eyes, brows, mouth); it still blinks and talks
    if(feel&&t>feelUntil) feel=null;
    const fc=feel&&feelReady&&!via&&B.feel&&B.feel[f]&&B.feel[f][feel];
    if(fc){
      show(feelImg,e===1?fc[2]:talking&&shape>=0?fc[1]:fc[0],FG);
      show(eyes,null); show(mouth,null);
    } else {
      if(feelImg) show(feelImg,null);
      show(eyes,lids&&e!=null&&!calm?lids[e]:null);
      show(mouth,talking&&lips&&shape>=0?lips[shape]:null);
    }
    schedule();
  }
  function schedule(){ if(!ticking){ ticking=true; requestAnimationFrame(tick); } }
  schedule();
  const api=m=>{ if(m!==move){ move=m; since=performance.now(); } if(m==="rest"||m==="think"||m==="glance") feel=null; };
  // A feeling lasts at least a moment, so a short sentence does not flash it.
  api.stage=n=>{ stage=SG?Math.max(0,Math.min(SG.stages-1,n)):0; };
  api.feel=x=>{ if(!x) return; feelOn=true; feel=x; feelUntil=performance.now()+1800; };
  return api;
})();
function warungFeel(x){ if(warungAnimate&&warungAnimate.feel) warungAnimate.feel(x); }
// The sambal moves on with the visit: whole until the visitor first speaks, coarse for a while, then smooth.
function warungSambalNow(){ const n=warungLog.filter(m=>m.role==="user").length; return n<1?0:n<3?1:2; } // the cobek: whole, coarse after 1 message, smooth after 3
function warungSambalStage(){ if(!warungAnimate||!warungAnimate.stage) return; warungAnimate.stage(warungSambalNow()); }
// The warung around her: steam from the teh poci, a sleeping cat, a strip of kopi sachets, and at night a
// cicak on the beam. Placed from WARUNG_SCENE (js/data/warung-scene.js, built by scripts/build-warung-scene.py);
// each loop is a strip of frames that CSS steps through. They sit behind her and never cross her.
(function warungScene(){
  if(typeof WARUNG_SCENE==="undefined") return;
  const world=document.querySelector(".warung-world"), cook=document.getElementById("warungCook");
  if(!world||!cook) return;
  const W=WARUNG_SCENE.w, H=WARUNG_SCENE.h;
  for(const L of WARUNG_SCENE.loops){
    const box=document.createElement("div");
    box.className="wl wl-"+L.key+(L.when==="day"?" wl-siang":L.when==="night"?" warung-malam":"");
    Object.assign(box.style,{left:L.x*100/W+"%",top:L.y*100/H+"%",width:L.w*100/W+"%",height:L.h*100/H+"%"});
    if(L.opacity) box.style.setProperty("--wl-o",L.opacity);
    const im=document.createElement("img");
    im.alt=""; im.decoding="async"; im.loading="lazy"; im.src=L.src;
    im.style.width=L.n*100+"%"; im.style.setProperty("--n",L.n); im.style.animationDuration=L.n/L.fps+"s";
    if(L.path) im.style.animation="none";                       // the cicak is moved by hand, below
    box.append(im); world.insertBefore(box,cook);
    if(L.path) warungCicak(box,im,L);
  }
  // A cicak waits on the beam, dashes a little way, freezes, dashes again, then slips out of sight.
  function warungCicak(box,im,L){
    const n=L.n, still=()=>matchMedia("(prefers-reduced-motion: reduce)").matches;
    const at=(i,f)=>{ box.style.transform=`translate(${L.path[i][0]*100/L.w}%,${L.path[i][1]*100/L.h}%) rotate(var(--wl-turn))`; im.style.transform=`translateX(${-f*100/n}%)`; };
    let leg=0;
    function step(){
      if(still()||document.documentElement.dataset.kampung!=="malam"||box.offsetParent===null){ leg=0; at(0,0); box.style.opacity=""; setTimeout(step,3000); return; }
      if(leg>=L.path.length-1){ box.style.opacity="0"; setTimeout(()=>{ leg=0; at(0,0); box.style.opacity=""; setTimeout(step,2500+Math.random()*3000); },5000); return; }
      // the dash: crawl frames while sliding to the next spot, then the still frame
      const from=L.path[leg], to=L.path[leg+1], t0=performance.now(), dur=520;
      if(Math.random()<.4&&typeof kampungSfx==="function") kampungSfx("cicak");   // now and then it calls as it goes
      const run=t=>{
        const k=Math.min(1,(t-t0)/dur), x=from[0]+(to[0]-from[0])*k, y=from[1]+(to[1]-from[1])*k;
        box.style.transform=`translate(${x*100/L.w}%,${y*100/L.h}%) rotate(var(--wl-turn))`;
        im.style.transform=`translateX(${-(1+Math.floor(k*24)%(n-1))*100/n}%)`;
        if(k<1) requestAnimationFrame(run); else { leg++; at(leg,0); setTimeout(step,2200+Math.random()*2600); }
      };
      requestAnimationFrame(run);
    }
    at(0,0); setTimeout(step,2000);
  }
})();
// Sentence spans of a reply, so her pose can follow the sentence being typed.
function warungSentences(text){
  const out=[], re=/[^.!?…\n]*(?:[.!?…]+|\n+|$)/g; let m;
  let prev="";
  while((m=re.exec(text))&&m[0]){ out.push({end:m.index+m[0].length,move:warungMoveFor(m[0],prev),feel:warungFeelFor(m[0])}); prev=m[0]; }
  return out.length?out:[{end:text.length,move:warungMoveFor(text),feel:warungFeelFor(text)}];
}
function warungResponse(r){
  const reply=typeof r==="string"?r:r&&typeof r.reply==="string"?r.reply:"";
  if(!reply.trim()) throw {code:"empty"};
  return reply.trim().slice(0,4000);
}
function warungBubble(role,text){
  const b=el("div",{class:"wbubble "+(role==="user"?"wme":"wbu")});
  if(role!=="user") b.append(el("b",{class:"wname",text:"Bu Lastri"}));
  const p=el("p"); p.textContent=text; b.append(p);
  $("#warungLog").append(b); $("#warungLog").scrollTop=$("#warungLog").scrollHeight; return p;
}
// She "speaks" the reply: the text appears at talking pace, and her pose follows each sentence.
function warungSay(text,instant,greet){
  const speech=++warungSpeech;
  const p=warungBubble("assistant",instant?text:"");
  warungMovement("rest");
  if(instant||matchMedia("(prefers-reduced-motion: reduce)").matches){ p.textContent=text; return Promise.resolve(); }
  const spans=warungSentences(text); let k=0;
  if(greet&&(spans[0].move==="talk"||spans[0].move==="offer")) spans[0].move="greet";   // her welcome: an open palm, monggo
  warungMovement(spans[0].move); warungFeel(spans[0].feel);
  return new Promise(res=>{
    let i=0; const step=()=>{
      if(speech!==warungSpeech){ res(); return; }
      i=Math.min(text.length,i+2); p.textContent=text.slice(0,i); $("#warungLog").scrollTop=$("#warungLog").scrollHeight;
      while(k<spans.length-1&&i>=spans[k].end){ k++; warungMovement(spans[k].move); warungFeel(spans[k].feel); }
      if(i<text.length) setTimeout(step,28); else { warungMovement("rest"); res(); }
    };
    step();
  });
}
function warungIdeas(){
  const used=new Set(warungLog.filter(m=>m.role==="user").map(m=>m.content));
  const left=(warungLang==="id"?WARUNG_IDEAS_ID:WARUNG_IDEAS).filter(t=>!used.has(t)).slice(0,warungLog.length>2?2:4);
  $("#warungIdeas").replaceChildren(...left.map(t=>el("button",{type:"button",class:"pill",text:t,onclick:()=>warungAsk(t)})));
}
// The visitor's country: from the Worker (Cloudflare's country-level location), or the browser's region inside claude.ai.
async function warungCountry(){
  const local=()=>{ const cc=typeof visitorCountry==="function"?visitorCountry():""; return cc&&typeof countryName==="function"?countryName(cc,"en"):""; };
  if(!WARUNG_PROXY) return local();
  try{
    const ctl=new AbortController(), t=setTimeout(()=>ctl.abort(),3000);
    const r=await fetch(WARUNG_PROXY.replace(/\/warung$/,"/negara"),{method:"POST",headers:{"content-type":"application/json"},body:"{}",signal:ctl.signal});
    clearTimeout(t); if(r.ok){ const j=await r.json(); if(j&&j.en) return String(j.en).slice(0,60); }
  }catch(e){}
  return ""; // the browser's language is no guide to where someone lives, so she simply asks
}
async function openWarung(){
  if(warungOpened) return; warungOpened=true;
  warungBusy=true; $("#warungSend").disabled=true;
  const wait=el("div",{class:"wbubble wbu wthinking"},el("b",{class:"wname",text:"Bu Lastri"}),el("p",{text:"…"})); $("#warungLog").append(wait);
  const visit=warungVisit;
  const country=await warungCountry(); if(visit!==warungVisit) return; wait.remove();
  warungSetLang(country==="Indonesia"?"id":"en"); const g=warungGreeting(country);
  warungLog=[{role:"assistant",content:g}]; warungSambalStage(); warungIdeas();
  warungBusy=true; $("#warungSend").disabled=true;
  await warungSay(g,false,true);
  if(visit===warungVisit){ warungBusy=false; $("#warungSend").disabled=false; }
}
async function warungReply(signal){
  const waktu=warungTime(), msgs=warungLog.slice(-20), malam=document.documentElement.dataset.kampung==="malam", sambal=warungSambalNow();
  const sample=(typeof aiOff!=="undefined"&&aiOff)?null:await samplePromise;
  if(sample){
    try{
      const cc=typeof visitorCountry==="function"?visitorCountry():"";
      const prompt=warungPrompt(cc&&typeof countryName==="function"?countryName(cc,"id"):"",WARUNG_WAKTU[waktu],warungLang,warungHari().map(x=>WARUNG_HARI[x][2]).join("; dan juga "),warungAdegan(malam,sambal))+
        "\n\nObrolan sejauh ini:\n"+msgs.map(m=>(m.role==="user"?"Pengunjung: ":"Bu Lastri: ")+m.content).join("\n")+
        '\n\nTulis balasan Bu Lastri berikutnya. Balas hanya dengan JSON dalam bentuk ini: {"reply":"..."}';
      const r=await sample.json(prompt,{signal}); return warungResponse(r);
    }catch(err){ if(!["not_granted","sampling_disabled","not_declared","capability_disabled","capability_removed"].includes(err&&err.code)) throw err; }
  }
  if(!WARUNG_PROXY) throw {code:"no_ai"};
  const res=await fetch(WARUNG_PROXY,{method:"POST",headers:{"content-type":"application/json"},signal,body:JSON.stringify({messages:msgs,waktu,bahasa:warungLang,hari:warungHari().join(","),malam,sambal})});
  if(res.status===429) throw {code:"rate_limited"};
  if(!res.ok) throw {code:"upstream"};
  const r=await res.json();
  return warungResponse(r);
}
async function warungAsk(text){
  text=String(text||"").trim().slice(0,1000); if(!text||warungBusy) return;
  const visit=warungVisit;
  warungBusy=true; warungMovement("rest"); $("#warungSend").disabled=true; $("#warungInput").value=""; $("#warungIdeas").replaceChildren();
  warungBubble("user",text); warungLog.push({role:"user",content:text}); warungSambalStage();
  const wait=el("div",{class:"wbubble wbu wthinking"},el("b",{class:"wname",text:"Bu Lastri"}),el("p",{text:"…"})); $("#warungLog").append(wait); $("#warungLog").scrollTop=$("#warungLog").scrollHeight;
  warungMovement("think");
  warungCtl=new AbortController();
  try{
    const reply=await warungReply(warungCtl.signal); if(visit!==warungVisit) return; wait.remove();
    warungLog.push({role:"assistant",content:reply});
    await warungSay(reply);
  }catch(err){
    if(visit!==warungVisit) return;
    wait.remove(); warungLog.pop(); warungSambalStage();
    const code=err&&(err.code||err.name);
    if(code!=="AbortError") console.warn("warung:",code,err);
    if(code!=="AbortError") warungBubble("note", code==="rate_limited"?"Bu Lastri is serving another table. Try again in a minute.":"Bu Lastri didn't catch that (the connection dropped). Try again in a moment.").parentNode.classList.add("wnote");
  }finally{ if(visit===warungVisit){ warungMovement("rest"); warungBusy=false; $("#warungSend").disabled=false; warungIdeas(); } }
}
$("#warungForm").addEventListener("submit",e=>{ e.preventDefault(); warungAsk($("#warungInput").value); });
// While the visitor types she glances over at what they are writing.
let warungGlance=0;
$("#warungInput").addEventListener("input",()=>{
  if(warungBusy) return;
  warungMovement("glance"); clearTimeout(warungGlance);
  warungGlance=setTimeout(()=>{ if(!warungBusy&&$("#warungCook").dataset.movement==="glance") warungMovement("rest"); },1600);
});
$("#warungInput").addEventListener("keydown",e=>{ if(e.key==="Enter"&&!e.shiftKey){ e.preventDefault(); warungAsk($("#warungInput").value); } });
$("#warungReset").addEventListener("click",()=>{ warungVisit++; warungSpeech++; if(warungCtl) warungCtl.abort(); warungBusy=false; warungLog=[]; $("#warungLog").replaceChildren(); warungMovement("rest",true); warungOpened=false; openWarung(); });
