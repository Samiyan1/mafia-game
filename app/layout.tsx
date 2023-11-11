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
        <link rel='manifest' href='/manifest.json' />
        <link rel='apple-touch-icon' href='/icon.png' />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body className={inter.className}>{
        <NextUIProvider>
          <Provider store={store}>
            {children}
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
      }</body >
    </html >

  )
}
