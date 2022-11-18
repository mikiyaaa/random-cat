import React, { useState } from 'react';
import Image from 'next/image';
import type { NextPage, GetServerSideProps } from 'next';

interface CatCategory {
  id: number,
  name: string,
}

interface IndexPageProps {
  initialImageUrl: string,
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

// サーバーサイドコンポーネントでも利用するため、グローバルに定義
const fetchCatImage = async (): Promise<SearchCatImage> => {
  const response = await fetch("https://api.thecatapi.com/v1/images/search");
  const result = (await response.json()) as SearchCatImageResponse;
  return result[0];
};

//  Client Side Component
const IndexPage: NextPage<IndexPageProps> = ({ initialImageUrl }) => {

  const [url, setUrl] = useState<string>(initialImageUrl);

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

//  Sever Side Component (SSRでデータ取得)
export const getServerSideProps: GetServerSideProps<IndexPageProps> = async () => {
  const response = await fetchCatImage();

  return {
    props: {
      initialImageUrl: response.url,
    }
  }
}

export default IndexPage;