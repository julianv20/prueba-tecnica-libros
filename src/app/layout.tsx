import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SiBookstack } from 'react-icons/si';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Libros prueba',
  description: 'Prueba tecnica de libros',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es ">
      <body>
        <main className="p-4 m-auto grid min-h-screen max-w-screen-md grid-rows-[60px,1fr,60px] gap-4">
          <nav className="flex items-center text-2xl gap-x-4 ">
            <SiBookstack className="w-8 h-8 text-yellow-400 " />
            <p className="font-black">Libros</p>
          </nav>
          <section>{children}</section>
          <footer className="flex items-center justify-center ">
            Julian Vanegas
          </footer>
        </main>
      </body>
    </html>
  );
}
