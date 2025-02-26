'use client'

import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import { useEffect, useState } from 'react'
import Image from 'next/image'

import { Button } from '@/ui/button'
import Link from 'next/link'

// Datos de ejemplo
const articles = [
  {
    id: 1,
    title: 'La importancia de la oración',
    image: 'https://placehold.co/600x400',
    category: 'Vida Cristiana',
  },
  {
    id: 2,
    title: 'Estudio del libro de Juan',
    image: 'https://placehold.co/600x400',
    category: 'Estudios Bíblicos',
  },
  {
    id: 3,
    title: 'Ministerio juvenil',
    image: 'https://placehold.co/600x400',
    category: 'Juventud',
  },
  {
    id: 4,
    title: 'Adoración y alabanza',
    image: 'https://placehold.co/600x400',
    category: 'Música',
  },
]

export default function ArticleCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
  })
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true)

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev()
  const scrollNext = () => emblaApi && emblaApi.scrollNext()

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setPrevBtnEnabled(emblaApi.canScrollPrev())
      setNextBtnEnabled(emblaApi.canScrollNext())
    }

    emblaApi.on('select', onSelect)
    onSelect()

    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  return (
    <section className='w-full bg-slate-50 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-flow-col-dense grid-cols-12'>
      <div className='w-full col-span-4 bg-zinc-100'>
        <img
          src='https://placehold.co/600x650'
          alt='lcp'
          className='rounded-l-md w-full h-full object-cover'
        />
      </div>

      <div className='w-full col-span-8 bg-blue-100 p-4 rounded-r-md'>
        <div className='w-full flex justify-between items-center'>
          <h5 className='font-semibold'>Articulos destacados</h5>

          <Link href='/' className='text-sm flex items-center underline'>
            Ver mas
            <ArrowRight size={14} className='ml-2' />
          </Link>
        </div>

        <div className='relative mt-5'>
          <div className='overflow-hidden' ref={emblaRef}>
            <div className='flex gap-6'>
              {
                articles.map((article) => (
                  <article key={article.id} className='relative min-w-[280px] flex-[0_0_auto]'>
                    <div className='group overflow-hidden rounded-lg'>
                      <div className='relative aspect-[4/5]'>
                        <Image
                          src={article.image || '/placeholder.svg'}
                          alt={article.title}
                          fill
                          className='object-cover transition-transform duration-300 group-hover:scale-105'
                        />
                      </div>

                      <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />

                      <div className='absolute bottom-0 p-4 text-white'>
                        <p className='mb-2 text-sm font-medium'>{article.category}</p>
                        <h4 className='text-lg font-semibold'>{article.title}</h4>
                      </div>
                    </div>
                  </article>
                ))
              }
            </div>
          </div>

          {/* Carousel Navigation Buttons */}
          <button
            className='absolute -left-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg disabled:opacity-50'
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
          >
            <ChevronLeft className='h-5 w-5' />
          </button>
          <button
            className='absolute -right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg disabled:opacity-50'
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
          >
            <ChevronRight className='h-5 w-5' />
          </button>
        </div>
      </div>
    </section>
  )
}
