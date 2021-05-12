import { Stream } from "node:stream";

export abstract class StorageBasic {
  
  /** get root directory */

  /** create directory */
  abstract mkdir(name: string): Promise<boolean>

  /** move directory or file */
  abstract mv(current: string, target: string): Promise<boolean>

  /** copy directory or file */
  abstract cp(current: string, target: string): Promise<boolean>

  /** create file */
  abstract writeFile(directory: string, fileName: string, data: Buffer | Stream): Promise<boolean>
}
