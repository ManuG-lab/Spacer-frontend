import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Footer from "../components/Footer";

export default function About() {
  const features = [
    ["📍", "Location Discovery", "Find the perfect space near you with real-time filters."],
    ["📅", "Easy Booking", "Book instantly with a smooth interface."],
    ["🛡️", "Secure Payments", "Encrypted, safe transactions."],
  ];

  const team = [
    ["Jane Doe", "Founder & CEO", "https://i.pravatar.cc/150?img=5"],
    ["John Smith", "Tech Lead", "https://i.pravatar.cc/150?img=3"],
    ["Lisa Ray", "Product Designer", "https://i.pravatar.cc/150?img=6"],
    ["Kevin White", "Operations Manager", "https://i.pravatar.cc/150?img=8"],
    ["Amara Lee", "Community Manager", "https://i.pravatar.cc/150?img=12"],
    ["David Kim", "UX Developer", "https://i.pravatar.cc/150?img=10"],
  ];

  const testimonials = [
    ["Spacer helped me find a last-minute venue with zero stress!", "— Amina, Organizer"],
    ["Highly recommend! Got fully booked in a week.", "— George, Host"],
    ["Booking was seamless, and the host was amazing!", "— Sharon, Freelancer"],
    ["Love the variety of spaces. Great for events!", "— Brian, DJ"],
    ["The UI is clean and easy to use. 5 stars!", "— Ivy, Marketer"],
    ["Trusted platform. I felt safe listing my space.", "— Malik, Landlord"],
  ];

  return (
    <div className="text-gray-800 bg-gray">
      {/* Features Section */}
      <section className="py-20 bg-gray-100 text-center px-4">
        <h2 className="text-4xl font-bold mb-12">Our Features</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map(([icon, title, desc]) => (
            <motion.div
              key={title}
              className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-xl transition"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-gray-600">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

     {/* Team Carousel Section */}
<section className="py-20 bg-gray-100 text-center px-4">
  <motion.h2
    initial={{ opacity: 0, y: -20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-4xl font-bold mb-12"
  >
    Meet the Team
  </motion.h2>

  <Swiper
    modules={[Navigation]}
    spaceBetween={24}
    slidesPerView={3}
    navigation
    breakpoints={{
      0: { slidesPerView: 1 },
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    }}
    className="max-w-6xl mx-auto"
  >
    {team.map(([name, role, img]) => (
      <SwiperSlide key={name}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gray-200  p-6 rounded-xl shadow-md text-center h-full"
        >
          <img
            src={img}
            alt={name}
            className="rounded-full w-24 h-24 mx-auto mb-4 object-cover"
          />
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-gray-500">{role}</p>
        </motion.div>
      </SwiperSlide>
    ))}
  </Swiper>
</section>


      {/* Testimonials Section with Animation */}
      <section className="py-20 bg-gray-100  text-center px-4">
        <h2 className="text-4xl font-bold mb-12">What Our Users Say</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map(([quote, author], index) => (
            <motion.div
              key={author}
              className="bg-gray-100 p-6 rounded-xl shadow"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <p className="italic mb-4">"{quote}"</p>
              <p className="font-semibold text-indigo-700">{author}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
