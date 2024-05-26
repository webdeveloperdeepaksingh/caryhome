import NavBar from '@/components/nav/navitems/NavBar';
import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Providers from '../../redux/providers';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] })

export default  function RootLayout({children,}: {children: React.ReactNode}) {
  
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
        </body>
      </html>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"/>
     </Providers>
    </>
  );

}
