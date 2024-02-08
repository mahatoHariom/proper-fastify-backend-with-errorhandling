import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

export const createProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  category: z.string(),
  originalPrice: z.number(),
  discountPrice: z.number(),
  stock: z.number(),
  //   userId: z.string(),
  images: z.array(
    z.object({
      public_id: z.string(),
      imgSrc: z.string()
    })
  )
})

export type CreateProductInput = z.infer<typeof createProductSchema>

const createProductResponse = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  category: z.string(),
  originalPrice: z.number(),
  discountPrice: z.number(),
  stock: z.number(),
  userId: z.string(),
  soldOut: z.number().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  images: z.object({
    id: z.string(),
    public_id: z.string(),
    imgSrc: z.string()
  })
})

export const { schemas: productSchemas, $ref } = buildJsonSchemas(
  {
    createProductSchema,
    createProductResponse
  },
  { $id: 'Product' }
)
