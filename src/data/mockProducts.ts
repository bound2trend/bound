import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Oversized Street Tee',
    slug: 'oversized-street-tee',
    description: 'This oversized tee features a relaxed fit with dropped shoulders for the ultimate street style look. Made from premium cotton for all-day comfort.',
    price: 1999,
    compareAtPrice: 2499,
    images: [
      'https://images.pexels.com/photos/5384423/pexels-photo-5384423.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/5384424/pexels-photo-5384424.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/5384425/pexels-photo-5384425.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'tees',
    collections: ['new-arrivals', 'street-essentials'],
    tags: ['oversized', 'cotton', 'streetwear'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'White', value: '#FFFFFF' },
      { name: 'Sage Green', value: '#7D8471' }
    ],
    featured: true,
    trending: true,
    new: true,
    inStock: true,
    createdAt: '2023-09-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Cargo Joggers',
    slug: 'cargo-joggers',
    description: 'Elevate your casual wardrobe with these relaxed-fit cargo joggers. Featuring multiple pockets and an adjustable drawstring waist for practicality and comfort.',
    price: 2499,
    compareAtPrice: 2999,
    images: [
      'https://images.pexels.com/photos/1176618/pexels-photo-1176618.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1844012/pexels-photo-1844012.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'bottoms',
    collections: ['bestsellers', 'street-essentials'],
    tags: ['cargo', 'joggers', 'streetwear'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'Olive', value: '#556B2F' },
      { name: 'Beige', value: '#F5F5DC' }
    ],
    featured: true,
    trending: true,
    new: false,
    inStock: true,
    createdAt: '2023-08-20T09:15:00Z'
  },
  {
    id: '3',
    name: 'Urban Tech Jacket',
    slug: 'urban-tech-jacket',
    description: 'This urban-inspired jacket combines style with functionality. Water-resistant outer shell with multiple pockets and a concealed hood for unexpected weather changes.',
    price: 3999,
    compareAtPrice: 4499,
    images: [
      'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'outerwear',
    collections: ['new-arrivals', 'urban-tech'],
    tags: ['jacket', 'waterproof', 'urban'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'Navy', value: '#000080' }
    ],
    featured: true,
    trending: false,
    new: true,
    inStock: true,
    createdAt: '2023-09-22T11:30:00Z'
  },
  {
    id: '4',
    name: 'Graphic Print Hoodie',
    slug: 'graphic-print-hoodie',
    description: 'Stand out with this bold graphic print hoodie. Features an oversized fit with a kangaroo pocket and adjustable drawstring hood for the perfect street style look.',
    price: 2799,
    images: [
      'https://images.pexels.com/photos/6347892/pexels-photo-6347892.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/5384423/pexels-photo-5384423.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6311475/pexels-photo-6311475.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'hoodies',
    collections: ['bestsellers', 'graphic-collection'],
    tags: ['hoodie', 'graphic', 'streetwear'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'Grey', value: '#808080' }
    ],
    featured: false,
    trending: true,
    new: false,
    inStock: true,
    createdAt: '2023-08-05T14:20:00Z'
  },
  {
    id: '5',
    name: 'Slim Fit Jeans',
    slug: 'slim-fit-jeans',
    description: 'These premium slim fit jeans offer the perfect balance between comfort and style. Crafted from high-quality denim with a touch of stretch for all-day wearability.',
    price: 2599,
    compareAtPrice: 3199,
    images: [
      'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1487781/pexels-photo-1487781.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1176618/pexels-photo-1176618.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'bottoms',
    collections: ['essentials', 'denim-collection'],
    tags: ['jeans', 'slim-fit', 'denim'],
    sizes: ['28', '30', '32', '34', '36'],
    colors: [
      { name: 'Blue', value: '#0000FF' },
      { name: 'Black', value: '#000000' },
      { name: 'Washed Blue', value: '#5D8AA8' }
    ],
    featured: false,
    trending: false,
    new: false,
    inStock: true,
    createdAt: '2023-07-12T10:45:00Z'
  },
  {
    id: '6',
    name: 'Urban Bomber Jacket',
    slug: 'urban-bomber-jacket',
    description: 'A modern take on the classic bomber jacket, featuring a sleek design with ribbed cuffs and hem. Perfect for transitional weather and easy to layer.',
    price: 3499,
    images: [
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'outerwear',
    collections: ['bestsellers', 'urban-essentials'],
    tags: ['bomber', 'jacket', 'urban'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'Olive', value: '#556B2F' }
    ],
    featured: true,
    trending: true,
    new: false,
    inStock: true,
    createdAt: '2023-09-01T09:30:00Z'
  },
  {
    id: '7',
    name: 'Statement Graphic Tee',
    slug: 'statement-graphic-tee',
    description: 'Express yourself with this bold statement graphic tee. Made from soft 100% cotton with a regular fit for everyday comfort.',
    price: 1599,
    images: [
      'https://images.pexels.com/photos/5384423/pexels-photo-5384423.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/5384424/pexels-photo-5384424.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/5384425/pexels-photo-5384425.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'tees',
    collections: ['graphic-collection', 'essentials'],
    tags: ['tee', 'graphic', 'statement'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'White', value: '#FFFFFF' },
      { name: 'Black', value: '#000000' }
    ],
    featured: false,
    trending: false,
    new: true,
    inStock: true,
    createdAt: '2023-09-18T15:45:00Z'
  },
  {
    id: '8',
    name: 'Tech Fleece Joggers',
    slug: 'tech-fleece-joggers',
    description: 'Stay comfortable and stylish with these tech fleece joggers. Features a tapered fit with zippered pockets and elastic cuffs for a modern silhouette.',
    price: 2299,
    compareAtPrice: 2799,
    images: [
      'https://images.pexels.com/photos/1176618/pexels-photo-1176618.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1018911/pexels-photo-1018911.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'bottoms',
    collections: ['urban-tech', 'bestsellers'],
    tags: ['joggers', 'tech-fleece', 'activewear'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'Grey', value: '#808080' },
      { name: 'Navy', value: '#000080' }
    ],
    featured: false,
    trending: true,
    new: false,
    inStock: true,
    createdAt: '2023-08-25T12:15:00Z'
  }
];

export const categories = [
  {
    id: '1',
    name: 'Tees',
    slug: 'tees',
    description: 'Our collection of stylish and comfortable tees',
    image: 'https://images.pexels.com/photos/6347892/pexels-photo-6347892.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '2',
    name: 'Bottoms',
    slug: 'bottoms',
    description: 'From joggers to jeans, find your perfect fit',
    image: 'https://images.pexels.com/photos/1176618/pexels-photo-1176618.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '3',
    name: 'Outerwear',
    slug: 'outerwear',
    description: 'Layer up with our trendy outerwear collection',
    image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '4',
    name: 'Hoodies',
    slug: 'hoodies',
    description: 'Stay warm and stylish with our hoodie collection',
    image: 'https://images.pexels.com/photos/6311475/pexels-photo-6311475.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

export const collections = [
  {
    id: '1',
    name: 'New Arrivals',
    slug: 'new-arrivals',
    description: 'The latest additions to our collection',
    image: 'https://images.pexels.com/photos/5384423/pexels-photo-5384423.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '2',
    name: 'Bestsellers',
    slug: 'bestsellers',
    description: 'Our most popular items that everyone loves',
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '3',
    name: 'Street Essentials',
    slug: 'street-essentials',
    description: 'Must-have pieces for your street style wardrobe',
    image: 'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '4',
    name: 'Urban Tech',
    slug: 'urban-tech',
    description: 'Where urban style meets technical innovation',
    image: 'https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

export const fitRoomModels = [
  {
    id: '1',
    name: 'Alex',
    gender: 'male',
    height: '5\'10"',
    build: 'Athletic',
    image: 'https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '2',
    name: 'Sam',
    gender: 'male',
    height: '6\'2"',
    build: 'Slim',
    image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '3',
    name: 'Mike',
    gender: 'male',
    height: '5\'8"',
    build: 'Regular',
    image: 'https://images.pexels.com/photos/1059948/pexels-photo-1059948.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '4',
    name: 'Ryan',
    gender: 'male',
    height: '6\'0"',
    build: 'Muscular',
    image: 'https://images.pexels.com/photos/1964970/pexels-photo-1964970.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];