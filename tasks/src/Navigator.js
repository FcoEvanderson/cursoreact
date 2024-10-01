import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import TaskList from './screens/TaskList';
import Auth from './screens/Auth';
import AuthOrApp from './screens/AuthOrApp';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

import Menu from './screens/Menu';
import commonStyles from './commonStyles';

const menuConfig = {
  initialRouteName: 'Today',
  screenOptions: {
    headerShown: false, // Oculta as três barras
    swipeEnabled: true, // Habilita o gesto de arrastar
    drawerActiveTintColor: '#080',
    drawerLabelStyle: {
      fontFamily: commonStyles.fontFamily,
      fontWeight: 'normal',
      fontSize: 20,
    },
    drawerActiveLabelStyle: {
      fontWeight: 'bold',
    },
  },
};

function DrawerNavigator(props) {
  const email = props.route?.params?.email;
  const name = props.route?.params?.name;
  return (
    <Drawer.Navigator
      initialRouteName={menuConfig.initialRouteName}
      drawerContent={props => <Menu {...props} email={email} name={name}/>}
      screenOptions={menuConfig.screenOptions}>
      <Drawer.Screen name="Today" options={{ title: 'Hoje' }}>
        {props => <TaskList {...props} title='Hoje' daysAhead={0} />}
      </Drawer.Screen>
      <Drawer.Screen name="Tomorrow" options={{ title: 'Amanhã' }}>
        {props => <TaskList {...props} title='Amanhã' daysAhead={1} />}
      </Drawer.Screen>
      <Drawer.Screen name="Week" options={{ title: 'Semana' }}>
        {props => <TaskList {...props} title='Semana' daysAhead={7} />}
      </Drawer.Screen>
      <Drawer.Screen name="Month" options={{ title: 'Mês' }}>
        {props => <TaskList {...props} title='Mês' daysAhead={30} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="AuthOrApp" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AuthOrApp" component={AuthOrApp}/>
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="Home" component={DrawerNavigator} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
