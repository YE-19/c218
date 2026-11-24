/**
 * =========================================================================
 * ملف بيانات وتفاصيل دعوة الخطوبة
 * INVITATION CONFIGURATION FILE
 * =========================================================================
 * عدّل بيانات المناسبة من هذا الملف.
 * =========================================================================
 */

export const INVITATION_DATA = {
  // ترويسة الغلاف والظرف
  envelopeHeader: "We're getting engaged",

  // Names shown on the opening screen
  scriptNames: "Seif & Habiba",

  // ترويسة الدعوة
  headerTitleEn: "THE ENGAGEMENT OF",
  headerTitleAr: "حفل خطوبة مبارك",

  // بيانات العريس
  groom: {
    name: "Seif",
    nameAr: "سيف",
    subtitle: "GROOM"
  },

  // بيانات العروس
  bride: {
    name: "Habiba",
    nameAr: "حبيبة",
    subtitle: "BRIDE"
  },

  // عبارة الدعوة الترحيبية بالإنجليزية
  welcomeMessage: "Join us to celebrate the engagement of Seif & Habiba.",

  // تفاصيل الموعد والوقت (العد التنازلي)
  schedule: {
    headingEn: "THE ENGAGEMENT PARTY",
    timeDisplay: "7:00 PM",
    dateDayName: "FRIDAY",
    dateDayNameAr: "الجمعة",
    dateDayNumber: "29",
    dateMonthYear: "JANUARY 2027",
    dateMonthYearAr: "يناير ٢٠٢٧",
    targetDateTime: "2027-01-29T19:00:00"
  },

  // تفاصيل المكان وخريطة Google Maps
  location: {
    title: "LOCATION",
    venueName: "L'opulence",
    venueNameAr: "L'opulence",
    address: "",
    addressAr: "",
    googleMapsUrl: "https://maps.app.goo.gl/VXq1LAPb5XWiBCiRA?g_st=iw"
  },

  // تأكيد الحضور ورسائل التهنئة للعروسين (RSVP)
  rsvp: {
    title: "RSVP",
    subtitle: "PLEASE CONFIRM YOUR ATTENDANCE",
    namePlaceholder: "Name",
    messagePlaceholder: "Leave a message for Seif & Habiba...",
    submitText: "SEND RSVP",
    successHeading: "THANK YOU!",
    successMessage: "Your message has been received with love for Seif & Habiba ❤️"
  },

  // مسار ملف الموسيقى الرومانسية
  audioTrack: "/song.mp3"
};

