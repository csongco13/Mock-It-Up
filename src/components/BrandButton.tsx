import React from "react";

import {
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";

import {
  APP_COLORS,
} from "../constants/colors";

interface Props {
  title: string;

  onPress: () => void;

  variant?:
    | "primary"
    | "secondary";

  disabled?: boolean;

  style?: ViewStyle;
}

export default function BrandButton({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  style,
}: Props) {
  const primary =
    variant === "primary";

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,

        primary
          ? styles.primary
          : styles.secondary,

        pressed &&
          styles.pressed,

        disabled &&
          styles.disabled,

        style,
      ]}
    >
      <Text
        style={[
          styles.text,

          primary
            ? styles.primaryText
            : styles.secondaryText,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles =
  StyleSheet.create({
    button: {
      minHeight: 56,

      borderRadius: 18,

      justifyContent:
        "center",

      alignItems: "center",

      paddingHorizontal: 22,
    },

    primary: {
      backgroundColor:
        APP_COLORS.darkAmethyst,
    },

    secondary: {
      backgroundColor:
        APP_COLORS.surface,

      borderWidth: 1,

      borderColor:
        APP_COLORS.border,
    },

    text: {
      fontSize: 16,

      fontWeight: "700",
    },

    primaryText: {
      color:
        APP_COLORS.white,
    },

    secondaryText: {
      color:
        APP_COLORS.darkAmethyst,
    },

    pressed: {
      opacity: 0.82,
    },

    disabled: {
      opacity: 0.4,
    },
  });