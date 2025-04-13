export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  membershipStatus?: 'active' | 'inactive' | 'expired';
  // Add other user properties as needed
} 