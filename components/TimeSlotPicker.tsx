import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const TimeSlotPicker = () => {
  const dateScrollRef = useRef<ScrollView>(null);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleMonthChange = (direction: number) => {
    setCurrentDate(currentDate.add(direction, "month"));
  };

  const getMonthDates = () => {
    const startOfMonth = currentDate.startOf("month");
    return Array.from({ length: startOfMonth.daysInMonth() }, (_, i) =>
      startOfMonth.add(i, "day")
    );
  };

  const generateTimeSlots = () => {
    return Array.from({ length: 18 }, (_, i) => {
      const hour = i + 5;
      return dayjs().hour(hour).minute(0).format("h:mm A");
    });
  };

  // Combine selected date and time into one Dayjs object
  const getSelectedDateTime = () => {
    if (!selectedDate || !selectedTime) return null;

    // Extract hour and minute from selectedTime string, e.g. "5:00 PM"
    const [time, modifier] = selectedTime.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    return selectedDate.hour(hours).minute(minutes).second(0);
  };

  const selectedDateTime = getSelectedDateTime();

  useEffect(() => {
    const todayIndex = dayjs().date() - 4;
    const itemWidth = 64;
    const scrollX = todayIndex * itemWidth;
    dateScrollRef.current?.scrollTo({ x: scrollX, animated: true });
  }, []);

  return (
    <ScrollView>
      <ScrollView className="flex-1 p-4">
        {/* Header */}
        <View className="flex-row justify-between items-center p-2 pt-0">
          <TouchableOpacity
            onPress={() => handleMonthChange(-1)}
            className="bg-primary-300 p-2 rounded-xl"
          >
            <Icon name="chevron-left" size={30} color="white" />
          </TouchableOpacity>

          <Text className="text-lg font-bold">
            {currentDate.format("MMMM YYYY")}
          </Text>

          <TouchableOpacity
            onPress={() => handleMonthChange(1)}
            className="bg-primary-300 p-2 rounded-xl"
          >
            <Icon name="chevron-right" size={30} color="white" />
          </TouchableOpacity>
        </View>

        <View className="-mx-4 h-px bg-gray-300 my-2" />

        {/* Dates Row */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={dateScrollRef}
        >
          {getMonthDates().map((date, index) => {
            const isSelected = selectedDate?.isSame(date, "day");
            return (
              <TouchableOpacity
                key={index}
                className={`w-16 items-center p-2 rounded-lg `}
                onPress={() => setSelectedDate(date)}
              >
                <Text
                  className={`p-2 rounded-md font-bold ${
                    isSelected ? "text-white" : ""
                  }`}
                  style={{
                    backgroundColor: isSelected ? "#8b1008" : "white",
                  }}
                >
                  {date.format("DD")}
                </Text>
                <Text className="text-gray-500">{date.format("ddd")}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View className="-mx-4 h-px bg-gray-300 my-2" />

        {/* Time Slots */}
        <View>
          <Text className="text-xl font-medium p-2">Select Time Slot</Text>
          <View className="flex-row gap-4 items-center p-2">
            <View className="flex-row gap-2 items-center">
              <View className="h-6 w-6 rounded-md border border-gray-400" />
              <Text>Available</Text>
            </View>
            <View className="flex-row gap-2 items-center">
              <View
                className="h-6 w-6 rounded-md border border-gray-400"
                style={{ backgroundColor: "#F1EDEA" }}
              />
              <Text>Not Available</Text>
            </View>
            <View className="flex-row gap-2 items-center">
              <View
                className="h-6 w-6 rounded-md border border-gray-400"
                style={{ backgroundColor: "#891305" }}
              />
              <Text>Selected</Text>
            </View>
          </View>

          <View className="flex-row flex-wrap py-4">
            {generateTimeSlots().map((slot, index) => {
              const isSelected = selectedTime === slot;
              const notAvilable = [6, 11, 13].includes(index);
              return (
                <TouchableOpacity
                  key={index}
                  className={`w-[30%] m-[1.5%] p-2.5 rounded-lg items-center border border-gray-400 `}
                  style={{
                    backgroundColor: isSelected
                      ? "#8b1008"
                      : notAvilable
                      ? "#F1EDEA"
                      : "white",
                  }}
                  disabled={notAvilable}
                  onPress={() => setSelectedTime(slot)}
                >
                  <Text
                    className={`${isSelected ? "text-white" : "text-gray-700"}`}
                  >
                    {slot}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View className="absolute bottom-0 left-0 right-0 flex-row gap-4 p-4 bg-white z-50 mt-4">
        <TouchableOpacity
          className="flex-1 py-3 rounded-lg border border-primary-300 items-center"
          onPress={() => {
            setSelectedDate(null);
            setSelectedTime(null);
          }}
        >
          <Text className="text-primary-300 font-medium text-lg">Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 py-3 rounded-lg bg-primary-300 items-center"
          onPress={() => {
            if (selectedDateTime) {
              alert(`Selected datetime: ${selectedDateTime.format()}`);
            } else {
              alert("Please select date and time");
            }
          }}
        >
          <Text className="text-white font-semibold text-lg">Select</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default TimeSlotPicker;
