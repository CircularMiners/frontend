import axios from 'axios'
import type { companySideStreamData } from '~/interfaces/companySideStreamData.interface'

const axiosClient = axios.create({
  baseURL: 'https://urchin-app-q36en.ondigitalocean.app/backend2/sidestream/search/449cb02f-df1d-4982-87ea-2230815b75f1',
})

export async function searchBaseOnMaterialName(oreName: string) {
  let resultData: companySideStreamData[] = []
  return await axiosClient.get<companySideStreamData[]>(`/${oreName}`).then((response) => {
    resultData = response.data
    // console.log(resultData)
    return resultData
  }).catch((err) => {
    return err
  })
}
