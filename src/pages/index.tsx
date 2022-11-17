import React, { useState } from 'react';
import Image from 'next/image';

const catImages: string[] = [
  "https://cdn2.thecatapi.com/images/bpc.jpg",
  "https://cdn2.thecatapi.com/images/eac.jpg",
  "https://cdn2.thecatapi.com/images/6qi.jpg",
];

const getRandomImage = (): string => {
  const index = Math.floor(Math.random() * catImages.length);
  return catImages[index];
}

const IndexPage: React.FC = () => {

  const [url, setUrl] = useState("https://cdn2.thecatapi.com/images/bpc.jpg");

  const handleClick = () => {
    setUrl(getRandomImage);
  }

  return (
    <div>
      <h1>Hello, Next.js  👋</h1>
      <Image src={url} alt="cat" width={300} height={200} />
      <button onClick={handleClick} style={{display: 'block'}}>next cat!</button>
    </div>
  )
}

export default IndexPage;