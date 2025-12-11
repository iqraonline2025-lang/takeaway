import React, { useEffect, useState, forwardRef } from 'react';
import { supabase } from '../supabase_client';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

// FeatureCard
const FeatureCard = ({ item }) => {
  const navigate = useNavigate();
  const { addToCart, user } = useCart();

  const handleAddToCart = () => {
    if (!user) return navigate('/auth');
    addToCart(item.id);
  };

  const handleImageClick = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    addToCart(item.id);
  };

  return (
    <div className="group relative bg-red-50 shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="w-full h-56 md:h-64 overflow-hidden relative rounded-t-xl">
        <img
          src={item.image_url}
          alt={item.name}
          className="w-full h-full object-cover object-center transition-opacity duration-300 group-hover:opacity-90 cursor-pointer"
          onClick={handleImageClick}
        />
        <button
          onClick={handleAddToCart}
          className="absolute top-2 right-2 p-2 bg-red-600 rounded-full shadow hover:bg-red-700 transition"
        >
          <ShoppingCartIcon className="w-6 h-6 text-white" />
        </button>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-red-800 leading-tight">{item.name}</h3>
        <p className="mt-2 text-sm text-red-700 line-clamp-2">{item.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-semibold text-red-600 group-hover:text-red-700 transition duration-150">
            ${item.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-sm font-semibold transition"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

// FeaturedSection
const FeaturedSection = forwardRef((props, ref) => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedDishes = async () => {
      try {
        const { data, error } = await supabase
          .from('featured_dishes')
          .select('*')
          .eq('is_featured', true);
        if (error) {
          console.error('Error fetching featured dishes:', error);
        } else {
          console.log('Fetched featured dishes:', data);
          setFeaturedItems(data || []);
        }
      } catch (err) {
        console.error('Error in fetchFeaturedDishes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedDishes();

    // Set up real-time subscription for immediate updates
    const channel = supabase
      .channel('featured_dishes_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'featured_dishes' }, (payload) => {
        console.log('Real-time update:', payload);
        fetchFeaturedDishes();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <section ref={ref} id="featured-section" aria-labelledby="featured-dishes-heading" className="py-16 sm:py-24 bg-red-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2
            id="featured-dishes-heading"
            className="text-4xl font-extrabold tracking-tight text-red-800 sm:text-5xl"
          >
            Our Menu Highlights
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-red-700">
            A curated selection of our most popular, new, and seasonal dishes.
          </p>
        </div>
        <div className="mt-12">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
          ) : featuredItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-8 lg:grid-cols-3">
              {featuredItems.map((item) => (
                <FeatureCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-red-700 text-lg">No featured dishes available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

export default FeaturedSection;
