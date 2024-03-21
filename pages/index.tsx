import { Inter } from 'next/font/google';
import CountriesList from '../components/CountriesList';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Header />

      <CountriesList />
    </div>
  );
}
