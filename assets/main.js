const fs = require("fs");
const path = require("path");
const https = require("https");

const inputFilePath = "./new.txt"; // Path to the file containing URLs
const outputFolder = "./images"; // Folder to store downloaded images

// Ensure the output folder exists
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

// Function to download a file from a URL
function downloadFile(url, filePath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    https
      .get(url, (response) => {
        response.pipe(file);
        file.on("finish", () => {
          file.close(resolve);
        });
      })
      .on("error", (err) => {
        fs.unlink(filePath, () => {}); // Delete the file if there's an error
        reject(err);
      });
  });
}

// Function to process the file containing URLs
async function downloadFilesFromList(inputFilePath, outputFolder) {
  try {
    const data = fs.readFileSync(inputFilePath, "utf8");
    const urls = data.split("\n").filter((url) => url.trim() !== ""); // Split by newline and remove empty lines

    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      const fileName = path.basename(url); // Extract the file name from the URL
      const filePath = path.join(outputFolder, fileName);

      console.log(`Downloading: ${url}`);
      await downloadFile(url, filePath);
      console.log(`Saved: ${filePath}`);
    }

    console.log("All files have been downloaded successfully!");
  } catch (err) {
    console.error("Error:", err);
  }
}

// Call the function
downloadFilesFromList(inputFilePath, outputFolder);
