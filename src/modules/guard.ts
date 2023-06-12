import { type UserModule } from '~/types'

export const install: UserModule = ({ isClient, router }) => {
  router.beforeEach((to, from) => {
    const user = useUserStore()
    //             Page requires login     Prevent redirect loops       User authentication check
    if (isClient && to.meta.requiresAuth && to.path !== '/login' && user?.user === null) {
      // console.log(`Authentication required for page '${to.name?.toString()}'! Redirecting to login.`)
      // Redirect user to login page
      return { path: '/login' }
    }
    if (isClient && to.path === '/login' && user?.user !== null) {
      // console.log('User already logged in! Redirecting to home.')
      return { path: '/' }
    }
  })
}
