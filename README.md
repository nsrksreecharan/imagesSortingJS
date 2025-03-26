# 📂 Image Sorting & Downloading (JavaScript Project)

## 🚀 Project Overview
**imagesSortingJS** is a pure JavaScript project focused on **file management techniques**. It allows users to:
- Upload a **folder** containing multiple images.
- **Filter & select** needed pictures.
- **Rename** images using an editor.
- **Download selected images** as a zip folder.

### 🛠️ Technologies Used
- **JavaScript (Vanilla) ✨**
- **JSZip API 📦** (For creating zip folders)
- **Blob & FileReader APIs 🖼️** (For handling files)
- **DOM Manipulation 🏗️** (For interactive UI)

---
## 🔑 Key Learnings & Features

### 📂 1. Uploading a Folder
- Used `webkitdirectory` and `multiple` attributes to allow folder selection.
- When files are uploaded, they are in **blob format** and cannot be iterated using `for` loops.
- Used `Array.from(files)` to properly handle uploaded files.

### 📸 2. Reading & Displaying Images
- Utilized the **FileReader API** to read each file.
- Converted images into a displayable format using `reader.readAsDataURL(file)`.

### 🎨 3. Dynamic UI with DOM Manipulation
- **Added images dynamically** using `appendChild()`.
- **Removed unwanted images** using `removeChild()`.
- **Inserted elements at specific positions** using `insertBefore(element, child)`.
- Modified styles dynamically using `style` and `classList`.

### 📦 4. Exporting Selected Images as a Zip
- Used the **JSZip API** to create a downloadable zip folder.
- **Step-by-step process:**
  1. **Iterate through selected images** using `Array.from(children)` and `Promise.allSettled()`.
  2. **Convert each image src to its original format** using the `fetch` API.
  3. **Convert fetched images to blob format** (`.blob()` method).
  4. **Create a new JSZip instance**: `zip.folder("selected_images")`.
  5. **Add images to the zip folder**: `folder.file(blobResp, fileName)`.
  6. **Generate a downloadable zip file**:
      ```js
      zip.generateAsync({ type: "blob" }).then((content) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(content);
        link.download = "selected_images.zip";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
      ```

---
## 🎯 How to Use
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/imagesSortingJS.git
   cd imagesSortingJS
   ```
2. **Open `index.html` in a browser**
3. **Upload a folder containing images**
4. **Select & rename images as needed**
5. **Click 'Export' to download them in a zip folder**

---
## 📸 Demo
![Demo GIF]([https://your-image-host.com/your-gif.gif](https://res.cloudinary.com/dub9ymu0j/video/upload/v1743009727/prototype_-_Made_with_Clipchamp_xagmhb.mp4))

---
## 📜 License
This project is licensed under the **MIT License**. Feel free to use and modify it!

---
**Happy Coding! 🚀**

