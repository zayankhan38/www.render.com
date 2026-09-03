import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Screens
import HomeScreen from '../screens/HomeScreen';
import ShortsScreen from '../screens/ShortsScreen';
import UploadScreen from '../screens/UploadScreen';
import StudioScreen from '../screens/StudioScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/**
 * Bottom Tab Navigation
 * Home | Shorts | Upload | Studio | Profile
 */
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Shorts') iconName = 'fire';
          else if (route.name === 'Upload') iconName = 'plus-circle';
          else if (route.name === 'Studio') iconName = 'chart-line';
          else if (route.name === 'Profile') iconName = 'account';

          return (
            <MaterialCommunityIcons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: '#dc2626',
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: {
          backgroundColor: '#1f2937',
          borderTopColor: '#374151',
          borderTopWidth: 1
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Shorts" component={ShortsScreen} />
      <Tab.Screen name="Upload" component={UploadScreen} />
      <Tab.Screen name="Studio" component={StudioScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

/**
 * Main Navigator
 */
export default function RenderNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={BottomTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}