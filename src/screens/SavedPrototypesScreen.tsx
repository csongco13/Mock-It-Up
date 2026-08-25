import React, {
  useCallback,
  useState,
} from "react";

import {
  ActivityIndicator,
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  useFocusEffect,
} from "@react-navigation/native";

import {
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import {
  RootStackParamList,
} from "../navigation/AppNavigator";

import {
  APP_COLORS,
} from "../constants/colors";

import {
  ensureSession,
  supabase,
} from "../lib/supabase";

import {
  BrandAnalysis,
} from "../types/brand";

type Props =
  NativeStackScreenProps<
    RootStackParamList,
    "SavedPrototypes"
  >;

type PrototypeType =
  | "website"
  | "mobile"
  | "blog";

interface SavedPrototype {
  id: string;

  user_id: string;

  name: string;

  prototype_type:
    PrototypeType;

  analysis:
    BrandAnalysis;

  created_at: string;
}

export default function SavedPrototypesScreen({
  navigation,
}: Props) {
  const [
    prototypes,
    setPrototypes,
  ] =
    useState<
      SavedPrototype[]
    >([]);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  async function loadPrototypes() {
    setIsLoading(true);

    try {
      const session =
        await ensureSession();

      if (!session) {
        throw new Error(
          "Unable to create a user session."
        );
      }

      const {
        data,
        error,
      } =
        await supabase
          .from("prototypes")
          .select("*")
          .eq(
            "user_id",
            session.user.id
          )
          .order(
            "created_at",
            {
              ascending: false,
            }
          );

      if (error) {
        throw error;
      }

      setPrototypes(
        (data || []) as
          SavedPrototype[]
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to load your saved prototypes.";

      Alert.alert(
        "Unable to load",
        message
      );
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadPrototypes();
    }, [])
  );

  function openPrototype(
    prototype:
      SavedPrototype
  ) {
    navigation.navigate(
      "PrototypePreview",
      {
        analysis:
          prototype.analysis,

        prototypeType:
          prototype.prototype_type,
      }
    );
  }

  function confirmDelete(
    prototype:
      SavedPrototype
  ) {
    Alert.alert(
      "Delete prototype",
      `Delete "${prototype.name}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },

        {
          text: "Delete",
          style:
            "destructive",

          onPress: () =>
            deletePrototype(
              prototype
            ),
        },
      ]
    );
  }

  async function deletePrototype(
    prototype:
      SavedPrototype
  ) {
    try {
      const session =
        await ensureSession();

      if (!session) {
        throw new Error(
          "Unable to find your user session."
        );
      }

      const {
        error,
      } =
        await supabase
          .from("prototypes")
          .delete()
          .eq(
            "id",
            prototype.id
          )
          .eq(
            "user_id",
            session.user.id
          );

      if (error) {
        throw error;
      }

      setPrototypes(
        current =>
          current.filter(
            item =>
              item.id !==
              prototype.id
          )
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to delete this prototype.";

      Alert.alert(
        "Unable to delete",
        message
      );
    }
  }

  function formatDate(
    createdAt: string
  ) {
    return new Date(
      createdAt
    ).toLocaleDateString(
      undefined,
      {
        month: "short",

        day: "numeric",

        year: "numeric",
      }
    );
  }

  if (isLoading) {
    return (
      <SafeAreaView
        style={styles.safe}
      >
        <View
          style={
            styles.loadingContainer
          }
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
            Loading prototypes...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

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
          YOUR PROJECTS
        </Text>

        <Text style={styles.title}>
          Saved Prototypes
        </Text>

        <Text
          style={
            styles.description
          }
        >
          Reopen your saved
          website, mobile, and
          blog designs.
        </Text>

        {prototypes.length ===
        0 ? (
          <View
            style={
              styles.emptyCard
            }
          >
            <Text
              style={
                styles.emptyTitle
              }
            >
              No saved prototypes
            </Text>

            <Text
              style={
                styles.emptyDescription
              }
            >
              Generate a prototype
              and tap Save
              prototype to see it
              here.
            </Text>
          </View>
        ) : (
          prototypes.map(
            prototype => (
              <Pressable
                key={
                  prototype.id
                }
                onPress={() =>
                  openPrototype(
                    prototype
                  )
                }
                style={({
                  pressed,
                }) => [
                  styles.card,

                  pressed &&
                    styles.pressed,
                ]}
              >
                <View
                  style={
                    styles.cardHeader
                  }
                >
                  <View
                    style={
                      styles.typeBadge
                    }
                  >
                    <Text
                      style={
                        styles.typeText
                      }
                    >
                      {prototype.prototype_type.toUpperCase()}
                    </Text>
                  </View>

                  <Pressable
                    hitSlop={12}
                    onPress={event => {
                      event.stopPropagation();

                      confirmDelete(
                        prototype
                      );
                    }}
                  >
                    <Text
                      style={
                        styles.deleteText
                      }
                    >
                      Delete
                    </Text>
                  </Pressable>
                </View>

                <Text
                  style={
                    styles.cardTitle
                  }
                >
                  {prototype.name}
                </Text>

                <Text
                  style={
                    styles.cardStyle
                  }
                >
                  {
                    prototype
                      .analysis
                      .uiStyle
                      .visualStyle
                  }
                </Text>

                <Text
                  style={
                    styles.cardDate
                  }
                >
                  Saved{" "}
                  {formatDate(
                    prototype.created_at
                  )}
                </Text>
              </Pressable>
            )
          )
        )}
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

    loadingContainer: {
      flex: 1,

      alignItems: "center",

      justifyContent:
        "center",
    },

    loadingText: {
      marginTop: 14,

      color:
        APP_COLORS.textMuted,
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

      marginBottom: 28,

      lineHeight: 20,

      color:
        APP_COLORS.textMuted,
    },

    card: {
      padding: 20,

      marginBottom: 14,

      borderRadius: 20,

      backgroundColor:
        APP_COLORS.surface,

      borderWidth: 1,

      borderColor:
        APP_COLORS.border,
    },

    pressed: {
      opacity: 0.8,
    },

    cardHeader: {
      flexDirection: "row",

      alignItems: "center",

      justifyContent:
        "space-between",
    },

    typeBadge: {
      paddingHorizontal: 10,

      paddingVertical: 5,

      borderRadius: 8,

      backgroundColor:
        APP_COLORS.powderBlush,
    },

    typeText: {
      fontSize: 9,

      fontWeight: "800",

      letterSpacing: 1,

      color:
        APP_COLORS.darkAmethyst,
    },

    deleteText: {
      fontSize: 12,

      fontWeight: "700",

      color:
        APP_COLORS.pacificCyan,
    },

    cardTitle: {
      marginTop: 15,

      fontSize: 20,

      fontWeight: "800",

      color:
        APP_COLORS.darkAmethyst,
    },

    cardStyle: {
      marginTop: 6,

      fontSize: 14,

      color:
        APP_COLORS.textMuted,
    },

    cardDate: {
      marginTop: 14,

      fontSize: 11,

      color:
        APP_COLORS.textMuted,
    },

    emptyCard: {
      alignItems: "center",

      padding: 28,

      borderRadius: 20,

      backgroundColor:
        APP_COLORS.surface,

      borderWidth: 1,

      borderColor:
        APP_COLORS.border,
    },

    emptyTitle: {
      fontSize: 18,

      fontWeight: "800",

      color:
        APP_COLORS.darkAmethyst,
    },

    emptyDescription: {
      marginTop: 8,

      textAlign: "center",

      lineHeight: 20,

      color:
        APP_COLORS.textMuted,
    },
  });