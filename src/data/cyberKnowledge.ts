import { QuickQuestionItem, GlossaryTerm, QuizQuestion } from '../types/chat';

export const SUGGESTED_QUESTIONS: QuickQuestionItem[] = [
  {
    id: 'q1',
    category: 'Asas',
    question: 'Apakah maksud keselamatan data?',
  },
  {
    id: 'q2',
    category: 'Ancaman',
    question: 'Apakah itu phishing?',
  },
  {
    id: 'q3',
    category: 'Ancaman',
    question: 'Bagaimanakah kebocoran data berlaku?',
  },
  {
    id: 'q4',
    category: 'Ancaman',
    question: 'Apakah maksud kecurian identiti?',
  },
  {
    id: 'q5',
    category: 'Perlindungan',
    question: 'Bagaimanakah cara melindungi maklumat peribadi?',
  },
  {
    id: 'q6',
    category: 'Media Sosial',
    question: 'Apakah langkah keselamatan ketika menggunakan media sosial?',
  },
  {
    id: 'q7',
    category: 'Perlindungan',
    question: 'Mengapakah Pengesahan Dua Faktor (2FA) sangat penting?',
  },
  {
    id: 'q8',
    category: 'AI & Etika',
    question: 'Apakah etika keselamatan data semasa menggunakan teknologi AI?',
  },
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'Phishing',
    istilahMelayu: 'Pemancingan Data',
    definisi: 'Bentuk penipuan siber di mana penjenayah menyamar sebagai entiti dipercayai (seperti bank atau kurier) untuk memperdaya mangsa menyerahkan maklumat sulit seperti kata laluan dan no. kad kredit.',
    contoh: 'Menerima e-mel atau SMS palsu dengan pautan: "Akaun anda disekat, klik di sini untuk sahkan".',
    tips: 'Sentiasa periksa alamat e-mel penghantar dan jangan klik pautan daripada sumber yang tidak disahkan.',
    kategori: 'Ancaman',
  },
  {
    term: 'Two-Factor Authentication (2FA)',
    istilahMelayu: 'Pengesahan Dua Faktor',
    definisi: 'Lapisan keselamatan tambahan yang memerlukan dua bentuk pengenalan sebelum membenarkan akses ke akaun, contohnya gabungan kata laluan dan kod OTP SMS/Aplikasi Authenticator.',
    contoh: 'Selepas memasukkan kata laluan Instagram, aplikasi menghantar kod 6 digit ke telefon anda.',
    tips: 'Aktifkan 2FA di semua akaun penting termasuk e-mel, media sosial, dan perbankan.',
    kategori: 'Perlindungan',
  },
  {
    term: 'Data Breach',
    istilahMelayu: 'Kebocoran Data',
    definisi: 'Insiden keselamatan di mana maklumat sensitif, rahsia atau dilindungi disalin, dihantar, dilihat, atau dicuri oleh individu yang tidak dibenarkan.',
    contoh: 'Penggodam menceroboh pangkalan data syarikat e-dagang dan menjual senarai nama, nombor telefon dan alamat pelanggan.',
    tips: 'Gunakan kata laluan berbeza bagi setiap platform supaya kebocoran di satu laman tidak menjejaskan akaun lain.',
    kategori: 'Ancaman',
  },
  {
    term: 'Identity Theft',
    istilahMelayu: 'Kecurian Identiti',
    definisi: 'Jenayah menggunakan maklumat peribadi orang lain (seperti nama penuh, nombor kad pengenalan, atau gambar) tanpa kebenaran untuk melakukan penipuan, memohon pinjaman, atau menyamar.',
    contoh: 'Scammer mencipta akaun media sosial palsu menggunakan gambar dan nama anda untuk meminjam wang daripada rakan anda.',
    tips: 'Elakkan memuat naik gambar kad pengenalan atau dokumen rasmi di media sosial.',
    kategori: 'Ancaman',
  },
  {
    term: 'Digital Footprint',
    istilahMelayu: 'Jejak Digital',
    definisi: 'Jejak dan rekod semua aktiviti yang anda tinggalkan di internet, termasuk sejarah carian, komen, gambar yang dimuat naik, dan lokasi yang ditandakan.',
    contoh: 'Komen lama di forum atau status yang boleh ditemui oleh bakal majikan melalui enjin carian Google.',
    tips: 'Fikirkan implikasi jangka panjang sebelum membuat sebarang hantaran di alam maya.',
    kategori: 'Media Sosial',
  },
  {
    term: 'Encryption',
    istilahMelayu: 'Penyulitan Data',
    definisi: 'Proses menukar maklumat biasa kepada kod rahsia (ciphertext) supaya hanya pihak yang mempunyai kunci penyahsulitan sahaja yang boleh membacanya.',
    contoh: 'Aplikasi WhatsApp menggunakan end-to-end encryption supaya mesej hanya dibaca oleh penghantar dan penerima.',
    tips: 'Pastikan laman web yang anda layari mempunyai simbol mangga dan menggunakan protokol "https://".',
    kategori: 'Perlindungan',
  },
  {
    term: 'Malware & Ransomware',
    istilahMelayu: 'Perisian Hasad & Perisian Tebusan',
    definisi: 'Perisian berniat jahat yang direka untuk merosakkan, mengintip atau menyekat akses fail peranti anda sehingga wang tebusan dibayar.',
    contoh: 'Memuat turun fail permainan cetak rompak yang menyebabkan komputer terkunci dan meminta bayaran Bitcoin.',
    tips: 'Pasang perisian antivirus rasmi dan elakkan memuat turun aplikasi daripada sumber tidak sah (APK rawak).',
    kategori: 'Ancaman',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    soalan: 'Anda menerima mesej SMS yang mendakwa akaun bank anda telah digantung dan meminta anda klik pautan segera. Apakah tindakan terbaik?',
    pilihan: [
      'Klik pautan segera dan masukkan kata laluan untuk sahkan akaun.',
      'Abaikan mesej, jangan klik pautan, dan hubungi pihak bank melalui talian rasmi.',
      'Kongsikan mesej tersebut kepada semua kenalan di WhatsApp.',
      'Balas SMS itu dengan nombor kad pengenalan anda.'
    ],
    jawapanBetul: 1,
    penerangan: 'Tepat sekali! Ini adalah taktik phishing klasik. Pihak institusi kewangan tidak akan sekali-kali menghantar pautan melalui SMS untuk meminta kata laluan anda.',
  },
  {
    id: 2,
    soalan: 'Apakah ciri kata laluan yang paling kukuh dan selamat daripada godaman?',
    pilihan: [
      'Nama sendiri berserta tahun kelahiran (cth: ali1998)',
      'Gabungan sekurang-kurangnya 12 aksara merangkumi huruf besar, huruf kecil, nombor, dan simbol khas.',
      'Nombor berturutan yang mudah diingati (cth: 12345678)',
      'Kata laluan yang sama digunakan untuk semua akaun media sosial dan e-mel.'
    ],
    jawapanBetul: 1,
    penerangan: 'Bagus! Kata laluan yang panjang, kompleks dan unik bagi setiap akaun dapat menghalang serangan brute-force dan pencerobohan bersiri.',
  },
  {
    id: 3,
    soalan: 'Apakah fungsi utama Pengesahan Dua Faktor (Two-Factor Authentication / 2FA)?',
    pilihan: [
      'Menjadikan sambungan internet telefon anda dua kali lebih laju.',
      'Menambah lapisan perlindungan kedua seperti kod OTP atau aplikasi pengesah selain kata laluan.',
      'Membolehkan sesiapa sahaja membuka peranti anda tanpa kata laluan.',
      'Menghapuskan keperluan memasukkan sebarang kata laluan.'
    ],
    jawapanBetul: 1,
    penerangan: 'Cemerlang! Walaupun penggodam berjaya mencuri kata laluan anda, mereka tetap dihalang tanpa kod keselamatan 2FA yang berada pada peranti fizikal anda.',
  },
  {
    id: 4,
    soalan: 'Ketika menggunakan Wi-Fi percuma di kafe awam, apakah amalan yang patut anda elakkan?',
    pilihan: [
      'Membaca berita atau artikel umum.',
      'Melakukan transaksi perbankan dalam talian atau memasukkan maklumat kad kredit.',
      'Mematikan fungsi Bluetooth telefon anda.',
      'Menyemak ramalan cuaca semasa.'
    ],
    jawapanBetul: 1,
    penerangan: 'Tepat sekali! Rangkaian Wi-Fi awam selalunya tidak disulitkan, memudahkan penjenayah siber memintas lalu lintas data sensitif anda.',
  },
  {
    id: 5,
    soalan: 'Apakah risiko utama berkongsi lokasi masa nyata (live location) dan tiket penerbangan di media sosial?',
    pilihan: [
      'Bateri telefon anda akan menjadi lebih tahan lama.',
      'Mendedahkan jadual ketiadaan anda di rumah dan mendedahkan kod bar/data peribadi kepada penjenayah.',
      'Menjadikan akaun anda disahkan rasmi (verified).',
      'Tiada sebarang risiko keselamatan.'
    ],
    jawapanBetul: 1,
    penerangan: 'Betul! Penjenayah boleh mengetahui rumah anda kosong, dan kod bar pada tiket kapal terbang mengandungi maklumat sulit perjalanan serta data peribadi anda.',
  },
];

export const SAFETY_GOLDEN_RULES = [
  {
    num: '01',
    title: 'Kerahsiaan Kod OTP / TAC',
    desc: 'Jangan sekali-kali kongsikan kod OTP atau TAC kepada sesiapa, walaupun mereka mendakwa dari pihak bank atau polis.',
    icon: 'ShieldAlert',
  },
  {
    num: '02',
    title: 'Kata Laluan Unik & Kuat',
    desc: 'Gunakan frasa laluan (passphrase) yang panjang dan berbeza untuk setiap platform. Gunakan pengurus kata laluan (Password Manager).',
    icon: 'KeyRound',
  },
  {
    num: '03',
    title: 'Waspada Pautan Luar (Phishing)',
    desc: 'Semak ejaan domain laman web dengan teliti. Elakkan klik pautan daripada nombor yang tidak dikenali atau e-mel mencurigakan.',
    icon: 'Eye',
  },
  {
    num: '04',
    title: 'Aktifkan 2FA / MFA',
    desc: 'Kunci akaun e-mel, perbankan dan media sosial anda dengan lapisan pengesahan kedua untuk perlindungan berganda.',
    icon: 'Lock',
  },
  {
    num: '05',
    title: 'Kawal Privasi Media Sosial',
    desc: 'Tetapkan akaun peribadi kepada mod privasi, semak senarai rakan, dan jangan dedahkan lokasi semasa atau dokumen rasmi.',
    icon: 'UserCheck',
  },
];

/**
 * Enjin Pengetahuan Siber Cikgu Amal
 * Berfungsi sebagai sandaran pintar apabila aplikasi diakses di persekitaran statik (seperti GitHub Pages)
 * atau ketika berlaku gangguan rangkaian ke pelayan.
 */
export function getCikguAmalKnowledgeAnswer(userQuestion: string): string {
  const q = userQuestion.toLowerCase().trim();

  if (q.includes('phishing') || q.includes('pancing') || q.includes('pautan palsu') || q.includes('sms palsu') || q.includes('scam')) {
    return `Salam sejahtera! Bagus sekali soalan anda mengenai ancaman ini. Cikgu terangkan ya! 🤖🎣

### 🎣 Apakah Maksud Phishing (Pemancingan Data)?
**Phishing** ialah taktik penipuan siber licik di mana penjenayah menyamar sebagai pihak berwibawa (seperti institusi bank, kurier PosLaju/J&T, agensi kerajaan, atau rakan anda) untuk memancing maklumat peribadi, nombor akaun, atau kata laluan anda.

### ⚠️ Tanda-Tanda Utama Serangan Phishing:
1. **Bahasa Cemas & Mendesak**: "Akaun anda disekat dalam 2 jam! Klik segera untuk sahkan!"
2. **Pautan Ganjil / Menyamar**: Alamat pautan mempunyai ejaan pelik (contoh: *maybank2u-update.cc* bukannya domain rasmi *maybank2u.com.my*).
3. **Meminta Maklumat Rahsia**: Pihak bank atau kurier **TIDAK AKAN** meminta kata laluan, nombor PIN, atau kod OTP/TAC anda.

### 💡 Tips Perlindungan Cikgu Amal:
- **Jangan Klik**: Abaikan pautan dalam SMS atau e-mel yang mencurigakan.
- **Saluran Rasmi**: Buka aplikasi rasmi atau taip alamat web sendiri secara terus di pelayar.
- **Buat Laporan**: Laporkan kepada Pusat Tindak Balas Penipuan Kebangsaan (NSRC di talian 997) jika ada transaksi yang tidak sah!`;
  }

  if (q.includes('kata laluan') || q.includes('password') || q.includes('frasa laluan')) {
    return `Salam sejahtera! Soalan tentang kata laluan adalah asas paling penting dalam kubu pertahanan siber kita! 🤖🔐

### 🔐 Panduan Kata Laluan Kebal Cikgu Amal:
Kata laluan yang baik mestilah sukar diteka oleh komputer penjenayah mahupun orang di sekeliling anda.

### ❌ Elakkan Amalan Ini:
- Menggunakan nama sendiri, nama anak, atau tarikh lahir (cth: *ali1998*).
- Menggunakan turutan papan kekunci (cth: *123456*, *qwerty*).
- Menggunakan kata laluan yang sama untuk akaun e-mel, Facebook, dan perbankan.

### ✅ Ciri Kata Laluan Kukuh (Frasa Laluan):
1. **Panjang Minimum 12-16 Aksara**: Lebih panjang kata laluan, lebih mustahil untuk digodam secara *brute-force*.
2. **Gabungan 4 Elemen**: Huruf besar (A-Z), huruf kecil (a-z), angka (0-9), dan simbol khas (!@#$%^&*).
3. **Teknik Frasa Rahsia**: Gabungkan 3-4 perkataan rawak yang bermakna bagi anda tetapi mustahil diteka orang lain (cth: *KucingLompatBintang#2026*).

### 💡 Tips Cikgu Amal:
Gunakan **Pengurus Kata Laluan (Password Manager)** seperti Bitwarden atau pengurus kata laluan peranti anda agar anda tidak perlu menghafal puluhan kata laluan rumit!`;
  }

  if (q.includes('2fa') || q.includes('mfa') || q.includes('dua faktor') || q.includes('otp') || q.includes('tac')) {
    return `Hebat! Anda bertanyakan tentang salah satu perisai siber paling berkesan hari ini! 🤖🛡️

### 🛡️ Apakah Itu Pengesahan Dua Faktor (2FA / MFA)?
**2FA (Two-Factor Authentication)** ialah lapisan pertahanan tambahan selepas kata laluan. Ia memerlukan dua bukti identiti berbeza sebelum akaun anda boleh dibuka:
1. **Faktor Pertama**: Sesuatu yang anda **tahu** (Kata laluan / PIN anda).
2. **Faktor Kedua**: Sesuatu yang anda **miliki** (Peranti telefon anda yang menerima kod OTP SMS, aplikasi Google Authenticator, atau cap jari).

### 💡 Mengapa 2FA Sangat Penting?
Walaupun penggodam berjaya mencuri atau meneka kata laluan anda melalui pautan phishing, mereka **TETAP GAGAL** menceroboh akaun anda kerana mereka tidak memiliki telefon anda untuk mendapatkan kod pengesahan kedua!

### ⚠️ Amaran Emas Cikgu Amal:
**JANGAN SESEKALI berkongsi kod OTP / TAC kepada sesiapa pun**, termasuk mereka yang mendakwa diri sebagai pegawai bank, pihak polis, atau rakan yang kononnya tersalah hantar nombor TAC!`;
  }

  if (q.includes('kebocoran data') || q.includes('data breach') || q.includes('bocor')) {
    return `Topik yang sangat tepat pada masanya! Kebocoran data kerap menjadi berita utama di seluruh dunia. 🤖🔓

### 🔓 Apakah Maksud Kebocoran Data (Data Breach)?
Kebocoran data berlaku apabila data sulit, rekod peribadi pengguna, atau rahsia korporat terlepas daripada pelayan yang selamat ke tangan pihak luar tanpa kebenaran.

### 🔍 Punca Utama Kebocoran Data:
1. **Kelemahan Keselamatan Pelayan (Vulnerabilities)**: Penggodam mengeksploitasi pepijat perisian untuk mencuri data pelanggan.
2. **Kesilapan Manusia (Human Error)**: Pentadbir sistem terlupa menyulitkan pangkalan data (*unencrypted database*) atau tersalah kongsi fail sulit secara awam.
3. **Serangan Malware/Ransomware**: Pekerja syarikat membuka lampiran berniat jahat yang memberi akses pintu belakang (*backdoor*) kepada penceroboh.

### 💡 Tindakan Anda Jika Data Bocor:
- Tukar kata laluan akaun terjejas dengan serta-merta.
- Aktifkan 2FA pada akaun berkaitan.
- Semak rekod transaksi bank secara berkala untuk sebarang aktiviti yang mencurigakan.
- Anda boleh semak sama ada e-mel anda pernah terlibat melalui laman semakan keselamatan seperti *haveibeenpwned.com*.`;
  }

  if (q.includes('kecurian identiti') || q.includes('identity theft') || q.includes('mykad') || q.includes('kad pengenalan')) {
    return `Soalan yang sangat kritikal! Kecurian identiti boleh membawa kerugian kewangan dan emosi yang besar. 🤖👤

### 👤 Apakah Itu Kecurian Identiti?
**Kecurian Identiti** berlaku apabila penjenayah siber memperoleh maklumat peribadi anda (seperti nama penuh, nombor MyKad, gambar, dan alamat rumah) dan menggunakannya untuk menyamar sebagai diri anda.

### 🚨 Jenayah Yang Dilakukan Melalui Identiti Curian:
- Membuka akaun bank keldai (*mule account*) untuk mencuci wang haram.
- Memohon pinjaman wang atas nama mangsa.
- Mendaftar nombor telefon atau akaun media sosial palsu untuk menipu orang lain.

### 💡 Panduan Cikgu Amal Melindungi MyKad & Dokumen:
1. **Buat Garisan Palang (Cross-line)**: Apabila perlu menghantar salinan MyKad untuk urusan rasmi, palang dua garisan selari di bucu dan tuliskan tujuan spesifik (cth: *UNTUK URUSAN PENDAFTARAN TALIAN TELEFON SAHAJA*).
2. **Jangan Muat Naik di Media Sosial**: Jangan sesekali menayangkan gambar IC, slip gaji, surat tawaran kerja atau tiket penerbangan di internet.`;
  }

  if (q.includes('media sosial') || q.includes('jejak digital') || q.includes('digital footprint') || q.includes('instagram') || q.includes('tiktok') || q.includes('facebook')) {
    return `Media sosial adalah medan utama interaksi hari ini, jadi keselamatan privasi mesti diutamakan! 🤖📱

### 📱 Panduan Bijak Media Sosial & Jejak Digital:
Setiap gambar, komen, carian, dan pautan yang anda klik membentuk **Jejak Digital (Digital Footprint)** anda yang kekal di alam maya.

### 🛡️ Langkah Keselamatan Praktikal:
1. **Kunci Akaun Kepada 'Private'**: Hadkan perkongsian hanya kepada keluarga dan sahabat yang anda benar-benar kenali di dunia nyata.
2. **Elakkan 'Oversharing'**: Jangan kongsi jadual harian, gambar bahagian luar rumah yang menampakkan nombor plat kenderaan, atau lokasi masa nyata (*live location*).
3. **Waspada Permainan Kuiz Rawak**: Elakkan menyertai kuiz di media sosial yang bertanyakan "Apakah nama haiwan peliharaan pertama anda?" atau "Bulan berapakah anda dilahirkan?"—ini sering merupakan soalan keselamatan kata laluan anda!
4. **Semak Tetapan Privasi**: Luangkan masa 10 minit setiap bulan untuk menyemak senarai rakan dan kebenaran aplikasi (*app permissions*).

*Ingat moto Cikgu Amal: Fikir sebelum klik, selidik sebelum kongsi!* ✨`;
  }

  if (q.includes('wi-fi') || q.includes('wifi') || q.includes('awam') || q.includes('public')) {
    return `Perhatian yang sangat bijak! Wi-Fi percuma memang menarik, tetapi ada bahaya tersembunyi. 🤖☕

### ⚠️ Bahaya Wi-Fi Percuma di Tempat Awam:
Rangkaian Wi-Fi di kafe, lapangan terbang atau hotel selalunya tidak disulitkan (*open/unencrypted*).

### 🚨 Ancaman Yang Boleh Berlaku:
- **Serangan 'Man-in-the-Middle'**: Penggodam yang bersambung ke rangkaian Wi-Fi yang sama boleh memintas paket data yang dihantar oleh peranti anda.
- **Rangkaian Palsu ('Evil Twin')**: Scammer mencipta nama Wi-Fi serupa seperti "Starbucks_Free_WiFi" untuk memperdaya pengunjung menyambung kepadanya.

### 💡 Panduan Selamat Cikgu Amal:
1. **JANGAN Sekali-kali Log Masuk Perbankan Dalam Talian** atau membuat bayaran kad kredit semasa menggunakan Wi-Fi awam.
2. **Gunakan Data Mudah Alih Sendiri (4G/5G)** untuk urusan sensitif.
3. **Gunakan VPN (Virtual Private Network)** jika terpaksa menggunakan Wi-Fi awam untuk mengenkripsi trafik internet anda.
4. Matikan fungsi *Auto-Connect Wi-Fi* pada telefon anda.`;
  }

  if (q.includes('ai') || q.includes('etika') || q.includes('deepfake') || q.includes('kecerdasan buatan')) {
    return `Topik masa hadapan yang sangat menarik! Teknologi AI kini berkembang pesat dan memerlukan etika perlindungan data yang tinggi. 🤖🧠

### 🤖 Etika & Keselamatan Data Menggunakan AI:
1. **Jangan Masukkan Data Sensitif**: Elakkan memasukkan dokumen rasmi, data kewangan peribadi, nombor kad pengenalan, atau rahsia syarikat ke dalam gesaan (*prompts*) model AI awam.
2. **Waspada Ancaman Deepfake**: Penjenayah kini boleh meniru suara dan wajah orang yang kita kenali menggunakan AI untuk meminta wang cemas. Tetapkan "kata laluan kecemasan keluarga" bagi mengesahkan panggilan yang mencurigakan.
3. **Sahkan Fakta & Maklumat**: AI boleh mengalami 'halusinasi' (menghasilkan maklumat yang kelihatan meyakinkan tetapi salah). Sentiasa semak silang maklumat penting daripada sumber rasmi.

*Gunakan kecerdasan buatan dengan bijaksana dan beretika!* 💡`;
  }

  // Jawapan komprehensif asas keselamatan data
  return `Salam sejahtera! Saya Cikgu Amal, pembantu pembelajaran keselamatan dan kerahsiaan data anda. 🤖✨

Terima kasih atas soalan anda mengenai: **"${userQuestion}"**.

Dalam dunia digital masa kini, melindungi data peribadi dan kerahsiaan digital kita adalah tanggungjawab utama setiap pengguna.

### 🛡️ 5 Tiang Perlindungan Siber Cikgu Amal:
1. **Kerahsiaan Kod OTP / TAC**: Jangan sesekali berkongsi kod pengesahan kepada sesiapa sahaja melalui panggilan atau mesej.
2. **Kata Laluan Unik & Kukuh**: Cipta frasa laluan melebihi 12 aksara dengan gabungan huruf, nombor, dan simbol khas.
3. **Aktifkan Pengesahan Dua Faktor (2FA)**: Tambah lapisan keselamatan kedua pada akaun e-mel, media sosial, dan perbankan.
4. **Waspada Phishing**: Jangan klik pautan yang dihantar daripada nombor yang tidak dikenali atau mesej yang berbaur cemas.
5. **Kawal Privasi Media Sosial**: Elakkan mendedahkan lokasi masa nyata, maklumat kad pengenalan, atau jadual perjalanan kepada umum.

Anda boleh bertanya lebih terperinci mengenai topik seperti **Phishing**, **Pengesahan Dua Faktor (2FA)**, **Kata Laluan Kuat**, **Kebocoran Data**, atau **Privasi Media Sosial**! 💡`;
}

