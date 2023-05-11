import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'http://localhost:5002/registration/datarequestor',
})
export async function submitForm(name: string, email: string, password: string, companyName: string) {
  const formData = {
    dataRequestorName: name,
    dataRequestorEmail: email,
    dataRequestorPassword: password,
    dataRequestorCompanyname: companyName,
  }

  try {
    const response = await axiosClient.post('/', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    // eslint-disable-next-line no-console
    console.log('Form submitted successfully:', response.data)
  }
  catch (error) {
    console.error('Error submitting form:', error)
  }
}
