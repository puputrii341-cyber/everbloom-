import fs from "fs";
import path from "path";
import sharp from "sharp";

async function run() {
  const dir = path.join(process.cwd(), "public", "images");
  if (!fs.existsSync(dir)) {
    console.error("Directory not found:", dir);
    return;
  }

  const files = fs.readdirSync(dir).filter(f => f.toLowerCase().endsWith(".png"));
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const webpPath = path.join(dir, file.replace(/\.png$/i, ".webp"));
    
    console.log(`Converting ${file}...`);
    try {
      await sharp(filePath)
        .resize(800) // Resizing to max 800px to drastically reduce the size
        .webp({ quality: 80 })
        .toFile(webpPath);
      
      console.log(`Successfully converted to ${path.basename(webpPath)}`);
      
      // Delete original PNG to save space
      fs.unlinkSync(filePath);
    } catch (err) {
      console.error(`Error converting ${file}:`, err);
    }
  }
  console.log("Done!");
}

run();
