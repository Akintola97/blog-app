
export const banner = {
    name: 'banner',
    title: 'Banner',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Image Title',
        type: 'string',
        validation: Rule => Rule.required().error('Image title is required'),
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
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true, // Enables image cropping
        },
        validation: Rule => Rule.required().error('Image is required'),
      },
      {
        name: 'dateCreated',
        title: 'Date Created',
        type: 'datetime',
        validation: Rule => Rule.required().error('Date created is required'),
      },
    ],
  };