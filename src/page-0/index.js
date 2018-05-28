import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './App.css';
import ModalBegain from '../components/modal-begain'
import Tools from '../components/tools'



class App extends Component {
	render() {
		return (
			<div styleName="App">
				<div>生成</div>
				<Tools />
				<ModalBegain />
			</div>
		);
	}
}

export default CSSModules(App, styles);