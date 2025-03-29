import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AgroIA | Inteligência Artificial para o Controle de Pragas Agrícolas',
  description:
    'Plataforma de inteligência artificial desenvolvida com dados da Embrapa para identificação e controle preciso de pragas em lavouras brasileiras.',
  keywords:
    'agricultura, agro, tecnologia agrícola, controle de pragas, inteligência artificial, embrapa, agtech, agritech, lavoura, fazenda, produção rural',
  openGraph: {
    title: 'AgroIA | IA Revolucionária no Controle de Pragas',
    description:
      'Descubra como a inteligência artificial está transformando o controle de pragas no campo e aumentando a produtividade dos produtores rurais.',
    url: 'https://www.agroia.com.br',
    siteName: 'AgroIA',
    images: [
      {
        url: 'https://www.agroia.com.br/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AgroIA - Inteligência Artificial para Agricultura',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
