import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderToggler,
  CImage,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'

import { AppHeaderDropdown } from './header/index'
import png1 from 'src/assets/images/1.png'
const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  return (
    <CHeader position="sticky" className="mb-4" >
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}>
          <CIcon icon={cilMenu} size="lg" style={{ color: 'white' }} />
        </CHeaderToggler>
        <h2>Vendor Dashboard</h2>
        <h2></h2>

      </CContainer>
     
    </CHeader>
  )
}

export default AppHeader
