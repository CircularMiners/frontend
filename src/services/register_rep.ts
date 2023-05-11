import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'http://localhost:5002/registration/minerepresentative',
})
export async function submitForm(name: string, email: string, password: string, phoneNumber: string, companyName: string) {
  const formData = {
    mineRepresentativeName: name,
    mineRepresentativeEmail: email,
    mineRepresentativePassword: password,
    mineRepresentativeCompanyname: companyName,
    mineRepresentativePhonenumber: phoneNumber,
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
