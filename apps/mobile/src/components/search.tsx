import { useSearch } from "@/lib/hooks/search/use-search";
import { useDebounce } from "@/lib/hooks/use-debounce";
import { useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import SearchedDestinations from "./destinations/searched-destinations";
import SearchedVenues from "./venues/searched-venues";
import SearchedEvents from "./events/searched-events";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

export default function Search() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 400);

  const { data, isLoading } = useSearch(debouncedQuery);
  const results = data?.data;

  return (
    <BottomSheetScrollView
      contentContainerStyle={{ paddingBottom: 80, paddingInline: 16 }}
    >
      <TextInput
        className="border border-neutral-200 p-4 placeholder:text-neutral-400 rounded-lg bg-white shadow-2xl"
        placeholder="Search for events, places and more..."
        value={query}
        onChangeText={setQuery}
        autoFocus
      />
      {isLoading ? (
        <ActivityIndicator size="large" className="mt-10" />
      ) : (
        results && (
          <View className="mt-4 gap-3">
            {results.venues.length > 0 && (
              <SearchedVenues venues={results.venues} />
            )}
            {/*  */}
            {results.events.length > 0 && (
              <SearchedEvents events={results.events} />
            )}
            {/*  */}
            {results.destinations.length > 0 && (
              <SearchedDestinations destinations={results.destinations} />
            )}
          </View>
        )
      )}
    </BottomSheetScrollView>
  );
}
