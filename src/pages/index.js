import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
      <>
        <Head>
          <title>히라가나 학습</title>
          <meta name="description" content="히라가나 학습 애플리케이션" />
        </Head>

        <main className="container mx-auto px-4 py-8">
          <h2 className="text-4xl font-bold text-center mb-8">
            히라가나 학습하기
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <Link href="/hiragana/HiraganaToKorean"
                  className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-semibold mb-2">히라가나 한국어로</h2>
            </Link>

            <Link href="/hiragana/"
                  className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-semibold mb-2">퀴즈</h2>
              <p>배운 내용을 테스트해보세요</p>
            </Link>
          </div>
        </main>
      </>
  )
}