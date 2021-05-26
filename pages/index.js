import Link from 'next/link'
import Head from 'next/head'
import { getAllPosts } from '../lib/data'
import { format, parseISO } from 'date-fns'

export default function Home ({ posts }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='space-y-4'>

        {posts.map((item) => (
          <ListBlogItems key={item.slug} {...item} />
        ))}

      </main>
    </div>
  )
}

export async function getStaticProps () {
  const allPosts = getAllPosts()
  return {
    props: {
      posts: allPosts.map(({ data, content, slug }) => ({
        ...data,
        date: data.date,
        content,
        slug
      }))
    }
  }
}

function ListBlogItems ({ slug, title, date, content }) {
  return (
    <div className='border border-gray-100 hover:border-gray-200 shadow hover:shadow-md transition duration-100 ease-in-out rounded-md p-4'>
      <div>
        <Link href={`blog/${slug}`}>
          <a className='text-xl font-bold'>
            {title}
          </a>
        </Link>
      </div>
      <div className='text-gray-600 text-xs'>
        {format(parseISO(date), 'd. MMMM uuu')}
      </div>
      <div>{content.substr(0, 300)}</div>
    </div>
  )
}
