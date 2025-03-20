export class ChaosSeedName {
  private _name: string;

  constructor(name: string) {
    this._name = this.cleanName(name);
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = this.cleanName(name);
  }

  private cleanName(name: string): string {
    return name
      .replace(/[^a-zA-Z\s]/g, '')
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
