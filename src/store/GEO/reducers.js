import {
  GET_AREA_SUCCESS,
  GET_AREA_FAIL,
  GET_REGION_SUCCESS,
  GET_REGION_FAIL,
  GET_TERRITORY_SUCCESS,
  GET_TERRITORY_FAIL,
  GET_SINGLE_AREA_SUCCESS,
  GET_SINGLE_AREA_FAIL,
  GET_SINGLE_TERRITORY_SUCCESS,
  GET_SINGLE_TERRITORY_FAIL,
  GET_SINGLE_REGION_SUCCESS,
  GET_SINGLE_REGION_FAIL,
  ADD_AREA,
  ADD_REGION,
  ADD_TERRITORY,
  STORE_GEO_DATA,
} from "./actionTypes";
const INIT_STATE = {
  areaData: [],
  regionData: [],
  territoryData: [],
  singleArea: [],
  singleRegion: [],
  singleTerritory: [],
  areaLoading: true,
  regionLoading: true,
  territoryLoading: true,
  singleAreaLoading: true,
  singleRegionLoading: true,
  singleTerritoryLoading: true,
  addAreaLoading: false,
  addRegionLoading: false,
  addTerritoryLoading: false,
};
const GeoReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_AREA:
      return {
        ...state,
        addAreaLoading: true,
      };
    case ADD_REGION:
      return {
        ...state,
        addRegionLoading: true,
      };
    case ADD_TERRITORY:
      return {
        ...state,
        addTerritoryLoading: true,
      };
    case GET_AREA_SUCCESS:
      return {
        ...state,
        areaData: action.payload,
        areaLoading: false,
      };
    case GET_AREA_FAIL:
      return {
        ...state,
        error: action.payload,
        areaLoading: false,
      };
    case GET_SINGLE_AREA_SUCCESS:
      return {
        ...state,
        singleArea: action.payload,
        singleAreaLoading: false,
      };
    case GET_SINGLE_AREA_FAIL:
      return {
        ...state,
        error: action.payload,
        singleAreaLoading: false,
      };
    case GET_REGION_SUCCESS:
      return {
        ...state,
        regionData: action.payload,
        regionLoading: false,
      };
    case GET_REGION_FAIL:
      return {
        ...state,
        error: action.payload,
        regionLoading: false,
      };
    case GET_SINGLE_REGION_SUCCESS:
      return {
        ...state,
        singleRegion: action.payload,
        singleRegionLoading: false,
      };
    case GET_SINGLE_REGION_FAIL:
      return {
        ...state,
        error: action.payload,
        singleRegionLoading: false,
      };
    case GET_TERRITORY_SUCCESS:
      return {
        ...state,
        territoryData: action.payload,
        territoryLoading: false,
      };
    case GET_TERRITORY_FAIL:
      return {
        ...state,
        error: action.payload,
        territoryLoading: false,
      };
    case GET_SINGLE_TERRITORY_SUCCESS:
      return {
        ...state,
        singleTerritory: action.payload,
        singleTerritoryLoading: false,
      };
    case GET_SINGLE_TERRITORY_FAIL:
      return {
        ...state,
        error: action.payload,
        singleTerritoryLoading: false,
      };
    case STORE_GEO_DATA:
      return {
        ...state,
        [action.payload.name]: action.payload.data,
      };
    default:
      return state;
  }
};
export default GeoReducer;
