import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../features/auth/authApi';
import authReducer from '../features/auth/authSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { budgetApi } from '../features/Budget/budgetApi';
import { expenseApi } from '../features/Expense/ExpenseApi';
import themeReducer from '../features/theme/themeSlice.js'

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['auth'],
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);


export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [budgetApi.reducerPath]: budgetApi.reducer,
    [expenseApi.reducerPath]: expenseApi.reducer,
    auth: persistedAuthReducer,
    theme: themeReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
        ignoredPaths: ['persist.purge'],
      },
    }).concat(
      authApi.middleware,
      budgetApi.middleware,
      expenseApi.middleware,
    ),
});

export const persistor = persistStore(store);
