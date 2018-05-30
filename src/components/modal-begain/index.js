import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './App.css';

class App extends Component {
	render() {
		return (
			<div styleName="App" onClick={this.props.onClick}>
				<div styleName="modal" onClick={(event) => {
					event.stopPropagation();
				}}>
					<div styleName="title">演示动画</div>
					<div styleName="xlt">
						<img src={require('../../images/others/intro.gif')} alt='' />
						<div styleName="icon-scale" />
						<div styleName="icon-close" />
						<div styleName="icon-rotate" />
					</div>
					<div styleName="desc">拖拽四肢，就可以进行你的狂欢动作了！</div>
					<div styleName="btn" onClick={this.props.onClick}>开始游戏</div>
				</div>
			</div>
		);
	}
}

export default CSSModules(App, styles);