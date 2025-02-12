import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { PortableText } from "next-sanity";
import Comments from "@/components/Comments";

export const revalidate = 60; // revalidate every minute

async function getData(slug) {
  const query = `*[_type == 'post' && slug.current == '${slug}']{
    _id,
    title,
    "slug": slug.current,
    description,
    "mainImageUrl": mainImage.asset->url,
    imageURL,
    author,
    dateCreated,
    category,
    content
  }[0]`;
  
  const data = await client.fetch(query);
  return data;
}

const formatDateToLocalTime = (dateString) => {
  if (!dateString) {
    return "Invalid Date";
  }

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export default async function SelectedBlog({ params }) {
  const data = await getData(params.slug);

  return (
    <div className="w-full min-h-screen pt-[9vh] dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <article className="prose prose-xl dark:prose-invert max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-5xl font-extrabold leading-tight">
              {data.title}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {formatDateToLocalTime(data.dateCreated)} • {data.author}
            </p>
            <p className="mt-6 text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              {data.description}
            </p>
          </header>

          {data.mainImageUrl && (
            <div className="relative w-full h-[500px] lg:h-[600px] mb-12 overflow-hidden rounded-lg shadow-lg">
              <Image
                key={data._id}
                id={data._id}
                src={data.mainImageUrl}
                alt={data.slug}
                layout="fill"
                objectFit="cover"
                priority={true}
                className="rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            </div>
          )}

          <div className="prose prose-xl dark:prose-invert mx-auto max-w-none space-y-6">
            <PortableText value={data.content} />
          </div>
        </article>
      </div>
      <Comments postId = {data._id} />
    </div>
  );
}
