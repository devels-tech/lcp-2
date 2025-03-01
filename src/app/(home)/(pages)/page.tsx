import FeatureCarousel from '../components/feature-carousel'
import { ArticleList } from '../components/articles/article-list'
import ContactForm from '../components/contact-form'
import { LCPAgenda } from '../components/lcp-agenda'
import Schedules from '../components/schedules'
import Timeline from '../components/timeline'
import Link from 'next/link'
import { ExternalLink, Link as IconLink, Link2 } from 'lucide-react'

export default function Home() {
  return (
    <>
      <LCPAgenda />
      <Schedules />
      {/* <FeatureCarousel /> */}

      <div className='w-full mt-8 max-w-7xl mx-auto px-4'>
        <h5 className='text-2xl font-bold'>Articulos y devocionales</h5>


        <Link href='/' className='text-sm flex items-center underline'>
          Ver mas
          <ExternalLink size={14} className='ml-2' />
        </Link>
      </div>

      <ArticleList
        type={{
          label: 'Alma',
          image: 'https://www.lcpcaracas.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fespiritu.ce7e56e5.webp&w=1920&q=75',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut orci luctus, tincidunt nisi ut, varius lectus'
        }}
      />
      <ArticleList
        imageOnRight
        type={{
          label: 'Cuerpo',
          image: 'https://www.lcpcaracas.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Falma.f6410b5e.webp&w=1920&q=75',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut orci luctus, tincidunt nisi ut, varius lectus'
        }}
      />
      <ArticleList
        type={{
          label: 'Espíritu',
          image: 'https://www.lcpcaracas.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcuerpo.6bab1db1.webp&w=1920&q=75',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut orci luctus, tincidunt nisi ut, varius lectus'
        }}
      />
      <Timeline />
      <ContactForm />
    </>
  )
}
