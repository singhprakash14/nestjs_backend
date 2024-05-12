const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Function to store an image in the specified directory
exports.storeImage = (directory, file) => {
  directory = directory
  // Generate a unique filename using UUID
  const uniqueFilename = uuidv4() + '.' + file.originalname.split('.').pop();

  const imagePath = `${directory}/${uniqueFilename}`;
  // Ensure the directory exists; if not, create it
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  return new Promise((resolve, reject) => {
    // Write the file to the specified directory
    fs.writeFile(imagePath, file.buffer, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(imagePath);
      }
    });
  });
}

// Function to store multiple images in the specified directory
exports.storeMultipleImages = (directory, files) => {
  // Ensure the directory exists; if not, create it
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  const promises = [];

  for (const file of files) {
    console.log("file,", Object.keys(file), file.size)
    promises.push(
      new Promise((resolve, reject) => {
        // Generate a unique filename using UUID
        const uniqueFilename = uuidv4() + '.' + file.originalname.split('.').pop();

        // Create the full path to store the image
        const imagePath = `${directory}/${uniqueFilename}`;

        // Write the file to the specified directory
        fs.writeFile(imagePath, file.buffer, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve({ url: imagePath, name: file.originalname, size: file.size / 1024 });
          }
        });
      })
    );
  }

  return Promise.all(promises);
};