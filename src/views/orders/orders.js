import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import '../../assets/css/login.css';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CContainer,
  CRow,
  CCol,
  CButton,
  CImage,
  CCardTitle,
  CCardText,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,

} from '@coreui/react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { cilFilter } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import useAuth from "../../hooks/useAuth";
import axios from '../../axios';
import { COLORS, BASE_Image_URL } from '../../consts';
const Orders = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);


  const MySwal = withReactContent(Swal)
  useEffect(() => {
    fetchData(0);
  }, []);
  const getD = (p) => {
    let k = ''
    Object.keys(p).slice(0, 1).map((t, i) => {
      k = t + ' : ' + p[t]
    })
    return k
  }
  const fetchData = async (pageNo) => {
    try {
      const response = await axios.get('/api/v1/orders/vendors/'+auth?.userId,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth?.accessToken
          }
        }
      )
      console.log(response?.data)
      setOrders(response?.data)
    } catch (err) {
      console.log(err);

    }

  }
let orderStatuses={
  "NEW":"PREPARED",
  "PREPARED":"SHIPPED",
  "SHIPPED":"COMPLETED",
  "CANCELLED":"CANCELLED",
}
const changeStatus = async (orderId,newStatus) => {
  try {
    const response = await axios.put('/api/v1/orders/statuses/'
    +orderId+'?status='+newStatus,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + auth?.accessToken
        }
      }
    )
    // setUsers(users.map(user =>

    //   user.id === userId ? { ...user, age: newAge } : user
   
    // ));
setOrders(orders.map(order => order.id===orderId?
  {...order,status:newStatus}:order))

  } catch (err) {
    console.log(err);

  }

}

  return (
    <>
      <CRow>
        <CCol md={4}>
          <CCard className="mb-4 text-center " style={{ width: 'fit-content' }}>
            <CCardHeader>
              <CIcon icon={cilFilter} />
            </CCardHeader>
          </CCard>

        </CCol>
      </CRow>
      {orders
        ? <>
          <CContainer className="p-4">
            {/* Cart Header */}
            <h4 className="mb-4">Your Orders</h4>

            {/* Cart Items */}
            {orders.length === 0 ? (
              <><h2 className="text-center">There Is No Orders!</h2>
                <CButton color="primary" size="lg" className="mt-5 mx-5"

                  onClick={() => navigate('/')}>
                  Shopping
                </CButton>
              </>
            ) : (
              <CAccordion activeItemKey={1}>
                {orders.map((item0, index0) =>
                  <CAccordionItem itemKey={item0.id} key={item0.id} style={{margin:'25px'}}>
                    <CAccordionHeader>
                      <div className="flex-grow-1 ms-3">{index0 + 1} - {item0.amount} EUR</div>
                      <div className="flex-grow-1 ms-3">{item0.status}</div>
                    </CAccordionHeader>
                    <CAccordionBody>
                      <CContainer className="p-4">
                        <CRow className="gy-4">
                          {item0.products.map((item) => (
                            <CCol xs="12" key={item.id}>
                              <CCard className="border-light shadow-sm">
                                <CCardBody className="d-flex align-items-center justify-content-between">
                                  {/* Product Image */}
                                  <CImage src={BASE_Image_URL + item.images[0]} alt={item.name} width="100" height="100" className="rounded" />

                                  {/* Product Details */}
                                  <div className="flex-grow-1 ms-3">
                                    <CCardTitle>{item.title}</CCardTitle>
                                    <CCardText>
                                      <span className="text-muted">${item.price.toFixed(2)}</span>
                                      <br />
                                      {getD(item.details)}
                                    </CCardText>
                                  </div>
                                  <div className="flex-grow-1 ms-3">

                                    <CCardText>
                                      Quantity: {item.quantity}
                                    </CCardText>
                                  </div>
                                  <div className="flex-grow-1 ms-3">

                                    <CCardText>
                                      ${(item.price * item.quantity).toFixed(2)}
                                    </CCardText>
                                  </div>




                                </CCardBody>
                              </CCard>
                            </CCol>
                          ))}
                        </CRow>

                      </CContainer>
                     { item0.status!=='COMPLETED'?
                     <><CButton style={{background:'green'}}
                      onClick={()=> changeStatus(item0.id,orderStatuses[item0.status])}
                      >{orderStatuses[item0.status]}</CButton>
                      <CButton className='ms-5' style={{background:'red'}}
                      onClick={()=> changeStatus(item0.id,"CANCELLED")}
                      >{orderStatuses["CANCELLED"]}</CButton></>:<></>}
                    </CAccordionBody>
                  </CAccordionItem>
                )}


              </CAccordion>
            )}


          </CContainer>

        </> : <></>}
    </>
  )
}

export default Orders
