import React from "react";

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";

import {
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import {
  RootStackParamList,
} from "../navigation/AppNavigator";

import {
  APP_COLORS,
} from "../constants/colors";

import PrototypeChoice from "../components/PrototypeChoice";

type Props =
  NativeStackScreenProps<
    RootStackParamList,
    "PrototypePicker"
  >;

export default function PrototypePickerScreen({
  navigation,
  route,
}: Props) {
  const { analysis } =
    route.params;

  return (
    <SafeAreaView
      style={styles.safe}
    >
      <ScrollView
        contentContainerStyle={
          styles.container
        }
      >
        <Text
          style={
            styles.eyebrow
          }
        >
          APPLY YOUR DESIGN
        </Text>

        <Text style={styles.title}>
          What should we mock up?
        </Text>

        <Text
          style={
            styles.description
          }
        >
          We'll apply{" "}
          {analysis.name} to a
          reusable interface
          template.
        </Text>

        <PrototypeChoice
          icon="◫"
          title="Website"
          description="Landing page with navigation, hero, features, and call to action."
          onPress={() =>
            navigation.navigate(
              "PrototypePreview",
              {
                analysis,

                prototypeType:
                  "website",
              }
            )
          }
        />

        <PrototypeChoice
          icon="▯"
          title="Mobile App"
          description="A native-style app interface using your generated visual system."
          onPress={() =>
            navigation.navigate(
              "PrototypePreview",
              {
                analysis,

                prototypeType:
                  "mobile",
              }
            )
          }
        />

        <PrototypeChoice
          icon="▤"
          title="Blog"
          description="Editorial homepage with featured content and article cards."
          onPress={() =>
            navigation.navigate(
              "PrototypePreview",
              {
                analysis,

                prototypeType:
                  "blog",
              }
            )
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    safe: {
      flex: 1,

      backgroundColor:
        APP_COLORS.background,
    },

    container: {
      padding: 24,

      paddingBottom: 60,
    },

    eyebrow: {
      marginTop: 24,

      fontSize: 11,

      fontWeight: "800",

      letterSpacing: 2,

      color:
        APP_COLORS.pacificCyan,
    },

    title: {
      marginTop: 12,

      fontSize: 36,

      lineHeight: 42,

      fontWeight: "800",

      color:
        APP_COLORS.darkAmethyst,
    },

    description: {
      marginTop: 12,

      marginBottom: 32,

      fontSize: 15,

      lineHeight: 22,

      color:
        APP_COLORS.textMuted,
    },
  });