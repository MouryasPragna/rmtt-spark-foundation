import { expect, test } from 'bun:test';
import { rfqSchema } from './rfq';

const valid = {
  name: 'Asha Rao', company: 'Example Components', email: 'asha@example.com', phone: '+91 98765 43210',
  toolType: '', industry: '', material: 'Aluminium', machine: '', qty: '', description: 'Boring tool for a die-cast housing.',
  website: '', consent: true,
};

test('a complete enquiry passes validation', () => {
  expect(rfqSchema.safeParse(valid).success).toBe(true);
});
test('tabs and line breaks are allowed in the description', () => {
  expect(rfqSchema.safeParse({ ...valid, description: 'Line one\r\n\tLine two' }).success).toBe(true);
});
test('other control characters are rejected', () => {
  for (const char of ['\u0000', '\u0008', '\u000b', '\u000c', '\u000e', '\u001f']) {
    expect(rfqSchema.safeParse({ ...valid, description: `bad${char}text` }).success).toBe(false);
  }
});
test('the spam-trap field must stay empty', () => {
  expect(rfqSchema.safeParse({ ...valid, website: 'http://spam.example' }).success).toBe(false);
});
