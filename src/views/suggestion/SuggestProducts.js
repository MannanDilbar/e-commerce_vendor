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
  CButton,
  CImage, CFormInput,
  CInputGroup, CInputGroupText,
  CTooltip
} from '@coreui/react'
import { cilFilter, cilPen, cilPlus, cilTag } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import useAuth from "../../hooks/useAuth";
import axios from '../../axios';
import { COLORS, BASE_Image_URL } from '../../consts';
const SuggestedProducts = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [colors2] = useState(COLORS);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [visible, setVisible] = useState(false)

  const [search, setSearch] = useState('');


  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    filterData()
  }, [search]);
  const filterData = () => {
    const filtered = products.filter(p => {
      return (
        (search.trim().size === 0 || p.title.toLowerCase().includes(search.toLowerCase()))
      )

    });
    setFilteredProducts(filtered);
  }

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/v1/suggest-items/vendors/' + auth?.userId,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth?.accessToken
          }
        }
      )
      console.log(response?.data)
      setFilteredProducts(response?.data)
      setProducts(response?.data)
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
              <CButton color={colors2[3]} style={{ borderRadius: "50%" }}
                onClick={(e) => navigate('/AddSuggestProduct')}>
                <CIcon icon={cilPlus} />
              </CButton>
              <CTooltip content="Add New Suggesion Items">
               

                  <CIcon icon={cilTag} style={{ borderRadius: "50%", maxWidth: '15px', marginLeft:'10px'}} />

                </CTooltip>
            </CCardHeader>
          </CCard>

        </CCol>

        {filteredProducts
          ? <>




            <CCol xs={12}>
              <CCard className="mb-4 text-center">
                <CCardHeader>
                  <h3 style={{ color: colors2[0] }}>Suggested Products</h3>
                </CCardHeader>
                <CCardBody>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      Search
                    </CInputGroupText>
                    <CFormInput
                      value={search}
                      placeholder="Search"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </CInputGroup>

                  <CTable striped responsive>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                        <CTableHeaderCell scope="col">image</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                        <CTableHeaderCell scope="col"></CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>


                      {filteredProducts && filteredProducts.map((item, index) =>
                        <CTableRow key={index}>
                          <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                          <CTableDataCell>{item?.title}</CTableDataCell>
                          <CTableDataCell><CImage width='150px' src={BASE_Image_URL + item.images[0]}
                            style={{ maxHeight: '50px', width: 'auto' }} /></CTableDataCell>
                          <CTableDataCell>{item.status}</CTableDataCell>

                          <CTableDataCell scope="col"><CButton color=''
                            onClick={(e) => navigate('/updateSuggestProduct', { state: { id: item.id } })}
                          > <CIcon className="text-warning" icon={cilPen} /></CButton></CTableDataCell>

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

export default SuggestedProducts
