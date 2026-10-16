import assert from 'node:assert/strict'
import { test } from 'node:test'
import { bookingMessage, formatINR, isIndianMobile, sized, waLink } from './site.ts'

test('wa.me link carries every booking field, safely encoded', () => {
  const text = bookingMessage('Hi, checking a date', {
    name: 'Divya & Karthik',
    phone: '98765 43210',
    eventType: 'Haldi & mehendi',
    eventDate: '14 February 2027',
    venue: 'Mylapore, Chennai',
    guests: '350',
    note: 'கல்யாணம் #2 + reception?',
  })
  const link = waLink('+91 98765-43210', text)
  assert.ok(link.startsWith('https://wa.me/919876543210?text='))
  const decoded = decodeURIComponent(link.split('?text=')[1])
  assert.equal(decoded, text)
  for (const part of ['Name: Divya & Karthik', 'Phone: 98765 43210', 'Event: Haldi & mehendi',
    'Date: 14 February 2027', 'City / venue: Mylapore, Chennai', 'Guests: 350', 'Note: கல்யாணம் #2 + reception?']) {
    assert.ok(decoded.includes(part), part)
  }
  assert.ok(!link.slice(link.indexOf('?text=') + 6).match(/[&#+\s]/), 'reserved characters must be encoded')
})

test('blank optional fields are still listed', () => {
  const text = bookingMessage('Hi', { name: 'A', phone: '9', eventType: 'Wedding', eventDate: 'x', venue: ' ', guests: '', note: '' })
  assert.match(text, /City \/ venue: Not decided yet/)
  assert.match(text, /Guests: Not decided yet/)
  assert.match(text, /Note: Not decided yet/)
})

test('indian mobile validation', () => {
  for (const ok of ['9876543210', '+91 98765 43210', '098765-43210', '919876543210']) assert.ok(isIndianMobile(ok), ok)
  for (const bad of ['12345', '5876543210', '98765432101', '', '+1 202 555 0100']) assert.ok(!isIndianMobile(bad), bad)
})

test('INR uses Indian grouping', () => {
  assert.equal(formatINR(165000), 'INR 1,65,000')
})

test('sized rewrites only unsplash widths', () => {
  assert.equal(sized('https://images.unsplash.com/photo-1?w=1600&q=80&auto=format', 800), 'https://images.unsplash.com/photo-1?w=800&q=80&auto=format')
  assert.equal(sized('/local.jpg', 800), '/local.jpg')
})
