import fs from "fs";
import path from "path";

const clientDir = path.resolve("dist/client");
const distDir = path.resolve("dist");

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

if (fs.existsSync(clientDir)) {
  console.log("Copying client assets to dist root...");
  fs.readdirSync(clientDir).forEach((file) => {
    const srcPath = path.join(clientDir, file);
    const destPath = path.join(distDir, file);
    copyRecursiveSync(srcPath, destPath);
  });
  
  // Clean up client and server folders
  console.log("Cleaning up build directories...");
  fs.rmSync(clientDir, { recursive: true, force: true });
  const serverDir = path.resolve("dist/server");
  if (fs.existsSync(serverDir)) {
    fs.rmSync(serverDir, { recursive: true, force: true });
  }
  console.log("Postbuild static setup complete! dist/ is now the static root.");
} else {
  console.error("dist/client does not exist.");
}
