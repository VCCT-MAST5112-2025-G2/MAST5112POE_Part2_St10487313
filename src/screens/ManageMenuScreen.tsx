import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, StatusBar } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, MenuItem } from '../types';

type ManageMenuScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ManageMenu'>;

interface Props {
  navigation: ManageMenuScreenNavigationProp;
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
}

export default function ManageMenuScreen({ navigation, menuItems, setMenuItems }: Props) {
  // form state variables
  const [dishName, setDishName] = useState('');
  const [course, setCourse] = useState<'Starter' | 'Main' | 'Dessert'>('Starter');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  // function to handle adding a new dish
  const handleAddDish = () => {
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

    // create new recipe object
    const newRecipe: MenuItem = {
      id: Date.now().toString(),
      dishName: dishName.trim(),
      course,
      description: description.trim(),
      price: price.trim(),
    };

    // add to menu items array
    setMenuItems(prev => [...prev, newRecipe]);

    // clear form
    setDishName('');
    setDescription('');
    setPrice('');
    setCourse('Starter');

    Alert.alert('Success', 'Recipe added successfully!');
  };

  // function to handle removing a dish
  const handleRemoveDish = (id: string, dishName: string) => {
    Alert.alert(
      'Remove Dish',
      `Are you sure you want to remove "${dishName}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setMenuItems(prev => prev.filter(item => item.id !== id));
            Alert.alert('Success', 'Dish removed successfully!');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#B8E6E6" />
      
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Manage Menu</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        
        {/* ADD DISH SECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add New Dish</Text>
          <View style={styles.form}>
            
            {/* dish name input */}
            <Text style={styles.label}>Dish Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Grilled Prawns"
              value={dishName}
              onChangeText={setDishName}
              placeholderTextColor="#999"
            />

            {/* course selection */}
            <Text style={styles.label}>Course</Text>
            <View style={styles.courseButtonContainer}>
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

            {/* description input */}
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe your dish..."
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              placeholderTextColor="#999"
            />

            {/* price input */}
            <Text style={styles.label}>Price (R)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 69.99"
              value={price}
              onChangeText={setPrice}
              keyboardType="decimal-pad"
              placeholderTextColor="#999"
            />

            {/* add dish button */}
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddDish}
            >
              <Text style={styles.addButtonText}>Add Dish</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* CURRENT MENU SECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Menu</Text>
          {menuItems.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No dishes yet</Text>
            </View>
          ) : (
            menuItems.map((item) => (
              <View key={item.id} style={styles.menuItem}>
                <View style={styles.menuItemInfo}>
                  <Text style={styles.menuItemName}>{item.dishName}</Text>
                  <Text style={styles.menuItemCourse}>({item.course})</Text>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveDish(item.id, item.dishName)}
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        {/* go home button */}
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.homeButtonText}>Go Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B8E6E6',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
  },
  form: {
    backgroundColor: '#D4F1F1',
    borderRadius: 20,
    padding: 20,
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
    minHeight: 80,
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
  addButton: {
    backgroundColor: '#6BC5C5',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  addButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  menuItem: {
    backgroundColor: '#D4F1F1',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#94D4D4',
  },
  menuItemInfo: {
    flex: 1,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  menuItemCourse: {
    fontSize: 13,
    color: '#666',
  },
  removeButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  emptyContainer: {
    backgroundColor: '#D4F1F1',
    borderRadius: 12,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#94D4D4',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  homeButton: {
    backgroundColor: '#6BC5C5',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  homeButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});