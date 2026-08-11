import React from "react";

import {
  Image,
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

import ColorSwatch from "../components/ColorSwatch";
import BrandButton from "../components/BrandButton";

type Props =
  NativeStackScreenProps<
    RootStackParamList,
    "Analysis"
  >;

export default function AnalysisScreen({
  navigation,
  route,
}: Props) {
  const {
    analysis,
    imageUri,
  } = route.params;

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
        <Text
          style={
            styles.eyebrow
          }
        >
          YOUR DESIGN DIRECTION
        </Text>

        <Text style={styles.title}>
          {analysis.name}
        </Text>

        <Text
          style={
            styles.summary
          }
        >
          {analysis.summary}
        </Text>

        <View style={styles.moods}>
          {analysis.mood.map(
            (mood) => (
              <View
                key={mood}
                style={
                  styles.mood
                }
              >
                <Text
                  style={
                    styles.moodText
                  }
                >
                  {mood}
                </Text>
              </View>
            )
          )}
        </View>

        <Image
          source={{
            uri: imageUri,
          }}
          style={
            styles.image
          }
        />

        <Text
          style={
            styles.sectionTitle
          }
        >
          Color system
        </Text>

        <View
          style={
            styles.palette
          }
        >
          {analysis.palette.map(
            (color) => (
              <ColorSwatch
                key={color.role}
                color={color}
              />
            )
          )}
        </View>

        <Text
          style={
            styles.sectionTitle
          }
        >
          Typography
        </Text>

        <View
          style={
            styles.directionCard
          }
        >
          <Text
            style={
              styles.cardLabel
            }
          >
            HEADINGS
          </Text>

          <Text
            style={
              styles.cardTitle
            }
          >
            {
              analysis.typography
                .headingStyle
            }
          </Text>

          <Text
            style={
              styles.cardLabelTwo
            }
          >
            BODY
          </Text>

          <Text
            style={
              styles.cardTitle
            }
          >
            {
              analysis.typography
                .bodyStyle
            }
          </Text>

          <Text
            style={
              styles.cardBody
            }
          >
            {
              analysis.typography
                .description
            }
          </Text>
        </View>

        <Text
          style={
            styles.sectionTitle
          }
        >
          Interface direction
        </Text>

        <View
          style={
            styles.directionCard
          }
        >
          <Text
            style={
              styles.cardTitle
            }
          >
            {
              analysis.uiStyle
                .visualStyle
            }
          </Text>

          <Text
            style={
              styles.cardBody
            }
          >
            Buttons:{" "}
            {
              analysis.uiStyle
                .buttonStyle
            }
          </Text>

          <Text
            style={
              styles.cardBody
            }
          >
            Cards:{" "}
            {
              analysis.uiStyle
                .cardStyle
            }
          </Text>

          <Text
            style={
              styles.cardBody
            }
          >
            Spacing:{" "}
            {
              analysis.uiStyle
                .spacing
            }
          </Text>
        </View>

        <BrandButton
          title="Create prototype"
          style={{
            marginTop: 30,
          }}
          onPress={() =>
            navigation.navigate(
              "PrototypePicker",
              {
                analysis,
              }
            )
          }
        />

        <BrandButton
          title="Start over"
          variant="secondary"
          style={{
            marginTop: 12,
          }}
          onPress={() =>
            navigation.popToTop()
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
      marginTop: 15,

      fontSize: 11,

      fontWeight: "800",

      letterSpacing: 2,

      color:
        APP_COLORS.pacificCyan,
    },

    title: {
      marginTop: 9,

      fontSize: 38,

      fontWeight: "800",

      color:
        APP_COLORS.darkAmethyst,
    },

    summary: {
      marginTop: 12,

      fontSize: 15,

      lineHeight: 23,

      color:
        APP_COLORS.textMuted,
    },

    moods: {
      flexDirection: "row",

      flexWrap: "wrap",

      gap: 8,

      marginTop: 18,
    },

    mood: {
      paddingVertical: 7,

      paddingHorizontal: 12,

      borderRadius: 100,

      backgroundColor:
        APP_COLORS.powderBlush,
    },

    moodText: {
      fontSize: 12,

      fontWeight: "600",

      color:
        APP_COLORS.darkAmethyst,
    },

    image: {
      width: "100%",

      height: 220,

      marginTop: 28,

      borderRadius: 26,
    },

    sectionTitle: {
      marginTop: 34,

      marginBottom: 18,

      fontSize: 23,

      fontWeight: "800",

      color:
        APP_COLORS.darkAmethyst,
    },

    palette: {
      flexDirection: "row",

      flexWrap: "wrap",

      justifyContent:
        "space-between",
    },

    directionCard: {
      padding: 21,

      borderRadius: 24,

      backgroundColor:
        APP_COLORS.surface,

      borderWidth: 1,

      borderColor:
        APP_COLORS.border,
    },

    cardLabel: {
      fontSize: 10,

      fontWeight: "800",

      letterSpacing: 1.5,

      color:
        APP_COLORS.pacificCyan,
    },

    cardLabelTwo: {
      marginTop: 20,

      fontSize: 10,

      fontWeight: "800",

      letterSpacing: 1.5,

      color:
        APP_COLORS.pacificCyan,
    },

    cardTitle: {
      marginTop: 5,

      fontSize: 18,

      fontWeight: "700",

      color:
        APP_COLORS.darkAmethyst,
    },

    cardBody: {
      marginTop: 10,

      lineHeight: 21,

      color:
        APP_COLORS.textMuted,
    },
  });