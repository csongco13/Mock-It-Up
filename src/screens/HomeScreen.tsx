import React from "react";

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
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
    "Home"
  >;

export default function HomeScreen({
  navigation,
}: Props) {
  return (
    <SafeAreaView
      style={styles.safe}
    >
      <ScrollView
        contentContainerStyle={
          styles.container
        }
        showsVerticalScrollIndicator={
          false
        }
      >
        <View style={styles.logoRow}>
          <View style={styles.logo}>
            <Text
              style={
                styles.logoSymbol
              }
            >
              {"</>"}
            </Text>
          </View>

          <Text
            style={styles.logoText}
          >
            Mock
            <Text
              style={
                styles.logoPink
              }
            >
              IT
            </Text>
            <Text
              style={
                styles.logoTeal
              }
            >
              Up
            </Text>
          </Text>
        </View>

        <View style={styles.hero}>
          <Text
            style={
              styles.eyebrow
            }
          >
            AI DESIGN ASSISTANT
          </Text>

          <Text style={styles.title}>
            Turn inspiration{"\n"}
            into a prototype.
          </Text>

          <Text
            style={
              styles.description
            }
          >
            Upload a photo or
            moodboard. MockITUp
            analyzes the visual
            direction and turns it
            into website, mobile,
            and blog concepts.
          </Text>
        </View>

        <Text
          style={
            styles.sectionTitle
          }
        >
          Start creating
        </Text>

        <PrototypeChoice
          icon="◉"
          title="Take a photo"
          description="Capture something that inspires your visual direction."
          onPress={() =>
            navigation.navigate(
              "Upload",
              {
                source:
                  "camera",
              }
            )
          }
        />

        <PrototypeChoice
          icon="▧"
          title="Upload a moodboard"
          description="Choose an image or moodboard from your photo library."
          onPress={() =>
            navigation.navigate(
              "Upload",
              {
                source:
                  "library",
              }
            )
          }
        />

        <View
          style={
            styles.infoCard
          }
        >
          <Text
            style={
              styles.infoEyebrow
            }
          >
            HOW IT WORKS
          </Text>

          <Text
            style={
              styles.infoTitle
            }
          >
            Design direction,
            generated from your
            inspiration.
          </Text>

          <Text
            style={
              styles.infoBody
            }
          >
            MockITUp studies color,
            mood, typography, and UI
            style, then applies the
            result to reusable
            prototype templates.
          </Text>
        </View>
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

    logoRow: {
      marginTop: 8,

      flexDirection: "row",

      alignItems: "center",
    },

    logo: {
      width: 46,

      height: 46,

      borderRadius: 15,

      alignItems: "center",

      justifyContent:
        "center",

      backgroundColor:
        APP_COLORS.darkAmethyst,
    },

    logoSymbol: {
      color:
        APP_COLORS.powderBlush,

      fontSize: 15,

      fontWeight: "800",
    },

    logoText: {
      marginLeft: 11,

      fontSize: 22,

      fontWeight: "800",

      color:
        APP_COLORS.darkAmethyst,
    },

    logoPink: {
      color:
        APP_COLORS.powderBlush,
    },

    logoTeal: {
      color:
        APP_COLORS.pacificCyan,
    },

    hero: {
      marginTop: 62,

      marginBottom: 45,
    },

    eyebrow: {
      color:
        APP_COLORS.pacificCyan,

      fontWeight: "800",

      fontSize: 11,

      letterSpacing: 2,
    },

    title: {
      marginTop: 15,

      fontSize: 45,

      lineHeight: 50,

      fontWeight: "800",

      color:
        APP_COLORS.darkAmethyst,
    },

    description: {
      marginTop: 20,

      maxWidth: 340,

      fontSize: 16,

      lineHeight: 25,

      color:
        APP_COLORS.textMuted,
    },

    sectionTitle: {
      marginBottom: 15,

      fontSize: 20,

      fontWeight: "700",

      color:
        APP_COLORS.darkAmethyst,
    },

    infoCard: {
      marginTop: 20,

      padding: 24,

      borderRadius: 28,

      backgroundColor:
        APP_COLORS.mutedTeal,
    },

    infoEyebrow: {
      fontSize: 10,

      letterSpacing: 1.7,

      fontWeight: "800",

      color:
        APP_COLORS.darkAmethyst,
    },

    infoTitle: {
      marginTop: 10,

      fontSize: 25,

      lineHeight: 30,

      fontWeight: "800",

      color:
        APP_COLORS.darkAmethyst,
    },

    infoBody: {
      marginTop: 12,

      lineHeight: 21,

      color:
        APP_COLORS.darkAmethyst,
    },
  });