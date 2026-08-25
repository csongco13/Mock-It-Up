import "react-native-url-polyfill/auto";
import "expo-sqlite/localStorage/install";

import {
  createClient,
} from "@supabase/supabase-js";

const supabaseUrl =
  process.env.EXPO_PUBLIC_SUPABASE_URL;

const supabasePublishableKey =
  process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl) {
  throw new Error(
    "Missing EXPO_PUBLIC_SUPABASE_URL"
  );
}

if (!supabasePublishableKey) {
  throw new Error(
    "Missing EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY"
  );
}

export const supabase =
  createClient(
    supabaseUrl,
    supabasePublishableKey,
    {
      auth: {
        storage: localStorage,

        autoRefreshToken: true,

        persistSession: true,

        detectSessionInUrl: false,
      },
    }
  );

export async function ensureSession() {
  const { data: { session }, error:sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) { throw sessionError; }

  if (session) { return session; }

  const {data,error,
  } = await supabase.auth.signInAnonymously();

  if (error) { throw error; }

  if(!data.session){
    throw new Error("Supabase was not able to create a user session")
  }

  return data.session;
}