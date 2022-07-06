import {
  ADD_BRAND,
  ADD_CATEGORY,
  GET_BRAND_SUCCESS,
  GET_BRAND_FAIL,
  GET_SINGLE_BRAND_SUCCESS,
  GET_SINGLE_BRAND_FAIL,
  GET_SINGLE_CATEGORY_SUCCESS,
  GET_SINGLE_CATEGORY_FAIL,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
  GET_SINGLE_PARTNER_SUCCESS,
  GET_SINGLE_PARTNER_FAIL,
  ADD_PARTNER,
  STORE_INFO_DATA
  } from "./actionTypes";
  const INIT_STATE = {
    brandData: [],
    categoryData: [],
    singleBrand: [],
    singleCategory: [],
    singlePartner: [],
    addBrandLoading: false,
    addCategoryLoading: false,
    addPartnerLoading: false,
    brandLoading: true,
    categoryLoading: true,
    singleCategoryLoading: true,
    singleBrandLoading: true,
    singlePartnerLoading: true
    
 
  };
  const InfoReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
      case ADD_BRAND:
        return {
          ...state,
          addBrandLoading: true,
        };
        case ADD_CATEGORY:
          return {
            ...state,
            addCategoryLoading: true,
          };
          case ADD_PARTNER:
            return {
              ...state,
              addPartnerLoading: true,
            };
      case GET_BRAND_SUCCESS:
        return {
          ...state,
          brandData: action.payload,
          brandLoading: false,
        };
      case GET_BRAND_FAIL:
        return {
          ...state,
          error: action.payload,
          brandLoading: false,
        };
        case GET_SINGLE_BRAND_SUCCESS:
          return {
            ...state,
            singleBrand: action.payload.data,
            singleBrandLoading: false,
          };
        case GET_SINGLE_BRAND_FAIL:
          return {
            ...state,
            error: action.payload.data,
            singleBrandLoading: false,
          };
      case GET_CATEGORY_SUCCESS:
        return {
          ...state,
          categoryData: action.payload,
          categoryLoading: false,
        };
      case GET_CATEGORY_FAIL:
        return {
          ...state,
          error: action.payload,
          categoryLoading: false,
        };
        case GET_SINGLE_CATEGORY_SUCCESS:
          return {
            ...state,
            singleCategory: action.payload,
            singleCategoryLoading: false,
          };
        case GET_SINGLE_CATEGORY_FAIL:
          return {
            ...state,
            error: action.payload,
            singleCategoryLoading: false,
          };
      
          case GET_SINGLE_PARTNER_SUCCESS:
            return {
              ...state,
              singlePartner: action.payload,
              singlePartnerLoading: false,
            };
          case GET_SINGLE_PARTNER_FAIL:
            return {
              ...state,
              error: action.payload,
              singlePartnerLoading: false,
            };
        case STORE_INFO_DATA:
            return {
              ...state,
              [action.payload.name]: action.payload.data,
            }
      default:
        return state;
    }
  };
  export default InfoReducer;
  