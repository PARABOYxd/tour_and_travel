import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistState {
  items: string[];
  addToWishlist: (packageId: string) => void;
  removeFromWishlist: (packageId: string) => void;
  isInWishlist: (packageId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addToWishlist: (packageId) => {
        set((state) => ({
          items: state.items.includes(packageId)
            ? state.items
            : [...state.items, packageId],
        }));
      },
      
      removeFromWishlist: (packageId) => {
        set((state) => ({
          items: state.items.filter((id) => id !== packageId),
        }));
      },
      
      isInWishlist: (packageId) => {
        return get().items.includes(packageId);
      },
      
      clearWishlist: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
);