import 'react-native-gesture-handler';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Discover from './screens/discover/Discover';
import ProductScreen from './screens/product/ProductScreen';
import Search from './screens/search/Search';
import OnBoarding from './screens/on_boarding/OnBoarding';
import MyQuotations from './screens/myquotations/MyQuotations';
import NextStep from './screens/next_step/NextStep';
<<<<<<< HEAD
import SignupLogoinSlide from './screens/on_boarding/signup_login_slide/SignupLoginSlide';
=======
>>>>>>> 182911c03a8191894012fcaa2abda794631778cf
import { Provider, useDispatch, useSelector } from 'react-redux';
import { lightTheme, darkTheme } from './theme/theme';
import { useColorScheme } from 'react-native';
import { useEffect } from 'react';
import { setTheme, selectTheme } from './reducers/theme';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import Quotation_Request from './screens/quotation_request/Quotation_Request';
import Quotation_Display from './screens/Quotation_Display/Quotation_Display';
import MyDocuments from './screens/mydocuments/MyDocuments';
import MyTrips from './screens/mytrips/MyTrips';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dismountUser } from './reducers/user';
import Profile from './screens/Profile/Profile';

const Stack = createNativeStackNavigator();

function App() {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const [loadedStorage, setLoadedStorage] = useState();

  useEffect(() => {
    (async () => {
      await AsyncStorage.getAllKeys();
      setLoadedStorage(store.getState());
    })();
  }, []);

  // Un-comment this if using light and dark mode

  // Sets the theme to the operating systems theme
  //const colorScheme = useColorScheme();

  // useEffect(() => {
  //   dispatch(setTheme(colorScheme));
  // }, []);

  // Application is setup with Redux persist
  return (
    <NavigationContainer theme={theme === 'dark' ? darkTheme : lightTheme}>
      <PersistGate persistor={persistor}>
        <Stack.Navigator initialRouteName='OnBoarding' screenOptions={{ headerShown: false, gestureEnabled: false }}>
          {(store.getState()?.user?.value?.token && <></>) || <Stack.Screen name='OnBoarding' component={OnBoarding} />}
          <Stack.Screen name='Discover' component={Discover} />
          <Stack.Screen name='Search' component={Search} />
          <Stack.Screen name='Quotation_Display' component={Quotation_Display} />
          <Stack.Screen name='Product' component={ProductScreen} />
          <Stack.Screen name='MyQuotations' component={MyQuotations} />
          <Stack.Screen name='MyTrips' component={MyTrips} />
          <Stack.Screen name='Quotation_Request' component={Quotation_Request} />
          <Stack.Screen name='NextStep' component={NextStep} />
        </Stack.Navigator>
      </PersistGate>
    </NavigationContainer>
  );
} 

// Wraps the application with the Redux store Provider
// !!DONT TOUCH
export default function Index() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
