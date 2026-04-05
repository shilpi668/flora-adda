import React from 'react';

const categories = [
  { name: 'All', image: 'https://images.unsplash.com/photo-1543888544-2451ab04fb92?w=300&q=80' },
  { name: 'Chocolate Bouquets', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300&q=80' },
  { name: 'Birthday Decorations', image: 'https://images.unsplash.com/photo-1530103862676-de8892795bf0?w=300&q=80' },
  { name: 'Perfumes', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=300&q=80' },
  { name: 'Cakes', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&q=80' },
  { name: 'Gift Sets', image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=300&q=80' },
  { name: 'Hampers', image: 'https://images.unsplash.com/photo-1513885055283-bcdd793ac282?w=300&q=80' },
  { name: 'Plants', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300&q=80' },
];

const CategorySection = ({ selectedCategory, onSelectCategory }) => {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold text-center text-[#1e293b] mb-8 tracking-wide">
          SHOP BY CATEGORY
        </h2>
        
        <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide snap-x items-start justify-start md:justify-center">
          {categories.map((category, index) => (
            <button 
              key={index}
              onClick={() => onSelectCategory(category.name)}
              className="group flex flex-col items-center gap-3 min-w-[90px] snap-center outline-none"
            >
              <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 transition-all duration-300 shadow-sm p-1 ${selectedCategory === category.name ? 'border-[#fbbf24] shadow-md scale-105' : 'border-transparent group-hover:border-[#fbbf24] group-hover:shadow-md'}`}>
                <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=300&q=80'; }}
                  />
                </div>
              </div>
              <span className={`text-xs md:text-sm font-semibold text-center w-24 leading-tight transition-colors ${selectedCategory === category.name ? 'text-[#fbbf24]' : 'text-gray-700 group-hover:text-[#fbbf24]'}`}>
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
