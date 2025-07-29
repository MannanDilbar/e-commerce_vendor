import React, { useState, useEffect } from 'react'
import axios from '../../axios';
import '../../assets/css/login.css';
import { useNavigate } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CForm,
    CCardTitle,
    CInputGroup,
    CInputGroupText,
    CRow,
    CFormSelect,
    CAccordion,
    CAccordionHeader,
    CAccordionBody,
    CAccordionItem,
    CFormTextarea,
    CSpinner,
    CListGroup,
    CListGroupItem,
    CFormInput
} from '@coreui/react'

import { COLORS, formatDate, BASE_Image_URL }
    from '../../consts';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { cilCheckAlt, cilPlus } from '@coreui/icons';
import CIcon from '@coreui/icons-react'
import EnDetail from '../suggestion/enDetail';
import ShowImage from '../suggestion/image';

import { useLocation } from 'react-router-dom';
const AddStoreItem = () => {
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [colors2] = useState(COLORS);
    const [id, setId] = useState('');
    const [createdDate, setCreatedDate] = useState('');

    const [enabled, setEnabled] = useState();


    const [price, setPrice] = useState(90);
    const [validPrice, setValidPrice] = useState(0);
    const [msgPrice, setMsgPrice] = useState('Please Enter valid Price');
    
    const [quantity, setQuantity] = useState(5);
    const [validQuantity, setValidQuantity] = useState(0);
    const [msgQuantity, setMsgQuantity] = useState('Please Enter valid Quantity');

    const [discount, setDiscount] = useState(3);
    const [validDiscount, setValidDiscount] = useState(0);
    const [msgDiscount, setMsgDiscount] = useState('Please Enter valid Discount');


    const [enTitel, setEnTitel] = useState('');    
    const [enDes, setEnDes] = useState('');   

    const [green] = useState('green');
    const [red] = useState('red');
    const [btnAdd] = useState('#321fdb');

    const [colMain, setColMain] = useState('#2c384af2');
    const [colEn, setColEn] = useState('#2c384af2');
    const [colImg, setColImg] = useState('#2c384af2');



    const [en, setEn] = useState([]);
    const [indx, setIndx] = useState(0);
   

    const [images, setImages] = useState([]);
    const [spinner, setSpinner] = useState(false);
    const [categories, setCategories] = useState();
    const [categoryId, setCategoryId] = useState();
    const [subCategories, setSubCategories] = useState();
    const [subCategoryId, setSubCategoryId] = useState();
    const [products, setProducts] = useState();
    const [productId, setProductId] = useState();



    useEffect(() => {
        fetchCategories();
    }, []);
    const fetchCategories = async () => {
        try {
            const response = await axios.get('/api/v1/categories?enabled=true',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + auth?.accessToken
                    }
                }
            )
            setCategories(response?.data)
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        if (categoryId)
            fetchSubCategories();
        console.log(categoryId)
    }, [categoryId]);

    const fetchSubCategories = async () => {
        try {
            const response = await axios.get('/api/v1/sub-categories?categoryId=' + categoryId + '&enabled=true',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + auth?.accessToken
                    }
                }
            )
            setSubCategories(response?.data)
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        if (subCategoryId)
            fetchProducts();
        console.log(subCategoryId)
    }, [subCategoryId]);



    const fetchProducts = async () => {
        try {
            const response = await axios.get('/api/v1/products/subcategory/' + subCategoryId,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + auth?.accessToken
                    }
                }
            )
            setProducts(response?.data)

        } catch (err) {
            console.log(err);
        }

    }
    useEffect(() => {
        if (productId)
            fetchProductData();
        console.log(productId)
    }, [productId]);

    const fetchProductData = async () => {
        try {
            const response = await axios.get('/api/v1/products/' + productId,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + auth?.accessToken
                    }
                }
            )


            // En details

            setEnTitel(response?.data.title);
            setEnDes(response?.data.description);
            setIndx(0);
            setEn([])

            Object.keys(response?.data.details).map((t, i) => {
                let tt = (response?.data.details[t]);
                setIndx(i);
                setEn(c => [...c, { index: i, key: t, value: tt }])
            })

            // images
            setImages([])
            response?.data.images.map((t, i) => {
                setImages(c => [...c, { url: BASE_Image_URL + t }])
            })
            console.log(en.length, en)
        } catch (err) {
            console.log(err);
        }

    }

    const submit = async () => {       
        // setSpinner(true);
       
        const response = await axios.post('/api/v1/stores',
        JSON.stringify({productId,vendorId:auth?.userId,
            quantity,price,discountPercentage:discount}),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth?.accessToken
                },
            });

        setSpinner(false);
        MySwal.fire({
            title: <p>The Product is Updated</p>,
            timer: 2000,
            icon: 'success',
            didOpen: () => {
            },
        }).then(() => navigate(-1))


    }


    return (

        <CContainer  >
            <CRow className="justify-content-center ">
                <CCol md={11} lg={9} xl={7} className='mb-4' style={{ borderRadius: "50%" }}>
                    <CCard >
                        <CCardBody className='text-center'>
                            <h4 style={{ color: colors2[2] }}>New Store Item</h4>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol md={11} lg={9} xl={7}>
                    <CAccordion className="mb-4 text-center " style={{ color: 'green' }}>
                        <CAccordionItem itemKey={1} className="mb-4" >
                            <CAccordionHeader ><div style={{ color: colMain }}>Select Product</div></CAccordionHeader>
                            <CAccordionBody>

                                <CCard style={{ borderRadius: "5%" }}>
                                    <CCardBody >
                                        <CForm>

                                            <CInputGroup className="mb-4">
                                                <CInputGroupText style={{
                                                    background: 'none', border: 'none',
                                                    marginLeft: '-25px', color: 'green'
                                                }}
                                                // className={validVendorId === 1 ? 'visible1' : 'hidden1'}
                                                >
                                                    <CIcon icon={cilCheckAlt} size="xl" />
                                                </CInputGroupText>
                                                <CInputGroupText>
                                                    Categories
                                                </CInputGroupText>
                                                <CFormSelect on onChange={(e) => setCategoryId(e.target.value)}>
                                                    <option hidden>Select Category</option>
                                                    {categories && categories.map((item, index) =>
                                                        <option value={item.id} key={index} selected={categoryId === item.id}>{item.name}</option>)}
                                                </CFormSelect>
                                            </CInputGroup>
                                            {/* <p className={validVendorId !== -1 ? 'valid' : 'err'}>{vendorIdMsg}</p> */}

                                            <CInputGroup className="mb-4">
                                                <CInputGroupText style={{
                                                    background: 'none', border: 'none',
                                                    marginLeft: '-25px', color: 'green'
                                                }}
                                                // className={validVendorId === 1 ? 'visible1' : 'hidden1'}
                                                >
                                                    <CIcon icon={cilCheckAlt} size="xl" />
                                                </CInputGroupText>
                                                <CInputGroupText>
                                                    SubCategory
                                                </CInputGroupText>
                                                <CFormSelect on onChange={(e) => setSubCategoryId(e.target.value)}>
                                                    <option hidden>Select Sub Category</option>
                                                    {subCategories && subCategories.map((item, index) =>
                                                        <option value={item.id} key={index} selected={subCategoryId === item.id}>{item.name}</option>)}
                                                </CFormSelect>
                                            </CInputGroup>
                                            {/* <p className={validVendorId !== -1 ? 'valid' : 'err'}>{vendorIdMsg}</p> */}

                                            <CInputGroup className="mb-4">
                                                <CInputGroupText style={{
                                                    background: 'none', border: 'none',
                                                    marginLeft: '-25px', color: 'green'
                                                }}
                                                // className={validVendorId === 1 ? 'visible1' : 'hidden1'}
                                                >
                                                    <CIcon icon={cilCheckAlt} size="xl" />
                                                </CInputGroupText>
                                                <CInputGroupText>
                                                    Product
                                                </CInputGroupText>
                                                <CFormSelect on onChange={(e) => setProductId(e.target.value)}>
                                                    <option hidden>Select Product</option>
                                                    {products && products.map((item, index) =>
                                                        <option value={item.id} key={index} >{item.title}</option>)}
                                                </CFormSelect>
                                            </CInputGroup>
                                            {/* <p className={validVendorId !== -1 ? 'valid' : 'err'}>{vendorIdMsg}</p> */}




                                        </CForm>
                                    </CCardBody>
                                </CCard>

                            </CAccordionBody>
                        </CAccordionItem>


                        <CAccordionItem itemKey={2} className="mb-4">
                            <CAccordionHeader><div style={{ color: colEn }}>Product Details</div></CAccordionHeader>
                            <CAccordionBody>
                                <CRow>

                                    <CCard style={{ borderRadius: "5%" }}>
                                        <CCardBody >
                                            <CCardTitle>{enTitel} </CCardTitle>
                                            <CListGroup flush >
                                                <CListGroupItem><strong>Description: </strong>{enDes}</CListGroupItem>
                                                {en && en.map((item, index) => 
                                                    <CListGroupItem  key={index}><strong>{item.key}: </strong>{item.value}</CListGroupItem>
                                                )}
                                                
                                            </CListGroup>

                                        </CCardBody>

                                    </CCard>


                                </CRow>
                            </CAccordionBody>
                        </CAccordionItem>


                        <CAccordionItem itemKey={3} className="mb-4">
                            <CAccordionHeader><div style={{ color: colImg, display: 'flex' }}>
                                <div style={{ marginRight: "25px" }}> Product Images </div>
                                
                            </div></CAccordionHeader>
                            <CAccordionBody>
                                <CRow>
                                    <CCard style={{ borderRadius: "5%" }}>
                                        <CCardBody >
                                            <CRow>
                                                <ShowImage images={images}  />
                                            </CRow>
                                            
                                        </CCardBody>

                                    </CCard>
                                </CRow>
                            </CAccordionBody>
                        </CAccordionItem>

                        <CAccordionItem itemKey={4} className="mb-4">
                            <CAccordionHeader><div style={{ color: colEn }}>Store Item Details</div></CAccordionHeader>
                            <CAccordionBody>
                                <CRow>

                                    <CCard style={{ borderRadius: "5%" }}>
                                        <CCardBody >
                                            <CForm>
                                            <CInputGroup className="mb-4">
                                                <CInputGroupText style={{
                                                    background: 'none', border: 'none',
                                                    marginLeft: '-25px', color: 'green'
                                                }}
                                                    className={validPrice === 1 ? 'visible1' : 'hidden1'}>
                                                    <CIcon icon={cilCheckAlt} size="xl" />
                                                </CInputGroupText>
                                                <CInputGroupText>
                                                    Price
                                                </CInputGroupText>
                                                <CFormInput
                                                    placeholder="Price"
                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9 .]/.test(event.key)) {
                                                            event.preventDefault();
                                                        }
                                                    }}
                                                />
                                                <CInputGroupText>
                                                    <label >Euro</label>
                                                </CInputGroupText>
                                            </CInputGroup>
                                            <p className={validPrice !== -1 ? 'valid' : 'err'}>{msgPrice}</p>

                                                
                                            <CInputGroup className="mb-4">
                                                <CInputGroupText style={{
                                                    background: 'none', border: 'none',
                                                    marginLeft: '-25px', color: 'green'
                                                }}
                                                    className={validQuantity === 1 ? 'visible1' : 'hidden1'}>
                                                    <CIcon icon={cilCheckAlt} size="xl" />
                                                </CInputGroupText>
                                                <CInputGroupText>
                                                    Quantity
                                                </CInputGroupText>
                                                <CFormInput
                                                    placeholder="Quantity"
                                                    value={quantity}
                                                    onChange={(e) => setQuantity(e.target.value)}
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9 .]/.test(event.key)) {
                                                            event.preventDefault();
                                                        }
                                                    }}
                                                />                                               
                                            </CInputGroup>
                                            <p className={validQuantity !== -1 ? 'valid' : 'err'}>{msgQuantity}</p>

                                                
                                            <CInputGroup className="mb-4">
                                                <CInputGroupText style={{
                                                    background: 'none', border: 'none',
                                                    marginLeft: '-25px', color: 'green'
                                                }}
                                                    className={validDiscount === 1 ? 'visible1' : 'hidden1'}>
                                                    <CIcon icon={cilCheckAlt} size="xl" />
                                                </CInputGroupText>
                                                <CInputGroupText>
                                                    Discount
                                                </CInputGroupText>
                                                <CFormInput
                                                    placeholder="Discount"
                                                    value={discount}
                                                    onChange={(e) => setDiscount(e.target.value)}
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9 .]/.test(event.key)) {
                                                            event.preventDefault();
                                                        }
                                                    }}
                                                />
                                                <CInputGroupText>
                                                    <label >%</label>
                                                </CInputGroupText>
                                            </CInputGroup>
                                            <p className={validDiscount !== -1 ? 'valid' : 'err'}>{msgDiscount}</p>

                                                


                                            </CForm>
                                        </CCardBody>

                                    </CCard>


                                </CRow>
                            </CAccordionBody>
                        </CAccordionItem>



                    </CAccordion>
                </CCol>

                <CCol md={11} lg={9} xl={7}>

                    <div className="d-grid mt-5">
                        <CButton style={{
                            background: 'rgb(111, 152, 241)', color: "black"
                            , borderColor: "black"
                        }}
                            onClick={(e) => submit()}
                            disabled={spinner}
                        >
                            {/* <CSpinner hidden={!spinner} component="span" style={{ marginRight: '20px' }} size="sm" aria-hidden="true" /> */}
                            <CSpinner hidden={!spinner} variant="grow" component="span" style={{ marginRight: '20px' }} size="sm" aria-hidden="true" />
                            Save</CButton>
                    </div>
                </CCol>
            </CRow>
        </CContainer >

    )
}


export default AddStoreItem