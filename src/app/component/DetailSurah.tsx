"use client";

import React, { useEffect, useState } from "react";

type Ayat = {
    id: string;
    surah: number;
    nomor: string;
    ar: string;
    tr: string;
    idn: string;
};

type Surah = {
    status: boolean;
    nomor: number;
    jumlah_ayat: number;
    nama_latin: string;
    nama: string;
    tempat_turun: string;
    deskripsi: string;
    audio: string;
    ayat: Ayat[];
};

type DetailSurahProps = {
    nomor: number;
};

async function fetchSurah(nomor: number): Promise<Surah> {
    const response = await fetch(
        `https://quran-api.santrikoding.com/api/surah/${nomor}`,
        {
            method: "GET",
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
            },
        }
    );

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: Surah = await response.json();
    return data;
}

export default function DetailSurah({ nomor }: DetailSurahProps) {
    const [surah, setSurah] = useState<Surah | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchSurah(nomor); // Ganti dengan nomor surah yang diinginkan
                setSurah(data);
            } catch (error: any) {
                setError(error.message);
            }
        }

        fetchData();
    }, [nomor]);

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    if (!surah) {
        return <div>Loading...</div>;
    }

    return (
        
        <div className="card-body">
      <h2 className="card-title">{surah.nama_latin} ({surah.nama})</h2>
      <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: surah.deskripsi }}></p>
      <p className="text-gray-700">Jumlah Ayat: {surah.jumlah_ayat}</p>
      <p className="text-gray-700">Tempat Turun: {surah.tempat_turun}</p>
      <div>
        <h3 className="card-title">Audio</h3>
        <audio controls>
          <source src={surah.audio} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
      <div className="mt-4">
        <h3 className="card-title text-lg">Ayat</h3>
        {surah.ayat.map((ayat) => (
          <div key={ayat.id} className="border-b py-2">
            <p className="text-gray-800">{ayat.nomor}. {ayat.ar}</p>
            <p className="text-gray-600">{ayat.tr}</p>
            <p className="text-gray-600">{ayat.idn}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
