import { View, Text, StatusBar, Alert } from 'react-native'
import { FontAwesome6, Octicons, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons"
import { Link, router } from "expo-router"
import { useState } from 'react'
import axios from 'axios'

import { Input } from "@/components/input"
import { Button } from "@/components/button"
import {Radio} from "@/components/radio"
import { colors } from '@/styles/colors'
import { api } from '@/server/api'
import { useBadgeStore } from "@/store/badge-store"


const EVENT_ID = "9e9bd979-9d10-4915-b339-3786b1634f33"

export default function Register(){
  const [status, setStatus] = useState("")
  const [peso, setPeso] = useState("")
  const [reciclavel, setReciclavel] = useState("")
  const [colletctPointId, setCollectPointId] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const badgeStore = useBadgeStore()

  async function handleRegister(){

    try {
      if (!status.trim() || !peso.trim() || !reciclavel === null || colletctPointId === undefined){
        return Alert.alert("Inscrição", "Preencha todos os campos")
    }

      setIsLoading(true)

      const registerResponse = await api.post(`/events/${EVENT_ID}/attendees`, {name, cpf})

      if(registerResponse.data.attendeeId){
        const badgeResponse = await api.get(`/attendees/${registerResponse.data.attendeeId}/badge`)

        badgeStore.save(badgeResponse.data.badge)

        Alert.alert("Inscrição", "Inscrição realizada com sucesso", [
          { text : "OK", onPress: () => router.push("/ticket")}
        ])
        
      }


    }catch(error){
      console.log(error)
      setIsLoading(false)




      if(axios.isAxiosError(error)){
        if(String(error.response?.data.message).includes("already registered")){
          return Alert.alert("Inscrição", "Este email já está cadastrado")
        }
      }
      Alert.alert("Inscrição", "Não foi possível realizar a inscrição")

    } 



  }

  return(

    <View className = "flex-1 items-center justify-center p-8">
      <StatusBar barStyle= "dark-content"/>
      
      <Text className='font-bold text-xl'>CADASTRAR NOVO LOTE</Text>

    <View className = "w-full mt-10 gap-3">
      <Input>
        <MaterialCommunityIcons
          name = "list-status"
          color = {colors.green[500]}
          size = {20}
        />
    
        <Input.Field
          placeholder='Status'
          onChangeText={setStatus}
        />
      </Input>

      <Input>
        <MaterialCommunityIcons
          name = "weight-kilogram"
          color = {colors.green[500]}
          size = {20}
        />
    
        <Input.Field
          placeholder='Peso'
          onChangeText={setPeso}
          keyboardType="numeric"
        />
      </Input>

      <Input>
        <FontAwesome6
          name = "recycle"
          color = {colors.green[500]}
          size = {20}
        />
    
        <Input.Field
          placeholder='Reciclável?'
          onChangeText={setReciclavel}
        />
        
        <Radio/>

  
  

      </Input>

      <Input>
        <Octicons
          name = "organization"
          color = {colors.green[500]}
          size = {20}
        />
    
        <Input.Field
          placeholder='Ponto de Coleta'
          onChangeText={setCollectPointId}
          keyboardType="email-address"
        />
      </Input>

      <Button
        title = "Realizar Cadastro"
        onPress={handleRegister}
        isLoading= {isLoading}
      />

      <Link
        href = "/"
        className="text-black text-base font-bold text-center mt-10">Já possui acesso?
      </Link>

    </View>

    </View>
  )
}

