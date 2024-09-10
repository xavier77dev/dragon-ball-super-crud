import type { Types } from 'mongoose'

export interface Character {
  _id: Types.ObjectId
  ki: string
  name: string
  race: string
  maxKi: string
  image: string
  gender: string
  description: string
  affiliation: string
  owner: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

export type CharacterCreateDto = Omit<
  Character,
  'owner' | 'createdAt' | 'updatedAt' | '_id'
>
export type CharacterUpdateDto = Partial<CharacterCreateDto>

export interface CharacterResponse {
  items: Item[]
  meta: Meta
  links: Links
}

export interface Item {
  id: number
  name: string
  ki: string
  maxKi: string
  race: string
  gender: Gender
  description: string
  image: string
  affiliation: Affiliation
  deletedAt: null
}

export enum Affiliation {
  ArmyOfFrieza = 'Army of Frieza',
  Freelancer = 'Freelancer',
  ZFighter = 'Z Fighter'
}

export enum Gender {
  Female = 'Female',
  Male = 'Male'
}

export interface Links {
  first: string
  previous: string
  next: string
  last: string
}

export interface Meta {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}
