import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './App.css';

class App extends Component {
	render() {
		return (
			<div styleName="App">
				<div styleName="modal">
					<div styleName="title">演示动画</div>
					<div styleName="xlt">donghua</div>
					<div styleName="desc">拖拽四肢，就可以进行你的狂欢动作了！</div>
					<div styleName="btn">开始游戏</div>
				</div>
			</div>
		);
	}
}

export default CSSModules(App, styles);