import { View, Image, StatusBar, Alert } from 'react-native'
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons"
import { Link, router } from "expo-router"
import { useState } from 'react'

import { Input } from "@/components/input"
import { Button } from "@/components/button"
import { colors } from '@/styles/colors'

export default function Register(){
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  function handleRegister(){
    if (!name.trim() || !email.trim()){
      return Alert.alert("Inscrição", "Preencha todos os campos")
    }

    router.push("/ticket")

  }

  return(
    <View className = "flex-1 bg-green-500 items-center justify-center p-8">
      <StatusBar barStyle= "light-content"/>
      <Image 
        source={require("@/assets/logo.png")}  
        className="h-16"
        resizeMode='contain'
      />

    <View className = "w-full mt-14 gap-3">
      <Input>
        <FontAwesome6
          name = "user-circle"
          color = {colors.green[200]}
          size = {20}
        />
    
        <Input.Field
          placeholder='Nome Completo'
          onChangeText={setName}
        />
      </Input>

      <Input>
        <MaterialIcons
          name = "alternate-email"
          color = {colors.green[200]}
          size = {20}
        />
    
        <Input.Field
          placeholder='Email'
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </Input>

      <Button title = "Realizar Inscrição" onPress={handleRegister}/>

      <Link
        href = "/"
        className="text-gray-100 text-base font-bold text-center mt-10">Já possui ingresso?
      </Link>

    </View>

    </View>
  )
}

