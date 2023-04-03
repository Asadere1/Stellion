import { useUsersStore } from '../stores/users-store';
import { useCheckoutStore } from '../stores/checkout-store';

export default ({ router }) => {
  router.beforeEach(async (to, from, next) => {

    const usersStore = useUsersStore();
    const checkoutStore = useCheckoutStore();

    console.log(to)

    const anonymousNamedRoutes = ['login', 'verification', 'checkout', 'offer', 'success', 'checkout-upsell', 'checkout-done'];

    if (!usersStore.isLoggedIn && !anonymousNamedRoutes.includes(to.name)) {
      // redirect the user to the login page
      next({path: '/'})
    } else if (usersStore.isLoggedIn && anonymousNamedRoutes.includes(to.name)) {
      // redirect to dashboard if trying to access anonymous pages.
      next({path: '/dashboard'})
    } else {
      const checkoutFlow = [
        'checkout-payment',
        'checkout-upsell',
        'checkout-done'
      ]

      /* These won't do much as everything is stored in Vuex and it resets anyway on page refresh */
      /* However, if we had a real cart loaded from the DB, these would help to move the user to the */
      /* Correct point in the workflow */

      /* if (to.name == 'checkout-payment' && !store.state.cart.checkoutData.customer) {
        return next({ name: 'checkout-information' })
      }

      if (to.name == 'checkout-upsell' && !store.state.cart.checkoutData.payment) {
        return next({ name: 'checkout-payment' })
      }

      if (to.name == 'checkout-done' && !store.state.cart.checkoutData.payment) {
        return next({ name: 'checkout-payment' })
      } */

      /*  */

      if (checkoutFlow.includes(from.name) && checkoutFlow.includes(to.name)) {
        checkoutStore.setCheckoutTransition(true)
      } else {
        checkoutStore.setCheckoutTransition(false)
      }

      next()
    }
  })
}