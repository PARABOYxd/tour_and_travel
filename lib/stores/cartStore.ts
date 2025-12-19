import { create } from 'zustand';

interface Package {
  id: string;
  title: string;
  price: number;
  duration: string;
  image: string;
}

interface BookingDetails {
  startDate: Date | null;
  endDate: Date | null;
  travelers: number;
  specialRequests?: string;
}

interface AddOn {
  id: string;
  name: string;
  price: number;
  selected: boolean;
}

interface CartState {
  selectedPackage: Package | null;
  bookingDetails: BookingDetails;
  addOns: AddOn[];
  totalPrice: number;
  setSelectedPackage: (pkg: Package) => void;
  setBookingDetails: (details: Partial<BookingDetails>) => void;
  toggleAddOn: (addOnId: string) => void;
  calculateTotal: () => void;
  clearCart: () => void;
}

const defaultAddOns: AddOn[] = [
  { id: '1', name: 'Travel Insurance', price: 500, selected: false },
  { id: '2', name: 'Airport Pickup', price: 1500, selected: false },
  { id: '3', name: 'Extra Meals', price: 2000, selected: false },
  { id: '4', name: 'Professional Photography', price: 3000, selected: false },
];

export const useCartStore = create<CartState>((set, get) => ({
  selectedPackage: null,
  bookingDetails: {
    startDate: null,
    endDate: null,
    travelers: 1,
    specialRequests: '',
  },
  addOns: defaultAddOns,
  totalPrice: 0,
  
  setSelectedPackage: (pkg) => {
    set({ selectedPackage: pkg });
    get().calculateTotal();
  },
  
  setBookingDetails: (details) => {
    set((state) => ({
      bookingDetails: { ...state.bookingDetails, ...details },
    }));
    get().calculateTotal();
  },
  
  toggleAddOn: (addOnId) => {
    set((state) => ({
      addOns: state.addOns.map((addOn) =>
        addOn.id === addOnId ? { ...addOn, selected: !addOn.selected } : addOn
      ),
    }));
    get().calculateTotal();
  },
  
  calculateTotal: () => {
    const { selectedPackage, bookingDetails, addOns } = get();
    if (!selectedPackage) return;
    
    const basePrice = selectedPackage.price * bookingDetails.travelers;
    const addOnPrice = addOns
      .filter((addOn) => addOn.selected)
      .reduce((sum, addOn) => sum + addOn.price, 0);
    const taxes = (basePrice + addOnPrice) * 0.18; // 18% GST
    
    set({ totalPrice: basePrice + addOnPrice + taxes });
  },
  
  clearCart: () => {
    set({
      selectedPackage: null,
      bookingDetails: {
        startDate: null,
        endDate: null,
        travelers: 1,
        specialRequests: '',
      },
      addOns: defaultAddOns.map((addOn) => ({ ...addOn, selected: false })),
      totalPrice: 0,
    });
  },
}));