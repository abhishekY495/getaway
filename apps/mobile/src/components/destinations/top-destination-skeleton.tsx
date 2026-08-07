import { View } from "react-native";
import Skeleton from "../skeleton";

export default function TopDestinationSkeleton() {
  return (
    <View className="flex-1 items-center justify-center mx-2 gap-1">
      <Skeleton width={70} height={70} borderRadius={40} />
      <Skeleton width={60} height={16} borderRadius={4} />
    </View>
  );
}
