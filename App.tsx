import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import './global.css';

import SplashScreen from './src/screens/SplashScreen';
import WizardScreen2 from './src/screens/WizardScreen2';
import DetailsScreen from './src/screens/DetailsScreen';
import ShowcaseScreen from './src/screens/ShowcaseScreen';

import { RootStackParamList } from './src/types';
import { LanguageProvider } from './src/LanguageContext';
import { FormProvider } from './src/FormContext'; 
import HomeScreen from './src/screens/HomeScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
   return (
      <LanguageProvider>
         <FormProvider>
            <NavigationContainer>
               <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="Splash" component={SplashScreen} />

                  <Stack.Screen
                     name="WizardRoute"
                     component={WizardScreen2}
                  />

                  <Stack.Screen name="Details" component={DetailsScreen} />
                  <Stack.Screen name="Showcase" component={ShowcaseScreen} />
                  <Stack.Screen name="Home" component={HomeScreen} />
               </Stack.Navigator>
            </NavigationContainer>
         </FormProvider>
      </LanguageProvider>
   );
}