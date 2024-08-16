import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet } from 'react-native';
import routes from '../utils/routes';
import Home from '../screens/home.js';
import Favorites from '../screens/favorites.js';


const drawer=createDrawerNavigator()
const Drawer = () => {
    return (
        <drawer.Navigator
        screenOptions={{
            headerStyle: { backgroundColor: '#2B2B2B' }, // Header background color
            headerTintColor: 'white', // Header text color
            drawerActiveTintColor: 'white', // Color for active item text
            drawerInactiveTintColor: 'grey', // Color for inactive item text
            drawerStyle: {
                backgroundColor: '#2B2B2B', // Drawer background color
            },
        }}

        
        >
            <drawer.Screen name={routes.home} component={Home}></drawer.Screen>
            <drawer.Screen name={routes.favorites} component={Favorites}></drawer.Screen>
        
        </drawer.Navigator>
    );
}

const styles = StyleSheet.create({})

export default Drawer;
