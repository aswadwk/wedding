import { useEffect, useState } from 'react';
import { safeBase64 } from '@/lib/base64';
import config from '@/config/config';

export default function GenerateInvitation() {
    const [guestNames, setGuestNames] = useState('');
    const [links, setLinks] = useState([]);
    const [baseUrl, setBaseUrl] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.location.origin;
        }
        return '';
    });
    const [waDesc, setWaDesc] = useState('');
    const [expandedMessages, setExpandedMessages] = useState({});

    const handleGenerate = (e) => {
        e.preventDefault();

        // Split names by newlines and filter out empty lines
        const names = guestNames
            .split('\n')
            .map(name => name.trim())
            .filter(name => name.length > 0);

        if (names.length === 0) {
            alert('Silakan masukkan minimal satu nama tamu');
            return;
        }

        const generatedLinks = names.map((name) => {
            const encoded = safeBase64.encode(name);
            const invitationUrl = `${baseUrl}?guest=${encoded}`;

            // Create detailed invitation message
            let message = `Yth. Bapak/Ibu/Saudara/i\n${name}\nDi Tempat\n-----------\n\n`;
            message += `Dengan segala kerendahan hati, kami mengundang Bapak/Ibu/Saudara/i dan teman-teman untuk menghadiri acara,\n\n`;
            message += `===========\n`;
            message += `The Wedding Of \n${config.data.groomName} & ${config.data.brideName}\n`;
            message += `===========\n\n`;

            // Add agenda details from config
            config.data.agenda.forEach((event) => {
                message += `Pada: ${event.title}\n`;
                message += `🗓️ Tanggal: ${event.date}\n`;
                message += `🕛 Pukul: ${event.startTime} - ${event.endTime}\n`;
                message += `📍 Lokasi: ${event.location}\n\n`;
            });

            message += `Link undangan bisa diakses lengkap di:\n${invitationUrl}\n\n`;
            message += `Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir di acara kami.\n`;
            message += `Mohon maaf perihal undangan hanya dibagikan melalui pesan ini.\n`;
            message += `Terima kasih banyak atas perhatiannya.`;

            // Add custom description if provided
            if (waDesc) {
                message = `${waDesc}\n\n${message}`;
            }

            return {
                name,
                url: invitationUrl,
                message,
            };
        });
        setLinks(generatedLinks);
    };

    const handleCopy = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            alert('Teks berhasil disalin!');
        } catch {
            alert('Gagal menyalin teks');
        }
    };

    const handleSendToWhatsApp = (message) => {
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

    const toggleMessageExpansion = (name) => {
        setExpandedMessages(prev => ({
            ...prev,
            [name]: !prev[name]
        }));
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setBaseUrl(window.location.origin);
        }
    }, [baseUrl]);

    return (
        <section className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-gray-50">
            <div className="w-full max-w-2xl p-8 bg-white border shadow-lg rounded-2xl border-rose-100/50">
                <h2 className="mb-4 text-2xl font-bold text-center text-rose-500">Generate Link Undangan</h2>
                <form onSubmit={handleGenerate} className="space-y-4">
                    <div>
                        <label htmlFor="guestNames" className="block mb-2 font-medium text-gray-700">Daftar Nama Tamu:</label>
                        <textarea
                            id="guestNames"
                            className="w-full h-32 p-3 border border-gray-200 rounded-lg focus:ring-rose-200 focus:border-rose-400 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
                            value={guestNames}
                            onChange={e => setGuestNames(e.target.value)}
                            placeholder="Masukkan nama tamu, satu nama per baris. Contoh:&#10;John Doe&#10;Jane Smith&#10;Ahmad Rizki"
                            required
                        />
                        <p className="mt-1 text-xs text-gray-500">
                            Masukkan satu nama per baris. Tekan Enter untuk baris baru.
                        </p>
                    </div>
                    <div>
                        <label htmlFor="waDesc" className="block mb-2 font-medium text-gray-700">Pesan Tambahan WhatsApp (opsional):</label>
                        <textarea
                            id="waDesc"
                            className="w-full h-20 p-3 border border-gray-200 rounded-lg focus:ring-rose-200 focus:border-rose-400"
                            value={waDesc}
                            onChange={e => setWaDesc(e.target.value)}
                            placeholder="Pesan tambahan yang akan ditambahkan di awal undangan (opsional)"
                        />
                        <p className="mt-1 text-xs text-gray-500">
                            Undangan lengkap sudah otomatis dibuat dengan format formal. Pesan ini akan ditambahkan di awal jika diisi.
                        </p>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 font-semibold text-white transition rounded-lg bg-rose-500 hover:bg-rose-600"
                    >
                        Generate Link
                    </button>
                </form>
                {links.length > 0 && (
                    <div className="mt-8">
                        <h3 className="mb-2 text-lg font-semibold">Hasil Link & Pesan Undangan:</h3>
                        <div className="space-y-4">
                            {links.map(({ name, url, message }) => (
                                <div key={name} className="p-4 border rounded-lg bg-gray-50">
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="font-medium text-gray-800">{name}</h4>
                                        <div className="flex gap-2">
                                            <a
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-2 py-1 text-xs rounded bg-rose-100 hover:bg-rose-200 text-rose-600"
                                            >
                                                Lihat Undangan
                                            </a>
                                            <button
                                                onClick={() => handleCopy(url)}
                                                className="px-2 py-1 text-xs text-blue-600 bg-blue-100 rounded hover:bg-blue-200"
                                            >
                                                Copy Link
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <button
                                            onClick={() => toggleMessageExpansion(name)}
                                            className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border rounded hover:bg-gray-50"
                                        >
                                            <span>Lihat Pesan WhatsApp</span>
                                            <span className={`transform transition-transform ${expandedMessages[name] ? 'rotate-180' : ''}`}>
                                                ▼
                                            </span>
                                        </button>

                                        {expandedMessages[name] && (
                                            <div className="p-3 mt-2 text-sm whitespace-pre-wrap bg-white border rounded dark:bg-gray-800 dark:text-gray-200">
                                                {message}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleSendToWhatsApp(message)}
                                            className="flex-1 px-3 py-2 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700"
                                        >
                                            Send to WhatsApp
                                        </button>
                                        <button
                                            onClick={() => handleCopy(message)}
                                            className="px-3 py-2 text-sm font-medium text-green-700 bg-green-100 rounded hover:bg-green-200"
                                        >
                                            Copy
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
