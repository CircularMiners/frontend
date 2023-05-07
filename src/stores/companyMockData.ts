import { defineStore } from 'pinia'

export const useCompanyMockDataStore = defineStore('mockData', () => {
  interface Company {
    id: number
    companyName: string
    location: string
    materialName: string
    particleSize: string
    particleWeight: string
    mineralName: string
    percentage: string
    chemicalCode: string
    purity: string
    moisture: string
    date: string
    access: boolean
  }

  const mockData: Company[] = [
    {
      id: 1,
      companyName: 'ABC Company',
      location: 'Helsinki',
      materialName: 'Quartz',
      particleSize: '10mm',
      particleWeight: '100g',
      mineralName: 'Silicon',
      percentage: '75%',
      chemicalCode: 'SiO2',
      purity: '90%',
      moisture: '5%',
      date: '2023-05-01',
      access: false,
    },
    {
      id: 2,
      companyName: 'XYZ Company',
      location: 'Turku',
      materialName: 'Feldspar',
      particleSize: '20mm',
      particleWeight: '200g',
      mineralName: 'Aluminum silicate',
      percentage: '60%',
      chemicalCode: 'Al2SiO4',
      purity: '85%',
      moisture: '7%',
      date: '2023-05-02',
      access: false,
    },
    {
      id: 3,
      companyName: 'DEF Company',
      location: 'Tampere',
      materialName: 'Mica',
      particleSize: '5mm',
      particleWeight: '50g',
      mineralName: 'Potassium aluminum silicate',
      percentage: '80%',
      chemicalCode: 'KAl2(AlSi3O10)(OH)2',
      purity: '95%',
      moisture: '3%',
      date: '2023-05-03',
      access: true,
    },
    {
      id: 4,
      companyName: 'GHI Company',
      location: 'Oulu',
      materialName: 'Kaolinite',
      particleSize: '15mm',
      particleWeight: '150g',
      mineralName: 'Aluminum silicate hydroxide',
      percentage: '70%',
      chemicalCode: 'Al2Si2O5(OH)4',
      purity: '80%',
      moisture: '4%',
      date: '2023-05-04',
      access: true,
    },
  ]

  return {
    mockData,
  }
})
