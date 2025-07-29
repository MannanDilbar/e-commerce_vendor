import React, { useState,  useEffect } from 'react'
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
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
    CFormSelect,
    CCardHeader,
    CAccordion,
    CAccordionHeader,
    CAccordionBody,
    CAccordionItem,
    CFormTextarea,
    CSpinner

} from '@coreui/react'

import { COLORS } from '../../consts';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { cilCheckAlt, cilX, cilPlus } from '@coreui/icons';
import CIcon from '@coreui/icons-react'
import EnDetail from './enDetail';

import ShowImage from './image';
import { format } from 'date-fns'
const AddSuggestProduct = () => {
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [colors2] = useState(COLORS);
    const [enTitel, setEnTitel] = useState('');
    const [validEnTitel, setValidEnTitel] = useState(0);
    const [enTitelMsg, setEnTitelMsg] = useState('Please Enter Valid Title');

    const [enDes, setEnDes] = useState('');
    const [validEnDes, setValidEnDes] = useState(0);
    const [enDesMsg, setEnDesMsg] = useState('Please Enter valid Description');


    
    const [enDetailsKeyMsg] = useState('Captions can not be empty or repeated.');
    const [validenDetailsKey, setValidenDetailsKey] = useState(0);
    const [enDetailsValueMsg] = useState('Values can not be empty .');
    const [validenDetailsValue, setValidenDetailsValue] = useState(0);

    const [imgMsg] = useState('Product must have at least one image.');
    const [validImg, setValidImg] = useState(0);


    const [green] = useState('green');
    const [red] = useState('red');
    const [gray] = useState('#2c384af2');
    const [btnAdd] = useState('#321fdb');
    const [btnAddDisable] = useState('#a9a6c3');

    const [colMain, setColMain] = useState('#2c384af2');
    const [colEn, setColEn] = useState('#2c384af2');
    const [colImg, setColImg] = useState('#2c384af2');
    const [colDate, setColDate] = useState('#2c384af2');
    const [colimgbtn, setColimgbtn] = useState(btnAdd);


    const [en, setEn] = useState([]);
    const [indx, setIndx] = useState(0);

    let detail = { index: indx, key: '', value: '' }
    let clear = false;

    const [images, setImages] = useState([]);
    const [spinner, setSpinner] = useState(false);



    useEffect(() => {        
        setEn([detail]); setIndx(1);
    }, []);

   
   
    useEffect(() => {
        setColEn(gray)
        setValidEnTitel(0);
        if (enTitel && enTitel.length > 2) setValidEnTitel(1);
    }, [enTitel]);

    useEffect(() => {
        setColEn(gray)
        setValidEnDes(0);
        if (enDes && enDes.length > 4) setValidEnDes(1);
    }, [enDes]);

   

    useEffect(() => {
        setColImg(gray); setValidImg(0)
        if (images.length > 0) {
            setColImg(green); setValidImg(1)
        }
        if (images.length < 4)
            setColimgbtn(btnAdd)
        else setColimgbtn(btnAddDisable)
    }, [images]);
    
  
    useEffect(() => {
        if (clear)
            setColEn(gray);

    }, [en]);

   

    const clearData = () => {
        const next = en.filter(p => (p.key && p.key.length > 0) || (p.value && p.value.length > 0));
        setEn(next);        
        clear = false;

    }

    const validData = () => {
        let valid = true;
        clearData();
        const next = en.filter(p => (p.key && p.key.length > 0) || (p.value && p.value.length > 0));

        // review Main Data
        setColMain(green)
        setColEn(green)
        setColImg(green)
        
        
       
        // // En Details validation
        if (!enTitel || enTitel.length < 5) {
            setValidEnTitel(-1); valid = false;
            setColEn(red)
        } else setValidEnTitel(1);

        if (!enDes || enDes.length < 5) {
            setValidEnDes(-1); valid = false;
            setColEn(red)
        } else setValidEnDes(1);

        setValidenDetailsKey(1);
        if (next.length > 0) {
            // find empty key
            const next1 = en.filter(p => (!p.key || p.key.length === 0));
            if (next1 && next1.length > 0) {
                setValidenDetailsKey(-1);
                valid = false;
                setColEn(red)

            }


            // find repeated key
            en.forEach(e => {
                const next3 = en.filter(p => (p.key === e.key));
                if (next3 && next3.length > 1) {
                    setValidenDetailsKey(-1);
                    valid = false;
                    setColEn(red);
                }
            })

            // find empty value
            const next2 = en.filter(p => (!p.value || p.value.length === 0));
            if (next2 && next2.length > 0) {
                setValidenDetailsValue(-1);
                valid = false;
                setColEn(red)

            }
        }

       
        if (images.length === 0) {
            setValidImg(-1); valid = false;
            setColImg(red);
        } else
            setValidImg(1)


        return valid;
    }

    const submit = async () => {
        if (!validData()) return;
        setSpinner(true);
        let formData = getFormData();

        const response = await axios.post('/api/v1/suggest-items',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + auth?.accessToken
                },
            });

        setSpinner(false);
        MySwal.fire({
            title: <p>The new Product is Saved</p>,
            timer: 2000,
            icon: 'success',
            didOpen: () => {
            },
        }).then(() => navigate(-1))


    }
    const getFormData = () => {

        const formData = new FormData();               
        formData.append(`vendorId`, auth?.userId);
        formData.append(`title`, enTitel);
        formData.append(`description`, enDes);       

        for (let i = 0; i < en.length; i++)
            formData.append(`details[${en[i].key}]`, en[i].value);

        
        for (let i = 0; i < images.length; i++)
            formData.append(`images[${i}]`, images[i]);
        
        return formData;

    }


    return (

        <CContainer>
            <CRow className="justify-content-center ">
                <CCol md={11} lg={9} xl={7} className='mb-4' style={{ borderRadius: "50%" }}>
                    <CCard >
                        <CCardBody className='text-center'>
                            <h4 style={{ color: colors2[1] }}>Add Sugested Product</h4>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol md={11} lg={9} xl={7}>
                    <CAccordion className="mb-4 text-center " style={{ color: 'green' }}>
                       

                        <CAccordionItem itemKey={1} className="mb-4">
                            <CAccordionHeader><div style={{ color: colEn }}>Product Details</div></CAccordionHeader>
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
                                                        className={validEnTitel === 1 ? 'visible1' : 'hidden1'}>
                                                        <CIcon icon={cilCheckAlt} size="xl" />
                                                    </CInputGroupText>
                                                    <CInputGroupText>
                                                        Title
                                                    </CInputGroupText>
                                                    <CFormInput
                                                        placeholder="Title"
                                                        value={enTitel}
                                                        onChange={(e) => setEnTitel(e.target.value)}
                                                    />
                                                </CInputGroup>
                                                <p className={validEnTitel !== -1 ? 'valid' : 'err'}>{enTitelMsg}</p>

                                                <CInputGroup className="mb-4">
                                                    <CInputGroupText style={{
                                                        background: 'none', border: 'none',
                                                        marginLeft: '-25px', color: 'green'
                                                    }}
                                                        className={validEnDes === 1 ? 'visible1' : 'hidden1'}>
                                                        <CIcon icon={cilCheckAlt} size="xl" />
                                                    </CInputGroupText>
                                                    <CInputGroupText>
                                                        Description
                                                    </CInputGroupText>
                                                    <CFormTextarea
                                                        placeholder="Description"
                                                        value={enDes}
                                                        onChange={(e) => setEnDes(e.target.value)}
                                                    />

                                                </CInputGroup>
                                                <p className={validEnDes !== -1 ? 'valid' : 'err'}>{enDesMsg}</p>

                                                <EnDetail en={en} setEn={setEn} />
                                                <p className={validenDetailsKey !== -1 ? 'valid' : 'err'}>{enDetailsKeyMsg}</p>
                                                <p className={validenDetailsValue !== -1 ? 'valid' : 'err'}>{enDetailsValueMsg}</p>
                                                <CButton color='primary' style={{ borderRadius: "50%" }}
                                                    onClick={(e) => {
                                                        setIndx(indx + 1);
                                                        setEn(c => [...c, detail])
                                                    }}
                                                >
                                                    <CIcon icon={cilPlus} />

                                                </CButton>



                                            </CForm>
                                        </CCardBody>

                                    </CCard>


                                </CRow>
                            </CAccordionBody>
                        </CAccordionItem>

                       

                        <CAccordionItem itemKey={2} className="mb-4">
                            <CAccordionHeader><div style={{ color: colImg, display: 'flex' }}>
                                <div style={{ marginRight: "25px" }}>  Images </div>
                                <p style={{ margin: '0' }} className={validImg !== -1 ? 'valid' : 'err'}>{imgMsg}</p>
                            </div></CAccordionHeader>
                            <CAccordionBody>
                                <CRow>
                                    <CCard style={{ borderRadius: "5%" }}>
                                        <CCardBody >
                                            <CRow>
                                                <ShowImage images={images} setImages={setImages} />
                                            </CRow>
                                            <CForm className='mt-5'>

                                                <input type="file" id="actual-btn" hidden
                                                    disabled={images.length === 4}
                                                    onChange={(e) => {
                                                        if (e.target.files[0]) {
                                                            let x = new File([e.target.files[0]], e.target.value);
                                                            setImages(current => [...current, x]);
                                                            e.target.value = null;
                                                        }
                                                    }}
                                                />
                                                <label htmlFor="actual-btn"
                                                    style={{
                                                        borderRadius: "50%", background: colimgbtn,
                                                        height: '42px', width: '42px'
                                                    }}
                                                ><CIcon icon={cilPlus} style={{ marginTop: '12px', color: '#dad8ef' }} /></label>

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
                            background: "rgb(111, 152, 241)", color: "black"
                            , borderColor: "black"
                        }}
                            onClick={(e) => submit()}
                            disabled={spinner}
                        >
                            {/* <CSpinner hidden={!spinner} component="span" style={{marginRight:'20px'}} size="sm" aria-hidden="true" /> */}
                            <CSpinner hidden={!spinner} variant="grow" component="span" style={{ marginRight: '20px' }} size="sm" aria-hidden="true" />
                            Save</CButton>
                    </div>
                </CCol>
            </CRow>
        </CContainer>

    )
}


export default AddSuggestProduct