/**
 * Master configuration file for CSDS Department Welcome Party & Farewell Night.
 * Edit all event details, dates, payment accounts, schedule, highlights,
 * and contact info in this single file.
 */

export interface HighlightItem {
  id: string;
  title: string;
  subtitle: string;
  category: "food" | "music" | "culture" | "games" | "awards" | "photo";
  image: string;
  badge?: string;
}

export interface ScheduleItem {
  id: string;
  title: string;
  time: string;
  period: string;
  description: string;
  category: string;
  image: string;
}

export interface DetailTabCard {
  title: string;
  description: string;
  image: string;
  tag: string;
}

export interface GalleryItem {
  title: string;
  location: string;
  image: string;
  caption: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface OrganizerContact {
  role: string;
  name: string;
  phone: string;
  email: string;
  avatar?: string;
}

export const EVENT_CONFIG = {
  // Core Event Details
  title: "CSDS Welcome & Farewell Night",
  year: "2026",
  department: "Department of Computer Science & Data Science",
  society: "CSDS Student Society",
  tagline: "Celebrating New Beginnings, Honoring Lasting Legacies",
  shortDescription:
    "An unforgettable evening of Pakhtun hospitality, Peshawari cuisine, live rubab melodies, attan, and memories under the stars of Peshawar.",
  
  // Date, Time & Venue
  date: "November 14, 2026",
  time: "6:00 PM – 11:30 PM PKT",
  doorsOpen: "5:30 PM",
  venue: "Grand Marquee, University Town, Peshawar",
  venueAddress: "Old Jamrud Road, University Town, Peshawar, Khyber Pakhtunkhwa",
  city: "Peshawar, Pakistan",
  countdownTarget: "2026-11-14T18:00:00+05:00",
  seatCapacity: 350,

  // Registration Fee & Financials
  fee: {
    amount: 2200,
    formatted: "Rs. 2,200",
    unit: "per person",
    note: "All-inclusive: Full Grand Peshawari Buffet Dinner, Live Musical Concert, Attan Dance, Souvenirs & Event Access Pass.",
    accounts: [
      {
        type: "Bank Transfer",
        bankName: "Meezan Bank Limited",
        accountTitle: "CSDS STUDENT SOCIETY PESHAWAR",
        accountNumber: "0234-0104889231",
        iban: "PK36MEZN0002340104889231",
        branch: "University Town Branch, Peshawar",
      },
      {
        type: "Easypaisa",
        accountTitle: "Muhammad Hamza (Treasurer CSDS)",
        accountNumber: "0345-9182736",
        note: "Send payment with remark: 'CSDS-YourName'",
      },
      {
        type: "JazzCash",
        accountTitle: "Zaryab Khan (President CSDS)",
        accountNumber: "0301-8273945",
        note: "Upload clear screenshot of the successful transaction SMS / App receipt",
      },
    ],
    instructions: [
      "Transfer Rs. 2,200 via Bank, Easypaisa, or JazzCash to any account above.",
      "Take a clear screenshot of the transaction receipt showing the Transaction ID & Date.",
      "Complete the registration form below with your full name, CNIC, and section.",
      "Upload the screenshot (JPG/PNG/WebP, max 5 MB).",
      "You will receive an official confirmation email with your digital entry pass upon admin verification.",
    ],
  },

  // Dropdown lists
  sections: ["A", "B", "C", "D"],
  semesters: [1, 2, 3, 4, 5, 6, 7, 8],

  // Section 1c: Event Highlights (Row of rounded image cards)
  highlights: [
    {
      id: "food",
      title: "Grand Peshawari Dawat",
      subtitle: "Authentic Chapli Kebab, Karahi, Dum Pukht & Kahwa",
      category: "food",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
      badge: "Pure Feast",
    },
    {
      id: "music",
      title: "Live Concert & Rubab",
      subtitle: "Mesmerizing Pashto folk strings, Sufi, & Urdu acoustic melodies",
      category: "music",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
      badge: "Live Band",
    },
    {
      id: "culture",
      title: "Traditional Attan & Cultural Showcase",
      subtitle: "Historic folk dance celebration uniting every batch in rhythm",
      category: "culture",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80",
      badge: "Heritage",
    },
    {
      id: "games",
      title: "Games & Department Quizzes",
      subtitle: "Trivia battles, hilarious senior-junior roasts, and stage contests",
      category: "games",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
      badge: "Fun & Prizes",
    },
    {
      id: "awards",
      title: "Awards & Farewell Honors",
      subtitle: "Batch titles, shields, faculty tributes, and graduation superlatives",
      category: "awards",
      image: "https://images.unsplash.com/photo-1569974498991-d3c12a504f95?auto=format&fit=crop&w=800&q=80",
      badge: "Memorabilia",
    },
    {
      id: "photobooth",
      title: "Truck-Art Photo Pavilion",
      subtitle: "Handcrafted Pakhtun decor, traditional turbans & 360° cameras",
      category: "photo",
      image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80",
      badge: "Memories",
    },
  ] as HighlightItem[],

  // Detail Switcher Tabs (Section 3.5: Food, Music, Activities)
  detailTabs: {
    food: [
      {
        title: "Taza Chapli Kebab",
        description: "Freshly made Peshawari chapli kebabs infused with crushed coriander, pomegranate seeds, and heirloom tomatoes.",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
        tag: "Chef Special",
      },
      {
        title: "Namak Mandi Mutton Karahi",
        description: "Traditional slow-simmered shinwari karahi cooked in natural animal fat and black pepper, served with fresh tandoori naan.",
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
        tag: "Classic Shinwari",
      },
      {
        title: "Peshawari Kahwa & Doodh Patti",
        description: "Cardamom-steeped green tea served in porcelain piyalas with crunchy cardamom nuql, plus rich Karak chai.",
        image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
        tag: "Heritage Beverage",
      },
    ],
    music: [
      {
        title: "Classical Rubab Mastery",
        description: "Heartfelt instrumental performance blending centuries-old Pakhtun melodies with contemporary soulful chords.",
        image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80",
        tag: "Folk Strings",
      },
      {
        title: "Student Indie Band",
        description: "Live Urdu acoustic covers, rock medleys, and nostalgic college ballads performed by talented CSDS musicians.",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
        tag: "Live Energy",
      },
      {
        title: "Traditional Attan Circle",
        description: "The pride of Khyber: a high-energy ceremonial circle dance accompanied by thunderous Dhol beats.",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
        tag: "Cultural Peak",
      },
    ],
    activities: [
      {
        title: "The Senior-Junior Roast & Games",
        description: "Good-humored departmental stand-up, mock awards, coding rap battles, and rapid-fire quiz showdowns.",
        image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
        tag: "High Laughs",
      },
      {
        title: "Superlative Batch Awards",
        description: "Custom engraved shields honoring 'Most Likely to Deploy on Friday', 'Night Owl Hacker', and 'Department MVP'.",
        image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=800&q=80",
        tag: "Recognition",
      },
      {
        title: "Vintage Truck-Art Studio",
        description: "Snap studio-grade instant portraits with traditional Peshawari pagris, pakols, and truck-art calligraphic frames.",
        image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80",
        tag: "Keep Sakes",
      },
    ],
  } as Record<string, DetailTabCard[]>,

  // Poster Schedule Cards (Section 3.5 Schedule)
  schedulePosters: [
    {
      id: "poster-1",
      title: "WELCOME & ARRIVAL",
      time: "06:00 PM – 07:30 PM",
      period: "PHASE I • RED CARPET",
      description: "Red carpet photo walk, badge collection, welcome mocktails, and fresh cardamom kahwa greeting.",
      category: "Reception",
      image: "https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "poster-2",
      title: "CONCERT & ATTAN",
      time: "07:30 PM – 09:30 PM",
      period: "PHASE II • MAIN STAGE",
      description: "Rubab symphonies, student live band, the grand Attan dance circle, and grand dinner buffet.",
      category: "Concert",
      image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "poster-3",
      title: "AWARDS & FAREWELL",
      time: "09:30 PM – 11:30 PM",
      period: "PHASE III • MEMORIES",
      description: "Senior video recap, awards presentation, faculty blessing, and emotional send-off under fireworks.",
      category: "Farewell",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
    },
  ] as ScheduleItem[],

  // Full detailed timeline for modal view
  fullSchedule: [
    { time: "05:30 PM", event: "Gates Open & Registration Desk Verification" },
    { time: "06:00 PM", event: "Welcome Red Carpet & Peshawari Kahwa Reception" },
    { time: "06:30 PM", event: "Recitation & Welcome Address by Society President" },
    { time: "07:00 PM", event: "Dean & Faculty Keynote Addresses" },
    { time: "07:30 PM", event: "Soulful Rubab Folk Concert & Student Performances" },
    { time: "08:30 PM", event: "Grand Royal Peshawari Dinner Buffet" },
    { time: "09:30 PM", event: "Traditional Attan Folk Dance Circle" },
    { time: "10:15 PM", event: "Department Awards, Senior Titles & Crests Distribution" },
    { time: "11:00 PM", event: "Graduating Batch Memory Montage & Final Speeches" },
    { time: "11:30 PM", event: "Farewell Photo Sessions & Closing Ceremony" },
  ],

  // Gallery of Peshawar Culture & Heritage (Section 1f & 3.5)
  gallery: [
    {
      title: "Islamia College Peshawar",
      location: "University Campus",
      image: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=900&q=80",
      caption: "The majestic Victorian brick architecture and historic clock tower of Peshawar.",
    },
    {
      title: "Mahabat Khan Mosque",
      location: "Andar Shehr, Old City",
      image: "https://images.unsplash.com/photo-1590076215667-873d32578505?auto=format&fit=crop&w=900&q=80",
      caption: "17th-century Mughal white marble minarets and intricate fresco ceilings.",
    },
    {
      title: "Qissa Khwani Bazaar",
      location: "Storytellers' Market",
      image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=900&q=80",
      caption: "Centuries of silk road hospitality, brewing brass samovars, and warm conversations.",
    },
    {
      title: "Historic Bala Hisar Fort",
      location: "Peshawar Valley",
      image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=900&q=80",
      caption: "Ancient fortress overlooking the gateway to the historic Khyber Pass.",
    },
    {
      title: "Artisanal Peshawari Chappal",
      location: "Jahangirpura Bazaar",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80",
      caption: "Pure leather double-stitched traditional footwear hand-shaped by master craftsmen.",
    },
    {
      title: "Pakhtun Hospitality & Attan",
      location: "Peshawar",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=900&q=80",
      caption: "Unity and jubilation in the synchronized rhythm of the ceremonial Attan dance.",
    },
  ] as GalleryItem[],

  // FAQ Accordion (Section 1g & 3.5)
  faqs: [
    {
      question: "Who is eligible to attend the CSDS Welcome & Farewell Night?",
      answer:
        "All registered students of the Computer Science & Data Science Department across Semesters 1 through 8, along with graduating seniors and respected faculty members, are warmly welcome.",
    },
    {
      question: "What is included in the Rs. 2,200 registration fee?",
      answer:
        "Your fee covers the full evening pass: unrestricted access to the Grand Peshawari Buffet Dinner (Chapli Kebab, Mutton Karahi, Shinwari platters, desserts, and free-flowing Peshawari Kahwa), live concert performances, traditional Attan circle, awards shield souvenir, and high-resolution photo booth access.",
    },
    {
      question: "How do I make the payment and upload the screenshot?",
      answer:
        "You can transfer Rs. 2,200 via Bank Transfer (Meezan Bank), Easypaisa, or JazzCash to the account details provided on the registration page. Save the transaction receipt screenshot, fill in your details, and upload it in the form. Our admin team will verify it within 12–24 hours.",
    },
    {
      question: "Is this event alcohol-free?",
      answer:
        "Yes, absolutely. In accordance with university regulations and cultural traditions, this event is 100% alcohol-free. We serve authentic hot Peshawari kahwa, spiced doodh patti chai, fresh mint lemonades, and gourmet mocktails throughout the evening.",
    },
    {
      question: "What should I bring on the day of the event?",
      answer:
        "Please bring your original Computerized National Identity Card (CNIC) or Student ID card, along with the digital QR entry pass that will be emailed to your registered address upon approval.",
    },
    {
      question: "What is the dress code for the evening?",
      answer:
        "Traditional cultural attire (Kurta Shalwar, Waistcoat, Peshawari Chappal, Pakol) or formal Western suits are warmly recommended to honor the festive occasion.",
    },
  ] as FaqItem[],

  // Contact & Organizer Rows (Section 1g & 3.5)
  contactRows: [
    {
      id: "venue",
      title: "Event Venue",
      detail: "Grand Marquee, Old Jamrud Road, University Town, Peshawar",
      actionText: "Open Map",
      actionHref: "https://maps.google.com/?q=University+Town+Peshawar",
      icon: "MapPin",
    },
    {
      id: "organizers",
      title: "Student Society Office",
      detail: "CSDS Department, Ground Floor, Academic Block B",
      actionText: "Contact Us",
      actionHref: "mailto:society.csds@uop.edu.pk",
      icon: "Users",
    },
    {
      id: "payment",
      title: "Payment & Verification Desk",
      detail: "Queries regarding Easypaisa, JazzCash, or screenshot review",
      actionText: "WhatsApp Help",
      actionHref: "https://wa.me/923459182736?text=Hi%2C%20I%20have%20a%20query%20about%20CSDS%20Party%20Registration",
      icon: "CreditCard",
    },
    {
      id: "general",
      title: "General Inquiries",
      detail: "Have a special diet requirement or batch questions?",
      actionText: "Ask Question",
      actionHref: "mailto:info.csdsnight@gmail.com",
      icon: "HelpCircle",
    },
  ],

  // Footer Social & Society Links
  footer: {
    copyright: "© 2026 CSDS Student Society. All rights reserved.",
    disclaimer:
      "Department of Computer Science & Data Science, Peshawar. An official university student community event.",
    links: [
      { label: "Home", href: "#home" },
      { label: "About", href: "#about" },
      { label: "Highlights", href: "#highlights" },
      { label: "Schedule", href: "#schedule" },
      { label: "Fee Details", href: "#fee" },
      { label: "Gallery", href: "#gallery" },
      { label: "FAQ", href: "#faq" },
      { label: "Admin Portal", href: "/admin/login" },
    ],
  },
};
