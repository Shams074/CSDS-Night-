/**
 * Master configuration file for CSDS Department Welcome Party & Farewell Night.
 *
 * 📸 PHOTO CUSTOMIZATION GUIDE:
 * To replace any photo with your own picture:
 * 1. Place your image files into the 'public/images/' folder (e.g. 'public/images/hero.jpg').
 * 2. In this file, change the corresponding URL to '/images/hero.jpg' (or use your own hosted image link).
 */

export interface HighlightItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: "food" | "music" | "culture" | "games" | "awards" | "photo";
  image: string;
  badge?: string;
}

export interface ScheduleItem {
  id: string;
  phase: string;
  title: string;
  time: string;
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

export interface FaqItem {
  question: string;
  answer: string;
}

export const EVENT_CONFIG = {
  // Core Event Details
  title: "CSDS Welcome & Farewell Night",
  year: "2026",
  department: "Department of Computer Science & Data Science",
  society: "CSDS Student Society",
  tagline: "ONE NIGHT FOR ARTISTS, FRESHERS, SENIORS AND SOUND",
  shortDescription:
    "An exclusive annual celebration uniting graduating seniors and welcoming the new batch of CSDS under the starlit sky of Peshawar.",

  // Date, Time & Venue
  date: "November 14, 2026",
  time: "6:00 PM – 11:30 PM PKT",
  doorsOpen: "5:30 PM",
  venue: "Grand Marquee, University Town",
  venueAddress: "Old Jamrud Road, University Town, Peshawar, KPK",
  city: "Peshawar, Pakistan",
  countdownTarget: "2026-11-14T18:00:00+05:00",
  seatCapacity: 350,

  // 📸 CENTRAL PHOTO SLOTS (Easily swappable with your own images)
  images: {
    // Hero main background (crowd, stage, or venue)
    hero: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1920&q=85",
    // About feature photo
    about: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
    // Registration fee split block photo (group / students / friends)
    feeCard: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80",
  },

  // Registration Fee & Financials
  fee: {
    amount: 2200,
    formatted: "Rs. 2,200",
    unit: "per person",
    note: "All-inclusive: Royal Peshawari Buffet Dinner, Live Musical Concert, Attan Dance, Souvenirs & Digital Access Pass.",
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
        note: "Upload clear screenshot of the successful transaction SMS / receipt",
      },
    ],
    instructions: [
      "Transfer Rs. 2,200 via Bank, Easypaisa, or JazzCash to any account above.",
      "Take a clear screenshot of the transaction receipt showing the Transaction ID & Date.",
      "Fill in your student credentials (Name, Section, Semester, CNIC).",
      "Upload your payment screenshot (JPG/PNG/WebP, max 5 MB).",
      "Your official entry pass with QR code will be emailed upon review.",
    ],
  },

  // Dropdown lists
  sections: ["A", "B", "C", "D"],
  semesters: [1, 2, 3, 4, 5, 6, 7, 8],

  // Highlights Section (Numbered cards: [01], [02], [03]...)
  highlights: [
    {
      id: "food",
      number: "01",
      title: "ROYAL PESHAWARI DAWAT",
      subtitle: "Authentic Chapli Kebab, Namak Mandi Karahi, Dum Pukht & Kahwa",
      category: "food",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
      badge: "Pure Feast",
    },
    {
      id: "music",
      number: "02",
      title: "LIVE CONCERT & RUBAB",
      subtitle: "Soulful Pashto folk strings, contemporary rock & Urdu acoustic night",
      category: "music",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
      badge: "Live Band",
    },
    {
      id: "culture",
      number: "03",
      title: "TRADITIONAL ATTAN CIRCLE",
      subtitle: "High-energy ceremonial circle dance uniting every batch in synchronized rhythm",
      category: "culture",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80",
      badge: "Heritage",
    },
    {
      id: "games",
      number: "04",
      title: "DEPARTMENT ROAST & GAMES",
      subtitle: "Trivia battles, senior-junior showdowns, and live stage entertainment",
      category: "games",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
      badge: "Fun & Roast",
    },
    {
      id: "awards",
      number: "05",
      title: "AWARDS & FAREWELL HONORS",
      subtitle: "Personalized senior crests, batch superlatives, and graduation tributes",
      category: "awards",
      image: "https://images.unsplash.com/photo-1569974498991-d3c12a504f95?auto=format&fit=crop&w=800&q=80",
      badge: "Memorabilia",
    },
    {
      id: "photobooth",
      number: "06",
      title: "STUDIO PHOTO PAVILION",
      subtitle: "High-res instant portrait station with cultural pakols, turbans & props",
      category: "photo",
      image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80",
      badge: "Memories",
    },
  ] as HighlightItem[],

  // Detail Switcher Tabs (Food, Music, Activities)
  detailTabs: {
    food: [
      {
        title: "Taza Chapli Kebab",
        description: "Peshawar's iconic fried beef kebabs flavored with crushed pomegranate, coriander, and heirloom tomatoes.",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
        tag: "Specialty",
      },
      {
        title: "Namak Mandi Mutton Karahi",
        description: "Slow-simmered shinwari mutton karahi in natural lamb fat with black pepper and green chilies.",
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
        tag: "Shinwari",
      },
      {
        title: "Peshawari Kahwa & Doodh Patti",
        description: "Hot green tea brewed with green cardamom served with cardamom nuql, plus rich spiced milk chai.",
        image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
        tag: "Beverage",
      },
    ],
    music: [
      {
        title: "Classical Rubab Symphony",
        description: "Soul-stirring instrumental performance blending timeless Pakhtun melodies with acoustic strings.",
        image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80",
        tag: "Folk Strings",
      },
      {
        title: "Student Indie Band",
        description: "Live Urdu acoustic covers, rock medleys, and nostalgic campus songs by CSDS musicians.",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
        tag: "Live Sets",
      },
      {
        title: "The Grand Attan",
        description: "The rhythmic ceremonial circle dance to thunderous Dhol beats that closes the night.",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
        tag: "Cultural Peak",
      },
    ],
    activities: [
      {
        title: "Senior-Junior Roast & Quiz",
        description: "Good-humored departmental stand-up, funny video montages, and rapid-fire quiz showdowns.",
        image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
        tag: "Comedy",
      },
      {
        title: "Superlative Batch Awards",
        description: "Shields honoring 'Most Likely to Deploy on Friday', 'Night Owl Hacker', and 'Class MVP'.",
        image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=800&q=80",
        tag: "Shields",
      },
      {
        title: "High-Res Photo Booth",
        description: "Studio portraits with traditional Peshawari turbans, pakols, and graduation frames.",
        image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80",
        tag: "Portraits",
      },
    ],
  } as Record<string, DetailTabCard[]>,

  // Schedule Poster Cards
  schedulePosters: [
    {
      id: "phase-1",
      phase: "[01]",
      title: "WELCOME & RED CARPET",
      time: "06:00 PM – 07:30 PM",
      description: "Arrival, badge collection, welcome mocktails, and steaming Peshawari kahwa greeting.",
      category: "Reception",
      image: "https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "phase-2",
      phase: "[02]",
      title: "CONCERT, ATTAN & FEAST",
      time: "07:30 PM – 09:30 PM",
      description: "Rubab symphonies, student live acoustic set, grand dinner buffet, and the traditional Attan circle.",
      category: "Main Stage",
      image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "phase-3",
      phase: "[03]",
      title: "AWARDS & FAREWELL FINALE",
      time: "09:30 PM – 11:30 PM",
      description: "Senior documentary montage, departmental shields presentation, faculty blessing, and finale send-off.",
      category: "Finale",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
    },
  ] as ScheduleItem[],

  // Full detailed timeline for modal view
  fullSchedule: [
    { time: "05:30 PM", event: "Gates Open & Registration Desk Verification" },
    { time: "06:00 PM", event: "Welcome Red Carpet & Peshawari Kahwa Reception" },
    { time: "06:30 PM", event: "Welcome Address by Student Society President" },
    { time: "07:00 PM", event: "Faculty & Dean Keynote Remarks" },
    { time: "07:30 PM", event: "Soulful Rubab Folk Concert & Student Performances" },
    { time: "08:30 PM", event: "Grand Royal Peshawari Dinner Buffet" },
    { time: "09:30 PM", event: "Traditional Attan Folk Dance Circle" },
    { time: "10:15 PM", event: "Department Awards, Senior Titles & Crests Distribution" },
    { time: "11:00 PM", event: "Graduating Batch Memory Montage & Speeches" },
    { time: "11:30 PM", event: "Farewell Photo Sessions & Closing Ceremony" },
  ],

  // FAQ Accordion
  faqs: [
    {
      question: "Who is eligible to attend the CSDS Welcome & Farewell Night?",
      answer:
        "All registered students of the Computer Science & Data Science Department across Semesters 1 through 8, along with graduating seniors and faculty members, are warmly welcome.",
    },
    {
      question: "What is included in the Rs. 2,200 registration fee?",
      answer:
        "Your pass is all-inclusive: full access to the Royal Peshawari Buffet Dinner, live concert, Attan dance circle, departmental souvenir crest, and high-res photo pavilion access.",
    },
    {
      question: "How do I make the payment and upload the screenshot?",
      answer:
        "Transfer Rs. 2,200 via Bank Transfer (Meezan Bank), Easypaisa, or JazzCash to the account details provided. Upload the receipt screenshot in the form. Our admin committee verifies submissions within 12–24 hours.",
    },
    {
      question: "Is this event alcohol-free?",
      answer:
        "Yes, 100%. In accordance with university traditions and cultural values, this event is completely alcohol-free. We serve hot Peshawari kahwa, cardamom doodh patti chai, and fresh mocktails throughout the night.",
    },
    {
      question: "What should I bring on the day of the event?",
      answer:
        "Please bring your original CNIC or Student ID card, along with the digital QR entry pass that will be emailed to your registered address upon approval.",
    },
  ] as FaqItem[],

  // Contact & Organizer Rows
  contactRows: [
    {
      id: "venue",
      title: "Event Venue",
      detail: "Grand Marquee, Old Jamrud Road, University Town, Peshawar",
      actionText: "Map ↗",
      actionHref: "https://maps.google.com/?q=University+Town+Peshawar",
      icon: "MapPin",
    },
    {
      id: "organizers",
      title: "Student Society Desk",
      detail: "CSDS Department, Ground Floor, Academic Block B",
      actionText: "Email ↗",
      actionHref: "mailto:society.csds@uop.edu.pk",
      icon: "Users",
    },
    {
      id: "payment",
      title: "Payment Verification Desk",
      detail: "Queries regarding Easypaisa, JazzCash, or screenshot review",
      actionText: "WhatsApp ↗",
      actionHref: "https://wa.me/923459182736?text=Hi%2C%20I%20have%20a%20query%20about%20CSDS%20Party%20Registration",
      icon: "CreditCard",
    },
  ],

  // Footer
  footer: {
    copyright: "© 2026 CSDS Student Society. All rights reserved.",
    links: [
      { label: "Home", href: "#home" },
      { label: "Highlights", href: "#highlights" },
      { label: "Schedule", href: "#schedule" },
      { label: "Fee & Pass", href: "#fee" },
      { label: "FAQ", href: "#faq" },
      { label: "Admin Portal", href: "/admin/login" },
    ],
  },
};
