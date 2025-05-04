import Box from "@/components/Box";
import { capitalize, validationRules } from "@/utils";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import TextInput from "@/components/TextInput";
import { useForm } from "@/components/Form";
import Octicons from "@expo/vector-icons/Octicons";
import PickupStepper from "@/components/PickupStepper";

const Pickup = () => {
  const { type: pickupType } = useLocalSearchParams();

  const { errors, handleChange, handleFoucs, handleSubmit } = useForm({
    initialValues: {
      movingFrom: "",
      movingTo: "",
    },
    validationRules: validationRules({
      movingFrom: "",
      movingTo: "",
    }),
    onSubmit: (values: any) => {
      router.push({
        pathname:
          pickupType === "relocation"
            ? "/pickupDetails"
            : "/itemCategorySelection",
        params: {
          ...values,
          pickupType,
          title: `${capitalize(pickupType as any)} Details`,
        },
      });
    },
  });

  return (
    <PickupStepper
      title={`${capitalize(pickupType as any)} Details`}
      onContinue={handleSubmit}
    >
      <Box gap={3}>
        <TextInput
          id="movingFrom"
          label="Moving From"
          placeholder="Pickup address"
          onChangeText={handleChange("movingFrom")}
          onFocus={handleFoucs("movingFrom")}
          helperText="Pickup address is required."
          left={
            <Box pl={1.25}>
              <Octicons name="location" size={20} color="black" />
            </Box>
          }
          error={Boolean(errors.movingFrom)}
        />
        <TextInput
          id="movingTo"
          label="Moving To"
          placeholder="Drop address"
          onChangeText={handleChange("movingTo")}
          onFocus={handleFoucs("movingTo")}
          helperText="Drop address is required."
          error={Boolean(errors.movingTo)}
          left={
            <Box pl={1.25}>
              <Octicons name="location" size={20} color="black" />
            </Box>
          }
        />
      </Box>
    </PickupStepper>
  );
};

export default Pickup;
