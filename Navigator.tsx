import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "./src/screen/HomeScreen"
import { NavigationContainer } from "@react-navigation/native"
import Detail from "./src/screen/Detail"

const Tab = createBottomTabNavigator()

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#042541',
          paddingVertical: 16,
          paddingHorizontal: 8
        }
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false
        }}
      />
      <Tab.Screen
        name="Person"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false
        }}
      />
    </Tab.Navigator>
  )
}

const Stack = createNativeStackNavigator()

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{
            headerShown: false
          }}></Stack.Screen>
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default Navigation




