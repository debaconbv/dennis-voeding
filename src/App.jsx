import { useState } from "react";

// ── MFP data ──
const MFP_TODAY = {
  datum: "dinsdag 3 maart 2026",
  doel: { kcal: 1920, eiwit: 96, koolhydraten: 240, vet: 64 },
  maaltijden: [
    { naam: "Ontbijt", items: [
      { naam: "Simply platte kaas 0%", hoeveelheid: "100 g", kcal: 51, koolhydraten: 5, vet: 0, eiwit: 7 },
      { naam: "Blauwe bessen (AH)", hoeveelheid: "50 g", kcal: 26, koolhydraten: 6, vet: 0, eiwit: 0 },
      { naam: "Holie Granola protein peanut butter", hoeveelheid: "50 g", kcal: 234, koolhydraten: 14, vet: 14, eiwit: 10 },
    ]},
    { naam: "Middageten", items: [
      { naam: "Zelfgemaakt – Aubergines met tomatensaus", hoeveelheid: "1 portie", kcal: 265, koolhydraten: 0, vet: 0, eiwit: 0 },
      { naam: "Kippengehakt Delhaize", hoeveelheid: "100 g", kcal: 174, koolhydraten: 2, vet: 11, eiwit: 17 },
      { naam: "Rijst", hoeveelheid: "100 g", kcal: 366, koolhydraten: 79, vet: 1, eiwit: 7 },
    ]},
    { naam: "Avondeten", items: [
      { naam: "Lecker – Vegetarische Tajine", hoeveelheid: "1.5 portie", kcal: 315, koolhydraten: 47, vet: 3, eiwit: 24 },
    ]},
    { naam: "Tussendoortjes", items: [
      { naam: "Bretoense koekjes", hoeveelheid: "1 koekje", kcal: 100, koolhydraten: 0, vet: 0, eiwit: 0 },
    ]},
  ],
};

const totaal = MFP_TODAY.maaltijden.reduce(
  (acc, m) => { m.items.forEach(i => { acc.kcal += i.kcal; acc.eiwit += i.eiwit; acc.koolhydraten += i.koolhydraten; acc.vet += i.vet; }); return acc; },
  { kcal: 0, eiwit: 0, koolhydraten: 0, vet: 0 }
);

// ── HelloFresh ──
const HELLOFRESH = [
  {
    id: "hf1", naam: "Noedels met kipgehakt", subtitle: "Zoete Aziatische saus", emoji: "🍜",
    kcal: 568, eiwit: 32, categorie: "Avondeten", color: "#e65100", bgColor: "#fff3e0",
    tijd: "20 min", porties: 2,
  },
  {
    id: "hf2", naam: "Bibimbap bowl met rundergehakt", subtitle: "Kimchisaus, spiegelei", emoji: "🍚",
    kcal: 631, eiwit: 38, categorie: "Avondeten", color: "#1565c0", bgColor: "#e3f2fd",
    tijd: "25 min", porties: 2,
  },
];

// ── Receptenbundel ──
const RECEPTEN = [
  // ONTBIJT
  { id: "r01", naam: "Cottage cheese pancakes", emoji: "🥞", categorie: ["Ontbijt", "Snack"], tijd: "12 min", eiwit: 18, kcal: 280, porties: 2,
    ingredienten: ["4 el havermout", "100 g cottage cheese", "2 eieren", "snuifje kaneel"],
    stappen: ["Doe alle ingrediënten in een kom en mix goed door.", "Verhit pan op middelhoog vuur.", "Bak een grote eetlepel per keer, spreid uit. Bak 2 min per kant.","Werk af met vers fruit of coulis."],
    tip: "Werk af met vers fruit of coulis van diepgevroren vruchten." },
  { id: "r02", naam: "Eiwitrijke wafeltjes", emoji: "🧇", categorie: ["Ontbijt"], tijd: "25 min", eiwit: 22, kcal: 390, porties: 4,
    ingredienten: ["3 el plantaardige melk", "450 g magere platte kaas", "300 g havermout", "6 eieren", "2 appels in stukjes", "1 tl kaneel", "arachideolie"],
    stappen: ["Klop eieren samen met melk tot luchtige massa.", "Roer havermout, platte kaas en kaneel onder het eiermengsel. Laat 30 min rusten.", "Meng stukjes appel onder het deeg.", "Verhit wafelijzer, vet in met olie. Bak wafels goudbruin.", "Serveer eventueel met vers fruit."],
    tip: "Laat het deeg 30 min rusten voor betere textuur." },
  { id: "r03", naam: "Platte kaas met seizoensfruit", emoji: "🫐", categorie: ["Ontbijt"], tijd: "5 min", eiwit: 15, kcal: 220, porties: 1,
    ingredienten: ["magere of halfvolle platte kaas", "handje seizoensfruit", "handje granola"],
    stappen: ["Vul een kommetje met yoghurt of platte kaas.", "Maak fruit schoon en meng.", "Werk af met granola."],
    tip: "Kies yoghurt/platte kaas zonder toegevoegde suikers." },
  { id: "r04", naam: "Overnight oats", emoji: "🌾", categorie: ["Ontbijt"], tijd: "5 min (+ nacht)", eiwit: 10, kcal: 320, porties: 1,
    ingredienten: ["3-4 el havermout", "1 tl chiazaad", "125 ml melk naar keuze", "2 el yoghurt", "½ geplette banaan", "blauwe besjes", "snuifje kaneel"],
    stappen: ["Meng alle ingrediënten in een kom of glazen pot.", "Zet in koelkast, minimaal 4 uur, liefst een nachtje.", "Roer nog eens goed door voor het serveren."],
    tip: "Variatie: voeg geraspte worteltjes en rozijnen toe voor carrot cake oats!" },
  { id: "r05", naam: "Custard toast", emoji: "🍞", categorie: ["Ontbijt"], tijd: "20 min", eiwit: 14, kcal: 260, porties: 1,
    ingredienten: ["bevroren zomerfruit", "4 el platte kaas of yoghurt natuur", "1 ei", "scheut vanille-extract", "1 tl ahornsiroop"],
    stappen: ["Meng kwark met ei en vanille-extract. Voeg ahornsiroop naar smaak toe.", "Besmeer volkoren boterhammen met mengsel.", "Strooi frambozen en blauwe bessen eroverheen.", "Zet 15 min in oven op 220°C. Laatste minuutjes even grillen."],
    tip: "Ook lekker met perzik!" },
  { id: "r06", naam: "Snelle omelet in een mok", emoji: "🍳", categorie: ["Ontbijt"], tijd: "8 min", eiwit: 16, kcal: 180, porties: 1,
    ingredienten: ["2 eieren", "1 handje spinazie", "wat kerstomaatjes", "scheutje melk", "1 el geraspte light kaas", "peper en zout"],
    stappen: ["Breek ei in mok, voeg spinazie, tomaat, melk, kaas, zout en peper toe.", "Dek af met keukenpapier.", "Zet in microgolfoven 3 min op hoogste stand."],
    tip: "Eindeloos te variëren met groenten, kaas en kruiden!" },
  { id: "r07", naam: "Bananenbrood", emoji: "🍌", categorie: ["Ontbijt", "Snack"], tijd: "55 min", eiwit: 8, kcal: 210, porties: 10,
    ingredienten: ["150 g havermout, fijngemixt", "70 g havermeel", "1 el bakpoeder", "snuifje zout", "4 eieren", "3 rijpe bananen", "2 el pindakaas (100% pinda's)", "1 hand pecannoten"],
    stappen: ["Verwarm oven op 180°C.", "Meng droge ingrediënten in mengkom.", "Mix eieren, bananen en pindakaas. Voeg toe aan droge ingrediënten.", "Voeg pecannoten toe, meng. Giet in cakevorm.", "Bak 45 min in voorverwarmde oven."],
    tip: "Rijpere bananen = meer smaak." },

  // LUNCH
  { id: "r08", naam: "Club sandwich kip & hummus", emoji: "🥪", categorie: ["Lunch"], tijd: "15 min", eiwit: 35, kcal: 480, porties: 2,
    ingredienten: ["6 sneetjes volkoren brood", "1 rode paprika", "2 kipfilets", "4 el hummus", "zongedroogde tomaatjes", "30 g rucola"],
    stappen: ["Rooster boterhammen.", "Gril paprika 3-5 min per kant, snijd in reepjes.", "Snijd kipfilet in dunne plakjes.", "Besmeer boterhammen met hummus, beleg met rucola.", "Verdeel kip en paprika. Stapel. Prik vast met cocktailprikkers."],
    tip: "Weinig tijd? Gebruik gegrilde paprika uit een bokaal." },
  { id: "r09", naam: "Toast ricotta, zalm & spinazie", emoji: "🐟", categorie: ["Ontbijt", "Lunch"], tijd: "10 min", eiwit: 22, kcal: 310, porties: 1,
    ingredienten: ["2 sneetjes volkoren brood", "60 g ricotta", "peper en zout", "handje spinazie", "plakjes komkommer", "2 plakjes gerookte zalm", "½ citroen", "kiemgroenten", "verse dille"],
    stappen: ["Toast boterhammen krokant.", "Besmeer met ricotta, kruid met peper en zout.", "Beleg met spinazie, komkommer en zalm.", "Druppel citroen erover.", "Werk af met kiemgroenten en dille."],
    tip: "" },
  { id: "r10", naam: "Quesadilla's met peulvruchten", emoji: "🫘", categorie: ["Lunch", "Avondeten"], tijd: "30 min", eiwit: 20, kcal: 420, porties: 4,
    ingredienten: ["200 g flespompoen in blokjes", "1 el olijfolie", "½ tl gerookte paprikapoeder", "400 g rode kidneybonen", "8 volkoren tortillawraps", "1 bosje lente-ui", "2 tomaten", "100 g geraspte light kaas"],
    stappen: ["Verwarm oven op 220°C. Rooster pompoen 25 min. Stamp fijn.", "Leg 4 tortillas op werkblad. Bestrijk met pompoenpuree, beleg met kidneybonen, tomaatjes en lente-ui.", "Bestrooi met kaas; leg tortilla erbovenop.", "Bak quesadilla's goudbruin in grillpan. Snijd in vieren."],
    tip: "Vervang kidneybonen door kipblokjes voor extra eiwit." },
  { id: "r11", naam: "Wrap cottage cheese & kip", emoji: "🌯", categorie: ["Lunch"], tijd: "15 min", eiwit: 28, kcal: 380, porties: 2,
    ingredienten: ["2 wortelen", "1 grote tomaat", "60 g radijzen", "2 handjes slamix", "100 g cottage cheese", "2 tl currypoeder", "100 g kipfilet", "2 tl olie", "1 tl paprikapoeder", "2 volkoren wraps", "1 blikje maïs"],
    stappen: ["Schil en rasp wortelen, snijd tomaat en radijzen.", "Meng cottage cheese met helft currypoeder, kruid met peper en zout.", "Snijd kip in blokjes. Bak met currypoeder, paprikapoeder, peper en zout, 5 min.", "Besmeer wraps met cottage cheese. Beleg met groenten en kip."],
    tip: "" },
  { id: "r12", naam: "Wrap tonijn & mango", emoji: "🥭", categorie: ["Lunch"], tijd: "15 min", eiwit: 25, kcal: 340, porties: 1,
    ingredienten: ["100 g tonijn", "¼ mango", "1 lente-uitje", "bosje koriander", "1 tl mayonaise", "1 el magere natuur yoghurt", "ijsbergsla", "1 volkoren wrap"],
    stappen: ["Laat tonijn uitlekken. Snijd mango in stukjes.", "Meng tonijn met mayonaise en yoghurt. Voeg lente-ui, koriander en mango toe.", "Leg sla op wrap. Verdeel mango-tonijnmengsel. Rol op."],
    tip: "" },
  { id: "r13", naam: "Pulled chicken", emoji: "🍗", categorie: ["Lunch", "Avondeten"], tijd: "15 min", eiwit: 40, kcal: 200, porties: 2,
    ingredienten: ["1 liter kippenbouillon", "200-250 g kipfilet", "specerijen: currypoeder, paprikapoeder, lookpoeder"],
    stappen: ["Breng bouillon aan de kook. Gaar kipfilet 12-15 min.", "Haal kip uit water, trek met twee vorken in repen.", "Kruid met specerijen naar keuze."],
    tip: "Breng op smaak met ajuin, look, currykruiden en tomatenblokjes." },
  { id: "r14", naam: "Kip-currysalade", emoji: "🥗", categorie: ["Lunch"], tijd: "20 min", eiwit: 32, kcal: 350, porties: 2,
    ingredienten: ["500 ml kippenbouillon", "250 g kipfilet", "2 el mayonaise", "2 el magere Griekse yoghurt", "2 tl madras curry", "snufje chilivlokken", "1 appel", "1 lente-ui", "bladpeterselie"],
    stappen: ["Breng kippenbouillon aan de kook. Gaar kipfilet 5-10 min. Laat afkoelen en trek in hapklare stukjes.", "Meng kip met evenveel mayonaise als yoghurt.", "Kruid met curry en chilivlokken.", "Voeg appelstukjes en lente-ui toe. Kruid naar smaak."],
    tip: "Lekker op een volkoren pistolet." },
  { id: "r15", naam: "Salade ricotta, paprika & linzen", emoji: "🥗", categorie: ["Lunch", "Avondeten"], tijd: "30 min", eiwit: 18, kcal: 320, porties: 4,
    ingredienten: ["500 g kerstomaatjes", "2 el olijfolie", "2 tl Italiaanse kruiden", "250 g ricotta", "400 g linzen", "2 rode paprika's", "100 g veldsla", "2 el balsamicoazijn", "50 g pecannoten"],
    stappen: ["Verwarm oven op 200°C. Rooster tomaten en paprika met olie en kruiden.", "Stort ricotta in midden ovenschaal. Bak 20 min.", "Verdeel veldsla, giet helft balsamicoazijn.", "Meng linzen door tomaten/paprika. Verdeel over sla. Brokkel ricotta eroverheen.", "Garneer met pecannoten."],
    tip: "Geen fan van linzen? Gebruik pasta of bulgur." },
  { id: "r16", naam: "Parelcouscoussalade met kikkererwten", emoji: "🥙", categorie: ["Lunch"], tijd: "30 min", eiwit: 16, kcal: 480, porties: 2,
    ingredienten: ["130 g zoete aardappel", "130 g parelcouscous", "½ bouillonblokje", "250 g kikkererwten", "2 el olijfolie", "peper en zout", "1 tl paprikapoeder", "2 rode bietjes", "2 handjes rucola", "30 g gemengde noten", "50 g witte kaas"],
    stappen: ["Verwarm oven op 200°C. Kook zoete aardappel 10 min.", "Kook parelcouscous met bouillonblokje. Spoel af.", "Marineer kikkererwten met olie, peper, zout, paprikapoeder. Bak 15 min in oven.", "Meng bietjes, rucola, noten, kaas, zoete aardappel, couscous en kikkererwten."],
    tip: "" },
  { id: "r17", naam: "Zomerse maaltijdsalade met feta", emoji: "🍉", categorie: ["Lunch"], tijd: "15 min", eiwit: 14, kcal: 380, porties: 4,
    ingredienten: ["150 g volkoren couscous", "1 komkommer", "250 g watermeloen", "150 g light feta", "verse munt", "1 handje pecannoten", "4 handjes rucola", "olijfolie", "balsamicoazijn"],
    stappen: ["Maak couscous klaar volgens verpakking.", "Meng komkommer, watermeloen, feta, munt en pecannoten.", "Voeg couscous toe.", "Leg sla op bord, schep couscous salade eroverheen. Besprenkel met olijfolie en balsamicoazijn."],
    tip: "" },
  { id: "r18", naam: "Salade met scampi's & curryvinaigrette", emoji: "🦐", categorie: ["Lunch", "Avondeten"], tijd: "15 min", eiwit: 22, kcal: 290, porties: 4,
    ingredienten: ["1 el olijfolie", "1 teentje knoflook", "400 g scampi's", "currypoeder", "1 bussel waterkers", "rucola", "2 Granny Smith appels", "250 g kerstomaten", "3 el mayonaise", "1 tl currypoeder", "1 tl honing"],
    stappen: ["Verhit olie, stoof look aan.", "Kruid scampi's, bak gaar. Voeg currypoeder toe.", "Meng waterkers, kervel en rucola.", "Voeg appelreepjes en kerstomaatjes toe.", "Meng dressing: mayonaise, curry, honing, water, walnootolie, ciderazijn.", "Serveer salade met scampi's en vinaigrette."],
    tip: "" },

  // AVONDETEN
  { id: "r19", naam: "Groene shakshuka met ei", emoji: "🥚", categorie: ["Avondeten"], tijd: "30 min", eiwit: 20, kcal: 280, porties: 2,
    ingredienten: ["100 g sperziebonen", "200 g spinazie", "150 g boerenkool", "1 venkelknol", "1 courgette", "100 g sugarsnaps", "½ tl komijn", "½ tl chilivlokken", "2 el pesto", "3 eieren", "4 el geraspte lightkaas"],
    stappen: ["Kook sperziebonen en sugarsnaps even voor.", "Bak venkel, courgette, sugarsnaps en sperziebonen tot beetgaar.", "Voeg specerijen en bladgroentes toe, bak mee.", "Roer pesto erdoor. Maak 3 kuiltjes en breek eieren erin.", "Zet vuur laag, strooi kaas erover. Bak tot eieren gaar zijn."],
    tip: "" },
  { id: "r20", naam: "Bagel chicken", emoji: "🍗", categorie: ["Avondeten"], tijd: "20 min", eiwit: 38, kcal: 320, porties: 4,
    ingredienten: ["500 g kippenhaasjes", "1 el magere Griekse yoghurt", "1 el mayonaise", "2 el mosterd", "2 tl wit sesamzaad", "2 tl zwart sesamzaad", "2 tl maanzaad"],
    stappen: ["Verwarm oven op 190°C.", "Leg kippenhaasjes op bakpapier.", "Roer yoghurt, mayonaise en mosterd tot sausje.", "Meng sesam- en maanzaad.", "Bestrijk kippenhaasjes met saus. Strooi zaadjes erover.", "Bak 15 min in de oven."],
    tip: "Lekker bij groenten of salade." },
  { id: "r21", naam: "Snel eenpansgerecht met kip", emoji: "🍲", categorie: ["Avondeten"], tijd: "15 min", eiwit: 30, kcal: 360, porties: 4,
    ingredienten: ["300 g kipfiletreepjes", "800 g gesneden groenten (Mexicaans/Italiaans)", "400 g Pomodoritomaten uit blik", "200 g witte bonen", "2 el cottage cheese", "1 el paprikapoeder", "1 el currypoeder"],
    stappen: ["Verhit pan op hoog vuur, bak kip aan.", "Voeg groenten toe zodra kip wit is.", "Schep 2 min om.", "Voeg tomatenblokjes, bonen en kruiden toe.", "Verwarm 3 min op hoog vuur.", "Serveer met lepel cottage cheese."],
    tip: "Vervang kip door vegetarische kippenreepjes voor veggie versie." },
  { id: "r22", naam: "Kalkoengyros", emoji: "🌮", categorie: ["Avondeten"], tijd: "25 min", eiwit: 38, kcal: 450, porties: 4,
    ingredienten: ["2 rode ajuinen", "2 rode en 2 gele paprika's", "2 tl harissapasta", "1 el paprikapoeder", "1 tl kurkuma", "2 tl komijn", "70 g tomatenconcentraat", "500 g kalkoenfilet in reepjes", "200 g zilvervliesrijst", "400 g diepvrieserwten", "400 g passata"],
    stappen: ["Meng ui, paprika, harissa, specerijen en tomatenconcentraat. Voeg kalkoenreepjes toe.", "Kook rijst in groentebouillon, voeg laatste 2 min erwten toe.", "Bak kalkoenreepjes in anti-kleefpan. Voeg passata toe, 10 min pruttelen.", "Serveer met lente-ui."],
    tip: "" },
  { id: "r23", naam: "Mediterraanse zalm uit de oven", emoji: "🐟", categorie: ["Avondeten"], tijd: "35 min", eiwit: 36, kcal: 510, porties: 2,
    ingredienten: ["1 courgette", "1 aubergine", "1 paprika", "4 aardappels", "2 zalmfilets", "150 g cherrytomaten", "2 el olijfolie", "3 tl Italiaanse kruiden", "1 rode ui"],
    stappen: ["Verwarm oven op 200°C. Snijd groenten in plakjes.", "Verdeel in ovenschaal met cherrytomaten en olijfolie. Bestrooi met kruiden.", "Zet 10 min in oven.", "Leg zalm op groenten. Bestrooi met rest olie en kruiden.", "Bak nog 15-20 min."],
    tip: "" },
  { id: "r24", naam: "Courgettenlasagne ricotta & zalm", emoji: "🫑", categorie: ["Avondeten"], tijd: "35 min", eiwit: 34, kcal: 490, porties: 2,
    ingredienten: ["courgettes", "ricotta", "gerookte zalm", "kerstomaten", "Italiaanse kruiden", "olijfolie"],
    stappen: ["Verwarm oven op 200°C. Snijd courgette in dunne plakjes.", "Maak laagjes: courgette, ricotta, zalm. Herhaal.", "Bestrooi met kruiden, olijfolie.", "Bak 25-30 min tot goudbruin."],
    tip: "" },
  { id: "r25", naam: "Chili sin/con carne", emoji: "🌶️", categorie: ["Avondeten"], tijd: "35 min", eiwit: 28, kcal: 420, porties: 4,
    ingredienten: ["2 rode ajuinen", "2 teentjes knoflook", "½ chilipeper", "2 gele paprika's", "400 g runds/veggie gehakt of zwarte bonen", "150 g maïs", "400 g kidneybonen", "400 g tomatenblokjes", "400 g passata", "1 grote zoete aardappel", "1 tl komijn", "1 el paprikapoeder", "4 el Griekse yoghurt"],
    stappen: ["Stoof ui, knoflook en chilipeper in olijfolie. Voeg paprika toe.", "Voeg vlees/zwarte bonen toe en bak.", "Voeg maïs, kidneybonen, tomatenblokjes, passata en zoete aardappel toe. Kruid.", "Laat 15-20 min sudderen.", "Serveer met Griekse yoghurt en koriander."],
    tip: "" },
  { id: "r26", naam: "Vegan gehakt parmentier", emoji: "🥔", categorie: ["Avondeten"], tijd: "35 min", eiwit: 16, kcal: 380, porties: 4,
    ingredienten: ["4 pastinaken", "3 aardappelen", "2 rode ajuinen", "2 wortelen", "3 stengels selder", "1 rode paprika", "800 g tomatenblokjes", "400 g bruine linzen", "scheut havermelk", "amandelschilfers"],
    stappen: ["Schil en snijd pastinaken en aardappelen. Stoom gaar in 15 min.", "Snipper ui, look, wortelen, selder en paprika.", "Stoof ui en knoflook. Voeg groenten en kruiden toe, 10 min.", "Voeg tomaten, tomatenconcentraat en linzen toe.", "Pureer pastinaken met havermelk. Giet saus in ovenschotel, strijk puree erover. Gril 5 min."],
    tip: "" },
  { id: "r27", naam: "Vegetarische curry met kikkererwten", emoji: "🍛", categorie: ["Avondeten"], tijd: "40 min", eiwit: 18, kcal: 410, porties: 4,
    ingredienten: ["2 el olijfolie", "2 ajuinen", "3 cm gember", "1 el currypoeder", "1 grote zoete aardappel", "600 g kikkererwten", "400 ml light kokosmelk", "400 g tomatenblokjes", "400 g verse spinazie", "4 el Griekse yoghurt", "verse koriander"],
    stappen: ["Bak in olie: ajuin, knoflook, gember met currypoeder en chili.", "Voeg kikkererwten toe, bak 10 min.", "Voeg zoete aardappel, kokosmelk, tomaten, bouillon en water toe. Laat 25 min pruttelen.", "Voeg laatste 5 min spinazie toe.", "Serveer met yoghurt, koriander en krokante kikkererwten."],
    tip: "Krokante kikkererwten: marineer extra kikkererwten met olie, komijn, chili en bak 15 min op 220°C." },
  { id: "r28", naam: "Zoetzure rijst met tofu & ananas", emoji: "🧆", categorie: ["Avondeten"], tijd: "35 min", eiwit: 18, kcal: 430, porties: 4,
    ingredienten: ["240 g volkoren rijst", "400 g tofu", "4 lente-uitjes", "2 komkommers", "6 schijven ananas", "2 el zoete chilisaus", "3 el sojasaus", "1 tl paprikapoeder", "½ tl chilipoeder"],
    stappen: ["Kook rijst volgens aanwijzing.", "Meng marinade: sojasaus, paprikapoeder, chilipoeder.", "Laat tofu uitlekken, snijd in blokjes, marineer en koel.", "Snijd lente-ui, komkommer en ananas.", "Bak tofu goudbruin in wok (~6 min). Voeg lente-ui, komkommer, ananas en chilisaus toe. Bak 3 min.", "Serveer over rijst met koriander en sesamzaad."],
    tip: "" },

  // SNACK
  { id: "r29", naam: "Edamame boontjes", emoji: "🫛", categorie: ["Snack"], tijd: "5 min", eiwit: 8, kcal: 100, porties: 1,
    ingredienten: ["edamame bonen, diepvries", "fleur de sel of grof zeezout"],
    stappen: ["Kook edamame 3 min in kokend water.", "Laat afkoelen.", "Strooi zeezout of fleur de sel over."],
    tip: "" },
];

// ── Smeersalades as sub-options ──
const SMEERSALADES = [
  { naam: "Eiersalade", ingredienten: ["4 eieren", "1 tl mosterd", "2 el Griekse yoghurt", "1 klein sjalotje", "paprikapoeder", "bieslook"] },
  { naam: "Zalmsalade", ingredienten: ["200 g gerookte zalm", "200 g Griekse yoghurt", "1 tl mosterd", "bieslook", "limoensap"] },
  { naam: "Tonijnsalade", ingredienten: ["100 g tonijn blik", "1 el mosterd", "2 el platte kaas", "rode ui"] },
  { naam: "Komkommer-zalm dip", ingredienten: ["¼ komkommer", "120 g Griekse yoghurt", "100 g gerookte zalm", "verse dille"] },
  { naam: "Hummus", ingredienten: ["400 g kikkererwten", "1 el tahin", "citroensap", "knoflook", "komijn"] },
];

const DAGEN = ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"];
const MAALTIJD_TYPES = ["Ontbijt", "Lunch", "Avondeten"];

// ── HELPERS ──
const MacroBar = ({ label, value, doel, unit = "g", color }) => {
  const pct = Math.min((value / doel) * 100, 110);
  const over = value > doel;
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 3 }}>
        <span style={{ fontWeight: 600 }}>{label}</span>
        <span style={{ color: over ? "#c62828" : "#555" }}>{value}{unit} / {doel}{unit}</span>
      </div>
      <div style={{ background: "#e8f5e9", borderRadius: 6, height: 8, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: over ? "#e53935" : color, borderRadius: 6, transition: "width 0.4s" }} />
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState("vandaag");
  const [expandMaaltijd, setExpandMaaltijd] = useState({});
  const [activeMeal, setActiveMeal] = useState(0);
  const [expandRecept, setExpandRecept] = useState(null);
  const [filterCat, setFilterCat] = useState("Alles");
  const [zoekterm, setZoekterm] = useState("");

  // Weekplanner state
  const [weekplan, setWeekplan] = useState(() => {
    const plan = {};
    DAGEN.forEach(dag => {
      plan[dag] = { Ontbijt: null, Lunch: null, Avondeten: null };
    });
    return plan;
  });
  const [selectingSlot, setSelectingSlot] = useState(null); // { dag, maaltijdType }
  const [customInput, setCustomInput] = useState("");
  const [customEiwit, setCustomEiwit] = useState("");
  const [plannerTab, setPlannerTab] = useState("week"); // week | dag
  const [activePlannerDag, setActivePlannerDag] = useState("Maandag");

  const resterend = { kcal: MFP_TODAY.doel.kcal - totaal.kcal, eiwit: MFP_TODAY.doel.eiwit - totaal.eiwit };
  const eiwitPct = Math.round((totaal.eiwit / MFP_TODAY.doel.eiwit) * 100);
  const barColor = eiwitPct >= 100 ? "#2e7d32" : eiwitPct >= 70 ? "#f57c00" : "#c62828";

  const allMenuItems = [
    ...RECEPTEN.map(r => ({ type: "recept", id: r.id, naam: r.naam, emoji: r.emoji, eiwit: r.eiwit, kcal: r.kcal, categorie: r.categorie })),
    ...HELLOFRESH.map(h => ({ type: "hellofresh", id: h.id, naam: h.naam, emoji: h.emoji, eiwit: h.eiwit, kcal: h.kcal, categorie: [h.categorie] })),
  ];

  const selectMeal = (item) => {
    if (!selectingSlot) return;
    const { dag, maaltijdType } = selectingSlot;
    setWeekplan(prev => ({ ...prev, [dag]: { ...prev[dag], [maaltijdType]: { ...item } } }));
    setSelectingSlot(null);
    setCustomInput("");
    setCustomEiwit("");
  };

  const clearSlot = (dag, type) => setWeekplan(prev => ({ ...prev, [dag]: { ...prev[dag], [type]: null } }));

  const dagTotaalEiwit = (dag) => MAALTIJD_TYPES.reduce((sum, t) => sum + (weekplan[dag][t]?.eiwit || 0), 0);

  const receptCategorieen = ["Alles", "Ontbijt", "Lunch", "Avondeten", "Snack"];
  const gefilterdeRecepten = RECEPTEN.filter(r => {
    const catOk = filterCat === "Alles" || r.categorie.includes(filterCat);
    const zoekOk = !zoekterm || r.naam.toLowerCase().includes(zoekterm.toLowerCase());
    return catOk && zoekOk;
  });

  const tabs = [
    { id: "vandaag", label: "📊 Vandaag" },
    { id: "weekplanner", label: "📅 Weekplanner" },
    { id: "recepten", label: "📖 Recepten" },
    { id: "hellofresh", label: "📦 HelloFresh" },
    { id: "eiwitgids", label: "💪 Eiwitgids" },
  ];

  return (
    <div style={{ fontFamily: "Georgia, serif", maxWidth: 600, margin: "0 auto", background: "#f1f8e9", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #2e7d32, #43a047)", padding: "20px 16px 12px", color: "white" }}>
        <div style={{ fontSize: 22, fontWeight: "bold" }}>🥦 Dennis Voeding</div>
        <div style={{ fontSize: 13, opacity: 0.85, marginTop: 2 }}>Persoonlijk voedingsplan · Gezondheidspraktijk JIJ</div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", background: "#1b5e20", overflowX: "auto", scrollbarWidth: "none" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            style={{ flex: "none", padding: "10px 12px", background: "none", border: "none", cursor: "pointer",
              color: activeTab === t.id ? "#a5d6a7" : "rgba(255,255,255,0.7)", fontWeight: activeTab === t.id ? "bold" : "normal",
              fontSize: 12, borderBottom: activeTab === t.id ? "2px solid #a5d6a7" : "2px solid transparent",
              whiteSpace: "nowrap", fontFamily: "Georgia, serif" }}>
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ padding: "16px 14px 40px" }}>

        {/* ── TAB: VANDAAG ── */}
        {activeTab === "vandaag" && (
          <div>
            <div style={{ background: "#1565c0", color: "white", borderRadius: 8, padding: "8px 12px", marginBottom: 14, fontSize: 12, display: "flex", alignItems: "center", gap: 8 }}>
              <span>📱</span>
              <span><strong>MyFitnessPal</strong> · darko44 · {MFP_TODAY.datum}</span>
            </div>

            {/* Eiwit spotlight */}
            <div style={{ background: "white", borderRadius: 12, padding: 16, marginBottom: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
              <div style={{ textAlign: "center", marginBottom: 12 }}>
                <div style={{ fontSize: 13, color: "#666", marginBottom: 4 }}>Eiwit vandaag</div>
                <div style={{ fontSize: 42, fontWeight: "bold", color: barColor, lineHeight: 1 }}>{totaal.eiwit}g</div>
                <div style={{ fontSize: 14, color: "#888" }}>van {MFP_TODAY.doel.eiwit}g doel · {eiwitPct}%</div>
                {resterend.eiwit > 0 && <div style={{ fontSize: 13, color: "#f57c00", marginTop: 4 }}>nog {resterend.eiwit}g nodig</div>}
              </div>
              <div style={{ background: "#e8f5e9", borderRadius: 8, height: 14, overflow: "hidden", marginBottom: 10 }}>
                <div style={{ width: `${Math.min(eiwitPct, 100)}%`, height: "100%", background: barColor, borderRadius: 8, transition: "width 0.4s" }} />
              </div>
              <MacroBar label="Calorieën" value={totaal.kcal} doel={MFP_TODAY.doel.kcal} unit=" kcal" color="#43a047" />
              <MacroBar label="Koolhydraten" value={totaal.koolhydraten} doel={MFP_TODAY.doel.koolhydraten} color="#1565c0" />
              <MacroBar label="Vet" value={totaal.vet} doel={MFP_TODAY.doel.vet} color="#f57c00" />
            </div>

            {/* HelloFresh suggestie */}
            {resterend.eiwit > 0 && (() => {
              const suggestie = HELLOFRESH.reduce((best, m) => Math.abs(m.eiwit - resterend.eiwit) < Math.abs(best.eiwit - resterend.eiwit) ? m : best);
              return (
                <div style={{ background: suggestie.bgColor, border: `1px solid ${suggestie.color}30`, borderRadius: 10, padding: 12, marginBottom: 14 }}>
                  <div style={{ fontSize: 12, color: suggestie.color, fontWeight: "bold", marginBottom: 4 }}>💡 HelloFresh suggestie vanavond</div>
                  <div style={{ fontWeight: "bold" }}>{suggestie.emoji} {suggestie.naam}</div>
                  <div style={{ fontSize: 13, color: "#555" }}>+{suggestie.eiwit}g eiwit → totaal ~{totaal.eiwit + suggestie.eiwit}g</div>
                </div>
              );
            })()}

            {/* Maaltijden */}
            {MFP_TODAY.maaltijden.map((m, i) => {
              const mTotaal = m.items.reduce((a, it) => ({ kcal: a.kcal + it.kcal, eiwit: a.eiwit + it.eiwit }), { kcal: 0, eiwit: 0 });
              return (
                <div key={i} style={{ background: "white", borderRadius: 10, marginBottom: 10, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
                  <div onClick={() => setExpandMaaltijd(p => ({ ...p, [i]: !p[i] }))}
                    style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 14px", cursor: "pointer" }}>
                    <div>
                      <div style={{ fontWeight: "bold", fontSize: 15 }}>{m.naam}</div>
                      <div style={{ fontSize: 12, color: "#888" }}>{mTotaal.kcal} kcal · {mTotaal.eiwit}g eiwit</div>
                    </div>
                    <span style={{ fontSize: 18, color: "#43a047" }}>{expandMaaltijd[i] ? "▲" : "▼"}</span>
                  </div>
                  {expandMaaltijd[i] && (
                    <div style={{ borderTop: "1px solid #f0f0f0", padding: "8px 14px 12px" }}>
                      {m.items.map((it, j) => (
                        <div key={j} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: j < m.items.length - 1 ? "1px solid #f5f5f5" : "none", fontSize: 13 }}>
                          <div><div>{it.naam}</div><div style={{ color: "#aaa", fontSize: 11 }}>{it.hoeveelheid}</div></div>
                          <div style={{ textAlign: "right", color: "#555" }}>
                            <div>{it.kcal} kcal</div>
                            <div style={{ color: "#2e7d32", fontWeight: "bold" }}>{it.eiwit}g P</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── TAB: WEEKPLANNER ── */}
        {activeTab === "weekplanner" && (
          <div>
            <div style={{ background: "white", borderRadius: 10, padding: 14, marginBottom: 14, boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
              <div style={{ fontWeight: "bold", fontSize: 16, marginBottom: 4 }}>📅 Weekplanner</div>
              <div style={{ fontSize: 13, color: "#666" }}>Plan je maaltijden voor de week. Kies uit recepten, HelloFresh of typ zelf iets in.</div>
            </div>

            {/* Sub-tabs */}
            <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
              {["week", "dag"].map(t => (
                <button key={t} onClick={() => setPlannerTab(t)}
                  style={{ padding: "7px 16px", borderRadius: 20, border: "none", cursor: "pointer", fontFamily: "Georgia, serif", fontSize: 13,
                    background: plannerTab === t ? "#2e7d32" : "#e8f5e9", color: plannerTab === t ? "white" : "#2e7d32", fontWeight: plannerTab === t ? "bold" : "normal" }}>
                  {t === "week" ? "🗓️ Weekoverzicht" : "📋 Per dag"}
                </button>
              ))}
            </div>

            {/* Weekoverzicht */}
            {plannerTab === "week" && (
              <div>
                {DAGEN.map(dag => {
                  const dagEiwit = dagTotaalEiwit(dag);
                  const pct = Math.min(Math.round((dagEiwit / 96) * 100), 100);
                  return (
                    <div key={dag} style={{ background: "white", borderRadius: 10, padding: 12, marginBottom: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <div style={{ fontWeight: "bold", fontSize: 15 }}>{dag}</div>
                        <div style={{ fontSize: 12, color: dagEiwit >= 96 ? "#2e7d32" : "#f57c00", fontWeight: "bold" }}>{dagEiwit}g eiwit</div>
                      </div>
                      <div style={{ background: "#e8f5e9", borderRadius: 4, height: 6, marginBottom: 8 }}>
                        <div style={{ width: `${pct}%`, height: "100%", background: pct >= 100 ? "#2e7d32" : pct >= 70 ? "#f57c00" : "#c62828", borderRadius: 4 }} />
                      </div>
                      <div style={{ display: "flex", gap: 6 }}>
                        {MAALTIJD_TYPES.map(type => {
                          const slot = weekplan[dag][type];
                          return (
                            <div key={type} onClick={() => !slot && setSelectingSlot({ dag, maaltijdType: type })}
                              style={{ flex: 1, background: slot ? "#e8f5e9" : "#fafafa", border: "1px dashed " + (slot ? "#43a047" : "#ccc"),
                                borderRadius: 8, padding: "8px 6px", cursor: slot ? "default" : "pointer", minHeight: 60 }}>
                              <div style={{ fontSize: 10, color: "#888", marginBottom: 3, fontWeight: "bold" }}>{type.slice(0,4).toUpperCase()}</div>
                              {slot ? (
                                <div>
                                  <div style={{ fontSize: 11, fontWeight: "bold", lineHeight: 1.3 }}>{slot.emoji} {slot.naam.length > 18 ? slot.naam.slice(0, 17) + "…" : slot.naam}</div>
                                  <div style={{ fontSize: 10, color: "#2e7d32" }}>{slot.eiwit}g P</div>
                                  <button onClick={(e) => { e.stopPropagation(); clearSlot(dag, type); }}
                                    style={{ marginTop: 4, fontSize: 9, color: "#e53935", background: "none", border: "none", cursor: "pointer", padding: 0 }}>✕ verwijder</button>
                                </div>
                              ) : (
                                <div style={{ fontSize: 11, color: "#bbb", textAlign: "center", paddingTop: 8 }}>+ toevoegen</div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Per dag */}
            {plannerTab === "dag" && (
              <div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                  {DAGEN.map(d => (
                    <button key={d} onClick={() => setActivePlannerDag(d)}
                      style={{ padding: "5px 12px", borderRadius: 16, border: "none", cursor: "pointer", fontFamily: "Georgia, serif", fontSize: 12,
                        background: activePlannerDag === d ? "#2e7d32" : "#e8f5e9", color: activePlannerDag === d ? "white" : "#333" }}>
                      {d.slice(0, 2)}
                    </button>
                  ))}
                </div>
                <div style={{ fontWeight: "bold", fontSize: 18, marginBottom: 14 }}>{activePlannerDag}</div>
                {MAALTIJD_TYPES.map(type => {
                  const slot = weekplan[activePlannerDag][type];
                  const recept = slot?.type === "recept" ? RECEPTEN.find(r => r.id === slot.id) : null;
                  return (
                    <div key={type} style={{ background: "white", borderRadius: 12, padding: 14, marginBottom: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                        <div style={{ fontWeight: "bold", fontSize: 16 }}>{type}</div>
                        <div style={{ display: "flex", gap: 8 }}>
                          {slot && <button onClick={() => clearSlot(activePlannerDag, type)}
                            style={{ fontSize: 12, color: "#e53935", background: "none", border: "1px solid #e53935", borderRadius: 12, padding: "3px 8px", cursor: "pointer", fontFamily: "Georgia, serif" }}>Verwijder</button>}
                          <button onClick={() => setSelectingSlot({ dag: activePlannerDag, maaltijdType: type })}
                            style={{ fontSize: 12, color: "white", background: "#2e7d32", border: "none", borderRadius: 12, padding: "3px 10px", cursor: "pointer", fontFamily: "Georgia, serif" }}>
                            {slot ? "Wijzig" : "+ Voeg toe"}
                          </button>
                        </div>
                      </div>
                      {slot ? (
                        <div>
                          <div style={{ fontSize: 15, fontWeight: "bold", marginBottom: 4 }}>{slot.emoji} {slot.naam}</div>
                          <div style={{ fontSize: 13, color: "#555" }}>{slot.eiwit}g eiwit · {slot.kcal} kcal</div>
                          {recept && (
                            <div>
                              <button onClick={() => setExpandRecept(expandRecept === `${activePlannerDag}-${type}` ? null : `${activePlannerDag}-${type}`)}
                                style={{ marginTop: 8, fontSize: 12, color: "#2e7d32", background: "#e8f5e9", border: "none", borderRadius: 10, padding: "4px 10px", cursor: "pointer", fontFamily: "Georgia, serif" }}>
                                {expandRecept === `${activePlannerDag}-${type}` ? "▲ Verberg recept" : "▼ Toon recept"}
                              </button>
                              {expandRecept === `${activePlannerDag}-${type}` && (
                                <div style={{ marginTop: 10 }}>
                                  <div style={{ fontSize: 13, fontWeight: "bold", marginBottom: 4, color: "#1b5e20" }}>Ingrediënten</div>
                                  <ul style={{ margin: "0 0 10px", paddingLeft: 18 }}>
                                    {recept.ingredienten.map((ing, i) => <li key={i} style={{ fontSize: 13, marginBottom: 2 }}>{ing}</li>)}
                                  </ul>
                                  <div style={{ fontSize: 13, fontWeight: "bold", marginBottom: 4, color: "#1b5e20" }}>Bereiding</div>
                                  {recept.stappen.map((s, i) => (
                                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, fontSize: 13 }}>
                                      <span style={{ background: "#2e7d32", color: "white", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0 }}>{i + 1}</span>
                                      <span>{s}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div style={{ color: "#ccc", fontSize: 14, textAlign: "center", padding: "10px 0" }}>Nog niet gepland</div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Weekoverzicht eiwit */}
            <div style={{ background: "white", borderRadius: 12, padding: 14, marginTop: 4, boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
              <div style={{ fontWeight: "bold", marginBottom: 10, fontSize: 14, color: "#1b5e20" }}>📊 Eiwitoverzicht week</div>
              {DAGEN.map(dag => {
                const e = dagTotaalEiwit(dag);
                const pct = Math.min((e / 96) * 100, 100);
                return (
                  <div key={dag} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{ width: 70, fontSize: 12, color: "#555" }}>{dag.slice(0, 3)}</span>
                    <div style={{ flex: 1, background: "#e8f5e9", borderRadius: 4, height: 10 }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: pct >= 100 ? "#2e7d32" : pct >= 70 ? "#f57c00" : "#ccc", borderRadius: 4 }} />
                    </div>
                    <span style={{ fontSize: 12, width: 45, textAlign: "right", color: e >= 96 ? "#2e7d32" : "#f57c00", fontWeight: "bold" }}>{e}g</span>
                  </div>
                );
              })}
              <div style={{ fontSize: 11, color: "#aaa", marginTop: 6 }}>Doel: 96g eiwit per dag</div>
            </div>
          </div>
        )}

        {/* ── TAB: RECEPTEN ── */}
        {activeTab === "recepten" && (
          <div>
            <div style={{ background: "white", borderRadius: 10, padding: 12, marginBottom: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
              <input value={zoekterm} onChange={e => setZoekterm(e.target.value)} placeholder="🔍 Zoek recept..."
                style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid #ddd", fontFamily: "Georgia, serif", fontSize: 14, boxSizing: "border-box", marginBottom: 10 }} />
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {receptCategorieen.map(c => (
                  <button key={c} onClick={() => setFilterCat(c)}
                    style={{ padding: "5px 12px", borderRadius: 16, border: "none", cursor: "pointer", fontFamily: "Georgia, serif", fontSize: 12,
                      background: filterCat === c ? "#2e7d32" : "#e8f5e9", color: filterCat === c ? "white" : "#333" }}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ fontSize: 12, color: "#888", marginBottom: 10 }}>{gefilterdeRecepten.length} recepten</div>

            {gefilterdeRecepten.map(r => (
              <div key={r.id} style={{ background: "white", borderRadius: 12, marginBottom: 10, overflow: "hidden", boxShadow: "0 1px 6px rgba(0,0,0,0.07)" }}>
                <div onClick={() => setExpandRecept(expandRecept === r.id ? null : r.id)}
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", cursor: "pointer" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{ fontSize: 28 }}>{r.emoji}</span>
                    <div>
                      <div style={{ fontWeight: "bold", fontSize: 14 }}>{r.naam}</div>
                      <div style={{ fontSize: 12, color: "#888" }}>{r.tijd} · {r.categorie.join(", ")}</div>
                      <div style={{ display: "flex", gap: 8, marginTop: 3 }}>
                        <span style={{ background: "#e8f5e9", color: "#2e7d32", fontSize: 11, padding: "2px 7px", borderRadius: 10, fontWeight: "bold" }}>{r.eiwit}g P</span>
                        <span style={{ background: "#f3f3f3", color: "#777", fontSize: 11, padding: "2px 7px", borderRadius: 10 }}>{r.kcal} kcal</span>
                      </div>
                    </div>
                  </div>
                  <span style={{ fontSize: 16, color: "#aaa" }}>{expandRecept === r.id ? "▲" : "▼"}</span>
                </div>

                {expandRecept === r.id && (
                  <div style={{ borderTop: "1px solid #f0f0f0", padding: "12px 14px" }}>
                    <div style={{ marginBottom: 10 }}>
                      <div style={{ fontSize: 13, fontWeight: "bold", color: "#1b5e20", marginBottom: 5 }}>Ingrediënten ({r.porties} {r.porties === 1 ? "portie" : "porties"})</div>
                      <ul style={{ margin: 0, paddingLeft: 18 }}>
                        {r.ingredienten.map((ing, i) => <li key={i} style={{ fontSize: 13, marginBottom: 2 }}>{ing}</li>)}
                      </ul>
                    </div>
                    <div style={{ marginBottom: 10 }}>
                      <div style={{ fontSize: 13, fontWeight: "bold", color: "#1b5e20", marginBottom: 5 }}>Bereiding</div>
                      {r.stappen.map((s, i) => (
                        <div key={i} style={{ display: "flex", gap: 8, marginBottom: 7, fontSize: 13 }}>
                          <span style={{ background: "#2e7d32", color: "white", borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0 }}>{i + 1}</span>
                          <span style={{ lineHeight: 1.5 }}>{s}</span>
                        </div>
                      ))}
                    </div>
                    {r.tip && <div style={{ background: "#fff8e1", borderRadius: 8, padding: 10, fontSize: 13, color: "#795548" }}>💡 {r.tip}</div>}

                    {/* Add to planner button */}
                    <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid #f0f0f0" }}>
                      <div style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>Toevoegen aan weekplanner:</div>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {DAGEN.map(dag => (
                          MAALTIJD_TYPES.filter(t => r.categorie.includes(t) || r.categorie.includes("Snack")).map(type => (
                            <button key={dag + type} onClick={() => {
                              setWeekplan(prev => ({ ...prev, [dag]: { ...prev[dag], [type]: { type: "recept", id: r.id, naam: r.naam, emoji: r.emoji, eiwit: r.eiwit, kcal: r.kcal } } }));
                            }} style={{ padding: "4px 9px", borderRadius: 10, border: "1px solid #43a047", background: weekplan[dag][type]?.id === r.id ? "#2e7d32" : "white",
                              color: weekplan[dag][type]?.id === r.id ? "white" : "#2e7d32", fontSize: 11, cursor: "pointer", fontFamily: "Georgia, serif" }}>
                              {dag.slice(0, 2)} {type.slice(0, 1)}
                            </button>
                          ))
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── TAB: HELLOFRESH ── */}
        {activeTab === "hellofresh" && (
          <div>
            <div style={{ background: "white", borderRadius: 10, padding: 12, marginBottom: 14, boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
              <div style={{ fontWeight: "bold", fontSize: 15, marginBottom: 4 }}>📦 HelloFresh deze week</div>
              <div style={{ fontSize: 13, color: "#666" }}>2 recepten · 4 porties totaal · thuisbezorgd met ingrediënten</div>
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
              {HELLOFRESH.map((m, i) => (
                <button key={m.id} onClick={() => setActiveMeal(i)}
                  style={{ flex: 1, padding: "9px 8px", borderRadius: 10, border: `2px solid ${activeMeal === i ? m.color : "#ddd"}`,
                    background: activeMeal === i ? m.bgColor : "white", cursor: "pointer", fontFamily: "Georgia, serif" }}>
                  <div style={{ fontSize: 20, marginBottom: 3 }}>{m.emoji}</div>
                  <div style={{ fontSize: 11, fontWeight: "bold", color: m.color, lineHeight: 1.3 }}>{m.naam}</div>
                </button>
              ))}
            </div>
            {(() => {
              const m = HELLOFRESH[activeMeal];
              const fullRecept = HELLOFRESH_FULL[activeMeal];
              return (
                <div style={{ background: m.bgColor, border: `1px solid ${m.color}30`, borderRadius: 12, padding: 14 }}>
                  <div style={{ fontSize: 20, fontWeight: "bold", color: m.color, marginBottom: 4 }}>{m.emoji} {m.naam}</div>
                  <div style={{ fontSize: 13, color: "#666", marginBottom: 10 }}>{m.subtitle}</div>
                  <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                    {[["⚡", m.kcal + " kcal"], ["💪", m.eiwit + "g eiwit"], ["👥", m.porties + " porties"]].map(([e, v]) => (
                      <div key={v} style={{ background: "white", borderRadius: 8, padding: "6px 10px", fontSize: 13, color: m.color }}><strong>{e}</strong> {v}</div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ── TAB: EIWITGIDS ── */}
        {activeTab === "eiwitgids" && (
          <div>
            <div style={{ background: "white", borderRadius: 12, padding: 14, marginBottom: 14, boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
              <div style={{ fontWeight: "bold", fontSize: 16, marginBottom: 6 }}>💪 Portieadvies</div>
              <div style={{ background: "#e8f5e9", borderRadius: 8, padding: 10, marginBottom: 8 }}>
                <div style={{ fontSize: 14 }}>🖐️ <strong>1-2 handpalmen</strong> eiwitbron per maaltijd</div>
                <div style={{ fontSize: 13, color: "#666", marginTop: 3 }}>3 tot 4 keer per dag · ~0.8g per kg lichaamsgewicht</div>
              </div>
            </div>
            {[
              { label: "🥩 Dierlijk", items: [
                { naam: "Kipfilet / -borst", emoji: "🍗", rating: "⭐", tip: "Magerste dierlijke optie" },
                { naam: "Gerookte zalm", emoji: "🐟", rating: "⭐", tip: "Ook rijk aan omega-3" },
                { naam: "Cottage cheese", emoji: "🫙", rating: "⭐", tip: "Veelzijdig in recepten" },
                { naam: "Griekse yoghurt (0%)", emoji: "🥛", rating: "⭐", tip: "Goed als snack of basis" },
                { naam: "Eieren", emoji: "🥚", rating: "✅", tip: "Perfect compleet eiwit" },
                { naam: "Tonijn (eigen nat)", emoji: "🐟", rating: "✅", tip: "Goedkoop en handig" },
              ]},
              { label: "🌱 Plantaardig", items: [
                { naam: "Linzen", emoji: "🫘", rating: "⭐", tip: "Ook rijk aan vezels" },
                { naam: "Kikkererwten", emoji: "🫘", rating: "⭐", tip: "Hummus of geroosterd" },
                { naam: "Tofu / tempeh", emoji: "🟫", rating: "✅", tip: "Marineer voor meer smaak" },
                { naam: "Edamame", emoji: "🫛", rating: "✅", tip: "Snel klaar als snack" },
                { naam: "Kidneybonen", emoji: "🫘", rating: "✅", tip: "Goed in chili of wrap" },
              ]},
            ].map(g => (
              <div key={g.label} style={{ background: "white", borderRadius: 12, padding: 14, marginBottom: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
                <div style={{ fontWeight: "bold", fontSize: 15, marginBottom: 10 }}>{g.label}</div>
                {g.items.map((it, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: i < g.items.length - 1 ? "1px solid #f5f5f5" : "none" }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <span style={{ fontSize: 22 }}>{it.emoji}</span>
                      <div>
                        <div style={{ fontSize: 14 }}>{it.naam}</div>
                        <div style={{ fontSize: 11, color: "#888" }}>{it.tip}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: 16 }}>{it.rating}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── MODAL: Meal selector ── */}
      {selectingSlot && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }}
          onClick={() => setSelectingSlot(null)}>
          <div onClick={e => e.stopPropagation()}
            style={{ background: "white", borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 600, maxHeight: "85vh", overflow: "auto", padding: "20px 16px 30px" }}>
            <div style={{ fontWeight: "bold", fontSize: 17, marginBottom: 4 }}>
              {selectingSlot.dag} · {selectingSlot.maaltijdType}
            </div>
            <div style={{ fontSize: 13, color: "#888", marginBottom: 14 }}>Kies een maaltijd of voeg iets zelf in</div>

            {/* Zelf ingeven */}
            <div style={{ background: "#f9f9f9", borderRadius: 10, padding: 12, marginBottom: 14 }}>
              <div style={{ fontWeight: "bold", fontSize: 13, marginBottom: 8 }}>✏️ Zelf ingeven</div>
              <input value={customInput} onChange={e => setCustomInput(e.target.value)} placeholder="Naam van maaltijd..."
                style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid #ddd", fontFamily: "Georgia, serif", fontSize: 14, boxSizing: "border-box", marginBottom: 8 }} />
              <div style={{ display: "flex", gap: 8 }}>
                <input value={customEiwit} onChange={e => setCustomEiwit(e.target.value)} placeholder="Eiwit (g)" type="number"
                  style={{ flex: 1, padding: "8px 10px", borderRadius: 8, border: "1px solid #ddd", fontFamily: "Georgia, serif", fontSize: 14 }} />
                <button onClick={() => { if (customInput.trim()) selectMeal({ type: "custom", id: "custom-" + Date.now(), naam: customInput.trim(), emoji: "🍽️", eiwit: parseInt(customEiwit) || 0, kcal: 0 }); }}
                  style={{ padding: "8px 18px", background: "#2e7d32", color: "white", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "Georgia, serif", fontWeight: "bold" }}>
                  Voeg toe
                </button>
              </div>
            </div>

            {/* HelloFresh */}
            <div style={{ fontWeight: "bold", fontSize: 13, marginBottom: 8, color: "#1565c0" }}>📦 HelloFresh</div>
            {HELLOFRESH.map(m => (
              <div key={m.id} onClick={() => selectMeal({ type: "hellofresh", id: m.id, naam: m.naam, emoji: m.emoji, eiwit: m.eiwit, kcal: m.kcal })}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: m.bgColor,
                  border: `1px solid ${m.color}30`, borderRadius: 10, marginBottom: 8, cursor: "pointer" }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{ fontSize: 22 }}>{m.emoji}</span>
                  <div><div style={{ fontWeight: "bold", fontSize: 14 }}>{m.naam}</div><div style={{ fontSize: 12, color: "#666" }}>{m.subtitle}</div></div>
                </div>
                <span style={{ fontSize: 13, color: m.color, fontWeight: "bold" }}>{m.eiwit}g P</span>
              </div>
            ))}

            {/* Recepten */}
            <div style={{ fontWeight: "bold", fontSize: 13, marginBottom: 8, color: "#2e7d32", marginTop: 6 }}>📖 Recepten</div>
            {RECEPTEN
              .filter(r => selectingSlot && (r.categorie.includes(selectingSlot.maaltijdType) || r.categorie.includes("Snack") || r.categorie.length === 1))
              .map(r => (
                <div key={r.id} onClick={() => selectMeal({ type: "recept", id: r.id, naam: r.naam, emoji: r.emoji, eiwit: r.eiwit, kcal: r.kcal })}
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: "#fafafa",
                    border: "1px solid #e8e8e8", borderRadius: 10, marginBottom: 6, cursor: "pointer" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{ fontSize: 22 }}>{r.emoji}</span>
                    <div>
                      <div style={{ fontWeight: "bold", fontSize: 14 }}>{r.naam}</div>
                      <div style={{ fontSize: 12, color: "#888" }}>{r.tijd} · {r.categorie.join(", ")}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: 13, color: "#2e7d32", fontWeight: "bold" }}>{r.eiwit}g P</span>
                </div>
              ))}

            <button onClick={() => setSelectingSlot(null)}
              style={{ width: "100%", marginTop: 12, padding: "12px", background: "#f5f5f5", border: "none", borderRadius: 10, cursor: "pointer", fontFamily: "Georgia, serif", fontSize: 14, color: "#555" }}>
              Annuleer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const HELLOFRESH_FULL = [null, null]; // placeholder
