'use client'

import { useState, FormEvent, useEffect } from 'react'
import Image from 'next/image'
import axios from 'axios'

const copy = '/assets/copy.svg'
const linkIcon = '/assets/link.svg'
const loader = '/assets/loader.svg'
const tick = '/assets/ tick.svg'

const useSummary = () => {
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState('')
  const [error, setError] = useState<any>(null)

  const getSummary = async ({ url }: { url: string }) => {
    try {
      setLoading(true)

      const { data } = await axios.get('https://article-extractor-and-summarizer.p.rapidapi.com/summarize', {
        params: {
          url,
          length: 3
        },
        headers: {
          'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY!,
          'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com'
        }
      })

      return data.summary
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, getSummary }
}

const Demo = () => {
  const [article, setArticle] = useState({
    url: '',
    summary: ''
  })
  const [allArticles, setAllArticles] = useState<any>([])
  const { loading, getSummary, error } = useSummary()
  const [copied, setCopied] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const summary = await getSummary({ url: article.url })

    const newArticle = { ...article, summary }
    const updatedAllArticles = [newArticle, ...allArticles]

    setArticle(newArticle)
    setAllArticles(updatedAllArticles)
    localStorage.setItem('articles', JSON.stringify(updatedAllArticles))
  }

  const handleCopy = (copyUrl: string) => {
    setCopied(copyUrl)
    navigator.clipboard.writeText(copyUrl)
    setTimeout(() => setCopied(''), 2000)
  }

  useEffect(() => {
    // @ts-ignore
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'))

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage)
    }
  }, [])

  return (
    <section className='mt-16 w-full max-w-xl'>
      <div className=' flex flex-col w-full gap-2'>
        <form className='relative flex justify-center items-center' onSubmit={handleSubmit}>
          <Image className='absolute left-0 my-2 ml-3 w-5' src={linkIcon} alt='link_icon' width={20} height={20} />

          <input
            type='url'
            placeholder='Enter a URL'
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className='url_input peer'
          />

          <button type='submit' className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700'>
            ↵
          </button>
        </form>

        <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
          {allArticles.map((item: any, index: number) => {
            return (
              <div key={`link-${index}`} className='link_card' onClick={() => setArticle(item)}>
                <div className='copy_btn' onClick={() => handleCopy(item.url)}>
                  <Image
                    src={copied === item.url ? tick : copy}
                    alt='copy_icon'
                    className='w-[40%] h-[40%] object-contain'
                    width={40}
                    height={40}
                  />
                </div>
                <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>{item.url}</p>
              </div>
            )
          })}
        </div>
      </div>

      <div className='my-10  max-w-full flex justify-center items-center'>
        {loading ? (
          <Image src={loader} alt='loader' className='w-20 h-20 object-contain' width={20} height={20} />
        ) : error ? (
          <p className='font-inter font-bold text-black text-center'>{`Well, that wasn't supposed to happen...`}</p>
        ) : (
          article.summary && (
            <div className='flex flex-col gap3'>
              <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                Article <span className='blue_gradient'>Summary</span>
              </h2>
              <div className='summary_box'>
                <p className='font-inter font-medium text-sm text-gray-700'>{article.summary}</p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  )
}

export default Demo
