import { useState } from 'react'
import { View, Image, StatusBar, Alert, Text} from 'react-native'
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Link, Redirect} from "expo-router"

import { Input } from "@/components/input"
import { Button } from "@/components/button"
import { colors } from '@/styles/colors'
import { api } from '@/server/api'
import {useBadgeStore} from "@/store/badge-store"

export default function Home(){

  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const badgeStore = useBadgeStore()

  async function handleAccessCredential(){
    try{
      if (!code.trim()){
        return Alert.alert("Ingresso", "Informe o código do ingresso")
    }

      setIsLoading(true)

      const { data } = await api.get(`attendees/${code}/badge`)
      badgeStore.save(data.badge)

    }catch(error){
      console.log(error)
      setIsLoading(false)
      Alert.alert("Ingresso", "Ingresso não encontrado")
    }
  }

  if (badgeStore.data?.checkInURL){
    return <Redirect href = "/ticket" />
  }

  return(
    <View className = "flex-1 items-center justify-center p-8">
      <StatusBar barStyle= "dark-content"/>

      <Text className='text-base font-bold mb-2'>Olá Usuário</Text>
      

    <View className = "w-full mt-14 gap-3">
      
      <Button title = "Ler Código" onPress={handleAccessCredential} isLoading= {isLoading}/>

      <Link
        href = "/register-batch"
        className="text-gray-800 text-base font-bold text-center mt-10">Cadastrar Novo Lote? 
      </Link>

    </View>

    </View>
  )
}

