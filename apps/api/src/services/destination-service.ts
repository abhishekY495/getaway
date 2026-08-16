import { asc, eq, ilike } from "drizzle-orm";
import { db } from "../config/db.js";
import { citiesTable, countriesTable } from "../db/schema.js";

export const getTopDestinationsService = async () => {
  const destinations = await db
    .select({
      id: citiesTable.id,
      name: citiesTable.name,
      coverImage: citiesTable.coverImage,
    })
    .from(citiesTable)
    .orderBy(asc(citiesTable.name));

  return destinations;
};

export const searchDestinationsService = async (searchTerm: string) => {
  const destinations = db
    .select({
      id: citiesTable.id,
      name: citiesTable.name,
      country: countriesTable.name,
      coverImage: citiesTable.coverImage,
    })
    .from(citiesTable)
    .innerJoin(countriesTable, eq(citiesTable.countryId, countriesTable.id))
    .where(ilike(citiesTable.name, searchTerm))
    .limit(5);

  return destinations;
};
