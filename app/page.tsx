import Image from 'next/image'

export default function Home() {
  return (
    <div className="grid place-items-center">
      <Image src="/me.jpeg" width={768 / 3} height={1024 / 3} alt="me" />
      <p>I'm a software engineer.</p>
    </div>
  )
}
