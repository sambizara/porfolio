export function SkillCarousel() {
  const skills = [
    { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "React JS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Next JS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original-wordmark.svg" },
    { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "PHP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
    { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  ];

  // Dupliquer pour l'effet infini
  const extendedSkills = [...skills, ...skills];

  return (
    <div className="relative w-full my-8">
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-200px * ${skills.length}));
          }
        }
        .skill-carousel {
          animation: scroll 20s linear infinite;
        }
        .skill-carousel:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="overflow-hidden">
        {/* Dégradé gauche */}
        <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-[#0a0912] to-transparent z-10 pointer-events-none" />
        {/* Dégradé droit */}
        <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#0a0912] to-transparent z-10 pointer-events-none" />

        {/* Carrousel */}
        <div className="skill-carousel flex gap-4">
          {extendedSkills.map((skill, idx) => (
            <div
              key={idx}
              className="min-w-[200px] lg:p-4 md:p-4 sm:p-3 p-2 text-center flex flex-col items-center justify-center"
            >
              <img
                src={skill.logo}
                alt={skill.name}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 opacity-80 hover:opacity-100 transition-opacity"
              />
              <p className="mt-2 text-xs sm:text-sm text-white" style={{ color: "#d4d4d8" }}>
                {skill.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
