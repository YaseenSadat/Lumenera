/**
 * About.jsx
 * 
 * This page represents the "About Us" section of the Lumenera application.
 * It provides an overview of the company's mission, values, and unique selling points,
 * as well as details about craftsmanship, authenticity, and community connection.
 * The page concludes with a newsletter subscription box to keep users engaged.
 */

import React from "react";
import Title from "../components/Title"; // Title component for section headers
import NewsletterBox from "../components/NewsletterBox"; // Newsletter subscription box component
import { assets } from "../assets/assets"; // Importing assets such as images

const About = () => {
  return (
    <div>
      {/* Header Section: About Us */}
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      {/* Main Content Section: About the Company */}
      <div className="my-10 flex flex-col md:flex-row gap-16">
        {/* Company Image */}
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt="About Lumenera"
        />

        {/* About Us Text Content */}
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p className="marcellus-regular">
            At Lumenera, we bring together players and collectors to immerse
            themselves in a world of strategy, imagination, and adventure. As
            the creators and sole distributors of our exclusive trading card
            collections, we’re proud to offer a unique experience inspired by a
            deep love for dark fantasy and the art of card gaming. Every card is
            meticulously designed to spark creativity, ignite competition, and
            tell a story all its own.
          </p>
          <p className="marcellus-regular">
            Whether you’re building your ultimate deck, expanding your
            collection, or exploring the world of card games for the first time,
            Lumenera is your gateway to a thriving community of enthusiasts. Our
            commitment to authenticity, quality, and innovation ensures every
            card is more than just a game piece—it’s a work of art crafted with
            passion.
          </p>

          {/* Mission Statement */}
          <b className="marcellus-bold text-gray-800">Our Mission</b>
          <p className="marcellus-regular">
            At Lumenera, our mission is to create a community-driven platform
            where players and collectors can come together to celebrate the art
            and strategy of trading cards. We aim to foster meaningful
            connections through a shared love of fantasy worlds and creative
            gameplay. By offering unique designs and captivating stories, we
            strive to provide a space where players of all levels can connect,
            compete, and let their imaginations run wild.
          </p>
        </div>
      </div>

      {/* Section: Why Choose Us */}
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US?"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        {/* Craftsmanship Card */}
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b className="marcellus-bold">Craftsmanship:</b>
          <p className="marcellus-regular text-gray-600">
            At Lumenera, craftsmanship is at the core of every card we create.
            Each design is a labor of love, meticulously crafted to embody the
            rich, dark fantasy worlds that inspire us. From intricate
            illustrations to compelling narratives, every card is a masterpiece,
            blending art and gameplay in a way that brings the game to life for
            players and collectors alike.
          </p>
        </div>

        {/* Authenticity Card */}
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b className="marcellus-bold">Authenticity:</b>
          <p className="marcellus-regular text-gray-600">
            We take pride in offering cards that are 100% authentic and
            exclusive to Lumenera. As the creators and distributors, we ensure
            every card is uniquely ours—designed with originality and a passion
            for the game. When you hold a Lumenera card, you’re holding a piece
            of a story, a world, and a vision that can’t be found anywhere else.
          </p>
        </div>

        {/* Community Connection Card */}
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b className="marcellus-bold">Community Connection:</b>
          <p className="marcellus-regular text-gray-600">
            Lumenera isn’t just about cards—it’s about the people who play,
            collect, and connect through them. Our mission is to cultivate a
            thriving community where players can compete, share strategies, and
            bond over their shared love for the game. Whether you're battling
            for glory or expanding your collection, Lumenera is where
            friendships are forged and stories are shared.
          </p>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <NewsletterBox />
    </div>
  );
};

export default About;
