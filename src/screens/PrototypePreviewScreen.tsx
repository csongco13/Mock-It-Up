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

import WebsitePrototype from "../components/WebsitePrototype";
import MobilePrototype from "../components/MobilePrototype";
import BlogPrototype from "../components/BlogPrototype";
import BrandButton from "../components/BrandButton";

type Props =
  NativeStackScreenProps<
    RootStackParamList,
    "PrototypePreview"
  >;

export default function PrototypePreviewScreen({
  navigation,
  route,
}: Props) {
  const {
    analysis,
    prototypeType,
  } = route.params;

  const title =
    prototypeType === "website"
      ? "Website Prototype"
      : prototypeType ===
        "mobile"
      ? "Mobile Prototype"
      : "Blog Prototype";

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
          GENERATED PROTOTYPE
        </Text>

        <Text style={styles.title}>
          {title}
        </Text>

        <Text
          style={
            styles.description
          }
        >
          Built from your{" "}
          {analysis.name} design
          direction.
        </Text>

        <View
          style={
            styles.previewStage
          }
        >
          {prototypeType ===
            "website" && (
            <WebsitePrototype
              analysis={
                analysis
              }
            />
          )}

          {prototypeType ===
            "mobile" && (
            <MobilePrototype
              analysis={
                analysis
              }
            />
          )}

          {prototypeType ===
            "blog" && (
            <BlogPrototype
              analysis={
                analysis
              }
            />
          )}
        </View>

        <View
          style={
            styles.details
          }
        >
          <Text
            style={
              styles.detailsLabel
            }
          >
            DESIGN DIRECTION
          </Text>

          <Text
            style={
              styles.detailsTitle
            }
          >
            {
              analysis.uiStyle
                .visualStyle
            }
          </Text>

          <Text
            style={
              styles.detailsBody
            }
          >
            {
              analysis.typography
                .description
            }
          </Text>
        </View>

        <BrandButton
          title="Try another prototype"
          style={{
            marginTop: 24,
          }}
          onPress={() =>
            navigation.goBack()
          }
        />

        <BrandButton
          title="Start new project"
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

      fontSize: 36,

      fontWeight: "800",

      color:
        APP_COLORS.darkAmethyst,
    },

    description: {
      marginTop: 9,

      color:
        APP_COLORS.textMuted,
    },

    previewStage: {
      marginTop: 28,

      padding: 14,

      borderRadius: 28,

      backgroundColor:
        APP_COLORS.surface,

      borderWidth: 1,

      borderColor:
        APP_COLORS.border,
    },

    details: {
      marginTop: 24,

      padding: 21,

      borderRadius: 24,

      backgroundColor:
        APP_COLORS.mutedTeal,
    },

    detailsLabel: {
      fontSize: 10,

      fontWeight: "800",

      letterSpacing: 1.5,

      color:
        APP_COLORS.darkAmethyst,
    },

    detailsTitle: {
      marginTop: 8,

      fontSize: 21,

      fontWeight: "800",

      color:
        APP_COLORS.darkAmethyst,
    },

    detailsBody: {
      marginTop: 9,

      lineHeight: 20,

      color:
        APP_COLORS.darkAmethyst,
    },
  });