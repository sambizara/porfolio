export function SkillCarousel({ isDark = true }) {
  const skills = [
    { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "React JS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Next JS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original-wordmark.svg" },
    { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Express.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg" },
    { name: "Nest JS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg" },
    { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "Socket.io", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg" },
    { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "Prisma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" },
    { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    //{ name: "Vercel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
    //{ name: "Render", logo: "https://cdn.simpleicons.org/render/000000" },
  ];

  // Dupliquer pour l'effet infini
  const extendedSkills = [...skills, ...skills];

  const fadeColor = isDark ? "#0a0912" : "#f4f7fb";

  return (
    <div className="relative w-full my-8">
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-180px * ${skills.length}));
          }
        }
        .skill-carousel {
          animation: scroll 30s linear infinite;
        }
        .skill-carousel:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="overflow-hidden">
        {/* Dégradé gauche */}
        <div
          className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none transition-colors duration-300"
          style={{ background: `linear-gradient(to right, ${fadeColor}, transparent)` }}
        />
        {/* Dégradé droit */}
        <div
          className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none transition-colors duration-300"
          style={{ background: `linear-gradient(to left, ${fadeColor}, transparent)` }}
        />

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
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 opacity-80 hover:opacity-100 transition-opacity object-contain"
              />
              <p className="mt-2 text-xs sm:text-sm font-medium transition-colors duration-300" style={{ color: isDark ? "#d4d4d8" : "#4b5563" }}>
                {skill.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
