import React, { useState, useRef, useEffect } from 'react'
import '../../assets/css/login.css';
import {
    CCol,
    CRow,
    CButton,
    CImage
} from '@coreui/react';
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons';

const ShowImage = (state) => {
    const removeItem = (i) => {
        console.log(i);
        let x = -1;
        let deleteLi = state.images.filter(p => ++x !== i);
        state.setImages(deleteLi);

    }

    return (
        <>
            {state.images ? state.images.map((item, index) =>
                <CCol sm={6} key={index} className='mb-4'>
                    {item.url
                        ? <CImage width='150px' src={item.url}
                            style={{ maxHeight: '150px', width: 'auto' }} />

                        : <CImage width='150px' src={URL.createObjectURL(item)}
                            style={{ maxHeight: '150px', width: 'auto' }} />}

                   {state.setImages? <CButton color='' style={{ borderRadius: "50%" }}
                        onClick={() => removeItem(index)} >
                        <CIcon icon={cilTrash} style={{ width: '100%', marginTop: '-120px', color: '#a4a3b3' }}

                        />
                    </CButton>:<></>}

                </CCol>

            )
                : <></>}

        </>
    )
}


export default ShowImage