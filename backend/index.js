// server.ts
import express from 'express';
import cors from 'cors';

const app = express();
const port = 8000;

// Middleware
app.use(express.json());
app.use(cors());

// Mock product data
const products = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299.99,
      description: "High-fidelity audio with active noise cancellation and 30-hour battery life.",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      category: "Electronics",
      rating: 4.8,
      stock: 50
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      description: "Track your health and fitness with this advanced smartwatch featuring heart rate monitoring and GPS.",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
      category: "Electronics",
      rating: 4.6,
      stock: 75
    },
    {
      id: 3,
      name: "Organic Cotton T-Shirt",
      price: 29.99,
      description: "Sustainably sourced, comfortable cotton t-shirt perfect for everyday wear.",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
      category: "Clothing",
      rating: 4.5,
      stock: 200
    },
    {
      id: 4,
      name: "Professional Camera Lens",
      price: 899.99,
      description: "High-quality camera lens for professional photography with superior image quality.",
      image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTp4wrVFydB_78DlMpAo7rE6gbCf7EFc6OP6PX6vfTOliBNiMGUw-Io41TwHJnz6RtPiXZpcIdkquX2g8d4sE8bncXeW0d__epruFkrorE",
      category: "Photography",
      rating: 4.9,
      stock: 25
    },
    {
      id: 5,
      name: "Minimalist Backpack",
      price: 79.99,
      description: "Stylish and functional backpack with laptop compartment and water-resistant material.",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
      category: "Accessories",
      rating: 4.7,
      stock: 100
    },
    {
      id: 6,
      name: "Smart Home Speaker",
      price: 199.99,
      description: "Voice-controlled smart speaker with premium sound quality and home automation features.",
      image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800&q=80",
      category: "Electronics",
      rating: 4.4,
      stock: 60
    }
  ];

// Routes
app.get('/api/products', (req, res) => {
  try {
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/products/:id', (req, res) => {
  try {
    const product = products.find(p => p.id === parseInt(req.params.id));
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});