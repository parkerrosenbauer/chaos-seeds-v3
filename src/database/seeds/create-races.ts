import { Sequelize } from "sequelize-typescript";
import { Race } from "../../characteristics/models";

export async function seedRaces(sequelize: Sequelize) {
  await sequelize.sync();
  console.log("Seeding races...");

  try {
    await sequelize.transaction(async (t) => {
      const transactionHost = { transaction: t };
      await Race.bulkCreate(
        [
          {
            name: "Human",
            description:
              "Humans are one of the shortest lived, but most prolific breeders in the Land. Humans have a broader affinity for skills than other races. No special bonuses to race. Humans get four points to distribute per level.",
            chance: 7,
          },
          {
            name: "High Elf",
            description:
              "Elves have several subclasses that determine their specific powers. High Elves are gifted in archery and most magical arts. They have increased resistance to magical attack. Bonus to Intelligence and Wisdom each level. High Elves get three points to distribute per level, and each level gives +1 to Intelligence and +1 to Wisdom.",
            languageId: 2,
            chance: 3,
          },
          {
            name: "Wood Elf",
            description:
              "Elves have several subclasses that determine their specific powers. Wood Elves are gifted in archery, woodcraft, and healing. Increased accuracy and damage when using ranged weapons bonus to Dodge. Wood Elves get three points to distribute per level, and each level gives +1 to Dexterity and +1 to Intelligence",
            languageId: 2,
            chance: 4,
          },
          {
            name: "Mountain Dwarf",
            description:
              'Dwarves have several subclasses that determine their specific powers. Mountain Dwarves are a hardy folk that get bonuses to Constitution and Endurance each level. They have keen eyesight that gives them excellent night vision. Natural miners, it is said mountain dwarves can "smell" veins of precious metals. Increased resistance to negative physical effects. Increased affinity and resistance to Earth Magic. Mountain Dwarves get three points to distribute per level, and each level gives +1 to Constitution and +1 to Endurance.',
            languageId: 3,
            chance: 4,
          },
          {
            name: "Builder Gnome",
            description:
              "Builder Gnomes are obsessed with the application of knowledge. They are well known for making amazing devices and fantastical structures. Gifted in magical crafting. Builder Gnomes get three points to distribute per level, and each level gives +1 to Intelligence and +1 to Endurance.",
            languageId: 4,
            chance: 5,
          },
          {
            name: "Arcane Gnome",
            description:
              "Arcane gnomes are obsessed with knowledge. Increased dodge and sneak. Gifted in magical arts. Bonus to Intelligence each level. Arcane Gnomes get three points to distribute per level and each level gives + 2 to Intelligence.",
            languageId: 4,
            chance: 6,
          },
        ],
        transactionHost
      );
    });

    console.log("Races seeded");
  } catch (error) {
    console.error("Error seeding races:", error);
    process.exit(1);
  }
}
