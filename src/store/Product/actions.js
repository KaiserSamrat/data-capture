import {
    GET_PRODUCT,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAIL,
    GET_SINGLE_PRODUCT,
    GET_SINGLE_PRODUCT_SUCCESS,
    GET_SINGLE_PRODUCT_FAIL,
    GET_FILTERING_PRODUCT,
    GET_FILTERING_PRODUCT_SUCCESS,
    GET_FILTERING_PRODUCT_FAIL,
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAIL,
    ADD_PRODUCT_STOCK,
    ADD_PRODUCT_STOCK_SUCCESS,
    ADD_PRODUCT_STOCK_FAIL,
    UPDATE_PRODUCT_STOCK,
    STORE_PRODUCT_DATA
  

  } from "./actionTypes";
  
  export const getProduct = (authtoken, brand) => ({
    type: GET_PRODUCT,
    payload: { authtoken, brand },
  });
  
  export const getProductSuccess = (data) => ({
    type: GET_PRODUCT_SUCCESS,
    payload: { data },
  });
  export const getProductFail = (error) => ({
    type: GET_PRODUCT_FAIL,
    payload: error,
  });
  export const getSingleProduct = (authtoken, id) => ({
    type: GET_SINGLE_PRODUCT,
    payload: { authtoken, id },
  });
  
  export const getSingleProductSuccess = (data) => ({
    type: GET_SINGLE_PRODUCT_SUCCESS,
    payload: { data },
  });
  export const getSingleProductFail = (error) => ({
    type: GET_SINGLE_PRODUCT_FAIL,
    payload: error,
  });

  export const getFilteringProduct = (authtoken, limit, pageNo, brand, category, productName) => ({
    type: GET_FILTERING_PRODUCT,
    payload: { authtoken, limit, pageNo, brand, category, productName },
  });
  
  export const getFilteringProductSuccess = (data) => ({
    type: GET_FILTERING_PRODUCT_SUCCESS,
    payload: { data },
  });
  export const getFilteringProductFail = (error) => ({
    type: GET_FILTERING_PRODUCT_FAIL,
    payload: error,
  });

  
  
  //add 
  export const addProducStock = (data, history, authtoken) => ({
    type: ADD_PRODUCT_STOCK,
    payload: { data, history, authtoken },
  });
  
  export const addProducStockSuccess = (data) => ({
    type: ADD_PRODUCT_STOCK_SUCCESS,
    payload: data,
  });
  
  export const addProducStockFail = (error) => ({
    type: ADD_PRODUCT_STOCK_FAIL,
    payload: error,
  });
  export const addProduct = (data, history, authtoken, id) => ({
    type: ADD_PRODUCT,
    payload: { data, history, authtoken, id },
  });
  
  export const addProductSuccess = (data) => ({
    type: ADD_PRODUCT_SUCCESS,
    payload: data,
  });
  
  export const addProductFail = (error) => ({
    type: ADD_PRODUCT_FAIL,
    payload: error,
  });




  export const storeProductData = (name, data) => ({
    type: STORE_PRODUCT_DATA,
    payload: { name, data },
  })
  export const updateProductStock = (data) => ({
    type: UPDATE_PRODUCT_STOCK,
    payload: { data },
  })
  
 
  
  