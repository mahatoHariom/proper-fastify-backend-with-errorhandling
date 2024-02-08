export interface Product {
  id: string
  name: string
  description: string
  category: string
  originalPrice: number
  discountPrice: number
  stock: number
  userId: string
  soldOut?: number | null
  createdAt: Date
  updatedAt: Date
  images: Image[]
}

export interface Image {
  id: string
  public_id: string
  imgSrc: string
  productId?: string | null
}
