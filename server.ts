import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Google Cloud Run secara automatik menetapkan pembolehubah persekitaran PORT (contohnya 8080 atau 3000)
const rawPort = process.env.PORT;
const PORT = rawPort && !isNaN(Number(rawPort)) ? Number(rawPort) : 3000;

app.use(express.json({ limit: '5mb' }));

// URL tetap Cloud Run rasmi aplikasi (tetap dan tidak dibina daripada Host header pengguna)
const APP_URL = 'https://cyber-ai-buddy-1-232707198221.asia-southeast1.run.app';

// Kawalan keselamatan iframe & CSP: membenarkan domain Canva, CodePen, dan Google/Cloud Run sahaja
app.use((_req, res, next) => {
  // Tanggalkan X-Frame-Options agar tiada sekatan lapuk yang bercanggah dengan frame-ancestors
  res.removeHeader('X-Frame-Options');
  // Benarkan 'self', domain Canva, CodePen (termasuk cdpn.io), dan Google/Cloud Run
  res.setHeader(
    'Content-Security-Policy',
    "frame-ancestors 'self' https://*.canva.com https://canva.com https://*.canva.site https://canva.site https://*.codepen.io https://codepen.io https://*.cdpn.io https://cdpn.io https://*.google.com https://*.run.app;"
  );
  next();
});

// Endpoint pemeriksaan kesihatan (Health Check) bagi Cloud Run & container orchestration
app.get('/healthz', (_req: Request, res: Response) => {
  res.status(200).send('OK');
});

// Endpoint: Piawaian rasmi oEmbed (https://oembed.com/) untuk pembenaman (embed) dalam Canva Site
app.get('/api/oembed', (req: Request, res: Response) => {
  const format = req.query.format;
  if (format && format !== 'json') {
    return res.status(501).json({ error: 'Hanya format JSON disokong mengikut spesifikasi oEmbed.' });
  }

  res.setHeader('Content-Type', 'application/json');
  return res.json({
    version: '1.0',
    type: 'rich',
    title: 'CYBER AI BUDDY - Pembantu Keselamatan Siber & Kerahsiaan Data Digital',
    author_name: 'Cikgu Amal',
    provider_name: 'CYBER AI BUDDY',
    provider_url: `${APP_URL}/`,
    width: 800,
    height: 700,
    html: `<iframe src="${APP_URL}/" width="100%" height="700" frameborder="0" allow="microphone; clipboard-write; autoplay" allowfullscreen></iframe>`,
    cache_age: 86400,
  });
});

const SYSTEM_INSTRUCTION = `Anda adalah Cikgu Amal, seorang pembantu pembelajaran dan guru digital AI yang pakar serta mesra dalam bidang Keselamatan Siber dan Kerahsiaan Data Digital untuk aplikasi "CYBER AI BUDDY".

TUGAS UTAMA:
1. Memberikan penerangan yang jelas, mudah difahami dan menyeronokkan tentang keselamatan data dan privasi digital dalam BAHASA MELAYU sepenuhnya.
2. Membimbing pengguna (terutama pelajar dan orang ramai) mengenai topik seperti:
   - Keselamatan dan kerahsiaan data (Data Security & Privacy)
   - Serangan Phishing, scam WhatsApp/Telegram, pautan palsu, dan kejuruteraan sosial (Social Engineering)
   - Kebocoran data (Data Leaks / Data Breaches) dan sebab ia berlaku
   - Kecurian identiti (Identity Theft) dan akibatnya
   - Kaedah melindungi maklumat peribadi (PII seperti No. Kad Pengenalan, alamat, nombor telefon)
   - Amalan keselamatan kata laluan yang kuat, pengesahan dua faktor (2FA / MFA), dan pengurus kata laluan
   - Langkah keselamatan menggunakan media sosial (jejak digital, tetapan privasi, geotagging)
   - Etika penggunaan kecerdasan buatan (AI) & integriti maklumat
   - Keselamatan peranti pintar, Wi-Fi awam, malware, dan ransomware.

GAYA & NADA KOMUNIKASI:
- Penuh empati, mesra, berilmu seperti guru pembimbing idaman pelajar.
- Menggunakan bahasa Melayu standard yang sopan dan santai (contoh: "Salam sejahtera!", "Bagus sekali soalan itu!", "Mari Cikgu terangkan secara mudah...").
- Gunakan format perenggan yang kemas dengan Markdown:
  * Gunakan tajuk kecil yang jelas (cth: ### Apa Itu...?)
  * Gunakan senarai bernombor atau 'bullet points' untuk langkah-langkah praktikal
  * Berikan contoh situasi harian yang sangat dekat dengan pengguna di Malaysia (seperti SMS palsu kononnya dari bank atau kurier, pautan cabutan bertuah, Wi-Fi kedai kopi).
  * Sertakan bahagian mini "💡 Tips Cikgu Amal" atau "⚠️ Perhatian Penting".
- Akhiri perbualan dengan nasihat pendek yang membina dan memberi semangat siber!`;

/**
 * Pemulaan selamat GoogleGenAI di bahagian pelayan (server-side).
 * API Key diambil secara selamat daripada pembolehubah persekitaran pelayan (process.env.GEMINI_API_KEY).
 */
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Endpoint: Chat with Cikgu Amal
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Mesej diperlukan.' });
    }

    // Format conversation history for Gemini:
    // 1. Ekstrak mesej terdahulu
    const rawTurns: Array<{ role: 'user' | 'model'; text: string }> = [];

    if (Array.isArray(history)) {
      for (const item of history.slice(-6)) {
        if (item && typeof item.text === 'string' && item.text.trim()) {
          const role = item.sender === 'user' ? 'user' : 'model';
          rawTurns.push({ role, text: item.text.trim() });
        }
      }
    }

    // Tambah mesej terkini pengguna
    rawTurns.push({ role: 'user', text: message.trim() });

    // 2. Format & Sanitasi untuk Gemini API:
    // Peraturan Gemini: giliran pertama MESTI 'user' dan peranan MESTI berselang-seli
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    for (const turn of rawTurns) {
      if (contents.length === 0) {
        if (turn.role !== 'user') continue; // Abaikan mesej alu-aluan bot di permulaan
        contents.push({ role: 'user', parts: [{ text: turn.text }] });
      } else {
        const last = contents[contents.length - 1];
        if (last.role === turn.role) {
          last.parts[0].text += `\n\n${turn.text}`;
        } else {
          contents.push({ role: turn.role, parts: [{ text: turn.text }] });
        }
      }
    }

    if (contents.length === 0) {
      contents.push({ role: 'user', parts: [{ text: message.trim() }] });
    }

    const ai = getGeminiClient();
    let replyText = '';

    if (ai) {
      // Pembantu panggilan model dengan had masa (12 saat maksimum) bagi mengelakkan sambungan tergantung jika berlaku lonjakan permintaan 503/504
      const generateWithTimeout = async (model: string): Promise<string | null> => {
        try {
          const timeoutPromise = new Promise<null>((_, reject) =>
            setTimeout(() => reject(new Error('AI_TIMEOUT')), 12000)
          );
          const aiPromise = ai.models.generateContent({
            model,
            contents,
            config: {
              systemInstruction: SYSTEM_INSTRUCTION,
              thinkingConfig: {
                thinkingLevel: ThinkingLevel.LOW,
              },
            },
          }).then((res) => res.text || null);

          return await Promise.race([aiPromise, timeoutPromise]);
        } catch (e: any) {
          console.warn(`Model ${model} ralat / tamat masa:`, e?.status || e?.message || e);
          return null;
        }
      };

      // Cuba model utama: gemini-3.8-flash
      replyText = (await generateWithTimeout('gemini-3.8-flash')) || '';

      // Jika berlaku gangguan sementara, cuba gemini-3.1-flash-lite
      if (!replyText) {
        replyText = (await generateWithTimeout('gemini-3.1-flash-lite')) || '';
      }
    }

    if (replyText) {
      return res.json({ reply: replyText });
    }

    // Intelligent educational fallback in case of temporary upstream cloud outage
    const lower = message.toLowerCase();
    let fallbackAnswer = '';

    if (lower.includes('maksud keselamatan data') || lower.includes('apa itu keselamatan data')) {
      fallbackAnswer = `Salam sejahtera! Mari Cikgu Amal terangkan dengan mudah ya! 🤖\n\n### 🛡️ Apa Itu Keselamatan Data?\n\n**Keselamatan Data** (Data Security) ialah usaha dan amalan melindungi maklumat digital—seperti gambar peribadi, nombor kad pengenalan, kata laluan, dan maklumat perbankan—daripada diakses, dicuri, atau dirosakkan oleh pihak yang tidak sah.\n\n### 💡 Mengapa Ia Sangat Penting?\n1. **Melindungi Privasi Peribadi**: Mengelakkan maklumat sulit anda daripada tersebar ke khalayak umum.\n2. **Mencegah Penipuan Kewangan**: Menghalang scammer daripada menguras wang simpanan bank anda.\n3. **Mencegah Kecurian Identiti**: Memastikan tiada sesiapa menyamar sebagai anda untuk tujuan jenayah.\n\n### 🛠️ Langkah Perlindungan Praktikal:\n- Sentiasa cipta kata laluan yang kuat dan tidak boleh diteka.\n- Jangan sesekali kongsikan kod OTP / TAC kepada sesiapa.\n- Pastikan sistem peranti anda sentiasa dikemas kini.\n\n*Ingat pesanan Cikgu Amal: Keselamatan digital bermula daripada kesedaran diri kita sendiri!* ✨`;
    } else if (lower.includes('phishing')) {
      fallbackAnswer = `Bagus sekali soalan tentang Phishing ini! Mari Cikgu jelaskan: 🤖\n\n### 🎣 Apakah Maksud Phishing?\n\n**Phishing** (Pemancingan Data) ialah taktik penipuan siber di mana penjenayah menyamar sebagai pihak yang dipercayai (seperti pihak bank, kurier PosLaju/J&T, atau media sosial) untuk memancing anda memberikan maklumat rahsia seperti kata laluan atau nombor akaun.\n\n### ⚠️ Tanda-Tanda Serangan Phishing:\n- **Mesej Cemas atau Terdesak**: "Akaun anda akan disekat dalam masa 24 jam!"\n- **Pautan Mencurigakan**: Ejaan pautan sedikit pelik (contoh: *maybank-verify.xyz* dan bukannya *maybank2u.com.my*).\n- **Meminta Maklumat Rahsia**: Pihak bank sebenar TIDAK AKAN sesekali meminta kata laluan atau kod OTP anda melalui SMS/e-mel.\n\n### 💡 Tindakan Jika Menerima Pautan Phishing:\n1. **Bertenang dan Jangan Klik**: Abaikan pautan tersebut.\n2. **Semak Saluran Rasmi**: Hubungi terus pihak terbabit melalui nombor telefon rasmi.\n3. **Laporkan**: Tangkap layar dan buat laporan kepada CCID atau pihak platform.`;
    } else if (lower.includes('kebocoran data')) {
      fallbackAnswer = `Soalan yang sangat penting! Cikgu kongsikan puncanya ya: 🤖\n\n### 🔓 Bagaimanakah Kebocoran Data (Data Breach) Berlaku?\n\nKebocoran data berlaku apabila maklumat sulit dalam sesuatu sistem atau peranti terlepas ke tangan orang luar tanpa kebenaran. Antara punca utamanya ialah:\n\n1. **Kelemahan Sistem & Penggodaman**: Penggodam mengeksploitasi pepijat keselamatan dalam pelayan syarikat untuk memuat turun data pelanggan.\n2. **Kesilapan Manusia (Human Error)**: Pekerja tersalah hantar fail sulit, atau terlupa mengunci pangkalan data dengan kata laluan.\n3. **Serangan Phishing & Malware**: Pekerja tertekan pautan beracun yang memasang perisian intip (*spyware*) ke dalam komputer pejabat.\n4. **Kata Laluan Lemah**: Penggodam berjaya memecahkan kata laluan pentadbir sistem melalui teknik cubaan berulang (*brute force*).\n\n### 💡 Cara Kita Sebagai Pengguna Bersiap Sedia:\n- Gunakan kata laluan berbeza untuk setiap platform.\n- Aktifkan Pengesahan Dua Faktor (2FA).\n- Pantau jika e-mel anda pernah terlibat melalui laman semakan keselamatan seperti *HaveIBeenPwned*.`;
    } else if (lower.includes('kecurian identiti') || lower.includes('identity theft')) {
      fallbackAnswer = `Cikgu Amal sedia bantu terangkan tentang kecurian identiti: 🤖\n\n### 👤 Apakah Maksud Kecurian Identiti?\n\n**Kecurian Identiti** berlaku apabila penjenayah siber mencuri dan menggunakan maklumat peribadi anda (seperti nama penuh, nombor kad pengenalan, gambar wajah, atau butiran bank) tanpa kebenaran untuk melakukan penipuan atas nama anda.\n\n### 🚨 Contoh Kes Nyata:\n- Penipu membuka akaun bank keldai menggunakan kad pengenalan anda.\n- Scammer memohon pinjaman wang tidak berlesen atas nama anda.\n- Mewujudkan akaun media sosial palsu dengan gambar anda untuk meminjam wang daripada rakan dan keluarga.\n\n### 🛡️ Langkah Melindungi Diri:\n- Jangan sesekali memuat naik gambar MyKad/kad pengenalan di media sosial.\n- Jika perlu memberikan salinan kad pengenalan, buat **palang silang (cross-line)** dan tuliskan tujuan spesifik (contoh: *Untuk Pendaftaran Telco Sahaja*).\n- Simpan dokumen fizikal dan digital anda di tempat berkunci.`;
    } else if (lower.includes('melindungi maklumat peribadi') || lower.includes('maklumat peribadi')) {
      fallbackAnswer = `Hebat! Menjaga maklumat peribadi adalah kunci utama keselamatan digital. 🤖\n\n### 🔒 Cara Melindungi Maklumat Peribadi Anda:\n\n1. **Gunakan Kata Laluan Unik & Kuat**: Jangan guna tarikh lahir atau nama sendiri. Gabungkan huruf besar, huruf kecil, nombor dan simbol sekurang-kurangnya 12 aksara.\n2. **Kunci dengan 2FA**: Aktifkan Pengesahan Dua Faktor di semua akaun Google, Apple, media sosial dan perbankan.\n3. **Kawal Apa Yang Anda Kongsi**: Elakkan mendedahkan alamat rumah, nombor telefon, atau sekolah di ruang awam internet.\n4. **Waspada Wi-Fi Awam**: Jangan buat transaksi bank semasa bersambung ke Wi-Fi percuma di kafe atau pusat beli-belah tanpa VPN.\n5. **Kemas Kini Perisian**: Pastikan sistem operasi Android/iOS/Windows sentiasa dikemas kini dengan tampalan keselamatan terkini.\n\n*Ingat, maklumat peribadi anda adalah aset digital yang sangat berharga!*`;
    } else if (lower.includes('2fa') || lower.includes('mfa') || lower.includes('dua faktor') || lower.includes('otp') || lower.includes('tac')) {
      fallbackAnswer = `Hebat! Anda bertanyakan tentang salah satu perisai siber paling berkesan hari ini! 🤖🛡️\n\n### 🛡️ Apakah Itu Pengesahan Dua Faktor (2FA / MFA)?\n**2FA (Two-Factor Authentication)** ialah lapisan pertahanan tambahan selepas kata laluan. Ia memerlukan dua bukti identiti berbeza sebelum akaun anda boleh dibuka:\n1. **Faktor Pertama**: Sesuatu yang anda **tahu** (Kata laluan / PIN anda).\n2. **Faktor Kedua**: Sesuatu yang anda **miliki** (Peranti telefon anda yang menerima kod OTP SMS, aplikasi Google Authenticator, atau cap jari).\n\n### 💡 Mengapa 2FA Sangat Penting?\nWalaupun penggodam berjaya mencuri atau meneka kata laluan anda melalui pautan phishing, mereka **TETAP GAGAL** menceroboh akaun anda kerana mereka tidak memiliki telefon anda untuk mendapatkan kod pengesahan kedua!\n\n### ⚠️ Amaran Emas Cikgu Amal:\n**JANGAN SESEKALI berkongsi kod OTP / TAC kepada sesiapa pun**, termasuk mereka yang mendakwa diri sebagai pegawai bank, pihak polis, atau rakan yang kononnya tersalah hantar nombor TAC!`;
    } else if (lower.includes('kata laluan') || lower.includes('password') || lower.includes('frasa laluan')) {
      fallbackAnswer = `Salam sejahtera! Soalan tentang kata laluan adalah asas paling penting dalam kubu pertahanan siber kita! 🤖🔐\n\n### 🔐 Panduan Kata Laluan Kebal Cikgu Amal:\nKata laluan yang baik mestilah sukar diteka oleh komputer penjenayah mahupun orang di sekeliling anda.\n\n### ✅ Ciri Kata Laluan Kukuh (Frasa Laluan):\n1. **Panjang Minimum 12-16 Aksara**: Lebih panjang kata laluan, lebih mustahil untuk digodam secara *brute-force*.\n2. **Gabungan 4 Elemen**: Huruf besar (A-Z), huruf kecil (a-z), angka (0-9), dan simbol khas (!@#$%^&*).\n3. **Teknik Frasa Rahsia**: Gabungkan 3-4 perkataan rawak yang bermakna bagi anda tetapi mustahil diteka orang lain (cth: *KucingLompatBintang#2026*).\n\n### 💡 Tips Cikgu Amal:\nGunakan **Pengurus Kata Laluan (Password Manager)** seperti Bitwarden atau pengurus kata laluan peranti anda agar anda tidak perlu menghafal puluhan kata laluan rumit!`;
    } else if (lower.includes('wi-fi') || lower.includes('wifi') || lower.includes('awam') || lower.includes('public')) {
      fallbackAnswer = `Perhatian yang sangat bijak! Wi-Fi percuma memang menarik, tetapi ada bahaya tersembunyi. 🤖☕\n\n### ⚠️ Bahaya Wi-Fi Percuma di Tempat Awam:\nRangkaian Wi-Fi di kafe, lapangan terbang atau hotel selalunya tidak disulitkan (*open/unencrypted*).\n\n### 🚨 Ancaman Yang Boleh Berlaku:\n- **Serangan 'Man-in-the-Middle'**: Penggodam yang bersambung ke rangkaian Wi-Fi yang sama boleh memintas paket data yang dihantar oleh peranti anda.\n- **Rangkaian Palsu ('Evil Twin')**: Scammer mencipta nama Wi-Fi serupa seperti "Starbucks_Free_WiFi" untuk memperdaya pengunjung menyambung kepadanya.\n\n### 💡 Panduan Selamat Cikgu Amal:\n1. **JANGAN Sekali-kali Log Masuk Perbankan Dalam Talian** atau membuat bayaran kad kredit semasa menggunakan Wi-Fi awam.\n2. **Gunakan Data Mudah Alih Sendiri (4G/5G)** untuk urusan sensitif.\n3. **Gunakan VPN (Virtual Private Network)** jika terpaksa menggunakan Wi-Fi awam untuk mengenkripsi trafik internet anda.`;
    } else if (lower.includes('ai') || lower.includes('etika') || lower.includes('deepfake')) {
      fallbackAnswer = `Topik masa hadapan yang sangat menarik! Teknologi AI kini berkembang pesat dan memerlukan etika perlindungan data yang tinggi. 🤖🧠\n\n### 🤖 Etika & Keselamatan Data Menggunakan AI:\n1. **Jangan Masukkan Data Sensitif**: Elakkan memasukkan dokumen rasmi, data kewangan peribadi, nombor kad pengenalan, atau rahsia syarikat ke dalam gesaan (*prompts*) model AI awam.\n2. **Waspada Ancaman Deepfake**: Penjenayah kini boleh meniru suara dan wajah orang yang kita kenali menggunakan AI untuk meminta wang cemas. Tetapkan "kata laluan kecemasan keluarga" bagi mengesahkan panggilan yang mencurigakan.\n3. **Sahkan Fakta & Maklumat**: AI boleh mengalami 'halusinasi'. Sentiasa semak silang maklumat penting daripada sumber rasmi.\n\n*Gunakan kecerdasan buatan dengan bijaksana dan beretika!* 💡`;
    } else {
      fallbackAnswer = `Salam sejahtera! Saya Cikgu Amal. 🤖\n\nTerima kasih atas soalan anda mengenai: **"${message}"**.\n\nDalam dunia digital hari ini, prinsip utama yang perlu kita amalkan adalah sentiasa menyemak kesahihan sesuatu maklumat, menggunakan kata laluan yang kukuh, serta mengaktifkan pengesahan dua faktor (2FA).\n\nAda bahagian khusus yang ingin Cikgu huraikan lebih lanjut? Anda boleh bertanya tentang phishing, keselamatan kata laluan, atau privasi media sosial!`;
    }

    return res.json({ reply: fallbackAnswer });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    return res.json({
      reply: `Salam sejahtera! Saya Cikgu Amal. 🤖\n\nAda sedikit kelewatan rangkaian pada pelayan AI, namun Cikgu sentiasa sedia membantu! Sila tanya semula soalan anda atau pilih soalan pantas di bawah untuk jawapan segera.`,
    });
  }
});

// Endpoint: Mini Quiz generator or evaluator
app.get('/api/quiz-question', async (req: Request, res: Response) => {
  const defaultQuestions = [
    {
      id: 1,
      soalan: "Anda menerima mesej SMS yang mendakwa akaun bank anda telah digantung dan meminta anda klik pautan segera. Apakah tindakan terbaik?",
      pilihan: [
        "Klik pautan segera dan masukkan kata laluan untuk sahkan akaun.",
        "Abaikan mesej, jangan klik pautan, dan hubungi pihak bank melalui talian rasmi.",
        "Kongsikan mesej tersebut kepada semua kenalan di WhatsApp.",
        "Balas SMS itu dengan nombor kad pengenalan anda."
      ],
      jawapanBetul: 1,
      penerangan: "Tepat sekali! Ini adalah taktik phishing klasik. Pihak bank tidak akan sekali-kali menghantar pautan melalui SMS untuk meminta kata laluan anda."
    },
    {
      id: 2,
      soalan: "Apakah ciri kata laluan yang paling kukuh dan selamat?",
      pilihan: [
        "Nama sendiri berserta tahun kelahiran (cth: ali1998)",
        "Gabungan sekurang-kurangnya 12 aksara merangkumi huruf besar, huruf kecil, nombor, dan simbol khas.",
        "Nombor berturutan yang mudah diingati (cth: 12345678)",
        "Kata laluan yang sama digunakan untuk semua akaun media sosial dan e-mel."
      ],
      jawapanBetul: 1,
      penerangan: "Bagus! Kata laluan yang panjang dan kompleks serta unik untuk setiap akaun dapat menghalang serangan 'brute-force' dan kebocoran silang akaun."
    },
    {
      id: 3,
      soalan: "Apakah fungsi utama 'Pengesahan Dua Faktor' (Two-Factor Authentication / 2FA)?",
      pilihan: [
        "Menjadikan sambungan internet telefon anda lebih laju.",
        "Menambah lapisan keselamatan kedua selain kata laluan, seperti kod OTP atau aplikasi pengesah.",
        "Membolehkan rakan anda mengakses akaun anda dengan mudah.",
        "Menghapuskan keperluan memasukkan sebarang kata laluan."
      ],
      jawapanBetul: 1,
      penerangan: "Cemerlang! Walaupun penggodam berjaya mendapatkan kata laluan anda, mereka tetap tidak boleh log masuk tanpa kod 2FA yang berada pada peranti peribadi anda."
    },
    {
      id: 4,
      soalan: "Ketika menggunakan Wi-Fi percuma di tempat awam (seperti kafe atau lapangan terbang), apakah perkara yang patut anda ELAKKAN?",
      pilihan: [
        "Membaca berita atau artikel umum.",
        "Melakukan transaksi perbankan dalam talian atau memasukkan maklumat kad kredit.",
        "Mematikan fungsi Bluetooth telefon anda.",
        "Menyemak ramalan cuaca."
      ],
      jawapanBetul: 1,
      penerangan: "Tepat sekali! Wi-Fi awam tidak disulitkan (unencrypted), memudahkan penjenayah siber memintas data sensitif anda (serangan Man-in-the-Middle)."
    },
    {
      id: 5,
      soalan: "Apakah maksud 'Jejak Digital' (Digital Footprint)?",
      pilihan: [
        "Corak cap jari pada skrin telefon pintar anda.",
        "Rekod dan tinggalan semua aktiviti, hantaran, dan maklumat yang anda tinggalkan di internet.",
        "Kelajuan muat turun aplikasi dari internet.",
        "Jumlah memori storan yang tinggal dalam komputer anda."
      ],
      jawapanBetul: 1,
      penerangan: "Tepat! Setiap gambar, komen, carian, dan pendaftaran akaun membina jejak digital kita yang boleh kekal selamanya di internet jika tidak dipantau."
    }
  ];

  const randomIndex = Math.floor(Math.random() * defaultQuestions.length);
  return res.json(defaultQuestions[randomIndex]);
});

// Setup Vite or static serving
async function setupServer() {
  const distPath = path.join(__dirname, 'dist');
  const indexPath = path.join(distPath, 'index.html');

  if (process.env.NODE_ENV === 'production' && fs.existsSync(indexPath)) {
    // Mod Pengeluaran (Production): Layan fail statik yang telah dibina oleh Vite
    console.log(`[Production Mode] Menyajikan fail statik daripada: ${distPath}`);
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(indexPath);
    });
  } else {
    // Mod Pembangunan (Development) atau sandaran sekiranya dist belum dibina
    console.log(`[Development/Fallback Mode] Memulakan Vite middleware...`);
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        allowedHosts: true as const,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  // Wajib bind ke '0.0.0.0' untuk membolehkan Google Cloud Run menerima trafik luaran
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`CYBER AI BUDDY Server sedia dan mendengar di http://0.0.0.0:${PORT} (PORT=${PORT})`);
  });

  // Kawalan penutupan anggun (Graceful shutdown) untuk Cloud Run
  process.on('SIGTERM', () => {
    console.log('Menerima isyarat SIGTERM daripada Cloud Run. Menutup pelayan secara teratur...');
    server.close(() => {
      console.log('Pelayan ditutup sepenuhnya.');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    console.log('Menerima isyarat SIGINT. Menutup pelayan...');
    server.close(() => {
      process.exit(0);
    });
  });
}

setupServer().catch((err) => {
  console.error('Ralat kritikal ketika memulakan pelayan:', err);
  process.exit(1);
});
