import useSWR from 'swr'

const fetcher = (...args: [string]) => fetch(...args).then((res) => res.json())

const SWR: React.FC = () => {
  const { data, error } = useSWR('/api/micro_cms/', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <>
      {data.map((angling_spot: { name: string }, index: number) => (
        <p key={index}>{angling_spot.name}</p>
      ))}
    </>
  )
}

export default SWR