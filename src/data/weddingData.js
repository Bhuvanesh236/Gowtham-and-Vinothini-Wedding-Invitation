/**
 * 📜 MASTER WEDDING DATA — GOWTHAM & VINOTHINI
 * Exact structural match with riwaaz.in / rameswaram demo
 */

export const weddingData = {
  groom: "Goutham",
  bride: "Vinothini",
  headerPlace: "A wedding in Thimiri, Arcot",
  datesFormatted: "14 — 15 November",
  locationFormatted: "Thimiri, Arcot, Tamil Nadu",
  icsFilename: "Gowtham-and-Vinothini.ics",

  chapters: [
    {
      index: 0,
      number: "01",
      name: "The beginning",
      eyebrow: "With full hearts & our families’ blessings",
      isHero: true,
      groom: "Gowtham",
      bride: "Vinothini",
      note: "இரு இதயங்கள் இணைந்து… \nஓர் அழகிய இல்லம் தொடங்கும் தருணம்…",
      dateLine: "14 — 15 November",
      placeLine: "Thimiri, Arcot, Tamil Nadu",
      bgVideo: "/assets/1000138134.mp4",
      bgImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=2000&q=85",
    },
    {
      index: 1,
      number: "02",
      name: "The blessing",
      eyebrow: "In the quiet, we found our answer",
      heading: "Some journeys",
      italic: "feel like prayer.",
      note: "With grateful hearts and our elders’ blessings,\nwe take our first steps towards forever.",
      bgImage: "https://images.unsplash.com/photo-1609766418204-94aae0ecfddc?auto=format&fit=crop&w=2000&q=85",
    },
    {
      index: 2,
      number: "03",
      name: "The light",
      eyebrow: "A little light. A lifetime of love.",
      heading: "Every ordinary day.",
      italic: "With you.",
      note: "The morning chai. The long way home.\nSmall things that became our everything.",
      bgImage: "https://images.unsplash.com/photo-1600100397608-f010e42e4e75?auto=format&fit=crop&w=2000&q=85",
    },
    {
      index: 3,
      number: "04",
      name: "The gathering",
      eyebrow: "Two days, a thousand memories",
      heading: "A celebration",
      italic: "to come home to.",
      events: [
        { timeSpan: "14 Nov · Morning", title: "Haldi & family gathering" },
        { timeSpan: "14 Nov · Evening", title: "Sangeet under the stars" },
        { timeSpan: "15 Nov · Wedding Day", title: "Our wedding vows" }
      ],
      bgImage: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=2000&q=85",
    },
    {
      index: 4,
      number: "05",
      name: "The horizon",
      eyebrow: "Where the sea meets our story",
      heading: "A little salt air.",
      italic: "A new beginning.",
      note: "The horizon before us. Our loved ones beside us.\nNowhere else we’d rather be.",
      bgImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85",
    },
    {
      index: 5,
      number: "06",
      name: "The promise",
      eyebrow: "And a place for you in it all",
      heading: "Our forever.",
      italic: "Your presence.",
      note: "Meet us where the waves arrive like blessings.\nIt wouldn’t be the same without you.",
      ctaButton: "Join our celebration",
      detailsLink: "The wedding details",
      bgImage: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=2000&q=85",
    }
  ],

  // Detailed Celebrations Modal Info
  details: {
    title: "A celebration with you.",
    intro: "With the love and blessings of our families, join us for two days of laughter, music, and new beginnings in Thimiri, Arcot, Tamil Nadu.",
    venueNote: "Final venue details to follow · Kindly RSVP by 1 November",
    events: [
      {
        number: "01",
        start: "2026-11-14T09:00:00+05:30",
        end: "2026-11-14T13:00:00+05:30",
        dateString: "14 November · 9:00 am",
        title: "Haldi & Family Gathering",
        label: "Auspicious turmeric ceremony & lunch",
        venue: "Heritage Gardens, Thimiri",
        note: "Yellow / vibrant traditional ethnic attire"
      },
      {
        number: "02",
        start: "2026-11-14T18:30:00+05:30",
        end: "2026-11-14T23:00:00+05:30",
        dateString: "14 November · 6:30 pm",
        title: "Sangeet Under The Stars",
        label: "Music, dance performances & dinner",
        venue: "Temple Lawn, Arcot",
        note: "Festive evening attire"
      },
      {
        number: "03",
        start: "2026-11-15T09:30:00+05:30",
        end: "2026-11-15T14:30:00+05:30",
        dateString: "15 November · 9:30 am",
        title: "The Holy Muhurtham & Wedding Vows",
        label: "Sacred ceremonies & traditional feast",
        venue: "Grand Kalyana Mandapam, Thimiri, Arcot",
        note: "Traditional South Indian attire"
      }
    ]
  },

  audio: {
    src: "/assets/music/wedding-song.mp3",
    title: "Rameswaram Temple Melodies",
  }
};
