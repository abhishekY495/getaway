import { and, asc, desc, eq, ilike } from "drizzle-orm";
import { db } from "../config/db.js";
import {
  citiesTable,
  eventImagesTable,
  eventsTable,
  venuesTable,
} from "../db/schema.js";

export const getTopEventsService = async () => {
  const events = await db
    .select({
      id: eventsTable.id,
      title: eventsTable.title,
      rating: eventsTable.rating,
      reviewCount: eventsTable.reviewCount,
      lowestPrice: eventsTable.adultPrice,
      coverImage: eventImagesTable.url,
    })
    .from(eventsTable)
    .leftJoin(
      eventImagesTable,
      and(
        eq(eventImagesTable.eventId, eventsTable.id),
        eq(eventImagesTable.isCover, true),
      ),
    )
    .orderBy(desc(eventsTable.rating), desc(eventsTable.reviewCount))
    .limit(10);

  return events;
};

export const getCityEventsService = async (cityId: number) => {
  const [city] = await db
    .select({
      name: citiesTable.name,
      coverImage: citiesTable.coverImage,
    })
    .from(citiesTable)
    .where(eq(citiesTable.id, cityId))
    .limit(1);

  if (!city) {
    throw new Error("City not found");
  }

  const events = await db
    .select({
      id: eventsTable.id,
      title: eventsTable.title,
      coverImage: eventImagesTable.url,
      rating: eventsTable.rating,
      reviewCount: eventsTable.reviewCount,
      lowestPrice: eventsTable.adultPrice,
    })
    .from(eventsTable)
    .innerJoin(venuesTable, eq(eventsTable.venueId, venuesTable.id))
    .leftJoin(
      eventImagesTable,
      and(
        eq(eventImagesTable.eventId, eventsTable.id),
        eq(eventImagesTable.isCover, true),
      ),
    )
    .where(eq(venuesTable.cityId, cityId));

  return { city, events };
};

export const getVenueEventsService = async (venueId: number) => {
  const [venue] = await db
    .select({
      name: venuesTable.name,
      coverImage: venuesTable.coverImage,
    })
    .from(venuesTable)
    .where(eq(venuesTable.id, venueId))
    .limit(1);

  if (!venue) {
    throw new Error("Venue not found");
  }

  const events = await db
    .select({
      id: eventsTable.id,
      title: eventsTable.title,
      coverImage: eventImagesTable.url,
      rating: eventsTable.rating,
      reviewCount: eventsTable.reviewCount,
      lowestPrice: eventsTable.adultPrice,
    })
    .from(eventsTable)
    .leftJoin(
      eventImagesTable,
      and(
        eq(eventImagesTable.eventId, eventsTable.id),
        eq(eventImagesTable.isCover, true),
      ),
    )
    .where(eq(eventsTable.venueId, venueId));

  return { venue, events };
};

export const getEventService = async (eventId: number) => {
  const [event] = await db
    .select({
      id: eventsTable.id,
      title: eventsTable.title,
      venue: venuesTable.name,
      operatingHours: eventsTable.operatingHours,
      rating: eventsTable.rating,
      reviewCount: eventsTable.reviewCount,
      adultPrice: eventsTable.adultPrice,
      childPrice: eventsTable.childPrice,
      highlights: eventsTable.highlights,
      inclusions: eventsTable.inclusions,
      exclusions: eventsTable.exclusions,
      cancellationPolicy: eventsTable.cancellationPolicy,
      mealsIncluded: eventsTable.mealsIncluded,
      bookNowPayLater: eventsTable.bookNowPayLater,
    })
    .from(eventsTable)
    .innerJoin(venuesTable, eq(eventsTable.venueId, venuesTable.id))
    .where(eq(eventsTable.id, eventId))
    .limit(1);

  if (!event) {
    throw new Error("Event not found");
  }

  const eventImages = await db
    .select({
      url: eventImagesTable.url,
    })
    .from(eventImagesTable)
    .where(eq(eventImagesTable.eventId, eventId))
    .orderBy(asc(eventImagesTable.order));

  return { ...event, images: eventImages.map((image) => image.url) };
};

export const searchEventsService = async (searchTerm: string) => {
  const events = db
    .select({
      id: eventsTable.id,
      title: eventsTable.title,
      coverImage: eventImagesTable.url,
      rating: eventsTable.rating,
      reviewCount: eventsTable.reviewCount,
    })
    .from(eventsTable)
    .leftJoin(
      eventImagesTable,
      and(
        eq(eventImagesTable.eventId, eventsTable.id),
        eq(eventImagesTable.isCover, true),
      ),
    )
    .where(ilike(eventsTable.title, searchTerm))
    .limit(5);

  return events;
};
