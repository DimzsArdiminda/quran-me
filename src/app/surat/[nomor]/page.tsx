import { notFound } from 'next/navigation';
import Link from 'next/link';

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




  return (
    <>
      <div className="container mx-auto mt-7">
      <Link href='/' className='btn btn-info ms-6'><p>Kembali ke menu utama</p></Link>
        <div className="card">
          <div className="card-body bordered shadow-lg mb-6" style={{ textAlign:'justify', marginBottom:'5rem' }}>
            <h1 className="text-2xl font-bold">{surah.nama_latin} ({surah.nama})</h1>
            <div dangerouslySetInnerHTML={{ __html: surah.deskripsi}}></div>
            <div>
              {/* show audio */}
              <audio controls>
                <source src={surah.audio} type="audio/mpeg" />
              </audio>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 container mb-9 px-11">
      
        <h3 className="text-2xl font-semibold mb-4">{surah.nama_latin} ({surah.nama})</h3>
        <div className="space-y-6">
            {surah.ayat.map((ayah) => (
                <div key={ayah.id} className="p-4 border rounded-lg shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                        <h5 className="text-lg font-medium">{ayah.nomor}</h5>
                        <p className="text-xl text-right ">{ayah.ar}</p>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: ayah.tr}}></div>
                    <div dangerouslySetInnerHTML={{ __html: ayah.idn}}></div>
                </div>
            ))}
        </div>
    </div>
    </>
  )

  // return (
  //   <div className="container mx-auto mt-6">
  //     <h1 className="text-2xl font-bold">{surah.nama_latin} ({surah.nama})</h1>
  //     <p className='mb-5'>{surah.deskripsi}</p>
  //     <div>
  //       <p className="text-white">Jumlah Ayat: {surah.jumlah_ayat}</p>
        
  //       <p className="text-white">Audio : </p>
  //       <audio controls>
  //         <source src={surah.audio} type="audio/mpeg" />
  //       </audio>
  //     </div>
  //   </div>
  // );
}
