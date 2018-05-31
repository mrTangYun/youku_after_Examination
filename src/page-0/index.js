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

	componentDidMount() {
		window.HollywoodLog && window.HollywoodLog.expose('canvas.loaded', '画布页.加载完毕', '');
		window.canvasContainer = this.canvas;
		if (window.Avatar) {
			window.Avatar.exec('init');
		}
	}

	componentWillUnMount() {
		window.canvasContainer = null;
	}

	clickStartGameHandler = () => {
		this.setState({
			showModal: false
		});
	};
	render() {
		return (
			<div styleName="App">
				<div
					styleName="canvas"
					ref={node => {
						this.canvas = node;
					}}
				/>
				<Tools onClickGenerateHandler={this.props.onClickGenerateHandler} />
				{
					this.state.showModal  && <ModalBegain onClick={this.clickStartGameHandler} />
				}
			</div>
		);
	}
}

export default CSSModules(App, styles);