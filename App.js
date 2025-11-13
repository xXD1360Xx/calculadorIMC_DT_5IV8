import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  SafeAreaView,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  const [peso, setPeso] = useState('');
  const [estatura, setEstatura] = useState('');
  const [resultado, setResultado] = useState(null);

  const mostrarAlerta = (titulo, mensaje) => {
    if (Platform.OS === 'web') {
      alert(`${titulo}: ${mensaje}`);
    } else {
      Alert.alert(titulo, mensaje);
    }
  };

  const calcularIMC = () => {
    if (peso.trim() === '' || estatura.trim() === '') {
      return mostrarAlerta('Error', 'Por favor, ingresa ambos valores (peso y estatura).');
    }

    if (peso.includes(',') || estatura.includes(',')) {
      return mostrarAlerta('Formato incorrecto', 'No debes usar comas, usa puntos para decimales.');
    }

    if (!/^\d*\.?\d+$/.test(peso) || !/^\d*\.?\d+$/.test(estatura)) {
      return mostrarAlerta('Error', 'Solo se permiten números positivos y puntos decimales.');
    }

    const p = parseFloat(peso);
    const e = parseFloat(estatura);

    if (e === 0) {
      return mostrarAlerta('Error', 'La estatura no puede ser 0.');
    }

    if (p <= 0) {
      return mostrarAlerta('Error', 'El peso debe ser mayor que 0.');
    }

    const imc = p / (e * e);
    const imcRedondeado = imc.toFixed(2);
    setResultado(imcRedondeado);

    let categoria = '';
    if (imc < 18.5) categoria = 'Bajo peso';
    else if (imc < 24.9) categoria = 'Peso normal';
    else if (imc < 29.9) categoria = 'Sobrepeso';
    else categoria = 'Obesidad';

    mostrarAlerta('Resultado', `Tu IMC es ${imcRedondeado} (${categoria}).`);
  };

  return (
    <LinearGradient colors={['#2629d8ff', '#ffffffff', '#2629d8ff']} style={{ flex: 1 }}>
      <SafeAreaView style={estilos.contenedorPrincipal}>
        <Text style={[estilos.titulo, { fontSize: 40 }]}>Calculadora de IMC</Text>
        <Text style={estilos.subtitulo}>
          Ingresa tu peso y estatura para conocer tu índice de masa corporal
        </Text>

        <TextInput
          style={estilos.campo}
          placeholder="Peso en kilogramos (ej. 65.5)"
          keyboardType="numeric"
          value={peso}
          onChangeText={setPeso}
        />

        <TextInput
          style={estilos.campo}
          placeholder="Estatura en metros (ej. 1.75)"
          keyboardType="numeric"
          value={estatura}
          onChangeText={setEstatura}
        />

        <TouchableOpacity onPress={calcularIMC} style={estilos.boton}>
          <Text style={estilos.textoBoton}>Calcular</Text>
        </TouchableOpacity>

        {resultado && (
          <Text style={estilos.resultado}>Tu IMC es: {resultado}</Text>
        )}
        
        {/* Imagen del IMC */}
        <Image
          source={require('./assets/imc.png')}
          style={estilos.imagenIMC}
          resizeMode="contain"
        />

        <StatusBar style="auto" />
      </SafeAreaView>
    </LinearGradient>
  );
}

const estilos = StyleSheet.create({
  contenedorPrincipal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titulo: {
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  subtitulo: {
    textAlign: 'center',
    marginBottom: 30,
  },
  campo: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  boton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultado: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  imagenIMC: {
    width: 250, // Ajusta el tamaño según lo necesites
    height: 200, // Ajusta el tamaño según lo necesites
    marginTop: 30,
  },
});
