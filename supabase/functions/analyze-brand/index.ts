const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const brandSchema = {
  type: "object",

  properties: {
    name: {
      type: "string",
    },

    summary: {
      type: "string",
    },

    mood: {
      type: "array",
      minItems: 4,
      maxItems: 4,

      items: {
        type: "string",
      },
    },

    palette: {
      type: "array",
      minItems: 5,
      maxItems: 5,

      items: {
        type: "object",

        properties: {
          name: {
            type: "string",
          },

          role: {
            type: "string",
            enum: [
              "primary",
              "secondary",
              "accent",
              "background",
              "text",
            ],
          },

          red: {
            type: "integer",
            minimum: 0,
            maximum: 255,
          },

          green: {
            type: "integer",
            minimum: 0,
            maximum: 255,
          },

          blue: {
            type: "integer",
            minimum: 0,
            maximum: 255,
          },

          reason: {
            type: "string",
          },
        },

        required: [
          "name",
          "role",
          "red",
          "green",
          "blue",
          "reason",
        ],
      },
    },

    typography: {
      type: "object",

      properties: {
        headingStyle: {
          type: "string",
        },

        bodyStyle: {
          type: "string",
        },

        description: {
          type: "string",
        },
      },

      required: [
        "headingStyle",
        "bodyStyle",
        "description",
      ],
    },

    uiStyle: {
      type: "object",

      properties: {
        borderRadius: {
          type: "string",
          enum: [
            "small",
            "medium",
            "large",
          ],
        },

        spacing: {
          type: "string",
          enum: [
            "compact",
            "balanced",
            "spacious",
          ],
        },

        visualStyle: {
          type: "string",
        },

        buttonStyle: {
          type: "string",
        },

        cardStyle: {
          type: "string",
        },
      },

      required: [
        "borderRadius",
        "spacing",
        "visualStyle",
        "buttonStyle",
        "cardStyle",
      ],
    },

    copy: {
      type: "object",

      properties: {
        brandName: {
          type: "string",
        },

        headline: {
          type: "string",
        },

        subheadline: {
          type: "string",
        },

        primaryCta: {
          type: "string",
        },

        featureOne: {
          type: "string",
        },

        featureTwo: {
          type: "string",
        },

        featureThree: {
          type: "string",
        },

        articleOne: {
          type: "string",
        },

        articleTwo: {
          type: "string",
        },

        articleThree: {
          type: "string",
        },
      },

      required: [
        "brandName",
        "headline",
        "subheadline",
        "primaryCta",
        "featureOne",
        "featureTwo",
        "featureThree",
        "articleOne",
        "articleTwo",
        "articleThree",
      ],
    },
  },

  required: [
    "name",
    "summary",
    "mood",
    "palette",
    "typography",
    "uiStyle",
    "copy",
  ],
};

Deno.serve(async (request: Request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  try {
    console.log("analyze-brand called");

    const geminiApiKey =
      Deno.env.get("GEMINI_API_KEY");

    if (!geminiApiKey) {
      console.error(
        "GEMINI_API_KEY missing"
      );

      return new Response(
        JSON.stringify({
          error:
            "GEMINI_API_KEY is missing.",
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type":
              "application/json",
          },
        }
      );
    }

    const {
      imageBase64,
      mimeType = "image/jpeg",
    } = await request.json();

    if (!imageBase64) {
      return new Response(
        JSON.stringify({
          error:
            "Image data is required.",
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type":
              "application/json",
          },
        }
      );
    }

    console.log(
      "Image received:",
      mimeType,
      imageBase64.length
    );

    const prompt = `
You are the visual design intelligence engine for an application called MockITUp.

Analyze the uploaded image or moodboard.

Create a usable design system inspired by the image.

You must:

1. Identify the overall visual aesthetic.
2. Return exactly four mood words.
3. Create exactly five colors based on the uploaded image.
4. Give exactly one color each of these roles:
   primary
   secondary
   accent
   background
   text
5. RGB values must be integers from 0 to 255.
6. Ensure the text color contrasts well with the background color.
7. Recommend a typography direction.
8. Recommend UI characteristics including buttons, cards, spacing, and border radius.
9. Generate short fictional example copy that can be used to preview a website, mobile app, and blog.

Do not copy visible company names, logos, or trademarks from the uploaded image.

The example brand name must be fictional.

Keep all generated UI copy concise.
    `.trim();

    const geminiResponse =
      await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            "x-goog-api-key":
              geminiApiKey,
          },

          body: JSON.stringify({
            contents: [
              {
                role: "user",

                parts: [
                  {
                    text: prompt,
                  },

                  {
                    inlineData: {
                      mimeType,
                      data: imageBase64,
                    },
                  },
                ],
              },
            ],

            generationConfig: {
              responseMimeType:
                "application/json",

              responseJsonSchema:
                brandSchema,

              temperature: 0.7,
            },
          }),
        }
      );

    const rawText =
      await geminiResponse.text();

    console.log(
      "Gemini status:",
      geminiResponse.status
    );

    if (!geminiResponse.ok) {
      console.error(
        "Gemini error:",
        rawText
      );

      return new Response(
        JSON.stringify({
          error:
            "Gemini request failed.",
          details: rawText,
        }),
        {
          status: 500,

          headers: {
            ...corsHeaders,

            "Content-Type":
              "application/json",
          },
        }
      );
    }

    const geminiData =
      JSON.parse(rawText);

    const responseText =
      geminiData
        ?.candidates?.[0]
        ?.content
        ?.parts?.[0]
        ?.text;

    if (!responseText) {
      console.error(
        "Full Gemini response:",
        JSON.stringify(
          geminiData
        )
      );

      throw new Error(
        "Gemini returned no analysis."
      );
    }

    const analysis =
      JSON.parse(responseText);

    console.log(
      "Analysis generated:",
      analysis.name
    );

    return new Response(
      JSON.stringify(analysis),
      {
        status: 200,

        headers: {
          ...corsHeaders,

          "Content-Type":
            "application/json",
        },
      }
    );
  } catch (error) {
    console.error(
      "analyze-brand error:",
      error
    );

    return new Response(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      }),
      {
        status: 500,

        headers: {
          ...corsHeaders,

          "Content-Type":
            "application/json",
        },
      }
    );
  }
});