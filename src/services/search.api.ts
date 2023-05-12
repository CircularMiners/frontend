import axios from 'axios'
import type { companySideStreamData } from '~/interfaces/companySideStreamData.interface'

const axiosClient = axios.create({
  baseURL: 'http://localhost:5002/sidestream',
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
