'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/ui/carousel'
import { Button } from '@/ui/button'

// Datos de ejemplo
const agenda = [
  {
    id: 1,
    title: 'Jesus te presento a mi amigo',
    image: 'https://placehold.co/300x400',
    category: 'Vida Cristiana',
  },
  {
    id: 2,
    title: 'Inscripcion escuela de crecimiento',
    image: 'https://placehold.co/300x400',
    category: 'Estudios Bíblicos',
  },
  {
    id: 3,
    title: 'Inscripcion instituto biblico',
    image: 'https://placehold.co/300x400',
    category: 'Juventud',
  },
  {
    id: 4,
    title: 'Ministerio de deportes',
    image: 'https://placehold.co/300x400',
    category: 'Música',
  },
]

export const LCPAgenda = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
  })
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true)

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
    <section className='w-full bg-slate-50 pb-12 pt-4 max-w-7xl mx-auto px-4 '>
      <div className='w-full  grid gap-6 md:grid-cols-[1fr,2fr]'>
        {/* Left Section with Background Image */}
        <div className='relative w-full h-full max-h-[500px] overflow-hidden rounded-xl'>
          {/* <Image src='https://placehold.co/1280x600' alt='Recursos Cristianos' fill className='object-cover' /> */}
          <video
            width={1280}
            height={600}
            controls={false}
            preload='one'
            loop={true}
            autoPlay={true}
            muted
            className='object-cover'
          >
            <source src='/multimedia/welcome-video.mp4' type='video/mp4' />
          </video>

          <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-black/10' />

          <div className='absolute bottom-0 left-0 p-6 text-white'>
            <h2 className='mb-2 text-6xl font-bold'>La Casa de mi Padre</h2>
            <p className='text-xl italic'>"Donde todos tienen un lugar"</p>
          </div>
        </div>

        {/* Right Section with Carousel */}
        <div className='relative'>
          <div className='mb-4 flex items-center justify-between'>
            <h4 className='text-xl font-bold'>LCP Agenda</h4>
            <Button variant='ghost' className='gap-2'>
              Ver más <ArrowRight className='h-4 w-4' />
            </Button>
          </div>

          <Carousel className='w-full select-none'>
            <CarouselContent>
              {agenda.map((article) => (
                <CarouselItem key={article.id} className="w-full basis-1/1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div key={article.id} className='relative w-full flex-[0_0_auto]'>
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
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className='left-0 bg-white' />
            <CarouselNext className='right-0 bg-white' />
          </Carousel>
        </div>
      </div>
    </section>
  )
}
