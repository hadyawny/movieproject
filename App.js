import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import Drawer from './navigation/drawer.js';
import { Provider } from 'react-redux';
import store from './redux/store.js';

export default function App() {
  return (
    <Provider store={store}>

    <NavigationContainer>
      <Drawer></Drawer>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});
