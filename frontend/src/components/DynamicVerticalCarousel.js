import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { FaWheelchair, FaHandsHelping, FaHeart, FaBrain, FaBookReader } from "react-icons/fa";
import * as THREE from "three";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Footer from "./Footer";
const InteractiveIcon = ({ icon, label, color, index }) => {
  const mesh = useRef();
  const radius = 4;
  const angle = (index * Math.PI * 2) / 5;
  const [currentColor, setCurrentColor] = useState(new THREE.Color(color));

  useFrame(({ clock }) => {
    if (mesh.current) {
      const time = clock.getElapsedTime();
      mesh.current.position.x = Math.cos(time + angle) * radius;
      mesh.current.position.y = Math.sin(time + angle) * radius;
    }
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color={currentColor} />
      <Html center>
        <div className="flex flex-col items-center">
          <div className="text-3xl">{icon}</div>
          <p className="text-sm mt-1 font-medium text-gray-700">{label}</p>
        </div>
      </Html>
    </mesh>
  );
};

const DynamicIntroCarousel = () => {
    const images = [
      "/images/brenkey1.jpeg",  
    ];
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 4000); // تغيير الصورة كل 4 ثوانٍ
      return () => clearInterval(interval);
    }, []);

    const offres = [
        { title: "Cours individuels", description: "Cours personnalisés selon les besoins de chaque enfant.", icon: "📚" },
        { title: "Activités sportives", description: "Activités pour améliorer les compétences motrices.", icon: "⚽" },
        { title: "Formation artistique", description: "Développer la créativité à travers l'art.", icon: "🎨" },
        { title: "Soutien psychologique", description: "Séances de soutien psychologique individuelles ou en groupe.", icon: "❤️" },
    ];
    
    const articles = [
        {
            title: "Vision de l'école",
            description: "Offrir un environnement éducatif inclusif pour les enfants à besoins spécifiques.",
            image: "/images/BREK.webp",
        },
        {
            title: "Activités sportives",
            description: "Des activités adaptées pour accompagner le développement des enfants.",
            image: "/images/SPORT.jpg",
        },
        {
            title: "Apprentissage interactif",
            description: "Utilisation des technologies pour un enseignement efficace et ludique.",
            image: "/images/MONGO.jpg",
        },
        {
            title: "Activités artistiques",
            description: "Encourager la créativité à travers le dessin et l’artisanat.",
            image: "/images/BRENKE.jpg",
        },
        {
            title: "Soutien psychologique",
            description: "Un accompagnement pour les enfants et leurs familles.",
            image: "/images/NAFSI.webp",
        },
        {
            title: "Éducation",
            description: "Des méthodes innovantes pour assurer la réussite de chaque élève.",
            image: "/images/bren.jpeg",
        },
    ];
    
  return (
    <div className="w-full h-full">
     <div className="w-full h-screen overflow-hidden relative">
      {images.map((image, index) => (
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: currentIndex === index ? 1 : 0 }}
          transition={{ duration: 1 }}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <h1 className="text-5xl md:text-7xl text-white font-bold text-center transition-transform transform hover:italic hover:text-shadow-lg hover:text-gray-300">
  Bienvenue dans notre établissement  
  <br />
  Brain Key
</h1>

      </div>
    </div>

      <div className="bg-white py-16">
        <h2 className="text-center text-4xl font-bold text-indigo-600 mb-12">
          Nos Offres pédagogiques
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-8 max-w-7xl mx-auto">
          {offres.map((offre, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-lg shadow-lg text-center"
            >
              <div className="text-4xl mb-4">{offre.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                {offre.title}
              </h3>
              <p className="text-gray-600">{offre.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <h2 className="text-center text-4xl font-bold text-indigo-600 mb-12">
        Articles Récents        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 max-w-7xl mx-auto">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {article.title}
                </h3>
                <p className="text-gray-600">{article.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
   

<div className="relative w-full h-[800px] bg-indigo-50 overflow-hidden flex flex-col items-center justify-center">
  {/* خلفية صورة كبيرة */}
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: `url('/images/large-image.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  ></div>

  {/* Couche d’ombre avec texte */}
<div className="absolute top-10 inset-x-0 text-center bg-black bg-opacity-40 py-10">
  <h2 className="text-6xl font-bold text-white mb-6">
    Apprenez et évoluez avec notre équipe spécialisée
  </h2>
  <p className="text-2xl text-gray-300 max-w-4xl mx-auto">
    Nous proposons des programmes éducatifs spécialement conçus pour répondre aux besoins de chaque enfant, avec un accompagnement psychologique et social complet.
  </p>
</div>


  {/* صورة الطفل مع اللوجو */}
  <div className="relative flex flex-col items-center">
    {/* صورة الطفل */}
    <img
      src="/images/handicap_mongolien-removebg-preview.png"
      alt="طفل مبتسم"
      className="w-[400px] h-[400px] rounded-full object-cover shadow-2xl border-4 border-white"
    />
    {/* اللوجو فوق الصورة */}
    <div className="absolute bg-black w-40 h-40 rounded-full flex items-center justify-center -bottom-20 shadow-lg border-4 border-white">
      <img
        src="/images/brain_keyy-removebg-preview.png"
        alt="Logo"
        className="w-28 h-28 object-contain"
      />
    </div>
  </div>

  {/* أيقونات وسائل التواصل الاجتماعي */}
  <div className="absolute bottom-10 flex space-x-6">
    <a
      href="https://www.facebook.com/profile.php?id=61565481264175"
      target="_blank"
      rel="noopener noreferrer"
      className="text-white bg-blue-600 p-4 rounded-full hover:bg-blue-700 transition"
    >
      <FaFacebookF size={24} />
    </a>
    <a
      href="https://www.instagram.com/brainkeycenter/?utm_source=ig_web_button_share_sheet"
      target="_blank"
      rel="noopener noreferrer"
      className="text-white bg-gradient-to-r from-pink-500 to-red-500 p-4 rounded-full hover:opacity-80 transition"
    >
      <FaInstagram size={24} />
    </a>
    <a
      href="https://linkedin.com"
      target="_blank"
      rel="noopener noreferrer"
      className="text-white bg-blue-800 p-4 rounded-full hover:bg-blue-900 transition"
    >
      <FaLinkedinIn size={24} />
    </a>
  </div>
</div>


      <div className="relative h-screen w-full">
        <Canvas style={{ background: "transparent" }} camera={{ position: [0, 0, 10], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} />
          { [
  { icon: <FaWheelchair size={50} className="text-blue-500" />, label: "Accessibilité", color: "blue" },
  { icon: <FaHandsHelping size={50} className="text-green-500" />, label: "Développement", color: "green" },
  { icon: <FaHeart size={50} className="text-red-500" />, label: "Empathie", color: "red" },
  { icon: <FaBrain size={50} className="text-purple-500" />, label: "Soutien Cognitif", color: "purple" },
  { icon: <FaBookReader size={50} className="text-yellow-500" />, label: "Éducation", color: "yellow" },
].map((iconProps, index) => (
            <InteractiveIcon key={index} {...iconProps} index={index} />
          ))}
        </Canvas>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-blue-600">Accessibilité</h3>
          <p className="text-gray-600 mt-2">
            Nous mettons tout en œuvre pour garantir un environnement inclusif et accessible.
          </p>
        </div>
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-indigo-600">Soutien</h3>
          <p className="text-gray-600 mt-2">
            Nous fournissons un accompagnement personnalisé pour chaque élève.
          </p>
        </div>
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-red-500">Empathie</h3>
          <p className="text-gray-600 mt-2">
            Chaque élève est traité avec soin, respect et compassion.
          </p>
        </div>
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-green-500">Développement</h3>
          <p className="text-gray-600 mt-2">
            Nous développons les compétences cognitives et sociales de nos élèves.
          </p>
        </div>
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-yellow-500">Éducation</h3>
          <p className="text-gray-600 mt-2">
            Nous proposons des approches pédagogiques innovantes pour garantir la réussite de chaque élève.
          </p>
        </div>
      </div>
      <Footer />

    </div>
  );
};

export default DynamicIntroCarousel;
