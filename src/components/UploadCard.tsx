import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { APP_COLORS } from "../constants/colors";

interface UploadCardProps {
  icon: string;
  title: string;
  description: string;
  onPress: () => void;
}

export default function UploadCard({
  icon,
  title,
  description,
  onPress,
}: UploadCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{icon}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.description}>
          {description}
        </Text>
      </View>

      <Text style={styles.arrow}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: APP_COLORS.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: APP_COLORS.border,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  pressed: {
    opacity: 0.8,
  },

  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: APP_COLORS.powderBlush,
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    fontSize: 25,
  },

  content: {
    flex: 1,
    marginLeft: 16,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: APP_COLORS.darkAmethyst,
  },

  description: {
    fontSize: 13,
    lineHeight: 19,
    color: APP_COLORS.textMuted,
    marginTop: 4,
  },

  arrow: {
    fontSize: 30,
    color: APP_COLORS.pacificCyan,
  },
});