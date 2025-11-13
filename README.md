# CheffTingz

## Project Title
CheffTingz - Recipe Management Mobile App

## Student Information
* **Name:** Marcus Fourie
* **Student Number:** ST10487313
* **Course:** MAST5112 - POE
* **Github Link:** https://github.com/Marcus-13/MAST5112POE_Part2_St10487313.git
* **Youtube Demonstrating Video Link:**[ https://youtube.com/shorts/GkS-qzBnsPM](https://youtube.com/shorts/O1nB6oAgFvQ)

## Project Overview
CheffTingz is a comprehensive mobile application built with React Native and TypeScript, designed for Chef Christoffel to digitally organize and manage his restaurant menu. The app provides full CRUD (Create, Read, Update, Delete) functionality for menu items, with advanced features including automatic price calculations and course-based filtering.

**Key Features:**

- **Home Screen** - Displays all recipes with total count and average price calculations
- **Average Price Analytics** - Automatic calculation of average prices by course type (Starters, Mains, Desserts) and overall average
- **Manage Menu Screen** - Add new recipes and remove existing ones with confirmation dialogs
- **Filter Screen** - Filter recipes by course type using array filtering methods
- **Recipe Detail Screen** - View complete information about individual dishes
- **Hamburger Menu Navigation** - Intuitive dropdown menu for accessing key features


## App Goals and Objectives
To provide a professional, easy-to-use digital solution for restaurant menu management that:

- Centralizes recipe information in one organized mobile application
- Provides real-time pricing analytics to help with menu strategy
- Enables quick filtering and searching through menu categories
- Ensures data integrity through form validation and confirmation dialogs


## Technical Implementation
### Data Structure

- All menu items are stored in a centralized array managed through React state
- Each recipe is an object with properties: id, dishName, course, description, and price
- State is managed at the navigation level and passed as props to child components

## Key Technical Features:

### Array Methods:

* **.map()** - Iterates through menuItems array to render recipe cards
* **.filter()** - Filters recipes by course type and removes items from the array
* **.reduce()** - Calculates sum of prices for average calculations


### State Management:

* useState hooks for managing menu items, form inputs, and UI state
* Props drilling for sharing data between screens


### Navigation:

* React Navigation Stack Navigator for screen transitions
* Route parameters for passing recipe data to detail screen


### Form Validation:

* Input validation before adding recipes to array
* Error alerts for invalid or missing data
* Decimal input validation for pricing


### TypeScript:

* Type-safe interfaces for MenuItem and navigation props
* Compile-time error catching for better code quality

  
## How to Run the App
1. **Clone the repo:**
   
   git clone https://github.com/Marcus-13/MAST5112POE_Part2_St10487313.git

2. **Install dependencies:**
   
   npm install

3. **Install required packages:**
   
   npm install @react-navigation/native @react-navigation/native-stack
   npx expo install react-native-screens react-native-safe-area-context
   npm install @react-native-picker/picker
   npx expo install @react-native-picker/picker

4. **Start the development server:**
   
   npx expo start

5. **Run on your device:**
    
   - Open Expo Go app on your phone
   - Scan the QR code from the terminal
   - Wait for the app to load

## Design and Resources
* **Figma:** Used for wireframes and UI design mockups
* **Color Palette:** Custom teal and turquoise theme for a fresh, modern look
* **UI/UX:** Card-based design with color-coded course badges for easy visual identification
  
## What i learnt
### Technical Skills:

- Building a multi-screen mobile app with React Native and TypeScript
- Implementing React Navigation with Stack Navigator for screen transitions
- Managing global state with React hooks (useState) and prop drilling
- Working with JavaScript array methods (map, filter, reduce) for data manipulation
- Calculating dynamic averages from array data
- Form validation and error handling with user-friendly alerts
- Conditional rendering based on filtered data
- Creating modals and dropdown menus for improved UX

### Development Practices:

- Component-based architecture for reusable code
- TypeScript for type safety and better developer experience
- Code organisation and file structure
- Version control with Git and GitHub

## Future Enhancements

* Persistent storage with AsyncStorage or a database
* Edit functionality for existing recipes
* Search feature by dish name
* Image upload for dishes
* Export menu as PDF
  
## References

https://reactnative.dev/

https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html

https://reactnavigation.org/docs/getting-started

https://advtechonline.sharepoint.com/:w:/r/sites/TertiaryStudents/_layouts/15/Doc.aspx?sourcedoc=%7BC4AAF478-96AC-4469-8005-F7CDC4A15EBB%7D&file=MAST5112MM.docx&action=default&mobileredirect=true



Built with ❤️ by Marcus Fourie



   
