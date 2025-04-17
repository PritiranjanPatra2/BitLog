import React from "react";

const testimonials = [
  {
    name: "Donald Jackman",
    role: "Content Creator",
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    review:
      "Bitlog is my go-to source for tech insights. The articles are always clear, concise, and super helpful. It's like having a mentor online.",
  },
  {
    name: "Richard Nelson",
    role: "Frontend Developer",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    review:
      "I read Bitlog almost every day. From React tutorials to career tips—everything is well-written and beginner-friendly. Highly recommend!",
  },
  {
    name: "James Washington",
    role: "Marketing Manager",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
    review:
      "Bitlog has helped our team stay updated with digital trends. Their blogs are insightful and perfect for quick learning in busy schedules.",
  },
];

const StarIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 22 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z"
      fill="#FF532E"
    />
  </svg>
);

const TestimonialCard = ({ name, role, image, review }) => (
  <div className="text-sm w-80 border border-gray-500/30 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5">
    <div className="flex flex-col items-center px-5 py-4 relative">
      <img
        className="h-24 w-24 absolute -top-14 rounded-full object-cover"
        src={image}
        alt={name}
      />
      <div className="pt-8 text-center">
        <h1 className="text-lg font-medium text-gray-800">{name}</h1>
        <p className="text-gray-800/80">{role}</p>
      </div>
    </div>
    <p className="text-gray-500 px-6 text-center">{review}</p>
    <div className="flex justify-center pt-4">
      <div className="flex gap-0.5">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <StarIcon key={i} />
          ))}
      </div>
    </div>
  </div>
);

function Testmonial() {
  return (
    <>
      <h2 className="text-3xl md:text-4xl font-bold text-center mt-16 mb-8 text-gray-800">
        What Our Readers Say
      </h2>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-6 pt-14">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </>
  );
}

export default Testmonial;
