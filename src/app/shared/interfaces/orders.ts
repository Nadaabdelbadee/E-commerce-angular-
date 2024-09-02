export interface orders {
    status: string
    session: Session
  }
  
  export interface Session {
    url: string
    success_url: string
    cancel_url: string
  }



  
  export interface cashOrderRes {
    status: string
    data: Data
  }
  
  export interface Data {
    taxPrice: number
    shippingPrice: number
    totalOrderPrice: number
    paymentMethodType: string
    isPaid: boolean
    isDelivered: boolean
    _id: string
    user: string
    cartItems: CartItem[]
    shippingAddress: ShippingAddress
    createdAt: string
    updatedAt: string
    id: number
    __v: number
  }
  
  export interface CartItem {
    count: number
    _id: string
    product: string
    price: number
  }
  
  export interface ShippingAddress {
    details: string
    phone: string
    city: string
  }
  




  
  // 
export type Root = userOrders[]

export interface userOrders {
  shippingAddress: ShippingAddress
  taxPrice: number
  shippingPrice: number
  totalOrderPrice: number
  paymentMethodType: string
  isPaid: boolean
  isDelivered: boolean
  _id: string
  user: User
  cartItems: CartItem[]
  paidAt?: string
  createdAt: string
  updatedAt: string
  id: number
  __v: number
}

export interface User {
  _id: string
  name: string
  email: string
  phone: string
}


export interface Product {
  subcategory: Subcategory[]
  ratingsQuantity: number
  _id: string
  title: string
  imageCover: string
  category: Category
  brand: Brand
  ratingsAverage: number
  id: string
}

export interface Subcategory {
  _id: string
  name: string
  slug: string
  category: string
}

export interface Category {
  _id: string
  name: string
  slug: string
  image: string
}

export interface Brand {
  _id: string
  name: string
  slug: string
  image: string
}
