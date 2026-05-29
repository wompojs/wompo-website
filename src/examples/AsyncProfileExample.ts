import { Suspense, defineWompo, html, useAsync, useState } from 'wompo';

const profiles = {
	ada: {
		name: 'Ada Lovelace',
		role: {
			en: 'Library maintainer',
			it: 'Maintainer della libreria',
		},
		status: {
			en: 'Reviewing the dashboard release',
			it: 'Sta revisionando la release della dashboard',
		},
	},
	grace: {
		name: 'Grace Hopper',
		role: {
			en: 'Platform engineer',
			it: 'Platform engineer',
		},
		status: {
			en: 'Preparing the hydration checklist',
			it: 'Sta preparando la checklist di hydration',
		},
	},
};

type ProfileId = keyof typeof profiles;

function wait(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function loadProfile(profileId: ProfileId) {
	await wait(700);
	return profiles[profileId];
}

function AsyncProfileCard({ profileId }: { profileId: ProfileId }) {
	const profile = useAsync(() => loadProfile(profileId), [profileId]);
	const locale = getLocale();
	const content = profile
		? html`
				<strong>${profile.name}</strong>
				<span>${profile.role[locale]}</span>
				<p>${profile.status[locale]}</p>
			`
		: html`<p class="muted">${locale === 'it' ? 'Caricamento profilo...' : 'Loading profile...'}</p>`;

	return html`
		<article class="profileCard">
			${content}
		</article>
	`;
}

function getLocale() {
	return typeof document !== 'undefined' && document.documentElement.lang === 'it' ? 'it' : 'en';
}

AsyncProfileCard.css = `
	:host {
		display: block;
	}
	.profileCard {
		display: grid;
		gap: 0.45rem;
		padding: 1.2rem;
		border: 1px solid #e2def4;
		border-radius: 8px;
		background: #fff;
	}
	.profileCard strong {
		color: #171322;
		font-size: 1.5rem;
	}
	.profileCard span,
	.profileCard p,
	.muted {
		margin: 0;
		color: #5e586d;
		font-size: 1.35rem;
	}
`;

defineWompo(AsyncProfileCard, {
	name: 'async-profile-card-example',
});

export default function AsyncProfileExample() {
	const [profileId, setProfileId] = useState<ProfileId>('ada');
	const locale = getLocale();

	return html`
		<section class="shell">
			<div class="controls">
				<button
					type="button"
					class=${profileId === 'ada' ? 'active' : ''}
					@click=${() => setProfileId('ada')}
				>
					Ada
				</button>
				<button
					type="button"
					class=${profileId === 'grace' ? 'active' : ''}
					@click=${() => setProfileId('grace')}
				>
					Grace
				</button>
			</div>
			<${Suspense}
				fallback=${html`
					<p class="loading">
						${locale === 'it' ? 'Caricamento contenuto asincrono...' : 'Loading async content...'}
					</p>
				`}
			>
				<${AsyncProfileCard} profileId=${profileId} />
			</${Suspense}>
		</section>
	`;
}

AsyncProfileExample.css = `
	:host {
		display: block;
		margin: 1.6rem 0 2rem;
	}
	.shell {
		display: grid;
		gap: 1rem;
		padding: 1.2rem;
		border: 1px solid #ded9f2;
		border-radius: 8px;
		background: #f8f7ff;
	}
	.controls {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
	}
	button {
		border: 1px solid #cfc8ed;
		border-radius: 6px;
		background: #fff;
		color: #332b53;
		cursor: pointer;
		font: inherit;
		font-size: 1.3rem;
		padding: 0.55rem 0.85rem;
	}
	button.active {
		border-color: #573ef6;
		background: #573ef6;
		color: #fff;
	}
	.loading {
		margin: 0;
		color: #5e586d;
		font-size: 1.35rem;
	}
`;

defineWompo(AsyncProfileExample, {
	name: 'async-profile-example',
});
