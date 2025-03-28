import { promises as fs } from "fs";
import objectPath from "object-path";
import ini from "ini";
import { deserialize } from "v8";

export class Config {
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
    this.data = this.formatStrategy.deserialize(
      await fs.readFile(filePath, "utf-8")
    );
  }

  async save(filePath) {
    console.log(`Serializing to ${filePath}`);
    await fs.writeFile(filePath, this.formatStrategy.serialize(this.data));
  }
}

export const iniStrategy = {
  deserialize: (data) => ini.parse(data),
  serialize: (data) => ini.stringify(data),
};

export const jsonStrategy = {
  deserialize: (data) => JSON.parse(data),
  serialize: (data) => JSON.stringify(data, null, "  "),
};

const main = async () => {
  const iniConfig = Config(iniStrategy);
  await iniConfig.load("samples/conf.ini");
  iniConfig.set("book.nodejs", "design patterns");
  await iniConfig.save("samples/conf_mod.ini");

  const jsonConfig = new Config(jsonStrategy);
  await jsonConfig.load("samples/conf.json");
  jsonConfig.set("book.nodejs", "design patterns");
  await jsonConfig.save("samples/conf_mod.json");
};

main();
