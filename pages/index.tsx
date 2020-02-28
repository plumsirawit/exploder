import React, {Fragment, useState, useRef, createRef, useEffect} from 'react';

const InputField = (props) => {
	const state = props.state;
	const setState = props.setState;
	useEffect(() => {
		const thaivalid = /[\u0E01-\u0E30]|\u0E32|[\u0E3F-\u0E46]|[\u0E50-\u0E5B]/;
		const thaicheck = /[\u0E00-\u0E7F]/;
		const outs = [''];
		const str = state.txt;
		for(var i = 0; i < str.length; i++){
			if(!thaicheck.test(str[i]) || thaivalid.test(str[i])){
				outs.push(' ');
			}
			outs.push(str[i]);
		}
		setState({...state, explosion: outs.join('').slice(1)});
	}, [state.txt]);
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
};

const OutputExplosion = React.forwardRef<HTMLPreElement, {state, setState}>((props, ref) => {
	const state = props.state;
	const setState = props.setState;
	return <Fragment>
		<pre ref={ref}>
			{state.explosion}
		</pre>
		<style jsx>
			{`
				pre {
					font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
					font-size: 20pt;
					white-space: pre-wrap;       /* Since CSS 2.1 */
					white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
					white-space: -pre-wrap;      /* Opera 4-6 */
					white-space: -o-pre-wrap;    /* Opera 7 */
					word-wrap: break-word;       /* Internet Explorer 5.5+ */
				}
			`}
		</style>
	</Fragment>
});

function Index() {
	const [state, setState] = useState({txt: '', explosion: '', copySuccess: '', isCopySupported: false});
	const textAreaRef = createRef<HTMLPreElement>();
	const copyToClipboard = (e) => {
		var range = document.createRange();
		var selection = window.getSelection();
		range.selectNodeContents(textAreaRef.current);

		selection.removeAllRanges();
		selection.addRange(range);
		
		document.execCommand('copy');
		e.target.focus();
		setState({...state, copySuccess: 'Copied!'});
	}
	const copyToExplode = (e) => {
		const oldExplode = state.explosion;
		setState({...state, txt: oldExplode});
	}
	useEffect(() => {
		setState({...state, isCopySupported: document.queryCommandSupported('copy')});
	}, []);
	useEffect(() => {
		document.title = "Exploder";
	}, []);
	return (
	
	  <div className="mainBox">
		  
		<h1>Exploder</h1>
		<InputField state={state} setState={setState} />
		<OutputExplosion state={state} setState={setState} ref={textAreaRef}/>
		{
			state.isCopySupported &&
			<button onClick={(e) => copyToClipboard(e)}>
				Copy to clipboard
			</button>
		}
		{
			<button onClick={(e) => copyToExplode(e)}>
				Explode more
			</button>
		}
		<br />
		<p style={{color: 'green'}}>{state.copySuccess}</p>
		<br />
		<br />
		<p>by <a href="https://github.com/plumsirawit">Sirawit Pongnakintr</a></p>
		<p>Last Updated: 24 Feb 2020</p>
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