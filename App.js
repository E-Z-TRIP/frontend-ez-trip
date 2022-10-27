import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Discover from './screens/discover/Discover';
// import FicheProduit from './screens/product/FicheProduit';
import Search from './screens/search/Search';
import OnBoarding from './screens/on_boarding/OnBoarding';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { lightTheme, darkTheme } from './theme/theme';
import { useColorScheme } from 'react-native';
import { useEffect } from 'react';
import { setTheme, selectTheme } from './reducers/theme';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import Quotation_Request from './screens/quotation_request/Quotation_Request';
import Prout from './screens/quotation_request/Prout';

const Stack = createNativeStackNavigator();

function App() {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

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
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name='FicheProduit' component={FicheProduit}/> */}
          {/* <Stack.Screen name='OnBoarding' component={OnBoarding} /> */}
          <Stack.Screen name='Discover' component={Discover} />
          <Stack.Screen name='Quotation_Request' component={Quotation_Request} />
          <Stack.Screen name="Search" component={Search} />
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
