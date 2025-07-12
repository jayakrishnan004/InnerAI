# 🎵 **Complete Spotify Setup Guide - Security Fixed**

## **Step 1: Create Spotify Developer Account**
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click **"Create App"**

## **Step 2: Configure Your Spotify App (IMPORTANT - Security Fix)**

Fill in the app details:
- **App Name**: `InnerAI Music Therapy`
- **App Description**: `Mental health music therapy integration with emotion-based recommendations`
- **Website**: `http://localhost:5173` (for development)
- **Redirect URIs**: 
  ```
  http://localhost:5173/callback
  https://localhost:5173/callback
  ```
  ⚠️ **Add BOTH HTTP and HTTPS versions**

- **Which API/SDKs are you planning to use?**: Check **Web API**

## **Step 3: Accept the Security Warning**

When you see "This redirect URI is not secure":
1. ✅ **This is NORMAL for development**
2. ✅ **Click "I understand" or "Accept"**
3. ✅ **Spotify allows localhost for development purposes**
4. ✅ **For production, you'll use HTTPS domains**

## **Step 4: Get Your Credentials**
After creating the app:
1. Click on your newly created app
2. Go to **"Settings"**
3. Copy your **Client ID** and **Client Secret**
4. Keep these safe!

## **Step 5: Add Credentials to Your Project**

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open the `.env` file and add your Spotify credentials:
   ```env
   # Spotify Integration
   VITE_SPOTIFY_CLIENT_ID=your_actual_client_id_here
   VITE_SPOTIFY_CLIENT_SECRET=your_actual_client_secret_here
   ```

## **Step 6: Restart Your Development Server**
```bash
npm run dev
```

## **Step 7: Test Spotify Integration**
1. Open your app in the browser
2. Click the **Music** button in the header
3. Select **"Spotify"** from the categories
4. You should see emotion-based music recommendations!

---

## 🔒 **Security Notes:**

### **Why the Warning Appears:**
- Spotify prefers HTTPS for security
- `http://localhost` is allowed for development
- The warning is just a reminder, not an error

### **For Production Deployment:**
When you deploy your app, use HTTPS redirect URIs:
```
https://yourdomain.com/callback
https://yourapp.netlify.app/callback
```

### **Development vs Production:**
- **Development**: `http://localhost:5173` ✅ (allowed)
- **Production**: `https://yourdomain.com` ✅ (required)

---

## ✅ **What You'll Get After Setup:**

- **🧠 Emotion-Based Recommendations**: AI analyzes your mood and finds perfect Spotify tracks
- **🎧 Curated Playlists**: Professional therapeutic playlists from Spotify
- **🔍 Search Function**: Find any song, artist, or album
- **🎵 Audio Feature Matching**: Uses Spotify's audio analysis to match music to your emotional state
- **🌟 Real-Time Adaptation**: Recommendations update as your emotional state changes

## 🔧 **Troubleshooting:**

### **"Redirect URI not secure" Warning:**
- ✅ **Normal for development** - click "Accept"
- ✅ **Add both HTTP and HTTPS versions** in Spotify settings
- ✅ **Use HTTPS for production deployment**

### **"Invalid client" Error:**
- ❌ Check your Client ID is correct
- ❌ Ensure no extra spaces in .env file
- ❌ Restart dev server after adding credentials

### **"Authentication failed":**
- ❌ Verify Client Secret is correct
- ❌ Check Spotify app is not in restricted mode
- ❌ Ensure redirect URIs match exactly

### **No music recommendations:**
- ❌ Check internet connection
- ❌ Verify Spotify API limits not exceeded
- ❌ Try refreshing the page

---

## 🚀 **Ready to Go!**

Once you complete these steps and accept the security warning, you'll have full Spotify integration with emotion-based music therapy recommendations! 

The security warning is just Spotify being cautious - your development setup is perfectly safe! 🎉🎵