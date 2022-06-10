import { CMS_NAME } from '../lib/constants'
import Link from 'next/link';

export default function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        Caleb Gill.
      </h1>
      <h4 className="text-center md:text-left font-bold text-lg mt-16 md:pl-8 word-spacing:40px">
      
      <Link href="/posts/anintro">
        <a>About   </a>
      </Link>{' '}{' '}{' '}
      
      <Link href="/resume">
        <a>Resume   </a>
      </Link>{' '}{' '}{' '}

      <Link href="/contact">
        <a>Contact</a>
      </Link>

        
      </h4>
    </section>
  )
}
