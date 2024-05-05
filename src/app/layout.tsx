import NavBar from '@/components/nav/NavBar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import Footer from '@/components/footer/Footer'
import Providers from '../../redux/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Carry Home | Electronic Online Shop',
 }

export default function RootLayout({children,}: {children: React.ReactNode}) {

  return (
    <>
     <Providers>
      <html lang="en">
        <body className={inter.className}>
          <Toaster toastOptions={{
            style:{
              background: "white", 
              color:"indigo", 
              border:"1.5px solid indigo", 
              padding:"6px", 
              width: "auto"
            }
          }}/>
          <NavBar/>
            {children}
          <Footer/>
        </body>
      </html>
     </Providers>
    </>
  );

}
