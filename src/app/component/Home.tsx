'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Surah = {
  nomor: number;
  nama: string;
  nama_latin: string;
  jumlah_ayat: number;
  tempat_turun: string;
  arti: string;
  deskripsi: string;
  audio: string;
};

async function getSurah(): Promise<Surah[]> {
  const response = await fetch('https://quran-api.santrikoding.com/api/surah', {
    method: 'GET',
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data: Surah[] = await response.json();
  return data;
}

export default function Home() {
  const [surah, setSurah] = useState<Surah[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSurah();
        setSurah(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <button type="button" className="btn loading">Loading...</button>
        </div>
      ) : (
        <main className="mt-10">
          <h4 style={{ fontSize: '2rem' }} className="text-center box-decoration-clone">
            QuranME Indonesia
          </h4>

          <div className="container mx-auto mt-6">
            <div className="card bordered shadow-lg mb-6">
              <div className="container py-6">
                <div className="card-body rounded">
                  <h2 className="card-title">Quran</h2>
                  <p className="text-gray-700">
                    Al-Qur'an adalah kitab suci umat Islam yang di dalamnya terdapat ajaran-ajaran yang harus diikuti oleh umat Islam.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 py-6 px-1 md:grid-cols-3 gap-4">
              {error ? (
                <div className="col-span-1 md:col-span-3 text-red-500">{error}</div>
              ) : (
                surah.map((surat) => (
                  <div className=" px-10" key={surat.nomor}>
                    <div className="card bordered shadow-lg">
                      <div className="container py-6">
                      <div className="card-body">
                        <Link href={`/surat/${surat.nomor}`}>
                          <h2 className="card-title font-semibold">{surat.nama_latin} ({surat.nama})</h2>
                          <p className="text-gray-700">Nomor urut surat: {surat.nomor}</p>
                          <p className="text-gray-700">Jumlah Ayat: {surat.jumlah_ayat}</p>
                          <p className="text-gray-700">Tempat Turun: {surat.tempat_turun}</p>
                          <p className="text-gray-700">Arti: {surat.arti}</p>
                        </Link>
                      </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      )}
    </>
  );
}
