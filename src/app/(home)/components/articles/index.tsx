'use client'

import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import { useEffect, useState } from 'react'
import Image from 'next/image'

import { Button } from '@/ui/button'

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
    <section className='w-full bg-slate-50 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='container grid gap-6 md:grid-cols-[1fr,2fr]'>
        {/* Left Section with Background Image */}
        <div className='relative min-h-[400px] overflow-hidden rounded-xl'>
          <Image src='https://placehold.co/1020x1080' alt='Recursos Cristianos' fill className='object-cover' />
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-black/20' />
          <div className='absolute bottom-0 left-0 p-6 text-white'>
            <h2 className='mb-2 text-3xl font-bold'>Recursos Cristianos</h2>
            <p className='text-lg'>Descubre artículos y recursos para fortalecer tu vida espiritual</p>
          </div>
        </div>

        {/* Right Section with Carousel */}
        <div className='relative'>
          <div className='mb-4 flex items-center justify-between'>
            <h3 className='text-xl font-semibold'>Artículos Destacados</h3>
            <Button variant='ghost' className='gap-2'>
              Ver más <ArrowRight className='h-4 w-4' />
            </Button>
          </div>

          <div className='relative'>
            <div className='overflow-hidden' ref={emblaRef}>
              <div className='flex gap-6'>
                {articles.map((article) => (
                  <div key={article.id} className='relative min-w-[280px] flex-[0_0_auto]'>
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
                  </div>
                ))}
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
      </div>
    </section>
  )
}
