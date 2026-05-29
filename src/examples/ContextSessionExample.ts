import { createContext, defineWompo, html, useContext, useState } from 'wompo';

interface Session {
	user: string;
	plan: 'Free' | 'Pro';
}

const SessionContext = createContext<Session>({
	user: 'Guest',
	plan: 'Free',
});

function SessionCard() {
	const session = useContext(SessionContext);
	const isItalian = getLocale() === 'it';

	return html`
		<article class="card">
			<span>${isItalian ? 'Sessione corrente' : 'Current session'}</span>
			<strong>${session.user}</strong>
			<p>${isItalian ? `Piano ${session.plan}` : `${session.plan} plan`}</p>
		</article>
	`;
}

function getLocale() {
	return typeof document !== 'undefined' && document.documentElement.lang === 'it' ? 'it' : 'en';
}

SessionCard.css = `
	:host {
		display: block;
	}
	.card {
		display: grid;
		gap: 0.4rem;
		padding: 1.2rem;
		border: 1px solid #dfe8e3;
		border-radius: 8px;
		background: #fff;
	}
	span,
	p {
		margin: 0;
		color: #54645b;
		font-size: 1.32rem;
	}
	strong {
		color: #14251c;
		font-size: 1.55rem;
	}
`;

defineWompo(SessionCard, {
	name: 'context-session-card-example',
});

export default function ContextSessionExample() {
	const [session, setSession] = useState<Session>({
		user: 'Ada',
		plan: 'Free',
	});
	const isItalian = getLocale() === 'it';

	const toggleSession = () => {
		setSession(
			session.plan === 'Free'
				? { user: 'Ada', plan: 'Pro' }
				: { user: 'Grace', plan: 'Free' },
		);
	};

	return html`
		<section class="shell">
			<${SessionContext.Provider} value=${session}>
				<${SessionCard} />
				<button type="button" @click=${toggleSession}>
					${isItalian ? 'Cambia sessione' : 'Switch session'}
				</button>
			</${SessionContext.Provider}>
		</section>
	`;
}

ContextSessionExample.css = `
	:host {
		display: block;
		margin: 1.6rem 0 2rem;
	}
	.shell {
		display: grid;
		gap: 1rem;
		padding: 1.2rem;
		border: 1px solid #d7e4dc;
		border-radius: 8px;
		background: #f5fbf7;
	}
	button {
		justify-self: start;
		border: 1px solid #7da68e;
		border-radius: 6px;
		background: #1f6f45;
		color: #fff;
		cursor: pointer;
		font: inherit;
		font-size: 1.3rem;
		padding: 0.6rem 0.9rem;
	}
`;

defineWompo(ContextSessionExample, {
	name: 'context-session-example',
});
