import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "./src/screen/HomeScreen"
import { NavigationContainer } from "@react-navigation/native"
import Detail from "./src/screen/Detail"
import WatchlistScreen from "./src/screen/WatchList"
import { House, Bookmark } from "lucide-react-native"

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
          tabBarShowLabel: false,
          tabBarIconStyle: {
            marginTop: 15,
            marginRight: 50
          },
          tabBarIcon: ({ focused }) => {
            return <House color='white' />
          }
        }}
      />
      <Tab.Screen
        name="WatchList"
        component={WatchlistScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIconStyle: {
            marginTop: 15,
            marginLeft: 40
          },
          tabBarIcon: ({ focused }) => {
            return <Bookmark color='white' />
          }
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




