import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type Ayah = {
  id: string;
  surah: number;
  nomor: string;
  ar: string;
  tr: string;
  idn: string;
};

type SurahDetail = {
  status: boolean;
  nomor: number;
  jumlah_ayat: number;
  nama_latin: string;
  nama: string;
  tempat_turun: string;
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

  const currentNomor = Number(nomor);
  const previousNomor = currentNomor > 1 ? currentNomor - 1 : null;
  const nextNomor = currentNomor < 114 ? currentNomor + 1 : null;

  return (
    <>
      <div className="container mx-auto mt-7">
        <Link href='/'>
          <Button className="mb-5">Kembali ke menu utama</Button>
        </Link>
        <div className="bg-transparent">
          <div className="mb-6" style={{ textAlign:'justify', marginBottom:'5rem' }}>
            <h1 className="text-2xl font-bold">{surah.nama_latin} ({surah.nama})</h1>
            <div dangerouslySetInnerHTML={{ __html: surah.deskripsi}} className='mb-5'></div>
            <div>
              {/* show audio */}
              <audio controls className='bg-transparent'>
                <source src={surah.audio} type="audio/mpeg" />
              </audio>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 container mb-9 px-11">
        <h3 className="text-2xl font-semibold mb-4">{surah.nama_latin} ({surah.nama})</h3>
        <div className="space-y-6">
          {/* Show Ayat */}
          {surah.ayat.map((ayah) => (
            <div key={ayah.id} className="p-4 border rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h5 className="text-base font-medium pr-5 rounded-lg border-gray-100">{ayah.nomor}</h5>
                <p className="text-xl text-right">{ayah.ar}</p>
              </div>
              <div dangerouslySetInnerHTML={{ __html:  ayah.tr}} className='italic font-bold'></div>
              <div>Arti : {ayah.idn}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between container mx-auto mb-9 px-11">
        {previousNomor && (
          <Link href={`/surat/${surah.nomor - 1}`}>
            <Button>Surat Sebelumnya</Button>
          </Link>
        )}
        {nextNomor && (
          <Link href={`/surat/${surah.nomor + 1}`}>
            <Button>Surat Selanjutnya</Button>
          </Link>
        )}
      </div>
    </>
  );
}
