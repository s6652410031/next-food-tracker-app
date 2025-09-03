export type FoodItem = {
  id: number;
  date: string;
  imageUrl: string;
  name: string;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  profileImage?: string;
};

export type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (userData: Omit<User, 'id'>) => boolean;
  logout: () => void;
};
