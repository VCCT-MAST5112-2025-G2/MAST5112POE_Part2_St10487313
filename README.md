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

## Changelog
### Response to Previous Feedback
**Feedback 1:** "No way to add recipes on the home screen"
The previous submission (Part 2) included a fully functional "Add Recipe" button on the home screen that navigated to the AddRecipeScreen. This feature was implemented and demonstrated in the original submission. However, based on the new requirements for Part 3, the home screen has been redesigned to be a display-only interface, with recipe management now handled through a dedicated Manage Menu screen accessible via the hamburger menu.

**Feedback 2:** "Menu does not show average price"
Response: The average price calculation feature was not a requirement for Part 2 of the assignment. This functionality has been implemented in Part 3 as per the new project specifications, which explicitly required displaying average prices broken down by course type on the home screen.

### Changes Made in Part 3
**1. Home Screen Restructure**

- Removed: Direct "Add Recipe" button from home screen
- Added: Average price analytics section displaying:

* Individual averages for Starters, Mains, and Desserts
* Overall average across all menu items
* Real-time calculation using .filter() and .reduce() array methods


- Added: Hamburger menu icon in top-right corner for navigation
- Added: Modal dropdown menu for accessing Manage Menu and Filter features
- Enhanced: Recipe count display now updates dynamically as items are added/removed

**2. New Manage Menu Screen (Replaces AddRecipeScreen)**

Combined functionality: Single screen for both adding and removing recipes
**Add Section:**

- Form with inputs for dish name, course selection, description, and price
- Toggle buttons for course type selection (Starter, Main, Dessert)
- Form validation with error alerts
- Success confirmation when recipe is added
- Form automatically clears after successful submission


**Current Menu Section:**

- Lists all existing recipes with dish name and course type
- Remove button for each item
- Confirmation dialog before deletion to prevent accidental removal
- Uses .filter() method to remove items from the array


**3. New Filter Screen**

- Filter Buttons: Four options (All, Starters, Mains, Desserts)
- Dynamic Filtering: Uses .filter() array method to show only recipes matching selected course
- Results Count: Displays number of recipes matching current filter
- Recipe Display: Filtered recipes shown in same card format as home screen
- Navigation: Can tap any recipe to view full details
- Empty State: Displays helpful message when no recipes match the selected filter


**4. Technical Improvements**

- Array Methods: Extensive use of .map(), .filter(), and .reduce() for data manipulation
- State Management: Centralized menuItems array at navigation level, passed as props to all screens
- Data Flow: Proper prop drilling ensures all screens have access to current menu state
- Type Safety: Updated TypeScript interfaces to include new screen types
- Code Organisation: Separated concerns - viewing, managing, and filtering now in distinct screens
- Comments: Added detailed inline comments explaining array operations and component logic

**5. UI/UX Enhancements**

- Consistent Design: All screens follow the same teal/turquoise color scheme
- Visual Feedback: Active states on all buttons and filters
- Confirmation Dialogs: Prevent accidental data loss when removing items
- Empty States: Helpful messages when no recipes exist or match filters
- Responsive Layout: ScrollViews ensure content is accessible on all screen sizes


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



   
