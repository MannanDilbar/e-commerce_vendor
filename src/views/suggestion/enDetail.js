import React, { useState, useRef, useEffect } from 'react'
import '../../assets/css/login.css';
import {
    CCol,  
    CFormInput,
    CRow,
    CButton,
    CFormTextarea
} from '@coreui/react';
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons';

const EnDetail = (state) => {
    const removeItem = (x)=>{
        const nextParticipants = state.en.filter(p => p.index !== x);               
        state.setEn(nextParticipants);

}
    const updateItem = (k,x,v) => {
        const nextParticipants = state.en.map(participant => {
            if (participant.index !== x)
                return participant;
            else {
                if(k==='k')
                return { index: x, key: v, value: participant.value }
                else return { index: x, key: participant.key, value: v }
            }
        });
        state.setEn(nextParticipants);
    }

    return (
        <>
         { state.en ? state.en.map((item, index) =>
            
        <CRow key={index}>
            <CCol className='mb-5' sm={5}>
                <CFormInput
                    placeholder="Caption" 
                         value={item.key ? item.key:''}
                         onChange={(e) => updateItem('k',item.index,e.target.value)}              
                />

            </CCol>
            <CCol sm={5}>
                <CFormTextarea
                    placeholder="Value"  
                         value={item.value ? item.value:''}
                         onChange={(e) => updateItem('v', item.index, e.target.value)}                     
                />
            </CCol>
                 <CCol sm={2}>
                     <CButton color='' style={{ borderRadius: "50%" ,color:'red'}}
                        onClick={()=>removeItem(item.index)}
                     >
                         <CIcon icon={cilTrash} /> </CButton>
                 </CCol>
            </CRow>)
            :<></>}
        
        </>
    )
}


export default EnDetail