import { AuthorizedCommand } from '../../../abstractions/authorized.command';

export class MeCommand implements AuthorizedCommand {
  constructor(public readonly token: string) {}
}
