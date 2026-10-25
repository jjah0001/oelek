"use strict";
// Personality quiz questions and answer weights.
const QUIZ = [
 {q:"Saturday morning. You are…",o:[["At the market early for the freshest catch",[0,0,1,0,2,0]],["Sleeping in, then a slow sweet breakfast",[0,0,0,2,0,1]],["On a motorbike to somewhere new",[2,0,0,0,1,0]],["Starting something that cooks all day",[0,1,0,0,0,2]]]},
 {q:"Pick a drink.",o:[["Es jeruk, iced lime",[0,0,2,0,1,0]],["Teh manis, sweet hot tea",[0,0,0,2,0,1]],["Kopi tubruk, black and thick",[1,1,0,0,0,1]],["Jamu kunyit asam",[0,1,1,0,1,0]]]},
 {q:"In an argument you…",o:[["Say it straight, right away",[2,0,1,0,0,0]],["Smooth things over",[0,0,0,2,0,1]],["Stew quietly, then say everything",[0,2,0,0,0,1]],["Crack a joke to clear the air",[0,0,0,0,2,0]]]},
 {q:"Your friends call you…",o:[["The loud one",[2,0,0,0,0,0]],["The reliable one",[0,0,0,1,0,2]],["The eccentric one",[1,2,0,0,0,0]],["A breath of fresh air",[0,0,1,0,2,0]]]},
 {q:"A smell that makes you happy.",o:[["Shallots frying",[0,0,0,1,0,2]],["Lime peel",[0,0,2,0,1,0]],["Terasi toasting",[0,3,0,0,0,0]],["Fish on a charcoal grill",[1,1,0,0,0,1]]]},
 {q:"Pick a place.",o:[["A Bali beach at dusk",[1,0,0,0,2,0]],["The Bukittinggi highlands",[0,0,0,0,0,2]],["Ambon harbour",[0,0,2,0,1,0]],["A Jogja night market",[0,0,0,2,0,1]]]},
 {q:"Honestly, your chilli tolerance is…",o:[["Black pepper makes me cry",[0,0,0,2,0,0]],["A little kick is nice",[1,0,0,1,0,0]],["Properly pedas",[3,0,0,0,0,0]],["Level 30, please",[5,0,0,0,0,0]]]},
 {q:"Leftovers?",o:[["Cold, straight from the fridge",[0,1,1,0,0,0]],["Better the next day",[0,1,0,0,0,2]],["Never. Fresh only.",[0,0,0,0,3,0]],["Turned into something new",[1,0,0,1,0,0]]]}
];
