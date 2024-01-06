import Image from 'next/image'
import Map from '@/app/Components/Map'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Map></Map>
    </main>
  )
}
