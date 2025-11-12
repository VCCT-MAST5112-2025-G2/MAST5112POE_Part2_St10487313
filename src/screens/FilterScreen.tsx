import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, MenuItem } from '../types';

type FilterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'FilterRecipes'>;

interface Props {
  navigation: FilterScreenNavigationProp;
  menuItems: MenuItem[];
}

export default function FilterScreen({ navigation, menuItems }: Props) {
  // state to track which course filter is active
  const [selectedCourse, setSelectedCourse] = useState<'All' | 'Starter' | 'Main' | 'Dessert'>('All');

  // filter menu items based on selected course
  const filteredItems = selectedCourse === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.course === selectedCourse);

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
        <Text style={styles.title}>Filter Recipes</Text>
      </View>

      {/* filter buttons */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter by Course:</Text>
        <View style={styles.filterButtons}>
          
          {/* All button */}
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedCourse === 'All' && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedCourse('All')}
          >
            <Text
              style={[
                styles.filterButtonText,
                selectedCourse === 'All' && styles.filterButtonTextActive,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>

          {/* Starter button */}
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedCourse === 'Starter' && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedCourse('Starter')}
          >
            <Text
              style={[
                styles.filterButtonText,
                selectedCourse === 'Starter' && styles.filterButtonTextActive,
              ]}
            >
              Starters
            </Text>
          </TouchableOpacity>

          {/* Main button */}
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedCourse === 'Main' && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedCourse('Main')}
          >
            <Text
              style={[
                styles.filterButtonText,
                selectedCourse === 'Main' && styles.filterButtonTextActive,
              ]}
            >
              Mains
            </Text>
          </TouchableOpacity>

          {/* Dessert button */}
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedCourse === 'Dessert' && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedCourse('Dessert')}
          >
            <Text
              style={[
                styles.filterButtonText,
                selectedCourse === 'Dessert' && styles.filterButtonTextActive,
              ]}
            >
              Desserts
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* results count */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>
          Showing {filteredItems.length} {selectedCourse === 'All' ? 'recipe' : selectedCourse}{filteredItems.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {/* filtered recipe list */}
      <ScrollView style={styles.recipeList} contentContainerStyle={styles.scrollContent}>
        {filteredItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No {selectedCourse.toLowerCase()} recipes found</Text>
            <Text style={styles.emptySubtext}>Try a different filter!</Text>
          </View>
        ) : (
          filteredItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.recipeCard}
              onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
            >
              <View style={styles.recipeHeader}>
                <Text style={styles.recipeName}>{item.dishName}</Text>
                <View style={[
                  styles.courseBadge,
                  item.course === 'Starter' && styles.starterBadge,
                  item.course === 'Main' && styles.mainBadge,
                  item.course === 'Dessert' && styles.dessertBadge,
                ]}>
                  <Text style={styles.courseText}>{item.course}</Text>
                </View>
              </View>
              <Text style={styles.recipeDescription} numberOfLines={2}>
                {item.description}
              </Text>
              <Text style={styles.recipePrice}>R{item.price}</Text>
            </TouchableOpacity>
          ))
        )}
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
  filterContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  filterButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    flex: 1,
    backgroundColor: '#D4F1F1',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#94D4D4',
  },
  filterButtonActive: {
    backgroundColor: '#6BC5C5',
    borderColor: '#5AB4B4',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  filterButtonTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  resultsHeader: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  resultsCount: {
    fontSize: 15,
    color: '#333',
    fontWeight: '600',
  },
  recipeList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
    backgroundColor: '#D4F1F1',
    padding: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#94D4D4',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    fontWeight: '600',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  recipeCard: {
    backgroundColor: '#D4F1F1',
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#94D4D4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recipeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
  },
  courseBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
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
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
  },
  recipeDescription: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
    lineHeight: 20,
  },
  recipePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});