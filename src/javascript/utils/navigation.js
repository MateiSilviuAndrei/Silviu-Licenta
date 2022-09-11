import * as React from 'react';
import {createNavigationContainerRef} from '@react-navigation/native';
import {setKeyInStorage} from './utils';

export const navigationRef = createNavigationContainerRef();

export const navigateTo = (url, props) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(url, {
      ...props,
    });
  } else {
    setKeyInStorage('navigation-queue', JSON.stringify({url, props}));
  }
};

export const resetNavigation = (index, routes) => {
  navigationRef.current?.reset({index, routes});
};
