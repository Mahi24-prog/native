import BottomSheet from "@/components/BottomSheet";
import TimeSlotPicker from "@/components/TimeSlotPicker";
import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SlotPicker = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SafeAreaView className="flex-1 items-center justify-center">
        <TouchableOpacity
          className="flex-1 items-center justify-center"
          onPress={() => setOpen(true)}
        >
          <Text className="text-xl p-4 rounded-lg bg-primary-300 color-white font-rubik-medium">
            Select Slot
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
      {open && (
        <BottomSheet
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Select Date & Time Slot"
        >
          <TimeSlotPicker />
        </BottomSheet>
      )}
    </>
  );
};

export default SlotPicker;
