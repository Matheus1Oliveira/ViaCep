import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView } from 'react-native';
import { PaperProvider, TextInput, Button, Text } from 'react-native-paper';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const estadosBrasil = [
    { label: "Acre", value: "AC" },
    { label: "Alagoas", value: "AL" },
    { label: "Amapá", value: "AP" },
    { label: "Amazonas", value: "AM" },
    { label: "Bahia", value: "BA" },
    { label: "Ceará", value: "CE" },
    { label: "Distrito Federal", value: "DF" },
    { label: "Espírito Santo", value: "ES" },
    { label: "Goiás", value: "GO" },
    { label: "Maranhão", value: "MA" },
    { label: "Mato Grosso", value: "MT" },
    { label: "Mato Grosso do Sul", value: "MS" },
    { label: "Minas Gerais", value: "MG" },
    { label: "Pará", value: "PA" },
    { label: "Paraíba", value: "PB" },
    { label: "Paraná", value: "PR" },
    { label: "Pernambuco", value: "PE" },
    { label: "Piauí", value: "PI" },
    { label: "Rio de Janeiro", value: "RJ" },
    { label: "Rio Grande do Norte", value: "RN" },
    { label: "Rio Grande do Sul", value: "RS" },
    { label: "Rondônia", value: "RO" },
    { label: "Roraima", value: "RR" },
    { label: "Santa Catarina", value: "SC" },
    { label: "São Paulo", value: "SP" },
    { label: "Sergipe", value: "SE" },
    { label: "Tocantins", value: "TO" },
  ];

  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [cep, setCep] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [dados, setDados] = useState({});
  const [estado, setEstado] = useState("");

  const BuscaCep = (xcep) => {
    let url = `https://viacep.com.br/ws/${xcep}/json/`;

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setDados(data);
        setEstado(data.uf || '');
      })
      .catch(() => alert('Erro ao buscar dados do CEP'));
  };

  const apagarCampos = () => {
    if (cep === '' || usuario === '' || senha === '' || numero === '' || complemento === '') {
      alert('Preencha todos os campos');
    } else {
      setCep('');
      setEstado('');
      setUsuario('');
      setSenha('');
      setNumero('');
      setComplemento('');
      setDados({});
      alert('Cadastro realizado!');
    }    
  };


  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.container}>
        <Text 
          style={styles.title}>Cadastro de Endereço</Text>
        <TextInput 
          label="Usuário" 
          value={usuario} 
          onChangeText={setUsuario} 
          mode="outlined" 
          style={styles.input} 
        />
        <TextInput 
          label="Senha" 
          value={senha} 
          onChangeText={setSenha} 
          mode="outlined" 
          secureTextEntry 
          style={styles.input} 
        />
        <TextInput 
          label="CEP" 
          value={cep} 
          onChangeText={setCep} 
          mode="outlined" 
          style={styles.input} 
          onBlur={() => BuscaCep(cep)} 
        />
        <TextInput 
          label="Rua" 
          value={dados.logradouro || ''} 
          mode="outlined" 
          style={styles.input} 
          editable={false}  
        />
        <TextInput 
            label="Número" 
            value={numero} 
            onChangeText={setNumero} 
            mode="outlined" 
            style={styles.input} 
          />
        <TextInput label="Complemento" 
            value={complemento} 
            onChangeText={setComplemento} 
            mode="outlined" 
            style={styles.input} 
          />
        <TextInput 
        label="Bairro" 
          value={dados.bairro || ''} 
          mode="outlined" 
          style={styles.input} 
          editable={false} 
        />
        <TextInput 
          label="Cidade" 
          value={dados.localidade || ''} 
          mode="outlined" 
          style={styles.input} 
          editable={false} 
        />
        <Picker 
          selectedValue={estado} 
          onValueChange={setEstado} 
          style={styles.picker}
          >
          <Picker.Item 
            label="Selecione um Estado" 
            value="" 
          />
          {estadosBrasil.map((estado) => (
            <Picker.Item 
            key={estado.value} 
            label={estado.label} 
            value={estado.value} 
          />
          ))}
        </Picker>
        <Button mode="contained" onPress={apagarCampos} style={styles.button}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </Button>
        <StatusBar style="auto" />
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#000000',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    width: '100%',
    marginBottom: 15,
    backgroundColor: '#333',
  },
  picker: {
    width: '100%',
    height: 50,
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    width: '100%',
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
