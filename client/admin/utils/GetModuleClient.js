import path from "path";

export default function getModule(module) {
  return path.resolve(__dirname, "../../client/node_modules/", module);
}
