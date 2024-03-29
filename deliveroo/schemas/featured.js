import {defineField, defineType} from 'sanity'

export default defineType({
    name: 'featured',
    title: "Today's featured",
    type: 'document',
    fields: [
      defineField({
        name: 'name',
        type: 'string',
        title: 'Featured Category name',
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'short_desc',
        type: 'string',
        title: 'Short description',
        validation: (Rule) => Rule.max(200),
      }),
      defineField({
        name: 'restaurants',
        type: 'array',
        title: 'Restaurants',
        of: [{type: 'reference', to: [{type: 'restaurant'}]}],
      }),
    ],
  })
  