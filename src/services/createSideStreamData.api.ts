import axios from 'axios'

import type { CompositionMaterial } from '~/interfaces/compositionMaterial.interface'

interface FormData {
  oreName: string
  description: string
  weight: number | null
  size: number | null
  compositionMaterial: CompositionMaterial[]
}

const axiosRequest = axios.create({
  baseURL: 'https://urchin-app-q36en.ondigitalocean.app/backend2/sidestream',
})

export async function createSideStreamData(formData: FormData, mineRepId: string, mineId: string) {
  const postEndpoint = `/${mineRepId}/${mineId}`
  try {
    await axiosRequest.post(postEndpoint, formData)
  }
  catch (err) {
    console.error(err)
    return null
  }
}
