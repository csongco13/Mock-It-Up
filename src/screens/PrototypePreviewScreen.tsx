import React,{useState,} from "react";

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
  Modal,
  Pressable,
  TextInput,
} from "react-native";

import {
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import {
  RootStackParamList,
} from "../navigation/AppNavigator";

import {
  APP_COLORS,
} from "../constants/colors";

import{ensureSession, supabase,} from "../lib/supabase"

import WebsitePrototype from "../components/WebsitePrototype";
import MobilePrototype from "../components/MobilePrototype";
import BlogPrototype from "../components/BlogPrototype";
import BrandButton from "../components/BrandButton";

type Props =
  NativeStackScreenProps<
    RootStackParamList,
    "PrototypePreview"
  >;

export default function PrototypePreviewScreen({
  navigation, route,
}: Props) {
  const { analysis, prototypeType,
  } = route.params;

  const[ saveModalVisible, setSaveModalVisible,
  ]=useState(false);

  const[ prototypeName, setPrototypeName,
  ]=useState( analysis.name || "" );

  const[isSaving,setIsSaving,]=useState(false);    

  async function savePrototype(){
    const trimmedName= prototypeName.trim();

    if(!trimmedName){
      Alert.alert("Can't save unnamed", 
      "Please enter a name for your saved prototype."
      ); return; 
    }

    if(isSaving){return;}

    setIsSaving(true);

    try{
      const session = await ensureSession();
      
      if(!session){throw new Error("Unable to create a user session.");}

      const {error,}=await supabase.from("prototypes")
        .insert({user_id: session.user.id,
                name: trimmedName,
                prototype_type:prototypeType,
                analysis,
        });
      if (error){throw error;}

      setSaveModalVisible(false);

      Alert.alert(
        "Prototype saved",
        `"${trimmedName}" was saved successfully.`
      );

    }catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while saving your prototype.";

      Alert.alert("Unable to save", message);
    } finally {setIsSaving(false);}
  }

  const title =
    prototypeType === "website"
      ? "Website Prototype"
      : prototypeType ===
        "mobile"
      ? "Mobile Prototype"
      : "Blog Prototype";

  return (
    <SafeAreaView
      style={styles.safe}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={styles.eyebrow}
        >
          GENERATED PROTOTYPE
        </Text>

        <Text style={styles.title}>
          {title}
        </Text>

        <Text
          style={
            styles.description
          }
        >
          Built from your{" "}{analysis.name} moodboard/image analysis.
        </Text>
        <View
          style={
            styles.previewStage
          }
        >
          {prototypeType ===
            "website" && (
            <WebsitePrototype
              analysis={
                analysis
              }
            />
          )}

          {prototypeType ===
            "mobile" && (
            <MobilePrototype
              analysis={
                analysis
              }
            />
          )}

          {prototypeType ===
            "blog" && (
            <BlogPrototype
              analysis={
                analysis
              }
            />
          )}
        </View>

        <View
          style={
            styles.details
          }
        >
          <Text
            style={
              styles.detailsLabel
            }
          >
            DESIGN ANALYSIS
          </Text>

          <Text
            style={
              styles.detailsTitle
            }
          >
            {
              analysis.uiStyle
                .visualStyle
            }
          </Text>

          <Text
            style={
              styles.detailsBody
            }
          >
            {
              analysis.typography
                .description
            }
          </Text>
        </View>

        <BrandButton
          title="Try another prototype"
          style={{
            marginTop: 24,
          }}
          onPress={() =>
            navigation.goBack()
          }
        />
        
        <Pressable
          style={({ pressed }) => [
            styles.savePrototypeButton,

            pressed &&
              styles.savePrototypeButtonPressed,
          ]}
          onPress={() =>
            setSaveModalVisible(
              true
            )
          }
        >
          <Text
            style={
              styles.savePrototypeButtonText
            }
          >
            Save Prototype
          </Text>
        </Pressable>  
        <BrandButton
          title="Start new project"
          variant="secondary"
          style={{
            marginTop: 12,
          }}
          onPress={() =>
            navigation.popToTop()
          }
        />
      </ScrollView>

      <Modal
        visible={
          saveModalVisible
        }
        transparent
        animationType="fade"
        onRequestClose={() =>
          setSaveModalVisible(
            false
          )
        }
      >
        <View
          style={
            styles.modalOverlay
          }
        >
          <View
            style={
              styles.modalCard
            }
          >
            <Text
              style={
                styles.modalTitle
              }
            >
              Save Prototype
            </Text>

            <Text
              style={
                styles.modalDescription
              }
            >
              Give your prototype
              a name.
            </Text>

            <TextInput
              value={
                prototypeName
              }
              onChangeText={
                setPrototypeName
              }
              placeholder="Prototype name"
              placeholderTextColor={
                APP_COLORS.textMuted
              }
              style={
                styles.nameInput
              }
              autoFocus
              maxLength={60}
              returnKeyType="done"
              onSubmitEditing={
                savePrototype
              }
            />

            <View
              style={
                styles.modalActions
              }
            >
              <Pressable
                style={
                  styles.cancelButton
                }
                disabled={
                  isSaving
                }
                onPress={() =>
                  setSaveModalVisible(
                    false
                  )
                }
              >
                <Text
                  style={
                    styles.cancelButtonText
                  }
                >
                  Cancel
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.confirmButton,

                  isSaving &&
                    styles.savingButton,
                ]}
                disabled={
                  isSaving
                }
                onPress={
                  savePrototype
                }
              >
                <Text
                  style={
                    styles.confirmButtonText
                  }
                >
                  {isSaving
                    ? "Saving..."
                    : "Save"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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

      color:
        APP_COLORS.textMuted,
    },

    previewStage: {
      marginTop: 28,

      padding: 14,

      borderRadius: 12,

      backgroundColor:
        APP_COLORS.surface,

      borderWidth: 1,

      borderColor:
        APP_COLORS.border,
    },

    details: {
      marginTop: 24,

      padding: 21,

      borderRadius: 12,

      backgroundColor:
        APP_COLORS.mutedTeal,
    },

    detailsLabel: {
      fontSize: 10,

      fontWeight: "800",

      letterSpacing: 1.5,

      color:
        APP_COLORS.darkAmethyst,
    },

    detailsTitle: {
      marginTop: 8,

      fontSize: 21,

      fontWeight: "800",

      color:
        APP_COLORS.darkAmethyst,
    },

    detailsBody: {
      marginTop: 9,

      lineHeight: 20,

      color:
        APP_COLORS.darkAmethyst,
    },
    savePrototypeButton: {
      marginTop: 12,

      paddingVertical: 15,

      paddingHorizontal: 24,

      alignItems: "center",

      justifyContent: "center",

      borderRadius: 12,

      backgroundColor:
        APP_COLORS.textMuted,
    },

    savePrototypeButtonPressed: {
      opacity: 0.8,
    },

    savePrototypeButtonText: {
      fontSize: 15,

      fontWeight: "700",

      color:
        APP_COLORS.surface,
    },
    modalOverlay: {
      flex: 1,

      alignItems: "center",

      justifyContent:
        "center",

      padding: 24,

      backgroundColor:
        "rgba(0, 0, 0, 0.45)",
    },

    modalCard: {
      width: "100%",

      padding: 22,

      borderRadius: 22,

      backgroundColor:
        APP_COLORS.surface,
    },

    modalTitle: {
      fontSize: 22,

      fontWeight: "800",

      color:
        APP_COLORS.darkAmethyst,
    },

    modalDescription: {
      marginTop: 6,

      fontSize: 14,

      color:
        APP_COLORS.textMuted,
    },

    nameInput: {
      marginTop: 20,

      paddingHorizontal: 15,

      paddingVertical: 13,

      borderWidth: 1,

      borderRadius: 12,

      borderColor:
        APP_COLORS.border,

      fontSize: 16,

      color:
        APP_COLORS.darkAmethyst,

      backgroundColor:
        APP_COLORS.background,
    },

    modalActions: {
      flexDirection: "row",

      justifyContent:
        "flex-end",

      marginTop: 20,

      gap: 12,
    },

    cancelButton: {
      paddingHorizontal: 18,

      paddingVertical: 12,

      borderRadius: 12,

      borderWidth: 1,

      borderColor:
        APP_COLORS.border,
    },

    cancelButtonText: {
      fontSize: 14,

      fontWeight: "700",

      color:
        APP_COLORS.textMuted,
    },

    confirmButton: {
      paddingHorizontal: 22,

      paddingVertical: 12,

      borderRadius: 12,

      backgroundColor:
        APP_COLORS.darkAmethyst,
    },

    confirmButtonText: {
      fontSize: 14,

      fontWeight: "700",

      color:
        APP_COLORS.surface,
    },

    savingButton: {
      opacity: 0.6,
    },
  });