import { promises as fs } from "fs";
import objectPath from "object-path";
import ini from "ini";

export class ConfigTemplate {
  constructor(formatStrategy) {
    this.data = {};
    this.formatStrategy = formatStrategy;
  }

  get(configPath) {
    return objectPath.get(this.data, configPath);
  }

  set(configPath, value) {
    objectPath.set(this.data, configPath, value);
  }

  async load(filePath) {
    console.log(`Deserializing data: ${filePath}`);
    this.data = this._deserialize(await fs.readFile(filePath, "utf-8"));
  }

  async save(filePath) {
    console.log(`Serializing to ${filePath}`);
    await fs.writeFile(filePath, this._serialize(this.data));
  }

  _serialize() {
    throw new Error("Serialize has to be implemented");
  }

  _deserialize() {
    throw new Error("Deserialize has to be implemented");
  }
}

export class JsonConfig extends ConfigTemplate {
  _deserialize(value) {
    return JSON.parse(value);
  }

  _serialize(data) {
    return JSON.stringify(data, null, "  ");
  }
}

export class IniConfig extends ConfigTemplate {
  _deserialize(data) {
    return ini.parse(data);
  }
  _serialize(data) {
    return ini.stringify(data);
  }
}
