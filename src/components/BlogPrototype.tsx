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

export default function BlogPrototype({
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
      "rgb(250,250,250)"
    );

  const text =
    getRGBByRole(
      analysis,
      "text",
      "rgb(30,30,30)"
    );

  const articles = [
    analysis.copy.articleOne,
    analysis.copy.articleTwo,
    analysis.copy.articleThree,
  ];

  return (
    <View
      style={[
        styles.blog,

        {
          backgroundColor:
            background,
        },
      ]}
    >
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
            styles.navItem,
            {
              color: text,
            },
          ]}
        >
          Stories
        </Text>

        <Text
          style={[
            styles.navItem,
            {
              color: text,
            },
          ]}
        >
          About
        </Text>
      </View>

      <View
        style={[
          styles.feature,

          {
            backgroundColor:
              secondary,
          },
        ]}
      >
        <View
          style={[
            styles.featureImage,

            {
              backgroundColor:
                primary,
            },
          ]}
        >
          <View
            style={[
              styles.circle,

              {
                backgroundColor:
                  accent,
              },
            ]}
          />
        </View>

        <View
          style={
            styles.featureContent
          }
        >
          <Text
            style={[
              styles.category,

              {
                color: primary,
              },
            ]}
          >
            FEATURED
          </Text>

          <Text
            style={[
              styles.featureTitle,

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
              styles.featureBody,

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
        </View>
      </View>

      <Text
        style={[
          styles.latest,

          {
            color: text,
          },
        ]}
      >
        Latest stories
      </Text>

      {articles.map(
        (article, index) => (
          <View
            key={article}
            style={
              styles.article
            }
          >
            <View
              style={[
                styles.thumbnail,

                {
                  backgroundColor:
                    index === 0
                      ? primary
                      : index === 1
                      ? accent
                      : secondary,
                },
              ]}
            />

            <View
              style={
                styles.articleContent
              }
            >
              <Text
                style={[
                  styles.articleCategory,

                  {
                    color: accent,
                  },
                ]}
              >
                DESIGN
              </Text>

              <Text
                style={[
                  styles.articleTitle,

                  {
                    color: text,
                  },
                ]}
              >
                {article}
              </Text>

              <Text
                style={[
                  styles.articleMeta,

                  {
                    color: text,
                  },
                ]}
              >
                5 min read
              </Text>
            </View>
          </View>
        )
      )}
    </View>
  );
}

const styles =
  StyleSheet.create({
    blog: {
      padding: 16,

      borderRadius: 20,

      borderWidth: 1,

      borderColor:
        "rgba(0,0,0,0.08)",
    },

    navigation: {
      flexDirection: "row",

      alignItems: "center",

      marginBottom: 20,
    },

    brand: {
      flex: 1,

      fontSize: 15,

      fontWeight: "800",
    },

    navItem: {
      marginLeft: 13,

      fontSize: 8,
    },

    feature: {
      overflow: "hidden",

      borderRadius: 18,
    },

    featureImage: {
      height: 130,

      alignItems: "center",

      justifyContent:
        "center",
    },

    circle: {
      width: 68,

      height: 68,

      borderRadius: 34,

      opacity: 0.8,
    },

    featureContent: {
      padding: 17,
    },

    category: {
      fontSize: 7,

      fontWeight: "800",

      letterSpacing: 1.3,
    },

    featureTitle: {
      marginTop: 7,

      fontSize: 20,

      lineHeight: 23,

      fontWeight: "800",
    },

    featureBody: {
      marginTop: 7,

      fontSize: 9,

      lineHeight: 13,

      opacity: 0.7,
    },

    latest: {
      marginTop: 25,

      marginBottom: 12,

      fontSize: 15,

      fontWeight: "800",
    },

    article: {
      minHeight: 72,

      marginBottom: 12,

      flexDirection: "row",
    },

    thumbnail: {
      width: 82,

      borderRadius: 13,
    },

    articleContent: {
      flex: 1,

      paddingLeft: 12,

      justifyContent:
        "center",
    },

    articleCategory: {
      fontSize: 7,

      letterSpacing: 1,

      fontWeight: "800",
    },

    articleTitle: {
      marginTop: 4,

      fontSize: 11,

      lineHeight: 14,

      fontWeight: "700",
    },

    articleMeta: {
      marginTop: 5,

      fontSize: 7,

      opacity: 0.45,
    },
  });