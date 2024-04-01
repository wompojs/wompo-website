import { useState, defineWomp, html } from 'womp';

export default function UserForm() {
	const [user, setUser] = useState({
		name: 'Tongi',
		lastname: 'Patongi',
		age: 22,
		contacts: {
			email: 'patongi@tongi.com',
			phone: '+393280000000',
		},
	});

	const divStyles = {
		textAlign: 'left',
		border: '1px solid grey',
		borderRadius: '5px',
		padding: '20px',
	};

	const alterUser = (key: string, value: string) => {
		setUser({
			...user,
			[key]: value,
		});
	};

	const alterUserContact = (key: string, value: string) => {
		setUser({
			...user,
			contacts: {
				...user.contacts,
				[key]: value,
			},
		});
	};

	return html`<div style=${divStyles}>
      <label>
        Name:
        <input value=${user.name} @input=${(ev: any) => alterUser('name', ev.target.value)} />
      </label>

      <label>
        Last Name:
        <input
          value=${user.lastname}
          @input=${(ev: any) => alterUser('lastname', ev.target.value)}
        />
      </label>

      <label>
        Age:
        <input
          type="number"
          value=${user.age}
          @input=${(ev: any) => alterUser('age', ev.target.value)}
        />
      </label>

      <label>
        Email:
        <input
          type="email"
          value=${user.contacts.email}
          @input=${(ev: any) => alterUserContact('email', ev.target.value)}
        />
      </label>

      <label>
        Phone:
        <input
          type="tel"
          value=${user.contacts.phone}
          @input=${(ev: any) => alterUserContact('phone', ev.target.value)}
        />
      </label>

      <p>
        Name: ${user.name} ${user.lastname}. Age: ${user.age}.
      </p>
      <p>
        Contacts:
        <ul>
          <li>Email: ${user.contacts.email}</li>
          <li>Phone: ${user.contacts.phone}</li>
        </ul>
      </p>
    </div>
	`;
}

defineWomp(UserForm, {
	name: 'user-form-example',
});
