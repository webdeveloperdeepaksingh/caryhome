"use client";
import NavBar from '@/components/nav/NavBar'
import { usePathname } from 'next/navigation';
import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import Footer from '@/components/footer/Footer'
import Providers from '../../redux/providers'


const inter = Inter({ subsets: ['latin'] })

export default  function RootLayout({children,}: {children: React.ReactNode}) {

  const pathName = usePathname();
  
  return (
    <>
     <Providers>
      <html lang="en">
        <body className={inter.className}>
          <Toaster toastOptions={{ style:
          { 
            background: "white", 
            color:"indigo", 
            border:"1.5px solid indigo", 
            padding:"6px", 
            width: "auto", 
            textAlign: "center"
          }}}/>
          <NavBar/>
          {children}
          {pathName.startsWith("/dashboard") ? null : <Footer/>} 
        </body>
      </html>
     </Providers>
    </>
  );

}
