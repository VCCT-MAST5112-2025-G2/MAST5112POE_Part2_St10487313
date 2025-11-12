import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, StatusBar } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, MenuItem } from '../types';

// define navigation prop type for AddRecipeScreen
type AddRecipeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddRecipe'>;

// props interface defining what data the AddRecipeScreen expects
interface Props {
  navigation: AddRecipeScreenNavigationProp;            // nav object for screen transitions
  menuItems: MenuItem[];                                // array of menu items (recipes) for adding new recipes to an existing list
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>; // state setter function to update menu items list
}

// main AddRecipeScreen component that handles adding new recipes
export default function AddRecipeScreen({ navigation, menuItems, setMenuItems }: Props) {
  // form state variables
  const [dishName, setDishName] = useState('');
  const [course, setCourse] = useState<'Starter' | 'Main' | 'Dessert'>('Starter');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  // function to handle form submission and recipe addition
  const handleFinish = () => {
    if (!dishName.trim()) {
      Alert.alert('Error', 'Please enter a dish name');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Error', 'Please enter a description');
      return;
    }
    if (!price.trim()) {
      Alert.alert('Error', 'Please enter a price');
      return;
    }
    if (isNaN(parseFloat(price))) {
      Alert.alert('Error', 'Please enter a valid price');
      return;
    }

    // Create new recipe object with form data (and a unique id)
    const newRecipe: MenuItem = {
      id: Date.now().toString(),
      dishName: dishName.trim(),
      course,
      description: description.trim(),
      price: price.trim(),
    };

    // Add to menu items to array/list
    setMenuItems(prev => [...prev, newRecipe]);

    // Show success and navigate back
    Alert.alert('Success', 'Recipe added successfully!', [
      {
        text: 'OK',
        onPress: () => navigation.goBack(), // return to home screen
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#B8E6E6" /> 
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Add New Recipe</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {/* main form container */}
        <View style={styles.form}>

          {/* dish name input field */}
          <Text style={styles.label}>Dish Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Grilled Prawns"
            value={dishName}
            onChangeText={setDishName}
            placeholderTextColor="#999"
          />

          {/* course selection buttons */}
          <Text style={styles.label}>Course</Text>
          <View style={styles.courseButtonContainer}>

            {/* starter button with conditional styling */}
            <TouchableOpacity
              style={[
                styles.courseButton,
                course === 'Starter' && styles.courseButtonActive,
              ]}
              onPress={() => setCourse('Starter')}
            >
              <Text
                style={[
                  styles.courseButtonText,
                  course === 'Starter' && styles.courseButtonTextActive,
                ]}
              >
                Starter
              </Text>
            </TouchableOpacity>

            {/* main course button with conditional styling */}
            <TouchableOpacity
              style={[
                styles.courseButton,
                course === 'Main' && styles.courseButtonActive,
              ]}
              onPress={() => setCourse('Main')}
            >
              <Text
                style={[
                  styles.courseButtonText,
                  course === 'Main' && styles.courseButtonTextActive,
                ]}
              >
                Main
              </Text>
            </TouchableOpacity>

            {/* dessert button with conditional styling */}
            <TouchableOpacity
              style={[
                styles.courseButton,
                course === 'Dessert' && styles.courseButtonActive,
              ]}
              onPress={() => setCourse('Dessert')}
            >
              <Text
                style={[
                  styles.courseButtonText,
                  course === 'Dessert' && styles.courseButtonTextActive,
                ]}
              >
                Dessert
              </Text>
            </TouchableOpacity>
          </View>

          {/* description input field (multiline textarea) */}
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe your dish..."
            value={description}
            onChangeText={setDescription} 
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            placeholderTextColor="#999"
          />

          {/* price input field with numeric keyboard */}
          <Text style={styles.label}>Price (R)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 69.99"
            value={price}
            onChangeText={setPrice}
            keyboardType="decimal-pad"
            placeholderTextColor="#999"
          />
        </View>

        {/* action buttons container */}
        <View style={styles.buttonContainer}>
          {/* cancel button to go back without saving */}
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>

          {/* finish button to submit the form and add/save recipe */}
          <TouchableOpacity
            style={styles.finishButton}
            onPress={handleFinish}
          >
            <Text style={styles.finishButtonText}>Finish</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

// styles for AddRecipeScreen component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B8E6E6',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  form: {
    backgroundColor: '#D4F1F1',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#94D4D4',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#94D4D4',
    color: '#000',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  courseButtonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 5,
  },
  courseButton: {
    flex: 1,
    backgroundColor: '#ccc',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#999',
  },
  courseButtonActive: {
    backgroundColor: '#6BC5C5',
    borderColor: '#5AB4B4',
  },
  courseButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  courseButtonTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#94D4D4',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  finishButton: {
    flex: 1,
    backgroundColor: '#6BC5C5',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  finishButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});