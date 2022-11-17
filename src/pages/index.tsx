import React, { useState } from 'react';
import Image from 'next/image';
import { CLIENT_RENEG_LIMIT } from 'tls';

interface CatCategory {
  id: number,
  name: string,
}

interface SearchCatImage {
  breeds: string[],
  categories: CatCategory[],
  id: string,
  url: string,
  width: number,
  height: number,
}

type SearchCatImageResponse = SearchCatImage[];

const catImages: string[] = [
  "https://cdn2.thecatapi.com/images/bpc.jpg",
  "https://cdn2.thecatapi.com/images/eac.jpg",
  "https://cdn2.thecatapi.com/images/6qi.jpg",
];

const getRandomImage = (): string => {
  const index = Math.floor(Math.random() * catImages.length);
  return catImages[index];
}

const fetchCatImage = async (): Promise<SearchCatImage> => {
  const response = await fetch("https://api.thecatapi.com/v1/images/search");
  const result = (await response.json()) as SearchCatImageResponse;
  return result[0];
};

const IndexPage: React.FC = () => {

  const [url, setUrl] = useState<string>("https://cdn2.thecatapi.com/images/bpc.jpg");

  const handleClick = async () => {
    const image = await fetchCatImage();
    setUrl(image.url);
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