import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import '../../assets/css/login.css';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CImage
  
} from '@coreui/react'
import useAuth from "../../hooks/useAuth";
import axios from '../../axios';
import {  COLORS, BASE_Image_URL,getEnabled } from '../../consts';
const Payout = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [colors2] = useState(COLORS); 
  const [payments,setPayments] = useState([]); 
 
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/v1/payouts/vendors/'+auth?.userId,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth?.accessToken
          }
        }
      )
      console.log(response?.data)
      setPayments(response?.data)
    } catch (err) {
      console.log(err);

    }

  }


  return (
    <>
     



      <CRow>
       

      
       
        {payments
          ? <>



            <CCol xs={12}>
              <CCard className="mb-4 text-center">
                <CCardHeader>
                  <h3 style={{ color: colors2[0] }}>My Payout</h3>
                </CCardHeader>
                <CCardBody>

                  <CTable striped responsive>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Month</CTableHeaderCell>
                        <CTableHeaderCell scope="col">orders</CTableHeaderCell>
                        <CTableHeaderCell scope="col">items</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Total Price</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Website Commission</CTableHeaderCell>
                        <CTableHeaderCell scope="col">payouts</CTableHeaderCell>
                        <CTableHeaderCell scope="col">status</CTableHeaderCell>
                      
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>


                      {payments && payments.map((item, index) =>
                        <CTableRow key={index}>
                          <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                          <CTableDataCell>{item?.createdDate}</CTableDataCell>
                          <CTableDataCell>{item?.month}/{item?.year}</CTableDataCell>
                          <CTableDataCell>{item?.orders}</CTableDataCell>
                          <CTableDataCell>{item?.items}</CTableDataCell>
                          <CTableDataCell>{item?.total.toFixed(2)} EUR</CTableDataCell>
                          <CTableDataCell>{item?.commission.toFixed(2)} EUR</CTableDataCell>
                          <CTableDataCell>{item?.payout.toFixed(2)} EUR</CTableDataCell>
                          <CTableDataCell>{item?.status}</CTableDataCell>
                       
                        </CTableRow>)}
                    </CTableBody>
                  </CTable>

                </CCardBody>
              </CCard>
            </CCol></> : <>
            <CRow>
              <CCol md={6}>
                <CCard className="mb-4 text-center " style={{ width: 'fit-content' }}>
                  <CCardHeader>
                    <h3 style={{ color: 'red' }} >
                      Oops.. Sorry There is no data.
                    </h3>
                  </CCardHeader>
                </CCard>

              </CCol>
            </CRow>
          </>}

      </CRow>
      
    </>
  )
}

export default Payout
