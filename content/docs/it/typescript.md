---
title: "Usare TypeScript con Wompo"
description: "Tipizza props, componenti e riferimenti per migliorare l'esperienza di sviluppo."
metaTitle: "TypeScript"
metaDescription: "Scopri come usare TypeScript con Wompo."
navTitle: "TypeScript"
order: 700
---
## Props tipizzate {#props-tipizzate}

Wompo e' scritto in TypeScript, quindi puoi tipizzare le props come faresti con una normale funzione.

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

Quando renderizzi `UserCard` da un altro template Wompo, TypeScript puo' aiutarti a trovare props mancanti o non valide.

## Tipi utili {#tipi-utili}

- `WompoProps`: props base disponibili su ogni componente.
- `RenderHtml`: valore prodotto dal template tag `html`.
- `WompoComponent`: tipo di una funzione componente Wompo.
- `WompoElement`: tipo dell'istanza DOM di un componente registrato.

## Ref tipizzate {#ref-tipizzate}

`useRef` e' generico. Passa il tipo dell'elemento DOM quando vuoi autocompletamento sui nodi nativi.

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

## Metodi esposti {#metodi-esposti}

Quando un componente espone metodi con `useExposed`, descrivi quei metodi con `WompoElement`.

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
      <button @click=${() => setOpen(false)}>Chiudi</button>
    </dialog>
  `;
}

defineWompo(Modal, {
  name: 'app-modal',
});
```

Poi tipizza la ref nel componente parent.

```ts
import { defineWompo, html, useRef } from 'wompo';
import Modal, { type ModalElement } from './Modal.js';

function App() {
  const modalRef = useRef<ModalElement>();

  return html`
    <button @click=${() => modalRef.current?.open()}>
      Apri modal
    </button>
    <${Modal} ref=${modalRef} />
  `;
}

defineWompo(App);
```
