import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';

const CoolAboutPage = () => {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  return (
    <div className="container">
      <Head>
        <title>About Us - AStar</title>
        <meta name="description" content="Discover the innovation behind AStar" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet" />
      </Head>

      <header>
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Team AStar
        </motion.h1>
      </header>

      <main>
        <motion.h2 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {greeting}, welcome to our world of innovation!
        </motion.h2>
        
        <motion.section 
          className="about-content"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p>At AStar, we're not just making cool products, we are a group of students passionate about learning and building. Our team of visionaries and innovators work tirelessly to make unique products that can help out people of all ages.</p>
          
          <h3>Our Mission</h3>
          <p>To create and innovate different softwares to provide substainable and useful products for people to learn.</p>
          
          <h3>Our Values</h3>
          <ul className="values-list">
            <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Innovation</motion.li>
            <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Growth</motion.li>
            <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Collaboration</motion.li>
            <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Excellence</motion.li>
          </ul>
        </motion.section>
      </main>

      <footer>
        <p>&copy; 2024 AStar. Innovating for a brighter tomorrow.</p>
      </footer>

      <style jsx global>{`
        body {
          margin: 0;
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #ffffff;
          min-height: 100vh;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
        }
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
        }
        h1 {
          font-size: 2.5rem;
          font-weight: 600;
          margin: 0;
        }
        nav a {
          color: #ffffff;
          text-decoration: none;
          margin-left: 1.5rem;
          font-weight: 300;
          transition: all 0.3s ease;
        }
        nav a:hover, nav a.active {
          color: #ffd700;
        }
        main {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        h2 {
          font-size: 1.8rem;
          margin-bottom: 2rem;
        }
        h3 {
          font-size: 1.4rem;
          margin-top: 2rem;
          color: #ffd700;
        }
        p {
          line-height: 1.6;
        }
        .values-list {
          list-style-type: none;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 1rem;
        }
        .values-list li {
          background: rgba(255, 255, 255, 0.2);
          padding: 0.8rem;
          border-radius: 10px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        footer {
          margin-top: 3rem;
          text-align: center;
          font-size: 0.9rem;
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
};

export default CoolAboutPage;