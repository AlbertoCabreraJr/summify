import Hero from '@components/Hero'
import Demo from '@components/Demo'

export default function Home() {
  return (
    <main>
      <div className='main'>
        <div className='gradient'></div>
      </div>

      <div className='app'>
        <Hero />
        <Demo />
      </div>
    </main>
  )
}
