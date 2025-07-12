# 🎵 **Spotify Integration Troubleshooting Guide**

## **Step 1: Check Your .env File**

Make sure your `.env` file exists in the root directory and contains:

```env
# Spotify Integration (for music therapy)
VITE_SPOTIFY_CLIENT_ID=your_actual_client_id_here
VITE_SPOTIFY_CLIENT_SECRET=your_actual_client_secret_here
```

**Important:**
- ✅ **No quotes** around the values
- ✅ **No spaces** around the = sign
- ✅ **Replace** `your_actual_client_id_here` with your real Client ID
- ✅ **Replace** `your_actual_client_secret_here` with your real Client Secret

## **Step 2: Verify Your Spotify Credentials**

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Click on your app
3. Go to **Settings**
4. Copy your **Client ID** and **Client Secret**
5. Make sure they're exactly the same in your `.env` file

## **Step 3: Check Browser Console**

1. Open your browser's Developer Tools (F12)
2. Go to the **Console** tab
3. Look for Spotify-related messages:
   - ✅ `"Spotify service configured successfully"`
   - ❌ `"VITE_SPOTIFY_CLIENT_ID not found"`
   - ❌ `"Invalid Spotify credentials"`

## **Step 4: Restart Development Server**

After updating your `.env` file:

```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

## **Step 5: Test the Integration**

1. Open your app
2. Click **Music** in the header
3. Select **Spotify** from the categories
4. Check the browser console for detailed error messages

## **Common Issues & Solutions:**

### **Issue: "Client ID not found"**
**Solution:** Add `VITE_SPOTIFY_CLIENT_ID=your_client_id` to `.env`

### **Issue: "Invalid credentials"**
**Solution:** Double-check your Client ID and Secret are correct

### **Issue: "400 Bad Request"**
**Solution:** Your credentials are wrong or malformed

### **Issue: "429 Too Many Requests"**
**Solution:** Wait a few minutes and try again

### **Issue: Still not working?**
**Solution:** 
1. Delete your `.env` file
2. Copy `.env.example` to `.env`
3. Add your real credentials
4. Restart the server

## **Debug Information**

Open the browser console and look for:
```
🎵 Spotify Service Initialization:
- Client ID present: true/false
- Client Secret present: true/false
- Client ID length: [number]
- Client Secret length: [number]
```

**Expected values:**
- Client ID length: ~32 characters
- Client Secret length: ~32 characters

## **Still Having Issues?**

1. **Check your Spotify app status** - Make sure it's not in "Development Mode"
2. **Verify redirect URIs** - Add `http://localhost:5173/callback`
3. **Check rate limits** - Spotify limits API calls
4. **Try a different browser** - Clear cache and cookies

## **Test Your Credentials Manually:**

You can test your credentials with this curl command:

```bash
curl -X POST "https://accounts.spotify.com/api/token" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -H "Authorization: Basic $(echo -n 'CLIENT_ID:CLIENT_SECRET' | base64)" \
     -d "grant_type=client_credentials"
```

Replace `CLIENT_ID` and `CLIENT_SECRET` with your actual values.

If this returns an access token, your credentials are correct!