import { join } from "path";
import { ToFileStream } from "./streamsModuleToFile.js";

const tfs = new ToFileStream();

tfs.write({ path: join("files", "files1.txt"), content: "Hello" });
tfs.write({ path: join("files", "files2.txt"), content: "Node" });
tfs.end(() => console.log("All files created"));
