# Appwrite Configuration for Vercel Deployment

## 🚨 Critical: Fix Image Access Issues

Your images aren't loading on Vercel because of CORS and permissions. Follow these steps **exactly**:

---

## Step 1: Configure Platform (CORS) Settings

1. Go to **Appwrite Console**: https://cloud.appwrite.io/console
2. Select your project: `ScribeSpace`
3. Click **Settings** (gear icon on left sidebar)
4. Scroll to **Platforms** section
5. Click **Add Platform** → Select **Web App**
6. Configure:
   - **Name**: `Vercel Production`
   - **Hostname**: `your-project-name.vercel.app` (replace with your actual Vercel URL)
   - Example: `scribespace.vercel.app`
   
7. Click **Add Platform** again for custom domain if you have one
8. Also add for local testing:
   - **Name**: `Localhost`
   - **Hostname**: `localhost`

> ⚠️ **Important**: Do NOT include `https://` or `http://` - just the hostname!

---

## Step 2: Configure Storage Bucket Permissions

### Option A: Public Read Access (Recommended for blog images)

1. Go to **Storage** in left sidebar
2. Click on your bucket (ID: `66c0a5dd000977227135`)
3. Click **Settings** tab
4. Scroll to **Permissions**
5. Under **Read access**, ensure one of these is set:
   
   **Method 1 - Any (Public):**
   - Click **Add Role**
   - Select **Any** → **Read**
   - This makes all images publicly readable

   **Method 2 - Users (Authenticated):**
   - If you want only logged-in users to see images:
   - Add role: **Any authenticated user** → **Read**

6. Click **Update**

### Option B: File-Level Permissions (More Control)

If you need different permissions per file:
1. When uploading files via `uploadFile()`, add permissions parameter
2. Update your `uploadFile` method (I'll do this in the next step)

---

## Step 3: Verify Bucket Settings

1. In **Storage** → Your bucket → **Settings**
2. Check these settings:
   - **Maximum File Size**: At least `10MB` (for images)
   - **Allowed File Extensions**: Include `jpg, jpeg, png, gif, webp` or leave empty for all
   - **Enabled**: Must be **ON** (green toggle)

---

## Step 4: Test Image URLs Manually

To verify the fix, test an image URL directly:

1. Get a file ID from one of your posts in the database
2. Open this URL in browser (replace placeholders):
   ```
   https://cloud.appwrite.io/v1/storage/buckets/66c0a5dd000977227135/files/YOUR_FILE_ID/preview?project=66c0a2f90015507cb2c9
   ```

3. If you see the image → ✅ Permissions are correct
4. If you get error:
   - **401 Unauthorized** → Bucket permissions not set correctly
   - **404 Not Found** → File ID doesn't exist
   - **CORS error** → Platform not configured

---

## Step 5: Update Appwrite SDK Version (If Needed)

Ensure you're using the latest Appwrite SDK:

```bash
npm install appwrite@latest
```

Current version in your project: `15.0.0` (should be fine)

---

## Step 6: Add File Upload Permissions (Optional)

If you want to set permissions when uploading files:

Update the `uploadFile` method to include read permissions:

```javascript
async uploadFile(file) {
    try {
        const result = await this.bucket.createFile(
            conf.appwriteBucketID,
            ID.unique(),
            file,
            ['read("any")'] // Add this line - allows anyone to read
        );
        console.log("File uploaded successfully");
        return result;
    } catch (error) {
        console.log("Appwrite Services :: uploadFile():: error", error);
        return false;
    }
}
```

---

## Troubleshooting Checklist

### ✅ Verify these in Appwrite Console:

- [ ] Platform added with Vercel hostname (no https://)
- [ ] Bucket has "Any" read permission OR "Users" read permission
- [ ] Bucket is enabled (green toggle)
- [ ] Maximum file size is adequate
- [ ] No file extension restrictions blocking your images

### ✅ Verify these in your code:

- [ ] Environment variables are set in Vercel (VITE_APPWRITE_*)
- [ ] `getFilePreview()` and `getFileView()` return valid URLs
- [ ] Console shows no CORS errors
- [ ] Image URLs return 200 OK (check Network tab)

### ✅ Common Error Messages:

| Error | Solution |
|-------|----------|
| `401 Unauthorized` | Add "Any" read permission to bucket |
| `404 Not Found` | File doesn't exist or wrong file ID |
| `CORS policy blocked` | Add platform with Vercel hostname |
| `Failed to fetch` | Check network tab for actual error |
| Image shows broken | URL might be wrong format |

---

## Quick Test After Setup

1. Push the code changes I just made
2. Let Vercel redeploy
3. Open your deployed site
4. Open DevTools → Network tab
5. Navigate to a page with images
6. Check image requests:
   - Should show **200 OK** status
   - URL should start with `https://cloud.appwrite.io/v1/storage/buckets/`
   - Should include `?project=66c0a2f90015507cb2c9`

---

## Screenshot Guide

### Where to find Platform settings:
```
Appwrite Console → Your Project → Settings → Platforms → Add Platform
```

### Where to find Bucket permissions:
```
Appwrite Console → Storage → Your Bucket → Settings → Permissions
```

---

## Need Help?

If images still don't load after following all steps:

1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for errors starting with "Appwrite Services"
4. Check Network tab for failed image requests
5. Share the error message and HTTP status code

The fix I just applied ensures:
- ✅ Proper URL generation (with fallback)
- ✅ Better error logging
- ✅ WebP format for faster loading
- ✅ Proper width/height parameters
- ✅ Works even if SDK fails
