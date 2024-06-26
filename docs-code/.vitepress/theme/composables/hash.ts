import { inBrowser } from '../../shared'
import { ref } from 'vue'

const hashRef = ref(inBrowser ? location.hash : '')

if (inBrowser) {
  window.addEventListener('hashchange', () => {
    hashRef.value = location.hash
    // console.log(`hashRef.value👉`,hashRef.value)
    // console.log(`hashRef.value.substring(1)👉`,hashRef.value.substring(1))
  })
}

export { hashRef }
