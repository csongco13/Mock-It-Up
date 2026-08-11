import React, {
  useEffect,
  useState,
} from "react";

import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import {
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import {
  RootStackParamList,
} from "../navigation/AppNavigator";

import {
  APP_COLORS,
} from "../constants/colors";

import BrandButton from "../components/BrandButton";

import {
  analyzeImage,
} from "../services/analysisService";

type Props =
  NativeStackScreenProps<
    RootStackParamList,
    "Upload"
  >;

interface SelectedImage {
  uri: string;
  base64: string;
  mimeType: string;
}

export default function UploadScreen({
  navigation,
  route,
}: Props) {
  const [image, setImage] =
    useState<SelectedImage | null>(
      null
    );

  const [loading, setLoading] =
    useState(false);

  const source =
    route.params.source;

  useEffect(() => {
    if (source === "camera") {
      openCamera();
    } else {
      openLibrary();
    }
  }, []);

  const handleResult = (
    result:
      ImagePicker.ImagePickerResult
  ) => {
    if (result.canceled) {
      return;
    }

    const asset =
      result.assets[0];

    if (!asset.base64) {
      Alert.alert(
        "Image error",
        "The image could not be prepared for analysis."
      );

      return;
    }

    setImage({
      uri: asset.uri,

      base64: asset.base64,

      mimeType:
        asset.mimeType ||
        "image/jpeg",
    });
  };

  const openLibrary =
    async () => {
      const permission =
        await ImagePicker
          .requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permission required",
          "MockITUp needs access to your photos."
        );

        return;
      }

      const result =
        await ImagePicker
          .launchImageLibraryAsync(
            {
              mediaTypes: [
                "images",
              ],

              base64: true,

              quality: 0.7,

              allowsEditing:
                false,
            }
          );

      handleResult(result);
    };

  const openCamera =
    async () => {
      const permission =
        await ImagePicker
          .requestCameraPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permission required",
          "MockITUp needs camera access."
        );

        return;
      }

      const result =
        await ImagePicker
          .launchCameraAsync({
            mediaTypes: [
              "images",
            ],

            base64: true,

            quality: 0.7,

            allowsEditing:
              false,
          });

      handleResult(result);
    };

  const analyze =
    async () => {
      if (!image) {
        return;
      }

      try {
        setLoading(true);

        const analysis =
          await analyzeImage(
            image.base64,
            image.mimeType
          );

        navigation.replace(
          "Analysis",
          {
            imageUri:
              image.uri,

            analysis,
          }
        );
      } catch (error) {
        console.error(error);

        Alert.alert(
          "Analysis failed",
          error instanceof Error
            ? error.message
            : "Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <SafeAreaView
        style={
          styles.loading
        }
      >
        <View
          style={
            styles.aiIcon
          }
        >
          <Text
            style={
              styles.aiIconText
            }
          >
            ✦
          </Text>
        </View>

        <ActivityIndicator
          size="large"
          color={
            APP_COLORS.pacificCyan
          }
        />

        <Text
          style={
            styles.loadingTitle
          }
        >
          Studying your
          inspiration...
        </Text>

        <Text
          style={
            styles.loadingBody
          }
        >
          MockITUp is analyzing
          color, visual mood,
          typography, and interface
          direction.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={styles.safe}
    >
      <View
        style={
          styles.container
        }
      >
        <Text
          style={
            styles.eyebrow
          }
        >
          YOUR INSPIRATION
        </Text>

        <Text style={styles.title}>
          Does this look right?
        </Text>

        <Text
          style={
            styles.description
          }
        >
          We'll use this image to
          create your visual design
          system.
        </Text>

        <View
          style={
            styles.preview
          }
        >
          {image ? (
            <Image
              source={{
                uri: image.uri,
              }}
              style={
                styles.image
              }
            />
          ) : (
            <View
              style={
                styles.empty
              }
            >
              <Text
                style={
                  styles.emptyIcon
                }
              >
                ✦
              </Text>

              <Text
                style={
                  styles.emptyText
                }
              >
                Choose an image
              </Text>
            </View>
          )}
        </View>

        <BrandButton
          title="Analyze design"
          disabled={!image}
          onPress={analyze}
        />

        <BrandButton
          title="Choose another"
          variant="secondary"
          style={{
            marginTop: 12,
          }}
          onPress={
            source === "camera"
              ? openCamera
              : openLibrary
          }
        />
      </View>
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
      flex: 1,

      padding: 24,
    },

    eyebrow: {
      marginTop: 25,

      fontSize: 11,

      letterSpacing: 2,

      fontWeight: "800",

      color:
        APP_COLORS.pacificCyan,
    },

    title: {
      marginTop: 11,

      fontSize: 35,

      fontWeight: "800",

      color:
        APP_COLORS.darkAmethyst,
    },

    description: {
      marginTop: 10,

      lineHeight: 22,

      color:
        APP_COLORS.textMuted,
    },

    preview: {
      flex: 1,

      marginVertical: 28,

      overflow: "hidden",

      borderRadius: 28,

      backgroundColor:
        APP_COLORS.surface,

      borderWidth: 1,

      borderColor:
        APP_COLORS.border,
    },

    image: {
      width: "100%",

      height: "100%",

      resizeMode: "cover",
    },

    empty: {
      flex: 1,

      alignItems: "center",

      justifyContent:
        "center",
    },

    emptyIcon: {
      fontSize: 38,

      color:
        APP_COLORS.powderBlush,
    },

    emptyText: {
      marginTop: 10,

      color:
        APP_COLORS.textMuted,
    },

    loading: {
      flex: 1,

      padding: 40,

      alignItems: "center",

      justifyContent:
        "center",

      backgroundColor:
        APP_COLORS.background,
    },

    aiIcon: {
      width: 74,

      height: 74,

      marginBottom: 28,

      borderRadius: 24,

      alignItems: "center",

      justifyContent:
        "center",

      backgroundColor:
        APP_COLORS.powderBlush,
    },

    aiIconText: {
      fontSize: 34,

      color:
        APP_COLORS.darkAmethyst,
    },

    loadingTitle: {
      marginTop: 22,

      fontSize: 25,

      fontWeight: "800",

      textAlign: "center",

      color:
        APP_COLORS.darkAmethyst,
    },

    loadingBody: {
      marginTop: 10,

      textAlign: "center",

      lineHeight: 21,

      color:
        APP_COLORS.textMuted,
    },
  });