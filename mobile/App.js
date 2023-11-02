import 'react-native-gesture-handler';
import React from 'react';

import { Provider } from 'react-redux';
import store from './src/store/store'

import Navigator from './src/navigation/Navigator';
import { setupInterceptors } from './src/services/apiConfig';
import { ToastProvider } from "./src/components/toast/useToast.js";

setupInterceptors();

export default function App() {
  return (
    <Provider store={store}>
      <ToastProvider>
        <Navigator />
      </ToastProvider>
    </Provider>
  );
}
