import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// File untuk menyimpan data buket secara sederhana
const DATA_FILE = path.join(process.cwd(), ".bouquets.json");

// Helper untuk membaca data
function readData() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify({}));
    }
    const fileContent = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading data file:", error);
    return {};
  }
}

// Helper untuk menulis data
function writeData(data: any) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing data file:", error);
  }
}

// Generate short ID random (6 karakter)
function generateShortId() {
  return Math.random().toString(36).substring(2, 8);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const id = generateShortId();
    
    const data = readData();
    data[id] = body;
    writeData(data);
    
    return NextResponse.json({ id });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save bouquet" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
    }
    
    const data = readData();
    const bouquet = data[id];
    
    if (!bouquet) {
      return NextResponse.json({ error: "Bouquet not found" }, { status: 404 });
    }
    
    return NextResponse.json({ bouquet });
  } catch (error) {
    return NextResponse.json({ error: "Failed to retrieve bouquet" }, { status: 500 });
  }
}
