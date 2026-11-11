/*
 * משק דוד — נתוני חנות (אב-טיפוס)
 * המבנה תואם 1:1 למוצרי WooCommerce:
 *   sale_type: "unit"  → מוצר רגיל, כמות = יחידות
 *   sale_type: "portion" → גבינה חתוכה, כמות = מכפלות של portion_grams (150/300/450...)
 * ⚠️ יש לאמת מול המשק: אילו גבינות שלמות ואילו חתוכות, ומשקלי היחידות.
 */
window.MD = window.MD || {};

MD.settings = {
  businessName: 'משק דוד',
  phone: '054-9290123',
  phoneIntl: '+972549290123',
  email: 'oronir8@gmail.com',
  address: 'הדקל 33, מושב אחיטוב, ד.נ. עמק חפר',
  whatsapp: 'https://wa.me/message/A567ZJF4D7WIM1',
  // מחזור משלוחים: הזמנה עד יום רביעי 12:00 → משלוח ביום חמישי אחה"צ-ערב
  cutoffDay: 3,          // 0=ראשון ... 3=רביעי
  cutoffHour: 12,
  deliveryDay: 4,        // חמישי
  deliveryWindow: 'בשעות אחר הצהריים והערב',
  pickupHours: 'א׳–ה׳ 09:00–17:00, ו׳ 09:00–14:00',
  timeZone: 'Asia/Jerusalem'
};

MD.categories = [
  { id: 'all',       label: 'הכל' },
  { id: 'packages',  label: 'מארזים' },
  { id: 'fresh',     label: 'גבינות טריות ויוגורט' },
  { id: 'lactic',    label: 'גבינות לקטיות / עובש לבן' },
  { id: 'hard',      label: 'גבינות קשות וחצי קשות' }
];

MD.products = [
  // ── מארזים ──
  { id: 'pkg-farm', name: 'מארז המשק', cat: 'packages', sale_type: 'unit', price: 210,
    unit_label: 'מארז', desc: 'מבחר מייצג מכל שלוש משפחות הגבינות של המשק — טריות, לקטיות ומיושנות. מתנה מושלמת לשולחן אירוח.' },
  { id: 'pkg-aged', name: 'גבינות מיושנות – מארז היכרות', cat: 'packages', sale_type: 'unit', price: 190,
    unit_label: 'מארז', desc: 'היכרות עם הגבינות הקשות והחצי קשות שלנו, שמתיישנות חודשים ארוכים בחדר ההבשלה.' },
  { id: 'pkg-lactic', name: 'גבינות לקטיות – מארז היכרות', cat: 'packages', sale_type: 'unit', price: 165,
    unit_label: 'מארז', grams: 620, desc: 'מבחר גבינות עובש לבן רכות וחצי רכות — טעמים עמוקים ומורכבים.' },

  // ── טריות ──
  { id: 'yogurt-1l', name: 'יוגורט טבעי 1 ליטר', cat: 'fresh', sale_type: 'unit', price: 28, unit_label: 'בקבוק 1 ליטר',
    per100: 2.8, desc: 'מותסס באיטיות, בעל מרקם חלק וחמיצות מעודנת.' },
  { id: 'yogurt-250', name: 'יוגורט טבעי 250 מ"ל', cat: 'fresh', sale_type: 'unit', price: 19, unit_label: 'צנצנת 250 מ"ל',
    per100: 7.6, per100unit: 'מ"ל', desc: 'מותסס באיטיות, בעל מרקם חלק וחמיצות מעודנת.' },
  { id: 'yogurt-cream', name: 'קרם יוגורט', cat: 'fresh', sale_type: 'unit', price: 32, unit_label: 'גביע כ-380 גרם',
    per100: 8.42, desc: 'גרסה סמיכה ועשירה ליוגורט, כ-18% שומן. עוברת תהליך תסיסה קצר.' },
  { id: 'yogurt-dessert', name: 'מעדן יוגורט', cat: 'fresh', sale_type: 'unit', price: 16, unit_label: 'גביע',
    desc: 'מעדן יוגורט עיזים קטן ומפנק.' },
  { id: 'labane', name: 'לאבנה', cat: 'fresh', sale_type: 'unit', price: 27, unit_label: 'גביע כ-200 גרם',
    per100: 13.5, desc: 'מרקם סמיך ועשיר, חמיצות מעודנת, מושלמת עם שמן זית.' },
  { id: 'circassian', name: 'גבינה צ׳רקסית', cat: 'fresh', sale_type: 'unit', price: 29, unit_label: 'יחידה כ-230 גרם',
    per100: 12.61, desc: 'גבינה מבושלת מחלב טרי, בעלת טעם עדין וחלבי.' },
  { id: 'tsfatit', name: 'צפתית', cat: 'fresh', sale_type: 'unit', price: 29, unit_label: 'יחידה כ-230 גרם',
    per100: 12.61, desc: 'גבינה מלוחה במרקם קרמי ונעים.' },

  // ── לקטיות / עובש לבן (יחידות שלמות, כ-170 גרם) ──
  { id: 'ella', name: 'אלה', cat: 'lactic', sale_type: 'unit', price: 44.2, unit_label: 'יחידה שלמה כ-170 גרם', per100: 26,
    desc: 'גבינה רכה עם קרום עובש לבן ושקע במרכזה, שמזמין להוסיף דבש, ריבה או פירות יער.' },
  { id: 'adi', name: 'עדי', cat: 'lactic', sale_type: 'unit', price: 44.2, unit_label: 'יחידה שלמה כ-170 גרם', per100: 26,
    desc: 'גליל עם עובש לבן, נמס בפה.' },
  { id: 'yuval', name: 'יובל', cat: 'lactic', sale_type: 'unit', price: 44.2, unit_label: 'יחידה שלמה כ-170 גרם', per100: 26,
    desc: 'הלב של הוויטרינה. גבינה רכה בעלת מרקם מלא וטעם עז ועשיר.' },
  { id: 'rotem', name: 'רותם', cat: 'lactic', sale_type: 'unit', price: 44.2, unit_label: 'יחידה שלמה כ-170 גרם', per100: 26,
    desc: 'חצי רכה, בעלת טעם עמוק ופירותי. לאוהבי גבינות עם אופי יוצא דופן.' },
  { id: 'michal', name: 'מיכל', cat: 'lactic', sale_type: 'unit', price: 44.2, unit_label: 'יחידה שלמה כ-170 גרם', per100: 26,
    desc: 'חצי רכה, בעלת טעם עז ועמוק.' },
  { id: 'ilan', name: 'אילן', cat: 'lactic', sale_type: 'unit', price: 44.2, unit_label: 'יחידה שלמה כ-170 גרם', per100: 26,
    desc: 'פירמידה קטומה מעוטרת בפחם ערמונים; מרקם קטיפתי וטעם עדין.' },
  { id: 'roni', name: 'רוני', cat: 'lactic', sale_type: 'unit', price: 44.2, unit_label: 'יחידה שלמה כ-170 גרם', per100: 26,
    desc: 'גבינה רכה מעוטרת בפחם ערמונים; טעם עדין וחמצמץ, מרקם עשיר.' },
  { id: 'shira', name: 'שירה', cat: 'lactic', sale_type: 'portion', portion_grams: 150, per100: 26,
    desc: 'גבינה חצי רכה, מתונה וקרמית. מעוטרת בפחם ערמונים.' },

  // ── קשות (נחתכות — מנות של כ-150 גרם) ──
  { id: 'yarden', name: 'ירדן', cat: 'hard', sale_type: 'portion', portion_grams: 150, per100: 26,
    desc: 'גבינה קשה בסגנון אלפיני, טעם סוחף ועשיר עם סיומת מתקתקה. מתיישנת כ-14 חודשים.' },
  { id: 'ruth', name: 'רות', cat: 'hard', sale_type: 'portion', portion_grams: 150, per100: 26,
    desc: 'גבינה חצי קשה, טעם מתקתק, מרקם אלסטי. מתיישנת כ-6 חודשים.' },
  { id: 'orly', name: 'אורלי', cat: 'hard', sale_type: 'portion', portion_grams: 150, per100: 26,
    desc: 'גבינה קשה מבושלת, טעם אגוזי ועשיר. מתיישנת כ-8 חודשים.' },
  { id: 'tel-kakon', name: 'תל קקון', cat: 'hard', sale_type: 'portion', portion_grams: 150, per100: 26,
    desc: 'גבינת קיץ חצי קשה, טעם עז. מתיישנת כ-5 חודשים.' }
];

// מחיר מנה לגבינה חתוכה
MD.products.forEach(function (p) {
  if (p.sale_type === 'portion') p.price = Math.round(p.per100 * p.portion_grams / 100 * 100) / 100;
  p.image = p.image || 'assets/img/products/' + p.id + '.jpg';
});

/*
 * יישובים במסלול החלוקה — ⚠️ רשימת דמו! להחליף ברשימה מהמשק.
 * fee = דמי משלוח לאזור (₪)
 */
MD.settlements = [
  { name: 'אחיטוב', fee: 0 }, { name: 'בורגתה', fee: 25 }, { name: 'עין החורש', fee: 25 },
  { name: 'גבעת חיים איחוד', fee: 25 }, { name: 'גבעת חיים מאוחד', fee: 25 }, { name: 'כפר ידידיה', fee: 25 },
  { name: 'חרב לאת', fee: 25 }, { name: 'כפר חיים', fee: 25 }, { name: 'משמר השרון', fee: 25 },
  { name: 'מעברות', fee: 25 }, { name: 'כפר מונש', fee: 25 }, { name: 'גן יאשיה', fee: 25 },
  { name: 'עולש', fee: 25 }, { name: 'בחן', fee: 25 }, { name: 'אומץ', fee: 25 },
  { name: 'חגלה', fee: 25 }, { name: 'בית יצחק-שער חפר', fee: 25 }, { name: 'כפר ויתקין', fee: 25 },
  { name: 'פרדס חנה-כרכור', fee: 35 }, { name: 'חדרה', fee: 35 }, { name: 'נתניה', fee: 35 },
  { name: 'קדימה-צורן', fee: 35 }, { name: 'אבן יהודה', fee: 35 }, { name: 'כפר יונה', fee: 35 }
];
