import React, { useState } from 'react';
import {View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, Modal} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, MenuItem } from '../types';

// define navigation prop type for HomeScreen
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

// props interface defining what data the HomeScreen expects
interface Props {
  navigation: HomeScreenNavigationProp; //nav object for screen transitions
  menuItems: MenuItem[];                //array of menu items (recipes) to display
}

// main HomeScreen component that displays the menu/recipe list
export default function HomeScreen({ navigation, menuItems }: Props) {
  // state to control hamburger menu visibility
  const [menuVisible, setMenuVisible] = useState(false);

  // function to calculate average price for each course type
  const calculateAverages = () => {
    const starters = menuItems.filter(item => item.course === 'Starter');
    const mains = menuItems.filter(item => item.course === 'Main');
    const desserts = menuItems.filter(item => item.course === 'Dessert');

    // helper function to calculate average for a specific course
    const getAverage = (items: MenuItem[]) => {
      if (items.length === 0) return 0;
      const total = items.reduce((sum, item) => sum + parseFloat(item.price), 0);
      return total / items.length;
    };

    return {
      starter: getAverage(starters),
      main: getAverage(mains),
      dessert: getAverage(desserts),
      overall: menuItems.length > 0 
        ? menuItems.reduce((sum, item) => sum + parseFloat(item.price), 0) / menuItems.length 
        : 0,
    };
  };

  // call the function to get the averages
  const averages = calculateAverages();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#B8E6E6" />

      {/* header section - including the recipe count */}
      <View style={styles.header}>
        <Text style={styles.title}>CheffTingz</Text>
        <Text style={styles.subtitle}>My Menu </Text>
        <Text style={styles.count}>Total: {menuItems.length} recipes</Text>
        
        {/* hamburger menu button */}
        <TouchableOpacity
          style={styles.hamburgerButton}
          onPress={() => setMenuVisible(true)}
        >
          <Text style={styles.hamburgerIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* hamburger menu modal */}
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.menuDropdown}>
            <TouchableOpacity
              style={styles.menuOption}
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate('ManageMenu');
              }}
            >
              <Text style={styles.menuOptionText}>📝 Manage Menu</Text>
            </TouchableOpacity>
            
            <View style={styles.menuDivider} />
            
           <TouchableOpacity
              style={styles.menuOption}
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate('FilterRecipes');
              }}
            >
              <Text style={styles.menuOptionText}>🔍 Filter Recipes</Text>
            </TouchableOpacity>
            
            <View style={styles.menuDivider} />
            
            <TouchableOpacity
              style={styles.menuOption}
              onPress={() => setMenuVisible(false)}
            >
              <Text style={[styles.menuOptionText, styles.cancelText]}>✕ Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* average price section */}
      <View style={styles.averageContainer}>
        <Text style={styles.averageTitle}>Average Prices</Text>
        <View style={styles.averageGrid}>
          <View style={styles.averageItem}>
            <Text style={styles.averageLabel}>Starters</Text>
            <Text style={styles.averageValue}>R{averages.starter.toFixed(2)}</Text>
          </View>
          <View style={styles.averageItem}>
            <Text style={styles.averageLabel}>Mains</Text>
            <Text style={styles.averageValue}>R{averages.main.toFixed(2)}</Text>
          </View>
          <View style={styles.averageItem}>
            <Text style={styles.averageLabel}>Desserts</Text>
            <Text style={styles.averageValue}>R{averages.dessert.toFixed(2)}</Text>
          </View>
        </View>
        <View style={styles.overallAverage}>
          <Text style={styles.overallLabel}>Overall Average: </Text>
          <Text style={styles.overallValue}>R{averages.overall.toFixed(2)}</Text>
        </View>
      </View>

      {/*scrollable recipe list */}
      <ScrollView style={styles.recipeList} contentContainerStyle={styles.scrollContent}>
        {menuItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No recipes yet</Text>
            <Text style={styles.emptySubtext}>Add some recipes to get started!</Text>
          </View>
        ) : (
          menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.recipeCard}
              // navigate to RecipeDetail screen when a recipe is tapped
              onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
            >
              <View style={styles.recipeHeader}>
                <Text style={styles.recipeName}>{item.dishName}</Text>
                {/* course badge with conditional styling based on course type */}
                <View style={[
                  styles.courseBadge,
                  item.course === 'Starter' && styles.starterBadge,
                  item.course === 'Main' && styles.mainBadge,
                  item.course === 'Dessert' && styles.dessertBadge,
                ]}>
                  <Text style={styles.courseText}>{item.course}</Text>
                </View>
              </View>
              <Text style={styles.recipeDescription} numberOfLines={2}> {/* line limit on description for consistent card height */}
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

// styles for HomeScreen component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B8E6E6',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    marginTop: 5,
  },
  count: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
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
  averageContainer: {
    backgroundColor: '#D4F1F1',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
    padding: 18,
    borderWidth: 1,
    borderColor: '#94D4D4',
  },
  averageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
    textAlign: 'center',
  },
  averageGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
    gap: 10,
  },
  averageItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  averageLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 5,
    fontWeight: '600',
    textAlign: 'center',
  },
  averageValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  overallAverage: {
    backgroundColor: '#6BC5C5',
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overallLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  overallValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  hamburgerButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    padding: 10,
  },
  hamburgerIcon: {
    fontSize: 30,
    color: '#000',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 100,
    paddingRight: 20,
  },
  menuDropdown: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  menuOption: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  menuOptionText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  cancelText: {
    color: '#666',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 8,
  },
});