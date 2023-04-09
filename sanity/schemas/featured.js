export default {
    name: 'featured',
    title: 'Featured Menu categories',
    type: 'document',
    fields: [
      {
        name: 'featured',
        title: 'Featured Category name',
        type: 'string',
        validation: (Rule) => Rule.required()
      },
      {
        name: 'short_description',
        title: 'Short description',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },

      {
        name: 'resturants',
        title: 'Resturants',
        type: 'array',
        of: [{type: "reference", to: [{type: "resturant"}]}],
      },
    ],
  }
  