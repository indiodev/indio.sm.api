import { BaseQueryPaginate } from '#dtos/query.dto'
import School from '#models/school.model'

export type SchoolResponsiblePaginate = BaseQueryPaginate & { school: School | null | undefined }

export type SchoolStudentPaginate = BaseQueryPaginate & { school: School | null | undefined }

export type SchoolCoursePaginate = BaseQueryPaginate & { school: School | null | undefined }

export type SchoolDashboard = { school: School | null | undefined }

export interface SchoolDashboardMetric {
  student: {
    count: number
  }
  responsible: {
    count: number
  }
  course: {
    count: number
  }
}
