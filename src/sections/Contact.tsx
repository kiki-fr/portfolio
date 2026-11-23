import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check, Mail } from 'lucide-react'
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { ArtSlot } from '../components/ArtSlot'
import { Folio } from '../components/Folio'
import { MaskLines } from '../components/Reveal'
import { contactArt } from '../data/art'
import { projectTypeKeys, site, type ProjectType } from '../data/site'
import { useT } from '../i18n'
import { sectionNumber } from '../data/sections'
import { PREFILL_EVENT, type PrefillDetail } from '../lib/events'
import { useSheet } from '../hooks/useSheet'
import './Contact.css'

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'not-connected'

interface FormState {
  name: string
  email: string
  company: string
  type: ProjectType | ''
  budget: string
  message: string
  /** honeypot — must stay empty */
  website: string
}

const empty: FormState = { name: '', email: '', company: '', type: '', budget: '', message: '', website: '' }

export function Contact() {
  const t = useT()
  const c = t.contact
  const [form, setForm] = useState<FormState>(empty)
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const clipPath = useSheet(sectionRef)
  const connected = Boolean(site.formEndpoint)

  // Pre-fill from any "Enquire" button on the page.
  useEffect(() => {
    const onPrefill = (e: Event) => {
      const { type, note } = (e as CustomEvent<PrefillDetail>).detail
      setForm((f) => ({
        ...f,
        type: type ?? f.type,
        message: note && !f.message.startsWith(note) ? note + f.message : f.message,
      }))
      setStatus('idle')
      window.setTimeout(() => messageRef.current?.focus({ preventScroll: true }), 700)
    }
    window.addEventListener(PREFILL_EVENT, onPrefill)
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill)
  }, [])

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((f) => ({ ...f, [k]: v }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const validate = () => {
    const e: typeof errors = {}
    if (!form.name.trim()) e.name = c.errors.name
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = c.errors.email
    if (form.message.trim().length < 10) e.message = c.errors.message
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const mailtoHref = () => {
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Company / brand: ${form.company || '—'}`,
      `Project type: ${form.type ? c.projectTypes[form.type] : '—'}`,
      `Budget: ${form.budget || '—'}`,
      '',
      form.message,
    ].join('\n')
    return `mailto:${site.email}?subject=${encodeURIComponent(`${c.subject} — ${form.company || form.name}`)}&body=${encodeURIComponent(body)}`
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (form.website) return // bot
    if (!validate()) return

    if (!connected) {
      setStatus('not-connected')
      return
    }

    setStatus('sending')
    try {
      const { website: _hp, ...payload } = form
      void _hp
      const res = await fetch(site.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...payload, _subject: `${c.subject} — ${form.company || form.name}` }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
      setForm(empty)
    } catch {
      setStatus('error')
    }
  }

  return (
    <motion.section ref={sectionRef} style={{ clipPath }} id="contact" className="contact" aria-labelledby="contact-title">
      <div className="wrap contact__inner">
        <Folio id="contact" aside={t.common.location} />

        <h2 id="contact-title" className="contact__title">
          <MaskLines
            lines={[
              <>
                {c.titleA} <span className="serif">{c.titleASerif}</span>
              </>,
              <>
                {c.titleB}
                <span className="contact__q foil-text">?</span>
              </>,
            ]}
          />
        </h2>

        <div className="contact__grid">
          <div className="contact__intro">
            <div className="contact__swatch marks" aria-hidden="true">
              <ArtSlot art={contactArt} label={false} treatment="foil" decorative />
            </div>
            <p className="contact__lede">
              {c.lede}
            </p>
            {site.email && (
              <a className="contact__mail" href={`mailto:${site.email}`}>
                <Mail aria-hidden="true" /> {site.email}
              </a>
            )}
            <p className="contact__small mono">{c.small}</p>
          </div>

          <div className="contact__card" data-card={`${c.card} Nº ${sectionNumber('contact')}`}>
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div
                  key="sent"
                  className="contact__done"
                  role="status"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <span className="contact__done-icon">
                    <Check aria-hidden="true" />
                  </span>
                  <p className="contact__done-title serif">{c.doneTitle}</p>
                  <p>{c.doneText}</p>
                  <button className="btn btn--line" onClick={() => setStatus('idle')}>
                    {c.again}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  className="contact__form"
                  onSubmit={onSubmit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {!connected && (
                    <p className="contact__notice mono" role="note">
                      {c.notice}
                    </p>
                  )}

                  <div className="field-row">
                    <Field label={c.fields.name} error={errors.name} required>
                      <input
                        name="name"
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) => set('name', e.target.value)}
                        aria-invalid={Boolean(errors.name)}
                      />
                    </Field>
                    <Field label={c.fields.email} error={errors.email} required>
                      <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => set('email', e.target.value)}
                        aria-invalid={Boolean(errors.email)}
                      />
                    </Field>
                  </div>

                  <Field label={c.fields.company}>
                    <input
                      name="company"
                      autoComplete="organization"
                      value={form.company}
                      onChange={(e) => set('company', e.target.value)}
                    />
                  </Field>

                  <fieldset className="field field--chips">
                    <legend>{c.fields.type}</legend>
                    <div className="chips">
                      {projectTypeKeys.map((k) => (
                        <label key={k} className={`chip ${form.type === k ? 'is-on' : ''}`}>
                          <input
                            type="radio"
                            name="type"
                            value={k}
                            checked={form.type === k}
                            onChange={() => set('type', k)}
                          />
                          {c.projectTypes[k]}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <Field label={c.fields.budget}>
                    <select name="budget" value={form.budget} onChange={(e) => set('budget', e.target.value)}>
                      <option value="">{c.selectRange}</option>
                      {c.budgets.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label={c.fields.message} error={errors.message} required>
                    <textarea
                      ref={messageRef}
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => set('message', e.target.value)}
                      placeholder={c.messagePlaceholder}
                      aria-invalid={Boolean(errors.message)}
                    />
                  </Field>

                  {/* Honeypot: hidden from people, attractive to bots */}
                  <div className="sr-only" aria-hidden="true">
                    <label>
                      Website
                      <input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => set('website', e.target.value)} />
                    </label>
                  </div>

                  <div className="contact__submit">
                    <button type="submit" className="btn btn--ink" disabled={status === 'sending'} data-cursor={t.cursor.send}>
                      {status === 'sending' ? c.sending : c.send} <ArrowUpRight aria-hidden="true" />
                    </button>

                    <div aria-live="polite" className="contact__feedback">
                      {status === 'error' && (
                        <p>
                          {c.error}{' '}
                          {site.email ? (
                            <a href={mailtoHref()}>{c.errorEmail}</a>
                          ) : (
                            c.tryAgain
                          )}
                        </p>
                      )}
                      {status === 'not-connected' && (
                        <p>
                          {c.notConnected}{' '}
                          {site.email ? (
                            <a href={mailtoHref()}>{c.openEmail}</a>
                          ) : (
                            c.emailSoon
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string
  error?: string
  required?: boolean
  children: ReactNode
}) {
  return (
    <label className={`field ${error ? 'has-error' : ''}`}>
      <span className="field__label">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </span>
      {children}
      {error && <span className="field__error">{error}</span>}
    </label>
  )
}
