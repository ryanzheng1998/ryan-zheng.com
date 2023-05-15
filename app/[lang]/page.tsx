export default function Home(p: { params: { lang: string } }) {
  return <p>{p.params.lang}</p>
}
