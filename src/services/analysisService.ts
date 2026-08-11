import {
  FunctionsHttpError,
} from "@supabase/supabase-js";

import {
  supabase,
  ensureSession,
} from "../lib/supabase";

import {
  BrandAnalysis,
} from "../types/brand";

export async function analyzeImage(
  imageBase64: string,
  mimeType: string
): Promise<BrandAnalysis> {
  await ensureSession();

  const {
    data,
    error,
  } = await supabase.functions.invoke(
    "analyze-brand",
    {
      body: {
        imageBase64,
        mimeType,
      },
    }
  );

  if (error) {
    console.error(
      "Function error:",
      error
    );

    if (
      error instanceof
      FunctionsHttpError
    ) {
      try {
        const errorBody =
          await error.context.json();

        console.error(
          "EDGE FUNCTION RESPONSE:",
          JSON.stringify(
            errorBody,
            null,
            2
          )
        );

        throw new Error(
          errorBody?.error ||
            errorBody?.details ||
            "Edge Function failed."
        );
      } catch (
        parseError
      ) {
        console.error(
          "Could not parse Edge Function error:",
          parseError
        );

        throw new Error(
          "Edge Function returned an error."
        );
      }
    }

    throw new Error(
      error.message ||
        "Unable to analyze your image."
    );
  }

  if (!data) {
    throw new Error(
      "No analysis was returned."
    );
  }

  if (data.error) {
    console.error(
      "AI response error:",
      data
    );

    throw new Error(
      data.error
    );
  }

  return data as BrandAnalysis;
}