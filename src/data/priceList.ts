export type Availability = 'In Stock' | 'Limited' | 'Out of Stock' | 'Pre-Order';

export interface Product {
  id: string;
  code: string;
  description: string;
  brand: string;
  gradingSize: string;
  kgSize: string;
  availability: Availability;
  fishShopPrice: number;
  restaurantPrice: number;
  wholesalePrice: number;
  palletBuyPrice: number;
}

export interface Category {
  id: string;
  name: string;
  items: Product[];
}

// Helper to generate random IDs
export const generateId = () => Math.random().toString(36).substr(2, 9);

export const initialPriceListData: Category[] = [
{
  id: generateId(),
  name: 'TIGER PRAWNS - RAW WHOLE',
  items: [
  {
    id: generateId(),
    code: 'TP-001',
    description: 'Fresh Whole Tiger Prawns',
    brand: 'Sea Harvest',
    gradingSize: '6/8',
    kgSize: '5 KG',
    availability: 'In Stock',
    fishShopPrice: 28.5,
    restaurantPrice: 26.0,
    wholesalePrice: 24.5,
    palletBuyPrice: 22.0
  },
  {
    id: generateId(),
    code: 'TP-002',
    description: 'Fresh Whole Tiger Prawns',
    brand: 'Sea Harvest',
    gradingSize: '9/12',
    kgSize: '5 KG',
    availability: 'In Stock',
    fishShopPrice: 24.0,
    restaurantPrice: 22.5,
    wholesalePrice: 20.0,
    palletBuyPrice: 18.5
  },
  {
    id: generateId(),
    code: 'TP-003',
    description: 'Fresh Whole Tiger Prawns',
    brand: 'Sea Harvest',
    gradingSize: '13/15',
    kgSize: '5 KG',
    availability: 'Limited',
    fishShopPrice: 20.5,
    restaurantPrice: 19.0,
    wholesalePrice: 17.5,
    palletBuyPrice: 16.0
  },
  {
    id: generateId(),
    code: 'TP-004',
    description: 'Fresh Whole Tiger Prawns',
    brand: 'Sea Harvest',
    gradingSize: '16/20',
    kgSize: '5 KG',
    availability: 'In Stock',
    fishShopPrice: 18.0,
    restaurantPrice: 16.5,
    wholesalePrice: 15.0,
    palletBuyPrice: 13.5
  }]

},
{
  id: generateId(),
  name: 'VANNAMEI SHRIMP - PEELED DEVEINED',
  items: [
  {
    id: generateId(),
    code: 'VS-101',
    description: 'Peeled Vannamei Shrimp',
    brand: 'Ocean Catch',
    gradingSize: '31/40',
    kgSize: '10 KG',
    availability: 'In Stock',
    fishShopPrice: 15.5,
    restaurantPrice: 14.0,
    wholesalePrice: 12.5,
    palletBuyPrice: 11.0
  },
  {
    id: generateId(),
    code: 'VS-102',
    description: 'Peeled Vannamei Shrimp',
    brand: 'Ocean Catch',
    gradingSize: '41/50',
    kgSize: '10 KG',
    availability: 'In Stock',
    fishShopPrice: 14.0,
    restaurantPrice: 12.5,
    wholesalePrice: 11.0,
    palletBuyPrice: 9.5
  }]

},
{
  id: generateId(),
  name: 'SNAPPER & MACKEREL',
  items: [
  {
    id: generateId(),
    code: 'SM-201',
    description: 'Red Snapper Fillet (Skin On)',
    brand: 'Blue Wave',
    gradingSize: '500-800g',
    kgSize: '10 KG',
    availability: 'In Stock',
    fishShopPrice: 12.0,
    restaurantPrice: 10.5,
    wholesalePrice: 9.0,
    palletBuyPrice: 8.0
  },
  {
    id: generateId(),
    code: 'SM-202',
    description: 'Mackerel Steak Portion',
    brand: 'Blue Wave',
    gradingSize: 'Standard',
    kgSize: '5 KG',
    availability: 'Limited',
    fishShopPrice: 9.5,
    restaurantPrice: 8.0,
    wholesalePrice: 7.0,
    palletBuyPrice: 6.0
  }]

},
{
  id: generateId(),
  name: 'YELLOWFIN TUNA',
  items: [
  {
    id: generateId(),
    code: 'YT-301',
    description: 'Tuna Loin Export Quality',
    brand: 'Sea Harvest',
    gradingSize: '2-3 KG/pc',
    kgSize: '15 KG',
    availability: 'In Stock',
    fishShopPrice: 18.5,
    restaurantPrice: 17.0,
    wholesalePrice: 15.5,
    palletBuyPrice: 14.0
  },
  {
    id: generateId(),
    code: 'YT-302',
    description: 'Tuna Saku AAA',
    brand: 'Sea Harvest',
    gradingSize: '300-500g',
    kgSize: '10 KG',
    availability: 'Pre-Order',
    fishShopPrice: 22.0,
    restaurantPrice: 20.0,
    wholesalePrice: 18.5,
    palletBuyPrice: 17.0
  }]

}];


export interface AddOnItem {
  id: string;
  code: string;
  description: string;
  unit: string;
  fishShopPrice: number;
  restaurantPrice: number;
  wholesalePrice: number;
}

export const initialAddOnData: AddOnItem[] = [
{
  id: generateId(),
  code: 'AO-01',
  description: 'Filleting Service',
  unit: 'per KG',
  fishShopPrice: 2.5,
  restaurantPrice: 2.0,
  wholesalePrice: 1.5
},
{
  id: generateId(),
  code: 'AO-02',
  description: 'Skinning & Deboning',
  unit: 'per KG',
  fishShopPrice: 3.0,
  restaurantPrice: 2.5,
  wholesalePrice: 2.0
},
{
  id: generateId(),
  code: 'AO-03',
  description: 'Vacuum Packing',
  unit: 'per pack',
  fishShopPrice: 1.5,
  restaurantPrice: 1.2,
  wholesalePrice: 0.8
},
{
  id: generateId(),
  code: 'AO-04',
  description: 'Styrofoam Box + Ice',
  unit: 'per box',
  fishShopPrice: 5.0,
  restaurantPrice: 5.0,
  wholesalePrice: 4.0
},
{
  id: generateId(),
  code: 'AO-05',
  description: 'Local Delivery (< 30km)',
  unit: 'per trip',
  fishShopPrice: 15.0,
  restaurantPrice: 15.0,
  wholesalePrice: 0.0
},
{
  id: generateId(),
  code: 'AO-06',
  description: 'Interstate Freight',
  unit: 'per KG',
  fishShopPrice: 1.8,
  restaurantPrice: 1.8,
  wholesalePrice: 1.5
},
{
  id: generateId(),
  code: 'AO-07',
  description: 'Custom Portioning',
  unit: 'per KG',
  fishShopPrice: 4.0,
  restaurantPrice: 3.5,
  wholesalePrice: 3.0
},
{
  id: generateId(),
  code: 'AO-08',
  description: 'Marination / Seasoning',
  unit: 'per KG',
  fishShopPrice: 5.5,
  restaurantPrice: 5.0,
  wholesalePrice: 4.5
}];


export const formatUSD = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};