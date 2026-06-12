'use client'

import React from 'react'
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer'

interface Props {
  content: BlocksContent
  dir?: 'rtl' | 'ltr'
  className?: string
}

export default function RichTextRenderer({ content, dir = 'rtl', className = '' }: Props) {
  if (!content || !Array.isArray(content) || content.length === 0) {
    return null
  }

  return (
    <div dir={dir} className={`rich-content ${dir === 'rtl' ? 'rich-rtl' : 'rich-ltr'} ${className}`}>
      <BlocksRenderer
        content={content}
        blocks={{
          // رابط
          link: ({ children, url }) => {
            // روابط البروتوكول الخارجي (tel, mailto, whatsapp...) تُفتح مباشرة في نفس النافذة
            const isExternalProtocol = /^(tel:|mailto:|whatsapp:|sms:|callto:)/i.test(url);
            // روابط HTTP الخارجية تُفتح في تبويب جديد
            const isExternalHttp = /^https?:\/\//i.test(url) && !url.startsWith(typeof window !== 'undefined' ? window.location.origin : '');

            return (
              <a
                href={url}
                target={isExternalHttp ? '_blank' : '_self'}
                rel={isExternalHttp ? 'noopener noreferrer' : undefined}
                className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
                onClick={isExternalProtocol ? (e) => {
                  // امنع أي interceptors من التدخل
                  e.stopPropagation();
                } : undefined}
              >
                {children}
              </a>
            );
          },
          // عنوان
          heading: ({ children, level }) => {
            const Tag = (`h${level}`) as React.ElementType
            return <Tag className={`heading-${level}`}>{children}</Tag>
          },
          // فقرة
          paragraph: ({ children }) => (
            <p className="mb-4 leading-loose">{children}</p>
          ),
          // صورة
          image: ({ image }) => (
            <figure className="my-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.url}
                alt={image.alternativeText ?? ''}
                className="rounded-lg shadow-md mx-auto max-w-full"
              />
              {image.caption && (
                <figcaption className="text-center text-sm text-muted-foreground mt-2">
                  {image.caption}
                </figcaption>
              )}
            </figure>
          ),
          // قائمة
          list: ({ children, format }) =>
            format === 'ordered' ? (
              <ol className="list-decimal mb-4 pr-6">{children}</ol>
            ) : (
              <ul className="list-disc mb-4 pr-6">{children}</ul>
            ),
          // اقتباس
          quote: ({ children }) => (
            <blockquote className="border-r-4 border-primary pr-4 my-6 text-muted-foreground italic">
              {children}
            </blockquote>
          ),
          // كود
          code: ({ children }) => (
            <pre className="bg-gray-900 text-green-400 rounded-lg p-4 my-4 overflow-x-auto text-left" dir="ltr">
              <code>{children}</code>
            </pre>
          ),
        }}
        modifiers={{
          bold: ({ children }) => <strong className="font-bold">{children}</strong>,
          italic: ({ children }) => <em>{children}</em>,
          underline: ({ children }) => <u>{children}</u>,
          strikethrough: ({ children }) => <s>{children}</s>,
          code: ({ children }) => (
            <code className="bg-gray-100 text-red-600 px-1 rounded text-sm font-mono" dir="ltr">
              {children}
            </code>
          ),
        }}
      />
    </div>
  )
}
