import React from 'react';
import { View, Text, StyleSheet, Linking, Alert, FlatList, TouchableOpacity } from 'react-native';

export default function CallApp() {
  const restaurants = [
    { id: '1', name: 'Restaurante El Sabor', phone: '+1234567890', email: 'contacto@elsabor.com' },
    { id: '2', name: 'La Cocina de Abuela', phone: '+0987654321', email: 'contacto@lacocinadeabuela.com' },
    { id: '3', name: 'Delicias del Mar', phone: '+1122334455', email: 'contacto@deliciasdelmar.com' },
  ];

  const makeCall = async (phoneNumber) => {
    const url = `tel:${phoneNumber}`;
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Este dispositivo no puede realizar llamadas');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo abrir el marcador telefónico');
    }
  };

  const sendSMS = async (phoneNumber) => {
    const url = `sms:${phoneNumber}`;
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Este dispositivo no puede enviar SMS');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo abrir la aplicación de SMS');
    }
  };

  const sendEmail = async (emailAddress) => {
    const url = `mailto:${emailAddress}`;
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Este dispositivo no puede enviar correos electrónicos');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo abrir la aplicación de correo electrónico');
    }
  };

  const sendWhatsApp = async (phoneNumber) => {
    const url = `whatsapp://send?phone=${phoneNumber}`;
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'WhatsApp no está instalado en este dispositivo');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo abrir WhatsApp');
    }
  };

  const renderRestaurant = ({ item }) => (
    <View style={styles.restaurantContainer}>
      <Text style={styles.restaurantName}>{item.name}</Text>
      <Text style={styles.phoneNumber}>{item.phone}</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.callButton} onPress={() => makeCall(item.phone)}>
          <Text style={styles.callButtonText}>Llamar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.callButton} onPress={() => sendSMS(item.phone)}>
          <Text style={styles.callButtonText}>Enviar SMS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.callButton} onPress={() => sendEmail(item.email)}>
          <Text style={styles.callButtonText}>Enviar Email</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.callButton} onPress={() => sendWhatsApp(item.phone)}>
          <Text style={styles.callButtonText}>WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Restaurantes</Text>
      <FlatList
        data={restaurants}
        renderItem={renderRestaurant}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFDEE9',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#3B0D91',
  },
  list: {
    paddingHorizontal: 20,
  },
  restaurantContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 15,
    marginVertical: 10,
    shadowColor: '#333',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
    borderLeftWidth: 6,
    borderLeftColor: '#3B0D91',
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3B0D91',
  },
  phoneNumber: {
    fontSize: 16,
    color: '#777',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  callButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
    marginVertical: 5,
  },
  callButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
