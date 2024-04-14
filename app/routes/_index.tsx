import { Paper, SimpleGrid } from "@mantine/core";
import type { MetaFunction } from "@remix-run/node";
import CardComp from '../components/CardComp'
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader(){
  const response = await fetch('https://sea-lion-app-6er6u.ondigitalocean.app/api/posts')

  const {data} = await response.json()
  console.log(data)
  
  return data
}

export default function Index() {

  const loaderData = useLoaderData()

  console.log(loaderData)

  if(loaderData[0]){
    return (
      <div>
        <h1>View Blog Posts</h1>
        <SimpleGrid cols={{base: 1, md: 3}}>
        {loaderData.map((post)=>(
          <CardComp key={post.attributes.title} title={post.attributes.title}/>
        ))}
        </SimpleGrid>
      </div>
    );
  }
  else{
    return(
      <div>
        loading...
      </div>
    )
  }

}
