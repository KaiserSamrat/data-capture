import { getData, postData, updateData } from "../../helpers/api_helper"
import { call, put, takeEvery } from "redux-saga/effects"
import { toast } from "react-toastify"
import { toaster } from "../../helpers/custom/toaster"

import {
    getAreaSuccess,
    getAreaFail,
    getRegionSuccess,
    getRegionFail,
    getTerritorySuccess,
    getTerritoryFail,
    addAreaSuccess,
    addAreaFail,
    addRegionSuccess,
    addRegionFail,
    addTerritorySuccess,
    addTerritoryFail,
    getSingleTerritorySuccess,
    getSingleTerritoryFail,
    getSingleRegionSuccess,
    getSingleRegionFail,
    getSingleAreaSuccess,
    getSingleAreaFail,
    storeGEOData
} from "./actions.js"
import {
    GET_AREA,
    GET_REGION,
    GET_TERRITORY,
    ADD_AREA,
    ADD_REGION,
    ADD_TERRITORY,
    GET_SINGLE_AREA,
    GET_SINGLE_REGION,
    GET_SINGLE_TERRITORY
} from "./actionTypes"

function* fetchArea({ payload: { authtoken, currentPage, pageRange, region, value} }) {
  try {
    // console.log(role)
    // const newQuery = `?${query}`
    const url = `/area/${region}/${pageRange}/${currentPage}?name=${value || ""}`
    const response = yield call(getData, url, authtoken)

    yield put(getAreaSuccess(response))
  } catch (error) {
    yield put(getAreaFail(error))
  }
}
function* fetchSingleArea({ payload: { authtoken, id} }) {
  try {
    const url = `/area/${id}`
    const response = yield call(getData, url, authtoken)

    yield put(getSingleAreaSuccess(response))
  } catch (error) {
    yield put(getSingleAreaFail(error))
  }
}
function* fetchRegion({ payload: { authtoken, currentPage, pageRange, value} }) {
    try {
      const url = `/region/${pageRange}/${currentPage}?name=${value || ""}`
      const response = yield call(getData, url, authtoken, pageRange, currentPage)
  
      yield put(getRegionSuccess(response))
    } catch (error) {
      yield put(getRegionFail(error))
    }
  }

  function* fetchSingleRegion({ payload: { authtoken, id} }) {
    try {
      // console.log(role)
      // const newQuery = `?${query}`
      const url = `/region/${id}`
      const response = yield call(getData, url, authtoken)
  
      yield put(getSingleRegionSuccess(response))
    } catch (error) {
      yield put(getSingleRegionFail(error))
    }
  }
  function* fetchTerritory({ payload: { authtoken, currentPage, pageRange, area, value} }) {
    try {
      // console.log(role)
      // const newQuery = `?${query}`
      const url = `/territory/${area}/${pageRange}/${currentPage}?name=${value || ""}`
      const response = yield call(getData, url, authtoken, pageRange, currentPage)
  
      yield put(getTerritorySuccess(response))
    } catch (error) {
      yield put(getTerritoryFail(error))
    }
  }
  function* fetchSingleTerritory({ payload: { authtoken, id} }) {
    try {
      // console.log(role)
      // const newQuery = `?${query}`
      const url = `/territory/${id}`
      const response = yield call(getData, url, authtoken)
  
      yield put(getSingleTerritorySuccess(response))
    } catch (error) {
      yield put(getSingleTerritoryFail(error))
    }
  }


  function* addAreaData({ payload: { data, history, authtoken, id } }) {
    try {
      let response
      if (id) {
        const url = `/area/${id}`
        response = yield call(updateData, url, data, authtoken)
        yield put(storeGEOData("addAreaLoading", false))
        toaster("success", "Area Update successfully!")
      } else {
        const url = "/area"
        response = yield call(postData, url, data, authtoken)
        yield put(storeGEOData("addAreaLoading", false))
        toaster("success", "Area added successfully!")
      }
      yield put(storeGEOData("areaData", response))
     

      history.push("/area")
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

  function* addRegionData({ payload: { data, history, authtoken, id } }) {
    try {
      let response
      if (id) {
        const url = `/region/${id}`
        response = yield call(updateData, url, data, authtoken)
        yield put(storeGEOData("addRegionLoading", false))
        toaster("success", "Region Update successfully!")
      } else {
        const url = "/region"
        response = yield call(postData, url, data, authtoken)
        yield put(storeGEOData("addRegionLoading", false))
        toaster("success", "Region added successfully!")
      }
      yield put(storeGEOData("regionData", response))
     
  
      history.push("/region")
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

  function* addTerritoryData({ payload: { data, history, authtoken, id } }) {
    try {
      let response
      if (id) {
        const url = `/territory/${id}`
        response = yield call(updateData, url, data, authtoken)
        yield put(storeGEOData("addTerritoryLoading", false))
        toaster("success", "territory Update successfully!")
      } else {
        const url = "/territory"
        response = yield call(postData, url, data, authtoken)
        yield put(storeGEOData("addTerritoryLoading", false))
        toaster("success", "territory added successfully!")
      }
      yield put(storeGEOData("territoryData", response))
  
 
      history.push("/territory")
      
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
  
  

function* GEOSaga() {
    yield takeEvery(GET_AREA, fetchArea)
    yield takeEvery(GET_REGION, fetchRegion)
    yield takeEvery(GET_TERRITORY, fetchTerritory)
    yield takeEvery(ADD_AREA, addAreaData)
    yield takeEvery(ADD_REGION, addRegionData) 
    yield takeEvery(ADD_TERRITORY, addTerritoryData)
    yield takeEvery(GET_SINGLE_AREA, fetchSingleArea)
    yield takeEvery(GET_SINGLE_REGION, fetchSingleRegion)
    yield takeEvery(GET_SINGLE_TERRITORY, fetchSingleTerritory)
 
 
  }
  
  export default GEOSaga