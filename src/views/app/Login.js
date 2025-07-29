import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from './../../axios';
import './login0.css';
import useAuth from '../../hooks/useAuth';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const Login = () => {

  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const usernameRef = useRef();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validName, setValidName] = useState(false);
  const [validPass, setValidPass] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const showPass = () => {
    setShowPassword(!showPassword);
  }
  useEffect(() => { usernameRef.current.focus(); }, []);
  useEffect(() => {
    setValidName(true);
    const mailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if ((mailRegx.test(username))) setValidName(true);
  }, [username]);
  useEffect(() => {
    setValidPass(false);
    if (password && password.length >= 2)
      setValidPass(true);
  }, [password]);
  const roles = ['2001'];
  const submit = async () => {
    setError(false);
    try {
      const response = await axios.post('/api/v1/auth/login',
        JSON.stringify({ email: username , password }),
        {
          headers: { 'Content-Type': 'application/json',
            "Accept-Language": "en-US,en;"
        },
        }
      )      
      const accessToken = response?.data.token;      
      if (accessToken) {       
        setAuth({ username, password, roles, accessToken });
        navigate('/products');
      }
      else {
        setError(true);
        setErrMsg(response?.data.msg);
      }
    } catch (err) {
      setError(true);
      setErrMsg('Sorry There Is an Server Error !');
    }
  }

  return (

    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        
        <CRow className="justify-content-center">
          <CCol md={8} lg={7} xl={5}>
            <CCardGroup>
              <CCard className="p-4" style={{ borderRadius: "15%" }}>
                <CCardBody>
                  <CForm>
                    <h1>Sign in</h1>                   
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        ref={usernameRef}
                        placeholder="Username"
                        autoComplete="username"
                        aria-describedby="basic-addon2"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                     
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type={showPassword ? 'text' : "password"}
                        placeholder="Password"
                        autoComplete='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ borderRight: 'none' }}
                      />
                      <CInputGroupText style={{ background: 'none' }}
                        onClick={() => showPass()}>
                        <i onClick={() => showPass()}>
                          {<FontAwesomeIcon
                            icon={showPassword ? faEye : faEyeSlash} />}</i>{" "}
                      </CInputGroupText>
                    </CInputGroup>
                    <p className={!error ? 'valid' : 'err'}>{errMsg}</p>

                    <CRow>
                      <CCol xs={12} className="text-center">
                        <CButton style={{
                          background: "rgb(111, 152, 241)",
                          color: "black", borderColor: "black"
                        }} className="px-4"
                          disabled={!validName || !validPass}
                          onClick={() => { submit() }}
                        >
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>

            </CCardGroup>
          </CCol>
        </CRow>
      
      </CContainer>
    </div>
  )
}

export default Login
