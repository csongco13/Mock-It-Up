import React from "react";

import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  PaletteColor,
  colorToRGB,
} from "../types/brand";

import {
  APP_COLORS,
} from "../constants/colors";

interface Props {
  color: PaletteColor;
}

export default function ColorSwatch({
  color,
}: Props) {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.swatch,
          {
            backgroundColor:
              colorToRGB(
                color
              ),
          },
        ]}
      />

      <Text style={styles.role}>
        {color.role.toUpperCase()}
      </Text>

      <Text style={styles.name}>
        {color.name}
      </Text>

      <Text style={styles.rgb}>
        rgb({color.red},{" "}
        {color.green},{" "}
        {color.blue})
      </Text>

      <Text style={styles.reason}>
        {color.reason}
      </Text>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      width: "47%",

      marginBottom: 26,
    },

    swatch: {
      width: "100%",

      height: 118,

      borderRadius: 20,

      borderWidth: 1,

      borderColor:
        APP_COLORS.border,
    },

    role: {
      marginTop: 10,

      fontSize: 10,

      fontWeight: "700",

      letterSpacing: 1.3,

      color:
        APP_COLORS.pacificCyan,
    },

    name: {
      marginTop: 4,

      fontSize: 16,

      fontWeight: "700",

      color:
        APP_COLORS.darkAmethyst,
    },

    rgb: {
      marginTop: 3,

      fontSize: 11,

      color:
        APP_COLORS.textMuted,
    },

    reason: {
      marginTop: 7,

      fontSize: 11,

      lineHeight: 16,

      color:
        APP_COLORS.textMuted,
    },
  });