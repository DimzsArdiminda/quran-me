import { notFound } from 'next/navigation';

type Ayah = {
  number: number;
  text: string;
};

type SurahDetail = {
  nomor: number;
  nama: string;
  nama_latin: string;
  jumlah_ayat: number;
  tempat_turun: string;
  arti: string;
  deskripsi: string;
  audio: string;
  ayat: Ayah[];
};

async function getSurahDetail(nomor: number): Promise<SurahDetail | null> {
  const response = await fetch(`https://quran-api.santrikoding.com/api/surah/${nomor}`);

  if (!response.ok) {
    return null;
  }

  const data: SurahDetail = await response.json();
  return data;
}

type SurahDetailPageProps = {
  params: { nomor: string };
};

export default async function SurahDetailPage({ params }: SurahDetailPageProps) {
  const { nomor } = params;
  const surah = await getSurahDetail(Number(nomor));

  if (!surah) {
    notFound();
  }

  return (
    <div className="container mx-auto mt-6">
      <h1 className="text-2xl font-bold">{surah.nama_latin} ({surah.nama})</h1>
      <p className='mb-5'>{surah.deskripsi}</p>
      <div>
        <p className="text-white">Jumlah Ayat: {surah.jumlah_ayat}</p>
        
        <p className="text-white">Audio : </p>
        <audio controls>
          <source src={surah.audio} type="audio/mpeg" />
        </audio>
      </div>
    </div>
  );
}
