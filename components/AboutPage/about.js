import React, { useState, useEffect } from 'react';
import Head from 'next/head';

export default function About() {
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
        <title>About Us - My Company</title>
        <meta name="description" content="Learn more about our company and mission" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <h1>My Company</h1>
        <nav>
          <a href="/">Home</a> | <a href="/about">About</a> | <a href="/contact">Contact</a>
        </nav>
      </header>

      <main>
        <h2>{greeting}, welcome to our About page!</h2>
        <p>We are a passionate team dedicated to creating innovative solutions for our clients.</p>
        <p>Our mission is to deliver high-quality products that make a difference in people's lives.</p>
        <h3>Our Values</h3>
        <ul>
          <li>Innovation</li>
          <li>Integrity</li>
          <li>Collaboration</li>
          <li>Excellence</li>
        </ul>
      </main>

      <footer>
        <p>&copy; 2024 My Company. All rights reserved.</p>
      </footer>

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 1rem;
          font-family: Arial, sans-serif;
        }
        header {
          padding: 1rem 0;
          border-bottom: 1px solid #eaeaea;
          margin-bottom: 2rem;
        }
        h1 {
          margin: 0 0 1rem 0;
        }
        nav {
          margin-bottom: 1rem;
        }
        main {
          min-height: 60vh;
        }
        footer {
          margin-top: 2rem;
          padding: 1rem 0;
          border-top: 1px solid #eaeaea;
          text-align: center;
        }
      `}</style>
    </div>
  );
}