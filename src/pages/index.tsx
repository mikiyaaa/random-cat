import React, { useState } from 'react';
import Image from 'next/image';

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
    <div style={{textAlign: 'center'}}>
      <h1>Hello, Next.js  👋</h1>
      <Image src={url} alt="cat" width={300} height={200} />
      <button onClick={handleClick} style={{display: 'block', margin: 'auto'}} >next cat!</button>
    </div>
  )
}

export default IndexPage;