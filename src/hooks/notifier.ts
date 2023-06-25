import type { TypeNotification } from "@/intarfaces/INotification"
import { store } from "@/store"

type Notifier = {
  notify:(type: TypeNotification, title: string, text: string) => void
}

export default (): Notifier => {
  const notify = (type: TypeNotification, title: string, text: string) => {
    store.commit("NOTIFY", {
      title,
      text,
      type
    })
  }

  return {
    notify
  }
}