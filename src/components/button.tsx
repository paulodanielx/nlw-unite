import { TouchableOpacity, TouchableOpacityProps, Text, ActivityIndicator} from "react-native";

type Props = TouchableOpacityProps & {
  title: string
  isLoading?: boolean
}

export function Button({title, isLoading = false, ...rest}: Props){
  return(
    <TouchableOpacity
      activeOpacity={0.7}
      disabled = {isLoading}
      className="w-full h-14 items-center justify-center bg-green-900 rounded-lg"
      {...rest}>
      {
        isLoading ? (
          <ActivityIndicator className="text-green-500"/>
          ) : (
            <Text className="text-white text=base font-bold uppercase">{title}</Text>
              )
      }
    </TouchableOpacity>
  )
}