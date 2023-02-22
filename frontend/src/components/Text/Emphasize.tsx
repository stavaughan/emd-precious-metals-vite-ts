import React from 'react'

type Props = {
	children?: string
}

const Emphasize = {
	Italic: ({ children }: Props) => (
		<span className="fst-italic">
			{children}
		</span>
	),
	Bold: ({ children }: Props) => (
		<span className="font-bold">
			{children}
		</span>
	),
	Underline: ({ children }: Props) => (
		<span className="text-decoration-underline">
			{children}
		</span>
	),
	Strike: ({ children }: Props) => (
		<span className="text-decoration-line-through">
			{children}
		</span>
	),
	Monospace: ({ children }: Props) => (
		<span className="font-monospace">
			{children}
		</span>
	),
	Highlight: ({ children }: Props) => (
		<span className="mark text-slate-700">
			{children}
		</span>
	),
	Highlighter: ({ children }: Props) => (
		<span className="highlighted2 text-slate-700 mx-1">
			{children}
		</span>
	)
}

export default Emphasize
