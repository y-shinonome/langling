import { useState } from 'react'
import Link from 'next/link'
import SVG from '../../components/atoms/svg'

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <button
        aria-label="menu"
        className="fixed top-2 right-2 z-30 rounded-md bg-[#f9f9f9]/50 p-2 shadow backdrop-blur-[2px] duration-300 hover:bg-black/5"
        onClick={toggleSidebar}
      >
        <SVG
          src={`${isOpen ? '/icons/close.svg' : '/icons/menu.svg'}`}
          className="h-7 w-7"
        />
      </button>
      <div
        onClick={toggleSidebar}
        className={`fixed left-0 top-0 z-20 h-[100vh] w-[100vw] duration-300 ${
          isOpen ? 'bg-white/[1%] backdrop-blur-[2px]' : 'pointer-events-none'
        }`}
      />
      <nav
        className={`fixed right-0 top-0 z-20 h-[100vh] overflow-hidden whitespace-nowrap bg-[#f9f9f9] pt-20 shadow-[0_0_15px_0_rgba(0,0,0,0.2)] duration-300 ${
          isOpen ? 'w-[60%]' : 'w-0'
        } `}
      >
        <Link href="/">
          <a
            className="ml-2 mb-5 block border-b border-black/10 pl-2"
            onClick={toggleSidebar}
          >
            トップページ
          </a>
        </Link>
        <Link href="/angling_map">
          <a
            className="ml-2 mb-5 block border-b border-black/10 pl-2"
            onClick={toggleSidebar}
          >
            釣り場マップ
          </a>
        </Link>
        <Link href="/">
          <a
            className="ml-2 mb-5 block border-b border-black/10 pl-2"
            onClick={toggleSidebar}
          >
            ブログ
          </a>
        </Link>
        <Link href="/">
          <a
            className="ml-2 mb-5 block border-b border-black/10 pl-2"
            onClick={toggleSidebar}
          >
            このサイトについて
          </a>
        </Link>
        <Link href="/">
          <a
            className="ml-2 mb-5 block border-b border-black/10 pl-2"
            onClick={toggleSidebar}
          >
            プライバシーポリシー
          </a>
        </Link>
        <Link href="/">
          <a
            className="ml-2 mb-5 block border-b border-black/10 pl-2"
            onClick={toggleSidebar}
          >
            お問い合わせ
          </a>
        </Link>
      </nav>
    </>
  )
}

export default Navigation