import axios from 'axios'
import type { requestData } from '~/interfaces/requestData.interface'

const axiosRequest = axios.create({
  baseURL: 'https://urchin-app-q36en.ondigitalocean.app/backend2/requestaccess',
})

export async function sendAccessRequest(requestData: requestData) {
  const { dataRequestorId, sideStreamId, requestAccessMessage } = requestData
  const postEndpoint = `/${dataRequestorId}/${sideStreamId}`

  try {
    await axiosRequest.post(postEndpoint, { requestAccessMessage })
  }
  catch (err) {
    console.error(err)
    return null
  }
}
