import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: '#1a1a1a' },
          tabBarActiveTintColor: '#ff0000',
          headerStyle: { backgroundColor: '#0f0f0f' },
          headerTintColor: '#fff'
        }}
      >
        <Tab.Screen name='Home' component={() => <Text>Home</Text>} />
        <Tab.Screen name='Shorts' component={() => <Text>Shorts</Text>} />
        <Tab.Screen name='Upload' component={() => <Text>Upload</Text>} />
        <Tab.Screen name='Studio' component={() => <Text>Studio</Text>} />
        <Tab.Screen name='Profile' component={() => <Text>Profile</Text>} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}