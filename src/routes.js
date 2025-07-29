import React from 'react'


// wait
const Wait = React.lazy(() => import('./views/Wait'))

// suggest-products
const SuggestProducts = React.lazy(() => import('./views/suggestion/SuggestProducts'))
const AddSuggestProduct = React.lazy(() => import('./views/suggestion/addSuggestProduct'))
const UpdateSuggestProduct = React.lazy(() => import('./views/suggestion/updateSuggestProduct'))

const MyStore = React.lazy(() => import('./views/myStore/myStore'))
const Payout = React.lazy(() => import('./views/payout/payout'))
const AddStoreItem = React.lazy(() => import('./views/myStore/addStoreItem'))





// orders
const Orders = React.lazy(() => import('./views/orders/orders'))

// statistics
const UsersStatistic = React.lazy(() => import('./views/statistics/users'))
const ProductsStatistic = React.lazy(() => import('./views/statistics/products'))
const OrdersStatistic = React.lazy(() => import('./views/statistics/orders'))






const routes = [
  { path: '/', exact: true, name: 'Home' },
  
  { path: '/suggest-products', name: 'SuggestProducts', element: SuggestProducts },
  { path: '/AddSuggestProduct', name: 'AddSuggestProduct', element: AddSuggestProduct },
  { path: '/updateSuggestProduct', name: 'Update Suggest Product', element: UpdateSuggestProduct },
  
  { path: '/myStore', name: 'My Store', element: MyStore },
  { path: '/addStoreItem', name: 'AddSuggestProduct', element: AddStoreItem },

  { path: '/orders', name: 'Orders', element: Orders },
  { path: '/payout', name: 'Payout', element: Payout },
 
  { path: '/users-statistics', name: 'UsersStatistic', element: UsersStatistic },
  { path: '/products-statistics', name: 'ProductsStatistic', element: ProductsStatistic },
  { path: '/orders-statistics', name: 'OrdersStatistic', element: OrdersStatistic },
  
  { path: '/wait', name: 'Wait', element: Wait },
  
  
]

export default routes
