import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilCursor,
  cilPin,
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavGroup,
    name: 'Suggestions',    
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Suggestion Products',
        to: '/suggest-products',
      }
    ],
  },
  {
    component: CNavGroup,
    name: 'Store',  
    to: '/myStore',
    icon: <CIcon icon={cilPin} customClassName="nav-icon" />,
    items: [
      
      {
        component: CNavItem,
        name: 'My Store',
        to: '/myStore',
      },
    ],
  },  
  
 
  
  {
    component: CNavGroup,
    name: 'Orders',
    to: '/orders',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Orders',
        to: '/orders',
      }
    ],
  },

  {
    component: CNavGroup,
    name: 'Pyout',
    to: '/payout',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Pyout',
        to: '/payout',
      }
    ],
  },



  {
    component: CNavGroup,
    name: 'Reports',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Orders',
        to: '/orders',
      }
    ],
  },
  
  {
    component: CNavGroup,
    name: 'Statistics',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
     
      {
        component: CNavItem,
        name: 'Store',
        to: '/products-statistics',
      },
      {
        component: CNavItem,
        name: 'Orders',
        to: '/orders-statistics',
      },
    ],
  },
]

export default _nav
