import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList, MenuItem } from '../types';

import HomeScreen from '../screens/HomeScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import ManageMenuScreen from '../screens/ManageMenuScreen';
import FilterScreen from '../screens/FilterScreen'; // ADD THIS IMPORT

const Stack = createNativeStackNavigator<RootStackParamList>();

// Initial sample data to populate the app (provides immediate content on first load)
const initialMenuItems: MenuItem[] = [
  {
    id: '1',
    dishName: 'Feta-Biltong Bites',
    course: 'Starter',
    description: 'Kalahari biltong smothered in molten feta cheese served with a peri-peri dip',
    price: '67.67',
  },
  {
    id: '2',
    dishName: '1 kg T-Bone Steak',
    course: 'Main',
    description: 'Beef Wagu cooked to pink perfection with a side of veggies and chips',
    price: '420.00',
  },
  {
    id: '3',
    dishName: 'Chocolate Lava Cake',
    course: 'Dessert',
    description: 'Warm cake with a molten center served with vanilla ice cream and a drizzle of chocolate syrup',
    price: '169.99',
  },
];

// main AppNavigation component that sets up navigation and manages global menu items state
export default function AppNavigation() {
  // global state for menu items (manage the recipe list across all screens)
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);

  return (
    // Navigation container wrapping the entire app navigation structure
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home" // start at Home screen
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* HomeScreen displays the recipe list and overview  */}
        <Stack.Screen name="Home">
          {(props) => (
            <HomeScreen
              {...props}
              menuItems={menuItems}
            />
          )}
        </Stack.Screen>

        {/* ManageMenuScreen for adding and removing recipes */}
        <Stack.Screen name="ManageMenu">
          {(props) => (
            <ManageMenuScreen
              {...props}
              menuItems={menuItems}
              setMenuItems={setMenuItems}
            />
          )}
        </Stack.Screen>

        {/* FilterScreen for filtering recipes by course */}
        <Stack.Screen name="FilterRecipes">
          {(props) => (
            <FilterScreen
              {...props}
              menuItems={menuItems}
            />
          )}
        </Stack.Screen>

        {/* RecipeDetailScreen shows detailed info about a selected recipe */}
        <Stack.Screen 
          name="RecipeDetail" 
          component={RecipeDetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}