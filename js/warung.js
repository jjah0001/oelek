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
  return h<5?"malam":h<6.5?"subuh":h<11?"pagi":h<15?"siang":h<18.3?"sore":"malam";
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
function warungPrompt(negara, waktu, bahasa, hari){ // the same persona as the Worker, for claude.ai
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
  bercerita tentang hari ini, makanan khasnya dan kebiasaan di kampung bila cocok dengan obrolan.` : ""}`;
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
// Claude chooses a bounded action; never accept CSS, asset URLs or executable code.
const WARUNG_MOVEMENTS=["grind","gentle_grind","rest"];
const WARUNG_DIRECTION='Pilih gerakan yang cocok dengan pesan pengunjung dan jawaban Anda: grind untuk mengulek atau menjelaskan resep dengan semangat, gentle_grind untuk percakapan hangat atau bercerita, rest untuk mendengarkan atau topik serius. Balas hanya JSON: {"reply":"balasan Anda","movement":"grind|gentle_grind|rest"}. Jangan tulis arahan gerakan di dalam reply.';
let warungVisit=0, warungSpeech=0;
function warungMovement(movement){
  $("#warungCook").classList.remove("is-speaking");
  $("#warungCook").dataset.movement=WARUNG_MOVEMENTS.includes(movement)?movement:"gentle_grind";
}
function warungResponse(r){
  if(!r||typeof r.reply!=="string"||!r.reply.trim()) throw {code:"empty"};
  return {reply:r.reply.slice(0,4000),movement:WARUNG_MOVEMENTS.includes(r.movement)?r.movement:"gentle_grind"};
}
function warungBubble(role,text){
  const b=el("div",{class:"wbubble "+(role==="user"?"wme":"wbu")});
  if(role!=="user") b.append(el("b",{class:"wname",text:"Bu Lastri"}));
  const p=el("p"); p.textContent=text; b.append(p);
  $("#warungLog").append(b); $("#warungLog").scrollTop=$("#warungLog").scrollHeight; return p;
}
// She "speaks" the reply: the text appears at talking pace while her talking picture shows.
function warungSay(text,instant,movement="gentle_grind"){
  const speech=++warungSpeech;
  const p=warungBubble("assistant",instant?text:"");
  warungMovement("rest");
  if(instant||matchMedia("(prefers-reduced-motion: reduce)").matches){ p.textContent=text; return Promise.resolve(); }
  warungMovement(movement);
  $("#warungCook").classList.add("is-speaking");
  return new Promise(res=>{
    let i=0; const step=()=>{
      if(speech!==warungSpeech){ res(); return; }
      i=Math.min(text.length,i+2); p.textContent=text.slice(0,i); $("#warungLog").scrollTop=$("#warungLog").scrollHeight;
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
  warungLog=[{role:"assistant",content:g}]; warungIdeas();
  warungBusy=true; $("#warungSend").disabled=true;
  await warungSay(g);
  if(visit===warungVisit){ warungBusy=false; $("#warungSend").disabled=false; }
}
async function warungReply(signal){
  const waktu=warungTime(), msgs=warungLog.slice(-20);
  const sample=(typeof aiOff!=="undefined"&&aiOff)?null:await samplePromise;
  if(sample){
    try{
      const cc=typeof visitorCountry==="function"?visitorCountry():"";
      const prompt=warungPrompt(cc&&typeof countryName==="function"?countryName(cc,"id"):"",WARUNG_WAKTU[waktu],warungLang,warungHari().map(x=>WARUNG_HARI[x][2]).join("; dan juga "))+
        "\n\nObrolan sejauh ini:\n"+msgs.map(m=>(m.role==="user"?"Pengunjung: ":"Bu Lastri: ")+m.content).join("\n")+
        '\n\n'+WARUNG_DIRECTION;
      const r=await sample.json(prompt,{signal}); return warungResponse(r);
    }catch(err){ if(!["not_granted","sampling_disabled","not_declared","capability_disabled","capability_removed"].includes(err&&err.code)) throw err; }
  }
  if(!WARUNG_PROXY) throw {code:"no_ai"};
  const res=await fetch(WARUNG_PROXY,{method:"POST",headers:{"content-type":"application/json"},signal,body:JSON.stringify({messages:msgs,waktu,bahasa:warungLang,hari:warungHari().join(",")})});
  if(res.status===429) throw {code:"rate_limited"};
  if(!res.ok) throw {code:"upstream"};
  const r=await res.json(); if(!r||!r.reply) throw {code:"empty"};
  return warungResponse(r);
}
async function warungAsk(text){
  text=String(text||"").trim().slice(0,1000); if(!text||warungBusy) return;
  const visit=warungVisit;
  warungBusy=true; warungMovement("rest"); $("#warungSend").disabled=true; $("#warungInput").value=""; $("#warungIdeas").replaceChildren();
  warungBubble("user",text); warungLog.push({role:"user",content:text});
  const wait=el("div",{class:"wbubble wbu wthinking"},el("b",{class:"wname",text:"Bu Lastri"}),el("p",{text:"…"})); $("#warungLog").append(wait); $("#warungLog").scrollTop=$("#warungLog").scrollHeight;
  warungCtl=new AbortController();
  try{
    const {reply,movement}=await warungReply(warungCtl.signal); if(visit!==warungVisit) return; wait.remove();
    warungLog.push({role:"assistant",content:reply});
    await warungSay(reply,false,movement);
  }catch(err){
    if(visit!==warungVisit) return;
    wait.remove(); warungLog.pop();
    const code=err&&(err.code||err.name);
    if(code!=="AbortError") warungBubble("note", code==="rate_limited"?"Bu Lastri is serving another table. Try again in a minute.":"Bu Lastri didn't catch that (the connection dropped). Try again in a moment.").parentNode.classList.add("wnote");
  }finally{ if(visit===warungVisit){ warungMovement("rest"); warungBusy=false; $("#warungSend").disabled=false; warungIdeas(); } }
}
$("#warungForm").addEventListener("submit",e=>{ e.preventDefault(); warungAsk($("#warungInput").value); });
$("#warungInput").addEventListener("keydown",e=>{ if(e.key==="Enter"&&!e.shiftKey){ e.preventDefault(); warungAsk($("#warungInput").value); } });
$("#warungReset").addEventListener("click",()=>{ warungVisit++; warungSpeech++; if(warungCtl) warungCtl.abort(); warungBusy=false; warungLog=[]; $("#warungLog").replaceChildren(); warungMovement("rest"); warungOpened=false; openWarung(); });
