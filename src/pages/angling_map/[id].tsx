import { ReactElement } from 'react'
import type { NextPage } from 'next'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import dayjs from 'dayjs'
import type { Entry } from 'contentful'
import type { IAnglingFieldsFields } from '../../../@types/contentful'
import {
  getAnglingFieldMarkers,
  getAnglingFieldIds,
  getAnglingFieldImages,
} from '../../utils/contentful'
import Meta from '../../components/molecules/meta'
import Leaflet from '../../components/template/leaflet'
import CustomReactMarkdown from '../../components/react_markdown/custom_react_markdown'
import FieldDetails from '../../components/angling_map/field_details'
import Share from '../../components/molecules/share'
import Layout from '../../components/template/layout'
import Comments from '../../components/angling_map/comments'
import CommentForm from '../../components/angling_map/comment_form'

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (pageProps: Props, page: ReactElement) => ReactElement
}

type Props = {
  anglingFieldMarkers: Entry<IAnglingFieldsFields>[]
  fieldImages: Entry<IAnglingFieldsFields>
}

type Params = {
  id: string
}

const AnglingField: NextPageWithLayout<Props> = ({ fieldImages }) => {
  return (
    <>
      <Meta
        subTitle={fieldImages.fields.name}
        description={fieldImages.fields.description.replace(/\s+/g, '')}
        imageUrl={fieldImages.fields.thumbnailUrl}
      />
      <p className="mx-3 mt-6 mb-3 text-xs text-[#666666]">
        <Link href="/">
          <a className="underline">トップページ</a>
        </Link>{' '}
        &gt;{' '}
        <Link href="/angling_map">
          <a className="underline">釣り場一覧</a>
        </Link>{' '}
        &gt; <span>{fieldImages.fields.name}</span>
      </p>
      <div className="relative aspect-[16/9]">
        <Image
          src={fieldImages.fields.thumbnailUrl}
          alt={fieldImages.fields.name}
          layout="fill"
          objectFit="contain"
          placeholder="blur"
          blurDataURL={`${fieldImages.fields.thumbnailUrl}?w=20&h=10&fm=webp`}
          className="duration-500"
        />
      </div>
      <section className="prose-custom pt-8">
        <h1 className="mx-3 !mb-1">{fieldImages.fields.name}</h1>
        <p className="mx-3 !mt-1 text-xs text-gray-500">
          この釣り場の情報は
          <time dateTime={fieldImages.fields.updatedTime}>
            {dayjs(fieldImages.fields.updatedTime).format('YYYY年MM月DD日')}
          </time>
          に更新されています
        </p>
        <div className="mx-3 mb-14">
          <CustomReactMarkdown article={fieldImages.fields.description} />
          <CustomReactMarkdown article={fieldImages.fields.article} />
        </div>
        {fieldImages.fields.anglingSpot && (
          <FieldDetails
            fieldImages={fieldImages.fields.anglingSpot}
            heading="釣りポイント情報"
          />
        )}
        {fieldImages.fields.parkingAreas && (
          <FieldDetails
            fieldImages={fieldImages.fields.parkingAreas}
            heading="周辺の駐車場情報"
          />
        )}
        {fieldImages.fields.restrooms && (
          <FieldDetails
            fieldImages={fieldImages.fields.restrooms}
            heading="周辺のトイレ情報"
          />
        )}
        {fieldImages.fields.stores && (
          <FieldDetails
            fieldImages={fieldImages.fields.stores}
            heading="周辺の売店・コンビニ情報"
          />
        )}
        {fieldImages.fields.others && (
          <FieldDetails
            fieldImages={fieldImages.fields.others}
            heading="その他の釣り場情報"
          />
        )}
      </section>
      <h2 className="mx-3 mt-20 mb-2 font-bold">SNSで釣り場情報を共有</h2>
      <Share className="mx-3 flex flex-wrap gap-3" size={48} borderRadius={6} />
      <h2 className="mx-3 mt-20 mb-2 font-bold">
        {fieldImages.fields.name}についてのコメント
      </h2>
      <hr />
      <Comments pageId={fieldImages.sys.id} />
      <CommentForm pageId={fieldImages.sys.id} />
    </>
  )
}

AnglingField.getLayout = (props, page) => {
  return (
    <>
      <Leaflet
        center={[
          props.fieldImages.fields.position.lat,
          props.fieldImages.fields.position.lon,
        ]}
        zoom={16}
        anglingFields={props.anglingFieldMarkers}
        fieldImages={props.fieldImages}
      />
      <Layout>{page}</Layout>
    </>
  )
}

export const getStaticPaths = async () => {
  const items = await getAnglingFieldIds()
  const paths = items.map((item) => ({
    params: { id: item.sys.id },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const pageId = params?.id ?? ''
  const anglingFieldMarkers = await getAnglingFieldMarkers(pageId)
  const fieldImages = await getAnglingFieldImages(pageId)

  return {
    props: {
      anglingFieldMarkers: anglingFieldMarkers,
      fieldImages: fieldImages[0],
    },
  }
}

export default AnglingField
