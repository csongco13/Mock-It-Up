import React from "react";

import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  BrandAnalysis,
  getRGBByRole,
} from "../types/brand";

interface Props {
  analysis: BrandAnalysis;
}

export default function WebsitePrototype({
  analysis,
}: Props) {
  const primary =
    getRGBByRole(
      analysis,
      "primary",
      "rgb(30, 30, 30)"
    );

  const secondary =
    getRGBByRole(
      analysis,
      "secondary",
      "rgb(230, 230, 230)"
    );

  const accent =
    getRGBByRole(
      analysis,
      "accent",
      "rgb(80, 130, 140)"
    );

  const background =
    getRGBByRole(
      analysis,
      "background",
      "rgb(250, 250, 250)"
    );

  const text =
    getRGBByRole(
      analysis,
      "text",
      "rgb(30, 30, 30)"
    );

  return (
    <View
      style={[
        styles.browser,
        {
          backgroundColor:
            background,
        },
      ]}
    >
      <View
        style={
          styles.browserBar
        }
      >
        <View
          style={[
            styles.dot,
            {
              backgroundColor:
                secondary,
            },
          ]}
        />

        <View
          style={[
            styles.dot,
            {
              backgroundColor:
                accent,
            },
          ]}
        />

        <View
          style={[
            styles.dot,
            {
              backgroundColor:
                primary,
            },
          ]}
        />
      </View>

      <View
        style={
          styles.navigation
        }
      >
        <Text
          style={[
            styles.brand,
            {
              color: text,
            },
          ]}
        >
          {
            analysis.copy
              .brandName
          }
        </Text>

        <Text
          style={[
            styles.navText,
            {
              color: text,
            },
          ]}
        >
          About
        </Text>

        <Text
          style={[
            styles.navText,
            {
              color: text,
            },
          ]}
        >
          Work
        </Text>
      </View>

      <View
        style={styles.hero}
      >
        <Text
          style={[
            styles.headline,
            {
              color: text,
            },
          ]}
        >
          {
            analysis.copy
              .headline
          }
        </Text>

        <Text
          style={[
            styles.subheadline,
            {
              color: text,
            },
          ]}
        >
          {
            analysis.copy
              .subheadline
          }
        </Text>

        <View
          style={[
            styles.button,
            {
              backgroundColor:
                primary,
            },
          ]}
        >
          <Text
            style={
              styles.buttonText
            }
          >
            {
              analysis.copy
                .primaryCta
            }
          </Text>
        </View>
      </View>

      <View
        style={
          styles.cards
        }
      >
        {[
          analysis.copy
            .featureOne,

          analysis.copy
            .featureTwo,

          analysis.copy
            .featureThree,
        ].map(
          (feature, index) => (
            <View
              key={feature}
              style={[
                styles.card,

                {
                  backgroundColor:
                    index === 1
                      ? secondary
                      : "rgba(255,255,255,0.65)",
                },
              ]}
            >
              <View
                style={[
                  styles.cardIcon,

                  {
                    backgroundColor:
                      index === 2
                        ? accent
                        : primary,
                  },
                ]}
              />

              <Text
                style={[
                  styles.cardText,
                  {
                    color: text,
                  },
                ]}
              >
                {feature}
              </Text>
            </View>
          )
        )}
      </View>
    </View>
  );
}

const styles =
  StyleSheet.create({
    browser: {
      overflow: "hidden",

      borderRadius: 18,

      borderWidth: 1,

      borderColor:
        "rgba(0,0,0,0.08)",
    },

    browserBar: {
      height: 27,

      paddingHorizontal: 10,

      flexDirection: "row",

      alignItems: "center",

      gap: 5,

      backgroundColor:
        "rgba(255,255,255,0.55)",
    },

    dot: {
      width: 6,

      height: 6,

      borderRadius: 3,
    },

    navigation: {
      padding: 15,

      flexDirection: "row",

      alignItems: "center",
    },

    brand: {
      flex: 1,

      fontSize: 13,

      fontWeight: "800",
    },

    navText: {
      marginLeft: 12,

      fontSize: 8,
    },

    hero: {
      paddingHorizontal: 22,

      paddingTop: 38,

      paddingBottom: 42,

      alignItems: "center",
    },

    headline: {
      maxWidth: 270,

      textAlign: "center",

      fontSize: 27,

      lineHeight: 31,

      fontWeight: "800",
    },

    subheadline: {
      maxWidth: 260,

      marginTop: 10,

      textAlign: "center",

      fontSize: 10,

      lineHeight: 15,

      opacity: 0.72,
    },

    button: {
      marginTop: 17,

      paddingHorizontal: 17,

      paddingVertical: 9,

      borderRadius: 20,
    },

    buttonText: {
      color:
        "rgb(255,255,255)",

      fontSize: 9,

      fontWeight: "700",
    },

    cards: {
      padding: 14,

      flexDirection: "row",

      gap: 8,
    },

    card: {
      flex: 1,

      minHeight: 100,

      padding: 10,

      borderRadius: 12,
    },

    cardIcon: {
      width: 25,

      height: 25,

      borderRadius: 8,
    },

    cardText: {
      marginTop: 10,

      fontSize: 8,

      lineHeight: 11,

      fontWeight: "700",
    },
  });