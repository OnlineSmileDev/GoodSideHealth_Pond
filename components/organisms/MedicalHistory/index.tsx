import { useState } from 'react'
import { StatusCard, TOGGLE_VARIANT } from 'components/molecules/StatusCard'
import { Button, BUTTON_VARIANT } from 'components/atoms/Button'
import { OrderItem, ORDER_ITEM_VARIANT } from 'components/molecules/OrderItem'
import Form from '@rjsf/core'
import type { JSONSchema7 } from 'json-schema'

export type MedicalHistoryProps = {
  shouldShowToggleLabel?: boolean
  status?: string
  data?: object[]
  url?: string
  schema?: JSONSchema7[]
  uiSchema?: object[]
  localization?: object[]
  onToggle?: () => void
  isPreloading?: boolean
  isUploading?: boolean
  updated_at?: Date
  completed_at?: Date
  handleFormAction: (values: any, shouldBeFlagged: boolean) => void
  handleClose: () => void
  disabled: boolean
}

type JsonFormUISchema = {
  'ui:order': object
}

const merge = (a, b) => ({ ...a, ...b })
const unpaginate = (
  arr: any[],
  callback: (o: object, a: any) => object = (o, i) => ({ ...o, ...i })
) => (callback ? arr.reduce((memo, item) => callback(memo, item), {}) : arr)
const unpaginateSchema = (arr: JSONSchema7[]): JSONSchema7 =>
  unpaginate(arr, (memo: JSONSchema7, item: JSONSchema7) => {
    delete item.required
    return {
      ...memo,
      ...item,
      properties: { ...(memo?.properties ?? []), ...item.properties },
      type: 'object',
    }
  })
const unpaginateUiSchema = (arr: JsonFormUISchema[]) =>
  unpaginate(arr, (memo: JsonFormUISchema, item: JsonFormUISchema) => {
    return {
      ...memo,
      ...item,
      'ui:order': { ...memo['ui:order'], ...item['ui:order'] },
    }
  })

const modifySchema = (obj: object) => {
  const keys = Object.keys(obj)
  keys.forEach((key) => {
    if (
      key === 'birthSexList' ||
      key == 'problemsWithPainQuestionList' ||
      key == 'unconciousQuestionList'
    ) {
      delete obj[key].required
    }
  })
  return obj
}
const decorateWithUiWidget = (obj: object) => {
  const keys = Object.keys(obj)
  let altToggle = false
  keys.forEach((key, i) => {
    if (obj[key]['femaleOptions']) {
      decorateWithUiWidget(obj[key]['femaleOptions'])
    }
    if (obj[key]['maleOptions']) {
      decorateWithUiWidget(obj[key]['maleOptions'])
    }
    if (typeof obj[key] !== 'string') {
      obj[key]['ui:widget'] = 'orderItem'
      obj[key]['ui:options'] = {
        variant: altToggle
          ? ORDER_ITEM_VARIANT.LIGHT
          : ORDER_ITEM_VARIANT.WHITE,
      }
      altToggle = !altToggle
    }
  })
  return obj
}

const blacklist = [
  'ui:title',
  'ui:ui:title', // bug
  'pgSignature',
  'studentSignature',
  'answerToQuestions',
  'chooseToObtain',
  'formOnFile',
  'ecgConsentP2',
  'ecgConsentP3',
  'ecgConsentP4',
  'ecgConsentP5',
  'signature',
  'signatureHelpText',
  'required',
]

const filterBlacklistProps = (ui, form, data) => {
  blacklist.forEach((key) => {
    delete ui[key]
    delete data[key]
    form.properties && delete form.properties[key]
  })
}

export const MedicalHistory = ({
  url,
  data,
  schema,
  uiSchema,
  localization,
  shouldShowToggleLabel = true,
  onToggle,
  isPreloading = false,
  isUploading = false,
  status,

  ...props
}: MedicalHistoryProps) => {
  const widgets = {
    orderItem: (props: any) => {
      const { type } = props.schema
      return (
        <OrderItem
          label={
            props['ui:title'] !== undefined && props['ui:title'].trim() !== ''
              ? props['ui:title']
              : props['ui:description'] ?? ''
          }
          value={
            type === 'boolean' ? (props.value ? 'Yes' : 'No') : props.value
          }
          showIndicator={type === 'boolean' ? (props.value as boolean) : false}
          variant={props.options?.variant}
        ></OrderItem>
      )
    },
  }

  const en =
    (localization?.find((l) => l['locale'] == 'en') ?? {})['dictionary'] ?? []
  const formSchema = modifySchema(unpaginateSchema((schema || []) as any))
  const tempSchema = merge(
    unpaginateUiSchema((uiSchema || []) as any),
    unpaginate(en)
  )
  const finalData = unpaginate(data || [])
  // TODO: make this less gross and stateful
  filterBlacklistProps(tempSchema, formSchema, finalData)
  const realUiSchema = decorateWithUiWidget(tempSchema)

  return (
    <>
      {data && (
        <Form
          schema={formSchema}
          uiSchema={realUiSchema}
          formData={finalData}
          widgets={widgets}
          disabled={true}
        >
          <></>
        </Form>
      )}
      {url && (
        <div className='tw-grid tw-grid-cols-1 tw-my-1.25 tw-py-2.5 tw-px-3.5'>
          <Button
            size='none'
            className='tw-w-full tw-text-sm'
            variant={BUTTON_VARIANT.PRIMARY}
            onClick={() => {
              window.open(url, '_blank')
            }}
          >
            View Patient Paperwork
          </Button>
        </div>
      )}
    </>
  )
}
