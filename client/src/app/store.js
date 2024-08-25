import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist'
import { authApi } from '../features/auth/authApi';
import { budgetApi } from '../features/Budget/budgetApi';
import { expenseApi } from '../features/Expense/ExpenseApi';
import userReducer from '../features/auth/authSlice'


const rootReducer = combineReducers({
  user: userReducer,
  [authApi.reducerPath]: authApi.reducer,
  [budgetApi.reducerPath]: budgetApi.reducer,
  [expenseApi.reducerPath]: expenseApi.reducer,

});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['authApi', 'budgetApi', 'expenseApi'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(
    {
      serializableCheck: false,
    }
  ).concat(
    authApi.middleware,
    budgetApi.middleware,
    expenseApi.middleware,
  )
})


export const persistor = persistStore(store)