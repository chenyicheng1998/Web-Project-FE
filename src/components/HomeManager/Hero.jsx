import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import heroImage1 from '../../assets/Hero-1.jpg';
import heroImage2 from '../../assets/Hero-2.jpg';
import heroImage3 from '../../assets/Hero-3.jpg';

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    {
      src: heroImage1,
      title: "Welcome to CookEase",
      description: "Discover amazing recipes from around the world"
    },
    {
      src: heroImage2,
      title: "Master the Art of Cooking",
      description: "Learn from the best chefs and home cooks"
    },
    {
      src: heroImage3,
      title: "Share Your Culinary Creations",
      description: "Join our community of food enthusiasts"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000); // 5秒切换一次

    return () => clearInterval(timer);
  }, [heroImages.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <div className="w-full relative">
      {/* Hero Carousel */}
      <div className="relative h-screen overflow-hidden">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <img
              src={image.src}
              alt="Delicious food"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 className="text-5xl font-bold mb-4">{image.title}</h1>
                <p className="text-xl mb-8">{image.description}</p>
                <Link
                  to="/recipes"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition duration-200"
                >
                  Explore Recipes
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* 导航箭头 */}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition duration-200"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition duration-200"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* 指示器小圆点 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition duration-200 ${index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hero;