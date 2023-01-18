/* eslint-disable no-shadow */
import React from 'react';
import {DeviceEventEmitter} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Statistics} from '../screens';
import {TabIcon, Add} from '../components';
import {colors, strings, images, perfectSize} from '../theme';
import {hidden_bottom} from './config';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import DashboardStack from './DashboardStack';
import TransactionStack from './TransactionStack';

const Tab = createBottomTabNavigator();

export default function HomeStack() {
  const getTabBarVisibility = route => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (hidden_bottom.includes(routeName)) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <Tab.Navigator
      tabBarOptions={{
        showIcon: true,
        showLabel: false,
        lazyLoad: true,
        safeAreaInsets: {
          bottom: perfectSize(0),
        },
        style: {
          backgroundColor: colors.tabBarBackgroundColor,
          height: perfectSize(80),
          borderTopColor: 'rgba(255,255,255,0.1)',
        },
      }}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardStack}
        options={({route}) => ({
          tabBarIcon: props => (
            <TabIcon
              source={images.homeTab}
              name={strings.tabBarLabels.home}
              {...props}
            />
          ),
          tabBarVisible: getTabBarVisibility(route),
        })}
      />
      {/* <Tab.Screen
        name="Plan"
        component={DashboardStack}
        options={({route}) => ({
          tabBarIcon: props => (
            <TabIcon
              source={images.homeTab}
              name={strings.tabBarLabels.plan}
              {...props}
            />
          ),
          tabBarVisible: getTabBarVisibility(route),
        })}
      /> */}
      <Tab.Screen
        name="Add"
        component={TransactionStack}
        options={props => ({
          tabBarIcon: props => <Add {...props} />,
          tabBarVisible: false,
        })}
      />
      {/* <Tab.Screen
        name="Goal"
        component={DashboardStack}
        options={({route}) => ({
          tabBarIcon: props => (
            <TabIcon
              source={images.homeTab}
              name={strings.tabBarLabels.goal}
              {...props}
            />
          ),
          tabBarVisible: getTabBarVisibility(route),
        })}
      /> */}
      <Tab.Screen
        name="Stat"
        component={Statistics}
        options={{
          tabBarIcon: props => (
            <TabIcon
              source={images.statTab}
              name={strings.tabBarLabels.stat}
              {...props}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
