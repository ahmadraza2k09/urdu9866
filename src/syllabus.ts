export type Language = "ur" | "roman";
export type WorkType = "ghazal" | "nazm" | "afsana";

export interface Work {
  slug: string;
  title: Record<Language, string>;
  type: WorkType;
  year?: string;
  pdf: string;
}

export interface Author {
  name: Record<Language, string>;
  works: Work[];
}

export interface Section {
  slug: string;
  number: number;
  title: Record<Language, string>;
  description: Record<Language, string>;
  parts: { number: number; authors: Author[] }[];
}

const w = (slug: string, ur: string, roman: string, type: WorkType, pdf: string, year?: string): Work => ({
  slug, title: { ur, roman }, type, pdf, year,
});
const pdf = (section: number, part: number, author: string, file: string) =>
  `/pdfs/section-${section}/part-${part}/${author}/${file}.pdf`;

export const syllabus: Section[] = [
  {
    slug: "section-1", number: 1,
    title: { ur: "غزلیں اور نظمیں", roman: "Ghazlain aur Nazmain" },
    description: { ur: "منتخب شعرا کی غزلوں اور نظموں کا مجموعہ", roman: "Muntakhib shuara ki ghazlon aur nazmon ka majmua" },
    parts: [
      { number: 1, authors: [
        { name: { ur: "مرزا اسد اللہ خان غالب", roman: "Mirza Asadullah Khan Ghalib" }, works: [
          w("bazeecha-e-atfal", "بازیچہ اطفال ہے دنیا میرے آگے", "Bazeecha-e-atfal hai duniya mere aage", "ghazal", pdf(1, 1, "ghalib", "bazeecha-e-atfal")),
          w("hui-takheer", "ہوئی تاخیر تو کچھ باعث تاخیر بھی تھا", "Hui takheer to kuch baais-e-takheer bhi tha", "ghazal", pdf(1, 1, "ghalib", "hui-takheer")),
          w("bas-ke-dushwar", "بس کہ دشوار ہے ہر کام کا آسان ہونا", "Bas ke dushwar hai har kaam ka aasaan hona", "ghazal", pdf(1, 1, "ghalib", "bas-ke-dushwar")),
        ] },
        { name: { ur: "علامہ محمد اقبال", roman: "Allama Muhammad Iqbal" }, works: [
          w("sarmaya-o-mehnat", "سرمایہ و محنت", "Sarmaya-o-Mehnat", "nazm", "https://drive.google.com/file/d/1fEgEaB3B0XmJMuN_2ay4mzT5YhXWt164/view?usp=sharing"),
          w("phool", "پھول", "Phool", "nazm", pdf(1, 1, "iqbal", "phool")),
          w("shama-parwana", "شمع پروانہ", "Shama Parwana", "nazm", pdf(1, 1, "iqbal", "shama-parwana")),
        ] },
      ] },
      { number: 2, authors: [
        { name: { ur: "فیض احمد فیض", roman: "Faiz Ahmed Faiz" }, works: [
          w("nisar-main-teri-galiyon", "نثار میں تیری گلیوں کے اے وطن", "Nisar main teri galiyon ke ae watan", "nazm", pdf(1, 2, "faiz", "nisar-main-teri-galiyon")),
          w("mauzu-e-sukhan", "موضوع سخن", "Mauzu-e-Sukhan", "nazm", pdf(1, 2, "faiz", "mauzu-e-sukhan")),
          w("tauq-dar-ka-mausam", "طوق دار کا موسم", "Tauq-e-dar ka mausam", "nazm", pdf(1, 2, "faiz", "tauq-dar-ka-mausam")),
        ] },
        { name: { ur: "پروین شاکر", roman: "Parveen Shakir" }, works: [
          w("pa-ba-gil", "پابہ گل سب ہیں رہائی کی کرے تدبیر کون", "Pa-ba-gil sab hain, rihai ki kare tadbeer kaun", "ghazal", pdf(1, 2, "parveen-shakir", "pa-ba-gil")),
          w("chalne-ka-hausla", "چلنے کا حوصلہ نہیں رکنا محال کر دیا", "Chalne ka hausla nahin, rukna muhal kar diya", "ghazal", pdf(1, 2, "parveen-shakir", "chalne-ka-hausla")),
          w("rasta-bhi-kathan", "راستہ بھی کٹھن، دھوپ میں شدت بھی بہت تھی", "Rasta bhi kathan, dhoop mein shiddat bhi bohat thi", "ghazal", pdf(1, 2, "parveen-shakir", "rasta-bhi-kathan")),
        ] },
      ] },
      { number: 3, authors: [
        { name: { ur: "ساحر لدھیانوی", roman: "Sahir Ludhianvi" }, works: [
          w("taj-mahal", "تاج محل", "Taj Mahal", "nazm", pdf(1, 3, "sahir", "taj-mahal")),
          w("teri-awaz", "تیری آواز", "Teri Awaz", "nazm", pdf(1, 3, "sahir", "teri-awaz")),
          w("mujhe-sochne-de", "مجھے سوچنے دے", "Mujhe Sochne De", "nazm", pdf(1, 3, "sahir", "mujhe-sochne-de")),
        ] },
        { name: { ur: "میر تقی میر", roman: "Meer Taqi Meer" }, works: [
          w("pata-pata-boota-boota", "پتہ پتہ بوٹا بوٹا حال ہمارا جانے ہے", "Pata pata boota boota haal hamara jane hai", "ghazal", pdf(1, 3, "meer", "pata-pata-boota-boota")),
          w("aalam-main-koi", "عالم میں کوئی دل کا طلبگار نہ پایا", "Aalam mein koi dil ka talabgar na paya", "ghazal", pdf(1, 3, "meer", "aalam-main-koi")),
          w("hum-se-kuch-aage", "ہم سے کچھ آگے زمانے میں ہوا کیا کیا کچھ", "Hum se kuch aage zamane mein hua kya kya kuch", "ghazal", pdf(1, 3, "meer", "hum-se-kuch-aage")),
        ] },
      ] },
    ],
  },
  {
    slug: "section-2", number: 2,
    title: { ur: "منتخب افسانے", roman: "Muntakhib Afsanay" },
    description: { ur: "نامور افسانہ نگاروں کی منتخب کہانیاں", roman: "Naamwar afsana nigaron ki muntakhib kahaniyan" },
    parts: [
      { number: 2, authors: [
        { name: { ur: "سعادت حسن منٹو", roman: "Saadat Hasan Manto" }, works: [
          w("toba-tek-singh", "ٹوبہ ٹیک سنگھ", "Toba Tek Singh", "afsana", pdf(2, 2, "manto", "toba-tek-singh"), "2027"),
          w("naya-qanoon", "نیا قانون", "Naya Qanoon", "afsana", pdf(2, 2, "manto", "naya-qanoon"), "2028–2029"),
        ] },
        { name: { ur: "ہاجرہ مسرور", roman: "Hajra Masroor" }, works: [w("mulamma", "ملمع", "Mulamma", "afsana", pdf(2, 2, "hajra-masroor", "mulamma"))] },
        { name: { ur: "احمد ندیم قاسمی", roman: "Ahmed Nadeem Qasmi" }, works: [w("wehshi", "وحشی", "Wehshi", "afsana", pdf(2, 2, "qasmi", "wehshi"))] },
        { name: { ur: "قدرت اللہ شہاب", roman: "Qudratullah Shahab" }, works: [w("maan-ji", "ماں جی", "Maan Ji", "afsana", pdf(2, 2, "shahab", "maan-ji"))] },
        { name: { ur: "اے حمید", roman: "A. Hameed" }, works: [w("manzil-manzil", "منزل منزل", "Manzil Manzil", "afsana", pdf(2, 2, "a-hameed", "manzil-manzil"))] },
      ] },
      { number: 3, authors: [
        { name: { ur: "قرۃ العین حیدر", roman: "Qurratulain Hyder" }, works: [w("nazara-darmiyan-hai", "نظارہ درمیان ہے", "Nazara Darmiyan Hai", "afsana", pdf(2, 3, "hyder", "nazara-darmiyan-hai"), "2027")] },
        { name: { ur: "راجندر سنگھ بیدی", roman: "Rajinder Singh Bedi" }, works: [w("chalte-phirte-chehre", "چلتے پھرتے چہرے", "Chalte Phirte Chehre", "afsana", pdf(2, 3, "bedi", "chalte-phirte-chehre"), "2028–2029")] },
        { name: { ur: "ممتاز مفتی", roman: "Mumtaz Mufti" }, works: [w("aapa", "آپا", "Aapa", "afsana", pdf(2, 3, "mufti", "aapa"))] },
        { name: { ur: "اشفاق احمد", roman: "Ashfaq Ahmed" }, works: [w("gadariya", "گڈریا", "Gadariya", "afsana", pdf(2, 3, "ashfaq", "gadariya"))] },
        { name: { ur: "پریم چند", roman: "Premchand" }, works: [w("hajj-e-akbar", "حج اکبر", "Hajj-e-Akbar", "afsana", pdf(2, 3, "premchand", "hajj-e-akbar"))] },
        { name: { ur: "کرشن چندر", roman: "Krishan Chander" }, works: [w("bimar-baap", "بیمار باپ", "Bimar Baap", "afsana", pdf(2, 3, "krishan", "bimar-baap"))] },
      ] },
    ],
  },
];

export const allWorks = syllabus.flatMap((section) =>
  section.parts.flatMap((part) =>
    part.authors.flatMap((author) => author.works.map((item) => ({ item, author, part, section }))),
  ),
);
