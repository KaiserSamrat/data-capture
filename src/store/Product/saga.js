import { toast } from "react-toastify"
import { call, delay, put, takeEvery } from "redux-saga/effects"
import { getData, postData, addProduct, updateData } from "../../helpers/api_helper"
import { toaster } from "../../helpers/custom/toaster"

import {
    getProductSuccess,
    getProductFail,
    addProductSuccess,
    addProductFail,
    addProducStockSuccess,
    addProducStockFail,
    storeProductData,
    getFilteringProductSuccess,
    getFilteringProductFail,
    getSingleProductSuccess,
    getSingleProductFail
} from "./actions"
import {
    GET_PRODUCT,
    ADD_PRODUCT,
    ADD_PRODUCT_STOCK,
    GET_FILTERING_PRODUCT,
    GET_SINGLE_PRODUCT

    

} from "./actionTypes"

function* fetchProducts({ payload: { authtoken, brand } }) {
    try {
     
      const url = `product/get-all-product?brand=${brand}`
      const response = yield call(getData, url, authtoken )
      console.log('response', response);
      response?.product?.forEach((product,index)=>{
        product.stock = 0
        product.quantity = 0
        product.totalAmount = 0
        product.unitPrice = product?.unitPrice || 0

      })
  
      yield put(getProductSuccess(response))
      yield put(storeProductData("productList",response?.product))
    } catch (error) {
      yield put(getProductFail(error))
    }
  }

  function* fetchFilteringProducts({ payload: { authtoken, limit, pageNo, brand, category, productName } }) {
    try {
     
      const url = `product/get-all-product-paging?limit=${limit || 500}&pageNo=${pageNo|| ""}&brand=${brand || ""}&category=${category|| ""}&productName=${productName || ""}`
      const response = yield call(getData, url, authtoken )
      
      response?.totalProducts?.forEach((product,index)=>{
        product.stock = 0
        product.quantity = 0
        product.totalAmount = 0
        product.unitPrice = product?.unitPrice || 0

      })
      console.log('ffff', response);
      yield put(getFilteringProductSuccess(response))
      yield put(storeProductData("productList", response?.totalProducts))
  
    } catch (error) {
      yield put(getFilteringProductFail(error))
    }
  }
  function* fetchSingleProduct({ payload: { authtoken, id } }) {
    console.log('id',id);
    try {
  console.log('authtoken', authtoken);
      const url = `/product/${id}`
      const response = yield call(getData, url, authtoken)
  
      yield put(getSingleProductSuccess(response))
    } catch (error) {
      yield put(getSingleProductFail(error))
    }
  }

function* onAddNewProduct({ payload: { data, history, authtoken, id } }) {
  try {
    // const response = yield call(addProduct, data, authtoken)
    // console.log("hi")
    // console.log(response)
    let response
    if (id) {
      const url = `/product/${id}`
      response = yield call(updateData, url, data, authtoken)
      yield put(storeProductData('addProductLoading', false));
      toaster("success", "Product Update successfully!")
    } else {
      const url = "/product"
      response = yield call(postData, url, data, authtoken)
      yield put(storeProductData('addProductLoading', false));
      toaster("success", "Product added successfully!")
    }
    yield put(addProductSuccess(response))

    history.push("/product")
  } catch (error) {
    if (!error.response) {
      history.push("/product")
    } else {
      let message = error.response.data.message
      yield put(addProductFail(message))
      // console.log("hi",message);
      toast.error(message)
    }
  }
}

function* addProductStock({ payload: { data, history, authtoken } }) {
  
  try {
    const url = `/centralstock/central-stock-in`
    const response = yield call(postData, url, data, authtoken)

    yield put(addProducStockSuccess(response))
    yield put(storeProductData('stockLoading', false));
    toast("🦄 Product Stoke added successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    history.push("/stock-in")
  } catch (error) {
    yield put(addProducStockFail(error))
  }
}


function* ProductSaga() {
  yield takeEvery(GET_PRODUCT, fetchProducts)
  yield takeEvery(ADD_PRODUCT, onAddNewProduct)
  yield takeEvery(ADD_PRODUCT_STOCK, addProductStock)
  yield takeEvery(GET_FILTERING_PRODUCT, fetchFilteringProducts)
  yield takeEvery(GET_SINGLE_PRODUCT, fetchSingleProduct)
  
 
}

export default ProductSaga
