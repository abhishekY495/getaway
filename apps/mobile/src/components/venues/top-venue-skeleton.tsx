import { View } from "react-native";
import Skeleton from "../skeleton";

export default function TopVenueSkeleton() {
  return (
    <View className="items-start justify-start mx-2 gap-1 w-44">
      <Skeleton width={152} height={200} borderRadius={5} />
      <Skeleton width={80} height={15} borderRadius={4} />
      <Skeleton width={130} height={16} borderRadius={4} />
    </View>
  );
}
