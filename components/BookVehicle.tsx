// screens/BookVehicleScreen.tsx
import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const VEHICLE_OPTIONS = [
  { id: "1", type: "Mini Truck", capacity: "1 Room", price: 2000 },
  { id: "2", type: "Medium Truck", capacity: "2-3 Rooms", price: 3500 },
  { id: "3", type: "Large Truck", capacity: "House / Office", price: 6000 },
];

const BookVehicleScreen = () => {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Title */}
        <Text className="text-2xl font-bold text-gray-800 mb-4">Book a Vehicle</Text>

        {/* Pickup */}
        <Text className="text-base text-gray-700 mb-1">Pickup Location</Text>
        <TextInput
          value={pickup}
          onChangeText={setPickup}
          placeholder="Enter pickup address"
          className="border border-gray-300 rounded-2xl px-4 py-3 mb-4"
        />

        {/* Drop */}
        <Text className="text-base text-gray-700 mb-1">Drop Location</Text>
        <TextInput
          value={drop}
          onChangeText={setDrop}
          placeholder="Enter drop address"
          className="border border-gray-300 rounded-2xl px-4 py-3 mb-4"
        />

        {/* Vehicle Options */}
        <Text className="text-base font-semibold text-gray-800 mb-3">Choose Vehicle</Text>
        {VEHICLE_OPTIONS.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => setSelectedVehicle(item.id)}
            className={`border rounded-2xl p-4 mb-3 ${
              selectedVehicle === item.id ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
          >
            <Text className="text-lg font-semibold text-gray-800">{item.type}</Text>
            <Text className="text-sm text-gray-500">Capacity: {item.capacity}</Text>
            <Text className="text-sm text-gray-500">Price: Rs {item.price}</Text>
          </TouchableOpacity>
        ))}

        {/* Confirm Button */}
        <TouchableOpacity
          disabled={!pickup || !drop || !selectedVehicle}
          className={`mt-6 py-4 rounded-2xl ${
            pickup && drop && selectedVehicle ? "bg-blue-600" : "bg-gray-300"
          }`}
        >
          <Text className="text-center text-white text-lg font-bold">
            Confirm Booking
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookVehicleScreen;
