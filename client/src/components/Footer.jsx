const Footer = () => {
  const linkSections = [
    {
      title: "Quick Links",
      links: ["Home", "Explore", "Trending", "About Us", "Contact"],
    },
    {
      title: "Resources",
      links: [
        "Privacy Policy",
        "Terms of Service",
        "Write for Us",
        "Sitemap",
        "Support",
      ],
    },
    {
      title: "Follow Us",
      links: ["Instagram", "Twitter", "LinkedIn", "GitHub"],
    },
  ];

  return (
    <div className="mt-16 px-6 md:px-16 lg:px-24 xl:px-32 bg-gray-50">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-300 text-gray-600">
        <div>
          {/* Bitlog Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 bg-black text-white font-bold rounded flex items-center justify-center text-lg">
              B
            </div>
            <span className="text-xl font-semibold text-black">Bitlog</span>
          </div>

          {/* Blog Description */}
          <p className="max-w-[420px] mt-6 text-sm leading-relaxed text-gray-600">
            Bitlog is your daily dose of tech insights, coding tutorials, and
            digital stories. Whether you're a developer, designer, or digital
            explorer, our blog brings the latest and greatest directly to you.
          </p>
        </div>

        {/* Link Sections */}
        <div className="flex flex-wrap justify-between w-full md:w-[55%] gap-6">
          {linkSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 mb-3">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="hover:underline transition duration-200 ease-in-out"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Bottom */}
      <p className="py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Bitlog — Built with 💻 & ☕ by Pritiranjan
        Patra. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
