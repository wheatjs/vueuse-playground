import type { Fn, MaybeRef } from '@vueuse/core'
import type { Ref } from 'vue'

export const enum StatusbarAlignment {
  Left,
  Right,
}

export const enum StatusbarItemType {
  Text,
  Button,
  Select,
}

export interface CreateStatusbarItemOptions {
  alignment: StatusbarAlignment
  priority: number
}

export interface CreateStatusbarItemButtonOptions extends CreateStatusbarItemOptions {
  onClick: () => void
}

export interface CreateStatusbarItemSelectOptions extends CreateStatusbarItemOptions {
  options: MaybeRef<StatusbarItemSelectOption[]>
  value: Ref<any>
  label: MaybeRef<string>
}

export interface CreateStatusbarItemTextOptions extends CreateStatusbarItemOptions {
  text: MaybeRef<string>
}

export interface StatusbarItemText {
  id: number
  type: StatusbarItemType.Text
  alignment: StatusbarAlignment
  priority: number
  text: MaybeRef<string>
}

export interface StatusbarItemButton {
  id: number
  type: StatusbarItemType.Button
  alignment: StatusbarAlignment
  priority: number
  onClick: () => void
}

export interface StatusbarItemSelectOption {
  label: string
  value: any
}

export interface StatusbarItemSelect {
  id: number
  type: StatusbarItemType.Select
  alignment: StatusbarAlignment
  priority: number
  options: MaybeRef<StatusbarItemSelectOption[]>
  value: Ref<any>
  label: MaybeRef<string>
}

export type StatusbarItem = StatusbarItemText | StatusbarItemButton | StatusbarItemSelect

export const statusbarItems = ref<StatusbarItem[]>([])

let Statusbar_ID = 0

export function createStatusbarTextItem(options: CreateStatusbarItemTextOptions): Fn {
  const id = Statusbar_ID++
  const dispose = () => statusbarItems.value = statusbarItems.value.filter(item => item.id !== id)

  statusbarItems.value.push({
    id,
    type: StatusbarItemType.Text,
    alignment: options.alignment,
    priority: options.priority,
    // @ts-expect-error Leave me alone plz
    text: options.text,
  })

  return dispose
}

export function createStatusbarSelectItem(options: CreateStatusbarItemSelectOptions): Fn {
  const id = Statusbar_ID++
  const dispose = () => statusbarItems.value = statusbarItems.value.filter(item => item.id !== id)

  statusbarItems.value.push({
    id,
    type: StatusbarItemType.Select,
    alignment: options.alignment,
    priority: options.priority,
    // @ts-expect-error Leave me alone plz
    options: options.options,
    value: options.value,
    // @ts-expect-error Leave me alone plz
    label: options.label,
  })

  return dispose
}

export function createStatusbarButtonItem(options: CreateStatusbarItemButtonOptions): Fn {
  const id = Statusbar_ID++
  const dispose = () => statusbarItems.value = statusbarItems.value.filter(item => item.id !== id)

  statusbarItems.value.push({
    id,
    type: StatusbarItemType.Button,
    alignment: options.alignment,
    priority: options.priority,
    onClick: options.onClick,
  })

  return dispose
}
