import {
  ADD_AREA,
  ADD_AREA_FAIL,
  ADD_AREA_SUCCESS,
  ADD_REGION,
  ADD_REGION_FAIL,
  ADD_REGION_SUCCESS,
  ADD_TERRITORY,
  ADD_TERRITORY_FAIL,
  ADD_TERRITORY_SUCCESS,
  GET_AREA,
  GET_AREA_FAIL,
  GET_AREA_SUCCESS,
  GET_REGION,
  GET_REGION_FAIL,
  GET_REGION_SUCCESS,
  GET_TERRITORY,
  GET_TERRITORY_FAIL,
  GET_TERRITORY_SUCCESS,
  GET_SINGLE_AREA,
  GET_SINGLE_AREA_SUCCESS,
  GET_SINGLE_AREA_FAIL,
  GET_SINGLE_TERRITORY,
  GET_SINGLE_TERRITORY_SUCCESS,
  GET_SINGLE_TERRITORY_FAIL,
  GET_SINGLE_REGION,
  GET_SINGLE_REGION_SUCCESS,
  GET_SINGLE_REGION_FAIL,
  STORE_GEO_DATA,
} from './actionTypes';

export const getArea = (authtoken, currentPage, pageRange, region, value) => ({
  type: GET_AREA,
  payload: { authtoken, currentPage, pageRange, region, value },
});

export const getAreaSuccess = (data) => ({
  type: GET_AREA_SUCCESS,
  payload: { data },
});
export const getAreaFail = (error) => ({
  type: GET_AREA_FAIL,
  payload: error,
});


export const getSingleArea = (authtoken, id) => ({
  type: GET_SINGLE_AREA,
  payload: { authtoken, id },
});

export const getSingleAreaSuccess = (data) => ({
  type: GET_SINGLE_AREA_SUCCESS,
  payload: { data },
});
export const getSingleAreaFail = (error) => ({
  type: GET_SINGLE_AREA_FAIL,
  payload: error,
});

export const getRegion = (authtoken, currentPage, pageRange, value) => ({
  type: GET_REGION,
  payload: { authtoken, currentPage, pageRange, value },
});

export const getRegionSuccess = (data) => ({
  type: GET_REGION_SUCCESS,
  payload: data,
});

export const getRegionFail = (error) => ({
  type: GET_REGION_FAIL,
  payload: error,
});

export const getSingleRegion = (authtoken, id) => ({
  type: GET_SINGLE_REGION,
  payload: { authtoken, id },
});

export const getSingleRegionSuccess = (data) => ({
  type: GET_SINGLE_REGION_SUCCESS,
  payload: data,
});

export const getSingleRegionFail = (error) => ({
  type: GET_SINGLE_REGION_FAIL,
  payload: error,
});
export const getTerritory = (authtoken, currentPage, pageRange, area, value) => ({
  type: GET_TERRITORY,
  payload: { authtoken, currentPage, pageRange, area, value },
});

export const getTerritorySuccess = (data) => ({
  type: GET_TERRITORY_SUCCESS,
  payload: data,
});

export const getTerritoryFail = (error) => ({
  type: GET_TERRITORY_FAIL,
  payload: error,
});

export const getSingleTerritory = (authtoken, id) => ({
  type: GET_SINGLE_TERRITORY,
  payload: { authtoken, id },
});

export const getSingleTerritorySuccess = (data) => ({
  type: GET_SINGLE_TERRITORY_SUCCESS,
  payload: data,
});

export const getSingleTerritoryFail = (error) => ({
  type: GET_SINGLE_TERRITORY_FAIL,
  payload: error,
});

//add
export const addAreaData = (data, history, authtoken, id) => ({
  type: ADD_AREA,
  payload: { data, history, authtoken, id },
});

export const addAreaSuccess = (data) => ({
  type: ADD_AREA_SUCCESS,
  payload: data,
});

export const addAreaFail = (error) => ({
  type: ADD_AREA_FAIL,
  payload: error,
});

export const addRegion = (data, history, authtoken, id) => ({
  type: ADD_REGION,
  payload: { data, history, authtoken, id },
});

export const addRegionSuccess = (data) => ({
  type: ADD_REGION_SUCCESS,
  payload: data,
});

export const addRegionFail = (error) => ({
  type: ADD_REGION_FAIL,
  payload: error,
});
export const addTerritoryData = (data, history, authtoken, id) => ({
  type: ADD_TERRITORY,
  payload: { data, history, authtoken, id },
});

export const addTerritorySuccess = (data) => ({
  type: ADD_TERRITORY_SUCCESS,
  payload: data,
});

export const addTerritoryFail = (error) => ({
  type: ADD_TERRITORY_FAIL,
  payload: error,
});

export const storeGEOData = (name, data) => ({
  type: STORE_GEO_DATA,
  payload: { name, data },
});
