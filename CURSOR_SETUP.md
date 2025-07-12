# 🚀 How to Run InnerAI in Cursor

## Step 1: Open Terminal in Cursor
1. **Open Cursor** (make sure you have the project folder open)
2. **Open Terminal** by either:
   - Press `Ctrl + ` (backtick key)` 
   - Or go to **View** → **Terminal**
   - Or press `Ctrl + Shift + P` and type "Terminal: Create New Terminal"

## Step 2: Navigate to Project Directory
In the terminal, make sure you're in the right folder:
```bash
# Check if you're in the right directory
ls
```
You should see files like `package.json`, `src/`, `public/`, etc.

## Step 3: Start the Development Server
Since you already installed dependencies, just run:
```bash
npm run dev
```

## Step 4: Open in Browser
After running the command, you'll see output like:
```
  VITE v5.4.2  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

**Click on the URL** `http://localhost:5173/` or:
- Hold `Ctrl` and click the link in the terminal
- Or manually open your browser and go to `http://localhost:5173/`

## 🎉 That's It!
Your InnerAI app should now be running! You can:
- ✅ Chat with the AI companion
- ✅ Try the breathing exercises
- ✅ Use the music player
- ✅ Write in the journal
- ✅ Check out the new **About Us** page!

## 🔧 Troubleshooting

### If you get "command not found" error:
```bash
# Make sure Node.js is installed
node --version
npm --version
```

### If port 5173 is busy:
The app will automatically use a different port (like 5174, 5175, etc.)

### To stop the server:
Press `Ctrl + C` in the terminal

## 🌟 New Feature Alert!
I just added a beautiful **About Us** page! Once the app is running, click the "About" button in the header to see:
- Team member profiles
- Technology information
- Mission & vision
- Feature showcase
- And much more!