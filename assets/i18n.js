/* ===========================================================================
   The Courthouse — Slovak dictionary
   Loaded on every page as a classic <script> in <head>, before support.js.

   HOW IT WORKS
   ------------
   Markup carries the ENGLISH copy inline plus a `data-i18n="<key>"`. On
   language switch, applyLang() swaps textContent to the Slovak value here.
   English is therefore never listed in this file — the markup is the English
   source of truth, and a missing key simply falls back to it.

   For translatable ATTRIBUTES (aria-label, alt, title) use
   `data-i18n-attr="aria-label:nav.menu"`.

   NOT EVERYTHING LIVES HERE. Content rendered through <sc-for> (membership
   tiers, event cards, nav items, partners) carries {en, sk} objects in
   site.js instead — sc-for remounts nodes and the imperative textContent swap
   would lose the race against React.

   KEY NAMESPACES
   --------------
   nav.*     shared nav          foot.*    shared footer
   rail.*    dot-rail aria       common.*  repeated CTAs
   home.*    landing teasers     story.*   our-story.html
   play.*    play.html           club.*    club.html
   member.*  membership.html     events.*  what's-on + event cards
   =========================================================================== */

window.TCH_SK = {

  /* --- shared nav ------------------------------------------------------- */
  'nav.story': 'Náš Príbeh',
  'nav.play': 'Hrať',
  'nav.club': 'Klub',
  'nav.membership': 'Členstvo',
  'nav.whatsOn': 'Program',
  'nav.contact': 'Kontakt',
  'nav.reserve': 'Rezervovať',
  'nav.menu': 'Menu',
  'nav.home': 'Domov',

  /* --- shared footer ---------------------------------------------------- */
  'foot.tagline': 'Prémiové pickleballové kurty a komunita vybudovaná okolo hry.',
  'foot.visit': 'Navštívte Nás',
  'foot.privacy': 'Zásady Ochrany Osobných Údajov',
  'foot.terms': 'Podmienky',

  /* --- dot-rail aria labels --------------------------------------------- */
  'rail.hero': 'Úvod',
  'rail.story': 'Náš Príbeh',
  'rail.play': 'Hrať',
  'rail.beyond': 'Za Hranicami Kurtu',
  'rail.membership': 'Členstvo',
  'rail.whats-on': 'Program',
  'rail.loop': 'Novinky',
  'rail.partners': 'Partneri',
  'rail.contact': 'Kontakt',
  'rail.game': 'Hra',
  'rail.story-intro': 'Náš Príbeh',
  'rail.idea': 'Myšlienka',
  'rail.philosophy': 'Naša Filozofia',
  'rail.social': 'Spoločenský Klub',
  'rail.the-game': 'Hra',
  'rail.community': 'Komunita',
  'rail.this-is': 'Toto Je The Courthouse',

  /* --- repeated CTAs ---------------------------------------------------- */
  'common.learnMore': 'Zistiť Viac',
  'common.bookCourt': 'Rezervovať Kurt',
  'common.skipToContent': 'Prejsť na obsah',

  /* =======================================================================
     LANDING PAGE
     ======================================================================= */

  'home.hero.book': 'Rezervovať Kurt',
  'home.hero.scroll': 'Prejsť na Náš Príbeh',

  'home.story.tag': 'Náš Príbeh',
  'home.story.h': 'Viac než len miesto na hru.',
  'home.story.p1': 'The Courthouse vznikol z jednoduchej myšlienky: šport je lepší, keď spája ľudí.',
  'home.story.p2': 'Miesto, kde môžete súťažiť, učiť sa, spoznávať ľudí, zostať na kávu a stať sa súčasťou komunity — či držíte raketu prvýkrát, alebo hrávate každý týždeň.',
  'home.story.kicker': 'Príďte pre hru. Zostaňte pre všetko okolo nej.',
  'home.story.cta': 'Náš Príbeh',

  'home.play.tag': 'Hrať',
  'home.play.h': 'Vezmite do ruky raketu.',
  'home.play.p1': 'Sedem prémiových vnútorných kurtov. Pickleball a bedminton. Spoločenské hry, súťažné zápasy, kliniky, tréningy a turnaje — všetko pod jednou strechou.',
  'home.play.l1': 'Nikdy ste nehrali? Naučíme vás to.',
  'home.play.l2': 'Už ste prepadli hre? Ste na správnom mieste.',
  'home.play.l3': 'Chcete sa posunúť? Pridajte sa na kliniku alebo si nájdite trénera.',
  'home.play.cta': 'Objaviť Hru',

  'home.beyond.tag': 'Za Hranicami Kurtu',
  'home.beyond.h': 'Hra je len spúšťač.',
  'home.beyond.p1': 'Dajte si kávu pred zápasom. Zostaňte na ďalšiu po ňom. Objavte novú výbavu v Pro Shope, sledujte hru s priateľmi alebo sa pridajte k niektorému z našich klubových podujatí.',
  'home.beyond.p2': 'The Courthouse sme nenavrhli len ako miesto, kde sa hrá, ale ako miesto, kde naozaj chcete tráviť čas.',
  'home.beyond.t1': 'Kaviareň',
  'home.beyond.t2': 'Pro Shop',
  'home.beyond.t3': 'Spoločenské Priestory',
  'home.beyond.cta': 'Objaviť Klub',

  'home.member.tag': 'Členstvo',
  'home.member.h': 'Váš klub. Váš kurt.',
  'home.member.body': 'Hrajte viac. Plaťte menej. Získajte prioritný prístup, členské výhody, exkluzívne podujatia a bližšie prepojenie s komunitou okolo klubu.',
  'home.member.kicker': 'Žiadna zbytočná exkluzivita. Len viac dôvodov hrať.',
  'home.member.learnMore': 'Objaviť Členstvo',
  'home.member.signUp': 'Pridať sa ku Klubu',
  'home.member.fullTable': 'Pozrieť celé porovnanie',

  'home.events.tag': 'Program',
  'home.events.h': 'Vždy je tu ďalšia hra.',
  'home.events.p1': 'Spoločenské večery. Kurzy pre začiatočníkov. Súťažné ligy. Tréningy. Turnaje. Klubové podujatia.',
  'home.events.l1': 'Niekedy prídete vyhrať.',
  'home.events.l2': 'Niekedy prídete učiť sa.',
  'home.events.l3': 'Niekedy prídete pozrieť, kto tam je.',
  'home.events.cta': 'Pozrieť Program',
  'home.events.cardCta': 'Registrovať sa',
  'home.events.empty': 'Kalendár ďalšej sezóny čoskoro pribudne.',

  'home.loop.tag': 'Zostaňte v Obraze',
  'home.loop.h': 'Nenechajte si ujsť, čo príde.',
  'home.loop.p1': 'Nové turnaje. Klubové večery. Špeciálne podujatia. Novinky v ponuke. A občas prekvapenie.',
  'home.loop.p2': 'Sledujte The Courthouse alebo sa prihláste na odber noviniek a buďte prví, kto sa dozvie, čo sa deje na kurte aj mimo neho.',
  'home.loop.cta1': 'Instagram',
  'home.loop.cta2': 'Prihlásiť sa',

  'home.host.tag': 'Zorganizujte Podujatie v The Courthouse',
  'home.host.p1': 'Od firemných turnajov a teambuildingov po súkromné oslavy, brandové aktivácie a kompletné prenájmy klubu — The Courthouse môže byť na váš deň celý váš.',
  'home.host.t1': 'Firemné Podujatia',
  'home.host.t2': 'Súkromné Podujatia',
  'home.host.t3': 'Brandové Aktivácie',
  'home.host.t4': 'Turnaje',
  'home.host.t5': 'Prenájom Klubu',
  'home.host.cta': 'Zorganizovať Podujatie',

  'home.partners.tag': 'Partneri',
  'home.partners.h': 'Spolu to ide lepšie.',
  'home.partners.p1': 'The Courthouse staviame spolu so značkami a organizáciami, ktoré zdieľajú našu vieru v šport, komunitu a skvelé zážitky. Od vybavenia na našich kurtoch až po podujatia, ktoré tvoríme, sú naši partneri súčasťou klubu.',
  'home.partners.cta': 'Staňte sa Partnerom',

  'home.contact.tag': 'Kontaktujte Nás',
  'home.contact.h': 'Poďte si Zahrať do The Court House.',
  'home.contact.hours': 'Otváracie Hodiny',
  'home.contact.hoursValue': 'Po – Ne · 7:00 – 22:00',
  'home.contact.map': 'Otvoriť v Google Mapách',
  'home.contact.mapAria': 'Otvoriť Na Pántoch 7707/8 v Google Mapách',
  'home.contact.instagram': 'Instagram',
  'home.contact.whatsapp': 'WhatsApp',

  /* =======================================================================
     OUR STORY  (our-story.html)
     ======================================================================= */

  'story.intro.tag': 'Náš Príbeh',
  'story.intro.h': 'Iný druh klubu.',
  'story.intro.lede': 'Vaše miesto medzi domovom a prácou.',
  'story.intro.p1': 'The Courthouse vznikol okolo jednoduchého presvedčenia: šport má spájať ľudí. Nielen na hodinu na kurte, ale pred zápasom, po zápase a dávno po tom, ako sa na skóre zabudne.',
  'story.intro.p2': 'Chceli sme vytvoriť to, čo Bratislave chýbalo — miesto postavené na energii športu a kultúre skvelého spoločenského klubu.',
  'story.intro.l1': 'Miesto, kde sa súťaží.',
  'story.intro.l2': 'Miesto, kde sa spája.',
  'story.intro.l3': 'Miesto, kam patríte.',
  'story.intro.welcome': 'Vitajte v The Courthouse.',

  'story.idea.tag': 'Myšlienka',
  'story.idea.h': 'Viac než kurty. Viac než športová aréna.',
  'story.idea.p1': 'The Courthouse začal pickleballom, no nikdy sa tým nemal skončiť.',
  'story.idea.p2': 'Predstavovali sme si klub, kde sa ranný zápas zmení na kávu. Kde sa z neznámych stanú spoluhráči vo štvorhre. Kde súťaživosť pohodlne koexistuje s rozhovorom. Kde prídete na hodinu a zistíte, že ste zostali tri.',
  'story.idea.p3': 'Sedem vnútorných kurtov tvorí srdce klubu. Okolo nich sme vytvorili všetko, čo vás prinúti zostať — kaviareň, Pro Shop, spoločenské priestory, tréningy, turnaje a kalendár zážitkov, ktorý presahuje tradičný šport.',
  'story.idea.kicker': 'Kurt nás spája. To, čo sa deje okolo neho, z nás robí klub.',

  'story.phil.tag': 'Naša Filozofia',
  'story.phil.h': 'Exkluzívny zážitok. Otvorený všetkým.',
  'story.phil.p1': 'Veríme, že klub môže pôsobiť výnimočne bez toho, aby sa ktokoľvek cítil vylúčený.',
  'story.phil.p2': 'The Courthouse je postavený s dôrazom na detail, atmosféru a štandardy, aké očakávate od súkromného členského klubu — no na to, aby ste vošli dnu, nepotrebujete správne priezvisko, správne kontakty ani roky na čakacej listine.',
  'story.phil.l1': 'Nikdy ste nedržali raketu? Ste vítaní.',
  'story.phil.l2': 'Hráte svoj stý turnaj? Ste vítaní.',
  'story.phil.l3': 'Len tak oddychujete? Ste vítaní.',
  'story.phil.p3': 'Príďte sami. Príďte s priateľmi. Príďte súťažiť. Príďte, lebo vás to zaujíma.',
  'story.phil.kicker': 'Jediné, čo tu potrebujete, je chuť byť súčasťou.',

  'story.social.tag': 'Spoločenský Klub',
  'story.social.h': 'Príďte pre hru. Zostaňte pre klub.',
  'story.social.p1': 'Tie najlepšie chvíle v The Courthouse nebudú mať skóre. Stanú sa pri káve po zápase. Pri sledovaní priateľov z lavičky. Pri stretnutí s ďalším spoluhráčom do štvorhry. Keď zostanete dlhšie, než ste plánovali.',
  'story.social.p2': 'A občas zámerne zotrieme hranicu medzi športom a spoločenským životom.',
  'story.social.p3': 'Popri turnajoch, ligách a tréningoch náš kalendár ponúka charakteristické zážitky The Courthouse — nečakané podujatia postavené na pohybe, hudbe, jedle, kultúre a spoznávaní ľudí. Niektoré vážne. Niektoré spoločenské. Niektoré o niečo menej vážne.',
  'story.social.kicker': 'Vždy by mal existovať ďalší dôvod vrátiť sa.',
  'story.social.cta': 'Program',

  'story.game.tag': 'Hra',
  'story.game.h': 'Súťaž sem patrí. Rovnako ako vaša prvá hra.',
  'story.game.p1': 'Pickleball sa ľahko začne a ťažko prestane hrať. To je časť toho, čo nás na ňom zaujalo. Získal si srdcia v USA aj v Ázii — teraz je na rade Európa.',
  'story.game.p2': 'Dokáže byť súťaživý bez toho, aby zastrašoval, spoločenský bez straty športovej hrany, a hrateľný naprieč generáciami i úrovňami.',
  'story.game.p3': 'V The Courthouse objavujú začiatočníci hru po boku skúsených hráčov, trénerov a súťažiacich. Domov tu má aj bedminton, ktorý dáva našim kurtom a komunite ďalší spôsob hry.',
  'story.game.kicker': 'Naučte sa hru. Nájdite svoju úroveň. Nájdite svojich ľudí. Potom uvidíte, kam až to chcete dotiahnuť.',
  'story.game.cta': 'Objaviť Hru',

  'story.comm.tag': 'Komunita',
  'story.comm.h': 'Krásne kurty komunitu nevytvoria. Ľudia áno.',
  'story.comm.p1': 'Klub definujú jeho ľudia a ich príbehy. The Courthouse je navrhnutý tak, aby ste ich spoznali ľahšie — cez otvorenú hru, ligy, tréningy, turnaje, klubové podujatia a jednoduchú možnosť sadnúť si po zápase na kávu.',
  'story.comm.p2': 'Rôzny vek. Rôzne zázemie. Rôzne úrovne hry. Jeden kurt často stačí na to, aby boli všetci na rovnakej štartovacej čiare.',
  'story.comm.kicker': 'Keď prídete, nemusíte poznať nikoho. Dúfame, že keď odídete, už budete.',

  'story.member.tag': 'Členstvo',
  'story.member.h': 'Pre tých, ktorí si z neho urobia svoj klub.',
  'story.member.p1': 'Na to, aby ste patrili do The Courthouse, nemusíte byť členom. Členstvo je len náš spôsob, ako dať viac ľuďom, ktorí si klub zaradia do svojej rutiny.',
  'story.member.p2': 'Viac hry. Viac prístupu. Členské výhody. Prioritné príležitosti. Špeciálne zážitky. A bližšie prepojenie s tým, čo sa v klube deje.',
  'story.member.kicker': 'Otvorené pre všetkých. Výnimočné pre tých, ktorí sa vracajú.',
  'story.member.cta': 'Objaviť Členstvo',

  'story.this.h': 'Toto je The Courthouse.',
  'story.this.l1': 'Športový klub.',
  'story.this.l2': 'Spoločenský klub.',
  'story.this.l3': 'Miesto stretnutí.',
  'story.this.l4': 'Pre prvé hry aj posledné loptičky.',
  'story.this.l5': 'Pre súťaž aj rozhovor.',
  'story.this.l6': 'Pre starých priateľov aj ľudí, ktorých ste ešte nestretli.',
  'story.this.kicker': 'Príďte pre hru. Zostaňte pre klub.',

  /* =======================================================================
     PLAY  (play.html)
     ======================================================================= */

  'play.intro.tag': 'Hrať',
  'play.intro.h': 'Každý niekde začínal.',
  'play.intro.lede': 'Niekto príde súťažiť. Niekto vypnúť. Niekto len potrebuje zámienku dať priateľov dokopy.',
  'play.intro.p1': 'V The Courthouse je priestor na všetko z toho. Sedem prémiových vnútorných kurtov. Pickleball a bedminton. Tréningy, spoločenská hra, súťažné zápasy a turnaje — či držíte pálku prvýkrát, alebo ste už prestali počítať odohrané hry.',
  'play.intro.kicker': 'Nájdite svoju hru. Kurt zabezpečíme my.',

  'play.pb.tag': 'Pickleball',
  'play.pb.h': 'Ľahko sa začne. Ťažko odloží.',
  'play.pb.p1': 'Nie náhodou je pickleball jedným z najrýchlejšie rastúcich športov na svete. Rýchlo sa naučí, je okamžite spoločenský a dosť súťaživý na to, aby ste sa vracali. Na skvelú hru nepotrebujete roky skúseností — no vždy je kam posunúť sa.',
  'play.pb.p2': 'Sedem vyhradených vnútorných kurtov vám dáva miesto na hru po celý rok — či ste tu na neformálnu hru s priateľmi, na tréning pred súťažou, alebo niekde medzi tým.',
  'play.pb.kicker': 'Príďte s vlastnou partiou alebo si ju u nás nájdite. Toto je váš kurt.',
  'play.pb.cta': 'Rezervovať Pickleball',

  'play.new.tag': 'Nový v Pickleballi?',
  'play.new.h': 'Pochopíte to za pár minút.',
  'play.new.p1': 'Nikdy ste nehrali? Výborne. Pickleball spája prvky tenisu, bedmintonu a stolného tenisu do hry, ktorú si osvojíte pozoruhodne rýchlo.',
  'play.new.p2': 'Potrebujete pálku, loptičku, kurt a niekoho na druhej strane siete. So zvyškom pomôžeme my.',
  'play.new.basicsH': 'Základy',
  'play.new.b1t': 'Formát',
  'play.new.b1': 'Dvojhra alebo štvorhra — štvorhra je zďaleka najobľúbenejšia.',
  'play.new.b2t': 'Podanie',
  'play.new.b2': 'Podávajte diagonálne, do podávacieho poľa za sieťou.',
  'play.new.b3t': 'Dva odrazy',
  'play.new.b3': 'Nechajte loptičku raz odraziť na každej strane, až potom volejujte.',
  'play.new.b4t': 'Kuchyňa',
  'play.new.b4': 'Nevolejujte, kým stojíte v zóne najbližšie k sieti.',
  'play.new.b5t': 'Skóre',
  'play.new.b5': 'Hrá sa do 11 bodov, s rozdielom dvoch.',
  'play.new.p3': 'To stačí na to, aby ste odohrali prvú hru. A zvyšok vám radi vysvetlíme na mieste.',
  'play.new.p4': 'Žiadne vybavenie? Žiadny problém. Pálky a loptičky sú k dispozícii v klube.',
  'play.new.cta': 'Rezervovať Prvú Hru',

  'play.court.title': 'Pickleballový kurt: 20 na 44 stôp, so zónou zákazu volejov po oboch stranách siete',
  'play.court.service': 'Podávacie pole',
  'play.court.service2': 'Podávacie pole',
  'play.court.service3': 'Podávacie pole',
  'play.court.service4': 'Podávacie pole',
  'play.court.kitchen': 'Kuchyňa',
  'play.court.kitchenSub': 'zákaz volejov',
  'play.court.long': '44 stôp · 13,4 m',
  'play.court.wide': '20 stôp · 6,1 m',

  'play.find.tag': 'Nájdite Svoju Hru',
  'play.find.h': 'Hrajte po svojom.',
  'play.find.p1': 'Nie každá hra musí znamenať to isté.',
  'play.find.c1h': 'Súkromná Hra',
  'play.find.c1': 'Rezervujte si kurt, priveďte svojich ľudí a spravte si z tej hodiny svoju.',
  'play.find.c2h': 'Otvorená Hra',
  'play.find.c2': 'Príďte sami a stretnite hráčov na podobnej úrovni. Najjednoduchší spôsob, ako si viac zahrať — a spoznať viac ľudí z klubu.',
  'play.find.c3h': 'Klubové Podujatia',
  'play.find.c3': 'Občas pravidlá zmeníme úplne. Tematické večery, špeciálne formáty a charakteristické podujatia The Courthouse počas celej sezóny.',
  'play.find.kicker': 'Nech chcete hrať akokoľvek, mala by na vás čakať hra.',
  'play.find.cta': 'Nájsť Termín',

  'play.coach.tag': 'Tréningy',
  'play.coach.h': 'Zlepšite sa v hre.',
  'play.coach.p1': 'Prvá hra vás zaujme. Zlepšovanie vás bude vracať späť.',
  'play.coach.p2': 'Pracujte so skúsenými trénermi na individuálnych lekciách, skupinových tréningoch a klinikách pre rôzne úrovne hry. Začnite základmi. Zlepšite pohyb. Pochopte postavenie. Rozvíjajte údery. Naučte sa stratégiu za hrou.',
  'play.coach.p3': 'Alebo jednoducho zistite, prečo vám všetci hovoria, nech nestojíte v kuchyni.',
  'play.coach.c1h': 'Individuálny Tréning',
  'play.coach.c1': 'Pozornosť jeden na jedného, postavená na vašej hre.',
  'play.coach.c2h': 'Skupinový Tréning',
  'play.coach.c2': 'Učte sa spolu, zlepšujte sa spolu.',
  'play.coach.c3h': 'Kurzy pre Začiatočníkov',
  'play.coach.c3': 'Všetko, čo potrebujete na cestu od „Čo je pickleball?“ k samostatnej hre.',
  'play.coach.c4h': 'Kliniky a Masterclass',
  'play.coach.c4': 'Zamerané tréningy pre hráčov, ktorí chcú vypilovať konkrétne časti svojej hry.',
  'play.coach.cta': 'Nájsť Trénera',

  'play.bad.tag': 'Bedminton',
  'play.bad.h': 'Pickleball nie je jediná hra v dome.',
  'play.bad.p1': 'Naše vnútorné kurty sa dajú prispôsobiť na bedminton, čo hráčom dáva kvalitné miesto na tréning, súťaž alebo obyčajnú hru počas celého roka.',
  'play.bad.p2': 'Prineste si vlastné vybavenie alebo sa na recepcii opýtajte na rakety.',
  'play.bad.kicker': 'Rovnaký klub. Iná raketa.',
  'play.bad.cta': 'Rezervovať Bedminton',

  'play.comp.tag': 'Súťažte a Spájajte sa',
  'play.comp.h': 'Vždy je o čo hrať.',
  'play.comp.p1': 'Každý mesiac sezóny ožíva The Courthouse súťažou — od klubových rebríčkov a líg až po mesačné turnaje a medzinárodné šampionáty.',
  'play.comp.t1': 'Dvojhra',
  'play.comp.t2': 'Štvorhra',
  'play.comp.t3': 'Zmiešaná Štvorhra',
  'play.comp.t4': 'Tímové Formáty',
  'play.comp.t5': 'Špeciálne Podujatia',
  'play.comp.p2': 'Nájdite svoju úroveň. Nájdite svojich súperov. Stúpajte rebríčkom. Reprezentujte svoj tím. Alebo vstúpte na kurt, keď ide o viac.',
  'play.comp.kicker': 'Od vášho prvého klubového turnaja až po medzinárodnú scénu — súťaž tu má domov.',
  'play.comp.cta1': 'Pozrieť Program',
  'play.comp.cta2': 'Prihlásiť sa na Turnaj',

  'play.eq.tag': 'Vybavenie',
  'play.eq.h': 'Stačí prísť.',
  'play.eq.p1': 'Na to, aby ste začali hrať, nemusíte nič vlastniť. V The Courthouse si požičiate pálky aj loptičky, a Pro Shop ponúka vybavenie, obuv, oblečenie a doplnky pre hráčov, ktorí si chcú nájsť to svoje.',
  'play.eq.kicker': 'Začnite s našimi. Časom budete chcieť vlastné.',
  'play.eq.cta': 'Pro Shop — Už čoskoro',

  'play.cta.h': 'Dosť čítania. Poďme hrať.',
  'play.cta.p': 'Prvá hra alebo stá. Váš kurt je pripravený.',
  'play.cta.small': 'Nemáte partiu?',
  'play.cta.smallCta': 'Nájsť Otvorenú Hru',

  /* --- rail labels: play.html ------------------------------------------- */
  'rail.play-intro': 'Hrať',
  'rail.pickleball': 'Pickleball',
  'rail.new-to': 'Nový v Pickleballi?',
  'rail.find-your-game': 'Nájdite Svoju Hru',
  'rail.coaching': 'Tréningy',
  'rail.badminton': 'Bedminton',
  'rail.compete': 'Súťažte a Spájajte sa',
  'rail.equipment': 'Vybavenie',
  'rail.play-cta': 'Poďme Hrať',

  /* =======================================================================
     BEYOND THE COURT  (club.html)
     ======================================================================= */

  'club.intro.tag': 'Za Hranicami Kurtu',
  'club.intro.h': 'Hra je len spúšťač.',
  'club.intro.lede': 'Dajte si kávu pred zápasom. Zostaňte na ďalšiu po ňom. Objavte novú výbavu v Pro Shope, sledujte hru pri rozhovore s priateľmi alebo sa pridajte k niektorému z našich klubových podujatí.',
  'club.intro.p1': 'The Courthouse sme nenavrhli len ako miesto, kde sa hrá, ale ako miesto, kde naozaj chcete tráviť čas.',
  'club.intro.t1': 'Kaviareň',
  'club.intro.t2': 'Pro Shop',
  'club.intro.t3': 'Spoločenské Priestory',

  'club.house.tag': 'Klubovňa',
  'club.house.h': 'Viac než miesto, kde sa čaká na kurt.',
  'club.house.p1': 'Ranná káva. Miesto na prácu. Sedadlo v prvom rade na hru. Popoludnie s priateľmi, ktoré sa zmení na večer pri bare.',
  'club.house.p2': 'Klubovňa sa hýbe v rytme dňa — spoločenský priestor postavený na energii kurtov, no s vlastným životom.',
  'club.house.kicker': 'Príďte skôr. Zostaňte dlhšie. Nemusíte hrať, aby ste sem patrili.',

  'club.amen.tag': 'Všetko, Čo Potrebujete, Aby Ste Zostali',
  'club.amen.t1': 'Bar',
  'club.amen.t2': 'Výhľad na Kurty',
  'club.amen.t3': 'Pohodlné Sedenie',
  'club.amen.t4': 'Wi-Fi',
  'club.amen.t5': 'Nabíjanie',
  'club.amen.t6': 'Pracovné Miesta',
  'club.amen.t7': 'Podujatia',

  'club.after.tag': 'Po Zotmení',
  'club.after.h': 'Niektoré večery hrajú podľa iných pravidiel.',
  'club.after.p1': 'Klubovňa je aj domovom spoločenskej stránky The Courthouse — klubové večery, oslavy po turnajoch, spolupráce a charakteristické zážitky, ktoré z bežného večera spravia niečo, kvôli čomu sa oplatí prísť.',
  'club.after.t4': 'A čokoľvek príde ďalej',
  'club.after.kicker': 'Vaše miesto, mimo kurtu.',
  'club.after.cta1': 'Program',
  'club.after.cta2': 'Navštíviť The Courthouse',

  'rail.club-intro': 'Za Hranicami Kurtu',
  'rail.clubhouse': 'Klubovňa',
  'rail.amenities': 'Vybavenie',
  'rail.after-hours': 'Po Zotmení',

  /* =======================================================================
     MEMBERSHIP  (membership.html)
     ======================================================================= */

  'member.intro.tag': 'Členstvo',
  'member.intro.h': 'Váš klub. Váš kurt.',
  'member.intro.lede': 'Členstvo je pre tých, ktorí si chcú The Courthouse zaradiť do svojej rutiny.',
  'member.intro.p1': 'Hrajte viac. Plaťte menej. Získajte prioritný prístup, členské výhody, exkluzívne podujatia a bližšie prepojenie s komunitou okolo klubu.',
  'member.intro.kicker': 'Žiadna zbytočná exkluzivita. Len viac dôvodov hrať.',
  'member.intro.cta': 'Pridať sa ku Klubu',

  'member.tiers.tag': 'Možnosti Členstva',
  'member.tiers.h': 'Nájdite úroveň, ktorá sedí vašej hre.',
  'member.tiers.p1': 'Každá úroveň stavia na tej predchádzajúcej. Zľavy na kurt platia z bežnej nečlenskej ceny.',
  'member.tiers.feature': 'Výhoda',
  'member.tiers.inferNote': 'Zrekonštruované zo zdrojového cenníka — pred spustením treba potvrdiť.',
  'member.tiers.cta2': 'Opýtajte sa Nás',

  'member.cta.h': 'Otvorené pre všetkých. Výnimočné pre tých, ktorí sa vracajú.',
  'member.cta.p': 'Na to, aby ste patrili do The Courthouse, nemusíte byť členom. Členstvo je len náš spôsob, ako dať viac ľuďom, ktorí si klub zaradia do svojej rutiny.',
  'member.cta.cta2': 'Prečítať Náš Príbeh',

  'rail.member-intro': 'Členstvo',
  'rail.tiers': 'Možnosti Členstva',
  'rail.member-cta': 'Pridať sa ku Klubu'

};
