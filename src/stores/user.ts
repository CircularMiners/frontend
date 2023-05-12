import { acceptHMRUpdate, defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),

  actions: {
    // async fetchUser() {
    //   const res = await fetch("https://localhost:3000/user");

    //   const user = await res.json();
    //   this.user = user;
    // },
    async registerRepresentative(name: string, email: string, password: string, companyName: string, phoneNumber: string) {
      const formData = {
        mineRepresentativeName: name,
        mineRepresentativeEmail: email,
        mineRepresentativePassword: password,
        mineRepresentativeCompanyname: companyName,
        mineRepresentativePhonenumber: phoneNumber,
      }
      const res = await fetch('http://localhost:5002/registration/minerepresentative', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const user = await res.json()
      this.user = user
    },
    async registerVendor(name: string, email: string, password: string, companyName: string) {
      const formData = {
        dataRequestorName: name,
        dataRequestorEmail: email,
        dataRequestorPassword: password,
        dataRequestorCompanyname: companyName,
      }
      const res = await fetch('http://localhost:5002/registration/datarequestor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const user = await res.json()
      this.user = user
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
