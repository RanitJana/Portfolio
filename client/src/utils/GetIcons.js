//use this file to get all the icons available in devicons.. i prefer to run this one time and paste the vlaues in icons.js in utils directory so that it'll speed up performance

import fs from "fs";

const filePath = "../../node_modules/devicon/devicon.min.css";

const icons = [];

fs.readFile(filePath, "utf-8", (err, info) => {
  if (err) {
    console.error("Error reading CSS file:", err);
    return;
  }

  const iconClassRegex = /\.devicon-[a-z0-9-]+/g;
  let match = "";

  while ((match = iconClassRegex.exec(info))) {
    const iconName = match[0].split("-")[1]; // Extract the part after 'devicon-'

    if (!icons.includes(iconName)) icons.push(iconName);
  }

  console.log(JSON.stringify(icons));
});

export default icons;
