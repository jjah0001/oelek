"use strict";
// Province codes and names.
// ================= provinces =================
// code: [name, lon, lat, zoom width in map units]
const PROV = {
 AC:["Aceh",96.9,4.3,240], SU:["North Sumatra",98.9,2.2,260], SB:["West Sumatra",100.5,-0.8,220], RI:["Riau",101.7,0.4,260],
 KR:["Riau Islands",104.6,1.1,200], JA:["Jambi",103.0,-1.6,220], BE:["Bengkulu",102.2,-3.7,220], SS:["South Sumatra",104.3,-3.2,240],
 BB:["Bangka Belitung",106.6,-2.5,220], LA:["Lampung",105.0,-5.0,200], BT:["Banten",106.0,-6.5,160], JK:["Jakarta",106.85,-6.15,140],
 JB:["West Java",107.7,-7.0,200], JT:["Central Java",110.0,-7.2,220], YO:["Yogyakarta",110.4,-7.9,140], JI:["East Java",112.5,-7.6,240],
 BA:["Bali",115.2,-8.4,140], NB:["West Nusa Tenggara",117.3,-8.6,240], NT:["East Nusa Tenggara",122.6,-9.6,320],
 KB:["West Kalimantan",111.0,-0.1,300], KT:["Central Kalimantan",113.4,-1.6,300], KS:["South Kalimantan",115.3,-3.0,220],
 KI:["East Kalimantan",116.6,0.4,280], KU:["North Kalimantan",116.4,3.2,240], SA:["North Sulawesi",124.5,1.0,220],
 ST:["Central Sulawesi",121.2,-1.3,280], SR:["West Sulawesi",119.3,-2.6,220], SN:["South Sulawesi",120.0,-4.0,260],
 MA:["Maluku",129.0,-3.3,280], MU:["North Maluku",127.9,1.0,240], GO:["Gorontalo",122.6,0.7,200],
 PB:["West Papua",133.6,-1.3,320], PT:["Central Papua",136.9,-4.0,320], PA:["Papua",140.2,-2.9,300], PS:["South Papua",139.8,-7.4,300]
};
const ACROSS = "ID"; // listed sambals made across Indonesia with no single home province
const provName = c => c===ACROSS ? "Across Indonesia" : PROV[c][0];
