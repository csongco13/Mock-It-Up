# Mock It Up: Upload any image, make it your brand
## Description

MockITUp is an AI-powered design prototyping mobile and web app that turns any image you captured or any image you upload into a website prototype, mobile prototype, blog prototype, and many more. Users can upload a photo or moodboard, and MockITUp analyzes the image to generate a color palette, visual mood, typography and font schemes, UI styling, and sample brand content.


### Frontend
- React Native for the mobile application interface
- Expo for development, device testing, and iOS/Android tooling
- TypeScript for type-safe application development
- React Navigation for screen navigation and the prototype workflow
- Expo Image Picker for camera and photo-library image uploads
- React Native StyleSheet for dynamic UI and prototype styling
### Backend
- Supabase as the backend platform
- Supabase Authentication for anonymous user sessions
- Supabase Edge Functions for secure server-side AI requests
- PostgreSQL for planned storage of users, projects, palettes, and generated designs
- Supabase Storage for planned storage of uploaded moodboards and project assets
### AI
- Google Gemini API
- Gemini Flash for multimodal image and moodboard analysis
- Structured JSON output for converting AI analysis into predictable design-system data

#### Gemini analyzes:

- Palette Choice
- Images and its aesthetics
- typography direction
- UI styling
- spacing and border-radius recommendations
- sample brand copy
