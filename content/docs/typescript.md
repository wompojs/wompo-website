---
title: "Using Typescript with Wompo"
description: "How to use Typescript with Wompo to improve your code and make it bug-proof."
metaTitle: "Typescript"
metaDescription: "Learn how to use Typescript and improve your development experience with Wompo."
navTitle: "Typescript"
order: 700
---
## Typed props {#typed-props}

Wompo is written in TypeScript, so you can type component props the same way you type a normal function.

```ts
import { defineWompo, html, type WompoProps } from 'wompo';

interface UserCardProps extends WompoProps {
  name: string;
  role?: string;
}

function UserCard({ name, role = 'Member', styles: s }: UserCardProps) {
  return html`
    <article class=${s.card}>
      <strong>${name}</strong>
      <span>${role}</span>
    </article>
  `;
}

defineWompo<UserCardProps>(UserCard);
```

When you render `UserCard` from another Wompo template, TypeScript can help you catch missing or invalid props.

## Useful types {#useful-types}

- `WompoProps`: base props available to every component.
- `RenderHtml`: value produced by the `html` template tag.
- `WompoComponent`: type of a Wompo function component.
- `WompoElement`: DOM instance type for a registered component.

## Typed refs {#typed-refs}

`useRef` is generic. Pass the DOM element type when you want autocompletion for native nodes.

```ts
import { html, useRef } from 'wompo';

function SearchBox() {
  const inputRef = useRef<HTMLInputElement>();

  const focus = () => inputRef.current?.focus();

  return html`
    <input ref=${inputRef} />
    <button @click=${focus}>Focus</button>
  `;
}
```

## Exposed methods {#exposed-methods}

When a component exposes methods with `useExposed`, describe those methods with `WompoElement`.

```ts
import {
  defineWompo,
  html,
  useExposed,
  useState,
  type WompoProps,
  type WompoElement,
} from 'wompo';

interface ModalApi {
  open: () => void;
  close: () => void;
}

export type ModalElement = WompoElement<WompoProps, ModalApi>;

function Modal() {
  const [open, setOpen] = useState(false);

  useExposed<ModalApi>({
    open: () => setOpen(true),
    close: () => setOpen(false),
  });

  return html`
    <dialog open=${open}>
      <button @click=${() => setOpen(false)}>Close</button>
    </dialog>
  `;
}

defineWompo(Modal, {
  name: 'app-modal',
});
```

Then type the ref in the parent component.

```ts
import { defineWompo, html, useRef } from 'wompo';
import Modal, { type ModalElement } from './Modal.js';

function App() {
  const modalRef = useRef<ModalElement>();

  return html`
    <button @click=${() => modalRef.current?.open()}>
      Open modal
    </button>
    <${Modal} ref=${modalRef} />
  `;
}

defineWompo(App);
```
