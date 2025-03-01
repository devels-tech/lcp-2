'use client'

import type React from 'react'

import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/common/lib/utils'

// Datos de ejemplo
const articles = [
  {
    id: 1,
    title: 'La importancia de la oración',
    image: 'https://placehold.co/300x400',
    category: 'Vida Cristiana',
  },
  {
    id: 2,
    title: 'Estudio del libro de Juan',
    image: 'https://placehold.co/300x400',
    category: 'Estudios Bíblicos',
  },
  {
    id: 3,
    title: 'Ministerio juvenil',
    image: 'https://placehold.co/300x400',
    category: 'Juventud',
  },
  {
    id: 4,
    title: 'Adoración y alabanza',
    image: 'https://placehold.co/300x400',
    category: 'Música',
  },
]

interface ArticleListProps {
  imageOnRight?: boolean
  type: {
    label: string
    description?: string
    image: string
  }
}

export const ArticleList: React.FC<ArticleListProps> = ({ imageOnRight = false, type }) => {
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
    <section
      className={cn(
        'w-full py-12 max-w-7xl mx-auto px-4 grid grid-flow-col-dense grid-cols-12',
        imageOnRight && 'grid-flow-col',
      )}
    >
      <div className={cn('relative w-full col-span-4 bg-zinc-100', imageOnRight ? 'order-last' : 'order-first')}>
        <img
          src={type?.image ? type?.image : 'https://placehold.co/600x650'}
          alt='lcp'
          className={cn('w-full h-full object-cover', imageOnRight ? 'rounded-r-2xl' : 'rounded-l-2xl')}
        />

        <div className={cn(
            'rounded-r absolute inset-0 bg-gradient-to-t from-black/60 to-transparent',
            imageOnRight ? 'rounded-r-2xl' : 'rounded-l-2xl'
          )}
        />

        <div className='absolute bottom-0 left-0 p-4'>
          <span className='text-white text-4xl font-bold'>{type.label}</span>
          <p className='text-zinc-400 text-sm mt-1'>{type?.description}</p>
        </div>
      </div>

      <div className={cn('w-full col-span-8 bg-blue-100 p-4', imageOnRight ? 'rounded-l-2xl' : 'rounded-r-2xl')}>
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
              {articles.map((article) => (
                <article key={article.id} className='relative min-w-[280px] flex-[0_0_auto] select-none'>
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
              ))}
            </div>
          </div>

          {/* Carousel Navigation Buttons */}
          <button
            className={cn(
              'absolute -left-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg disabled:opacity-50',
              prevBtnEnabled && 'cursor-pointer',
            )}
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
          >
            <ChevronLeft className='h-5 w-5' />
          </button>
          <button
            className={cn(
              'absolute -right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg disabled:opacity-50',
              nextBtnEnabled && 'cursor-pointer',
            )}
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
