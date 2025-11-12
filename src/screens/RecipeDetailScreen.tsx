import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

// Define props for the RecipeDetailScreen (this gives access to navigation and route params)
type Props = NativeStackScreenProps<RootStackParamList, 'RecipeDetail'>;

// main RecipeDetailScreen component that shows detailed info about a selected recipe
export default function RecipeDetailScreen({ navigation, route }: Props) {
  // extract the recipe parameter from route params (this was passed during navigation)
  const { recipe } = route.params;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#B8E6E6" /> 
      
      {/* header section */}
      <View style={styles.header}>
        {/* back nav button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Recipe Details</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {/* Recipe Card */}
        <View style={styles.recipeCard}>
          <Text style={styles.dishName}>{recipe.dishName}</Text>

          {/* course badge with conditional styling based on course type */}
          <View style={[
            styles.courseBadge,
            recipe.course === 'Starter' && styles.starterBadge,
            recipe.course === 'Main' && styles.mainBadge,
            recipe.course === 'Dessert' && styles.dessertBadge,
          ]}>
            <Text style={styles.courseText}>{recipe.course}</Text>
          </View>

          <View style={styles.divider} /> 

          {/* description section */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Description</Text>
            {/* full description text ( no line limit here ) */}
            <Text style={styles.sectionValue}>{recipe.description}</Text>
          </View>

          <View style={styles.divider} /> 

          {/* price section */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Price</Text>
            <Text style={styles.priceValue}>R{recipe.price}</Text>
          </View>
        </View>

        {/* bottom back button for returning to recipe list */}
        <TouchableOpacity
          style={styles.bottomBackButton}
          onPress={() => navigation.goBack()} 
        >
          <Text style={styles.bottomBackButtonText}>Back to Recipes</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// styles for RecipeDetailScreen component
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
  recipeCard: {
    backgroundColor: '#D4F1F1',
    borderRadius: 20,
    padding: 25,
    borderWidth: 1,
    borderColor: '#94D4D4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  dishName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
    textAlign: 'center',
  },
  courseBadge: {
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
  },

  // course badge colors
  starterBadge: {
    backgroundColor: '#4bbe94ff',
  },
  mainBadge: {
    backgroundColor: '#3a7d64ff',
  },
  dessertBadge: {
    backgroundColor: '#A8E6CF',
  },


  courseText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  divider: {
    height: 1,
    backgroundColor: '#94D4D4',
    marginVertical: 20,
  },
  section: {
    marginBottom: 10,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sectionValue: {
    fontSize: 16,
    color: '#000',
    lineHeight: 24,
  },
  priceValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  bottomBackButton: {
    backgroundColor: '#6BC5C5',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  bottomBackButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});