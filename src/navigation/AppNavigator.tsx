import React from "react";

import {
  NavigationContainer,
} from "@react-navigation/native";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import UploadScreen from "../screens/UploadScreen";
import AnalysisScreen from "../screens/AnalysisScreen";
import PrototypePickerScreen from "../screens/PrototypePickerScreen";
import PrototypePreviewScreen from "../screens/PrototypePreviewScreen";

import {
  APP_COLORS,
} from "../constants/colors";

import {
  BrandAnalysis,
  PrototypeType,
} from "../types/brand";

export type RootStackParamList = {
  Home: undefined;

  Upload: {
    source:
      | "camera"
      | "library";
  };

  Analysis: {
    imageUri: string;

    analysis:
      BrandAnalysis;
  };

  PrototypePicker: {
    analysis:
      BrandAnalysis;
  };

  PrototypePreview: {
    analysis:
      BrandAnalysis;

    prototypeType:
      PrototypeType;
  };
};

const Stack =
  createNativeStackNavigator<
    RootStackParamList
  >();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitle: "",

          headerShadowVisible:
            false,

          headerTintColor:
            APP_COLORS
              .darkAmethyst,

          headerStyle: {
            backgroundColor:
              APP_COLORS.background,
          },

          contentStyle: {
            backgroundColor:
              APP_COLORS.background,
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={
            HomeScreen
          }
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Upload"
          component={
            UploadScreen
          }
        />

        <Stack.Screen
          name="Analysis"
          component={
            AnalysisScreen
          }
        />

        <Stack.Screen
          name="PrototypePicker"
          component={
            PrototypePickerScreen
          }
        />

        <Stack.Screen
          name="PrototypePreview"
          component={
            PrototypePreviewScreen
          }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}