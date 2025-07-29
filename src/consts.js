import React from 'react'
import { cilCheckAlt, cilX } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

//export const BASE_URL = 'http://localhost:8082';
export const BASE_URL = window.location.origin.replace(':3001','')+':8080';
export const BASE_Image_URL = BASE_URL+'/images/show/';


export const PAGE_SIZE = 8;

export function COLORS() { return ["#1D4ED8", "rgb(53, 1, 1)", "darkred","primary"];}


export function formatDate(string) {
    var options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(string).toLocaleDateString([], options);
}

export function formatDate2(string) {
    var options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return new Date(string).toLocaleDateString([], options);
}

export function getEnabled(enabled) {
    return (<CIcon icon={enabled?cilCheckAlt:cilX} size="xxl" 
                          className={enabled?'text-success':'text-danger'}/>)
}
