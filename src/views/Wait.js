

import React from 'react'
import {
    CCard,
    CCardHeader,
    CCol,
    CRow,   
} from '@coreui/react'

const Wait = () => {   

    return (        
            <CRow>
                <CCol md={12}>
                    <CCard className="mb-4 text-center " style={{ width: 'fit-content' }}>
                        <CCardHeader>
                            <h1 color='primary'  >
                                Under Construction.
                            </h1>
                        </CCardHeader>
                    </CCard>

                </CCol> 
            </CRow>
    )
}

export default Wait
