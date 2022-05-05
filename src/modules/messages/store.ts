export interface Message {
  message: string
  type: 'info' | 'warn' | 'error'
  items: string[]
  resolve: (timestamp: number, value?: any) => void
  timestamp: number
}

export const useMessageStore = defineStore('messages', () => {
  const messages = ref<Message[]>([])

  function createMessage<T extends string>(message: string, type: 'info' | 'warn' | 'error', ...items: T[]): Promise<T | undefined> {
    return new Promise((resolve) => {
      const timestamp = Date.now()

      messages.value = [
        ...messages.value,
        {
          type,
          message,
          items,
          resolve: (ts, result) => {
            messages.value = messages.value.filter(m => m.timestamp !== ts)
            resolve(result)
          },
          timestamp,
        },
      ]
    })
  }

  function showErrorMessage<T extends string>(message: string, ...items: T[]): Promise<T | undefined> {
    return createMessage(message, 'error', ...items)
  }

  function showWarningMessage<T extends string>(message: string, ...items: T[]): Promise<T | undefined> {
    return createMessage(message, 'warn', ...items)
  }

  function showInformationMessage<T extends string>(message: string, ...items: T[]): Promise<T | undefined> {
    return createMessage(message, 'info', ...items)
  }

  return {
    messages,

    showErrorMessage,
    showWarningMessage,
    showInformationMessage,
  }
})
