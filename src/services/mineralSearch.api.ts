import axios from 'axios'

import type { CompositionMaterial } from '~/interfaces/compositionMaterial.interface'

export async function getMineralList() {
  try {
    const response = await axios.get('https://urchin-app-q36en.ondigitalocean.app/backend2/mineral/searchmineral/')
    const minerals: CompositionMaterial[] = response.data
    // console.log(minerals)
    return minerals
    // You can further process the minerals data here
  }
  catch (error) {
    console.error(error)
  }
}
