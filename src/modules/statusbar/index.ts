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
  text: MaybeRef<string>
  icon: MaybeRef<string>
  foreground: MaybeRef<string>
  background: MaybeRef<string>
  onClick: () => void
  isHidden?: MaybeRef<boolean>
}

export interface CreateStatusbarItemSelectOptions extends CreateStatusbarItemOptions {
  options: MaybeRef<StatusbarItemSelectOption[]>
  value: Ref<any>
  label: MaybeRef<string>
  isHidden?: MaybeRef<boolean>
}

export interface CreateStatusbarItemTextOptions extends CreateStatusbarItemOptions {
  text: MaybeRef<string>
  isLoading: MaybeRef<boolean>
  isHidden?: MaybeRef<boolean>
}

export interface StatusbarItemBase {
  id: number
  alignment: StatusbarAlignment
  priority: number
  isHidden?: MaybeRef<boolean>
}

export interface StatusbarItemText extends StatusbarItemBase {
  type: StatusbarItemType.Text
  text: MaybeRef<string>
  isLoading: MaybeRef<boolean>
}

export interface StatusbarItemButton extends StatusbarItemBase {
  type: StatusbarItemType.Button
  icon: StatusbarAlignment
  text: MaybeRef<string>
  foreground: MaybeRef<string>
  background: MaybeRef<string>
  onClick: () => void
}

export interface StatusbarItemSelectOption {
  label: string
  value: any
}

export interface StatusbarItemSelect extends StatusbarItemBase {
  type: StatusbarItemType.Select
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
    // @ts-expect-error Leave me alone plz
    isHidden: options.isHidden,
    priority: options.priority,
    // @ts-expect-error Leave me alone plz
    text: options.text,
    // @ts-expect-error Leave me alone plz
    isLoading: options.isLoading,
  })

  return dispose
}

export function createStatusbarSelectItem(options: CreateStatusbarItemSelectOptions): Fn {
  const id = Statusbar_ID++
  const dispose = () => statusbarItems.value = statusbarItems.value.filter(item => item.id !== id)

  statusbarItems.value.push({
    id,
    type: StatusbarItemType.Select,
    // @ts-expect-error Leave me alone plz
    isHidden: options.isHidden,
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
    // @ts-expect-error Leave me alone plz
    isHidden: options.isHidden,
    alignment: options.alignment,
    priority: options.priority,
    onClick: options.onClick,
    // @ts-expect-error Leave me alone plz
    icon: options.icon,
    // @ts-expect-error Leave me alone plz
    text: options.text,
    // @ts-expect-error Leave me alone plz
    foreground: options.foreground,
    // @ts-expect-error Leave me alone plz
    background: options.background,
  })

  return dispose
}
