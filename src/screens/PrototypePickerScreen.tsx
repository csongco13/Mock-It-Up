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
          {analysis.name} to what you want to prototype.
        </Text>

        <PrototypeChoice
          icon={require("../../assets/icons/website.png")}
          title="Website"
          description="Landing page with navigation, home page, features, and contact."
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
          icon={require("../../assets/icons/mobile.png")}
          title="Mobile App"
          description="A general view of a mobile app prototype interface."
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
          icon={require("../../assets/icons/blog.png")}
          title="Blog"
          description="Blog homepage with articles and featured content."
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