import { IsString } from "class-validator";

export class AddGitRegistry {
  /** git registry */
  @IsString()
  gitRegistry: String
}