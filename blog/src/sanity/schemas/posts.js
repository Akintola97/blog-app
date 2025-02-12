// export const post =  {
//     name: 'post',
//     title: 'Post',
//     type: 'document',
//     fields: [
//       {
//         name: 'title',
//         title: 'Title',
//         type: 'string',
//         validation: Rule => Rule.required().error('Title is required'),
//       },
//       {
//         name: 'slug',
//         title: 'Slug',
//         type: 'slug',
//         options: {
//           source: 'title',
//         },
//         validation: Rule => Rule.required().error('Slug is required'),
//       },
//       {
//         name: 'description',
//         title: 'Description',
//         type: 'text',
//         validation: Rule => Rule.required().max(250).error('Description is required and should be 250 characters or less'),
//       },
//       {
//         name: 'mainImage',
//         title: 'Main Image',
//         type: 'image',
//         options: {
//           hotspot: true, // Enables image cropping
//         },
//         validation: Rule => Rule.required().error('Main image is required'),
//       },
//       {
//         name: 'content',
//         title: 'Content',
//         type: 'array',
//         of: [{ type: 'block' }],
//         validation: Rule => Rule.required().error('Content is required'),
//       },
//       {
//         name: 'author',
//         title: 'Author',
//         type: 'string',
//         validation: Rule => Rule.required().error('Author name is required'),
//       },
//       {
//         name: 'dateCreated',
//         title: 'Date Created',
//         type: 'datetime',
//         validation: Rule => Rule.required().error('Date created is required'),
//       },
//       {
//         name: 'category',
//         title: 'Category',
//         type: 'string',
//         options: {
//           list: [
//             { title: 'PlayStation', value: 'playstation' },
//             { title: 'Xbox', value: 'xbox' },
//             { title: 'Nintendo', value: 'nintendo' },
//           ],
//           layout: 'radio', // You can also use 'dropdown' for a dropdown list
//         },
//         validation: Rule => Rule.required().error('Category is required'),
//       },
//     ],
//   };
  



export const post = {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required().error('Title is required'),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: Rule => Rule.required().error('Slug is required'),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required().max(250).error('Description is required and should be 250 characters or less'),
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true, // Enables image cropping
      },
      validation: Rule => Rule.required().error('Main image is required'),
    },
    {
      name: 'imageURL',
      title: 'Image URL',
      type: 'url',
      description: 'Optional: Provide a direct image URL. This will override the uploaded image if provided.',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
      validation: Rule => Rule.required().error('Content is required'),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: Rule => Rule.required().error('Author name is required'),
    },
    {
      name: 'dateCreated',
      title: 'Date Created',
      type: 'datetime',
      validation: Rule => Rule.required().error('Date created is required'),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'PlayStation', value: 'playstation' },
          { title: 'Xbox', value: 'xbox' },
          { title: 'Nintendo', value: 'nintendo' },
        ],
        layout: 'radio', // You can also use 'dropdown' for a dropdown list
      },
      validation: Rule => Rule.required().error('Category is required'),
    },
  ],
};
