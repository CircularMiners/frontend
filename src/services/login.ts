import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'http://localhost:5002/login',
})
export async function checkCredentials(email: string, password: string, usertype: string) {
  const formData = {
    userEmail: email,
    userPassword: password,
    userType: usertype,
  }

  try {
    const response = await axiosClient.post('/', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    // eslint-disable-next-line no-console
    console.log('Credentials submitted successfully:', response.data)
  }
  catch (error) {
    console.error('Error submitting credentials:', error)
  }
}
