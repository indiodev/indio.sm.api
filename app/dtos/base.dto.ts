import { BaseQuery, BaseQueryPaginate } from '#dtos/query.dto'
import { LucidModel, ModelAttributes } from '@adonisjs/lucid/types/model'

type QueryProps<T extends LucidModel> = Omit<Model<T>, 'createdAt' | 'updatedAt'> & BaseQuery
type QueryPaginateProps<T extends LucidModel> = Omit<Model<T>, 'createdAt' | 'updatedAt'> &
  BaseQueryPaginate

export type Model<T extends LucidModel> = ModelAttributes<InstanceType<T>>

export type Create<T extends LucidModel> = Partial<Model<T>>
export type Update<T extends LucidModel> = Partial<Model<T>>

export type Query<T extends LucidModel> = Partial<QueryProps<T>>
export type QueryPaginate<T extends LucidModel> = Partial<QueryPaginateProps<T>>

export type DateFormat = 'yyyy-mm-dd'
