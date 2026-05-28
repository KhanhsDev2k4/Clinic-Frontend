import { Calendar, ChevronRight } from "lucide-react";

const News = () => {
  const blogPosts = [
    {
      title: "10 dấu hiệu cảnh báo bệnh tim mạch",
      date: "15/01/2024",
      image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=400&h=250&fit=crop",
    },
    {
      title: "Chăm sóc sức khỏe trẻ em mùa đông",
      date: "12/01/2024",
      image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=250&fit=crop",
    },
    {
      title: "Bí quyết giữ mắt khỏe mạnh",
      date: "10/01/2024",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=250&fit=crop",
    },
  ];
  return (
    <section id="news" className="py-20">
      <div className="max-w-[100rem] mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Tin tức y tế</h2>
          <p className="text-xl text-gray-600">Cập nhật kiến thức sức khỏe mới nhất</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-4 group-hover:text-blue-600 transition">
                  {post.title}
                </h3>
                <button className="text-blue-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                  Đọc thêm <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default News;
