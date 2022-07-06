import { createStore, applyMiddleware, compose } from "redux";

import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistConfig = {
	key: "primary",
	storage,
	whitelist: ["Login"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
	persistedReducer,
	{},
	composeEnhancers(applyMiddleware(sagaMiddleware)),
);
sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };
