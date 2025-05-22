import DelView from "@/components/DeliveryView";
import { useLocalSearchParams } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const DeliveryView = () => {
  const searchParams = useLocalSearchParams();
  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}
    >
      <DelView searchParams={searchParams} />
    </GestureHandlerRootView>
  );
};

export default DeliveryView;
