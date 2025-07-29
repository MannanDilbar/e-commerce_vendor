import React, { useState, useRef } from "react";
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilEnvelopeOpen,
  cilCommentBubble,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { BASE_URL } from '../../consts'

import avatar8 from './../../assets/images/avatars/5.jpg'
import useAuth from "../../hooks/useAuth";

const AppHeaderDropdown = () => {

  const client = useRef(null);
  const { auth } = useAuth();
  const [msgs, setMsgs] = useState([]);
  const [msgsCount, setMsgscount] = useState(0);

  const onMessageReceived = (msg) => {
  //  console.log('msg', msg, client);
    setMsgs(c => [msg, ...c]);
setMsgscount(msgsCount+1);
  }
  return (
    <>

      
      <CDropdown variant="nav-item" style={{ 'marginRight': '90px' }} onClick={(e) => setMsgscount(0)} >
        <CDropdownToggle placement="bottom-end" className="py-0" caret={false} >
          
          <CIcon icon={cilCommentBubble} className="me-2" size="xxl" style={{ 'color': 'white' }} />
          {msgsCount > 0 ?<CBadge color="danger"  position="top-end" shape="rounded-pill">
            {msgsCount}
          </CBadge>:<></>}
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownHeader className="bg-light fw-semibold py-2">Messages</CDropdownHeader>
          {msgs.length>0
            ? msgs.map((item, index) => <CDropdownItem href="#" key={index}>
              <CIcon icon={cilEnvelopeOpen} className="me-2" />
            {item.msg}
            
          </CDropdownItem>):<></>}
         
        </CDropdownMenu>
      </CDropdown>
      <CDropdown variant="nav-item">
        <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
          <CAvatar src={avatar8} size="md" />
        </CDropdownToggle>
        
      </CDropdown>
    </>
  )
}

export default AppHeaderDropdown
