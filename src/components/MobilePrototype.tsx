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

export default function MobilePrototype({
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
    <View style={styles.stage}>
      <View
        style={[
          styles.phone,

          {
            backgroundColor:
              background,
          },
        ]}
      >
        <View
          style={styles.status}
        >
          <Text
            style={[
              styles.time,

              {
                color: text,
              },
            ]}
          >
            9:41
          </Text>

          <View
            style={[
              styles.camera,
              {
                backgroundColor:
                  text,
              },
            ]}
          />
        </View>

        <View
          style={
            styles.header
          }
        >
          <Text
            style={[
              styles.hello,
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

          <View
            style={[
              styles.avatar,
              {
                backgroundColor:
                  secondary,
              },
            ]}
          />
        </View>

        <View
          style={[
            styles.hero,

            {
              backgroundColor:
                primary,
            },
          ]}
        >
          <Text
            style={
              styles.heroTitle
            }
          >
            {
              analysis.copy
                .headline
            }
          </Text>

          <Text
            style={
              styles.heroBody
            }
          >
            {
              analysis.copy
                .subheadline
            }
          </Text>

          <View
            style={[
              styles.heroButton,

              {
                backgroundColor:
                  accent,
              },
            ]}
          >
            <Text
              style={
                styles.heroButtonText
              }
            >
              {
                analysis.copy
                  .primaryCta
              }
            </Text>
          </View>
        </View>

        <Text
          style={[
            styles.sectionTitle,

            {
              color: text,
            },
          ]}
        >
          Explore
        </Text>

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
                styles.listCard,

                {
                  backgroundColor:
                    index === 1
                      ? secondary
                      : "rgba(255,255,255,0.72)",
                },
              ]}
            >
              <View
                style={[
                  styles.listIcon,

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
                  styles.listText,
                  {
                    color: text,
                  },
                ]}
              >
                {feature}
              </Text>

              <Text
                style={[
                  styles.arrow,
                  {
                    color: text,
                  },
                ]}
              >
                ›
              </Text>
            </View>
          )
        )}

        <View
          style={
            styles.tabBar
          }
        >
          <Text
            style={{
              color: primary,
            }}
          >
            ●
          </Text>

          <Text
            style={{
              color: text,
              opacity: 0.3,
            }}
          >
            ●
          </Text>

          <Text
            style={{
              color: text,
              opacity: 0.3,
            }}
          >
            ●
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles =
  StyleSheet.create({
    stage: {
      alignItems: "center",
    },

    phone: {
      width: 270,

      minHeight: 530,

      padding: 13,

      borderRadius: 38,

      borderWidth: 5,

      borderColor:
        "rgb(35,35,40)",

      shadowColor:
        "rgb(0,0,0)",

      shadowOpacity: 0.15,

      shadowRadius: 15,

      elevation: 5,
    },

    status: {
      height: 28,

      alignItems: "center",

      flexDirection: "row",
    },

    time: {
      flex: 1,

      fontSize: 9,

      fontWeight: "700",
    },

    camera: {
      width: 55,

      height: 15,

      borderRadius: 10,
    },

    header: {
      marginTop: 10,

      marginBottom: 16,

      flexDirection: "row",

      alignItems: "center",
    },

    hello: {
      flex: 1,

      fontSize: 17,

      fontWeight: "800",
    },

    avatar: {
      width: 29,

      height: 29,

      borderRadius: 15,
    },

    hero: {
      padding: 17,

      borderRadius: 22,
    },

    heroTitle: {
      color:
        "rgb(255,255,255)",

      fontSize: 20,

      lineHeight: 23,

      fontWeight: "800",
    },

    heroBody: {
      marginTop: 8,

      color:
        "rgba(255,255,255,0.72)",

      fontSize: 9,

      lineHeight: 13,
    },

    heroButton: {
      alignSelf:
        "flex-start",

      marginTop: 14,

      paddingVertical: 7,

      paddingHorizontal: 11,

      borderRadius: 15,
    },

    heroButtonText: {
      color:
        "rgb(255,255,255)",

      fontSize: 8,

      fontWeight: "700",
    },

    sectionTitle: {
      marginTop: 22,

      marginBottom: 10,

      fontSize: 14,

      fontWeight: "800",
    },

    listCard: {
      minHeight: 53,

      marginBottom: 8,

      padding: 9,

      borderRadius: 15,

      flexDirection: "row",

      alignItems: "center",
    },

    listIcon: {
      width: 34,

      height: 34,

      borderRadius: 11,
    },

    listText: {
      flex: 1,

      marginLeft: 9,

      fontSize: 9,

      fontWeight: "700",
    },

    arrow: {
      fontSize: 18,
    },

    tabBar: {
      marginTop: 8,

      paddingTop: 12,

      flexDirection: "row",

      justifyContent:
        "space-around",

      borderTopWidth: 1,

      borderTopColor:
        "rgba(0,0,0,0.06)",
    },
  });