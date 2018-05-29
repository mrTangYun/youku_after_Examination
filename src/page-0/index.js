import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './App.css';
import ModalBegain from '../components/modal-begain'
import Tools from '../components/tools'



class App extends Component {
	constructor() {
		super();
		this.state = {
			showModal: true
		};
	}

	clickStartGameHandler = () => {
		this.setState({
			showModal: false
		});
	};
	render() {
		return (
			<div styleName="App">
				<Tools />
				{
					this.state.showModal  && <ModalBegain onClick={this.clickStartGameHandler} />
				}
			</div>
		);
	}
}

export default CSSModules(App, styles);