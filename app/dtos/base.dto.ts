import { BasePaginate, BaseQuery } from '#dtos/query.dto'
import { LucidModel, ModelAttributes } from '@adonisjs/lucid/types/model'

type FindProps<T extends LucidModel> = Omit<Model<T>, 'createdAt' | 'updatedAt'> & BaseQuery
type PaginateProps<T extends LucidModel> = Omit<Model<T>, 'createdAt' | 'updatedAt'> & BasePaginate

type Model<T extends LucidModel> = ModelAttributes<InstanceType<T>>

export type Create<T extends LucidModel> = Partial<Model<T>>
export type Update<T extends LucidModel> = Partial<Model<T>>

export type Find<T extends LucidModel> = Partial<FindProps<T>>
export type Paginate<T extends LucidModel> = Partial<PaginateProps<T>>

export type DateFormat = 'yyyy-mm-dd'
