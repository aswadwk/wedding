const config = {
  data: {
    title: import.meta.env.VITE_TITLE || "Pernikahan Fulan & Fulana",
    description:
      import.meta.env.VITE_DESCRIPTION || "Kami akan menikah dan mengundang Anda untuk turut merayakan momen istimewa ini.",
    groomName: "Hajar Aswad",
    url: import.meta.env.VITE_URL || "Hajar Aswad",
    brideName: "Puspa Permatasari",
    parentGroom: "Putra Sulung dari Bapak Wakka & Ibu Subayani",
    parentBride: "Putri Bungsu dari Bapak Dalle' & Ibu Mince",
    date: "Ahad, 15 Juni 2025",
    maps_url: "https://maps.app.goo.gl/y7Fh4cs44T8VqYAz5",
    maps_embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.6049906357016!2d119.9461046!3d-3.4458344999999992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d9411f240fc99cf%3A0x839e7cbb04040ff1!2sKALACIRI%20MUSIK%20AUDIO%20SISTEM!5e0!3m2!1sen!2sid!4v1748877810173!5m2!1sen!2sid",
    time: "10:00 - 14:30 WITA",
    location: "Resepsi Pernikahan",
    address: "Dusun Kalaciri, Desa Potokullin, Kec. Buntu Batu, Kab. Enrekang",
    ogImage: import.meta.env.VITE_OG_IMAGE || "images/og-image.jpg",
    favicon: import.meta.env.VITE_FAVICON || "favicon.ico",
    agenda: [
      {
        title: "Acara Malam",
        date: "Sabtu, 14 Juni 2025",
        startTime: "19.30",
        endTime: "22.30 WITA",
        location: "Dusun Kalaciri, Desa Potokullin, Kec. Buntu Batu, Kab. Enrekang (Kediaman mempelai Perempuan)",
        address: import.meta.env.VITE_AGENDA1_ADDRESS || "Jl. Jend. Sudirman No.1, Jakarta",
      },
      {
        title: "Akad Nikah",
        date: "Ahad, 15 Juni 2025",
        startTime: "10.00",
        endTime: "Sampai selesai",
        location: "Dusun Kalaciri, Desa Potokullin, Kec. Buntu Batu, Kab. Enrekang (Kediaman mempelai Perempuan)",
        address: import.meta.env.VITE_AGENDA1_ADDRESS || "Jl. Jend. Sudirman No.1, Jakarta",
      },
      {
        title: "Resepsi Pernikahan",
        date: "Ahad, 15 Juni 2025",
        startTime: "11.00",
        endTime: "14.30 WITA",
        location: "Dusun Kalaciri, Desa Potokullin, Kec. Buntu Batu, Kab. Enrekang (Kediaman mempelai Perempuan)",
        address: import.meta.env.VITE_AGENDA2_ADDRESS || "Jl. Jend. Sudirman No.1, Jakarta",
      },
      {
        title: "Resepsi Pernikahan",
        date: "Ahad, 15 Juni 2025",
        startTime: "16.00",
        endTime: "22.00 WITA",
        location: "Dusun Madata, Desa Lunjen, Kec. Buntu Batu, Kab. Enrekang (Kediaman mempelai Perempuan)",
        address: import.meta.env.VITE_AGENDA2_ADDRESS || "Jl. Jend. Sudirman No.1, Jakarta",
      }
    ],
    audio: {
      src: import.meta.env.VITE_AUDIO_SRC || "/audio/nasheed-audio.m4a",
      title: import.meta.env.VITE_AUDIO_TITLE || "Nasheed",
      autoplay: import.meta.env.VITE_AUDIO_AUTOPLAY !== "false",
      loop: import.meta.env.VITE_AUDIO_LOOP !== "false"
    },
    banks: [
      {
        bank: "Bank Rakyat Indonesia (BRI)",
        accountNumber: "758901004078539",
        accountName: "Puspa Permatasari",
      },
      {
        bank: "Bank Central Asia (BCA)",
        accountNumber: "7892121853",
        accountName: "Hajar Aswad",
      }
    ]
  }
};

export default config;
