import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Yohannes',
      email: 'admin@gmail.com',
      password: bcrypt.hashSync('1234567'),
      isAdmin: true, 
    },
    {
      name: 'Tim',
      email: 'user@gmail.com',
      password: bcrypt.hashSync('1234567'),
      isAdmin: false,
    },
  ],
  products: [
    {
      // _id: "1",
      name: 'Nike Slim shirt',
      slug: 'nike-slim-shirt',
      category: 'Shirts',
      image: '/assets/shirt1.jpg', // 679px × 829px
      price: 30,
      countInStock: 10,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality shirt',
    },
    {
      // _id: "2",
      name: 'Adidas Fit Shirt',
      slug: 'adidas-fit-shirt',
      category: 'Shirts',
      image: '/assets/shirt2.jpg',
      price: 40,
      countInStock: 6,
      brand: 'Adidas',
      rating: 4.0,
      numReviews: 10,
      description: 'high quality product',
    },
    {
      // _id: "3",
      name: 'M&D Fit Shirt',
      slug: 'm&d-fit-shirt',
      category: 'Shirts',
      image: '/assets/shirt3.jpg',
      price: 25,
      countInStock: 2,
      brand: 'Adidas',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality product',
    },
    {
      // _id: "4",
      name: 'Nike Slim Trousers',
      slug: 'nike-slim-trousers',
      category: 'Pants',
      image: '/assets/trousers1.jpg',
      price: 25,
      countInStock: 15,
      brand: 'Nike',
      rating: 4,
      numReviews: 14,
      description: 'high quality product',
    },
    {
      // _id: "5",
      name: 'Adidas Fit Trousers',
      slug: 'adidas-fit-pant',
      category: 'Trousers',
      image: '/assets/trousers2.jpg',
      price: 65,
      countInStock: 5,
      brand: 'Puma',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality product',
    },
    {
      // _id: "6",
      name: 'Nike Fit Trousers',
      slug: 'nike-fit-trousers',
      category: 'Trousers',
      image: '/assets/trousers3.webp',
      price: 60,
      countInStock: 0,
      brand: 'Puma',
      rating: 4,
      numReviews: 20,
      description: 'high quality product',
    },
  ],
};
export default data;
