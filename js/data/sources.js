"use strict";
// Source citations: survey keys plus every linked regional source.
// ================= sources =================
const SRC = {
  P:{t:"Surya & Tedjakusuma (2022), Diversity of sambals, Journal of Ethnic Foods",u:"https://doi.org/10.1186/s42779-022-00142-7"},
  W:{t:"Wikipedia, Varieties of sambal",u:"https://en.wikipedia.org/wiki/Varieties_of_sambal"},
  K:{t:"Daftar sambal khas Indonesia (Ensiklopedia P2K Stekom)",u:"https://p2k.stekom.ac.id/ensiklopedia/Daftar_sambal_khas_Indonesia"},
  IT:{t:"Indonesia.travel, Dare to taste Indonesia's hottest sambal",u:"https://www.indonesia.travel/au-en/travel-ideas/gastronomy/dare-taste-indonesia-s-hottest-burning-sambal"},
  L6:{t:"Liputan6, Resep asam udeung khas Aceh",u:"https://www.liputan6.com/lifestyle/read/8261637/resep-asam-udeung-khas-aceh-yang-segar-dan-bikin-nagih"},
  MJ:{t:"Mojok, Bertahan dari gegar lidah di NTT dengan sambal lu'at",u:"https://mojok.co/ulasan/smokol/bertahan-dengan-gegar-lidah-di-ntt-dengan-sambal-luat/"},
  GS:{t:"GoodStats, Mengapa lebih banyak sambal berada di Pulau Jawa (UGM count of 322 / 257)",u:"https://goodstats.id/article/mengapa-lebih-banyak-sambal-berada-di-pulau-jawa-gG5zT"},
  B:{t:"Budaya Indonesia, Aneka sambal khas Nusantara (and linked regional entries)",u:"https://budaya-indonesia.org/Aneka-Sambal-Khas-Nusantara"},
  DK:{t:"detikKalimantan, 7 sambal khas Kalimantan",u:"https://www.detik.com/kalimantan/kuliner/d-8606976/infografis-7-sambal-khas-kalimantan-pedasnya-maknyus"},
  DN:{t:"detikBali, Resep 5 sambal khas NTB",u:"https://www.detik.com/bali/kuliner/d-7712728/resep-5-sambal-khas-ntb-beserta-cara-membuat"}
};
// a source is a key in SRC or a direct URL to the article that records the sambal
function srcInfo(s){ if(SRC[s]) return SRC[s]; try{ const h=new URL(s).hostname.replace(/^www\./,""); return {t:h,u:s}; }catch(e){ return {t:String(s),u:"#"}; } }


Object.assign(SRC, {
  "https://doi.org/10.1186/s42779-022-00142-7": {
    "t": "Client Challenge",
    "u": "https://doi.org/10.1186/s42779-022-00142-7"
  },
  "https://en.wikipedia.org/wiki/Varieties_of_sambal": {
    "t": "Varieties of sambal - Wikipedia",
    "u": "https://en.wikipedia.org/wiki/Varieties_of_sambal"
  },
  "https://www.indonesia.travel/au-en/travel-ideas/gastronomy/dare-taste-indonesia-s-hottest-burning-sambal": {
    "t": "Dare taste Indonesia&#x27;s Hottest Burning Sambal! - Indonesia Travel",
    "u": "https://www.indonesia.travel/au-en/travel-ideas/gastronomy/dare-taste-indonesia-s-hottest-burning-sambal"
  },
  "https://budaya-indonesia.org/sambal-cabe-rawit-aceh": {
    "t": "Sambal Cabe Rawit Aceh · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/sambal-cabe-rawit-aceh"
  },
  "https://budaya-indonesia.org/Sambal-Sabu-Udang-Rebon": {
    "t": "Sambal Sabu (Udang Rebon) · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/Sambal-Sabu-Udang-Rebon"
  },
  "https://budaya-indonesia.org/Sambal-Udang-Tokok-Aceh-Selatan-NAD": {
    "t": "Sambal Udang Tokok - Aceh Selatan - NAD · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/Sambal-Udang-Tokok-Aceh-Selatan-NAD"
  },
  "https://budaya-indonesia.org/Asam-U-Sambal-khas-Aceh": {
    "t": "Asam U Sambal khas Aceh · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/Asam-U-Sambal-khas-Aceh"
  },
  "https://budaya-indonesia.org/Aneka-Sambal-Khas-Nusantara": {
    "t": "Aneka Sambal Khas Nusantara · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/Aneka-Sambal-Khas-Nusantara"
  },
  "https://budaya-indonesia.org/Sambal-Janda-Mengamuk-Sumatera-Utara-Sumatera-Utara": {
    "t": "Sambal Janda Mengamuk - Sumatera Utara - Sumatera Utara · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/Sambal-Janda-Mengamuk-Sumatera-Utara-Sumatera-Utara"
  },
  "https://www.liputan6.com/regional/read/5356711/5-sajian-sambal-khas-sumatra-yang-menggoyang-lidah-ada-sambal-ganja": {
    "t": "5 Sajian Sambal Khas Sumatra yang Menggoyang Lidah, Ada Sambal Ganja",
    "u": "https://www.liputan6.com/regional/read/5356711/5-sajian-sambal-khas-sumatra-yang-menggoyang-lidah-ada-sambal-ganja"
  },
  "https://www.goodnewsfromindonesia.id/2026/02/19/samba-lado-tanak-ketika-santan-teri-dan-jengkol-bersatu-dalam-satu-wajan-penuh-cerita": {
    "t": "Samba Lado Tanak: Ketika Santan, Teri, dan Jengkol Bersatu dalam Satu Wajan Penuh Cerita | Good News From Indonesia",
    "u": "https://www.goodnewsfromindonesia.id/2026/02/19/samba-lado-tanak-ketika-santan-teri-dan-jengkol-bersatu-dalam-satu-wajan-penuh-cerita"
  },
  "https://www.liputan6.com/regional/read/3690920/sambalado-tulang-sambal-unik-minang-dari-tulang-sapi": {
    "t": "Sambalado Tulang, Sambal Unik Minang dari Tulang Sapi",
    "u": "https://www.liputan6.com/regional/read/3690920/sambalado-tulang-sambal-unik-minang-dari-tulang-sapi"
  },
  "https://budaya-indonesia.org/Sambal-Padeh-Padang-Sumatera-Barat": {
    "t": "Sambal Padeh - Padang - Sumatera Barat · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/Sambal-Padeh-Padang-Sumatera-Barat"
  },
  "https://budaya-indonesia.org/Sambal-Lado-Uap-Bukittinggi-Sumatera-Barat": {
    "t": "Sambal Lado Uap - Bukittinggi - Sumatera Barat · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/Sambal-Lado-Uap-Bukittinggi-Sumatera-Barat"
  },
  "https://budaya-indonesia.org/Sambal-Cencaluk-Khas-Riau": {
    "t": "Sambal Cencaluk Khas Riau · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/Sambal-Cencaluk-Khas-Riau"
  },
  "https://budaya-indonesia.org/Sambal-Terung-Asam-Riau": {
    "t": "Sambal Terung Asam Riau · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/Sambal-Terung-Asam-Riau"
  },
  "https://budaya-indonesia.org/Sambal-Goreng-Campur-Khas-Riau-Riau-Riau": {
    "t": "Sambal Goreng Campur Khas Riau - Riau - Riau · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/Sambal-Goreng-Campur-Khas-Riau-Riau-Riau"
  },
  "https://budaya-indonesia.org/Sambal-Goreng-Hancur-Jambi-Jambi": {
    "t": "Sambal Goreng Hancur - Jambi - Jambi · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/Sambal-Goreng-Hancur-Jambi-Jambi"
  },
  "https://budaya-indonesia.org/Sambal-Terasi-Macang-Khas-Jambi": {
    "t": "Sambal Terasi Macang (Khas Jambi) · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/Sambal-Terasi-Macang-Khas-Jambi"
  },
  "https://budaya-indonesia.org/Sambal-Asam-Belut-Jambi-Jambi": {
    "t": "Sambal Asam Belut - Jambi - Jambi · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/Sambal-Asam-Belut-Jambi-Jambi"
  },
  "https://www.merdeka.com/peristiwa/sambal-bacang-pelengkap-hidangan-musiman-khas-palembang.html": {
    "t": "Sambal bacang, pelengkap hidangan musiman khas Palembang - merdeka.com",
    "u": "https://www.merdeka.com/peristiwa/sambal-bacang-pelengkap-hidangan-musiman-khas-palembang.html"
  },
  "https://budaya-indonesia.org/Sambal-Ranggam-Ogan-Komering-Ulu-Sumatera-Selatan": {
    "t": "Sambal Ranggam - Ogan Komering Ulu - Sumatera Selatan · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/Sambal-Ranggam-Ogan-Komering-Ulu-Sumatera-Selatan"
  },
  "https://www.mongabay.co.id/2022/01/24/sambal-lingkung-simbol-kearifan-masyarakat-melayu-dengan-alam/": {
    "t": "Sambal Lingkung, Simbol Kearifan Masyarakat Melayu dengan Alam",
    "u": "https://www.mongabay.co.id/2022/01/24/sambal-lingkung-simbol-kearifan-masyarakat-melayu-dengan-alam/"
  },
  "https://budaya-indonesia.org/Sambal-Belacan-Khas-Bangka": {
    "t": "Sambal Belacan Khas Bangka · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/Sambal-Belacan-Khas-Bangka"
  },
  "https://www.liputan6.com/hot/read/4599878/20-macam-sambal-dari-penjuru-nusantara-yang-wajib-dicoba-ketahui-resepnya": {
    "t": "20 Macam Sambal dari Penjuru Nusantara yang Wajib Dicoba, Ketahui Resepnya",
    "u": "https://www.liputan6.com/hot/read/4599878/20-macam-sambal-dari-penjuru-nusantara-yang-wajib-dicoba-ketahui-resepnya"
  },
  "https://www.popmama.com/life/health/kumpulan-resep-sambal-sunda-00-kd2wt-p7dxy9": {
    "t": "6 Kumpulan Resep Sambal Sunda | Popmama.com",
    "u": "https://www.popmama.com/life/health/kumpulan-resep-sambal-sunda-00-kd2wt-p7dxy9"
  },
  "https://budaya-indonesia.org/Sambal-Muncang-Jawa-Barat": {
    "t": "Sambal Muncang Jawa Barat · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/Sambal-Muncang-Jawa-Barat"
  },
  "https://budaya-indonesia.org/Sambal-Godog-Jawa-Barat-Jawa-Barat-Jawa-Barat": {
    "t": "Sambal Godog Jawa Barat - Jawa Barat - Jawa Barat · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/Sambal-Godog-Jawa-Barat-Jawa-Barat-Jawa-Barat"
  },
  "https://budaya-indonesia.org/Sambal-Kecap-Tahu-Gejrot-Jawa-Barat-Jawa-Barat": {
    "t": "Sambal Kecap Tahu Gejrot - Jawa Barat - Jawa Barat · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/Sambal-Kecap-Tahu-Gejrot-Jawa-Barat-Jawa-Barat"
  },
  "https://budaya-indonesia.org/Sambal-Tauco-Jawa-Barat-Jawa-Barat": {
    "t": "Sambal Tauco - Jawa Barat - Jawa Barat · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/Sambal-Tauco-Jawa-Barat-Jawa-Barat"
  },
  "https://budaya-indonesia.org/Sambal-Goreng-Tahu-Jawa-Barat-Jawa-Barat": {
    "t": "Sambal Goreng Tahu - Jawa Barat - Jawa Barat · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/Sambal-Goreng-Tahu-Jawa-Barat-Jawa-Barat"
  },
  "https://www.ubudfoodfestival.com/uff19-sambal-series-sambal-panggang/": {
    "t": "#UFF19 Sambal Series: Sambal Panggang | Ubud Food Festival",
    "u": "https://www.ubudfoodfestival.com/uff19-sambal-series-sambal-panggang/"
  },
  "https://budaya-indonesia.org/Sambal-Samtis-Jepara-Jawa-Tengah": {
    "t": "Sambal Samtis - Jepara - Jawa Tengah · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/Sambal-Samtis-Jepara-Jawa-Tengah"
  },
  "https://budaya-indonesia.org/Sambal-Teri-Goreng-Rembang-Jawa-Tengah": {
    "t": "Sambal Teri Goreng - Rembang - Jawa Tengah · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/Sambal-Teri-Goreng-Rembang-Jawa-Tengah"
  },
  "https://budaya-indonesia.org/Sambal-Daun-Melinjo-Klaten-Klaten-Jawa-Tengah": {
    "t": "Sambal Daun Melinjo Klaten - Klaten - Jawa Tengah · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/Sambal-Daun-Melinjo-Klaten-Klaten-Jawa-Tengah"
  },
  "https://rri.co.id/denpasar/kuliner/2623431/asal-usul-ayam-geprek-dari-warung-sederhana-di-yogyakarta": {
    "t": "Asal Usul Ayam Geprek dari Warung Sederhana di Yogyakarta - RRI.co.id",
    "u": "https://rri.co.id/denpasar/kuliner/2623431/asal-usul-ayam-geprek-dari-warung-sederhana-di-yogyakarta"
  },
  "https://budaya-indonesia.org/Sambel-Terasi": {
    "t": "Sambel Terasi Jogja · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/Sambel-Terasi"
  },
  "https://www.jawapos.com/kuliner/2509060063/dijamin-lezat-ini-resep-sambal-tempong-khas-banyuwangi-yang-pedas-segar-untuk-hidangan-keluarga": {
    "t": "Dijamin Lezat! Ini Resep Sambal Tempong Khas Banyuwangi yang Pedas Segar untuk Hidangan Keluarga",
    "u": "https://www.jawapos.com/kuliner/2509060063/dijamin-lezat-ini-resep-sambal-tempong-khas-banyuwangi-yang-pedas-segar-untuk-hidangan-keluarga"
  },
  "https://www.fimela.com/food/read/5163717/resep-sambal-pencit-khas-madura-yang-pedas-dan-segar": {
    "t": "Resep Sambal Pencit Khas Madura yang Pedas dan Segar",
    "u": "https://www.fimela.com/food/read/5163717/resep-sambal-pencit-khas-madura-yang-pedas-dan-segar"
  },
  "https://www.jawapos.com/kuliner/2609240047/resep-sambal-hitam-madura-gurih-pedas-dengan-bumbu-rempah": {
    "t": "Resep Sambal Hitam Madura, Gurih Pedas dengan Bumbu Rempah",
    "u": "https://www.jawapos.com/kuliner/2609240047/resep-sambal-hitam-madura-gurih-pedas-dengan-bumbu-rempah"
  },
  "https://budaya-indonesia.org/sambal-lamongan": {
    "t": "Sambal Lamongan · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/sambal-lamongan"
  },
  "https://budaya-indonesia.org/Sambal-Kemiri-khas-Jawa-Timur": {
    "t": "Sambal Kemiri khas Jawa Timur · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/Sambal-Kemiri-khas-Jawa-Timur"
  },
  "https://budaya-indonesia.org/Sambal-Goreng-Petis-khas-Jawa-Timur": {
    "t": "Sambal Goreng Petis khas Jawa Timur · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/Sambal-Goreng-Petis-khas-Jawa-Timur"
  },
  "https://english.kontan.co.id/news/the-delicious-rawon-malang-with-sambal-tempe": {
    "t": "The delicious rawon malang with sambal tempe",
    "u": "https://english.kontan.co.id/news/the-delicious-rawon-malang-with-sambal-tempe"
  },
  "https://www.idntimes.com/food/dining-guide/akbar-30/5-aneka-sambal-khas-bali-c1c2": {
    "t": "5 Aneka Sambal Khas Bali, Bikin Makan Gak Berhenti! | IDN Times",
    "u": "https://www.idntimes.com/food/dining-guide/akbar-30/5-aneka-sambal-khas-bali-c1c2"
  },
  "https://www.detik.com/bali/kuliner/d-6480238/6-sambal-khas-bali-lengkap-dengan-resepnya": {
    "t": "6 Sambal Khas Bali, Lengkap dengan Resepnya",
    "u": "https://www.detik.com/bali/kuliner/d-6480238/6-sambal-khas-bali-lengkap-dengan-resepnya"
  },
  "https://budayabali.com/sager-gerih-sambal-khas-tabanan-dengan-campuran-ikan-asin-dan-kelapa-panggang": {
    "t": "Sager Gerih: A Traditional Sambal from Tabanan with a Blend of Salted Fish and Roasted Coconut - Bali Padma Bhuwana",
    "u": "https://budayabali.com/sager-gerih-sambal-khas-tabanan-dengan-campuran-ikan-asin-dan-kelapa-panggang"
  },
  "https://www.liputan6.com/regional/read/5219143/tak-hanya-sambal-matah-ini-ragam-sambal-khas-bali": {
    "t": "Tak Hanya Sambal Matah, Ini Ragam Sambal Khas Bali",
    "u": "https://www.liputan6.com/regional/read/5219143/tak-hanya-sambal-matah-ini-ragam-sambal-khas-bali"
  },
  "https://budaya-indonesia.org/Sambal-Terong-Goreng-Bali-Bali": {
    "t": "Sambal Terong Goreng - Bali - Bali · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/Sambal-Terong-Goreng-Bali-Bali"
  },
  "https://www.detik.com/bali/kuliner/d-7712728/resep-5-sambal-khas-ntb-beserta-cara-membuat": {
    "t": "Resep 5 Sambal Khas NTB Beserta Cara Membuat",
    "u": "https://www.detik.com/bali/kuliner/d-7712728/resep-5-sambal-khas-ntb-beserta-cara-membuat"
  },
  "https://budaya-indonesia.org/Sambal-Bawang-khas-NTB": {
    "t": "Sambal Bawang khas NTB · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/Sambal-Bawang-khas-NTB"
  },
  "https://budaya-indonesia.org/sambal-sumba": {
    "t": "Sambal Sumba · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/sambal-sumba"
  },
  "https://budaya-indonesia.org/Sambal-Teri-Khas-NTT": {
    "t": "Sambal Teri Khas NTT · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/Sambal-Teri-Khas-NTT"
  },
  "https://www.detik.com/kalimantan/kuliner/d-8606976/infografis-7-sambal-khas-kalimantan-pedasnya-maknyus": {
    "t": "Infografis: 7 Sambal Khas Kalimantan, Pedasnya Maknyus!",
    "u": "https://www.detik.com/kalimantan/kuliner/d-8606976/infografis-7-sambal-khas-kalimantan-pedasnya-maknyus"
  },
  "https://budaya-indonesia.org/Sambal-Tempoyak-Kalimantan": {
    "t": "Sambal Tempoyak Pontianak · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/Sambal-Tempoyak-Kalimantan"
  },
  "https://www.idntimes.com/food/dining-guide/naufal-al-rahman-1/sambal-khas-kalimantan-yang-pedasnya-menggigit": {
    "t": "10 Sambal Khas Kalimantan yang Pedasnya Menggigit Banget, Pernah | IDN Times",
    "u": "https://www.idntimes.com/food/dining-guide/naufal-al-rahman-1/sambal-khas-kalimantan-yang-pedasnya-menggigit"
  },
  "https://www.idntimes.com/food/recipe/reza-iqbal/5-resep-sambal-khas-indonesia-yang-belum-populer": {
    "t": "5 Resep Sambal Khas Indonesia yang Belum Populer, tapi Bikin Ngil | IDN Times",
    "u": "https://www.idntimes.com/food/recipe/reza-iqbal/5-resep-sambal-khas-indonesia-yang-belum-populer"
  },
  "https://budaya-indonesia.org/Sambal-Kacang-Khas-Kalimantan-Selatan": {
    "t": "Sambal Kacang Khas Kalimantan Selatan · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/Sambal-Kacang-Khas-Kalimantan-Selatan"
  },
  "https://versilama.budaya-indonesia.org/sambal-ikan-bakar-khas-kalimantan-selatan": {
    "t": "Sambal Ikan Bakar Khas Kalimantan Selatan · Budaya Indonesia",
    "u": "https://versilama.budaya-indonesia.org/sambal-ikan-bakar-khas-kalimantan-selatan"
  },
  "https://budaya-indonesia.org/Sambal-Nanas-Kalimantan-Timur": {
    "t": "Sambal Nanas Kalimantan Timur · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/Sambal-Nanas-Kalimantan-Timur"
  },
  "https://budaya-indonesia.org/Sambal-Gami-Cumi-Bontang-Kalimantan-Timur": {
    "t": "Sambal Gami Cumi - Bontang - Kalimantan Timur · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/Sambal-Gami-Cumi-Bontang-Kalimantan-Timur"
  },
  "https://www.cookmeindonesian.com/nunuks-sambal-dabu-dabu-lilang-manado-chopped-chilli-lime-sambal-vegan/": {
    "t": "Nunuk’s Sambal Dabu-Dabu Lilang: Manado Chopped Chilli & Lime Sambal (Vegan) - Cook Me Indonesian",
    "u": "https://www.cookmeindonesian.com/nunuks-sambal-dabu-dabu-lilang-manado-chopped-chilli-lime-sambal-vegan/"
  },
  "https://budaya-indonesia.org/Sambal-Pepaya-Sulawesi": {
    "t": "Sambal Pepaya Sulawesi Utara · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/Sambal-Pepaya-Sulawesi"
  },
  "https://budaya-indonesia.org/Sambal-Ikan-Sagela-Gorontalo-Gorontalo": {
    "t": "Sambal Ikan Sagela - Gorontalo - Gorontalo · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/Sambal-Ikan-Sagela-Gorontalo-Gorontalo"
  },
  "https://budaya-indonesia.org/Sambal-Ikan-Teri-Khas-Gorontalo-Gorontalo-Gorontalo": {
    "t": "Sambal Ikan Teri Khas Gorontalo - Gorontalo - Gorontalo · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/Sambal-Ikan-Teri-Khas-Gorontalo-Gorontalo-Gorontalo"
  },
  "https://budaya-indonesia.org/Sambal-Terung-Bakar-Gorontalo-Gorontalo": {
    "t": "Sambal Terung Bakar - Gorontalo - Gorontalo · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/Sambal-Terung-Bakar-Gorontalo-Gorontalo"
  },
  "https://en.wikipedia.org/wiki/Gorontalese_cuisine": {
    "t": "Gorontalese cuisine - Wikipedia",
    "u": "https://en.wikipedia.org/wiki/Gorontalese_cuisine"
  },
  "https://budaya-indonesia.org/Sambal-Tappa-Sulawesi-Selatan": {
    "t": "Sambal Tappa Sulawesi Selatan · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/Sambal-Tappa-Sulawesi-Selatan"
  },
  "https://budaya-indonesia.org/Sambal-Ikan-Sambal-Buras-Makassar-Sulawesi-Selatan": {
    "t": "Sambal Ikan (Sambal Buras) - Makassar - Sulawesi Selatan · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/Sambal-Ikan-Sambal-Buras-Makassar-Sulawesi-Selatan"
  },
  "https://budaya-indonesia.org/Sambal-Bakasang-Banda-Maluku": {
    "t": "Sambal Bakasang - Banda - Maluku · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/Sambal-Bakasang-Banda-Maluku"
  },
  "https://www.goodnewsfromindonesia.id/2026/08/11/ikan-bakar-manokwari-sajian-ikan-laut-dengan-sambal-pedas-khas-papua": {
    "t": "Ikan Bakar Manokwari, Sajian Ikan Laut dengan Sambal Pedas Khas Papua",
    "u": "https://www.goodnewsfromindonesia.id/2026/08/11/ikan-bakar-manokwari-sajian-ikan-laut-dengan-sambal-pedas-khas-papua"
  },
  "https://www.goodnewsfromindonesia.id/2022/11/18/daftar-lengkap-makanan-khas-papua-dan-jajanan-oleh-oleh-5-provinsi": {
    "t": "Daftar Lengkap Makanan Khas Papua dan Jajanan Oleh-Oleh (6 Provinsi)",
    "u": "https://www.goodnewsfromindonesia.id/2022/11/18/daftar-lengkap-makanan-khas-papua-dan-jajanan-oleh-oleh-5-provinsi"
  },
  "https://budaya-indonesia.org/Sambal-Dabu-Dabu-Papua-Papua": {
    "t": "Sambal Dabu-Dabu - Papua - Papua · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/Sambal-Dabu-Dabu-Papua-Papua"
  },
  "https://budaya-indonesia.org/Sambal-Goreng-Telur-Ikan-Bobara-Papua-Papua": {
    "t": "Sambal Goreng Telur Ikan Bobara - Papua - Papua · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/Sambal-Goreng-Telur-Ikan-Bobara-Papua-Papua"
  },
  "https://budaya-indonesia.org/Sambal-Tomat-Terasi-Merauke-Papua": {
    "t": "Sambal Tomat Terasi - Merauke - Papua · Budaya Indonesia",
    "u": "https://budaya-indonesia.org/Sambal-Tomat-Terasi-Merauke-Papua"
  },
  "https://link.springer.com/article/10.1186/s42779-022-00142-7/tables/1": {
    "t": "Client Challenge",
    "u": "https://link.springer.com/article/10.1186/s42779-022-00142-7/tables/1"
  },
  "https://kuliner.ilmci.com/sambal-lecet/": {
    "t": "ILMCI, Sambal Lecet",
    "u": "https://kuliner.ilmci.com/sambal-lecet/"
  },
  "https://cookpad.com/id/resep/10122706": {
    "t": "SEKARRADUHIN, Sambal Picak Khas Bengkulu (2019)",
    "u": "https://cookpad.com/id/resep/10122706"
  },
  "https://cookpad.com/id/resep/12142061": {
    "t": "Malik’s Mom Kitchen, Sambel Krosak (2020)",
    "u": "https://cookpad.com/id/resep/12142061"
  },
  "https://cookpad.com/id/resep/16218566": {
    "t": "Nay’s Kitchen, Sambal Bacem (2025)",
    "u": "https://cookpad.com/id/resep/16218566"
  },
  "https://cookpad.com/id/resep/3208695-sambal-suna-sambal-bawang-khas-dayak-herlinwidodo": {
    "t": "Herlin Widodo, Sambal Suna (2017)",
    "u": "https://cookpad.com/id/resep/3208695-sambal-suna-sambal-bawang-khas-dayak-herlinwidodo"
  },
  "https://www.idntimes.com/food/recipe/resep-ayam-goreng-sambal-dengkek-00-p3rq2-pjh9yp/amp": {
    "t": "IDN Times, Ayam Goreng Sambal Dengkek Khas Betawi",
    "u": "https://www.idntimes.com/food/recipe/resep-ayam-goreng-sambal-dengkek-00-p3rq2-pjh9yp/amp"
  },
  "https://budaya-indonesia.org/Sambal-Duo-Sale": {
    "t": "Budaya Indonesia, Sambal Duo Sale (2017)",
    "u": "https://budaya-indonesia.org/Sambal-Duo-Sale"
  },
  "https://dailycookingquest.com/sambal-cabe-rawit-aceh-acehnese-bird-eye-chili-sauce.html": {
    "t": "Daily Cooking Quest, Sambal Cabe Rawit Aceh",
    "u": "https://dailycookingquest.com/sambal-cabe-rawit-aceh-acehnese-bird-eye-chili-sauce.html"
  },
  "https://pdbifiles.nos.jkt-1.neo.id/files/2018/12/03/niasanny_SambalTappaSulsel-1.PNG": {
    "t": "Mahakarya 5000 Resep, recipe 3749: Sambal Tappa (archived scan)",
    "u": "https://pdbifiles.nos.jkt-1.neo.id/files/2018/12/03/niasanny_SambalTappaSulsel-1.PNG"
  },
  "https://pdbifiles.nos.jkt-1.neo.id/files/2018/12/02/niasanny_SambalMuncangJabar-1.PNG": {
    "t": "Mahakarya 5000 Resep, recipe 3723: Sambal Muncang (archived scan)",
    "u": "https://pdbifiles.nos.jkt-1.neo.id/files/2018/12/02/niasanny_SambalMuncangJabar-1.PNG"
  },
  "https://budaya-indonesia.org/sambal-ikan-bakar-khas-kalimantan-selatan": {
    "t": "Budaya Indonesia, Sambal Ikan Bakar Khas Kalimantan Selatan",
    "u": "https://budaya-indonesia.org/sambal-ikan-bakar-khas-kalimantan-selatan"
  }
});
