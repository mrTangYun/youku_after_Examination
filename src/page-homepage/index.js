import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			showModal: true
		};
	}

	onClick = () => {
		this.setState({
			count: this.state.count ? (this.state.count + 1) : 1
		});
	};

	render() {
		return (
			<div styleName="App">
				<img src={require('../images/homepage.jpg')} alt='' />
				<div styleName="logo" style={{
					fontSize: '5em'
				}}>
					<img src={require('../images/youkulogo.png')} alt='' />
					{this.state.count}
				</div>
				<div styleName="btn" onClick={this.onClick}>
					<img src={require('../images/button.png')} alt='' />
				</div>
			</div>
		);
	}
}

export default CSSModules(App, styles);