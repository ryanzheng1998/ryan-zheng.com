import Script from 'next/script'

export default function Page() {
  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1553335306246491"
        crossOrigin="anonymous"
      />
      <Script>(adsbygoogle = window.adsbygoogle || []).push({});</Script>
      <main className="min-h-screen bg-white px-6 py-20 text-center">
        <h1 className="mb-4 text-3xl font-bold">Support My Work 💛</h1>
        <p className="mb-8 text-gray-600">
          This page helps fund my personal projects. Thanks for visiting!
        </p>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-1553335306246491"
          data-ad-slot="7565987022"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </main>
    </>
  )
}
