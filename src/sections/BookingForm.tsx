import { useId, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { CalendarDays, MessageCircle } from 'lucide-react'
import { config } from '@/config'
import { bookingMessage, isIndianMobile, waLink } from '@/lib/site'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

type Values = {
  name: string
  phone: string
  eventType: string
  eventDate: Date | undefined
  venue: string
  guests: string
  note: string
}

const longDate = new Intl.DateTimeFormat('en-IN', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })

function startOfToday() {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

/** Opens WhatsApp in a new tab, or in this tab if the popup was blocked. */
function openWhatsApp(link: string) {
  const win = window.open(link, '_blank')
  if (win) win.opener = null
  else window.location.href = link
}

export default function BookingForm({ defaultNote = '', className }: { defaultNote?: string; className?: string }) {
  const uid = useId()
  const id = (name: string) => `${uid}-${name}`
  const [sentLink, setSentLink] = useState<string | null>(null)
  const [dateOpen, setDateOpen] = useState(false)
  const { control, handleSubmit } = useForm<Values>({
    defaultValues: { name: '', phone: '', eventType: '', eventDate: undefined, venue: '', guests: '', note: defaultNote },
  })

  const onSubmit = handleSubmit((v) => {
    const link = waLink(
      config.whatsappNumber,
      bookingMessage(config.whatsappMessage, {
        name: v.name,
        phone: v.phone,
        eventType: v.eventType,
        eventDate: v.eventDate ? longDate.format(v.eventDate) : '',
        venue: v.venue,
        guests: v.guests,
        note: v.note,
      }),
    )
    setSentLink(link)
    openWhatsApp(link)
  })

  return (
    <form onSubmit={onSubmit} noValidate className={cn('grid gap-x-6 gap-y-6 sm:grid-cols-2', className)}>
      <Controller
        name="name"
        control={control}
        rules={{ validate: (v) => v.trim().length >= 2 || 'Enter your name.' }}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={id('name')}>Your name</FieldLabel>
            <Input {...field} id={id('name')} autoComplete="name" aria-invalid={fieldState.invalid} />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="phone"
        control={control}
        rules={{ validate: (v) => isIndianMobile(v) || 'Enter a 10-digit mobile number.' }}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={id('phone')}>Phone</FieldLabel>
            <Input {...field} id={id('phone')} type="tel" inputMode="tel" autoComplete="tel" placeholder="10-digit mobile" aria-invalid={fieldState.invalid} />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="eventType"
        control={control}
        rules={{ required: 'Choose the event.' }}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={id('event')}>Event</FieldLabel>
            <Select name={field.name} value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id={id('event')} className="w-full" aria-invalid={fieldState.invalid} onBlur={field.onBlur}>
                <SelectValue placeholder="Choose one" />
              </SelectTrigger>
              <SelectContent position="popper">
                {config.eventTypes.map((t) => (
                  <SelectItem key={t} value={t} className="min-h-11 pl-3 text-base">
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="eventDate"
        control={control}
        rules={{ required: 'Pick the date.' }}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={id('date')}>Date</FieldLabel>
            <Popover open={dateOpen} onOpenChange={setDateOpen}>
              <PopoverTrigger asChild>
                <Button
                  id={id('date')}
                  type="button"
                  variant="outline"
                  aria-invalid={fieldState.invalid}
                  className={cn(
                    'w-full justify-between border-input bg-transparent px-4 text-base font-normal hover:bg-transparent hover:text-current',
                    !field.value && 'text-muted-foreground',
                  )}
                >
                  {field.value ? longDate.format(field.value) : 'Pick a date'}
                  <CalendarDays aria-hidden className="size-5" strokeWidth={1.5} />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(d) => {
                    field.onChange(d)
                    setDateOpen(false)
                  }}
                  disabled={{ before: startOfToday() }}
                  startMonth={startOfToday()}
                  className="[--cell-size:--spacing(11)]"
                />
              </PopoverContent>
            </Popover>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="venue"
        control={control}
        render={({ field }) => (
          <Field>
            <FieldLabel htmlFor={id('venue')}>City or venue</FieldLabel>
            <Input {...field} id={id('venue')} placeholder={`${config.area}, ${config.city}`} />
          </Field>
        )}
      />
      <Controller
        name="guests"
        control={control}
        rules={{ validate: (v) => v === '' || /^\d{1,5}$/.test(v.trim()) || 'Enter a number, or leave it blank.' }}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={id('guests')}>Guests</FieldLabel>
            <Input {...field} id={id('guests')} inputMode="numeric" placeholder="Approximate" aria-invalid={fieldState.invalid} />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="note"
        control={control}
        render={({ field }) => (
          <Field className="sm:col-span-2">
            <FieldLabel htmlFor={id('note')}>Anything else</FieldLabel>
            <Textarea {...field} id={id('note')} rows={3} placeholder="Muhurtham time, other events, questions" />
          </Field>
        )}
      />

      <div className="sm:col-span-2">
        <Button type="submit" size="lg" className="w-full">
          <MessageCircle aria-hidden className="size-5" strokeWidth={1.5} />
          Send on WhatsApp
        </Button>
        <p className="mt-3 text-[0.9375rem] text-muted-foreground" aria-live="polite">
          {sentLink ? (
            <>
              WhatsApp should be open with your details.{' '}
              <a href={sentLink} target="_blank" rel="noopener" className="underline underline-offset-4">
                Open it again
              </a>
            </>
          ) : (
            'Opens WhatsApp with these details filled in. Nothing is sent until you tap send there.'
          )}
        </p>
      </div>
    </form>
  )
}
