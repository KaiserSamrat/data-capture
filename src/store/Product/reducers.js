import {
    ADD_PRODUCT_FAIL,
    ADD_PRODUCT_SUCCESS,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAIL,
    GET_SINGLE_PRODUCT_SUCCESS,
    GET_SINGLE_PRODUCT_FAIL,
    GET_FILTERING_PRODUCT_SUCCESS,
    GET_FILTERING_PRODUCT_FAIL,
    ADD_PRODUCT_STOCK,
    STORE_PRODUCT_DATA,
    ADD_PRODUCT

  } from './actionTypes'
  const INIT_STATE = {
    products: [],
    productList: [],
    challanListStock: [],
    filteredProduct: [],
    singleProduct: [],
    error: {},
    loading: true,
    isLoading: false,
    testLoading:true,
    productLoading:true,
    offerLoading:true,
    totalAmountLoading: true,
    filteredProductLoading: true,
    singleProductLoading:true,
    stockLoading: false,
    addProductLoading : false
  
  }
  
  
  const ProductReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
 
      case ADD_PRODUCT_SUCCESS:
        return {
          ...state,
          products: [...state.products, action.payload],
          testLoading: false,
  
  
        }
      case ADD_PRODUCT_FAIL:
        return {
          ...state,
          error: action.payload,
          isLoading: false,
          testLoading: true,
  
        }
        case ADD_PRODUCT_STOCK:
          return {
            ...state,
            stockLoading: true,
          };
          case ADD_PRODUCT:
            return {
              ...state,
              addProductLoading: true,
            };
        case GET_PRODUCT_SUCCESS:
          return {
            ...state,
            products: action.payload,
            productLoading: false,
          
          }
        case GET_PRODUCT_FAIL:
          return {
            ...state,
    
            error: action.payload,
            productLoading: false,
    
          }
          case GET_SINGLE_PRODUCT_SUCCESS:
            return {
              ...state,
              singleProduct: action.payload,
              singleProductLoading: false,
            
            }
          case GET_SINGLE_PRODUCT_FAIL:
            return {
              ...state,
      
              error: action.payload,
              singleProductLoading: false,
      
            }

          case GET_FILTERING_PRODUCT_SUCCESS:
            return {
              ...state,
              filteredProduct: action.payload,
              filteredProductLoading: false,
            
            }
          case GET_FILTERING_PRODUCT_FAIL:
            return {
              ...state,
      
              error: action.payload,
              filteredProductLoading: false,
      
            }
          case STORE_PRODUCT_DATA:
            return {
              ...state,
              [action.payload.name]: action.payload.data,
           
            
            }

    
      default:
        return state
    }
  }
  
  export default ProductReducer