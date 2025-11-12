// this file defines TypeScript types used in the app
// types catch errors during development

// this interface defines the structure of a menu item (recipe) and every recipes MUST follow this structure
export interface MenuItem {
  id: string;
  dishName: string;
  course: 'Starter' | 'Main' | 'Dessert';
  description: string;
  price: string;
}

// this type defines the navigation structure and the parameters each screen expects
export type RootStackParamList = {
  Home: undefined;                    // Home screen does not expect any parameters
  ManageMenu: undefined;              // ManageMenu screen does not expect any parameters
  FilterRecipes: undefined;           // FilterRecipes screen does not expect any parameters
  RecipeDetail: { recipe: MenuItem }; // RecipeDetail screen expects a 'recipe' parameter of type MenuItem
};