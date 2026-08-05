import { Text, View, StyleSheet } from "react-native";
import { greeting } from "@repo/types";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>{greeting}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
