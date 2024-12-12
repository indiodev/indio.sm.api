import User from '#models/user.model'
import { Role } from '#utils/enum.util'
import { NumberNormalizer } from '#utils/function.util'
import stringHelpers from '@adonisjs/core/helpers/string'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run(): Promise<void> {
    const exist = await User.query().where('email', 'jedaistec@escolarize.com').first()

    if (exist) return

    const user = await User.create({
      email: 'jedaistec@escolarize.com',
      password: 'jedaistec@escolarize.com',
      name: 'Escola Jedais Tec',
      role: Role.SCHOOL,
    })

    const school = await user?.related('school').create({
      cnpj: NumberNormalizer('33.801.105/0001-07'),
      phone: NumberNormalizer('(97) 98440-5662'),
      slug: stringHelpers.slug(user.name, {
        lower: true,
      }),
    })

    const BASE = [
      {
        code: 'T1',
        title: 'Informática Básica',
        description: `
            <p class="text-lg font-medium">Curso infantil de informática básica</p>
            <p class="text-lg"><strong>💻 Introdução ao mundo digital para crianças!</strong></p>
            <p class="space-y-2">Ideal para alunos novos, este curso ensina os fundamentos do uso do computador e navegação na internet de maneira lúdica e interativa.</p>
        `,
        schedule: '7-9',
        audience: 'Infantil (Novos alunos)',
        days_of_week: 'Segunda a Sexta',
        age_group: '6 à 10 anos',
      },
      {
        code: 'T2',
        title: 'Informática Intermediária',
        description: `
            <p class="text-lg font-medium">Curso de informática intermediária</p>
            <p class="text-lg"><strong>🔧 Amplie suas habilidades digitais!</strong></p>
            <p class="space-y-2">Este curso é para quem já conhece o básico e deseja aprender ferramentas e programas mais avançados para melhorar a produtividade.</p>
        `,
        schedule: '9-11',
        days_of_week: 'Segunda a Sexta',
        audience: 'Alunos que realizaram o Curso de Informática Básica',
        age_group: '10 à 13 anos',
      },
      {
        code: 'T3',
        title: 'Informática Avançada',
        description: `
            <p class="text-lg font-medium">Curso de informática avançada</p>
            <p class="text-lg"><strong>⚙️ Torne-se um expert em tecnologia!</strong></p>
            <p class="space-y-2">Aprenda a resolver problemas complexos, otimizar sistemas e utilizar recursos avançados do computador.</p>
        `,
        schedule: '13-15',
        days_of_week: 'Segunda a Sexta',
        audience: 'Alunos que realizaram o Curso de Informática Intermediária',
        age_group: '12 à 14 anos',
      },
      {
        code: 'T4',
        title: 'Programação com Jogos Scratch',
        description: `
            <p class="text-lg font-medium">Curso de programação com Scratch</p>
            <p class="text-lg"><strong>🎮 Aprenda a criar jogos enquanto se diverte!</strong></p>
            <p class="space-y-2">Este curso ensina fundamentos de lógica de programação por meio da criação de jogos utilizando a plataforma Scratch.</p>
        `,
        schedule: '15-17',
        days_of_week: 'Segunda a Sexta',
        audience: 'Alunos que realizaram o Curso de Informática Avançada',
        age_group: '10 à 14 anos',
      },
      {
        code: 'T5',
        title: 'Curso de Canvas',
        description: `
            <p class="text-lg font-medium">Curso de design gráfico com Canva</p>
            <p class="text-lg"><strong>🎨 Crie designs incríveis!</strong></p>
            <p class="space-y-2">Aprenda a utilizar o Canva para criar designs profissionais, como posts, apresentações e muito mais. Ideal para adultos que desejam desenvolver habilidades em design gráfico.</p>
        `,
        schedule: '19-21',
        audience: 'Adultos',
        days_of_week: 'Segunda a Sexta',
        age_group: 'A partir dos 16 anos',
      },
      {
        code: 'T6',
        title: 'Programação Web (Front-end)',
        description: `
            <p class="text-lg font-medium">Curso de programação web (front-end)</p>
            <p class="text-lg"><strong>🖥️ Construa sites incríveis!</strong></p>
            <p class="space-y-2">Domine tecnologias como HTML, CSS e JavaScript para criar páginas web modernas e funcionais. Ideal para quem busca atuar como desenvolvedor front-end.</p>
        `,
        schedule: '8-11',
        days_of_week: 'Sábado',
        audience: 'Alunos que realizaram o Curso de Informática Avançada',
        age_group: 'A partir dos 15 anos',
        //  (sábado)
      },
      {
        code: 'T7',
        title: 'Informática Intermediária',
        description: `
            <p class="text-lg font-medium">Curso de informática intermediária</p>
            <p class="text-lg"><strong>🔧 Aprimore ainda mais suas habilidades!</strong></p>
            <p class="space-y-2">Aprofunde-se em ferramentas e programas para melhorar sua produtividade e capacidade digital. Aula prática aos sábados.</p>
        `,
        schedule: '14-17',
        days_of_week: 'Sábado',
        // (sábado)
        audience: 'Alunos que realizaram o Curso de Informática Básica',
        age_group: 'Adultos',
      },
    ]

    const courses = await school.related('courses').createMany(
      BASE?.map((item) => ({
        title: item.title,
        description: item.description,
        price: 200,
      }))
    )

    for await (const course of courses) {
      const [result] = await school.related('classes').query().count('*')

      const code = 'T'.concat(String(Number(result?.$extras?.count ?? 0) + 1))

      const reference = BASE?.find((item) => item.code === code)!

      const [start_hour, final_hour] = reference.schedule.split('-')

      await course.related('classes').create({
        capacity: 20,
        start_hour: DateTime.local().set({ hour: Number(start_hour), minute: 0, second: 0 }),
        final_hour: DateTime.local().set({ hour: Number(final_hour), minute: 0, second: 0 }),
        schoolId: school.id,
        audience: reference?.audience,
        age_group: reference?.age_group,
        days_of_week: reference?.days_of_week,
        code,
      })
    }
  }
}
