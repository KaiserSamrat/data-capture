import {
    GET_TOP_BANNER_SUCCESS,
    GET_TOP_BANNER_FAIL,
    GET_GIFT_DISBURSEMENT_SUCCESS,
    GET_GIFT_DISBURSEMENT_FAIL,
    GET_DASHBOARD_CATEGORY_SUCCESS,
    GET_DASHBOARD_CATEGORY_FAIL,
    GET_DASHBOARD_BRAND_SUCCESS,
    GET_DASHBOARD_BRAND_FAIL,
    GET_DASHBOARD_PARTNER_SUCCESS,
    GET_DASHBOARD_PARTNER_FAIL,
    GET_LEAD_TIME_SUCCESS,
    GET_LEAD_TIME_FAIL,
    GET_ERROR_SUCCESS,
    GET_ERROR_FAIL,
    GET_BP_DELIVERY_SUCCESS,
    GET_BP_DELIVERY_FAIL,
    STORE_DASHBOARD_DATA
  } from "./actionTypes";
  import moment from "moment";
  const INIT_STATE = {
    topBanner: [],
    DisbursementGiftData: [],
    dashboardCategory: [],
    territoryData: [],
    brandData: [],
    partnerData: [],
    leadData: [],
    errorData: [],
    bpDelivery: [],
    startDateRange :  "All",
    endDateRange : "All",
    topBannerLoading: true,
    DisbursementGiftDataLoading: true,
    dashboardCategoryLoading: true,
    brandDataLoading: true,
    partnerDataLoading: true,
    leadDataLoading: true,
    errorLoading: true,
    bpDeliveryLoading: true
 
  };
  const DashboardReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_TOP_BANNER_SUCCESS:
        return {
          ...state,
          topBanner: action.payload,
          topBannerLoading: false,
        };
      case GET_TOP_BANNER_FAIL:
        return {
          ...state,
          error: action.payload,
          topBannerLoading: false,
        };
      case GET_GIFT_DISBURSEMENT_SUCCESS:
        return {
          ...state,
          DisbursementGiftData: action.payload,
          DisbursementGiftDataLoading: false,
        };
      case GET_GIFT_DISBURSEMENT_FAIL:
        return {
          ...state,
          error: action.payload,
          DisbursementGiftDataLoading: false,
        };
      case GET_DASHBOARD_CATEGORY_SUCCESS:
        return {
          ...state,
          dashboardCategory: action.payload,
          dashboardCategoryLoading: false,
        };
      case GET_DASHBOARD_CATEGORY_FAIL:
        return {
          ...state,
          error: action.payload,
          dashboardCategoryLoading: false,
        };
        case GET_DASHBOARD_BRAND_SUCCESS:
            return {
              ...state,
              brandData: action.payload,
              brandDataLoading: false,
            };
          case GET_DASHBOARD_BRAND_FAIL:
            return {
              ...state,
              error: action.payload,
              brandDataLoading: false,
            };

            case GET_DASHBOARD_PARTNER_SUCCESS:
                return {
                  ...state,
                  partnerData: action.payload,
                  partnerDataLoading: false,
                };
              case GET_DASHBOARD_PARTNER_FAIL:
                return {
                  ...state,
                  error: action.payload,
                  partnerDataLoading: false,
                };

                case GET_LEAD_TIME_SUCCESS:
                    return {
                      ...state,
                      leadData: action.payload,
                      leadDataLoading: false,
                    };
                  case GET_LEAD_TIME_FAIL:
                    return {
                      ...state,
                      error: action.payload,
                      leadDataLoading: false,
                    };
                    case GET_ERROR_SUCCESS:
                        return {
                          ...state,
                          errorData: action.payload,
                          errorLoading: false,
                        };
                      case GET_ERROR_FAIL:
                        return {
                          ...state,
                          error: action.payload,
                          errorLoading: false,
                        };
                        case GET_BP_DELIVERY_SUCCESS:
                          return {
                            ...state,
                            bpDelivery: action.payload,
                            bpDeliveryLoading: false,
                          };
                        case GET_BP_DELIVERY_FAIL:
                          return {
                            ...state,
                            error: action.payload,
                            bpDeliveryLoading: false,
                          };
                        case STORE_DASHBOARD_DATA:
                          return {
                            ...state,
                            [action.payload.name]: action.payload.data,
                          };

                

      default:
        return state;
    }
  };
  export default DashboardReducer;
  