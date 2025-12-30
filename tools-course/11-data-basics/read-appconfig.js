const yaml = require("js-yaml");
const fs = require("fs");

const config = yaml.load(fs.readFileSync("./app-config.yaml", "utf8"));
console.log(config);
