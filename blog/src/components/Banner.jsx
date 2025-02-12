const { client } = require("@/sanity/lib/client");
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

async function getData() {
  const query = `*[_type == 'banner']{
        title,
        "current_slug": slug.current,
        image,
        dateCreated
      }[0]`;

  const data = await client.fetch(query);

  return data;
}

export default async function Banner() {
  const data = await getData();

  return (
    <div className="relative w-full h-full overflow-hidden pt-[7vh]">
      <Image
        src={urlFor(data.image).url()}
        alt={data.current_slug}
        width={1920}
        height={700}
        style={{ objectFit: "cover" }}
        priority={true}
      />
    </div>
  );
}
