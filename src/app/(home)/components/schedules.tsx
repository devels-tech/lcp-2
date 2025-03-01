import Image from 'next/image'
import { Clock, Book } from 'lucide-react'

import scheduleImg from '@/images/schedule-section.jpg'

export default function ScheduleSection() {
  return (
    <div className='mx-auto w-full max-w-7xl p-4'>
      <div className='overflow-hidden rounded-3xl bg-gradient-to-r from-[#1e478d] to-blue-800'>
        <div className='grid lg:grid-cols-2'>
          {/* Left Content Section */}
          <div className='p-8 lg:p-12'>
            <h2 className='mb-8 text-3xl font-bold text-white'>Nuestros Servicios</h2>

            <div className='space-y-8'>
              <div className='flex items-start gap-4'>
                <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-blue-400'>
                  <Clock className='h-6 w-6' />
                </div>

                <div>
                  <h3 className='text-xl font-semibold text-white'>Servicio Dominical</h3>
                  <p className='text-blue-100'>
                    <span className='font-semibold'>1er Servicio:</span> 8:00 AM - 10:00 AM
                  </p>

                  <p className='text-blue-100'>
                    <span className='font-semibold'>2do Servicio:</span> 11:00 AM - 1:00 PM
                  </p>
                </div>
              </div>

              <div className='flex items-start gap-4'>
                <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-blue-400'>
                  <Book className='h-6 w-6' />
                </div>

                <div>
                  <h3 className='text-xl font-semibold text-white'>Estudio Bíblico</h3>
                  <p className='text-blue-100'>
                    <span className='font-semibold'>Miércoles:</span> 6:00 PM - 7:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className='mt-6 rounded-2xl bg-blue-900/50 p-6'>
              <p className='text-center text-2xl font-semibold text-[#fbbf24]'>
                "Cada domingo es una nueva <br />
                experiencia con DIOS"
              </p>
            </div>
          </div>

          {/* Right Image Section */}
          <div className='relative bg-orange-500'>
            <div className='absolute right-4 top-4 rounded-lg bg-white/10 px-6 py-2 backdrop-blur-sm z-10'>
              <span className='text-2xl font-bold text-white'>Bienvenidos</span> <br />
              <span className='text-sm text-white'>a nuestra comunidad</span>
            </div>

            {/* Decorative Elements */}
            <div className='absolute left-1/2 top-8 h-16 w-16 -translate-x-1/2 rounded-full bg-blue-600/30 blur-xl'></div>
            <div className='absolute right-8 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full bg-orange-300/30 blur-xl'></div>

            <div className='relative h-full min-h-[400px]'>
              <Image
                src={scheduleImg}
                alt='Imagen de nuestra iglesia'
                fill
                className='object-cover'
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
