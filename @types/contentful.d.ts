// THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY IT.

import { Asset, Entry } from 'contentful'
import { Document } from '@contentful/rich-text-types'

export interface IAnglingFieldsFields {
  /** name */
  name: string

  /** position */
  position: { lat: number; lon: number }

  /** fieldImages */
  fieldImages?: Entry<IFieldImagesFields>[] | undefined

  /** parkingAreas */
  parkingAreas?: Entry<{ [fieldId: string]: unknown }>[] | undefined

  /** stores */
  stores?: Entry<{ [fieldId: string]: unknown }>[] | undefined

  /** restrooms */
  restrooms?: Entry<{ [fieldId: string]: unknown }>[] | undefined

  /** notices */
  notices?: Entry<{ [fieldId: string]: unknown }>[] | undefined
}

export interface IAnglingFields extends Entry<IAnglingFieldsFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'anglingFields'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IFieldImagesFields {
  /** title */
  title: string

  /** position */
  position: { lat: number; lon: number }

  /** image */
  image?: Asset | undefined

  /** comment */
  comment?: string | undefined
}

export interface IFieldImages extends Entry<IFieldImagesFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'fieldImages'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export type CONTENT_TYPE = 'anglingFields' | 'fieldImages'

export type LOCALE_CODE = 'en-US'

export type CONTENTFUL_DEFAULT_LOCALE_CODE = 'en-US'
