import { useEffect, useState } from 'react';
import { safeBase64 } from '@/lib/base64';

export default function GenerateInvitation() {
    const [guests, setGuests] = useState([
        { name: '', wa: '' }
    ]);
    const [links, setLinks] = useState([]);
    const [baseUrl, setBaseUrl] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.location.origin;
        }
        return '';
    });
    const [waDesc, setWaDesc] = useState('');

    const handleGuestChange = (idx, field, value) => {
        setGuests(prev => prev.map((g, i) => i === idx ? { ...g, [field]: value } : g));
    };

    const handleAddGuest = () => {
        setGuests(prev => [...prev, { name: '', wa: '' }]);
    };

    const handleRemoveGuest = (idx) => {
        setGuests(prev => prev.filter((_, i) => i !== idx));
    };

    const handleGenerate = (e) => {
        e.preventDefault();
        const generatedLinks = guests
            .filter(g => g.name.trim())
            .map(({ name, wa }) => {
                const encoded = safeBase64.encode(name);
                const invitationUrl = `${baseUrl}?guest=${encoded}`;
                let message = waDesc ? `${waDesc}\n` : '';
                message += `Link undangan untuk ${name}: ${invitationUrl}`;
                const waLink = wa.trim()
                    ? `https://wa.me/${wa.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`
                    : null;
                return {
                    name,
                    wa,
                    url: invitationUrl,
                    waLink,
                };
            });
        setLinks(generatedLinks);
    };

    const handleCopy = async (url) => {
        try {
            await navigator.clipboard.writeText(url);
            alert('Link copied!');
        } catch {
            alert('Copy failed');
        }
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
                        <label className="block mb-2 font-medium text-gray-700">Daftar Tamu:</label>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm border">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="p-2 border">No</th>
                                        <th className="p-2 border">Nama Tamu</th>
                                        <th className="p-2 border">No. WhatsApp (opsional)</th>
                                        <th className="p-2 border">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {guests.map((guest, idx) => (
                                        <tr key={idx}>
                                            <td className="p-2 text-center border">{idx + 1}</td>
                                            <td className="p-2 border">
                                                <input
                                                    type="text"
                                                    className="w-full p-1 border rounded focus:ring-rose-200 focus:border-rose-400"
                                                    placeholder="Nama Tamu"
                                                    value={guest.name}
                                                    onChange={e => handleGuestChange(idx, 'name', e.target.value)}
                                                    required
                                                />
                                            </td>
                                            <td className="p-2 border">
                                                <input
                                                    type="text"
                                                    className="w-full p-1 border rounded focus:ring-rose-200 focus:border-rose-400"
                                                    placeholder="cth: 62812xxxx"
                                                    value={guest.wa}
                                                    onChange={e => handleGuestChange(idx, 'wa', e.target.value)}
                                                />
                                            </td>
                                            <td className="p-2 text-center border">
                                                {guests.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveGuest(idx)}
                                                        className="px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
                                                    >Hapus</button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <button
                            type="button"
                            onClick={handleAddGuest}
                            className="px-3 py-1 mt-2 text-xs rounded bg-rose-100 hover:bg-rose-200 text-rose-600"
                        >+ Tambah Tamu</button>
                    </div>
                    <div>
                        <label className="block mb-2 font-medium text-gray-700">Deskripsi Pesan WhatsApp (opsional):</label>
                        <textarea
                            className="w-full h-20 p-3 border border-gray-200 rounded-lg focus:ring-rose-200 focus:border-rose-400"
                            value={waDesc}
                            onChange={e => setWaDesc(e.target.value)}
                            placeholder="Contoh: Dengan hormat, kami mengundang Bapak/Ibu untuk hadir di acara pernikahan kami."
                        />
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
                        <h3 className="mb-2 text-lg font-semibold">Hasil Link Undangan:</h3>
                        <ul className="space-y-3">
                            {links.map(({ name, wa, url, waLink }, idx) => (
                                <li key={idx} className="flex flex-col gap-2 px-3 py-2 border rounded-lg bg-gray-50">
                                    <div className="flex items-center gap-2">
                                        <span className="flex-1 text-gray-700 truncate">{name}{wa && ` (${wa})`}</span>
                                        <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm underline text-rose-500">Lihat</a>
                                        <button
                                            onClick={() => handleCopy(url)}
                                            className="px-2 py-1 text-xs rounded bg-rose-100 hover:bg-rose-200 text-rose-600"
                                        >Copy</button>
                                    </div>
                                    {waLink && (
                                        <a
                                            href={waLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded hover:bg-green-200 w-fit"
                                        >Kirim via WhatsApp</a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </section>
    );
}
