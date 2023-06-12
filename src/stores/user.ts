import { acceptHMRUpdate, defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),

  actions: {
    async checkCredentials(email: string, password: string, user_type: string) {
      const formData = {
        userEmail: email,
        userPassword: password,
        userType: user_type,
      }
      const res = await fetch('https://urchin-app-q36en.ondigitalocean.app/backend2/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const response = await res.json()
      if (response.message !== 'validated')
        alert('Wrong Username or Password')
      else
        this.user = response
      if (this.user)
      // eslint-disable-next-line no-console
        console.log('Credentials submitted successfully')
    },
    async registerRepresentative(name: string, email: string, password: string, companyName: string, phoneNumber: string) {
      const formData = {
        mineRepresentativeName: name,
        mineRepresentativeEmail: email,
        mineRepresentativePassword: password,
        mineRepresentativeCompanyname: companyName,
        mineRepresentativePhonenumber: phoneNumber,
      }
      const res = await fetch('https://urchin-app-q36en.ondigitalocean.app/backend2/registration/minerepresentative', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const response = await res.json()
      if (response.message === 'User already exists')
        alert('User already exists')
      else
        window.location.href = '/login'
    },
    async registerVendor(name: string, email: string, password: string, companyName: string) {
      const formData = {
        dataRequestorName: name,
        dataRequestorEmail: email,
        dataRequestorPassword: password,
        dataRequestorCompanyname: companyName,
      }
      const res = await fetch('https://urchin-app-q36en.ondigitalocean.app/backend2/registration/datarequestor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const response = await res.json()
      if (response.message === 'User already exists')
        alert('User already exists')
      else
        window.location.href = '/login'
    },
  },
  persist: true,
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
