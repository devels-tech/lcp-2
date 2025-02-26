'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { useState } from 'react'
import * as z from 'zod'

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/ui/form'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
})

export default function NewsletterSubscribe() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      form.reset()
      alert('Thank you for subscribing to our newsletter!')
    }, 2000)
  }

  return (
    <section className='bg-background py-20'>
      <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 shadow-lg'
        >
          <h2 className='text-2xl font-bold text-foreground mb-4 text-center'>Stay Inspired</h2>
          <p className='text-muted-foreground mb-6 text-center'>
            Subscribe to our newsletter for the latest updates on minimal design and floral artistry.
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder='Enter your email' {...field} className='rounded-full' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' className='w-full rounded-full' disabled={isSubmitting}>
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  )
}

