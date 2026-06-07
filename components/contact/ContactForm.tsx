'use client'

import { useState } from 'react'
import { z } from 'zod'

// ── Schema ───────────────────────────────────────────
const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'الاسم يجب أن يكون حرفين على الأقل' })
    .max(50, { message: 'الاسم طويل جداً' }),
  subject: z
    .string()
    .min(3, { message: 'الموضوع يجب أن يكون 3 أحرف على الأقل' })
    .max(100, { message: 'الموضوع طويل جداً' }),
  message: z
    .string()
    .min(10, { message: 'الرسالة يجب أن تكون 10 أحرف على الأقل' })
    .max(1000, { message: 'الرسالة طويلة جداً (الحد 1000 حرف)' }),
})

type ContactFormData = z.infer<typeof contactSchema>

interface Props {
  whatsappNumber: string  // مثال: '218925337531'
}

export default function ContactForm({ whatsappNumber }: Props) {
  const [form, setForm] = useState<ContactFormData>({
    name: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFormData, boolean>>>({})

  // validate حقل واحد عند مغادرته
  const validateField = (field: keyof ContactFormData, value: string) => {
    const result = contactSchema.shape[field].safeParse(value)
    setErrors((prev) => ({
      ...prev,
      [field]: result.success ? undefined : result.error.errors[0].message,
    }))
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (touched[name as keyof ContactFormData]) {
      validateField(name as keyof ContactFormData, value)
    }
  }

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    validateField(name as keyof ContactFormData, value)
  }

  const handleSubmit = () => {
    // تحقق من كل الحقول
    const result = contactSchema.safeParse(form)
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {}
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof ContactFormData
        fieldErrors[field] = err.message
      })
      setErrors(fieldErrors)
      setTouched({ name: true, subject: true, message: true })
      return
    }

    // بناء رسالة WhatsApp
    const text = encodeURIComponent(
      `الاسم: ${form.name}\nالموضوع: ${form.subject}\n\nالرسالة:\n${form.message}`
    )
    const url = `https://wa.me/${whatsappNumber}?text=${text}`
    window.open(url, '_blank')
  }

  // ── Field Classes ────────────────────────────────────
  const baseInput = [
    'w-full rounded-lg px-4 py-3 text-sm outline-none transition-colors',
    'bg-[#F7F4EF] text-[#1A1A18] border border-gray-200',
    'dark:bg-[#1E1E1C] dark:text-[#F7F4EF] dark:border-[#3a3a38]',
    'focus:border-[#B5872A] dark:focus:border-[#B5872A]',
    'placeholder:text-gray-400 dark:placeholder:text-gray-500',
  ].join(' ')

  const errorInput = 'border-red-400 dark:border-red-500'

  return (
    <div className="flex flex-col gap-5">

      {/* الاسم */}
      <div>
        <label className="block text-sm font-medium mb-1.5 text-[#1A1A18] dark:text-[#F7F4EF]">
          الاسم <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="أدخل اسمك"
          className={`${baseInput} ${errors.name ? errorInput : ''}`}
        />
        {errors.name && touched.name && (
          <p className="mt-1 text-xs text-red-500">{errors.name}</p>
        )}
      </div>

      {/* الموضوع */}
      <div>
        <label className="block text-sm font-medium mb-1.5 text-[#1A1A18] dark:text-[#F7F4EF]">
          الموضوع <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="موضوع رسالتك"
          className={`${baseInput} ${errors.subject ? errorInput : ''}`}
        />
        {errors.subject && touched.subject && (
          <p className="mt-1 text-xs text-red-500">{errors.subject}</p>
        )}
      </div>

      {/* الرسالة */}
      <div>
        <label className="block text-sm font-medium mb-1.5 text-[#1A1A18] dark:text-[#F7F4EF]">
          الرسالة <span className="text-red-500">*</span>
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={5}
          placeholder="اكتب رسالتك هنا..."
          className={`${baseInput} resize-none ${errors.message ? errorInput : ''}`}
        />
        <div className="flex justify-between mt-1">
          {errors.message && touched.message ? (
            <p className="text-xs text-red-500">{errors.message}</p>
          ) : (
            <span />
          )}
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {form.message.length}/1000
          </span>
        </div>
      </div>

      {/* زر الإرسال */}
      <button
        type="button"
        onClick={handleSubmit}
        className={[
          'w-full py-3 rounded-lg font-bold text-sm transition-all',
          'bg-[#B5872A] text-white hover:bg-[#9a7022] active:scale-[0.98]',
          'dark:bg-[#B5872A] dark:hover:bg-[#9a7022]',
          'flex items-center justify-center gap-2',
        ].join(' ')}
      >
        {/* WhatsApp icon */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.859L.057 23.428a.5.5 0 0 0 .515.572l5.724-1.501A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.523-5.188-1.432l-.372-.22-3.853 1.011 1.03-3.753-.242-.386A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
        إرسال عبر واتساب
      </button>

    </div>
  )
}
