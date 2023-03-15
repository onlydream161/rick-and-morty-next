import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className='scrollbar-gallery scroll-smooth'>
      <Head>
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='manifest' href='/manifest.webmanifest' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
        <meta name='msapplication-TileColor' content='#9f00a7' />
        <meta name='theme-color' content='#181728' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link href='https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap' rel='stylesheet' />
      </Head>
      <body className='bg-background min-w-base'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
