import { TextInput, View, StatusBar, TextInputProps } from "react-native";
import { ReactNode } from "react";

import { colors } from "@/styles/colors";

function Input( {children}:{children : ReactNode }){
  return <View className="w-full h-14 bg-gray-100 flex-row items-center gap-3 p-3 border border-green-400 rounded-lg">{children}</View>
}

function Field ({...rest}: TextInputProps){
  return(
    <TextInput
      className="flex-1 text-black text-base font-regular"
      placeholderTextColor={colors.gray[200]}
      {...rest}
    />)
  
}

Input.Field = Field

export {Input}