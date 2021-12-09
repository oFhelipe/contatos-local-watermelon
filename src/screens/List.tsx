import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import localDB from '../database/localDB'
import Contato from '../database/models/Contato'

const List: React.FC = () => {

  const [contatos, setContatos] = useState<Contato[]>([])
  const [nome, setNome] = useState('')
  const [numero, setNumero] = useState('')

  async function init(){
    const contatos = await localDB.get('contato').query().fetch()
    console.log(contatos)
    // @ts-ignore
    setContatos(contatos)
  }

  async function handleClickOnCadastrar(){
    if(nome && numero){
      try {
        await localDB.write(async ()=> {
          // @ts-ignore
          await localDB.get('contato').create((record: Contato)=>{
            record.nome = nome
            record.numero = numero
          })
          console.log('teste')
        })
      init()
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(()=>{
    init()
  },[])

  return (
    <View style={styles.container}>
      <TextInput onChangeText={setNome} placeholder="Nome"style={styles.input}/>
      <TextInput onChangeText={setNumero} placeholder="Número" style={styles.input}/>
      <TouchableOpacity onPress={handleClickOnCadastrar}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </View>
      </TouchableOpacity>
      {contatos && 
        <FlatList 
          data={contatos}
          keyExtractor={(value, index) => `${index}`}
          renderItem={({item, index})=>{
            return (
              <View key={index} style={styles.contatoBox}>
                <Text>Nome: {item.nome}</Text>
                <Text>Número: {item.numero}</Text>
              </View>
            )
          }}/>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#FFF'
  },
  input: {
    height: 56,
    backgroundColor: '#FFFFFF',
    borderColor: '#C4C4C4',
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 16,
    width: '90%',
    marginLeft: '5%',
    paddingLeft: 6,
    fontSize: 16,
  },
  button: {
    height: 56,
    backgroundColor: '#7752CA',
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 16,
    width: '90%',
    marginLeft: '5%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold'
  },
  contatoBox: {
    height: 64,
    borderColor: '#C4C4C4',
    marginTop:8,
    borderBottomWidth: 1,
    borderRadius: 4,
    width: '90%',
    marginLeft: '5%',
    paddingLeft: 6,
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'flex-start'
  }
})

export default List
