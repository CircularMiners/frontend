import axios from 'axios'
import type { mineData } from '~/interfaces/mineData.interface'

const userStore = useUserStore()

const axiosClient = axios.create({
  baseURL: 'https://urchin-app-q36en.ondigitalocean.app/backend2/mine/searchmine?mine_representative_id=',
})

export async function getMineList() {
  let resultData: mineData[] = []
  return await axiosClient.get<mineData[]>(`${userStore.user?.id}`).then((response) => {
    resultData = response.data
    // console.log(resultData)
    return resultData
  }).catch((err) => {
    return err
  })
}
