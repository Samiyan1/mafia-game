'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import { Provider } from 'react-redux'
import store from './redux/store/store'
import { ToastContainer, toast } from 'react-toastify';
const inter = Inter({ subsets: ['latin'] })
import { NextUIProvider } from "@nextui-org/react";
import Head from 'next/head'


// export const metadata: Metadata = {
//   title: 'mafia game',
//   description: 'mafia game',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <Head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image"
          sizes="any"
        />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <NextUIProvider>

        <Provider store={store}>
          <body className={inter.className}>{children}</body>
          <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={true}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light" />
        </Provider>
      </NextUIProvider>

    </html>

  )
}
