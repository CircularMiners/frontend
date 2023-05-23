import axios from 'axios'
import type { companySideStreamData } from '~/interfaces/companySideStreamData.interface'

const axiosClient = axios.create({
  baseURL: 'https://urchin-app-q36en.ondigitalocean.app/backend2/sidestream',
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

export async function isRequestSent(dataRequestorId: string, sidestreamId: string): Promise<boolean> {
  try {
    const response = await axios.get(`https://urchin-app-q36en.ondigitalocean.app/backend2/requestaccess/requestor/${dataRequestorId}`)
    const requests = response.data as Request[] // Replace 'Request' with your actual request type
    const isSent = requests.some(request => request.sidestreamId === sidestreamId && request.requestAccessStatus !== 'PENDING')
    return isSent
  }
  catch (error) {
    console.error('Error checking request status:', error)
    return false
  }
}
