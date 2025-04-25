// src/pages/GenerateInvitation.jsx
import { useEffect, useState } from 'react';
import { safeBase64 } from '@/lib/base64';

export default function GenerateInvitation() {
    const [names, setNames] = useState('');
    const [links, setLinks] = useState([]);
    const [baseUrl, setBaseUrl] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.location.origin;
        }
        return '';
    });

    const handleGenerate = (e) => {
        e.preventDefault();
        const nameList = names
            .split('\n')
            .map((n) => n.trim())
            .filter((n) => n.length > 0);
        const generatedLinks = nameList.map((name) => {
            const encoded = safeBase64.encode(name);
            return {
                name,
                url: `${baseUrl}?guest=${encoded}`,
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
            <div className="w-full max-w-xl p-8 bg-white border shadow-lg rounded-2xl border-rose-100/50">
                <h2 className="mb-4 text-2xl font-bold text-center text-rose-500">Generate Link Undangan</h2>
                <form onSubmit={handleGenerate} className="space-y-4">
                    <div>
                        <label className="block mb-2 font-medium text-gray-700">Nama Tamu (1 baris 1 nama):</label>
                        <textarea
                            className="w-full h-32 p-3 border border-gray-200 rounded-lg focus:ring-rose-200 focus:border-rose-400"
                            value={names}
                            onChange={e => setNames(e.target.value)}
                            placeholder="Contoh:\nBudi\nSiti Nurhaliza\nPak RT"
                            required
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
                            {links.map(({ name, url }, idx) => (
                                <li key={idx} className="flex items-center gap-2 px-3 py-2 border rounded-lg bg-gray-50">
                                    <span className="flex-1 text-gray-700 truncate">{name}</span>
                                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm underline text-rose-500">Lihat</a>
                                    <button
                                        onClick={() => handleCopy(url)}
                                        className="px-2 py-1 text-xs rounded bg-rose-100 hover:bg-rose-200 text-rose-600"
                                    >Copy</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </section>
    );
}
