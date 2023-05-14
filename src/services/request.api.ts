import axios from 'axios'
import type { requestData } from '~/interfaces/requestData.interface'

const axiosClient = axios.create({
  baseURL: 'https://urchin-app-q36en.ondigitalocean.app/backend2/requestaccess',
})

export async function sendAccessRequest(requestData: requestData) {
  const { dataRequestorId, sideStreamId, requestAccessMessage } = requestData
  return await axiosClient.post(`/access/${dataRequestorId}/${sideStreamId}`, { requestAccessMessage }).then((response) => {
    return response.data
  }).catch((err) => {
    return err
  })
}
