import { Experienced } from '../interfaces';
import { Identifiable } from 'src/common/interfaces';

export class ChaosSeed implements Experienced, Identifiable {
  declare id: number;

  declare isDeadOnArrival: boolean;

  declare startingAreaId: number;

  declare raceId: number;

  declare startingArea?: string;

  declare name?: string;

  declare level?: number;

  declare xp?: number;

  declare alignment?: number;

  declare reputation?: string;

  declare health?: number;

  declare mana?: number;

  declare stamina?: number;

  declare strength?: number;

  declare agility?: number;

  declare dexterity?: number;

  declare constitution?: number;

  declare endurance?: number;

  declare intelligence?: number;

  declare wisdom?: number;

  declare charisma?: number;

  declare luck?: number;

  declare resistances?: string;

  declare weaknesses?: string;

  declare skills?: string;

  declare marks?: string;

  declare abilities?: string[];

  declare languages?: string[];

  declare race?: string;

  constructor(
    id: number,
    isDeadOnArrival: boolean,
    startingAreaId: number,
    raceId: number,
  ) {
    this.id = id;
    this.isDeadOnArrival = isDeadOnArrival;
    this.startingAreaId = startingAreaId;
    this.raceId = raceId;
    this.name = 'Unknown';
    this.level = 1;
    this.xp = 0;
    this.alignment = 0;
    this.reputation = 'Neutral';
    this.health = 100;
    this.mana = 100;
    this.stamina = 100;
    this.strength = 10;
    this.agility = 10;
    this.dexterity = 10;
    this.constitution = 10;
    this.endurance = 10;
    this.intelligence = 10;
    this.wisdom = 10;
    this.charisma = 10;
    this.luck = 10;
    this.resistances = 'None';
    this.weaknesses = 'None';
    this.skills = 'None';
    this.marks = 'None';
    this.abilities = [];
    this.languages = [];
  }
}
