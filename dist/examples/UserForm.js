import{useState as p,defineWomp as r,html as u}from"womp";export default function o(){const[e,n]=p({name:"Tongi",lastname:"Patongi",age:22,contacts:{email:"patongi@tongi.com",phone:"+393280000000"}}),s={textAlign:"left",border:"1px solid grey",borderRadius:"5px",padding:"20px"},t=(a,l)=>{n({...e,[a]:l})},i=(a,l)=>{n({...e,contacts:{...e.contacts,[a]:l}})};return u`<div style=${s}>
      <label>
        Name:
        <input value=${e.name} @input=${a=>t("name",a.target.value)} />
      </label>

      <label>
        Last Name:
        <input
          value=${e.lastname}
          @input=${a=>t("lastname",a.target.value)}
        />
      </label>

      <label>
        Age:
        <input
          type="number"
          value=${e.age}
          @input=${a=>t("age",a.target.value)}
        />
      </label>

      <label>
        Email:
        <input
          type="email"
          value=${e.contacts.email}
          @input=${a=>i("email",a.target.value)}
        />
      </label>

      <label>
        Phone:
        <input
          type="tel"
          value=${e.contacts.phone}
          @input=${a=>i("phone",a.target.value)}
        />
      </label>

      <p>
        Name: ${e.name} ${e.lastname}. Age: ${e.age}.
      </p>
      <p>
        Contacts:
        <ul>
          <li>Email: ${e.contacts.email}</li>
          <li>Phone: ${e.contacts.phone}</li>
        </ul>
      </p>
    </div>
	`}r(o,{name:"user-form-example"});
