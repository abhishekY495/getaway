import { desc, ilike } from "drizzle-orm";
import { db } from "../config/db.js";
import { venuesTable } from "../db/schema.js";

export const getTopVenuesService = async () => {
  const venues = await db
    .select({
      id: venuesTable.id,
      name: venuesTable.name,
      coverImage: venuesTable.coverImage,
      description: venuesTable.description,
      rating: venuesTable.rating,
      reviewCount: venuesTable.reviewCount,
    })
    .from(venuesTable)
    .orderBy(desc(venuesTable.rating), desc(venuesTable.reviewCount))
    .limit(10);

  return venues;
};

export const searchVenuesService = async (searchTerm: string) => {
  const venues = db
    .select({
      id: venuesTable.id,
      name: venuesTable.name,
      coverImage: venuesTable.coverImage,
      rating: venuesTable.rating,
      reviewCount: venuesTable.reviewCount,
    })
    .from(venuesTable)
    .where(ilike(venuesTable.name, searchTerm))
    .limit(5);

  return venues;
};
