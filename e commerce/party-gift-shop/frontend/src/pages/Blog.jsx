import React from 'react';
import { ChevronRight } from 'lucide-react';

const Blog = () => {
  const blogs = [
    {
      id: 1,
      title: "Top 10 Birthday Decoration Trends for 2026",
      category: "Decorations",
      date: "Oct 12, 2026",
      image: "https://images.unsplash.com/photo-1530103862676-de8892795bf0?w=600&q=80",
      excerpt: "From pastel arches to neon signs, discover what's making birthday parties pop this year."
    },
    {
      id: 2,
      title: "How to Pick the Perfect Anniversary Gift",
      category: "Gifting Guide",
      date: "Sep 28, 2026",
      image: "https://images.unsplash.com/photo-1549463051-419b5bfb7050?w=600&q=80",
      excerpt: "Not sure what to buy for your 1st, 5th, or 10th anniversary? Here is an ultimate guide."
    },
    {
      id: 3,
      title: "The Secret to Ordering Fresh Flowers Online",
      category: "Flowers",
      date: "Sep 15, 2026",
      image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&q=80",
      excerpt: "Ensure your bouquets arrive looking fresh, vibrant, and exactly as pictured."
    },
    {
      id: 4,
      title: "5 Unique Theme Ideas for Kids Parties",
      category: "Party Planning",
      date: "Aug 30, 2026",
      image: "https://images.unsplash.com/photo-1502631155828-9ba53ecacdf7?w=600&q=80",
      excerpt: "Take your kid's birthday party to the next level with these creative themes."
    },
    {
      id: 5,
      title: "Why Minimalist Cakes Are Taking Over",
      category: "Cakes",
      date: "Aug 12, 2026",
      image: "https://images.unsplash.com/photo-1606890737305-6afbd8fa225d?w=600&q=80",
      excerpt: "Bento cakes and minimalist designs are the new favorite over grand multi-tier cakes."
    },
    {
      id: 6,
      title: "Creating the Ultimate Gift Hamper at Home",
      category: "DIY",
      date: "Jul 22, 2026",
      image: "https://images.unsplash.com/photo-1513885055283-bcdd793ac282?w=600&q=80",
      excerpt: "Learn how to assemble and package a stunning gift hamper for your loved ones."
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      
      {/* Hero Header */}
      <div className="bg-[#fbbf24] py-16 text-center">
        <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Flora Blog</h1>
        <p className="text-lg text-gray-800 max-w-2xl mx-auto font-medium">
          Ideas, tips, and inspiration for gifting, parties, and celebrations.
        </p>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {blogs.map(blog => (
            <div key={blog.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow group flex flex-col">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 uppercase tracking-wide">
                  {blog.category}
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div className="text-xs text-gray-500 mb-2 font-medium">{blog.date}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-[#f05a1b] transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm mb-6 flex-grow">
                  {blog.excerpt}
                </p>
                <a href="#" className="inline-flex items-center text-sm font-bold text-[#f05a1b] hover:underline">
                  Read Article <ChevronRight size={16} />
                </a>
              </div>
            </div>
          ))}

        </div>
      </div>
      
    </div>
  );
};

export default Blog;
