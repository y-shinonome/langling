import Image from 'next/image'

type Props = {
  src: string
  className?: string
}

const SVG: React.FC<Props> = ({ src, className }) => {
  const alt = src.match('.+/(.+?).[a-z]+([?#;].*)?$')![1] ?? 'undefined'

  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        layout="fill"
        objectFit="contain"
        alt={alt}
        className={className}
      />
    </div>
  )
}

export default SVG
