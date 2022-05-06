import { domReady } from './utils'
import { useLoading } from './loading'

const { appendLoading, removeLoading } = useLoading();
(window as any).removeLoading = removeLoading

domReady().then(appendLoading)
