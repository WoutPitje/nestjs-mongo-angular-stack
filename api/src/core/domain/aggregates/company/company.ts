import { Result } from '../../abstractions/result';
import { UserId } from '../user/userId';
import { CompanyId } from './companyId';
import { CompanyName } from './companyName';
import { CompanySettings } from './settings/companySettings';

export class Company {
  id: CompanyId;
  name: CompanyName;
  settings: CompanySettings;
  users: UserId[];

  private constructor(
    id: CompanyId,
    name: CompanyName,
    settings: CompanySettings,
    users: UserId[],
  ) {
    this.id = id;
    this.name = name;
    this.settings = settings;
    this.users = users;
  }

  public static create(
    name: CompanyName,
    settings: CompanySettings,
    creator: UserId,
  ): Result<Company> {
    const id = CompanyId.create().value!;

    const users = [creator];
    const company = new Company(id, name, settings, users);

    return Result.Success(company);
  }
}
