import { IsString, IsUrl } from 'class-validator';

export class AddGitRegistry {
  /** git registry */
  @IsString()
  @IsUrl()
  gitRegistry: string;
}
