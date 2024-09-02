export interface Brands {
    results: number
    metadata: Metadata
    data: allBrands[]
  }
  
  export interface Metadata {
    currentPage: number
    numberOfPages: number
    limit: number
    nextPage: number
  }
  
  export interface allBrands {
    _id: string
    name: string
    slug: string
    image: string
    createdAt: string
    updatedAt: string
  }
