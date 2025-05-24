import React, { ReactNode } from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";

interface Props {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function BottomSheet({
  title,
  isOpen,
  onClose,
  children,
}: Props) {
  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      className="bg-red-300"
      statusBarTranslucent
    >
      <View className="flex-1 justify-end">
        {/* Overlay */}
        <Pressable
          className="absolute inset-0 bg-black-100"
          onPress={onClose}
        />

        {/* Bottom Sheet */}
        <View className="bg-white rounded-t-3xl h-5/6 w-full">
          {/* Header */}
          <View className="flex-row justify-between py-4 px-6 pb-4">
            {title && <Text className="text-2xl font-medium">{title}</Text>}
            <TouchableOpacity onPress={onClose}>
              <Text className="text-gray-500 text-xl">✖</Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View className="-mx-4 h-px bg-gray-300" />

          {/* Content */}
          <View className="flex-1">{children}</View>
        </View>
      </View>
    </Modal>
  );
}
