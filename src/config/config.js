const config = {
  data: {
    title: import.meta.env.VITE_TITLE || "Pernikahan Fulan & Fulana",
    description:
      import.meta.env.VITE_DESCRIPTION || "Kami akan menikah dan mengundang Anda untuk turut merayakan momen istimewa ini.",
    groomName: import.meta.env.VITE_GROOM_NAME || "Fulan",
    brideName: import.meta.env.VITE_BRIDE_NAME || "Fulana",
    parentGroom: import.meta.env.VITE_PARENT_GROOM || "Bapak Groom & Ibu Groom",
    parentBride: import.meta.env.VITE_PARENT_BRIDE || "Bapak Bride & Ibu Bride",
    date: import.meta.env.VITE_DATE || "2025-05-15",
    maps_url: import.meta.env.VITE_MAPS_URL || "https://goo.gl/maps/abcdef",
    maps_embed:
      import.meta.env.VITE_MAPS_EMBED || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0000000000005!2d106.8270733147699!3d-6.175392995514422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f4f1b6d7b1e7%3A0x2e69f4f1b6d7b1e7!2sMonumen%20Nasional!5e0!3m2!1sid!2sid!4v1633666820004!5m2!1sid!2sid",
    time: import.meta.env.VITE_TIME || "16:16 - 17:30 WIB",
    location: import.meta.env.VITE_LOCATION || "Grand Ballroom, Hotel Majesty",
    address: import.meta.env.VITE_ADDRESS || "Jl. Jend. Sudirman No.1, Jakarta",
    ogImage: import.meta.env.VITE_OG_IMAGE || "/images/og-image.jpg",
    favicon: import.meta.env.VITE_FAVICON || "/images/favicon.ico",
    agenda: [
      {
        title: import.meta.env.VITE_AGENDA1_TITLE || "Akad Nikah",
        date: import.meta.env.VITE_AGENDA1_DATE || "2024-12-24",
        startTime: import.meta.env.VITE_AGENDA1_START || "16:16",
        endTime: import.meta.env.VITE_AGENDA1_END || "17:30",
        location: import.meta.env.VITE_AGENDA1_LOCATION || "Grand Ballroom, Hotel Majesty",
        address: import.meta.env.VITE_AGENDA1_ADDRESS || "Jl. Jend. Sudirman No.1, Jakarta",
      },
      {
        title: import.meta.env.VITE_AGENDA2_TITLE || "Resepsi Nikah",
        date: import.meta.env.VITE_AGENDA2_DATE || "2024-12-24",
        startTime: import.meta.env.VITE_AGENDA2_START || "16:16",
        endTime: import.meta.env.VITE_AGENDA2_END || "17:30",
        location: import.meta.env.VITE_AGENDA2_LOCATION || "Grand Ballroom, Hotel Majesty",
        address: import.meta.env.VITE_AGENDA2_ADDRESS || "Jl. Jend. Sudirman No.1, Jakarta",
      }
    ],
    audio: {
      src: import.meta.env.VITE_AUDIO_SRC || "/audio/fulfilling-humming.mp3",
      title: import.meta.env.VITE_AUDIO_TITLE || "Fulfilling Humming",
      autoplay: import.meta.env.VITE_AUDIO_AUTOPLAY !== "false",
      loop: import.meta.env.VITE_AUDIO_LOOP !== "false"
    },
    banks: [
      {
        bank: import.meta.env.VITE_BANK1_NAME || "Bank Central Asia",
        accountNumber: import.meta.env.VITE_BANK1_NUMBER || "1234567890",
        accountName: import.meta.env.VITE_BANK1_ACCOUNT || "FULAN",
      },
      {
        bank: import.meta.env.VITE_BANK2_NAME || "Bank Mandiri",
        accountNumber: import.meta.env.VITE_BANK2_NUMBER || "0987654321",
        accountName: import.meta.env.VITE_BANK2_ACCOUNT || "FULANA",
      }
    ]
  }
};

export default config;
