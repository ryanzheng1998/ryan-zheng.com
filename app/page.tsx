import Image from 'next/image'

export default function Home() {
  return (
    <div className="grid place-items-center">
      <Image src="/me.jpeg" width={768 / 3} height={1024 / 3} alt="me" />
      <p>
        My name is Ryan. I'm a software engineer. My favorite technologies right
        now are: React.js, Typescript, Node.js, and PostgreSQL.
      </p>
      <br />
      <h3>Projects</h3>
      <ul>
        <li>M</li>
      </ul>
    </div>
  )
}
