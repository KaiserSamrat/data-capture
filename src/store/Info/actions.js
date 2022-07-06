import {
  GET_BRAND,
  GET_BRAND_SUCCESS,
  GET_BRAND_FAIL,
  GET_SINGLE_BRAND,
  GET_SINGLE_BRAND_SUCCESS,
  GET_SINGLE_BRAND_FAIL,
  GET_CATEGORY,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
  GET_SINGLE_CATEGORY,
  GET_SINGLE_CATEGORY_SUCCESS,
  GET_SINGLE_CATEGORY_FAIL,
  ADD_BRAND,
  ADD_BRAND_SUCCESS,
  ADD_BRAND_FAIL,
  ADD_CATEGORY,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAIL,
  ADD_PARTNER,
  ADD_PARTNER_SUCCESS,
  ADD_PARTNER_FAIL,
  GET_SINGLE_PARTNER,
  GET_SINGLE_PARTNER_SUCCESS,
  GET_SINGLE_PARTNER_FAIL,
  UPDATE_BRAND,
  UPDATE_BRAND_SUCCESS,
  UPDATE_BRAND_FAIL,
  STORE_INFO_LOADING,
  STORE_INFO_DATA

  } from "./actionTypes";
  
  export const getBrand = (authtoken, currentPage, pageRange, value) => ({
    type: GET_BRAND,
    payload: { authtoken, currentPage, pageRange, value },
  });
  
  export const getBrandSuccess = (data) => ({
    type: GET_BRAND_SUCCESS,
    payload: { data },
  });
  export const getBrandFail = (error) => ({
    type: GET_BRAND_FAIL,
    payload: error,
  });
  export const getSingleBrand = (authtoken, id) => ({
    type: GET_SINGLE_BRAND,
    payload: { authtoken, id },
  });
  
  export const getSingleBrandSuccess = (data) => ({
    type: GET_SINGLE_BRAND_SUCCESS,
    payload: { data },
  });
  export const getSingleBrandFail = (error) => ({
    type: GET_SINGLE_BRAND_FAIL,
    payload: error,
  });
  export const getCategory = (authtoken, currentPage, pageRange, value) => ({
    type: GET_CATEGORY,
    payload: { authtoken, currentPage, pageRange, value },
  });
  
  export const getCategorySuccess = (data) => ({
    type: GET_CATEGORY_SUCCESS,
    payload: data,
  });
  
  export const getCategoryFail = (error) => ({
    type: GET_CATEGORY_FAIL,
    payload: error,
  });
  export const getSingleCategory = (authtoken, id) => ({
    type: GET_SINGLE_CATEGORY,
    payload: { authtoken, id },
  });
  
  export const getSingleCategorySuccess = (data) => ({
    type: GET_SINGLE_CATEGORY_SUCCESS,
    payload: data,
  });
  
  export const getSingleCategoryFail = (error) => ({
    type: GET_SINGLE_CATEGORY_FAIL,
    payload: error,
  });


    
  export const getSinglePartner = (authtoken, id) => ({
    type: GET_SINGLE_PARTNER,
    payload: { authtoken, id },
  });
  
  export const getSinglePartnerSuccess = (data) => ({
    type: GET_SINGLE_PARTNER_SUCCESS,
    payload: { data },
  });
  export const getSinglePartnerFail = (error) => ({
    type: GET_SINGLE_PARTNER_FAIL,
    payload: error,
  });
  
  //add 

  export const addBrandData = (data, history, authtoken, id) => ({
    type: ADD_BRAND,
    payload: { data, history, authtoken, id },
  });
  
  export const addBrandDataSuccess = (data) => ({
    type: ADD_BRAND_SUCCESS,
    payload: data,
  });
  
  export const addBrandDataFail = (error) => ({
    type: ADD_BRAND_FAIL,
    payload: error,
  });

  export const addCategoryData = (data, history, authtoken, id) => ({
    type: ADD_CATEGORY,
    payload: { data, history, authtoken, id },
  });
  
  export const addCategoryDataSuccess = (data) => ({
    type: ADD_CATEGORY_SUCCESS,
    payload: data,
  });
  
  export const addCategoryDataFail = (error) => ({
    type: ADD_CATEGORY_FAIL,
    payload: error,
  });

  export const addPartner = (data, history, authtoken, id) => ({
    type: ADD_PARTNER,
    payload: { data, history, authtoken, id },
  });
  
  export const addPartnerSuccess = (data) => ({
    type: ADD_PARTNER_SUCCESS,
    payload: data,
  });
  
  export const addPartnerFail = (error) => ({
    type: ADD_PARTNER_FAIL,
    payload: error,
  });
  export const storeInfoData = (name, data, authtoken, history) => ({
    type: STORE_INFO_DATA,
    payload: { name, data, authtoken, history },
  })
  
  
 
  export const storeInfoLoading = (name, data) => ({
    type: STORE_INFO_LOADING,
    payload: { name, data },
  });
  