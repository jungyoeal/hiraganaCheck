import dynamic from 'next/dynamic'
import Head from 'next/head'

// input zoom 방지를 위해 CSR로 렌더링
const HiraganaToKorean = dynamic(() => import('./HiraganaToKorean'), {
    ssr: false
})

export default function HiraganaPage() {
    return (
        <>
            <Head>
                <title>히라가나 연습</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black" />
            </Head>

            <HiraganaToKorean />
        </>
    )
}