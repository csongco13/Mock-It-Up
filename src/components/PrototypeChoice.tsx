import React from "react";

import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  APP_COLORS,
} from "../constants/colors";

interface Props {
  icon: string;
  title: string;
  description: string;
  onPress: () => void;
}

export default function PrototypeChoice({
  icon,
  title,
  description,
  onPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,

        pressed &&
          styles.pressed,
      ]}
    >
      <View style={styles.iconBox}>
        <Text style={styles.icon}>
          {icon}
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
          {title}
        </Text>

        <Text
          style={
            styles.description
          }
        >
          {description}
        </Text>
      </View>

      <Text style={styles.arrow}>
        ›
      </Text>
    </Pressable>
  );
}

const styles =
  StyleSheet.create({
    card: {
      minHeight: 105,

      padding: 17,

      marginBottom: 14,

      borderRadius: 24,

      flexDirection: "row",

      alignItems: "center",

      backgroundColor:
        APP_COLORS.surface,

      borderWidth: 1,

      borderColor:
        APP_COLORS.border,
    },

    pressed: {
      opacity: 0.8,
    },

    iconBox: {
      width: 58,

      height: 58,

      borderRadius: 18,

      alignItems: "center",

      justifyContent:
        "center",

      backgroundColor:
        APP_COLORS.powderBlush,
    },

    icon: {
      fontSize: 27,

      color:
        APP_COLORS.darkAmethyst,
    },

    content: {
      flex: 1,

      marginLeft: 15,
    },

    title: {
      fontSize: 17,

      fontWeight: "700",

      color:
        APP_COLORS.darkAmethyst,
    },

    description: {
      marginTop: 5,

      fontSize: 13,

      lineHeight: 18,

      color:
        APP_COLORS.textMuted,
    },

    arrow: {
      fontSize: 29,

      color:
        APP_COLORS.pacificCyan,
    },
  });