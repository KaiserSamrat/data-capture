import { toast } from "react-toastify"
import { getData, postData, updateData } from "../../helpers/api_helper"
import { call, put, takeEvery } from "redux-saga/effects"
import { toaster } from "../../helpers/custom/toaster"
import {
  getBrandSuccess,
  getBrandFail,
  getCategorySuccess,
  getCategoryFail,
  storeInfoData,
  getSingleBrandSuccess,
  getSingleBrandFail,
  getSingleCategorySuccess,
  getSingleCategoryFail,
  getSinglePartnerSuccess,
  getSinglePartnerFail
} from "./actions"
import {
  ADD_PARTNER,
  GET_BRAND,
  GET_CATEGORY,
  ADD_BRAND,
  ADD_CATEGORY,
  GET_SINGLE_BRAND,
  GET_SINGLE_CATEGORY,
  GET_SINGLE_PARTNER,
  STORE_INFO_DATA
  
} from "./actionTypes"

function* fetchBrand({ payload: { authtoken, currentPage, pageRange, value } }) {
  console.log('authtoken',authtoken);
  try {
 
    const url = `/brand/${pageRange}/${currentPage}?name=${value || ""}`
    const response = yield call(getData, url, authtoken)
    console.log('response', response);

    yield put(getBrandSuccess(response))

  } catch (error) {
    
    yield put(getBrandFail(error))
    console.log('errr', error);
  }
}
function* fetchSingleBrand({ payload: { authtoken, id } }) {
  console.log('authtoken',authtoken);
  try {
 
    const url = `/brand/${id}`
    const response = yield call(getData, url, authtoken)
    console.log('response', response);

    yield put(getSingleBrandSuccess(response))

  } catch (error) {
    
    yield put(getSingleBrandFail(error))
    console.log('errr', error);
  }
}
function* fetchCategory({ payload: { authtoken, currentPage, pageRange, value} }) {
    try {

      const url = `/category/${pageRange}/${currentPage}?name=${value || ""}`
      const response = yield call(getData, url, authtoken)
  
      yield put(getCategorySuccess(response))
    } catch (error) {
      yield put(getCategoryFail(error))
    }
  }
  function* fetchSingleCategory({ payload: { authtoken, id} }) {
    try {

      const url = `/category/${id}`
      const response = yield call(getData, url, authtoken)
  
      yield put(getSingleCategorySuccess(response))
    } catch (error) {
      yield put(getSingleCategoryFail(error))
    }
  }

  function* fetchSinglePartner({ payload: { authtoken, id } }) {
    try {
   
      const url = `/partner/${id}`
      const response = yield call(getData, url, authtoken)
      console.log('response', response);
  
      yield put(getSinglePartnerSuccess(response))
  
    } catch (error) {
      
      yield put(getSinglePartnerFail(error))
      console.log('errr', error);
    }
  }
  function* addBrandData({  payload: { data, history, authtoken, id }, }) {
    try {
      let response
      if (id) {
        const url = `/brand/${id}`
        response = yield call(updateData, url, data, authtoken)
         yield put(storeInfoData("addBrandLoading", false))
        toaster("success", "brand Update successfully!")
      } else {
        const url = "/brand"
        response = yield call(postData, url, data, authtoken)
         yield put(storeInfoData("addBrandLoading", false))
        toaster("success", "brand added successfully!")
      }
      yield put(storeInfoData("brandData", response))
      yield put(storeInfoData("brandDataLoading", false))
 
      history.push('/brand')
    } catch (error) {
      console.log(error.response)
      toast(error?.response?.data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  function* addCategoryData({ payload: { data, history, authtoken, id } }) {
    try {
      let response
      if (id) {
        const url = `/category/${id}`
        response = yield call(updateData, url, data, authtoken)
        yield put(storeInfoData("addCategoryLoading", false))
        toaster("success", "category Update successfully!")
      } else {
        const url = "/category"
        response = yield call(postData, url, data, authtoken)
        yield put(storeInfoData("addCategoryLoading", false))
        toaster("success", "category added successfully!")
      }
      yield put(storeInfoData("categoryData", response))
      yield put(storeInfoData("categoryDataLoading", false))
  
      history.push('/category')
    } catch (error) {
      console.log(error.response)
      toast(error?.response?.data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  function* addPartnerData({ payload: { data, history, authtoken, id } }) {
    try {
      let response
      if (id) {
        const url = `/partner/${id}`
        response = yield call(updateData, url, data, authtoken)
        yield put(storeInfoData("addPartnerLoading", false))
        toaster("success", "Partner Update successfully!")
      } else {
        const url = "/partner"
        response = yield call(postData, url, data, authtoken)
        yield put(storeInfoData("addPartnerLoading", false))
        toaster("success", "Partner added successfully!")
      }
      yield put(storeInfoData("partnerData", response))
      yield put(storeInfoData("partnerDataLoading", false))
      history.push('/partner')
    } catch (error) {
      console.log(error.response)
      toast(error?.response?.data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }


  

function* InfoSaga() {
    yield takeEvery(ADD_BRAND, addBrandData )
    yield takeEvery(ADD_CATEGORY, addCategoryData )
    yield takeEvery(GET_BRAND, fetchBrand)
    yield takeEvery(GET_CATEGORY, fetchCategory)
    yield takeEvery(ADD_PARTNER, addPartnerData)
    yield takeEvery(GET_SINGLE_BRAND, fetchSingleBrand)
    yield takeEvery(GET_SINGLE_CATEGORY, fetchSingleCategory)
    yield takeEvery(GET_SINGLE_PARTNER, fetchSinglePartner)


 
 
  }
  
  export default InfoSaga