/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {NativeBaseProvider} from 'native-base';
import React from 'react';
import {Provider} from 'react-redux';

import RootNavigator from './src/javascript/components/navigators/RootNavigator';
import store from './src/javascript/store';

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <RootNavigator />
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
