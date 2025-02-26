import NewsletterSubscribe from './components/news-letter-subscribe'
import FeatureCarousel from './components/feature-carousel'
import ArticleList from './components/articles-list'
import ContactForm from './components/contact-form'
import ArticleCarousel from './components/articles'
import Schedules from './components/schedules'
import Timeline from './components/timeline'
import Marquee from './components/marquee'
import Hero from './components/hero'

export default function Home() {
  return (
    <>
      <Hero />
      <Schedules />
      {/* <FeatureCarousel /> */}
      <ArticleCarousel />
      <ArticleList />
      <Timeline />
      <Marquee />
      <ContactForm />
      <NewsletterSubscribe />
    </>
  )
}
