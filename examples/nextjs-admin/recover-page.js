const fs = require("fs");
const path = require("path");

const logsDir = "C:\\Users\\HP\\.gemini\\antigravity\\brain";

function searchDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      searchDir(fullPath);
    } else if (file === "transcript.jsonl") {
      try {
        const text = fs.readFileSync(fullPath, "utf-8");
        if (text.includes("export default function LandingPage()") && text.length > 50000) {
          console.log("Found match in:", fullPath, "Size:", text.length);
          const idx = text.indexOf("export default function LandingPage()");
          console.log("Match offset:", idx);
          
          // Grab surrounding code block
          const startIdx = text.lastIndexOf('"use client"', idx);
          const endIdx = text.indexOf('",\\n', idx);
          if (startIdx !== -1 && endIdx !== -1) {
            let rawCode = text.substring(startIdx, endIdx);
            rawCode = rawCode
              .replace(/\\r\\n/g, "\n")
              .replace(/\\n/g, "\n")
              .replace(/\\"/g, '"')
              .replace(/\\\\/g, "\\");
            fs.writeFileSync("C:\\Users\\HP\\Documents\\Software Development\\observability-monitoring-logging\\examples\\nextjs-admin\\app\\page.tsx", rawCode, "utf-8");
            console.log("RESTORED SUCCESSFUL!");
          }
        }
      } catch (e) {}
    }
  }
}

searchDir(logsDir);
