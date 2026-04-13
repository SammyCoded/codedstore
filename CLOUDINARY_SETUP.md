# Cloudinary Setup Instructions

To use Cloudinary for image uploads in your marketplace, follow these steps:

## 1. Create a Cloudinary Account
1. Go to [cloudinary.com](https://cloudinary.com) and sign up for a free account
2. Once logged in, go to your Dashboard

## 2. Get Your Credentials
In your Cloudinary Dashboard, you'll find:
- **Cloud Name**: Your unique cloud name (e.g., `dxyz12345`)
- **API Key**: Your API key (e.g., `123456789012345`)
- **API Secret**: Your API secret (keep this secure!)

## 3. Update Environment Variables
In your `backend/.env` file, replace the placeholder values:

```
CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
CLOUDINARY_API_KEY=your_actual_api_key
CLOUDINARY_API_SECRET=your_actual_api_secret
```

## 4. Test the Integration
1. Start your backend server: `npm run dev`
2. Start your frontend: `npm run dev`
3. Go to `/marketplace`
4. Log in and try uploading an item with an image

## Features
- Images are automatically uploaded to Cloudinary
- Images are optimized (800x600 max, auto quality)
- Secure URLs are stored in MongoDB
- Images are displayed in the marketplace grid

## Security Notes
- Never commit your `.env` file to version control
- Keep your Cloudinary API Secret secure
- The upload is restricted to image files only (5MB max)