# 🚀 Quick Start - Visual Comparison Feature

## What was implemented?

A complete **Visual Image Comparison** feature that uses GPT-4 Vision AI to analyze and compare artifact images side-by-side.

## Files Changed

### ✅ New Files
- `.env` - Contains OpenAI API key

### ✅ Modified Files
1. `app.py` - Added `/api/compare/visual` endpoint
2. `ai_explainer_v2.py` - Added GPT-4 Vision integration
3. `frontend/src/components/ComparisonScreen.jsx` - Added Visual Compare button and modal
4. `requirements.txt` - Updated OpenAI to version 1.6.1

## How to Run

### 1. Install Dependencies
```bash
cd "c:\Users\basindub\Downloads\Research Project\Research Project\Basi-Component2"
pip install -r requirements.txt
```

### 2. Sync Images (Important!)
```bash
python sync_images.py
```
This copies all images from `frontend/public/images` to `static/images` so the backend can access them.

### 3. Start Backend
```bash
python app.py
```
Server runs on: `http://localhost:5000`

### 4. Start Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: `http://localhost:5173`

## How to Use

1. Open the app in your browser
2. Navigate to any artifact comparison screen
3. Click the **"Visual Compare"** button (purple/indigo with eye icon)
4. Wait 5-10 seconds for GPT-4 Vision analysis
5. View detailed visual comparison in the modal

## What You'll See

The modal displays a beautiful 5-column grid comparing both artifacts across:

- 🔵 **Shape & Form** - Silhouette, proportions, structure
- 🟣 **Color & Texture** - Palette, finish, aging
- 🔴 **Design Motifs** - Patterns, decorations, iconography  
- 🟢 **Craftsmanship** - Technique, quality, detail
- 🟡 **Overall Impression** - Aesthetic and visual impact

## Technical Details

**Backend:**
- Endpoint: `POST /api/compare/visual`
- Loads images from `static/images/`
- Encodes as base64
- Sends to GPT-4 Vision API

**Frontend:**
- React component with modal
- Loading states
- Error handling
- Responsive design

**AI Model:**
- GPT-4 Vision Preview
- High-detail image analysis
- Structured JSON output

## Troubleshooting

**"Image not found" error**
- Run `python sync_images.py` to copy images to static folder
- Verify images exist in `frontend/public/images/` folder
- Check the artifact has an image in `artifact_images.json`

**"Visual comparison failed"**
- Check OpenAI API key in `.env` file
- Verify images have been synced (run `python sync_images.py`)
- Check internet connection

**Modal won't open**
- Check browser console for errors
- Verify backend is running on port 5000
- Refresh the page

**Slow response**
- GPT-4 Vision takes 5-10 seconds (normal)
- Check network connection
- Verify OpenAI API is accessible

## API Key Configuration

The OpenAI API key is stored in:
```
Basi-Component2/.env
```

Current key is active and configured. Do not share publicly!

## Cost Estimate

GPT-4 Vision pricing:
- ~$0.01-0.02 per comparison
- Based on image size and tokens

## Next Steps

1. Test with different artifact pairs
2. Try comparing Sri Lankan vs. International artifacts
3. Use insights for research and education
4. Export comparisons for documentation

---

**✨ Feature is ready to use!**

For detailed documentation, see: `VISUAL_COMPARISON_GUIDE.md`
