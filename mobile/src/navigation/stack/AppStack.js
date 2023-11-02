import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';

import Home from '../../screens/Home';
import About from '../../screens/About';
import { red, slate } from '../../style/color';


const Drawer = createDrawerNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  header: {
    paddingVertical: 16,
    marginBottom: 16,
    borderBottomColor: '#e8e8e8',
    borderBottomWidth: 1,
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 700,
    color: slate[700]
  },
  logoutBtn: {
    backgroundColor: red[500],
    marginBottom: 8,
  },
});

const CustomDrawerContent = ({ progress, ...rest }) => {
  const handleLogout = () => {
    console.log('Logout pressed');
  };

  return (
    <View {...rest} style={styles.container}>
      <View>
        <View style={styles.header}>
          <Text style={styles.headerText}>Login App</Text>
        </View>
        <DrawerItemList {...rest} />
      </View>

      <DrawerItem label={() => (
        <Text style={{ color: "#fff", fontWeight: 600, marginLeft: -16 }}>
          Logout
        </Text>
      )}
        icon={({ color, size }) => (
          <AntDesign name="logout" size={24} color={"#fff"} />
        )}
        onPress={handleLogout} style={styles.logoutBtn} />
    </View>
  );
};

export const AppStack = () => (
  <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />} screenOptions={{
    drawerStyle: {
      width: 240,
    },
    drawerActiveTintColor: slate[700],
    headerTintColor: slate[700],
    headerTitleStyle: {
      color: slate[700]
    },
  }}
  >
    <Drawer.Screen
      name="Home"

      component={Home}
      options={{
        drawerIcon: ({ color, size }) => (
          <AntDesign name="home" size={24} color={color} />
        ),
        drawerLabelStyle: {
          marginLeft: -16
        },
      }}
    />
    <Drawer.Screen
      name="About"
      component={About}
      options={{
        drawerIcon: ({ color, size }) => (
          <AntDesign name="info" size={24} color={color} />
        ),
        drawerLabelStyle: {
          marginLeft: -16
        },
      }}
    />
  </Drawer.Navigator>
);
