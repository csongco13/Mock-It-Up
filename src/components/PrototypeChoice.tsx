import React from "react";

import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType,
} from "react-native";

import {
  APP_COLORS,
} from "../constants/colors";

interface Props {
  icon: ImageSourcePropType;
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
      style={({pressed}) => [
        styles.card,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.iconBox}>
        <Image source={icon}
          style={styles.icon}
          resizeMode="contain"/>
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
      borderRadius: 12,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor:
        APP_COLORS.surface,

      borderWidth: 3,

      borderColor:
        APP_COLORS.border,
    },

    pressed: {
      opacity: 0.8,
    },

    iconBox: {
      width: 58,
      height: 58,
      borderRadius: 8,

      alignItems: "center",

      justifyContent:
        "center",

      backgroundColor:
        APP_COLORS.powderBlush,
    },

    icon: {
      width: 25,
      height: 25,
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