import {
    GET_TOP_BANNER,
    GET_TOP_BANNER_SUCCESS,
    GET_TOP_BANNER_FAIL,
    GET_GIFT_DISBURSEMENT,
    GET_GIFT_DISBURSEMENT_SUCCESS,
    GET_GIFT_DISBURSEMENT_FAIL,
    GET_DASHBOARD_CATEGORY,
    GET_DASHBOARD_CATEGORY_SUCCESS,
    GET_DASHBOARD_CATEGORY_FAIL,
    GET_DASHBOARD_BRAND,
    GET_DASHBOARD_BRAND_SUCCESS,
    GET_DASHBOARD_BRAND_FAIL,
    GET_DASHBOARD_PARTNER,
    GET_DASHBOARD_PARTNER_SUCCESS,
    GET_DASHBOARD_PARTNER_FAIL,
    GET_LEAD_TIME,
    GET_LEAD_TIME_SUCCESS,
    GET_LEAD_TIME_FAIL,
    GET_ERROR,
    GET_ERROR_SUCCESS,
    GET_ERROR_FAIL,
    GET_BP_DELIVERY,
    GET_BP_DELIVERY_SUCCESS,
    GET_BP_DELIVERY_FAIL,
    STORE_DASHBOARD_DATA

    

  } from "./actionTypes";
  
  export const getTopBanner = (authtoken, fromDate, toDate) => ({
    type: GET_TOP_BANNER,
    payload: { authtoken, fromDate, toDate},
  });
  
  export const getTopBannerSuccess = (data) => ({
    type: GET_TOP_BANNER_SUCCESS,
    payload: { data },
  });
  export const getTopBannerFail = (error) => ({
    type: GET_TOP_BANNER_FAIL,
    payload: error,
  });
  export const getGiftDisbursement = (authtoken, fromDate, toDate) => ({
    type: GET_GIFT_DISBURSEMENT,
    payload: { authtoken, fromDate, toDate},
  });
  
  export const getGiftDisbursementSuccess = (data) => ({
    type: GET_GIFT_DISBURSEMENT_SUCCESS,
    payload: { data },
  });
  export const getGiftDisbursementFail = (error) => ({
    type: GET_GIFT_DISBURSEMENT_FAIL,
    payload: error,
  });

  export const getBpDelivery = (authtoken, fromDate, toDate) => ({
    type: GET_BP_DELIVERY,
    payload: { authtoken, fromDate, toDate},
  });
  
  export const getBpDeliverySuccess = (data) => ({
    type: GET_BP_DELIVERY_SUCCESS,
    payload: { data },
  });
  export const getBpDeliveryFail = (error) => ({
    type: GET_BP_DELIVERY_FAIL,
    payload: error,
  });

  export const getDashboardCategory = (authtoken, fromDate, toDate) => ({
    type: GET_DASHBOARD_CATEGORY,
    payload: {  authtoken, fromDate, toDate},
  });
  
  export const getDashboardCategorySuccess = (data) => ({
    type: GET_DASHBOARD_CATEGORY_SUCCESS,
    payload: { data },
  });

  export const getDashboardCategoryFail = (error) => ({
    type: GET_DASHBOARD_CATEGORY_FAIL,
    payload: error,
  });

  export const getDashboardBrand = ( authtoken, fromDate, toDate) => ({
    type: GET_DASHBOARD_BRAND,
    payload: {  authtoken, fromDate, toDate},
  });
  
  export const getDashboardBrandSuccess = (data) => ({
    type: GET_DASHBOARD_BRAND_SUCCESS,
    payload: { data },
  });
  
  export const getDashboardBrandFail = (error) => ({
    type: GET_DASHBOARD_BRAND_FAIL,
    payload: error,
  });

  export const getDashboardPartner = ( authtoken, fromDate, toDate) => ({
    type: GET_DASHBOARD_PARTNER,
    payload: {  authtoken, fromDate, toDate},
  });
  
  export const getDashboardPartnerSuccess = (data) => ({
    type: GET_DASHBOARD_PARTNER_SUCCESS,
    payload: { data },
  });
  export const getDashboardPartnerFail = (error) => ({
    type: GET_DASHBOARD_PARTNER_FAIL,
    payload: error,
  });

  
  export const getLead = ( authtoken, fromDate, toDate) => ({
    type: GET_LEAD_TIME,
    payload: {  authtoken, fromDate, toDate},
  });
  
  export const getLeadSuccess = (data) => ({
    type: GET_LEAD_TIME_SUCCESS,
    payload: { data },
  });

  export const getLeadFail = (error) => ({
    type: GET_LEAD_TIME_FAIL,
    payload: error,
  });

  
  export const getError = ( authtoken, fromDate, toDate) => ({
    type: GET_ERROR,
    payload: {  authtoken, fromDate, toDate},
  });
  
  export const getErrorSuccess = (data) => ({
    type: GET_ERROR_SUCCESS,
    payload: { data },
  });

  export const getErrorFail = (error) => ({
    type: GET_ERROR_FAIL,
    payload: error,
  });

  export const storeDashboardData = (name, data) => ({
    type: STORE_DASHBOARD_DATA,
    payload: { name, data },
  });