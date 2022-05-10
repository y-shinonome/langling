import type { ReactElement } from 'react'
import type { NextPage } from 'next'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import type { Entry } from 'contentful'
import type { IAnglingFieldsFields } from '../../@types/contentful'
import { getAnglingFields } from '../utils/contentful'
import SVG from '../components/atoms/svg'
import Leaflet from '../components/template/leaflet'

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (pageProps: Props, page: ReactElement) => ReactElement
}

type Props = {
  anglingFields: Entry<IAnglingFieldsFields>[]
}

const TopPage: NextPageWithLayout = () => {
  return (
    <>
      <div className="mx-auto max-w-[600px] px-3">
        <p className="mt-10">釣り場探索マップ</p>
        <h1 className="relative right-[3px] mb-10 font-logo text-5xl font-light text-[#83beaf]">
          Langling
        </h1>
        <div className="relative mb-5 aspect-[1.919/1] w-full opacity-70">
          <Image
            src="/images/top.png"
            alt="top"
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL="/top.png"
          />
        </div>
        <Link href={`/angling_map`}>
          <a className="mx-auto mb-16 flex w-[100%] items-center justify-center bg-[#c5fff0] py-2 text-lg shadow-md shadow-gray-400/50 duration-300 hover:bg-black/10">
            <SVG src="/icons/map.svg" className="mr-2 h-[24px] w-[24px]" />
            地図を開く
          </a>
        </Link>
        <h2 className="mb-2 border-b-[4px] border-[#c5fff0] text-xl text-[#333333]">
          このサイトについて
        </h2>
        <p className="text-sm">
          釣り場の情報を地図にまとめたWebサイトです。
          <br />
          釣りポイントの情報だけではなく
          <br />
          駐車場やトイレ等の場所も探すことができます。
          <br />
          <br />
          地図上のピンアイコンを押すと
          <br />
          その場所の情報を確認することができます。
        </p>
        <SVG
          src="/icons/pins.svg"
          className="my-5 h-[160px] w-[182px] opacity-80"
        />
        <p className="text-sm">
          まだ行ったことのない釣り場を
          <br />
          地図から探索してみませんか？
        </p>
        <h2 className="mt-16 mb-2 border-b-4 border-[#c5fff0] text-xl text-[#333333]">
          更新情報
        </h2>
        <ul className="text-sm">
          <li className="mb-2 flex">
            <time dateTime="2022-04-30" className="mr-4 flex-shrink-0">
              2022年4月30日
            </time>
            <p>末広水際線プロムナード（ふれーゆ裏） 釣り場マップ公開</p>
          </li>
          <li className="mb-2 flex">
            <time
              dateTime="2022-04-30"
              className="mr-4 flex-shrink-0 flex-grow-0"
            >
              2022年4月30日
            </time>
            <p className="flex-grow-0">東扇島西公園 釣り場マップ公開</p>
          </li>
          <li className="mb-2 flex">
            <time dateTime="2022-04-30" className="mr-4 flex-shrink-0">
              2022年4月29日
            </time>
            <p>Webサイト公開</p>
          </li>
        </ul>
      </div>
    </>
  )
}

TopPage.getLayout = (props, page) => {
  return (
    <>
      <Leaflet anglingFields={props.anglingFields} />
      <TopPage>{page}</TopPage>
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const anglingFields = await getAnglingFields()

  return {
    props: {
      anglingFields: anglingFields,
    },
  }
}

export default TopPage
