"use strict";
// Islamic days the kampung keeps, by Gregorian date (the visitor's local date).
//   ramadan = 1 Ramadan, fitri = 1 Syawal (Idul Fitri), adha = 10 Dzulhijjah (Idul Adha),
//   suro = 1 Muharram / 1 Suro (malam 1 Suro is the evening before), maulid = 12 Rabiul Awal
//   (Grebeg Maulud; Sekaten is the seven days before it).
// 2027: the government's SKB 3 Menteri on 2027 holidays (fitri, adha, suro, maulid) and BRIN's
// forecast for 1 Ramadan. Later years are Umm al-Qura estimates and can be a day early for
// Indonesia: replace each year with the SKB dates once they are published (usually September).
const HARI_BESAR=[
  ["ramadan","2027-02-08"],["fitri","2027-03-10"],["adha","2027-05-17"],["suro","2027-06-06"],["maulid","2027-08-15"],
  ["ramadan","2028-01-28"],["fitri","2028-02-26"],["adha","2028-05-05"],["suro","2028-05-25"],["maulid","2028-08-03"],
  ["ramadan","2029-01-16"],["fitri","2029-02-14"],["adha","2029-04-24"],["suro","2029-05-14"],["maulid","2029-07-24"],
  ["ramadan","2030-01-05"],["fitri","2030-02-04"],["adha","2030-04-13"],["suro","2030-05-03"],["maulid","2030-07-13"],
  ["ramadan","2030-12-26"],["fitri","2031-01-24"],["adha","2031-04-02"],["suro","2031-04-23"],["maulid","2031-07-02"],
  ["ramadan","2031-12-15"],["fitri","2032-01-14"],["adha","2032-03-22"],["suro","2032-04-11"],["maulid","2032-06-20"],
];

// The kampung's other neighbours keep their days too (Natal and Tahun Baru are fixed and need no list).
//   imlek = Tahun Baru Imlek (Cap Go Meh is 14 days later), nyepi = Hari Suci Nyepi (the ogoh-ogoh
//   parade is the evening before), paskah = Easter Sunday (Jumat Agung two days before), waisak.
// 2027: SKB 3 Menteri. Later years: Easter is exact; Imlek is the second new moon after the winter
// solstice; Nyepi the first new moon from 1 March (Bali time) and Waisak the first full moon from 6 May,
// which can be a day off or pick the other month. Replace them with each year's SKB.
const HARI_RAYA=[
  ["imlek","2027-02-06"],["nyepi","2027-03-08"],["paskah","2027-03-28"],["waisak","2027-05-20"],
  ["imlek","2028-01-26"],["nyepi","2028-03-26"],["paskah","2028-04-16"],["waisak","2028-05-09"],
  ["imlek","2029-02-13"],["nyepi","2029-03-15"],["paskah","2029-04-01"],["waisak","2029-05-28"],
  ["imlek","2030-02-03"],["nyepi","2030-03-04"],["paskah","2030-04-21"],["waisak","2030-05-17"],
  ["imlek","2031-01-23"],["nyepi","2031-03-23"],["paskah","2031-04-13"],["waisak","2031-05-07"],
  ["imlek","2032-02-11"],["nyepi","2032-03-12"],["paskah","2032-03-28"],["waisak","2032-05-25"],
];
