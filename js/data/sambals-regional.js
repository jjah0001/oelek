"use strict";
// The 207 regional profiles (IDs l0–l206) appended to S.
// ================= completed regional profiles =================
// Stable l0–l206 IDs preserve the original catalogue references.
// Province-only records are shown in the map panel, not given invented coordinates.
const L = [];

S.push(
{
  "id": "l0",
  "name": "Sambal Asam Teri",
  "prov": "AC",
  "region": "Aceh",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 4,
  "p": [
    4,
    2,
    4,
    0,
    3,
    2
  ],
  "ing": [
    "Salted anchovies",
    "Bird’s-eye chilli",
    "Shallot",
    "Bilimbi or asam sunti",
    "Salt"
  ],
  "serve": [
    "Steamed rice",
    "Clear vegetable soup",
    "Grilled fish"
  ],
  "note": "Anchovies give this Acehnese sour sambal a salty bite. Pound the prepared fish with chilli and shallot, using bilimbi or asam sunti for a sharp finish.",
  "src": [
    "P"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Salted anchovy",
    "source": "P"
  }
},
{
  "id": "l1",
  "name": "Sambal Udang",
  "prov": "AC",
  "region": "Aceh",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    1,
    1,
    1,
    2,
    4
  ],
  "ing": [
    "Shrimp",
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Tomato",
    "Oil",
    "Salt"
  ],
  "serve": [
    "Steamed rice",
    "Sautéed greens",
    "Fried tofu"
  ],
  "note": "Shrimp is the main ingredient, rather than a background seasoning. A cooked chilli and allium paste coats the shrimp, making this Acehnese sambal substantial enough to serve as a side dish.",
  "src": [
    "P"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Shrimp",
    "source": "P"
  }
},
{
  "id": "l2",
  "name": "Sambal Asam Udeung Boh Limeung",
  "prov": "AC",
  "region": "Aceh",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 4,
  "p": [
    4,
    2,
    5,
    0,
    4,
    2
  ],
  "ing": [
    "Cooked shrimp",
    "Bird’s-eye chilli",
    "Shallot",
    "Bilimbi",
    "Lemongrass",
    "Makrut lime leaf",
    "Lime",
    "Salt"
  ],
  "serve": [
    "Steamed rice",
    "Clear vegetable soup",
    "Fried fish"
  ],
  "note": "This fresh-bilimbi version of asam udeung combines cooked shrimp with raw aromatics. Crush it coarsely so the shrimp remains distinct and the fruit supplies a juicy acidity.",
  "src": [
    "K"
  ],
  "persona": [
    "The Bright Spark",
    "Lively and refreshing, you keep things moving."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "",
    "source": "K"
  }
},
{
  "id": "l3",
  "name": "Sambal Asam Udeung Sabeu",
  "prov": "AC",
  "region": "Aceh",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 4,
  "p": [
    4,
    3,
    5,
    0,
    3,
    2
  ],
  "ing": [
    "Salted rebon shrimp",
    "Bird’s-eye chilli",
    "Shallot",
    "Fresh bilimbi",
    "Lemongrass",
    "Makrut lime leaf",
    "Salt"
  ],
  "serve": [
    "Steamed rice",
    "Boiled vegetables",
    "Grilled fish"
  ],
  "note": "Small salted shrimp replace the larger shrimp of boh limeung. Fresh bilimbi supplies the sourness in this version; its fine shrimp texture makes the sambal more densely savoury.",
  "src": [
    "K"
  ],
  "persona": [
    "The Bright Spark",
    "Lively and refreshing, you keep things moving."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "",
    "source": "K"
  }
},
{
  "id": "l4",
  "name": "Sambal Cecah Agur",
  "prov": "AC",
  "region": "Gayo highlands, Aceh",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 4,
  "p": [
    4,
    3,
    4,
    1,
    3,
    1
  ],
  "ing": [
    "Tamarillo",
    "Red chilli",
    "Shallot",
    "Toasted shrimp paste",
    "Asam sunti",
    "Salt"
  ],
  "serve": [
    "Grilled fish",
    "Steamed rice",
    "Fresh cucumber"
  ],
  "note": "A Gayo highland relish with tamarillo and asam sunti. The fruit makes the paste tart and pulpy; some households add dried fish for more savoury depth.",
  "src": [
    "K"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Gayo highlands",
    "source": "K"
  }
},
{
  "id": "l5",
  "name": "Sambal Keumamah",
  "prov": "AC",
  "region": "Aceh",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 4,
  "p": [
    4,
    2,
    4,
    0,
    1,
    4
  ],
  "ing": [
    "Keumamah (dried tuna)",
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Asam sunti",
    "Oil",
    "Salt"
  ],
  "serve": [
    "Steamed rice",
    "Sayur bening",
    "Cucumber"
  ],
  "note": "Hard-dried tuna is softened and shredded before meeting chilli and asam sunti. Its concentrated fish flavour makes a little of this Acehnese sambal go a long way.",
  "src": [
    "K"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "",
    "source": "K"
  }
},
{
  "id": "l6",
  "name": "Sambal Oen Pegaga",
  "prov": "AC",
  "region": "Aceh",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 3,
  "p": [
    3,
    1,
    3,
    1,
    5,
    3
  ],
  "ing": [
    "Pegagan leaves",
    "Mixed edible local leaves",
    "Bird’s-eye chilli",
    "Lemongrass",
    "Toasted grated coconut",
    "Asam sunti",
    "Salt"
  ],
  "serve": [
    "Steamed rice",
    "Grilled fish",
    "Boiled eggs"
  ],
  "note": "Finely sliced leaves, rather than a smooth chilli paste, define oen pegaga. Toasted coconut and asam sunti dress the greens; the assortment of leaves varies between households.",
  "src": [
    "K"
  ],
  "persona": [
    "The Fresh Perspective",
    "Aromatic and open, you bring a different point of view."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "",
    "source": "K"
  }
},
{
  "id": "l7",
  "name": "Sambal Pliek",
  "prov": "AC",
  "region": "Aceh",
  "locationAccuracy": "province",
  "style": "fermented",
  "heat": 3,
  "p": [
    3,
    4,
    3,
    0,
    2,
    3
  ],
  "ing": [
    "Pliek u (fermented coconut)",
    "Chilli",
    "Shallot",
    "Makrut lime leaf",
    "Salt"
  ],
  "serve": [
    "Steamed rice",
    "Boiled vegetables",
    "Grilled fish"
  ],
  "note": "Pliek u gives this Acehnese sambal its fermented coconut character. Pounded chilli and sliced aromatics enliven the coconut, producing a savoury condiment with a tangy edge.",
  "src": [
    "K"
  ],
  "persona": [
    "The Deep Thinker",
    "Layered and distinctive, you reward a closer look."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "",
    "source": "K"
  }
},
{
  "id": "l8",
  "name": "Sambal Tongkol Asam Sunti",
  "prov": "AC",
  "region": "Aceh",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 4,
  "p": [
    4,
    2,
    4,
    0,
    2,
    4
  ],
  "ing": [
    "Mackerel tuna",
    "Bird’s-eye chilli",
    "Red chilli",
    "Shallot",
    "Asam sunti",
    "Lemongrass",
    "Makrut lime leaf",
    "Oil",
    "Salt"
  ],
  "serve": [
    "Steamed rice",
    "Boiled cassava leaves",
    "Cucumber"
  ],
  "note": "Flaked tongkol carries the chilli paste while asam sunti supplies concentrated acidity. Lemongrass and lime leaf bring fragrance to a fish sambal that also works as a small lauk.",
  "src": [
    "K"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Tuna with asam sunti",
    "source": "K"
  }
},
{
  "id": "l9",
  "name": "Sambal Natinombur",
  "prov": "SU",
  "region": "North Sumatra",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 4,
  "p": [
    4,
    0,
    3,
    0,
    2,
    3
  ],
  "ing": [
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Andaliman",
    "Toasted candlenuts",
    "Ginger",
    "Turmeric",
    "Lime",
    "Salt"
  ],
  "serve": [
    "Grilled carp",
    "Grilled catfish",
    "Steamed rice"
  ],
  "note": "Natinombur is associated with Batak grilled fish. Cooked or roasted aromatics are pounded into a thick sauce; andaliman adds a citrus-like tingle alongside ginger and candlenut.",
  "src": [
    "P"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Turmeric, ginger, candlenut",
    "source": "P"
  }
},
{
  "id": "l10",
  "name": "Sambal Tuktuk",
  "prov": "SU",
  "region": "North Sumatra",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 4,
  "p": [
    4,
    2,
    3,
    0,
    3,
    3
  ],
  "ing": [
    "Dried fish or salted anchovies",
    "Chilli",
    "Shallot",
    "Andaliman",
    "Toasted candlenuts",
    "Lime",
    "Salt"
  ],
  "serve": [
    "Grilled fish",
    "Steamed rice",
    "Boiled greens"
  ],
  "note": "A Mandailing sambal whose pounded fish gives body to chilli and andaliman. Toast or cook the fish first, then crush it into the seasoning for a coarse, savoury texture.",
  "src": [
    "P"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Andaliman with salted anchovy or dried fish",
    "source": "P"
  }
},
{
  "id": "l11",
  "name": "Sambal Gota",
  "prov": "SU",
  "region": "Karo, North Sumatra",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 4,
  "p": [
    4,
    0,
    2,
    0,
    1,
    5
  ],
  "ing": [
    "Pork or chicken blood",
    "Chilli",
    "Shallot",
    "Garlic",
    "Andaliman",
    "Torch ginger",
    "Lime",
    "Makrut lime leaf",
    "Salt"
  ],
  "serve": [
    "Babi panggang Karo",
    "Steamed rice",
    "Boiled cassava leaves"
  ],
  "note": "Gota is a cooked blood-based sauce associated with Karo roast pork. Blood thickens the aromatic chilli mixture; andaliman and citrus cut through its deep, meaty richness.",
  "src": [
    "W"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Karo; andaliman with pork or chicken blood",
    "source": "W"
  }
},
{
  "id": "l12",
  "name": "Sambal Borsang",
  "prov": "SU",
  "region": "Mandailing Natal, North Sumatra",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    2,
    1,
    1,
    3,
    4
  ],
  "ing": [
    "Grilled anchovies",
    "Turkey berries",
    "Grated coconut",
    "Chilli",
    "Shallot",
    "Garlic",
    "Turmeric",
    "Galangal",
    "Turmeric leaf",
    "Salt"
  ],
  "serve": [
    "Steamed rice",
    "Grilled fish",
    "Boiled greens"
  ],
  "note": "Grilled anchovies, berries and coconut make borsang more than a chilli dip. Turmeric colours this Mandailing Natal preparation yellow, while the berries bring a gently bitter contrast.",
  "src": [
    "K"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Mandailing Natal",
    "source": "K"
  }
},
{
  "id": "l13",
  "name": "Sambal Pati",
  "prov": "SU",
  "region": "Mandailing, North Sumatra",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 2,
  "p": [
    2,
    1,
    0,
    2,
    1,
    4
  ],
  "ing": [
    "Coconut milk",
    "Grated coconut",
    "Tempeh",
    "Red beans",
    "Chilli",
    "Shallot",
    "Garlic",
    "Turmeric",
    "Turmeric leaf",
    "Salt"
  ],
  "serve": [
    "Steamed rice",
    "Grilled fish",
    "Cucumber"
  ],
  "note": "A Mandailing coconut-milk sambal with tempeh and beans. Its yellow seasoning and soft, creamy body put it close to a vegetable side dish, with chilli woven through the gravy.",
  "src": [
    "K"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Mandailing",
    "source": "K"
  }
},
{
  "id": "l14",
  "name": "Sambal Sinyarnyar",
  "prov": "SU",
  "region": "Labuhanbatu, North Sumatra",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 4,
  "p": [
    4,
    0,
    4,
    1,
    4,
    0
  ],
  "ing": [
    "Chilli",
    "Shallot",
    "Tomato",
    "Lime",
    "Tamarind water",
    "Salt"
  ],
  "serve": [
    "Grilled fish",
    "Boiled shrimp",
    "Steamed rice"
  ],
  "note": "A thin, sour accompaniment recorded in Labuhanbatu. Tomato, citrus and tamarind water keep it light, making the chilli and shallot especially lively against grilled seafood.",
  "src": [
    "K"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Labuhanbatu",
    "source": "K"
  }
},
{
  "id": "l15",
  "name": "Sambal Rias",
  "prov": "SU",
  "region": "North Sumatra",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 4,
  "p": [
    4,
    0,
    3,
    0,
    4,
    3
  ],
  "ing": [
    "Torch ginger",
    "Andaliman",
    "Toasted candlenuts",
    "Chilli",
    "Tomato",
    "Shallot",
    "Garlic",
    "Salt"
  ],
  "serve": [
    "Grilled carp",
    "Steamed rice",
    "Boiled greens"
  ],
  "note": "Rias uses pounded torch ginger, giving it a different texture from a sliced flower sambal. Cooked chilli and tomato soften the base while andaliman keeps the finish aromatic.",
  "src": [
    "K"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "",
    "source": "K"
  }
},
{
  "id": "l16",
  "name": "Sambal Tombur",
  "prov": "SU",
  "region": "North Sumatra",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 4,
  "p": [
    4,
    0,
    3,
    0,
    3,
    3
  ],
  "ing": [
    "Asam cekala (torch ginger fruit)",
    "Shallot",
    "Garlic",
    "Chilli",
    "Andaliman",
    "Toasted candlenuts",
    "Coriander",
    "Ginger",
    "Salt"
  ],
  "serve": [
    "Grilled fish",
    "Steamed rice",
    "Boiled cassava leaves"
  ],
  "note": "A thick Batak sauce made with roasted or fried aromatics. Torch ginger fruit contributes tart fragrance, while candlenut gives the pounded mixture enough body to cling to fish.",
  "src": [
    "K"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "",
    "source": "K"
  }
},
{
  "id": "l17",
  "name": "Sambal Tinuktuk",
  "prov": "SU",
  "region": "Simalungun, North Sumatra",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 4,
  "p": [
    4,
    0,
    3,
    0,
    3,
    4
  ],
  "ing": [
    "Toasted candlenuts",
    "Torch ginger fruit",
    "Batak chives",
    "Ginger",
    "Toasted pepper",
    "Shallot",
    "Garlic",
    "Salt"
  ],
  "serve": [
    "Grilled fish",
    "Steamed rice",
    "Boiled greens"
  ],
  "note": "Tinuktuk from Simalungun layers ginger and pepper heat with toasted nuts and local alliums. Torch ginger fruit adds an acidic lift; it need not rely on chilli for its warming character.",
  "src": [
    "K"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Simalungun",
    "source": "K"
  }
},
{
  "id": "l18",
  "name": "Sambal Tuyung Daldal",
  "prov": "SU",
  "region": "Pakpak, North Sumatra",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 4,
  "p": [
    4,
    2,
    3,
    1,
    3,
    4
  ],
  "ing": [
    "Eggplant",
    "Chilli",
    "Shallot",
    "Tomato",
    "Toasted shrimp paste",
    "Lemongrass",
    "Andaliman (optional)",
    "Salt"
  ],
  "serve": [
    "Steamed rice",
    "Grilled fish",
    "Fried tofu"
  ],
  "note": "Softened eggplant is crushed into the seasoning in this Pakpak sambal. It makes a moist, substantial relish; local versions may add andaliman, small bitter berries or lokio.",
  "src": [
    "K"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Pakpak",
    "source": "K"
  }
},
{
  "id": "l19",
  "name": "Sambal Laut",
  "prov": "SU",
  "region": "North Sumatra",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 3,
  "p": [
    3,
    3,
    4,
    1,
    4,
    0
  ],
  "ing": [
    "Chilli",
    "Shallot",
    "Tomato",
    "Toasted shrimp paste",
    "Tamarind water",
    "Salt"
  ],
  "serve": [
    "Grilled fish",
    "Boiled clams",
    "Grilled prawns"
  ],
  "note": "A loose seafood dip found around northern Sumatra. Chopped aromatics sit in a thin tamarind dressing, bringing sourness and shrimp-paste depth without a heavy fried base.",
  "src": [
    "K"
  ],
  "persona": [
    "The Bright Spark",
    "Lively and refreshing, you keep things moving."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Northern Sumatra",
    "source": "K"
  }
},
{
  "id": "l20",
  "name": "Sambal Uwok",
  "prov": "SB",
  "region": "West Sumatra",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    2,
    1,
    1,
    2,
    3
  ],
  "ing": [
    "Red chilli",
    "Shallot",
    "Tomato",
    "Anchovies",
    "Oil",
    "Salt"
  ],
  "serve": [
    "Steamed rice",
    "Grilled fish",
    "Boiled cassava leaves"
  ],
  "note": "Steaming softens the chilli before it is pounded. Anchovies add a salty counterpoint, giving uwok the warmth of a cooked sambal without the density of a long-fried paste.",
  "src": [
    "P"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Steamed chilli with sautéed anchovies",
    "source": "P"
  }
},
{
  "id": "l21",
  "name": "Sambal Lado Belimbing",
  "prov": "SB",
  "region": "West Sumatra",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    2,
    4,
    1,
    2,
    3
  ],
  "ing": [
    "Sour starfruit",
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Oil",
    "Salt"
  ],
  "serve": [
    "Fried fish",
    "Steamed rice",
    "Fried tempeh"
  ],
  "note": "Starfruit supplies the fruity acidity in this Minangkabau chilli relish. Choose a tart fruit: its juice balances the oil and gives the cooked sambal a lighter finish.",
  "src": [
    "P"
  ],
  "persona": [
    "The Bright Spark",
    "Lively and refreshing, you keep things moving."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Carambola",
    "source": "P"
  }
},
{
  "id": "l22",
  "name": "Sambal Hijau Petai",
  "prov": "SB",
  "region": "West Sumatra",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    3,
    1,
    1,
    3,
    3
  ],
  "ing": [
    "Petai (bitter beans)",
    "Green chilli",
    "Green tomato",
    "Shallot",
    "Garlic",
    "Oil",
    "Salt"
  ],
  "serve": [
    "Nasi Padang",
    "Fried fish",
    "Steamed rice"
  ],
  "note": "Petai adds its unmistakable pungency and firm bite to a green-chilli base. The beans remain in pieces, so each mouthful alternates between the soft paste and crisp, aromatic petai.",
  "src": [
    "P"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Green chilli with petai (bitter bean)",
    "source": "P"
  }
},
{
  "id": "l23",
  "name": "Sambal Pilado Lauwok",
  "prov": "RI",
  "region": "Riau",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    2,
    1,
    1,
    2,
    4
  ],
  "ing": [
    "Salted anchovies",
    "Red chilli",
    "Shallot",
    "Oil",
    "Salt"
  ],
  "serve": [
    "Steamed rice",
    "Boiled greens",
    "Fried tofu"
  ],
  "note": "A Riau anchovy sambal with a straightforward chilli coating. The small fish supply salt and savouriness; frying the paste draws the allium sweetness into the chilli.",
  "src": [
    "P"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Salted anchovies",
    "source": "P"
  }
},
{
  "id": "l24",
  "name": "Sambal Kunyit",
  "prov": "RI",
  "region": "Riau",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    0,
    1,
    1,
    3,
    4
  ],
  "ing": [
    "Turmeric",
    "Coconut milk",
    "Chilli",
    "Shallot",
    "Garlic",
    "Salt"
  ],
  "serve": [
    "Grilled fish",
    "Steamed rice",
    "Boiled greens"
  ],
  "note": "Turmeric gives this Riau sambal its golden colour and earthy aroma. Coconut milk rounds out the chilli, creating a creamy condiment that suits simply cooked fish.",
  "src": [
    "P"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Turmeric, coconut milk",
    "source": "P"
  }
},
{
  "id": "l25",
  "name": "Sambal Nanas",
  "prov": "RI",
  "region": "Riau",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 3,
  "p": [
    3,
    2,
    4,
    2,
    4,
    1
  ],
  "ing": [
    "Pineapple",
    "Chilli",
    "Shallot",
    "Toasted shrimp paste",
    "Salt"
  ],
  "serve": [
    "Boiled clams",
    "Grilled fish",
    "Steamed rice"
  ],
  "note": "Pineapple makes this Riau-style relish juicy, sweet and sour. Keep the fruit slightly coarse so its fresh bite contrasts with the pounded chilli and savoury seasoning.",
  "src": [
    "P"
  ],
  "persona": [
    "The Bright Spark",
    "Lively and refreshing, you keep things moving."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Pineapple",
    "source": "P"
  }
},
{
  "id": "l26",
  "name": "Sambal Kokek",
  "prov": "RI",
  "region": "Rokan Hulu, Riau",
  "locationAccuracy": "province",
  "style": "fermented",
  "heat": 3,
  "p": [
    3,
    4,
    4,
    1,
    2,
    4
  ],
  "ing": [
    "Tempoyak (fermented durian)",
    "Petai",
    "Anchovies",
    "Chilli",
    "Shallot",
    "Garlic",
    "Tomato",
    "Lemongrass",
    "Turmeric leaf",
    "Oil"
  ],
  "serve": [
    "Steamed rice",
    "Grilled river fish",
    "Cucumber"
  ],
  "note": "Rokan Hulu's kokek combines fermented durian, anchovies and petai. Cooking binds their strong flavours into a rich sambal; sour tempoyak keeps the combination from feeling heavy.",
  "src": [
    "K"
  ],
  "persona": [
    "The Deep Thinker",
    "Layered and distinctive, you reward a closer look."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Rokan Hulu",
    "source": "K"
  }
},
{
  "id": "l27",
  "name": "Sambal Lengkong",
  "prov": "KR",
  "region": "Riau Islands",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 2,
  "p": [
    2,
    1,
    1,
    2,
    1,
    5
  ],
  "ing": [
    "Cooked marine fish",
    "Coconut milk",
    "Red chilli",
    "Shallot",
    "Garlic",
    "Salt"
  ],
  "serve": [
    "Steamed rice",
    "Lontong",
    "Cucumber"
  ],
  "note": "Fish is flaked finely and cooked with coconut milk and seasoning. This Riau Islands preparation is closer to a moist fish floss than a thin dipping sauce.",
  "src": [
    "P"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Marine fish, coconut milk",
    "source": "P"
  }
},
{
  "id": "l28",
  "name": "Sambal Bilis Kacang",
  "prov": "KR",
  "region": "Riau Islands",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    2,
    1,
    2,
    2,
    5
  ],
  "ing": [
    "Salted anchovies",
    "Peanuts",
    "Red chilli",
    "Shallot",
    "Garlic",
    "Sugar",
    "Oil"
  ],
  "serve": [
    "Steamed rice",
    "Nasi lemak",
    "Fried eggs"
  ],
  "note": "Crisp bilis and peanuts are tossed through cooked chilli seasoning. The fish gives salty depth and the nuts give crunch, making a spoonful an easy companion to rice.",
  "src": [
    "P"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Salted anchovy, peanuts",
    "source": "P"
  }
},
{
  "id": "l29",
  "name": "Sambal Salabance",
  "prov": "JA",
  "region": "Jambi",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    2,
    1,
    1,
    2,
    4
  ],
  "ing": [
    "Catfish",
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Tomato",
    "Oil",
    "Salt"
  ],
  "serve": [
    "Steamed rice",
    "Boiled cassava leaves",
    "Cucumber"
  ],
  "note": "Catfish is the defining ingredient of Jambi's salabance. Cooked fish is combined with a chilli and allium base, producing a substantial sambal with soft flakes throughout.",
  "src": [
    "P"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Catfish",
    "source": "P"
  }
},
{
  "id": "l30",
  "name": "Sambal Nio",
  "prov": "JA",
  "region": "Jambi",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    2,
    1,
    1,
    3,
    4
  ],
  "ing": [
    "Grated coconut",
    "Chilli",
    "Shallot",
    "Garlic",
    "Toasted shrimp paste",
    "Salt"
  ],
  "serve": [
    "Steamed rice",
    "Grilled fish",
    "Boiled vegetables"
  ],
  "note": "Nio brings grated coconut into Jambi's sambal repertoire. Coconut provides a crumbly texture and mellow richness, carrying the chilli seasoning without turning into a smooth sauce.",
  "src": [
    "P"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Grated coconut",
    "source": "P"
  }
},
{
  "id": "l31",
  "name": "Sambal Durian",
  "prov": "BE",
  "region": "Bengkulu",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    2,
    1,
    3,
    2,
    4
  ],
  "ing": [
    "Ripe durian",
    "Chilli",
    "Shallot",
    "Garlic",
    "Oil",
    "Salt"
  ],
  "serve": [
    "Steamed rice",
    "Fried fish",
    "Cucumber"
  ],
  "note": "Ripe durian gives this Bengkulu sambal a sweet, creamy body and distinctive aroma. This profile uses fresh fruit; versions made from fermented durian belong to the tempoyak family.",
  "src": [
    "P"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Durian",
    "source": "P"
  }
},
{
  "id": "l32",
  "name": "Sambal Lecet",
  "prov": "BE",
  "region": "Bengkulu",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    3,
    2,
    1,
    2,
    2
  ],
  "ing": [
    "Red chilli",
    "Bird’s-eye chilli",
    "Tomato",
    "Shallot",
    "Garlic",
    "Shrimp paste",
    "Sugar",
    "Salt"
  ],
  "serve": [
    "Grilled fish",
    "Steamed rice",
    "Boiled vegetables"
  ],
  "note": "In this Rejang version, the aromatics are roasted in a banana-leaf parcel before pounding. The result is soft and lightly smoky, with tomato juice rather than frying oil carrying the paste.",
  "src": [
    "P",
    "https://kuliner.ilmci.com/sambal-lecet/"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "",
    "source": "P"
  }
},
{
  "id": "l33",
  "name": "Sambal Pegheau",
  "prov": "BE",
  "region": "Bengkulu",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    2,
    1,
    1,
    3,
    4
  ],
  "ing": [
    "Bitter melon",
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Tomato",
    "Oil",
    "Salt"
  ],
  "serve": [
    "Steamed rice",
    "Fried fish",
    "Omelette"
  ],
  "note": "Bitter melon gives pegheau its defining contrast to chilli and sweet alliums. Cook it until tender but still textured; its pleasant bitterness remains part of the sambal's identity.",
  "src": [
    "P"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Bitter melon",
    "source": "P"
  }
},
{
  "id": "l34",
  "name": "Sambal Lokan",
  "prov": "BE",
  "region": "Bengkulu",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    1,
    1,
    1,
    3,
    4
  ],
  "ing": [
    "Lokan clams",
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Oil",
    "Salt"
  ],
  "serve": [
    "Steamed rice",
    "Boiled greens",
    "Cucumber"
  ],
  "note": "Lokan clams make this Bengkulu sambal briny and substantial. Their juices enrich the cooked chilli base, so the finished dish sits comfortably between condiment and seafood side.",
  "src": [
    "P"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Shellfish",
    "source": "P"
  }
},
{
  "id": "l35",
  "name": "Sambal Picak",
  "prov": "BE",
  "region": "South Bengkulu",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 4,
  "p": [
    4,
    3,
    2,
    1,
    3,
    2
  ],
  "ing": [
    "Bird’s-eye chilli",
    "Small tomatoes",
    "Shallot",
    "Garlic",
    "Toasted shrimp paste",
    "Salt"
  ],
  "serve": [
    "Fried fish",
    "Grilled chicken",
    "Steamed rice"
  ],
  "note": "Recorded as Picak in the survey, this South Bengkulu sambal combines raw chilli with roasted tomato, alliums and shrimp paste. Pounding brings the smoky and fresh elements together.",
  "src": [
    "P",
    "https://cookpad.com/id/resep/10122706"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "",
    "source": "P"
  },
  "aliases": [
    "Sambal Pikak"
  ]
},
{
  "id": "l36",
  "name": "Sambal Piriak",
  "prov": "BE",
  "region": "Bengkulu",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 4,
  "p": [
    4,
    2,
    2,
    1,
    2,
    4
  ],
  "ing": [
    "Smoked or grilled fish",
    "Bird’s-eye chilli",
    "Garlic",
    "Small tomatoes",
    "Salt"
  ],
  "serve": [
    "Steamed rice",
    "Clear vegetable soup",
    "Cucumber"
  ],
  "note": "Piriak is a pounded fish sambal associated with southern Bengkulu. Smoke or char supplies depth; the chilli and tomato keep the mashed fish moist and assertive.",
  "src": [
    "P"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Smoked fish",
    "source": "P"
  }
},
{
  "id": "l37",
  "name": "Sambal Jokjok",
  "prov": "SS",
  "region": "South Sumatra",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 3,
  "p": [
    3,
    3,
    4,
    1,
    3,
    1
  ],
  "ing": [
    "Tamarind",
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Toasted shrimp paste",
    "Salt"
  ],
  "serve": [
    "Grilled river fish",
    "Steamed rice",
    "Fresh vegetables"
  ],
  "note": "Tamarind gives jokjok a clean sourness beneath its chilli and shrimp-paste seasoning. A little water loosens the paste, making it useful as a dip for grilled fish.",
  "src": [
    "P"
  ],
  "persona": [
    "The Bright Spark",
    "Lively and refreshing, you keep things moving."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Tamarind",
    "source": "P"
  }
},
{
  "id": "l38",
  "name": "Sambal Kweni",
  "prov": "SS",
  "region": "South Sumatra",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 3,
  "p": [
    3,
    2,
    4,
    2,
    4,
    1
  ],
  "ing": [
    "Kweni mango",
    "Bird’s-eye chilli",
    "Toasted shrimp paste",
    "Salt"
  ],
  "serve": [
    "Grilled fish",
    "Steamed rice",
    "Fresh cucumber"
  ],
  "note": "Fragrant kweni mango is the centre of this South Sumatran sambal. Its ripeness determines the balance: greener fruit is sharper, while riper flesh brings sweetness and a softer texture.",
  "src": [
    "P"
  ],
  "persona": [
    "The Bright Spark",
    "Lively and refreshing, you keep things moving."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Kweni mango",
    "source": "P"
  }
},
{
  "id": "l39",
  "name": "Sambal Mangga",
  "prov": "SS",
  "region": "South Sumatra",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 3,
  "p": [
    3,
    3,
    4,
    2,
    4,
    1
  ],
  "ing": [
    "Unripe mango",
    "Chilli",
    "Toasted shrimp paste",
    "Palm sugar",
    "Salt"
  ],
  "serve": [
    "Fried fish",
    "Grilled chicken",
    "Steamed rice"
  ],
  "note": "Shredded young mango brings crunch and acidity. Palm sugar rounds the sour edge, while shrimp paste makes this fruit sambal a savoury companion to rice and fried dishes.",
  "src": [
    "P"
  ],
  "persona": [
    "The Bright Spark",
    "Lively and refreshing, you keep things moving."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Unripe mango, palm sugar",
    "source": "P"
  }
},
{
  "id": "l40",
  "name": "Sambal Buah",
  "prov": "SS",
  "region": "South Sumatra",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 3,
  "p": [
    3,
    3,
    4,
    2,
    4,
    1
  ],
  "ing": [
    "Kemang mango",
    "Pineapple",
    "Chilli",
    "Toasted shrimp paste",
    "Palm sugar",
    "Salt"
  ],
  "serve": [
    "Grilled river fish",
    "Fried fish",
    "Steamed rice"
  ],
  "note": "Palembang's fruit sambals follow the season. Kemang and pineapple contribute different aromas and textures, with pounded chilli and shrimp paste tying the juicy pieces into a savoury relish.",
  "src": [
    "W"
  ],
  "persona": [
    "The Bright Spark",
    "Lively and refreshing, you keep things moving."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Palembang; kemang mango, pineapple",
    "source": "W"
  }
},
{
  "id": "l41",
  "name": "Sambal Asam",
  "prov": "BB",
  "region": "Bangka Belitung",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 3,
  "p": [
    3,
    3,
    4,
    1,
    3,
    1
  ],
  "ing": [
    "Tamarind",
    "Chilli",
    "Shallot",
    "Toasted shrimp paste",
    "Salt",
    "Water"
  ],
  "serve": [
    "Grilled fish",
    "Boiled seafood",
    "Steamed rice"
  ],
  "note": "A tamarind-led sambal recorded in Bangka Belitung. The sour liquid loosens the chilli paste, giving it a lighter texture than a fried sambal and a sharp finish against seafood.",
  "src": [
    "P"
  ],
  "persona": [
    "The Bright Spark",
    "Lively and refreshing, you keep things moving."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Tamarind",
    "source": "P"
  }
},
{
  "id": "l42",
  "name": "Sambal Asam Kembang",
  "prov": "LA",
  "region": "Lampung",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 3,
  "p": [
    3,
    3,
    4,
    1,
    4,
    1
  ],
  "ing": [
    "Kemang (white mango)",
    "Chilli",
    "Shallot",
    "Toasted shrimp paste",
    "Tomato",
    "Salt"
  ],
  "serve": [
    "Grilled fish",
    "Steamed rice",
    "Fresh vegetables"
  ],
  "note": "The defining sourness comes from kemang, an aromatic mango relative. In this Lampung preparation, fruit pulp and chilli make a fresh relish with a pronounced perfume.",
  "src": [
    "P"
  ],
  "persona": [
    "The Bright Spark",
    "Lively and refreshing, you keep things moving."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "White mango (kemang)",
    "source": "P"
  }
},
{
  "id": "l43",
  "name": "Sambal Lampung",
  "prov": "LA",
  "region": "Lampung",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    0,
    2,
    3,
    1,
    3
  ],
  "ing": [
    "Red chilli",
    "Bird’s-eye chilli",
    "Garlic",
    "Tomato",
    "Sugar",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Fried snacks",
    "Grilled chicken",
    "Fried noodles"
  ],
  "note": "A smooth chilli-garlic sauce associated with Lampung, balanced by tomato and a little sweetness. Cooking softens the garlic and brings the ingredients together into a spoonable paste.",
  "src": [
    "W"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Chilli, garlic, tomato; slightly sweet",
    "source": "W"
  }
},
{
  "id": "l44",
  "name": "Sambal Rampai",
  "prov": "LA",
  "region": "Lampung",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 4,
  "p": [
    4,
    0,
    3,
    1,
    4,
    0
  ],
  "ing": [
    "Rampai tomatoes",
    "Bird’s-eye chilli",
    "Shallot",
    "Salt"
  ],
  "serve": [
    "Grilled fish",
    "Fried tempeh",
    "Steamed rice"
  ],
  "note": "Small rampai tomatoes provide juicy acidity and fresh tomato fragrance. Crush them only lightly with chilli so the sambal keeps its pulpy texture and lively bite.",
  "src": [
    "W"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Rampai tomato",
    "source": "W"
  }
},
{
  "id": "l45",
  "name": "Sambal Kemiri",
  "prov": "JK",
  "region": "Jakarta",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    0,
    1,
    0,
    2,
    4
  ],
  "ing": [
    "Toasted candlenuts",
    "Red chilli",
    "Bird’s-eye chilli",
    "Garlic",
    "Salt",
    "Water"
  ],
  "serve": [
    "Soto Betawi",
    "Fried tofu",
    "Steamed rice"
  ],
  "note": "Candlenuts thicken this Jakarta sambal and soften the chilli's sharp edge. Use cooked nuts: their oily texture makes a pale, creamy paste that works well alongside soups.",
  "src": [
    "P"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Candlenut",
    "source": "P"
  }
},
{
  "id": "l46",
  "name": "Sambal Jahe",
  "prov": "JK",
  "region": "Jakarta",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 4,
  "p": [
    4,
    0,
    2,
    0,
    2,
    3
  ],
  "ing": [
    "Ginger",
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Oil",
    "Salt"
  ],
  "serve": [
    "Fried fish",
    "Chicken soup",
    "Steamed rice"
  ],
  "note": "Ginger adds a warming aroma distinct from chilli heat. Pound it finely into the allium base, then cook briefly to make a fragrant condiment for fish or chicken.",
  "src": [
    "P"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Ginger",
    "source": "P"
  }
},
{
  "id": "l47",
  "name": "Sambal Dengkek",
  "prov": "JK",
  "region": "Jakarta",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 4,
  "p": [
    4,
    3,
    4,
    1,
    4,
    1
  ],
  "ing": [
    "Red chilli",
    "Bird’s-eye chilli",
    "Tomato",
    "Shallot",
    "Garlic",
    "Toasted shrimp paste",
    "Limau",
    "Salt"
  ],
  "serve": [
    "Betawi fried chicken",
    "Steamed rice",
    "Lalapan"
  ],
  "note": "Dengkek is a coarse fresh sambal finished with fragrant limau juice. Tomato gives moisture, while toasted shrimp paste supplies a savoury base for its sharp chilli and citrus.",
  "src": [
    "P",
    "https://www.idntimes.com/food/recipe/resep-ayam-goreng-sambal-dengkek-00-p3rq2-pjh9yp/amp"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "",
    "source": "P"
  }
},
{
  "id": "l48",
  "name": "Sambal Belimbing Wuluh",
  "prov": "JK",
  "region": "Jakarta",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 4,
  "p": [
    4,
    3,
    5,
    1,
    4,
    1
  ],
  "ing": [
    "Bilimbi",
    "Bird’s-eye chilli",
    "Red chilli",
    "Shallot",
    "Toasted shrimp paste",
    "Sugar",
    "Salt"
  ],
  "serve": [
    "Fried fish",
    "Fried tempeh",
    "Steamed rice"
  ],
  "note": "Bilimbi brings a sharper acidity than ordinary tomato. Pound the fruit into the chilli shortly before serving, keeping its juice and a little texture in the finished sambal.",
  "src": [
    "P"
  ],
  "persona": [
    "The Bright Spark",
    "Lively and refreshing, you keep things moving."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Bilimbi",
    "source": "P"
  }
},
{
  "id": "l49",
  "name": "Sambal Lokio",
  "prov": "JK",
  "region": "Jakarta",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 4,
  "p": [
    4,
    2,
    2,
    1,
    4,
    1
  ],
  "ing": [
    "Lokio bulbs and leaves",
    "Chilli",
    "Shallot",
    "Tomato",
    "Toasted shrimp paste",
    "Salt"
  ],
  "serve": [
    "Grilled fish",
    "Steamed rice",
    "Fried tofu"
  ],
  "note": "Small lokio bulbs add an allium bite and gentle crunch. Their freshness is the point: fold them into the pounded seasoning without reducing everything to a uniform paste.",
  "src": [
    "P"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Chives",
    "source": "P"
  }
},
{
  "id": "l50",
  "name": "Sambal Pecak",
  "prov": "JK",
  "region": "Jakarta (Betawi)",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 4,
  "p": [
    4,
    0,
    3,
    1,
    3,
    2
  ],
  "ing": [
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Ginger",
    "Kencur",
    "Lime",
    "Hot water",
    "Salt"
  ],
  "serve": [
    "Fried gourami",
    "Grilled tilapia",
    "Steamed rice"
  ],
  "note": "Betawi pecak is a loose, aromatic sauce poured over fish. Roasted aromatics and ginger give warmth; hot water loosens the pounded seasoning and citrus brightens the finish.",
  "src": [
    "W"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Betawi; soupy, with ginger",
    "source": "W"
  }
},
{
  "id": "l51",
  "name": "Sambal Buraq",
  "prov": "BT",
  "region": "Banten",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    2,
    1,
    1,
    3,
    4
  ],
  "ing": [
    "Melinjo skins",
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Shrimp paste",
    "Oil",
    "Salt"
  ],
  "serve": [
    "Steamed rice",
    "Fried fish",
    "Tempeh"
  ],
  "note": "Buraq uses the fleshy skins of melinjo fruit. Their soft chew and slight bitterness distinguish this Banten sambal from an ordinary chilli paste, turning it into a vegetable side.",
  "src": [
    "P"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Melinjo skin",
    "source": "P"
  }
},
{
  "id": "l52",
  "name": "Sambal Cobek",
  "prov": "JB",
  "region": "West Java",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 4,
  "p": [
    4,
    2,
    3,
    1,
    3,
    2
  ],
  "ing": [
    "Bird’s-eye chilli",
    "Shallot",
    "Ginger",
    "Kencur",
    "Toasted shrimp paste",
    "Palm sugar",
    "Lime",
    "Salt"
  ],
  "serve": [
    "Grilled tilapia",
    "Fried gourami",
    "Steamed rice"
  ],
  "note": "Ginger and kencur give Sundanese cobek sambal its layered aroma. A little liquid loosens the pounded seasoning so it can be spooned over fish and settle into its flesh.",
  "src": [
    "P"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Ginger, kencur",
    "source": "P"
  }
},
{
  "id": "l53",
  "name": "Sambal Gandaria",
  "prov": "JB",
  "region": "West Java",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 3,
  "p": [
    3,
    3,
    4,
    1,
    4,
    1
  ],
  "ing": [
    "Gandaria (plum mango)",
    "Chilli",
    "Shallot",
    "Toasted shrimp paste",
    "Salt"
  ],
  "serve": [
    "Fried fish",
    "Grilled chicken",
    "Steamed rice"
  ],
  "note": "Young gandaria adds tartness and a firm fruity bite to a shrimp-paste sambal. Bruise or chop the fruit into the paste rather than hiding its texture completely.",
  "src": [
    "P"
  ],
  "persona": [
    "The Bright Spark",
    "Lively and refreshing, you keep things moving."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Plum mango (gandaria)",
    "source": "P"
  }
},
{
  "id": "l54",
  "name": "Sambal Oncom",
  "prov": "JB",
  "region": "West Java",
  "locationAccuracy": "province",
  "style": "fermented",
  "heat": 3,
  "p": [
    3,
    3,
    2,
    1,
    3,
    4
  ],
  "ing": [
    "Oncom",
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Kencur",
    "Lemon basil",
    "Oil",
    "Salt"
  ],
  "serve": [
    "Nasi tutug oncom",
    "Fried tofu",
    "Lalapan"
  ],
  "note": "Crumbled oncom absorbs the chilli seasoning and gives this Sundanese sambal its earthy, fermented depth. Kencur and basil are useful aromatic counterpoints to the warm, savoury base.",
  "src": [
    "P"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Oncom (fermented soy by-product)",
    "source": "P"
  }
},
{
  "id": "l55",
  "name": "Sambal Jengkol",
  "prov": "JB",
  "region": "West Java",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    3,
    1,
    1,
    3,
    4
  ],
  "ing": [
    "Cooked jengkol",
    "Red chilli",
    "Shallot",
    "Garlic",
    "Tomato",
    "Oil",
    "Salt"
  ],
  "serve": [
    "Steamed rice",
    "Fried fish",
    "Cucumber"
  ],
  "note": "Jengkol is cooked until tender, then coated in chilli paste. Its dense bite and strong aroma make the sambal a substantial side dish, especially with plain rice.",
  "src": [
    "P"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Fried jengkol",
    "source": "P"
  }
},
{
  "id": "l56",
  "name": "Sambal Leunca",
  "prov": "JB",
  "region": "West Java",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 3,
  "p": [
    3,
    2,
    2,
    1,
    4,
    1
  ],
  "ing": [
    "Leunca berries",
    "Bird’s-eye chilli",
    "Shallot",
    "Toasted shrimp paste",
    "Tomato",
    "Salt"
  ],
  "serve": [
    "Fried tofu",
    "Grilled fish",
    "Steamed rice"
  ],
  "note": "Leunca berries pop against the soft chilli paste with a gently bitter, green flavour. Crush some berries and leave others whole for a sambal with contrasting textures.",
  "src": [
    "P"
  ],
  "persona": [
    "The Fresh Perspective",
    "Aromatic and open, you bring a different point of view."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Leunca berries",
    "source": "P"
  }
},
{
  "id": "l57",
  "name": "Sambal Stroberi",
  "prov": "JB",
  "region": "Bandung, West Java",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 3,
  "p": [
    3,
    2,
    4,
    2,
    4,
    1
  ],
  "ing": [
    "Strawberries",
    "Bird’s-eye chilli",
    "Shallot",
    "Toasted shrimp paste",
    "Sugar",
    "Salt"
  ],
  "serve": [
    "Fried chicken",
    "Grilled fish",
    "Fresh vegetables"
  ],
  "note": "A Bandung fruit variation in which strawberries supply tartness, colour and fragrance. Keep the fruit coarse and balance its sweetness with chilli and a savoury shrimp-paste base.",
  "src": [
    "W"
  ],
  "persona": [
    "The Bright Spark",
    "Lively and refreshing, you keep things moving."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Bandung; strawberries",
    "source": "W"
  }
},
{
  "id": "l58",
  "name": "Sambal Krosak",
  "prov": "JT",
  "region": "Central Java",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 5,
  "p": [
    5,
    0,
    0,
    0,
    4,
    1
  ],
  "ing": [
    "Bird’s-eye chilli",
    "Garlic",
    "Salt"
  ],
  "serve": [
    "Fried tempeh",
    "Fried duck",
    "Steamed rice"
  ],
  "note": "Krosak is a simple Central Javanese chilli-and-garlic sambal. Pound it coarsely for a direct raw bite; some household versions finish it with a little hot oil.",
  "src": [
    "P",
    "https://cookpad.com/id/resep/12142061"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "",
    "source": "P"
  }
},
{
  "id": "l59",
  "name": "Sambal Jenggot",
  "prov": "JT",
  "region": "Central Java",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    2,
    1,
    1,
    3,
    4
  ],
  "ing": [
    "Grated coconut",
    "Bird’s-eye chilli",
    "Garlic",
    "Kencur",
    "Toasted shrimp paste",
    "Salt"
  ],
  "serve": [
    "Steamed rice",
    "Boiled vegetables",
    "Fried tempeh"
  ],
  "note": "Grated coconut gives jenggot its loose, fibrous appearance. The chilli seasoning is worked through the coconut, creating a crumbly accompaniment rather than a glossy dipping sauce.",
  "src": [
    "P"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Grated coconut",
    "source": "P"
  }
},
{
  "id": "l60",
  "name": "Sambal Kacang",
  "prov": "JT",
  "region": "Central Java",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 2,
  "p": [
    2,
    0,
    2,
    3,
    2,
    4
  ],
  "ing": [
    "Fried peanuts",
    "Chilli",
    "Garlic",
    "Palm sugar",
    "Tamarind",
    "Salt",
    "Water"
  ],
  "serve": [
    "Fried tofu",
    "Vegetable fritters",
    "Steamed vegetables"
  ],
  "note": "Peanuts supply the body in this Central Javanese sauce. Grind them with chilli and garlic, then loosen to the desired consistency; sugar and tamarind balance the roasted nuts.",
  "src": [
    "P"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Peanuts",
    "source": "P"
  }
},
{
  "id": "l61",
  "name": "Sambal Kecap",
  "prov": "JT",
  "region": "Central Java",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 3,
  "p": [
    3,
    0,
    2,
    5,
    4,
    1
  ],
  "ing": [
    "Kecap manis",
    "Bird’s-eye chilli",
    "Shallot",
    "Tomato",
    "Lime"
  ],
  "serve": [
    "Grilled fish",
    "Goat satay",
    "Fried tofu"
  ],
  "note": "Sliced chilli and shallot sit in sweet soy sauce, with tomato and lime keeping the mixture lively. This is a quick mixing-bowl sambal with no pounding required.",
  "src": [
    "P"
  ],
  "persona": [
    "The Warm Welcome",
    "Generous and rounded, you help people feel at home."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Sweet soy sauce",
    "source": "P"
  }
},
{
  "id": "l62",
  "name": "Sambal Pencit",
  "prov": "JT",
  "region": "Central Java",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 4,
  "p": [
    4,
    3,
    4,
    1,
    4,
    1
  ],
  "ing": [
    "Unripe mango",
    "Bird’s-eye chilli",
    "Red chilli",
    "Toasted shrimp paste",
    "Palm sugar",
    "Salt"
  ],
  "serve": [
    "Fried duck",
    "Fried fish",
    "Steamed rice"
  ],
  "note": "Pencit means young mango in Javanese. Fine shreds of the tart fruit run through chilli and shrimp paste, cutting the richness of fried duck or fish.",
  "src": [
    "P"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Unripe mango",
    "source": "P"
  }
},
{
  "id": "l63",
  "name": "Sambal Tempe",
  "prov": "JT",
  "region": "Central Java",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    2,
    1,
    1,
    3,
    4
  ],
  "ing": [
    "Fried tempeh",
    "Bird’s-eye chilli",
    "Garlic",
    "Kencur",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Steamed rice",
    "Clear vegetable soup",
    "Fresh cucumber"
  ],
  "note": "Warm fried tempeh is crushed directly into chilli and garlic. The coarse soy texture absorbs the seasoning, while kencur lends a fresh aroma to this everyday rice companion.",
  "src": [
    "P"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Tempeh",
    "source": "P"
  }
},
{
  "id": "l64",
  "name": "Sambal Tempe Gembus",
  "prov": "JT",
  "region": "Central Java",
  "locationAccuracy": "province",
  "style": "fermented",
  "heat": 3,
  "p": [
    3,
    2,
    1,
    1,
    3,
    4
  ],
  "ing": [
    "Tempe gembus",
    "Chilli",
    "Shallot",
    "Garlic",
    "Kencur",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Steamed rice",
    "Boiled greens",
    "Fried eggs"
  ],
  "note": "Gembus is made from fermented tofu pulp and has a softer, spongier texture than soybean tempeh. Cooking it with chilli creates a mild, earthy sambal that readily absorbs seasoning.",
  "src": [
    "P"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Tempe gembus",
    "source": "P"
  }
},
{
  "id": "l65",
  "name": "Sambal Goreng Hati",
  "prov": "JT",
  "region": "Central Java",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    1,
    1,
    2,
    1,
    5
  ],
  "ing": [
    "Chicken liver",
    "Chicken gizzard",
    "Potato",
    "Red chilli",
    "Shallot",
    "Garlic",
    "Galangal",
    "Salam leaf",
    "Oil",
    "Salt"
  ],
  "serve": [
    "Ketupat",
    "Opor ayam",
    "Steamed rice"
  ],
  "note": "Liver, gizzard and potato are coated in cooked red-chilli seasoning. A familiar festive side, it brings firm potato pieces and rich offal together rather than forming a smooth dip.",
  "src": [
    "P"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Chicken liver, gizzard, potato",
    "source": "P"
  }
},
{
  "id": "l66",
  "name": "Sambal Megono",
  "prov": "JT",
  "region": "Central Java",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 2,
  "p": [
    2,
    1,
    1,
    1,
    3,
    4
  ],
  "ing": [
    "Young jackfruit",
    "Grated coconut",
    "Chilli",
    "Shallot",
    "Garlic",
    "Kencur",
    "Salam leaf",
    "Salt"
  ],
  "serve": [
    "Nasi megono",
    "Fried tempeh",
    "Salted fish"
  ],
  "note": "Finely chopped young jackfruit and seasoned coconut make a crumbly mixture. This Central Javanese preparation is closer to a rice topping than a liquid sambal, with gentle chilli throughout.",
  "src": [
    "P"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Unripe jackfruit",
    "source": "P"
  }
},
{
  "id": "l67",
  "name": "Sambal Tape",
  "prov": "JT",
  "region": "Tegal, Central Java",
  "locationAccuracy": "province",
  "style": "fermented",
  "heat": 3,
  "p": [
    3,
    3,
    2,
    3,
    3,
    4
  ],
  "ing": [
    "Tape singkong (fermented cassava)",
    "Chilli",
    "Shallot",
    "Garlic",
    "Shrimp paste",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Fried fish",
    "Steamed rice",
    "Fried tofu"
  ],
  "note": "Fermented cassava gives this Tegal sambal a soft body and sweet-sour aroma. Chilli and savoury seasoning balance the tape, whose ripeness changes the flavour noticeably.",
  "src": [
    "W"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Tegal; fermented cassava",
    "source": "W"
  }
},
{
  "id": "l68",
  "name": "Sambal Korek",
  "prov": "JT",
  "region": "Solo, Central Java",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 5,
  "p": [
    5,
    0,
    0,
    0,
    2,
    2
  ],
  "ing": [
    "Bird’s-eye chilli",
    "Garlic",
    "Shallot",
    "Salt",
    "Hot oil"
  ],
  "serve": [
    "Fried duck",
    "Fried chicken",
    "Steamed rice"
  ],
  "note": "A very hot, compact sambal associated with Solo. The coarsely pounded chilli mixture is finished with hot oil, making it ideal for scooping directly from the cobek.",
  "src": [
    "IT"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Solo; chilli, shallot, garlic, hot oil",
    "source": "IT"
  }
},
{
  "id": "l69",
  "name": "Sambal Krecek",
  "prov": "YO",
  "region": "Yogyakarta",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    1,
    1,
    3,
    1,
    5
  ],
  "ing": [
    "Krecek (beef-skin crackers)",
    "Bird’s-eye chilli",
    "Red chilli",
    "Shallot",
    "Garlic",
    "Coconut milk",
    "Galangal",
    "Salam leaf",
    "Palm sugar",
    "Salt"
  ],
  "serve": [
    "Gudeg",
    "Steamed rice",
    "Opor ayam"
  ],
  "note": "Fried beef-skin crackers soften and swell in a spicy coconut gravy. Their springy texture and the whole chillies provide a savoury contrast to sweet Yogyakarta gudeg.",
  "src": [
    "P"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Fried beef skin",
    "source": "P"
  }
},
{
  "id": "l70",
  "name": "Sambal Bacem",
  "prov": "YO",
  "region": "Yogyakarta",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    3,
    2,
    4,
    1,
    3
  ],
  "ing": [
    "Red chilli",
    "Bird’s-eye chilli",
    "Tomato",
    "Shallot",
    "Garlic",
    "Shrimp paste",
    "Palm sugar",
    "Makrut lime leaf",
    "Salam leaf",
    "Oil",
    "Salt"
  ],
  "serve": [
    "Tahu bacem",
    "Tempe bacem",
    "Fried chicken"
  ],
  "note": "A slowly cooked, sweet-hot sambal scented with lime and salam leaves. The red paste thickens as moisture cooks away, making a rounded companion to bacem-style tofu and tempeh.",
  "src": [
    "P",
    "https://cookpad.com/id/resep/16218566"
  ],
  "persona": [
    "The Warm Welcome",
    "Generous and rounded, you help people feel at home."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Makrut lime leaves",
    "source": "P"
  }
},
{
  "id": "l71",
  "name": "Sambal Tolo",
  "prov": "YO",
  "region": "Yogyakarta",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 2,
  "p": [
    2,
    1,
    1,
    2,
    2,
    4
  ],
  "ing": [
    "Cowpeas (kacang tolo)",
    "Red chilli",
    "Shallot",
    "Garlic",
    "Coconut milk",
    "Galangal",
    "Salam leaf",
    "Palm sugar",
    "Salt"
  ],
  "serve": [
    "Steamed rice",
    "Gudeg",
    "Fried tofu"
  ],
  "note": "Tender cowpeas hold their shape in a gently spicy coconut sauce. This Yogyakarta sambal is a bean side dish, with sweet alliums and chilli seasoning the creamy broth.",
  "src": [
    "P"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Beans",
    "source": "P"
  }
},
{
  "id": "l72",
  "name": "Sambal Kalasan",
  "prov": "YO",
  "region": "Yogyakarta",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    3,
    2,
    4,
    1,
    3
  ],
  "ing": [
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Shrimp paste",
    "Tamarind",
    "Lemongrass",
    "Palm sugar",
    "Oil",
    "Salt"
  ],
  "serve": [
    "Ayam goreng Kalasan",
    "Lalapan",
    "Steamed rice"
  ],
  "note": "Sweet palm sugar and tamarind balance a cooked chilli base. Lemongrass supplies fragrance, making this rounded sambal a familiar partner for Kalasan-style fried chicken.",
  "src": [
    "P"
  ],
  "persona": [
    "The Warm Welcome",
    "Generous and rounded, you help people feel at home."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Tamarind, lemongrass, palm sugar",
    "source": "P"
  }
},
{
  "id": "l73",
  "name": "Sambal Kemangi",
  "prov": "YO",
  "region": "Yogyakarta",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 3,
  "p": [
    3,
    2,
    3,
    1,
    5,
    1
  ],
  "ing": [
    "Lemon basil",
    "Bird’s-eye chilli",
    "Shallot",
    "Tomato",
    "Toasted shrimp paste",
    "Lime",
    "Salt"
  ],
  "serve": [
    "Fried fish",
    "Fried chicken",
    "Steamed rice"
  ],
  "note": "Lemon basil lifts a chilli-and-tomato base with a fresh herbal aroma. Fold in the leaves near serving time so their fragrance remains distinct from the pounded seasoning.",
  "src": [
    "P"
  ],
  "persona": [
    "The Fresh Perspective",
    "Aromatic and open, you bring a different point of view."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Lemon basil",
    "source": "P"
  }
},
{
  "id": "l74",
  "name": "Sambal Belut",
  "prov": "JI",
  "region": "East Java",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 4,
  "p": [
    4,
    0,
    1,
    1,
    2,
    4
  ],
  "ing": [
    "Fried eel",
    "Bird’s-eye chilli",
    "Garlic",
    "Shallot",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Steamed rice",
    "Lalapan",
    "Sayur bening"
  ],
  "note": "Fried eel is pressed into the chilli mixture, giving the sambal crisp edges and savoury flakes. Keep some larger pieces for the contrast between fish and paste.",
  "src": [
    "P"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Eel",
    "source": "P"
  }
},
{
  "id": "l75",
  "name": "Sambal Kluwak",
  "prov": "JI",
  "region": "East Java",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    0,
    1,
    0,
    2,
    5
  ],
  "ing": [
    "Prepared kluwak kernels",
    "Chilli",
    "Garlic",
    "Shallot",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Rawon",
    "Grilled beef",
    "Steamed rice"
  ],
  "note": "Prepared kluwak kernels give this East Javanese sambal its dark colour and deep, earthy flavour. Use processed edible kluwak, as for rawon, and pound it into the cooked chilli base.",
  "src": [
    "P"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Kluwak (Pangium edule)",
    "source": "P"
  }
},
{
  "id": "l76",
  "name": "Sambal Setan",
  "prov": "JI",
  "region": "Surabaya, East Java",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 5,
  "p": [
    5,
    0,
    1,
    1,
    1,
    3
  ],
  "ing": [
    "Madame Jeanette or very hot bird’s-eye chilli",
    "Red chilli",
    "Shallot",
    "Garlic",
    "Tomato",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Fried chicken",
    "Fried tofu",
    "Steamed rice"
  ],
  "note": "Setan means devil, signalling an exceptionally hot sambal rather than one fixed recipe. The survey records a Madame Jeanette pepper version; this profile represents that intense chilli-led style.",
  "src": [
    "P"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Surabaya; Madame Jeanette pepper",
    "source": "P"
  }
},
{
  "id": "l77",
  "name": "Sambal Udang Bawang",
  "prov": "JI",
  "region": "Surabaya, East Java",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    1,
    3,
    2,
    1,
    4
  ],
  "ing": [
    "Shrimp",
    "Shallot",
    "Red chilli",
    "Bird’s-eye chilli",
    "Tamarind",
    "Sugar",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Steamed rice",
    "Fried tofu",
    "Boiled vegetables"
  ],
  "note": "Shrimp and a generous quantity of shallot make this Surabaya sambal both savoury and gently sweet. Tamarind cuts the richness of the cooked paste and seafood.",
  "src": [
    "W"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Surabaya; shrimp, shallot, tamarind",
    "source": "W"
  }
},
{
  "id": "l78",
  "name": "Sambal Wader",
  "prov": "JI",
  "region": "Mojokerto, East Java",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 4,
  "p": [
    4,
    1,
    1,
    1,
    2,
    4
  ],
  "ing": [
    "Wader (small river fish)",
    "Chilli",
    "Shallot",
    "Garlic",
    "Tomato",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Steamed rice",
    "Lalapan",
    "Sayur bening"
  ],
  "note": "Small wader fish are fried and combined with chilli seasoning. Associated here with Mojokerto, the sambal keeps the fish visible and brings a crisp, savoury contrast to rice.",
  "src": [
    "W"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Mojokerto; small river fish",
    "source": "W"
  }
},
{
  "id": "l79",
  "name": "Sambal Tuung",
  "prov": "BA",
  "region": "Bali",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    2,
    1,
    1,
    3,
    4
  ],
  "ing": [
    "Eggplant",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Toasted shrimp paste",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Steamed rice",
    "Grilled fish",
    "Boiled greens"
  ],
  "note": "Tuung is eggplant in Balinese. Its softened flesh absorbs the chilli seasoning and makes a moist sambal whose richness comes as much from the vegetable as from the oil.",
  "src": [
    "P"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Eggplant",
    "source": "P"
  }
},
{
  "id": "l80",
  "name": "Sambal Nyuh",
  "prov": "BA",
  "region": "Bali",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    2,
    1,
    1,
    4,
    4
  ],
  "ing": [
    "Roasted coconut",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Lemongrass",
    "Kencur",
    "Toasted shrimp paste",
    "Salt"
  ],
  "serve": [
    "Boiled water spinach",
    "Chayote",
    "Steamed rice"
  ],
  "note": "Roasted coconut gives nyuh a smoky, coarse texture. Pounded aromatics and lemongrass make it fragrant; in western Bali it accompanies vegetables as well as rice.",
  "src": [
    "P",
    "https://www.detik.com/bali/kuliner/d-6480238/6-sambal-khas-bali-lengkap-dengan-resepnya"
  ],
  "persona": [
    "The Fresh Perspective",
    "Aromatic and open, you bring a different point of view."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Grated coconut",
    "source": "P"
  }
},
{
  "id": "l81",
  "name": "Sambal Serai",
  "prov": "BA",
  "region": "Bali",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 4,
  "p": [
    4,
    0,
    1,
    1,
    5,
    2
  ],
  "ing": [
    "Tender lemongrass",
    "Bird’s-eye chilli",
    "Red chilli",
    "Shallot",
    "Garlic",
    "Hot oil",
    "Salt"
  ],
  "serve": [
    "Grilled fish",
    "Ayam betutu",
    "Steamed rice"
  ],
  "note": "Finely sliced tender lemongrass leads this Balinese sambal. Hot oil carries the aroma through the chilli and alliums while the slices retain a fresh, fibrous bite.",
  "src": [
    "P",
    "https://www.idntimes.com/food/recipe/reza-iqbal/5-resep-sambal-khas-indonesia-yang-belum-populer"
  ],
  "persona": [
    "The Fresh Perspective",
    "Aromatic and open, you bring a different point of view."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Lemongrass",
    "source": "P"
  }
},
{
  "id": "l82",
  "name": "Sambal Uyah Tabia",
  "prov": "BA",
  "region": "Bali",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 5,
  "p": [
    5,
    0,
    0,
    0,
    3,
    2
  ],
  "ing": [
    "Bird’s-eye chilli",
    "Salt",
    "Coconut oil"
  ],
  "serve": [
    "Steamed rice",
    "Grilled fish",
    "Boiled vegetables"
  ],
  "note": "A minimal Balinese mixture of chilli, salt and coconut oil. With little sweetness or acidity to soften it, the raw chilli remains direct and the oil adds a gentle coconut aroma.",
  "src": [
    "P"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Salt, coconut oil",
    "source": "P"
  }
},
{
  "id": "l83",
  "name": "Sambal Cengkeh",
  "prov": "NB",
  "region": "West Nusa Tenggara",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    2,
    1,
    1,
    2,
    3
  ],
  "ing": [
    "Cloves",
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Tomato",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Grilled chicken",
    "Grilled fish",
    "Steamed rice"
  ],
  "note": "The survey records a clove-scented sambal from West Nusa Tenggara. A small amount of clove brings a warm, sweet-spice perfume to the chilli base without making the sauce sugary.",
  "src": [
    "P"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Clove",
    "source": "P"
  }
},
{
  "id": "l84",
  "name": "Sambal Tota Fo'o",
  "prov": "NB",
  "region": "Bima, West Nusa Tenggara",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 3,
  "p": [
    3,
    0,
    4,
    1,
    4,
    3
  ],
  "ing": [
    "Unripe mango",
    "Coconut milk",
    "Bird’s-eye chilli",
    "Shallot",
    "Salt"
  ],
  "serve": [
    "Grilled fish",
    "Steamed rice",
    "Fried tempeh"
  ],
  "note": "Shredded sour mango meets coconut milk in this Bima-style relish. The coconut softens the chilli and sharp fruit, creating a creamy dressing around crisp mango strands.",
  "src": [
    "P"
  ],
  "persona": [
    "The Bright Spark",
    "Lively and refreshing, you keep things moving."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Coconut milk, unripe mango",
    "source": "P"
  }
},
{
  "id": "l85",
  "name": "Sambal Parado",
  "prov": "NB",
  "region": "Parado, Bima, West Nusa Tenggara",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 4,
  "p": [
    4,
    0,
    5,
    0,
    4,
    0
  ],
  "ing": [
    "Bird’s-eye chilli",
    "Makrut lime juice and thinly sliced peel",
    "Salt"
  ],
  "serve": [
    "Grilled fish",
    "Steamed rice",
    "Boiled vegetables"
  ],
  "note": "Parado places fragrant citrus beside an uncompromising chilli bite. Juice brings acidity and a little peel adds perfume and bitterness; it is a light partner for grilled fish.",
  "src": [
    "P"
  ],
  "persona": [
    "The Bright Spark",
    "Lively and refreshing, you keep things moving."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Makrut lime",
    "source": "P"
  }
},
{
  "id": "l86",
  "name": "Sambal Beberuk",
  "prov": "NB",
  "region": "Lombok, West Nusa Tenggara",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 3,
  "p": [
    3,
    3,
    3,
    1,
    5,
    1
  ],
  "ing": [
    "Raw round eggplant",
    "Long beans",
    "Tomato",
    "Chilli",
    "Shallot",
    "Garlic",
    "Toasted shrimp paste",
    "Limau",
    "Salt"
  ],
  "serve": [
    "Ayam taliwang",
    "Grilled fish",
    "Steamed rice"
  ],
  "note": "Beberuk is a crunchy Lombok vegetable relish dressed with sambal. Raw eggplant and long beans provide texture, while tomato and citrus make the dressing juicy and bright.",
  "src": [
    "P",
    "DN"
  ],
  "persona": [
    "The Fresh Perspective",
    "Aromatic and open, you bring a different point of view."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Raw eggplant, long beans",
    "source": "P"
  }
},
{
  "id": "l87",
  "name": "Sambal Ebi",
  "prov": "KB",
  "region": "West Kalimantan",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 4,
  "p": [
    4,
    3,
    2,
    1,
    2,
    4
  ],
  "ing": [
    "Dried shrimp (ebi)",
    "Red chilli",
    "Shallot",
    "Garlic",
    "Lime",
    "Oil",
    "Salt"
  ],
  "serve": [
    "Fried chicken",
    "Fried fish",
    "Steamed rice"
  ],
  "note": "Dried shrimp give ebi sambal a concentrated marine flavour and slightly grainy texture. Cook the pounded mixture until fragrant, then use citrus to lift the salty richness.",
  "src": [
    "P"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Dried shrimp",
    "source": "P"
  }
},
{
  "id": "l88",
  "name": "Sambal Suna",
  "prov": "KB",
  "region": "West Kalimantan",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 4,
  "p": [
    4,
    3,
    3,
    1,
    4,
    1
  ],
  "ing": [
    "Suna bulbs and leaves",
    "Bird’s-eye chilli",
    "Toasted shrimp paste",
    "Lime",
    "Sugar",
    "Salt"
  ],
  "serve": [
    "Grilled river fish",
    "Steamed rice",
    "Boiled vegetables"
  ],
  "note": "Suna is a local allium used in Dayak cooking across Kalimantan. Pounded bulbs and leaves give a fresh onion bite; this raw version adds chilli, shrimp paste and lime.",
  "src": [
    "P",
    "https://cookpad.com/id/resep/3208695-sambal-suna-sambal-bawang-khas-dayak-herlinwidodo"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Garlic chives",
    "source": "P"
  }
},
{
  "id": "l89",
  "name": "Sambal Kepah",
  "prov": "KB",
  "region": "West Kalimantan",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    2,
    1,
    1,
    3,
    4
  ],
  "ing": [
    "Kepah clams",
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Tomato",
    "Oil",
    "Salt"
  ],
  "serve": [
    "Steamed rice",
    "Boiled greens",
    "Cucumber"
  ],
  "note": "Kepah clams bring a briny sweetness to this West Kalimantan sambal. Cooked chilli coats the clam meat, while tomato keeps the seasoning moist enough to mingle with its juices.",
  "src": [
    "P"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Shellfish",
    "source": "P"
  }
},
{
  "id": "l90",
  "name": "Sambal Rimbang",
  "prov": "KT",
  "region": "Central Kalimantan",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 4,
  "p": [
    4,
    2,
    2,
    1,
    3,
    1
  ],
  "ing": [
    "Turkey berries (rimbang)",
    "Bird’s-eye chilli",
    "Shallot",
    "Toasted shrimp paste",
    "Salt"
  ],
  "serve": [
    "Grilled river fish",
    "Steamed rice",
    "Fried tofu"
  ],
  "note": "Small rimbang berries add a bitter, green bite to the chilli paste. Pound them lightly so some remain intact; their texture is as distinctive as their flavour.",
  "src": [
    "P"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Turkey berry",
    "source": "P"
  }
},
{
  "id": "l91",
  "name": "Sambal Lucung",
  "prov": "KT",
  "region": "Pangkalan Bun, Central Kalimantan",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 4,
  "p": [
    4,
    2,
    3,
    1,
    5,
    1
  ],
  "ing": [
    "Torch ginger flower (lucung)",
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Toasted shrimp paste",
    "Salt"
  ],
  "serve": [
    "Grilled fish",
    "Salted fish",
    "Steamed rice"
  ],
  "note": "Lucung is a local name for torch ginger. Finely sliced flower lifts the chilli and shrimp paste with a floral, citrus-like aroma, particularly welcome beside grilled or salted fish.",
  "src": [
    "P",
    "https://www.idntimes.com/food/dining-guide/naufal-al-rahman-1/sambal-khas-kalimantan-yang-pedasnya-menggigit"
  ],
  "persona": [
    "The Fresh Perspective",
    "Aromatic and open, you bring a different point of view."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Torch ginger",
    "source": "P"
  }
},
{
  "id": "l92",
  "name": "Sambal Kandas Serai",
  "prov": "KT",
  "region": "Central Kalimantan (Dayak)",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 4,
  "p": [
    4,
    2,
    2,
    1,
    4,
    4
  ],
  "ing": [
    "Tender lemongrass",
    "Grilled or fried fish",
    "Bird’s-eye chilli",
    "Roasted shallot",
    "Toasted shrimp paste",
    "Salt"
  ],
  "serve": [
    "Steamed rice",
    "Boiled vegetables",
    "Cucumber"
  ],
  "note": "A Dayak pounded relish with plenty of tender lemongrass and cooked fish. The fish gives substance while the fine lemongrass slices make each bite fragrant and textured.",
  "src": [
    "W",
    "https://www.idntimes.com/food/recipe/reza-iqbal/5-resep-sambal-khas-indonesia-yang-belum-populer"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Dayak; lemongrass, shredded fish",
    "source": "W"
  }
},
{
  "id": "l93",
  "name": "Sambal Cacapan",
  "prov": "KS",
  "region": "South Kalimantan (Banjar)",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 4,
  "p": [
    4,
    0,
    4,
    1,
    4,
    0
  ],
  "ing": [
    "Tamarind water",
    "Bird’s-eye chilli",
    "Shallot",
    "Salt"
  ],
  "serve": [
    "Grilled river fish",
    "Fried salted fish",
    "Steamed rice"
  ],
  "note": "Cacapan is a thin Banjar sour dip, with chilli and shallot floating in seasoned tamarind water. Seasonal sour fruit may join it, but the light, liquid texture is essential.",
  "src": [
    "P"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Tamarind",
    "source": "P"
  }
},
{
  "id": "l94",
  "name": "Sambal Habang",
  "prov": "KS",
  "region": "South Kalimantan (Banjar)",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 2,
  "p": [
    2,
    2,
    2,
    4,
    1,
    4
  ],
  "ing": [
    "Dried red chilli",
    "Shallot",
    "Garlic",
    "Ginger",
    "Cinnamon",
    "Shrimp paste",
    "Tamarind",
    "Palm sugar",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Nasi kuning Banjar",
    "Boiled eggs",
    "Fried snakehead fish"
  ],
  "note": "Habang means red in Banjar. Dried chillies make a deep-coloured sauce with gentle sweetness and warm spice; it also serves as the cooking sauce for eggs, chicken or fish.",
  "src": [
    "P",
    "DK"
  ],
  "persona": [
    "The Warm Welcome",
    "Generous and rounded, you help people feel at home."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Tamarind, ginger, cinnamon",
    "source": "P"
  }
},
{
  "id": "l95",
  "name": "Sambal Buah Banjar",
  "prov": "KS",
  "region": "South Kalimantan (Banjar)",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 4,
  "p": [
    4,
    3,
    4,
    1,
    4,
    1
  ],
  "ing": [
    "Young mango or binjai",
    "Gandaria or bilimbi",
    "Bird’s-eye chilli",
    "Toasted acan",
    "Shallot",
    "Salt"
  ],
  "serve": [
    "Grilled river fish",
    "Steamed rice",
    "Lalapan"
  ],
  "note": "Banjar fruit sambals change with the season. Choose one or a combination of sour fruits, then pound them with chilli and acan for a juicy relish that balances grilled fish.",
  "src": [
    "W"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Young mango, binjai, gandaria, bilimbi",
    "source": "W"
  }
},
{
  "id": "l96",
  "name": "Sambal Ramania",
  "prov": "KI",
  "region": "East Kalimantan",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 3,
  "p": [
    3,
    3,
    4,
    1,
    4,
    1
  ],
  "ing": [
    "Ramania (plum mango)",
    "Bird’s-eye chilli",
    "Toasted shrimp paste",
    "Salt"
  ],
  "serve": [
    "Grilled fish",
    "Fried fish",
    "Steamed rice"
  ],
  "note": "Ramania is a plum mango whose young fruit is sharply sour. Crushed into chilli and shrimp paste, it adds both juicy pulp and a distinctive fruit fragrance.",
  "src": [
    "P"
  ],
  "persona": [
    "The Bright Spark",
    "Lively and refreshing, you keep things moving."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Plum mango (ramania)",
    "source": "P"
  }
},
{
  "id": "l97",
  "name": "Sambal Asam Binjai",
  "prov": "KI",
  "region": "East Kalimantan",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 3,
  "p": [
    3,
    3,
    4,
    2,
    4,
    1
  ],
  "ing": [
    "Binjai mango",
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Toasted shrimp paste",
    "Salt"
  ],
  "serve": [
    "Grilled river fish",
    "Fried fish",
    "Steamed rice"
  ],
  "note": "Binjai has a strong mango-relative aroma and juicy, fibrous flesh. Its sweet-sour pulp gives this sambal a different character from the cleaner acidity of ordinary young mango.",
  "src": [
    "P"
  ],
  "persona": [
    "The Bright Spark",
    "Lively and refreshing, you keep things moving."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Binjai mango",
    "source": "P"
  }
},
{
  "id": "l98",
  "name": "Sambal Tudai",
  "prov": "KU",
  "region": "North Kalimantan",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    2,
    1,
    1,
    2,
    4
  ],
  "ing": [
    "Blood clams (tudai)",
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Tomato",
    "Oil",
    "Salt"
  ],
  "serve": [
    "Steamed rice",
    "Boiled greens",
    "Cucumber"
  ],
  "note": "Tudai are blood clams, valued for their full marine flavour. The cooked chilli mixture coats the clam meat, creating a substantial North Kalimantan seafood sambal.",
  "src": [
    "P"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Blood clam",
    "source": "P"
  }
},
{
  "id": "l99",
  "name": "Sambal Rica-rica",
  "prov": "SA",
  "region": "North Sulawesi",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 4,
  "p": [
    4,
    0,
    2,
    1,
    4,
    3
  ],
  "ing": [
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Ginger",
    "Lemongrass",
    "Makrut lime leaf",
    "Lime",
    "Oil",
    "Salt"
  ],
  "serve": [
    "Grilled chicken",
    "Grilled fish",
    "Steamed rice"
  ],
  "note": "Rica-rica names a hot chilli seasoning as well as dishes cooked with it. Ginger and lemongrass make this North Sulawesi version aromatic, with citrus lifting the cooked paste.",
  "src": [
    "P"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Chilli, ginger, lemongrass",
    "source": "P"
  }
},
{
  "id": "l100",
  "name": "Sambal Tongkol",
  "prov": "SA",
  "region": "North Sulawesi",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 4,
  "p": [
    4,
    1,
    1,
    1,
    2,
    4
  ],
  "ing": [
    "Mackerel tuna (tongkol)",
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Tomato",
    "Oil",
    "Salt"
  ],
  "serve": [
    "Steamed rice",
    "Tinutuan",
    "Boiled vegetables"
  ],
  "note": "Flaked tongkol is worked through a cooked chilli-and-tomato base. It makes a robust fish sambal with a firmer texture than versions made from tiny dried fish.",
  "src": [
    "P"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Mackerel tuna",
    "source": "P"
  }
},
{
  "id": "l101",
  "name": "Sambal Duo Sale",
  "prov": "ST",
  "region": "Palu, Central Sulawesi",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    2,
    1,
    2,
    2,
    4
  ],
  "ing": [
    "Dried duo fish (small fish)",
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Tomato",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Nasi jagung",
    "Steamed rice",
    "Boiled greens"
  ],
  "note": "Palu’s duo sale combines small dried fish with cooked chilli and tomato. The fish are fried before coating in the paste, giving a savoury texture that pairs especially well with nasi jagung.",
  "src": [
    "P",
    "https://budaya-indonesia.org/Sambal-Duo-Sale"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Unripe mango, coconut milk",
    "source": "P"
  }
},
{
  "id": "l102",
  "name": "Sambal Lawar Kacci",
  "prov": "SR",
  "region": "West Sulawesi",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 3,
  "p": [
    3,
    3,
    4,
    1,
    4,
    3
  ],
  "ing": [
    "Unripe mango",
    "Coconut milk",
    "Chilli",
    "Shallot",
    "Toasted shrimp paste",
    "Salt"
  ],
  "serve": [
    "Grilled fish",
    "Steamed rice",
    "Fried tofu"
  ],
  "note": "Lawar kacci combines fine young-mango shreds with a spicy coconut dressing. The fruit stays crisp and sour while coconut milk rounds the chilli into a creamy, salad-like accompaniment.",
  "src": [
    "P"
  ],
  "persona": [
    "The Bright Spark",
    "Lively and refreshing, you keep things moving."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Unripe mango, coconut milk",
    "source": "P"
  }
},
{
  "id": "l103",
  "name": "Sambal Kaluku",
  "prov": "SN",
  "region": "South Sulawesi",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    1,
    1,
    1,
    4,
    5
  ],
  "ing": [
    "Grated coconut",
    "Cooked snakehead fish",
    "Chilli",
    "Shallot",
    "Garlic",
    "Salt"
  ],
  "serve": [
    "Steamed rice",
    "Buras",
    "Boiled greens"
  ],
  "note": "Kaluku brings coconut and snakehead fish together in a pounded mixture. The coconut gives a loose, fibrous body while fish supplies savouriness, making a little sambal satisfyingly substantial.",
  "src": [
    "P"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Grated coconut, snakehead fish",
    "source": "P"
  }
},
{
  "id": "l104",
  "name": "Sambal Pepaya",
  "prov": "MA",
  "region": "Maluku",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 2,
  "p": [
    2,
    1,
    1,
    2,
    3,
    4
  ],
  "ing": [
    "Young papaya",
    "Chilli",
    "Shallot",
    "Garlic",
    "Kenari nuts",
    "Shrimp paste",
    "Galangal",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Papeda",
    "Grilled fish",
    "Steamed rice"
  ],
  "note": "Young papaya gives this Maluku sambal a vegetable-like texture. Cooked aromatics and nuts add richness, while the papaya stays a mild carrier for the seasoning rather than tasting like ripe fruit.",
  "src": [
    "P"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Papaya",
    "source": "P"
  }
},
{
  "id": "l105",
  "name": "Sambal Cabe Rawit Aceh",
  "prov": "AC",
  "region": "Aceh",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 5,
  "p": [
    5,
    1,
    4,
    3,
    1,
    2
  ],
  "ing": [
    "Green bird’s-eye chilli",
    "Garlic",
    "Light soy sauce",
    "Sugar",
    "White vinegar",
    "Water"
  ],
  "serve": [
    "Fried snacks",
    "Grilled seafood",
    "Fried rice"
  ],
  "note": "This documented Acehnese sauce blends green bird’s-eye chilli and garlic, then simmers them with soy sauce, sugar and vinegar. It is hot, tangy and more fluid than a cobek paste.",
  "src": [
    "https://budaya-indonesia.org/sambal-cabe-rawit-aceh",
    "https://dailycookingquest.com/sambal-cabe-rawit-aceh-acehnese-bird-eye-chili-sauce.html"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "",
    "source": "https://budaya-indonesia.org/sambal-cabe-rawit-aceh"
  }
},
{
  "id": "l106",
  "name": "Sambal Sabu",
  "prov": "AC",
  "region": "Aceh",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 4,
  "p": [
    4,
    3,
    4,
    0,
    3,
    2
  ],
  "ing": [
    "Toasted rebon shrimp",
    "Bird’s-eye chilli",
    "Bilimbi or asam sunti",
    "Shallot",
    "Salt",
    "Sugar"
  ],
  "serve": [
    "Steamed rice",
    "Boiled vegetables",
    "Grilled fish"
  ],
  "note": "Toasted tiny shrimp are pounded into chilli, shallot and sour bilimbi. Sabu has a fine, salty shrimp texture; leave the mixture coarse enough for the fruit to remain noticeable.",
  "src": [
    "https://budaya-indonesia.org/Sambal-Sabu-Udang-Rebon"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Rebon shrimp",
    "source": "https://budaya-indonesia.org/Sambal-Sabu-Udang-Rebon"
  }
},
{
  "id": "l107",
  "name": "Sambal Udang Tokok",
  "prov": "AC",
  "region": "Labuhan Haji, South Aceh",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 4,
  "p": [
    4,
    2,
    4,
    0,
    1,
    4
  ],
  "ing": [
    "Shrimp",
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Asam sunti",
    "Bilimbi",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Steamed rice",
    "Sayur bening"
  ],
  "note": "A South Aceh preparation in which the shrimp is bruised before cooking. Asam sunti and fresh bilimbi supply layered sourness as the mixture reduces to a concentrated sambal.",
  "src": [
    "https://budaya-indonesia.org/Sambal-Udang-Tokok-Aceh-Selatan-NAD"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "South Aceh; shrimp",
    "source": "https://budaya-indonesia.org/Sambal-Udang-Tokok-Aceh-Selatan-NAD"
  }
},
{
  "id": "l108",
  "name": "Sambal Asam U",
  "prov": "AC",
  "region": "Aceh",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 3,
  "p": [
    3,
    0,
    3,
    1,
    4,
    3
  ],
  "ing": [
    "Grated coconut",
    "Bird’s-eye chilli",
    "Shallot",
    "Asam sunti",
    "Lemongrass",
    "Makrut lime leaf"
  ],
  "serve": [
    "Steamed rice",
    "Grilled fish",
    "Boiled vegetables"
  ],
  "note": "Asam u dresses grated coconut with pounded chilli and asam sunti. Fine slices of lemongrass and lime leaf bring fragrance to this loose, tangy Acehnese accompaniment.",
  "src": [
    "https://budaya-indonesia.org/Asam-U-Sambal-khas-Aceh"
  ],
  "persona": [
    "The Fresh Perspective",
    "Aromatic and open, you bring a different point of view."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "",
    "source": "https://budaya-indonesia.org/Asam-U-Sambal-khas-Aceh"
  }
},
{
  "id": "l109",
  "name": "Sambal Teri Medan",
  "prov": "SU",
  "region": "North Sumatra",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    2,
    1,
    2,
    2,
    4
  ],
  "ing": [
    "Medan anchovies",
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Sugar",
    "Oil"
  ],
  "serve": [
    "Steamed rice",
    "Nasi uduk",
    "Fried eggs"
  ],
  "note": "Small Medan anchovies give a crisp, salty bite to cooked red-chilli seasoning. Fold in the fried fish after reducing the paste to preserve some of their crunch.",
  "src": [
    "B"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Medan; anchovies",
    "source": "B"
  }
},
{
  "id": "l110",
  "name": "Sambal Janda Mengamuk",
  "prov": "SU",
  "region": "Deli, North Sumatra",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 5,
  "p": [
    5,
    0,
    3,
    1,
    4,
    3
  ],
  "ing": [
    "Bird’s-eye chilli",
    "Pepper",
    "Ginger",
    "Shallot",
    "Firm tomato",
    "Lemon basil",
    "Edible local kayu putih leaf",
    "Bilimbi",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Steamed rice",
    "Grilled fish",
    "Boiled vegetables"
  ],
  "note": "This Deli Malay sambal layers chilli with pepper, ginger and aromatic leaves. Briefly fried ingredients are pounded with bilimbi, giving the intense heat a tart, herbal finish.",
  "src": [
    "https://budaya-indonesia.org/Sambal-Janda-Mengamuk-Sumatera-Utara-Sumatera-Utara"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "",
    "source": "https://budaya-indonesia.org/Sambal-Janda-Mengamuk-Sumatera-Utara-Sumatera-Utara"
  }
},
{
  "id": "l111",
  "name": "Sambal Cangkuak",
  "prov": "SB",
  "region": "West Sumatra",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    2,
    2,
    1,
    3,
    2
  ],
  "ing": [
    "Rice-rinsing water",
    "Red chilli",
    "Shallot",
    "Tomato",
    "Anchovies",
    "Salt"
  ],
  "serve": [
    "Steamed rice",
    "Boiled cassava leaves",
    "Fried tempeh"
  ],
  "note": "Cangkuak is a light, soupy Minangkabau preparation rather than a fried paste. Rice-rinsing water, chilli and tomato simmer together, with anchovies supplying a salty backbone.",
  "src": [
    "https://www.liputan6.com/regional/read/5356711/5-sajian-sambal-khas-sumatra-yang-menggoyang-lidah-ada-sambal-ganja"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Rice-washing water, shallot, tomato, anchovies",
    "source": "https://www.liputan6.com/regional/read/5356711/5-sajian-sambal-khas-sumatra-yang-menggoyang-lidah-ada-sambal-ganja"
  }
},
{
  "id": "l112",
  "name": "Samba Lado Tanak",
  "prov": "SB",
  "region": "West Sumatra",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    3,
    1,
    2,
    1,
    5
  ],
  "ing": [
    "Coconut milk",
    "Anchovies",
    "Jengkol",
    "Red chilli",
    "Shallot",
    "Garlic",
    "Lemongrass",
    "Turmeric leaf",
    "Salt"
  ],
  "serve": [
    "Steamed rice",
    "Boiled cassava leaves",
    "Cucumber"
  ],
  "note": "Lado tanak cooks chilli, anchovies and jengkol in coconut milk until concentrated. Its thick sauce and substantial pieces make it a rich rice accompaniment in its own right.",
  "src": [
    "https://www.goodnewsfromindonesia.id/2026/02/19/samba-lado-tanak-ketika-santan-teri-dan-jengkol-bersatu-dalam-satu-wajan-penuh-cerita"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Coconut milk, anchovies, jengkol",
    "source": "https://www.goodnewsfromindonesia.id/2026/02/19/samba-lado-tanak-ketika-santan-teri-dan-jengkol-bersatu-dalam-satu-wajan-penuh-cerita"
  }
},
{
  "id": "l113",
  "name": "Sambalado Tulang",
  "prov": "SB",
  "region": "Tanah Datar, West Sumatra",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    1,
    1,
    1,
    3,
    4
  ],
  "ing": [
    "Prepared dried beef or buffalo bone flakes (cangkuak tulang)",
    "Green chilli",
    "Shallot",
    "Salt",
    "Water"
  ],
  "serve": [
    "Steamed rice",
    "Boiled greens",
    "Cucumber"
  ],
  "note": "A Tanah Datar speciality using prepared dried bone-and-marrow flakes as seasoning. The small flakes are cooked with green chilli, giving a distinctive savoury depth to the moist sambal.",
  "src": [
    "https://www.liputan6.com/regional/read/3690920/sambalado-tulang-sambal-unik-minang-dari-tulang-sapi"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Tanah Datar; flakes of dried beef or buffalo bone, green chilli",
    "source": "https://www.liputan6.com/regional/read/3690920/sambalado-tulang-sambal-unik-minang-dari-tulang-sapi"
  }
},
{
  "id": "l114",
  "name": "Sambal Padeh",
  "prov": "SB",
  "region": "Padang, West Sumatra",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 4,
  "p": [
    4,
    0,
    2,
    1,
    3,
    4
  ],
  "ing": [
    "Beef",
    "Red chilli",
    "Garlic",
    "Candlenuts",
    "Ginger",
    "Galangal",
    "Lemongrass",
    "Turmeric leaf",
    "Makrut lime leaf",
    "Lime",
    "Salt"
  ],
  "serve": [
    "Steamed rice",
    "Boiled cassava leaves",
    "Cucumber"
  ],
  "note": "The archived Padang recipe is a meat preparation: beef cooks gently with pounded chilli, nuts and aromatics. Lime finishes the sauce, making it closer to a spicy lauk than a table dip.",
  "src": [
    "https://budaya-indonesia.org/Sambal-Padeh-Padang-Sumatera-Barat"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Padang",
    "source": "https://budaya-indonesia.org/Sambal-Padeh-Padang-Sumatera-Barat"
  }
},
{
  "id": "l115",
  "name": "Sambal Lado Uap",
  "prov": "SB",
  "region": "Bukittinggi, West Sumatra",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    1,
    2,
    1,
    3,
    2
  ],
  "ing": [
    "Red chilli",
    "Shallot",
    "Prepared cangkuk tulang",
    "Rice starch water",
    "Lime",
    "Salt"
  ],
  "serve": [
    "Steamed rice",
    "Boiled greens",
    "Fried tofu"
  ],
  "note": "This Bukittinggi version is steamed in a bowl alongside rice. Prepared dried bone-and-marrow seasoning adds savouriness, while rice starch water loosens the chilli and lime adds a fresh finish.",
  "src": [
    "https://budaya-indonesia.org/Sambal-Lado-Uap-Bukittinggi-Sumatera-Barat"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Bukittinggi",
    "source": "https://budaya-indonesia.org/Sambal-Lado-Uap-Bukittinggi-Sumatera-Barat"
  }
},
{
  "id": "l116",
  "name": "Sambal Goreng Udang",
  "prov": "SB",
  "region": "West Sumatra",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    1,
    1,
    1,
    2,
    4
  ],
  "ing": [
    "Shrimp",
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Tomato",
    "Oil",
    "Salt"
  ],
  "serve": [
    "Nasi Padang",
    "Steamed rice",
    "Boiled cassava leaves"
  ],
  "note": "Shrimp are coated in a cooked red-chilli paste in this balado-style preparation. A coarse grind keeps the chilli texture visible around the sweet, firm seafood.",
  "src": [
    "W"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Shrimp (udang balado)",
    "source": "W"
  }
},
{
  "id": "l117",
  "name": "Sambal Cencaluk",
  "prov": "RI",
  "region": "Riau",
  "locationAccuracy": "province",
  "style": "fermented",
  "heat": 3,
  "p": [
    3,
    4,
    3,
    1,
    2,
    3
  ],
  "ing": [
    "Cencalok (fermented small shrimp)",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Onion",
    "Lemongrass",
    "Salam leaf",
    "Oil"
  ],
  "serve": [
    "Steamed rice",
    "Grilled fish",
    "Cucumber"
  ],
  "note": "The Riau recipe sautés aromatics before adding fermented shrimp. Cencalok supplies its own salt and tang, making the cooked sambal intensely savoury even with a short ingredient list.",
  "src": [
    "https://budaya-indonesia.org/Sambal-Cencaluk-Khas-Riau"
  ],
  "persona": [
    "The Deep Thinker",
    "Layered and distinctive, you reward a closer look."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Fermented shrimp",
    "source": "https://budaya-indonesia.org/Sambal-Cencaluk-Khas-Riau"
  }
},
{
  "id": "l118",
  "name": "Sambal Terung Asam Riau",
  "prov": "RI",
  "region": "Riau",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 4,
  "p": [
    4,
    3,
    4,
    1,
    4,
    1
  ],
  "ing": [
    "Sour eggplant",
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Toasted shrimp paste",
    "Sugar",
    "Salt"
  ],
  "serve": [
    "Grilled fish",
    "Steamed rice",
    "Boiled vegetables"
  ],
  "note": "Sour eggplant is crushed into a chilli-and-terasi paste in this Riau version. Its juicy tartness changes the body of the sambal, giving it a fruit-like brightness.",
  "src": [
    "https://budaya-indonesia.org/Sambal-Terung-Asam-Riau"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Sour eggplant",
    "source": "https://budaya-indonesia.org/Sambal-Terung-Asam-Riau"
  }
},
{
  "id": "l119",
  "name": "Sambal Goreng Campur",
  "prov": "RI",
  "region": "Riau",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    1,
    1,
    3,
    2,
    4
  ],
  "ing": [
    "Potato",
    "Tofu",
    "Shrimp",
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Kecap manis",
    "Sugar",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Steamed rice",
    "Lontong",
    "Cucumber"
  ],
  "note": "A mixed Riau sambal goreng of fried potato, tofu and shrimp. Sweet soy sauce rounds the chilli coating, making this a complete side dish rather than a separate dipping paste.",
  "src": [
    "https://budaya-indonesia.org/Sambal-Goreng-Campur-Khas-Riau-Riau-Riau"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "",
    "source": "https://budaya-indonesia.org/Sambal-Goreng-Campur-Khas-Riau-Riau-Riau"
  }
},
{
  "id": "l120",
  "name": "Sambal Goreng Hancur",
  "prov": "JA",
  "region": "Jambi",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    1,
    1,
    1,
    2,
    4
  ],
  "ing": [
    "Fish",
    "Red chilli",
    "Shallot",
    "Tomato",
    "Oil",
    "Salt"
  ],
  "serve": [
    "Steamed rice",
    "Boiled greens",
    "Cucumber"
  ],
  "note": "Fish is fried before being worked through a coarse chilli-and-tomato mixture. The stirring breaks it into flakes, giving this Jambi sambal its loose, broken-up texture.",
  "src": [
    "https://budaya-indonesia.org/Sambal-Goreng-Hancur-Jambi-Jambi"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "",
    "source": "https://budaya-indonesia.org/Sambal-Goreng-Hancur-Jambi-Jambi"
  }
},
{
  "id": "l121",
  "name": "Sambal Terasi Macang",
  "prov": "JA",
  "region": "Jambi",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 4,
  "p": [
    4,
    3,
    4,
    1,
    4,
    1
  ],
  "ing": [
    "Macang mango",
    "Red chilli",
    "Bird’s-eye chilli",
    "Toasted shrimp paste",
    "Sugar",
    "Salt"
  ],
  "serve": [
    "Grilled river fish",
    "Steamed rice",
    "Fresh vegetables"
  ],
  "note": "Sour macang mango brings a strong fruit aroma to Jambi's terasi sambal. Add its sliced flesh after pounding the chillies, keeping enough texture to catch the juices.",
  "src": [
    "https://budaya-indonesia.org/Sambal-Terasi-Macang-Khas-Jambi"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Macang mango, terasi",
    "source": "https://budaya-indonesia.org/Sambal-Terasi-Macang-Khas-Jambi"
  }
},
{
  "id": "l122",
  "name": "Sambal Asam Belut",
  "prov": "JA",
  "region": "Jambi",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 4,
  "p": [
    4,
    0,
    1,
    1,
    2,
    4
  ],
  "ing": [
    "Eel",
    "Red chilli",
    "Bird’s-eye chilli",
    "Garlic",
    "Sugar",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Steamed rice",
    "Lalapan",
    "Sayur bening"
  ],
  "note": "The archived recipe fries eel and crushes it into softened chillies and garlic. Despite the name asam, this particular version lists no separate souring ingredient.",
  "src": [
    "https://budaya-indonesia.org/Sambal-Asam-Belut-Jambi-Jambi"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Eel",
    "source": "https://budaya-indonesia.org/Sambal-Asam-Belut-Jambi-Jambi"
  }
},
{
  "id": "l123",
  "name": "Sambal Bacang",
  "prov": "SS",
  "region": "Palembang, South Sumatra",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 4,
  "p": [
    4,
    3,
    4,
    2,
    4,
    1
  ],
  "ing": [
    "Bacang mango",
    "Bird’s-eye chilli",
    "Toasted shrimp paste",
    "Sugar",
    "Salt"
  ],
  "serve": [
    "Grilled river fish",
    "Fried fish",
    "Steamed rice"
  ],
  "note": "A seasonal Palembang sambal made with aromatic bacang fruit. Its fibrous, sweet-sour flesh is pounded with chilli and shrimp paste, giving a fuller perfume than ordinary mango.",
  "src": [
    "https://www.merdeka.com/peristiwa/sambal-bacang-pelengkap-hidangan-musiman-khas-palembang.html"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Palembang; bacang mango, seasonal",
    "source": "https://www.merdeka.com/peristiwa/sambal-bacang-pelengkap-hidangan-musiman-khas-palembang.html"
  }
},
{
  "id": "l124",
  "name": "Sambal Ranggam",
  "prov": "SS",
  "region": "Ogan Komering Ulu, South Sumatra",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 3,
  "p": [
    3,
    3,
    3,
    1,
    5,
    1
  ],
  "ing": [
    "Ranggam (small tomatoes)",
    "Red chilli",
    "Toasted shrimp paste",
    "Lemon basil",
    "Salt"
  ],
  "serve": [
    "Grilled fish",
    "Steamed rice",
    "Fried tofu"
  ],
  "note": "Small ranggam tomatoes make this Ogan Komering Ulu sambal juicy. Basil is crushed in at the end, supplying a fresh herbal note over chilli and toasted shrimp paste.",
  "src": [
    "https://budaya-indonesia.org/Sambal-Ranggam-Ogan-Komering-Ulu-Sumatera-Selatan"
  ],
  "persona": [
    "The Fresh Perspective",
    "Aromatic and open, you bring a different point of view."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Ogan Komering Ulu",
    "source": "https://budaya-indonesia.org/Sambal-Ranggam-Ogan-Komering-Ulu-Sumatera-Selatan"
  }
},
{
  "id": "l125",
  "name": "Sambal Lingkung",
  "prov": "BB",
  "region": "Bangka Belitung",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 0,
  "p": [
    0,
    1,
    0,
    2,
    1,
    5
  ],
  "ing": [
    "Cooked fish",
    "Coconut milk",
    "Grated coconut",
    "Shallot",
    "Garlic",
    "Turmeric",
    "Shrimp paste",
    "Salt"
  ],
  "serve": [
    "Steamed rice",
    "Lontong",
    "Bread"
  ],
  "note": "Lingkung is a seasoned fish floss rather than a fresh chilli dip. Slow cooking with coconut makes the fish fine and rich; chilli can vary by version and is not its defining feature.",
  "src": [
    "https://www.mongabay.co.id/2022/01/24/sambal-lingkung-simbol-kearifan-masyarakat-melayu-dengan-alam/"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Fish floss with coconut, turmeric and terasi",
    "source": "https://www.mongabay.co.id/2022/01/24/sambal-lingkung-simbol-kearifan-masyarakat-melayu-dengan-alam/"
  }
},
{
  "id": "l126",
  "name": "Sambal Belacan Bangka",
  "prov": "BB",
  "region": "Bangka Belitung",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 4,
  "p": [
    4,
    3,
    0,
    1,
    3,
    1
  ],
  "ing": [
    "Toasted belacan",
    "Red chilli",
    "Bird’s-eye chilli",
    "Sugar",
    "Salt"
  ],
  "serve": [
    "Grilled fish",
    "Lalapan",
    "Boiled vegetables"
  ],
  "note": "Bangka's belacan sambal places toasted shrimp paste at the centre. Fresh chilli is pounded into it, with only a little sugar needed to round the salty, roasted flavour.",
  "src": [
    "https://budaya-indonesia.org/Sambal-Belacan-Khas-Bangka"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Shrimp paste",
    "source": "https://budaya-indonesia.org/Sambal-Belacan-Khas-Bangka"
  }
},
{
  "id": "l127",
  "name": "Sambal Honje",
  "prov": "BT",
  "region": "Labuan, Pandeglang, Banten",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 4,
  "p": [
    4,
    2,
    3,
    1,
    5,
    1
  ],
  "ing": [
    "Honje (torch ginger)",
    "Bird’s-eye chilli",
    "Shallot",
    "Toasted shrimp paste",
    "Salt"
  ],
  "serve": [
    "Grilled fish",
    "Steamed rice",
    "Lalapan"
  ],
  "note": "Honje is the Sundanese name for torch ginger. In this Pandeglang-associated sambal, its floral bite lifts the pounded chilli and makes a fragrant accompaniment to fish.",
  "src": [
    "B"
  ],
  "persona": [
    "The Fresh Perspective",
    "Aromatic and open, you bring a different point of view."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Labuan, Pandeglang; torch ginger",
    "source": "B"
  }
},
{
  "id": "l128",
  "name": "Sambal Dadak",
  "prov": "JB",
  "region": "West Java",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 3,
  "p": [
    3,
    3,
    3,
    2,
    4,
    1
  ],
  "ing": [
    "Tomato",
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Toasted shrimp paste",
    "Palm sugar",
    "Limau",
    "Salt"
  ],
  "serve": [
    "Ayam goreng",
    "Lalapan",
    "Steamed rice"
  ],
  "note": "Dadak is made to order, shortly before eating. Raw tomato and chilli keep it juicy, while toasted terasi, palm sugar and limau provide the familiar Sundanese savoury-sweet-sour balance.",
  "src": [
    "https://www.liputan6.com/hot/read/4599878/20-macam-sambal-dari-penjuru-nusantara-yang-wajib-dicoba-ketahui-resepnya"
  ],
  "persona": [
    "The Fresh Perspective",
    "Aromatic and open, you bring a different point of view."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Pounded to order; tomato, terasi, palm sugar, lime",
    "source": "https://www.liputan6.com/hot/read/4599878/20-macam-sambal-dari-penjuru-nusantara-yang-wajib-dicoba-ketahui-resepnya"
  }
},
{
  "id": "l129",
  "name": "Sambal Cikur",
  "prov": "JB",
  "region": "West Java",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 3,
  "p": [
    3,
    3,
    3,
    1,
    5,
    1
  ],
  "ing": [
    "Kencur (cikur)",
    "Bird’s-eye chilli",
    "Tomato",
    "Shallot",
    "Toasted shrimp paste",
    "Lime",
    "Salt"
  ],
  "serve": [
    "Fried tempeh",
    "Lalapan",
    "Steamed rice"
  ],
  "note": "Cikur is kencur in Sundanese. Its cool, earthy fragrance stands out above the tomato and chilli, especially when freshly pounded and finished with a little lime.",
  "src": [
    "https://www.popmama.com/life/health/kumpulan-resep-sambal-sunda-00-kd2wt-p7dxy9"
  ],
  "persona": [
    "The Fresh Perspective",
    "Aromatic and open, you bring a different point of view."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Kencur, tomato, toasted terasi, lime",
    "source": "https://www.popmama.com/life/health/kumpulan-resep-sambal-sunda-00-kd2wt-p7dxy9"
  }
},
{
  "id": "l130",
  "name": "Sambal Asem",
  "prov": "JB",
  "region": "Cirebon, West Java",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 3,
  "p": [
    3,
    3,
    4,
    2,
    4,
    1
  ],
  "ing": [
    "Tamarind water",
    "Bird’s-eye chilli",
    "Toasted shrimp paste",
    "Palm sugar",
    "Salt"
  ],
  "serve": [
    "Boiled water spinach",
    "Steamed vegetables",
    "Fried tofu"
  ],
  "note": "Cirebon's asem sambal uses a sweet-sour tamarind dressing to carry chilli and shrimp paste. Its loose consistency suits vegetables, letting the sauce coat leaves and stems evenly.",
  "src": [
    "B"
  ],
  "persona": [
    "The Bright Spark",
    "Lively and refreshing, you keep things moving."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Cirebon",
    "source": "B"
  }
},
{
  "id": "l131",
  "name": "Sambal Goreng Cirebon",
  "prov": "JB",
  "region": "Cirebon, West Java",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    1,
    1,
    2,
    2,
    4
  ],
  "ing": [
    "Beef",
    "Red chilli",
    "Shallot",
    "Garlic",
    "Coconut milk",
    "Galangal",
    "Salam leaf",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Nasi jamblang",
    "Steamed rice",
    "Lontong"
  ],
  "note": "The Cirebon entry is a meat-based sambal goreng. Small beef pieces absorb the cooked chilli seasoning, giving a rich accompaniment that works alongside rice rather than as a raw dip.",
  "src": [
    "B"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Cirebon; meat",
    "source": "B"
  }
},
{
  "id": "l132",
  "name": "Sambal Muncang",
  "prov": "JB",
  "region": "West Java",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    0,
    1,
    2,
    2,
    4
  ],
  "ing": [
    "Roasted candlenuts",
    "Roasted shallot",
    "Red chilli",
    "Bird’s-eye chilli",
    "Palm sugar",
    "Salt",
    "Water"
  ],
  "serve": [
    "Grilled fish",
    "Boiled vegetables",
    "Steamed rice"
  ],
  "note": "Muncang is candlenut in Sundanese. The archived recipe roasts the nuts, chillies and shallot before pounding, then adds palm sugar and a little water for a creamy, nutty sauce.",
  "src": [
    "https://budaya-indonesia.org/Sambal-Muncang-Jawa-Barat",
    "https://pdbifiles.nos.jkt-1.neo.id/files/2018/12/02/niasanny_SambalMuncangJabar-1.PNG"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Muncang (candlenut)",
    "source": "https://budaya-indonesia.org/Sambal-Muncang-Jawa-Barat"
  }
},
{
  "id": "l133",
  "name": "Sambal Godog",
  "prov": "JB",
  "region": "West Java",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 2,
  "p": [
    2,
    1,
    1,
    2,
    2,
    4
  ],
  "ing": [
    "Coconut milk",
    "Green beans",
    "Potato",
    "Red beans",
    "Melinjo skins",
    "Dried shrimp",
    "Red chilli",
    "Shallot",
    "Garlic",
    "Turmeric",
    "Galangal",
    "Lemongrass",
    "Salam leaf",
    "Salt"
  ],
  "serve": [
    "Ketupat",
    "Lontong",
    "Steamed rice"
  ],
  "note": "Godog is a simmered vegetable preparation with a chilli-coconut broth. Beans, potato and melinjo skins provide texture, while dried shrimp gives the yellow seasoning its savoury depth.",
  "src": [
    "https://budaya-indonesia.org/Sambal-Godog-Jawa-Barat-Jawa-Barat-Jawa-Barat"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "",
    "source": "https://budaya-indonesia.org/Sambal-Godog-Jawa-Barat-Jawa-Barat-Jawa-Barat"
  }
},
{
  "id": "l134",
  "name": "Sambal Kecap Tahu Gejrot",
  "prov": "JB",
  "region": "West Java",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 3,
  "p": [
    3,
    0,
    3,
    5,
    4,
    1
  ],
  "ing": [
    "Kecap manis",
    "Bird’s-eye chilli",
    "Garlic",
    "Lime",
    "Salt"
  ],
  "serve": [
    "Fried tofu",
    "Tahu gejrot-style tofu"
  ],
  "note": "The linked recipe is a simple sweet-soy, garlic and lime mixture for crushed fried tofu. It represents one version; the familiar Cirebon tahu gejrot broth often uses palm sugar and tamarind instead.",
  "src": [
    "https://budaya-indonesia.org/Sambal-Kecap-Tahu-Gejrot-Jawa-Barat-Jawa-Barat"
  ],
  "persona": [
    "The Warm Welcome",
    "Generous and rounded, you help people feel at home."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Sweet soy, for tahu gejrot",
    "source": "https://budaya-indonesia.org/Sambal-Kecap-Tahu-Gejrot-Jawa-Barat-Jawa-Barat"
  }
},
{
  "id": "l135",
  "name": "Sambal Tauco Jawa Barat",
  "prov": "JB",
  "region": "West Java",
  "locationAccuracy": "province",
  "style": "fermented",
  "heat": 3,
  "p": [
    3,
    3,
    2,
    2,
    2,
    4
  ],
  "ing": [
    "Tauco",
    "Green chilli",
    "Shallot",
    "Garlic",
    "Coconut milk",
    "Lemongrass",
    "Salam leaf",
    "Tamarind",
    "Sugar",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Fried fish",
    "Steamed rice",
    "Fried tofu"
  ],
  "note": "This West Javanese tauco version cooks sliced aromatics and green chilli with coconut milk. Tamarind offsets the salty soybean paste, giving a softer, creamier result than a plain tauco dip.",
  "src": [
    "https://budaya-indonesia.org/Sambal-Tauco-Jawa-Barat-Jawa-Barat"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Tauco",
    "source": "https://budaya-indonesia.org/Sambal-Tauco-Jawa-Barat-Jawa-Barat"
  }
},
{
  "id": "l136",
  "name": "Sambal Goreng Tahu",
  "prov": "JB",
  "region": "West Java",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 2,
  "p": [
    2,
    0,
    2,
    2,
    2,
    4
  ],
  "ing": [
    "Fried tofu",
    "Malang apple",
    "Red chilli",
    "Garlic",
    "Tomato",
    "Sugar",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Steamed rice",
    "Boiled vegetables",
    "Lontong"
  ],
  "note": "The archived recipe includes diced Malang apple alongside fried tofu. The fruit adds a light sweet-sour contrast to the cooked tomato-chilli sauce coating the tofu pieces.",
  "src": [
    "https://budaya-indonesia.org/Sambal-Goreng-Tahu-Jawa-Barat-Jawa-Barat"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Tofu",
    "source": "https://budaya-indonesia.org/Sambal-Goreng-Tahu-Jawa-Barat-Jawa-Barat"
  }
},
{
  "id": "l137",
  "name": "Sambal Panggang",
  "prov": "JT",
  "region": "Semarang, Central Java",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 4,
  "p": [
    4,
    3,
    3,
    1,
    3,
    4
  ],
  "ing": [
    "Smoked fish",
    "Bird’s-eye chilli",
    "Red chilli",
    "Garlic",
    "Toasted shrimp paste",
    "Limau",
    "Salt"
  ],
  "serve": [
    "Steamed rice",
    "Sayur bening bayam"
  ],
  "note": "Smoked fish is gently crushed into pounded chilli in this Semarang sambal. It keeps some flakes intact, balancing smoky savouriness with fresh chilli and a citrus finish.",
  "src": [
    "https://www.ubudfoodfestival.com/uff19-sambal-series-sambal-panggang/"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Semarang; smoked fish",
    "source": "https://www.ubudfoodfestival.com/uff19-sambal-series-sambal-panggang/"
  }
},
{
  "id": "l138",
  "name": "Sambal Samtis",
  "prov": "JT",
  "region": "Jepara, Central Java",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 3,
  "p": [
    3,
    3,
    2,
    4,
    2,
    4
  ],
  "ing": [
    "Petis udang or petis cumi",
    "Bird’s-eye chilli",
    "Garlic",
    "Fried garlic",
    "Kecap manis",
    "Palm sugar",
    "Salt",
    "Water"
  ],
  "serve": [
    "Steamed rice",
    "Fried tofu",
    "Vegetable fritters"
  ],
  "note": "Jepara's samtis combines chilli with thick shrimp or squid petis. The archived version is mixed rather than fried, with sweet soy and fried garlic rounding the concentrated seafood flavour.",
  "src": [
    "https://budaya-indonesia.org/Sambal-Samtis-Jepara-Jawa-Tengah"
  ],
  "persona": [
    "The Warm Welcome",
    "Generous and rounded, you help people feel at home."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Jepara",
    "source": "https://budaya-indonesia.org/Sambal-Samtis-Jepara-Jawa-Tengah"
  }
},
{
  "id": "l139",
  "name": "Sambal Teri Goreng Rembang",
  "prov": "JT",
  "region": "Rembang, Central Java",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    3,
    2,
    2,
    2,
    4
  ],
  "ing": [
    "Fried anchovies",
    "Coconut milk",
    "Red chilli",
    "Bird’s-eye chilli",
    "Garlic",
    "Candlenuts",
    "Galangal",
    "Kencur",
    "Fingerroot",
    "Makrut lime leaf",
    "Tamarind",
    "Palm sugar",
    "Shrimp paste"
  ],
  "serve": [
    "Steamed rice",
    "Lontong",
    "Boiled greens"
  ],
  "note": "Rembang's archived version enriches fried anchovies with coconut milk and a layered spice paste. Kencur, fingerroot and lime leaf give it a more aromatic character than a simple chilli-teri mixture.",
  "src": [
    "https://budaya-indonesia.org/Sambal-Teri-Goreng-Rembang-Jawa-Tengah"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Rembang; fried anchovies",
    "source": "https://budaya-indonesia.org/Sambal-Teri-Goreng-Rembang-Jawa-Tengah"
  }
},
{
  "id": "l140",
  "name": "Sambal Daun Melinjo",
  "prov": "JT",
  "region": "Klaten, Central Java",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 4,
  "p": [
    4,
    0,
    1,
    1,
    2,
    3
  ],
  "ing": [
    "Melinjo leaves",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Steamed rice",
    "Fried tempeh",
    "Sayur bening"
  ],
  "note": "Melinjo leaves are fried separately before being crushed into the chilli seasoning. This Klaten preparation can be lightly crisp or softer, depending on how long the leaves cook.",
  "src": [
    "https://budaya-indonesia.org/Sambal-Daun-Melinjo-Klaten-Klaten-Jawa-Tengah"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Klaten; melinjo leaves",
    "source": "https://budaya-indonesia.org/Sambal-Daun-Melinjo-Klaten-Klaten-Jawa-Tengah"
  }
},
{
  "id": "l141",
  "name": "Sambal Geprek",
  "prov": "YO",
  "region": "Yogyakarta",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 5,
  "p": [
    5,
    0,
    0,
    0,
    2,
    3
  ],
  "ing": [
    "Bird’s-eye chilli",
    "Garlic",
    "Salt",
    "Hot oil"
  ],
  "serve": [
    "Ayam geprek",
    "Fried tempeh",
    "Steamed rice"
  ],
  "note": "This Yogyakarta-style sambal is pounded directly with crisp fried chicken. Raw chilli and garlic give an immediate bite, while hot oil helps the seasoning cling to the broken crust.",
  "src": [
    "https://rri.co.id/denpasar/kuliner/2623431/asal-usul-ayam-geprek-dari-warung-sederhana-di-yogyakarta"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Pounded onto fried chicken; from Yogyakarta",
    "source": "https://rri.co.id/denpasar/kuliner/2623431/asal-usul-ayam-geprek-dari-warung-sederhana-di-yogyakarta"
  }
},
{
  "id": "l142",
  "name": "Sambal Terasi Jogja",
  "prov": "YO",
  "region": "Yogyakarta",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    3,
    2,
    3,
    1,
    3
  ],
  "ing": [
    "Red chilli",
    "Tomato",
    "Shallot",
    "Garlic",
    "Shrimp paste",
    "Sugar",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Fried chicken",
    "Lalapan",
    "Steamed rice"
  ],
  "note": "The documented Jogja version softens its chilli and tomato in oil before pounding. A little sugar rounds the terasi, producing a mellow cooked sambal for everyday fried dishes.",
  "src": [
    "https://budaya-indonesia.org/Sambel-Terasi"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "",
    "source": "https://budaya-indonesia.org/Sambel-Terasi"
  }
},
{
  "id": "l143",
  "name": "Sambal Tempong",
  "prov": "JI",
  "region": "Banyuwangi, East Java",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 5,
  "p": [
    5,
    3,
    4,
    1,
    4,
    1
  ],
  "ing": [
    "Bird’s-eye chilli",
    "Tomato",
    "Shallot",
    "Toasted shrimp paste",
    "Limau",
    "Sugar",
    "Salt"
  ],
  "serve": [
    "Nasi tempong",
    "Fried salted fish",
    "Boiled vegetables"
  ],
  "note": "Banyuwangi's tempong sambal is sharply hot and freshly sour. Tomato keeps it juicy while limau gives a fragrant finish, balancing the fried fish and vegetables of a nasi tempong plate.",
  "src": [
    "https://www.jawapos.com/kuliner/2509060063/dijamin-lezat-ini-resep-sambal-tempong-khas-banyuwangi-yang-pedas-segar-untuk-hidangan-keluarga"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Banyuwangi",
    "source": "https://www.jawapos.com/kuliner/2509060063/dijamin-lezat-ini-resep-sambal-tempong-khas-banyuwangi-yang-pedas-segar-untuk-hidangan-keluarga"
  }
},
{
  "id": "l144",
  "name": "Sambal Pencit Madura",
  "prov": "JI",
  "region": "Madura, East Java",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 5,
  "p": [
    5,
    3,
    4,
    1,
    4,
    1
  ],
  "ing": [
    "Unripe mango",
    "Bird’s-eye chilli",
    "Red chilli",
    "Toasted shrimp paste",
    "Sugar",
    "Salt"
  ],
  "serve": [
    "Fried duck",
    "Fried fish",
    "Steamed rice"
  ],
  "note": "The Madura version pairs shredded young mango with a forceful chilli-and-terasi base. Its crisp sourness is especially effective against rich fried duck and hot rice.",
  "src": [
    "https://www.fimela.com/food/read/5163717/resep-sambal-pencit-khas-madura-yang-pedas-dan-segar"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Madura; unripe mango",
    "source": "https://www.fimela.com/food/read/5163717/resep-sambal-pencit-khas-madura-yang-pedas-dan-segar"
  }
},
{
  "id": "l145",
  "name": "Sambal Hitam Madura",
  "prov": "JI",
  "region": "Madura, East Java",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 4,
  "p": [
    4,
    0,
    3,
    2,
    1,
    5
  ],
  "ing": [
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Candlenuts",
    "Ginger",
    "Turmeric",
    "Galangal",
    "Lemongrass",
    "Makrut lime leaf",
    "Tamarind",
    "Oil",
    "Salt"
  ],
  "serve": [
    "Bebek goreng Madura",
    "Steamed rice",
    "Cucumber"
  ],
  "note": "Slow cooking darkens the alliums and spices into a concentrated Madurese paste. The dark colour comes from the cooked seasoning, with tamarind and aromatic roots balancing its rich oiliness.",
  "src": [
    "https://www.jawapos.com/kuliner/2609240047/resep-sambal-hitam-madura-gurih-pedas-dengan-bumbu-rempah"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Madura; slow-cooked with spices",
    "source": "https://www.jawapos.com/kuliner/2609240047/resep-sambal-hitam-madura-gurih-pedas-dengan-bumbu-rempah"
  }
},
{
  "id": "l146",
  "name": "Sambal Lamongan",
  "prov": "JI",
  "region": "Lamongan, East Java",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    3,
    2,
    3,
    2,
    4
  ],
  "ing": [
    "Red chilli",
    "Bird’s-eye chilli",
    "Tomato",
    "Shallot",
    "Garlic",
    "Toasted candlenuts",
    "Shrimp paste",
    "Palm sugar",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Pecel lele",
    "Fried chicken",
    "Lalapan"
  ],
  "note": "This representative Lamongan stall-style sambal uses cooked tomato, chilli and alliums. Candlenut gives body and palm sugar balances the terasi, making a thick companion for fried catfish.",
  "src": [
    "https://budaya-indonesia.org/sambal-lamongan"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Lamongan; served with pecel lele",
    "source": "https://budaya-indonesia.org/sambal-lamongan"
  }
},
{
  "id": "l147",
  "name": "Sambal Kemiri Jawa Timur",
  "prov": "JI",
  "region": "East Java",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    0,
    2,
    0,
    2,
    4
  ],
  "ing": [
    "Red chilli",
    "Bird’s-eye chilli",
    "Fried candlenuts",
    "Chicken or beef stock",
    "Vinegar",
    "Salt"
  ],
  "serve": [
    "Soto Lamongan",
    "Lontong balap",
    "Tahu campur"
  ],
  "note": "Boiled chillies and fried candlenuts are pounded, loosened with stock and briefly cooked. A little vinegar brightens this East Javanese soup accompaniment without overwhelming the nutty body.",
  "src": [
    "https://budaya-indonesia.org/Sambal-Kemiri-khas-Jawa-Timur"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Candlenut",
    "source": "https://budaya-indonesia.org/Sambal-Kemiri-khas-Jawa-Timur"
  }
},
{
  "id": "l148",
  "name": "Sambal Goreng Petis",
  "prov": "JI",
  "region": "East Java",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    3,
    3,
    2,
    2,
    5
  ],
  "ing": [
    "Petis",
    "Coconut milk",
    "Red chilli",
    "Green chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Ginger",
    "Galangal",
    "Turmeric",
    "Lemongrass",
    "Tamarind",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Boiled eggs",
    "Steamed rice",
    "Fried tofu"
  ],
  "note": "Petis is simmered with coconut milk and a full aromatic spice base. The resulting sauce is richer and more layered than a simple petis dip, and the linked recipe pairs it with eggs.",
  "src": [
    "https://budaya-indonesia.org/Sambal-Goreng-Petis-khas-Jawa-Timur"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Petis",
    "source": "https://budaya-indonesia.org/Sambal-Goreng-Petis-khas-Jawa-Timur"
  }
},
{
  "id": "l149",
  "name": "Sambal Tempe Malang",
  "prov": "JI",
  "region": "Malang, East Java",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    2,
    1,
    1,
    3,
    4
  ],
  "ing": [
    "Tempeh",
    "Bird’s-eye chilli",
    "Garlic",
    "Kencur",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Rawon Malang",
    "Steamed rice",
    "Salted eggs"
  ],
  "note": "A tempeh sambal served alongside rawon in Malang. Crushed cooked tempeh gives the chilli a crumbly, savoury body that stands up well to the dark, earthy soup.",
  "src": [
    "https://english.kontan.co.id/news/the-delicious-rawon-malang-with-sambal-tempe"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Malang; tempeh, served with rawon",
    "source": "https://english.kontan.co.id/news/the-delicious-rawon-malang-with-sambal-tempe"
  }
},
{
  "id": "l150",
  "name": "Sambal Rajang",
  "prov": "BA",
  "region": "Bali",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 4,
  "p": [
    4,
    0,
    1,
    1,
    3,
    4
  ],
  "ing": [
    "Shallot",
    "Garlic",
    "Bird’s-eye chilli",
    "Red chilli",
    "Kencur",
    "Ginger",
    "Galangal",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Grilled chicken",
    "Grilled fish",
    "Steamed rice"
  ],
  "note": "Rajang means sliced or chopped. Here the alliums, chillies and aromatic roots are cut finely and briefly fried, preserving small pieces instead of turning the sambal into a smooth paste.",
  "src": [
    "https://www.idntimes.com/food/dining-guide/akbar-30/5-aneka-sambal-khas-bali-c1c2"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Sliced chilli, shallot, garlic, sautéed",
    "source": "https://www.idntimes.com/food/dining-guide/akbar-30/5-aneka-sambal-khas-bali-c1c2"
  }
},
{
  "id": "l151",
  "name": "Sambal Sere Tabia",
  "prov": "BA",
  "region": "Bali",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 5,
  "p": [
    5,
    4,
    0,
    0,
    1,
    4
  ],
  "ing": [
    "Bird’s-eye chilli",
    "Shrimp paste",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Steamed rice",
    "Ayam betutu",
    "Boiled greens"
  ],
  "note": "A short ingredient list produces a strong Balinese sambal: chilli is briefly fried with terasi and salt. The oil carries the roasted shrimp-paste aroma through every spoonful.",
  "src": [
    "https://www.detik.com/bali/kuliner/d-6480238/6-sambal-khas-bali-lengkap-dengan-resepnya"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Fried bird’s-eye chilli, terasi, salt",
    "source": "https://www.detik.com/bali/kuliner/d-6480238/6-sambal-khas-bali-lengkap-dengan-resepnya"
  }
},
{
  "id": "l152",
  "name": "Sambal Matah Kecombrang",
  "prov": "BA",
  "region": "Bali",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 4,
  "p": [
    4,
    0,
    4,
    1,
    5,
    2
  ],
  "ing": [
    "Torch ginger flower",
    "Shallot",
    "Garlic",
    "Bird’s-eye chilli",
    "Lemongrass",
    "Makrut lime leaf",
    "Lime",
    "Coconut oil",
    "Salt"
  ],
  "serve": [
    "Grilled fish",
    "Sate lilit",
    "Fried chicken"
  ],
  "note": "Thinly sliced torch ginger adds a floral note to matah's fresh alliums and lemongrass. Warm coconut oil dresses the mixture while citrus keeps the finish bright.",
  "src": [
    "https://www.detik.com/bali/kuliner/d-6480238/6-sambal-khas-bali-lengkap-dengan-resepnya"
  ],
  "persona": [
    "The Fresh Perspective",
    "Aromatic and open, you bring a different point of view."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Matah with torch ginger flower",
    "source": "https://www.detik.com/bali/kuliner/d-6480238/6-sambal-khas-bali-lengkap-dengan-resepnya"
  }
},
{
  "id": "l153",
  "name": "Sambal Sager Gerih",
  "prov": "BA",
  "region": "Tabanan, Bali",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 4,
  "p": [
    4,
    3,
    3,
    1,
    3,
    5
  ],
  "ing": [
    "Salted fish",
    "Roasted coconut",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Toasted shrimp paste",
    "Makrut lime",
    "Makrut lime leaf",
    "Oil"
  ],
  "serve": [
    "Nasi sele",
    "Steamed rice",
    "Boiled vegetables"
  ],
  "note": "Tabanan's sager gerih combines cooked salted fish with roasted coconut. Pounded seasoning and citrus bring the dry, savoury ingredients together into a fragrant, textured sambal.",
  "src": [
    "https://budayabali.com/sager-gerih-sambal-khas-tabanan-dengan-campuran-ikan-asin-dan-kelapa-panggang"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Tabanan; salted fish, roasted coconut",
    "source": "https://budayabali.com/sager-gerih-sambal-khas-tabanan-dengan-campuran-ikan-asin-dan-kelapa-panggang"
  }
},
{
  "id": "l154",
  "name": "Sambal Gerang",
  "prov": "BA",
  "region": "Bali",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 4,
  "p": [
    4,
    3,
    1,
    1,
    2,
    4
  ],
  "ing": [
    "Anchovies (gerang)",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Shrimp paste",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Steamed rice",
    "Boiled water spinach",
    "Fried tofu"
  ],
  "note": "Gerang are small anchovies used in Balinese cooking. Fried fish and chilli seasoning make a compact, salty sambal whose strong savouriness works best in small spoonfuls alongside rice.",
  "src": [
    "https://www.liputan6.com/regional/read/5219143/tak-hanya-sambal-matah-ini-ragam-sambal-khas-bali"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Anchovies",
    "source": "https://www.liputan6.com/regional/read/5219143/tak-hanya-sambal-matah-ini-ragam-sambal-khas-bali"
  }
},
{
  "id": "l155",
  "name": "Sambal Terong Goreng Bali",
  "prov": "BA",
  "region": "Bali",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    2,
    1,
    1,
    3,
    4
  ],
  "ing": [
    "Round eggplant",
    "Bird’s-eye chilli",
    "Shallot",
    "Shrimp paste",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Steamed rice",
    "Grilled fish",
    "Boiled greens"
  ],
  "note": "The archived Balinese recipe fries diced eggplant with sliced shallot and chilli. The pieces absorb the terasi seasoning while staying recognisable, making a soft vegetable sambal.",
  "src": [
    "https://budaya-indonesia.org/Sambal-Terong-Goreng-Bali-Bali"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Fried eggplant",
    "source": "https://budaya-indonesia.org/Sambal-Terong-Goreng-Bali-Bali"
  }
},
{
  "id": "l156",
  "name": "Sambal Doco Doma",
  "prov": "NB",
  "region": "Bima, West Nusa Tenggara",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 3,
  "p": [
    3,
    0,
    4,
    1,
    5,
    1
  ],
  "ing": [
    "Tomato",
    "Cucumber",
    "Round eggplant",
    "Lemon basil",
    "Shallot",
    "Red chilli",
    "Bird’s-eye chilli",
    "Limau",
    "Pepper",
    "Salt"
  ],
  "serve": [
    "Grilled fish",
    "Fried chicken",
    "Steamed rice"
  ],
  "note": "Bima's doco doma is a chunky fresh relish with tomato, cucumber and eggplant. Basil and citrus dress the vegetables, giving a cooling texture around the pounded chilli.",
  "src": [
    "DN"
  ],
  "persona": [
    "The Fresh Perspective",
    "Aromatic and open, you bring a different point of view."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Bima; tomato, cucumber, eggplant, basil",
    "source": "DN"
  }
},
{
  "id": "l157",
  "name": "Sambal Sira Padang",
  "prov": "NB",
  "region": "Sumbawa, West Nusa Tenggara",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 5,
  "p": [
    5,
    0,
    0,
    0,
    3,
    0
  ],
  "ing": [
    "Bird’s-eye chilli",
    "Salt"
  ],
  "serve": [
    "Unripe mango",
    "Sour seasonal fruit"
  ],
  "note": "Sira padang is a Sumbawa chilli-and-salt mixture. It is especially suited to sour fruit: the mango provides the acidity while the sambal itself remains intensely salty and hot.",
  "src": [
    "DN"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Sumbawa; salt and bird’s-eye chilli",
    "source": "DN"
  }
},
{
  "id": "l158",
  "name": "Sambal Sirawir",
  "prov": "NB",
  "region": "Tepal, Sumbawa, West Nusa Tenggara",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 4,
  "p": [
    4,
    0,
    1,
    0,
    4,
    3
  ],
  "ing": [
    "Bird’s-eye chilli",
    "Toasted candlenuts",
    "Garlic",
    "Makrut lime leaf",
    "Galangal",
    "Lemongrass",
    "Salt"
  ],
  "serve": [
    "Brothy dishes",
    "Grilled fish",
    "Steamed rice"
  ],
  "note": "From Tepal in Sumbawa, sirawir is a coarsely pounded mixture of chilli, candlenut and aromatic roots. Lime leaf and lemongrass give fragrance; a spoonful can season a brothy dish.",
  "src": [
    "DN"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Sumbawa; candlenut, lime leaf, galangal, lemongrass",
    "source": "DN"
  }
},
{
  "id": "l159",
  "name": "Sambal Terasi Lombok",
  "prov": "NB",
  "region": "Lombok, West Nusa Tenggara",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 4,
  "p": [
    4,
    4,
    0,
    1,
    3,
    1
  ],
  "ing": [
    "Toasted Lombok terasi",
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Sugar",
    "Salt"
  ],
  "serve": [
    "Grilled fish",
    "Plecing kangkung",
    "Steamed rice"
  ],
  "note": "Local Lombok terasi gives this pounded sambal a strong savoury aroma. The linked version keeps the seasoning simple: chilli, shallot and garlic, balanced with a little sugar and salt.",
  "src": [
    "DN"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Lombok shrimp paste",
    "source": "DN"
  }
},
{
  "id": "l160",
  "name": "Sambal Bawang NTB",
  "prov": "NB",
  "region": "Bima, West Nusa Tenggara",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 4,
  "p": [
    4,
    0,
    4,
    1,
    4,
    1
  ],
  "ing": [
    "Shallot",
    "Bird’s-eye chilli",
    "Tomato",
    "Limau",
    "Salt"
  ],
  "serve": [
    "Grilled fish",
    "Fried chicken",
    "Steamed rice"
  ],
  "note": "The archived Bima version uses plenty of sliced shallot with raw chilli and tomato. Limau adds fragrance and acidity, keeping the allium-led relish crisp and juicy.",
  "src": [
    "https://budaya-indonesia.org/Sambal-Bawang-khas-NTB"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "",
    "source": "https://budaya-indonesia.org/Sambal-Bawang-khas-NTB"
  }
},
{
  "id": "l161",
  "name": "Sambal Sumba",
  "prov": "NT",
  "region": "Sumba, East Nusa Tenggara",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    0,
    3,
    2,
    2,
    3
  ],
  "ing": [
    "Red chilli",
    "Bird’s-eye chilli",
    "Tomato",
    "Shallot",
    "Garlic",
    "Makrut lime",
    "Sugar",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Grilled fish",
    "Fried chicken",
    "Steamed rice"
  ],
  "note": "In the linked Sumba recipe, chilli, tomato and alliums are fried before pounding. Makrut lime is added at the end, giving the softened, lightly sweet paste a fragrant sour finish.",
  "src": [
    "https://budaya-indonesia.org/sambal-sumba"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Sumba",
    "source": "https://budaya-indonesia.org/sambal-sumba"
  }
},
{
  "id": "l162",
  "name": "Sambal Teri NTT",
  "prov": "NT",
  "region": "East Nusa Tenggara",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    2,
    3,
    1,
    2,
    4
  ],
  "ing": [
    "Anchovies",
    "Red chilli",
    "Bird’s-eye chilli",
    "Tomato",
    "Shallot",
    "Garlic",
    "Lime",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Steamed rice",
    "Boiled greens",
    "Fried tofu"
  ],
  "note": "Anchovies cook in a pounded tomato-and-chilli base, then receive a squeeze of lime. This NTT entry has the depth of fried fish with a brighter citrus finish.",
  "src": [
    "https://budaya-indonesia.org/Sambal-Teri-Khas-NTT"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Anchovies",
    "source": "https://budaya-indonesia.org/Sambal-Teri-Khas-NTT"
  }
},
{
  "id": "l163",
  "name": "Sambal Cincalok",
  "prov": "KB",
  "region": "West Kalimantan",
  "locationAccuracy": "province",
  "style": "fermented",
  "heat": 3,
  "p": [
    3,
    4,
    4,
    1,
    3,
    2
  ],
  "ing": [
    "Cincalok (fermented rebon shrimp)",
    "Bird’s-eye chilli",
    "Shallot",
    "Lime",
    "Sugar"
  ],
  "serve": [
    "Steamed rice",
    "Grilled fish",
    "Omelette"
  ],
  "note": "Fermented tiny shrimp bring salt, tang and an unmistakable marine aroma. Chilli, shallot and lime sharpen the mixture; the cincalok itself provides most of the seasoning.",
  "src": [
    "DK"
  ],
  "persona": [
    "The Deep Thinker",
    "Layered and distinctive, you reward a closer look."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Fermented rebon shrimp",
    "source": "DK"
  }
},
{
  "id": "l164",
  "name": "Sambal Tempoyak Pontianak",
  "prov": "KB",
  "region": "Pontianak, West Kalimantan",
  "locationAccuracy": "province",
  "style": "fermented",
  "heat": 3,
  "p": [
    3,
    4,
    4,
    1,
    2,
    4
  ],
  "ing": [
    "Tempoyak",
    "Dried anchovies",
    "Bird’s-eye chilli",
    "Kencur",
    "Lemongrass",
    "Coconut milk",
    "Petai",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Steamed rice",
    "Grilled river fish",
    "Cucumber"
  ],
  "note": "The linked Pontianak version cooks fermented durian with anchovies, petai and a little coconut milk. Kencur and lemongrass add fragrance around the sour, savoury tempoyak base.",
  "src": [
    "https://budaya-indonesia.org/Sambal-Tempoyak-Kalimantan"
  ],
  "persona": [
    "The Deep Thinker",
    "Layered and distinctive, you reward a closer look."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Fermented durian",
    "source": "https://budaya-indonesia.org/Sambal-Tempoyak-Kalimantan"
  }
},
{
  "id": "l165",
  "name": "Sambal Terung Asam Kalimantan",
  "prov": "KT",
  "region": "Central Kalimantan",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 4,
  "p": [
    4,
    3,
    4,
    1,
    4,
    1
  ],
  "ing": [
    "Terung Dayak (sour eggplant)",
    "Bird’s-eye chilli",
    "Red chilli",
    "Shallot",
    "Toasted shrimp paste",
    "Sugar",
    "Salt"
  ],
  "serve": [
    "Grilled river fish",
    "Steamed rice",
    "Boiled vegetables"
  ],
  "note": "Sour Dayak eggplant provides a juicy, tart pulp for this Kalimantan sambal. Its fruit-like character balances the chilli and shrimp paste; preparation varies between raw and softened-fruit versions.",
  "src": [
    "W"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Terung dayak (sour eggplant)",
    "source": "W"
  }
},
{
  "id": "l166",
  "name": "Sambal Jeruk Limau",
  "prov": "KS",
  "region": "Banjarmasin, South Kalimantan",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 4,
  "p": [
    4,
    3,
    4,
    1,
    5,
    1
  ],
  "ing": [
    "Limau",
    "Red chilli",
    "Bird’s-eye chilli",
    "Tomato",
    "Toasted shrimp paste",
    "Salt"
  ],
  "serve": [
    "Grilled fish",
    "Fried fish",
    "Steamed rice"
  ],
  "note": "A Banjarmasin sambal distinguished by the fragrance of freshly squeezed limau. Pound the chilli and tomato first, then add the juice so its aroma stays clear and lively.",
  "src": [
    "https://www.idntimes.com/food/dining-guide/naufal-al-rahman-1/sambal-khas-kalimantan-yang-pedasnya-menggigit"
  ],
  "persona": [
    "The Fresh Perspective",
    "Aromatic and open, you bring a different point of view."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Banjarmasin; limau juice",
    "source": "https://www.idntimes.com/food/dining-guide/naufal-al-rahman-1/sambal-khas-kalimantan-yang-pedasnya-menggigit"
  }
},
{
  "id": "l167",
  "name": "Sambal Dadahan Acan",
  "prov": "KS",
  "region": "South Kalimantan (Banjar)",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 4,
  "p": [
    4,
    3,
    4,
    1,
    3,
    2
  ],
  "ing": [
    "Unripe mango",
    "Red chilli",
    "Bird’s-eye chilli",
    "Tomato",
    "Shallot",
    "Garlic",
    "Toasted acan",
    "Sugar",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Grilled river fish",
    "Steamed rice",
    "Lalapan"
  ],
  "note": "In this Banjar version, the chilli and alliums are softened in oil before mango is added. Raw fruit keeps its sour bite against the deeper cooked acan base.",
  "src": [
    "https://www.idntimes.com/food/recipe/reza-iqbal/5-resep-sambal-khas-indonesia-yang-belum-populer"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Banjar; seasonal fruit with acan",
    "source": "https://www.idntimes.com/food/recipe/reza-iqbal/5-resep-sambal-khas-indonesia-yang-belum-populer"
  }
},
{
  "id": "l168",
  "name": "Sambal Kacang Kalsel",
  "prov": "KS",
  "region": "South Kalimantan",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 1,
  "p": [
    1,
    2,
    2,
    4,
    2,
    4
  ],
  "ing": [
    "Fried peanuts",
    "Dried red chilli",
    "Shallot",
    "Garlic",
    "Kencur",
    "Shrimp paste",
    "Tamarind",
    "Palm sugar",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Lontong",
    "Ketupat",
    "Boiled vegetables"
  ],
  "note": "This South Kalimantan peanut sauce leans sweet and mild. Kencur, terasi and tamarind add complexity; extra hot chilli may be offered separately rather than mixed into the main sauce.",
  "src": [
    "https://budaya-indonesia.org/Sambal-Kacang-Khas-Kalimantan-Selatan"
  ],
  "persona": [
    "The Warm Welcome",
    "Generous and rounded, you help people feel at home."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Peanuts",
    "source": "https://budaya-indonesia.org/Sambal-Kacang-Khas-Kalimantan-Selatan"
  }
},
{
  "id": "l169",
  "name": "Sambal Ikan Bakar Kalsel",
  "prov": "KS",
  "region": "South Kalimantan",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 3,
  "p": [
    3,
    0,
    3,
    2,
    4,
    1
  ],
  "ing": [
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Tomato",
    "Jeruk sambal",
    "Palm sugar",
    "Salt"
  ],
  "serve": [
    "Grilled tilapia",
    "Grilled mackerel",
    "Steamed rice"
  ],
  "note": "A citrus-and-tomato sambal intended for grilled fish. Shallot adds a fresh bite and palm sugar rounds the acidity, letting the smoke of the fish remain prominent.",
  "src": [
    "https://budaya-indonesia.org/sambal-ikan-bakar-khas-kalimantan-selatan"
  ],
  "persona": [
    "The Fresh Perspective",
    "Aromatic and open, you bring a different point of view."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "For grilled fish",
    "source": "https://versilama.budaya-indonesia.org/sambal-ikan-bakar-khas-kalimantan-selatan"
  }
},
{
  "id": "l170",
  "name": "Sambal Raja Kutai",
  "prov": "KI",
  "region": "Kutai Kartanegara, East Kalimantan",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    3,
    3,
    1,
    3,
    4
  ],
  "ing": [
    "Eggplant",
    "Long beans",
    "Shallot",
    "Red chilli",
    "Bird’s-eye chilli",
    "Toasted shrimp paste",
    "Limau",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Nasi bekepor",
    "Grilled fish",
    "Steamed rice"
  ],
  "note": "Kutai's sambal raja combines vegetables with a fragrant terasi-and-citrus seasoning. Eggplant softens while long beans keep some bite, making a varied accompaniment to nasi bekepor.",
  "src": [
    "DK"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Kutai Kartanegara; eggplant, long beans, terasi",
    "source": "DK"
  }
},
{
  "id": "l171",
  "name": "Sambal Nanas Kaltim",
  "prov": "KI",
  "region": "East Kalimantan",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    3,
    4,
    2,
    4,
    2
  ],
  "ing": [
    "Pineapple",
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Shrimp paste",
    "Sugar",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Grilled fish",
    "Fried chicken",
    "Steamed rice"
  ],
  "note": "The East Kalimantan recipe cooks the chilli and alliums, then folds in pineapple pieces. Fresh fruit remains juicy against the warm savoury paste, balancing sweetness with acidity.",
  "src": [
    "https://budaya-indonesia.org/Sambal-Nanas-Kalimantan-Timur"
  ],
  "persona": [
    "The Bright Spark",
    "Lively and refreshing, you keep things moving."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Pineapple",
    "source": "https://budaya-indonesia.org/Sambal-Nanas-Kalimantan-Timur"
  }
},
{
  "id": "l172",
  "name": "Sambal Gami Cumi",
  "prov": "KI",
  "region": "Bontang, East Kalimantan",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 4,
  "p": [
    4,
    0,
    2,
    1,
    2,
    4
  ],
  "ing": [
    "Squid",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Tomato",
    "Lime",
    "Sugar",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Steamed rice",
    "Fresh cucumber",
    "Boiled greens"
  ],
  "note": "Squid cooks directly in a coarse chilli, tomato and allium mixture. This Bontang gami variation is moist and substantial, with seafood juices enriching the sauce around the tender pieces.",
  "src": [
    "https://budaya-indonesia.org/Sambal-Gami-Cumi-Bontang-Kalimantan-Timur"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Bontang; squid",
    "source": "https://budaya-indonesia.org/Sambal-Gami-Cumi-Bontang-Kalimantan-Timur"
  }
},
{
  "id": "l173",
  "name": "Sambal Woku",
  "prov": "SA",
  "region": "North Sulawesi",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 4,
  "p": [
    4,
    0,
    2,
    1,
    4,
    3
  ],
  "ing": [
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Ginger",
    "Turmeric",
    "Candlenuts",
    "Lemongrass",
    "Lemon basil",
    "Makrut lime leaf",
    "Lime",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Fish",
    "Chicken",
    "Steamed rice"
  ],
  "note": "Woku is an aromatic Minahasan seasoning, also used as a chilli-rich accompaniment. Turmeric, ginger and herbs give it a layered fragrance, with basil added late to retain its aroma.",
  "src": [
    "https://www.thejakartapost.com/news/2016/07/26/the-kick-minahasa-cuisine.html"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Red ginger, turmeric, candlenut, lemon basil",
    "source": "https://www.thejakartapost.com/news/2016/07/26/the-kick-minahasa-cuisine.html"
  }
},
{
  "id": "l174",
  "name": "Sambal Dabu-dabu Lilang",
  "prov": "SA",
  "region": "Manado, North Sulawesi",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 4,
  "p": [
    4,
    0,
    4,
    1,
    5,
    1
  ],
  "ing": [
    "Bird’s-eye chilli",
    "Shallot",
    "Tomato",
    "Lime",
    "Salt"
  ],
  "serve": [
    "Grilled fish",
    "Fried tofu",
    "Steamed rice"
  ],
  "note": "Lilang refers to the chopped character of this Manado relish. Small pieces of chilli, shallot and tomato mingle with lime juice, giving a fresh, acidic contrast to grilled fish.",
  "src": [
    "https://www.cookmeindonesian.com/nunuks-sambal-dabu-dabu-lilang-manado-chopped-chilli-lime-sambal-vegan/"
  ],
  "persona": [
    "The Fresh Perspective",
    "Aromatic and open, you bring a different point of view."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Chopped chilli with lime",
    "source": "https://www.cookmeindonesian.com/nunuks-sambal-dabu-dabu-lilang-manado-chopped-chilli-lime-sambal-vegan/"
  }
},
{
  "id": "l175",
  "name": "Sambal Pepaya Sulut",
  "prov": "SA",
  "region": "North Sulawesi",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 1,
  "p": [
    1,
    2,
    2,
    1,
    3,
    4
  ],
  "ing": [
    "Young papaya",
    "Kenari nuts",
    "Shallot",
    "Garlic",
    "Toasted shrimp paste",
    "Pepper",
    "Galangal",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Papeda",
    "Steamed rice"
  ],
  "note": "The archived North Sulawesi recipe uses shredded green papaya, kenari and pepper, with no chilli listed. Its character is gently peppery and nutty rather than a fiery red sambal.",
  "src": [
    "https://budaya-indonesia.org/Sambal-Pepaya-Sulawesi"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Papaya",
    "source": "https://budaya-indonesia.org/Sambal-Pepaya-Sulawesi"
  }
},
{
  "id": "l176",
  "name": "Sambal Ikan Sagela",
  "prov": "GO",
  "region": "Gorontalo",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 4,
  "p": [
    4,
    3,
    1,
    1,
    2,
    5
  ],
  "ing": [
    "Smoked sagela fish",
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Tomato",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Rice porridge",
    "Steamed rice",
    "Fried banana"
  ],
  "note": "Sagela is smoked fish used in Gorontalo's sambal tradition. Finely crushed flesh gives a dry, smoky savouriness that turns chilli seasoning into a substantial rice or porridge topping.",
  "src": [
    "https://budaya-indonesia.org/Sambal-Ikan-Sagela-Gorontalo-Gorontalo"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Smoked sagela fish",
    "source": "https://budaya-indonesia.org/Sambal-Ikan-Sagela-Gorontalo-Gorontalo"
  }
},
{
  "id": "l177",
  "name": "Sambal Ikan Teri Gorontalo",
  "prov": "GO",
  "region": "Gorontalo",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    2,
    1,
    1,
    2,
    4
  ],
  "ing": [
    "Anchovies",
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Tomato",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Steamed rice",
    "Boiled vegetables",
    "Fried eggs"
  ],
  "note": "This Gorontalo entry centres on fried anchovies mixed with cooked chilli seasoning. The small fish provide a salty bite, while softened tomato helps the paste coat them evenly.",
  "src": [
    "https://budaya-indonesia.org/Sambal-Ikan-Teri-Khas-Gorontalo-Gorontalo-Gorontalo"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Anchovies",
    "source": "https://budaya-indonesia.org/Sambal-Ikan-Teri-Khas-Gorontalo-Gorontalo-Gorontalo"
  }
},
{
  "id": "l178",
  "name": "Sambal Terung Bakar",
  "prov": "GO",
  "region": "Gorontalo",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 3,
  "p": [
    3,
    3,
    3,
    1,
    3,
    3
  ],
  "ing": [
    "Grilled eggplant",
    "Bird’s-eye chilli",
    "Shallot",
    "Toasted shrimp paste",
    "Sugar",
    "Salt",
    "Vinegar"
  ],
  "serve": [
    "Steamed rice",
    "Grilled fish",
    "Fried tofu"
  ],
  "note": "Grilled eggplant is mashed into fresh chilli seasoning in this Gorontalo recipe. Its soft, smoky flesh gives body, while a little vinegar brightens the terasi and alliums.",
  "src": [
    "https://budaya-indonesia.org/Sambal-Terung-Bakar-Gorontalo-Gorontalo"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Grilled eggplant",
    "source": "https://budaya-indonesia.org/Sambal-Terung-Bakar-Gorontalo-Gorontalo"
  }
},
{
  "id": "l179",
  "name": "Sambal Goreng Sapi",
  "prov": "GO",
  "region": "Gorontalo",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 4,
  "p": [
    4,
    0,
    1,
    2,
    2,
    5
  ],
  "ing": [
    "Beef",
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Tomato",
    "Lemongrass",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Steamed rice",
    "Buras",
    "Boiled greens"
  ],
  "note": "A Gorontalo beef sambal goreng, eaten as a small meat side dish. The beef is cooked until tender and coated with reduced chilli seasoning for a concentrated savoury finish.",
  "src": [
    "https://en.wikipedia.org/wiki/Gorontalese_cuisine"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Beef",
    "source": "https://en.wikipedia.org/wiki/Gorontalese_cuisine"
  }
},
{
  "id": "l180",
  "name": "Sambal Tappa",
  "prov": "SN",
  "region": "South Sulawesi",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 1,
  "p": [
    1,
    1,
    3,
    1,
    4,
    4
  ],
  "ing": [
    "Grilled fish",
    "Grated young mango",
    "Coconut milk",
    "Shallot",
    "Pepper",
    "Salt"
  ],
  "serve": [
    "Steamed rice",
    "Grilled fish",
    "Boiled vegetables"
  ],
  "note": "The archived South Sulawesi tappa recipe mixes grilled fish with squeezed grated mango and cooked thick coconut milk. Pepper supplies the warmth; chilli is not listed in this version.",
  "src": [
    "https://budaya-indonesia.org/Sambal-Tappa-Sulawesi-Selatan",
    "https://pdbifiles.nos.jkt-1.neo.id/files/2018/12/03/niasanny_SambalTappaSulsel-1.PNG"
  ],
  "persona": [
    "The Fresh Perspective",
    "Aromatic and open, you bring a different point of view."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "",
    "source": "https://budaya-indonesia.org/Sambal-Tappa-Sulawesi-Selatan"
  }
},
{
  "id": "l181",
  "name": "Sambal Buras",
  "prov": "SN",
  "region": "Makassar, South Sulawesi",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    1,
    1,
    1,
    2,
    4
  ],
  "ing": [
    "Tongkol or mackerel",
    "Red chilli",
    "Bird’s-eye chilli",
    "Tomato",
    "Shallot",
    "Garlic",
    "Sugar",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Buras",
    "Steamed rice",
    "Lontong"
  ],
  "note": "Cooked fish is crushed finely, then fried with a tomato-and-chilli paste until moist or nearly dry. Its rich fish flavour complements the mild coconut rice inside Makassar buras.",
  "src": [
    "https://budaya-indonesia.org/Sambal-Ikan-Sambal-Buras-Makassar-Sulawesi-Selatan"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Makassar; fish, eaten with buras",
    "source": "https://budaya-indonesia.org/Sambal-Ikan-Sambal-Buras-Makassar-Sulawesi-Selatan"
  }
},
{
  "id": "l182",
  "name": "Sambal Bakasang",
  "prov": "MA",
  "region": "Banda, Maluku",
  "locationAccuracy": "province",
  "style": "fermented",
  "heat": 4,
  "p": [
    4,
    5,
    4,
    1,
    3,
    4
  ],
  "ing": [
    "Bakasang (fermented fish)",
    "Smoked skipjack",
    "Roasted tomato",
    "Red chilli",
    "Shallot",
    "Ginger",
    "Limau",
    "Salt"
  ],
  "serve": [
    "Grilled fish",
    "Papeda",
    "Steamed rice"
  ],
  "note": "The Banda version combines fermented fish seasoning with smoked skipjack. Roasted tomato, ginger and citrus balance the strong marine flavour, creating a dense, pungent sambal.",
  "src": [
    "https://budaya-indonesia.org/Sambal-Bakasang-Banda-Maluku"
  ],
  "persona": [
    "The Deep Thinker",
    "Layered and distinctive, you reward a closer look."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Banda; bakasang (fermented fish)",
    "source": "https://budaya-indonesia.org/Sambal-Bakasang-Banda-Maluku"
  }
},
{
  "id": "l183",
  "name": "Sambal Ikan Bakar Manokwari",
  "prov": "PB",
  "region": "Manokwari, West Papua",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 5,
  "p": [
    5,
    0,
    0,
    0,
    4,
    0
  ],
  "ing": [
    "Bird’s-eye chilli",
    "Shallot",
    "Salt"
  ],
  "serve": [
    "Grilled tuna",
    "Steamed rice",
    "Boiled cassava"
  ],
  "note": "Manokwari-style grilled fish is topped with a simple raw chilli-and-shallot mixture. Without a sweet or creamy base, the fresh chilli gives a direct contrast to smoky fish.",
  "src": [
    "https://www.goodnewsfromindonesia.id/2026/08/11/ikan-bakar-manokwari-sajian-ikan-laut-dengan-sambal-pedas-khas-papua"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Raw bird’s-eye chilli, shallot, salt",
    "source": "https://www.goodnewsfromindonesia.id/2026/08/11/ikan-bakar-manokwari-sajian-ikan-laut-dengan-sambal-pedas-khas-papua"
  }
},
{
  "id": "l184",
  "name": "Sambal Colo-colo Timika",
  "prov": "PT",
  "region": "Timika, Central Papua",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 4,
  "p": [
    4,
    0,
    4,
    1,
    5,
    1
  ],
  "ing": [
    "Bird’s-eye chilli",
    "Shallot",
    "Young tomato",
    "Lime",
    "Salt"
  ],
  "serve": [
    "Grilled fish",
    "Papeda",
    "Steamed rice"
  ],
  "note": "This Timika colo-colo uses chopped chilli, shallot and young tomato in citrus juice. The relish stays loose and fresh, bringing acidity to grilled fish or soft sago dishes.",
  "src": [
    "https://www.goodnewsfromindonesia.id/2022/11/18/daftar-lengkap-makanan-khas-papua-dan-jajanan-oleh-oleh-5-provinsi"
  ],
  "persona": [
    "The Fresh Perspective",
    "Aromatic and open, you bring a different point of view."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Shallot, bird’s-eye chilli, young tomato, lime",
    "source": "https://www.goodnewsfromindonesia.id/2022/11/18/daftar-lengkap-makanan-khas-papua-dan-jajanan-oleh-oleh-5-provinsi"
  }
},
{
  "id": "l185",
  "name": "Sambal Dabu-dabu Papua",
  "prov": "PA",
  "region": "Biak, Papua",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 4,
  "p": [
    4,
    0,
    4,
    1,
    4,
    1
  ],
  "ing": [
    "Bird’s-eye chilli",
    "Tomato",
    "Makrut lime juice and peel",
    "Sugar",
    "Salt"
  ],
  "serve": [
    "Papeda",
    "Boiled taro",
    "Fried fish",
    "Tuna soup"
  ],
  "note": "The documented Biak household version pounds the chilli and adds both makrut lime juice and a small piece of peel. The peel contributes perfume and a slightly bitter edge.",
  "src": [
    "https://budaya-indonesia.org/Sambal-Dabu-Dabu-Papua-Papua"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "",
    "source": "https://budaya-indonesia.org/Sambal-Dabu-Dabu-Papua-Papua"
  }
},
{
  "id": "l186",
  "name": "Sambal Goreng Telur Ikan Bobara",
  "prov": "PA",
  "region": "Papua",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    2,
    3,
    1,
    2,
    4
  ],
  "ing": [
    "Bobara fish roe",
    "Bobara fish",
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Tomato",
    "Ginger",
    "Turmeric",
    "Tamarind",
    "Shrimp paste",
    "Palm sugar",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Steamed rice",
    "Boiled cassava",
    "Boiled greens"
  ],
  "note": "Fish and roe are seasoned with tamarind, fried, then coated in a cooked chilli-spice paste. The roe gives this Papua sambal a distinctive firm, crumbly richness.",
  "src": [
    "https://budaya-indonesia.org/Sambal-Goreng-Telur-Ikan-Bobara-Papua-Papua"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Bobara fish roe",
    "source": "https://budaya-indonesia.org/Sambal-Goreng-Telur-Ikan-Bobara-Papua-Papua"
  }
},
{
  "id": "l187",
  "name": "Sambal Tomat Terasi Merauke",
  "prov": "PS",
  "region": "Merauke, South Papua",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 4,
  "p": [
    4,
    3,
    3,
    2,
    2,
    3
  ],
  "ing": [
    "Tomato",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Toasted shrimp paste",
    "Makrut lime leaf",
    "Sugar",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Fried fish",
    "Steamed rice",
    "Boiled cassava"
  ],
  "note": "The Merauke entry fries tomato, chilli and alliums before pounding them with terasi. A lime leaf is crushed in for fragrance, giving the cooked paste a fresh aromatic finish.",
  "src": [
    "https://budaya-indonesia.org/Sambal-Tomat-Terasi-Merauke-Papua"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Merauke; tomato, terasi",
    "source": "https://budaya-indonesia.org/Sambal-Tomat-Terasi-Merauke-Papua"
  }
},
{
  "id": "l188",
  "name": "Sambal Ulek",
  "prov": "ID",
  "region": "Across Indonesia",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 4,
  "p": [
    4,
    0,
    0,
    0,
    4,
    0
  ],
  "ing": [
    "Red chilli",
    "Salt"
  ],
  "serve": [
    "Fried rice",
    "Noodle dishes",
    "Grilled fish"
  ],
  "note": "Ulek refers to grinding with a pestle. The simplest version is chilli crushed with salt, leaving a coarse paste that can be served directly or used as a cooking ingredient.",
  "src": [
    "W"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Raw chilli paste",
    "source": "W"
  }
},
{
  "id": "l189",
  "name": "Sambal Uyah-Lombok",
  "prov": "ID",
  "region": "Across Indonesia",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 5,
  "p": [
    5,
    0,
    0,
    0,
    4,
    0
  ],
  "ing": [
    "Bird’s-eye chilli",
    "Salt"
  ],
  "serve": [
    "Fried tempeh",
    "Steamed rice",
    "Fresh vegetables"
  ],
  "note": "Uyah means salt and lombok means chilli in Javanese. With only those essentials, the sambal expresses the chilli's own flavour and heat without sweetness, acidity or added fat.",
  "src": [
    "W"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Raw chilli and salt",
    "source": "W"
  }
},
{
  "id": "l190",
  "name": "Sambal Tomat",
  "prov": "ID",
  "region": "Across Indonesia",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    0,
    2,
    2,
    2,
    3
  ],
  "ing": [
    "Tomato",
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Sugar",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Fried chicken",
    "Fried tofu",
    "Steamed rice"
  ],
  "note": "Cooked tomato gives this widespread sambal a soft body and gentle sweetness. Reduce the mixture until spoonable, keeping enough moisture to balance the chilli and fried alliums.",
  "src": [
    "W"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Tomato and chilli cooked to a paste",
    "source": "W"
  }
},
{
  "id": "l191",
  "name": "Sambal Goreng",
  "prov": "ID",
  "region": "Across Indonesia",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    3,
    2,
    2,
    2,
    3
  ],
  "ing": [
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Shrimp paste",
    "Sugar",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Steamed rice",
    "Fried eggs",
    "Fried tofu"
  ],
  "note": "Goreng describes the frying method rather than one fixed recipe. This basic version cooks pounded chilli and alliums with terasi until the paste becomes fragrant and the oil begins to separate.",
  "src": [
    "W"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Fried shallot, chilli, terasi",
    "source": "W"
  }
},
{
  "id": "l192",
  "name": "Sambal Tumis",
  "prov": "ID",
  "region": "Across Indonesia",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    3,
    3,
    3,
    1,
    3
  ],
  "ing": [
    "Red chilli",
    "Shallot",
    "Garlic",
    "Belacan",
    "Tamarind",
    "Palm sugar",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Nasi lemak",
    "Boiled eggs",
    "Grilled seafood"
  ],
  "note": "Tumis means sautéed. Chilli and aromatics cook slowly with belacan, tamarind and sugar, producing a glossy paste whose sour-sweet balance suits rice, eggs and seafood.",
  "src": [
    "W"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Stir-fried with belacan and tamarind",
    "source": "W"
  }
},
{
  "id": "l193",
  "name": "Sambal Berandal",
  "prov": "ID",
  "region": "Across Indonesia",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    0,
    1,
    2,
    2,
    4
  ],
  "ing": [
    "Red chilli",
    "Bird’s-eye chilli",
    "Candlenuts",
    "Garlic",
    "Onion",
    "Sugar",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Fried chicken",
    "Steamed rice",
    "Fried tofu"
  ],
  "note": "Candlenuts give berandal a thick, rounded body while onion brings sweetness. Cooking the pounded mixture softens the raw allium bite and turns it into a rich chilli paste.",
  "src": [
    "W"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Candlenut, garlic, onion",
    "source": "W"
  }
},
{
  "id": "l194",
  "name": "Sambal Bengkoang",
  "prov": "ID",
  "region": "Across Indonesia",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 3,
  "p": [
    3,
    0,
    2,
    2,
    4,
    1
  ],
  "ing": [
    "Jicama (bengkoang)",
    "Bird’s-eye chilli",
    "Toasted shrimp paste",
    "Palm sugar",
    "Tamarind",
    "Salt"
  ],
  "serve": [
    "Fresh cucumber",
    "Fried tofu",
    "Grilled fish"
  ],
  "note": "Jicama adds cool crunch and mild sweetness to a chilli dressing. Keep it in fine shreds or small pieces so the sambal retains its fresh, vegetable-like texture.",
  "src": [
    "W"
  ],
  "persona": [
    "The Fresh Perspective",
    "Aromatic and open, you bring a different point of view."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Jicama",
    "source": "W"
  }
},
{
  "id": "l195",
  "name": "Sambal Pare",
  "prov": "ID",
  "region": "Across Indonesia",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    2,
    1,
    1,
    3,
    4
  ],
  "ing": [
    "Bitter gourd",
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Tomato",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Steamed rice",
    "Fried eggs",
    "Fried fish"
  ],
  "note": "Bitter gourd gives this vegetable sambal a deliberate bitter edge. Cooked chilli and sweet alliums soften the contrast while leaving the sliced gourd recognisable in the finished dish.",
  "src": [
    "W"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Bitter gourd",
    "source": "W"
  }
},
{
  "id": "l196",
  "name": "Sambal Petai",
  "prov": "ID",
  "region": "Across Indonesia",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    3,
    1,
    1,
    3,
    4
  ],
  "ing": [
    "Petai",
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Tomato",
    "Shrimp paste",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Steamed rice",
    "Fried fish",
    "Fried tofu"
  ],
  "note": "Petai's strong aroma and crisp bite define this sambal. The beans are folded through cooked chilli seasoning so they remain distinct rather than being pounded into the paste.",
  "src": [
    "W"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Petai",
    "source": "W"
  }
},
{
  "id": "l197",
  "name": "Sambal Rujak",
  "prov": "ID",
  "region": "Across Indonesia",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 2,
  "p": [
    2,
    2,
    4,
    5,
    4,
    1
  ],
  "ing": [
    "Palm sugar",
    "Tamarind",
    "Bird’s-eye chilli",
    "Toasted shrimp paste",
    "Salt"
  ],
  "serve": [
    "Young mango",
    "Jicama",
    "Pineapple",
    "Cucumber"
  ],
  "note": "Rujak dressing balances palm-sugar sweetness with tamarind and chilli. The thick paste clings to fresh fruit, while a little terasi gives the sweet-sour mixture a savoury undertone.",
  "src": [
    "W"
  ],
  "persona": [
    "The Warm Welcome",
    "Generous and rounded, you help people feel at home."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Palm sugar, tamarind",
    "source": "W"
  }
},
{
  "id": "l198",
  "name": "Sambal Jamur",
  "prov": "ID",
  "region": "Across Indonesia",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    0,
    1,
    1,
    3,
    4
  ],
  "ing": [
    "Oyster mushrooms",
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Tomato",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Steamed rice",
    "Fried tofu",
    "Boiled greens"
  ],
  "note": "Oyster mushrooms are torn and cooked until their moisture reduces, then coated in chilli seasoning. Their soft, fibrous texture makes this a substantial vegetable sambal.",
  "src": [
    "W"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Oyster mushroom",
    "source": "W"
  }
},
{
  "id": "l199",
  "name": "Sambal Cumi",
  "prov": "ID",
  "region": "Across Indonesia",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 4,
  "p": [
    4,
    1,
    1,
    1,
    2,
    4
  ],
  "ing": [
    "Squid",
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Tomato",
    "Lime",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Steamed rice",
    "Boiled vegetables",
    "Cucumber"
  ],
  "note": "Squid contributes a firm bite and marine sweetness to cooked chilli paste. This profile uses fresh squid; salted-squid versions are more intensely salty and need different seasoning.",
  "src": [
    "W"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Squid",
    "source": "W"
  }
},
{
  "id": "l200",
  "name": "Sambal Goreng Teri Kacang",
  "prov": "ID",
  "region": "Across Indonesia",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    2,
    1,
    3,
    2,
    5
  ],
  "ing": [
    "Anchovies",
    "Peanuts",
    "Red chilli",
    "Shallot",
    "Garlic",
    "Palm sugar",
    "Tamarind",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Steamed rice",
    "Nasi uduk",
    "Omelette"
  ],
  "note": "Fried anchovies and peanuts are coated with a reduced sweet-hot chilli paste. Letting the paste thicken before mixing helps preserve the crisp contrast between fish and nuts.",
  "src": [
    "W"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Anchovies, peanuts",
    "source": "W"
  }
},
{
  "id": "l201",
  "name": "Sambal Goreng Kering Tempe",
  "prov": "ID",
  "region": "Across Indonesia",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 2,
  "p": [
    2,
    1,
    2,
    4,
    2,
    4
  ],
  "ing": [
    "Tempeh",
    "Red chilli",
    "Shallot",
    "Garlic",
    "Palm sugar",
    "Tamarind",
    "Galangal",
    "Salam leaf",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Nasi kuning",
    "Nasi uduk",
    "Steamed rice"
  ],
  "note": "Thin fried tempeh is tossed in a reduced chilli-and-palm-sugar coating. Kering signals a drier preparation, with crisp pieces and a sweet, tangy finish rather than a wet sauce.",
  "src": [
    "W"
  ],
  "persona": [
    "The Warm Welcome",
    "Generous and rounded, you help people feel at home."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Tempeh",
    "source": "W"
  }
},
{
  "id": "l202",
  "name": "Sambal Goreng Kentang",
  "prov": "ID",
  "region": "Across Indonesia",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    0,
    1,
    2,
    2,
    4
  ],
  "ing": [
    "Potato",
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Galangal",
    "Salam leaf",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Ketupat",
    "Opor ayam",
    "Steamed rice"
  ],
  "note": "Fried potato cubes absorb a cooked red-chilli seasoning. This familiar sambal goreng can be served as a vegetable side, with the potato remaining in pieces rather than becoming a paste.",
  "src": [
    "B"
  ],
  "persona": [
    "The Comfort Seeker",
    "Rich and grounding, you appreciate the satisfying details."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Potato",
    "source": "B"
  }
},
{
  "id": "l203",
  "name": "Sambal Peda",
  "prov": "ID",
  "region": "Across Indonesia",
  "locationAccuracy": "province",
  "style": "fermented",
  "heat": 4,
  "p": [
    4,
    3,
    2,
    1,
    3,
    4
  ],
  "ing": [
    "Peda (salted fermented fish)",
    "Green chilli",
    "Shallot",
    "Garlic",
    "Tomato",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Steamed rice",
    "Boiled greens",
    "Cucumber"
  ],
  "note": "Peda supplies a strong salty, fermented fish flavour. Green chilli and alliums brighten the cooked mixture, so a modest portion is enough to season a generous serving of rice.",
  "src": [
    "B"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Peda fish, green chilli",
    "source": "B"
  }
},
{
  "id": "l204",
  "name": "Sambal Goreng Ikan Asin",
  "prov": "ID",
  "region": "Across Indonesia",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 4,
  "p": [
    4,
    3,
    1,
    1,
    2,
    4
  ],
  "ing": [
    "Salted fish",
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Tomato",
    "Sugar",
    "Oil"
  ],
  "serve": [
    "Steamed rice",
    "Sayur bening",
    "Cucumber"
  ],
  "note": "Fried salted fish is coated with a cooked chilli-and-tomato paste. The fish provides most of the salt, while tomato and a little sugar round its concentrated savouriness.",
  "src": [
    "B"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Salted fish",
    "source": "B"
  }
},
{
  "id": "l205",
  "name": "Sambal Teri Asam",
  "prov": "ID",
  "region": "Across Indonesia",
  "locationAccuracy": "province",
  "style": "cooked",
  "heat": 3,
  "p": [
    3,
    2,
    4,
    1,
    2,
    4
  ],
  "ing": [
    "Anchovies",
    "Red chilli",
    "Bird’s-eye chilli",
    "Shallot",
    "Garlic",
    "Tamarind",
    "Sugar",
    "Salt",
    "Oil"
  ],
  "serve": [
    "Steamed rice",
    "Fried tofu",
    "Boiled greens"
  ],
  "note": "Tamarind gives this anchovy sambal a clear sour note. Reduce the chilli paste before folding in the fish, balancing its saltiness with acidity and just a little sweetness.",
  "src": [
    "B"
  ],
  "persona": [
    "The Bright Spark",
    "Lively and refreshing, you keep things moving."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Anchovies",
    "source": "B"
  }
},
{
  "id": "l206",
  "name": "Sambal Mentah",
  "prov": "ID",
  "region": "Across Indonesia",
  "locationAccuracy": "province",
  "style": "raw",
  "heat": 4,
  "p": [
    4,
    3,
    3,
    1,
    4,
    1
  ],
  "ing": [
    "Bird’s-eye chilli",
    "Red chilli",
    "Shallot",
    "Tomato",
    "Toasted shrimp paste",
    "Limau",
    "Salt"
  ],
  "serve": [
    "Lalapan",
    "Fried fish",
    "Fried chicken"
  ],
  "note": "Mentah describes a fresh sambal whose chilli and aromatics are not cooked. This representative terasi version is pounded just before eating, with tomato and citrus keeping it juicy.",
  "src": [
    "B"
  ],
  "persona": [
    "The Firestarter",
    "Direct and spirited, you bring energy to the table."
  ],
  "profileBasis": "Source-informed representative version; pairings and flavour scores are editorial.",
  "sourceRecord": {
    "ingredient": "Raw sambal",
    "source": "B"
  }
}
);
