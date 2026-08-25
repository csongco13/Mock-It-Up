import React from "react";

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
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
            <Image source={require("../../assets/icons/logo.png")}
              style={styles.logoImage}
              resizeMode="contain"
              />
              
            <Image source={require("../../assets/icons/mockitup-green.png")}
              style={styles.logoTextImage}
              resizeMode="center"
              />
        </View>

        <View style={styles.hero}>

          <Text style={styles.title}>
            A Photo.{"\n"}
            A Moodboard.{"\n"}
            See Your Vision Unfold.
          </Text>

          <Text
            style={
              styles.description
            }
          >
            Upload a photo or moodboard. Mock-It-Up analyzes the visual
            direction and turns it into website, mobile, and blog concepts.
          </Text>
        </View>
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
            Design direction, generated from your inspiration.
          </Text>

          <Text
            style={
              styles.infoBody
            }
          >
            Mock-It-Up studies your image's composition, colors, and main theme. Mock-It-Up generates your palette scheme, font styling, and 
            design direction to give you your UI Interface/Prototype.
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
          icon={require("../../assets/icons/camera.png")}
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
          icon={require("../../assets/icons/images.png")}
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

        <Pressable
          style={({ pressed }) => [
            styles.savedButton,

            pressed &&
              styles.savedButtonPressed,
          ]}
          onPress={() =>
            navigation.navigate(
              "SavedPrototypes"
            )
          }
        >
          <Text
            style={
              styles.savedButtonText
            }
          >
            View Saved Prototypes
          </Text>
        </Pressable>

 
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
      padding: 26,
      paddingBottom: 2,
    },

    logoRow: {
      marginTop: 8,
      flexDirection: "row",
      alignItems: "center",
      gap:1,
    },

    logoImage: {
      width:55,
      height:55,
      borderRadius:15,
      shadowColor: APP_COLORS.black
    },

    logoTextImage: {
      width: 300,
      height: 90,
    },

    hero: {
      marginTop: 12,
      marginBottom: 15,
    },

    eyebrow: {
      color:
        APP_COLORS.pacificCyan,

      fontWeight: "800",

      fontSize: 11,

      letterSpacing: 2,
    },

    title: {
      marginTop: 1,

      fontSize: 45,

      lineHeight: 50,

      fontWeight: "800",

      color:
        APP_COLORS.darkAmethyst,
    },

    description: {
      marginTop: 20,
      fontSize: 16,
      lineHeight: 25,
      color:
        APP_COLORS.textMuted,
    },

    sectionTitle: {
      marginBottom: 15,
      marginTop: 15,
      fontSize: 20,

      fontWeight: "700",

      color:
        APP_COLORS.darkAmethyst,
    },

    infoCard: {
      padding: 24,
      borderRadius: 10,
      backgroundColor: APP_COLORS.mutedTeal,
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

    savedButton: {
      marginTop: 12,

      marginBottom: 30,

      paddingVertical: 16,

      paddingHorizontal: 24,

      alignItems: "center",

      justifyContent: "center",

      borderRadius: 12,

      borderWidth: 1,

      borderColor:
        APP_COLORS.darkAmethyst,

      backgroundColor:
        APP_COLORS.surface,
    },

    savedButtonPressed: {
      opacity: 0.8,
    },

    savedButtonText: {
      fontSize: 15,

      fontWeight: "700",

      color:
        APP_COLORS.darkAmethyst,
    },
  });