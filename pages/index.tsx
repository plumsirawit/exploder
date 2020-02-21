import React, {Fragment, useState} from 'react';

function InputField({state, setState}) {
	return <Fragment>
		<input type="text" placeholder="ใส่ข้อความที่นี่" value={state.txt} onChange={(e) => {
			setState({
				...state,
				txt: e.target.value
			});
		}}/>
		<style jsx>
		{`
			input {
				font-size: 14pt;
				line-height: 2;
			}
		`}
		</style>
	</Fragment>;
}

function OutputExplosion({state, setState}){
	function explode(str){
		const txtmatch = /[\u0E01-\u0E30]|\u0E32|[\u0E3F-\u0E46]|[\u0E50-\u0E5B]|[a-z]|[A-Z]| /g;
		return str.replace(txtmatch, function(matched){
			return ' ' + matched;
		}).slice(1) || ' ';
	}
	return <Fragment>
		<pre>
			{explode(state.txt)}
		</pre>
		<style jsx>
			{`
				pre {
					font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
					font-size: 20pt;
				}
			`}
		</style>
	</Fragment>
}

function Index() {
	const [state, setState] = useState({txt: ''});
	return (
	  <div className="mainBox">
		<h1>Exploder</h1>
		<InputField state={state} setState={setState} />
		<OutputExplosion state={state} setState={setState} />
		<br />
		<br />
		<br />
		<p>by Sirawit Pongnakintr</p>
		<p>Last Updated: 21 Feb</p>
		<style jsx>{`
			h1 {
				font-family: 'Tahoma', 'Arial';
				font-size: 36pt;
			}
			.mainBox {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
			}
			p {
				font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
				font-size: 10pt;
				line-height: 0.1;
			}
		`}</style>
	  </div>
	);
  }

export default Index;