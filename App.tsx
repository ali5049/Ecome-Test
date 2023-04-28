/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import HomeScreen from './src/containers/HomeScreen';
import {SafeAreaView} from 'react-native';
import {ErrorBoundary} from './src/components';

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <ErrorBoundary>
        <HomeScreen />
      </ErrorBoundary>
    </SafeAreaView>
  );
}

export default App;
