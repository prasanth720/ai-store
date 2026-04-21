import Image from "next/image";

export const metadata = {
  title: "About Us - AI Store",
  description: "Learn more about AI Store, our mission and vision",
};

export default function AboutPage() {
  return (
    <div className="space-y-12">

      {/* Hero Section */}
      <section className="text-center py-10">
        <h1 className="text-3xl md:text-4xl font-bold">
          About AI Store
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          We are a modern e-commerce platform built with cutting-edge
          technologies like Next.js and AI to deliver the best shopping experience.
        </p>
      </section>

      {/* Image + Content */}
      <section className="grid md:grid-cols-2 gap-8 items-center">
        
        <div className="relative w-full h-[300px] md:h-[400px]">
          <Image
            src="/images/ecom1.jpg"
            alt="About AI Store"
            fill
            className="object-cover rounded-xl"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">
            Who We Are
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            AI Store is designed to bring you the best products across
            electronics and fashion. We focus on performance, user
            experience, and scalability using modern web technologies.
          </p>

          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Our goal is to provide a seamless shopping experience with
            fast loading pages, intuitive design, and powerful features.
          </p>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="grid sm:grid-cols-2 gap-6">
        
        <div className="p-6 rounded-xl bg-gray-100 dark:bg-gray-800">
          <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
          <p className="text-gray-600 dark:text-gray-400">
            To build a scalable and high-performance e-commerce platform
            that enhances user experience through AI-driven solutions.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-gray-100 dark:bg-gray-800">
          <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
          <p className="text-gray-600 dark:text-gray-400">
            To become a leading platform that combines technology and
            innovation to redefine online shopping experiences globally.
          </p>
        </div>

      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        
        <div>
          <h2 className="text-2xl font-bold">10K+</h2>
          <p className="text-gray-500 dark:text-gray-400">Customers</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold">500+</h2>
          <p className="text-gray-500 dark:text-gray-400">Products</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold">99%</h2>
          <p className="text-gray-500 dark:text-gray-400">Satisfaction</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold">24/7</h2>
          <p className="text-gray-500 dark:text-gray-400">Support</p>
        </div>

      </section>

    </div>
  );
}