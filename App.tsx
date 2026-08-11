import React, {
  useEffect,
  useState,
} from "react";

import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
} from "react-native";

import AppNavigator from "./src/navigation/AppNavigator";

import {
  ensureSession,
} from "./src/lib/supabase";

import {
  APP_COLORS,
} from "./src/constants/colors";

export default function App() {
  const [ready, setReady] =
    useState(false);

  const [error, setError] =
    useState<string | null>(
      null
    );

  useEffect(() => {
    initialize();
  }, []);

  const initialize =
    async () => {
      try {
        await ensureSession();

        setReady(true);
      } catch (err) {
        console.error(err);

        setError(
          "Unable to connect to MockITUp."
        );
      }
    };

  if (error) {
    return (
      <SafeAreaView
        style={styles.center}
      >
        <Text
          style={
            styles.errorText
          }
        >
          {error}
        </Text>
      </SafeAreaView>
    );
  }

  if (!ready) {
    return (
      <SafeAreaView
        style={styles.center}
      >
        <ActivityIndicator
          size="large"
          color={
            APP_COLORS.pacificCyan
          }
        />

        <Text
          style={
            styles.loadingText
          }
        >
          Starting MockITUp...
        </Text>
      </SafeAreaView>
    );
  }

  return <AppNavigator />;
}

const styles =
  StyleSheet.create({
    center: {
      flex: 1,

      alignItems: "center",

      justifyContent:
        "center",

      backgroundColor:
        APP_COLORS.background,
    },

    loadingText: {
      marginTop: 15,

      color:
        APP_COLORS.textMuted,
    },

    errorText: {
      color:
        APP_COLORS.darkAmethyst,
    },
  });