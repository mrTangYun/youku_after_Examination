import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './App.css';

class App extends Component {
	render() {
		return (
			<div styleName="App">
				<div styleName="composeImg">
					<img src={require('../images/pshare/compose.jpg')} alt='' />
				</div>
				<div styleName="footer">
					<div styleName="leftText">
						<div styleName="t1">高考后的那一夜...</div>
						<div styleName="t2">在最初开始的地方，一切笑着告别</div>
						<div styleName="logoAndT3">
							<div styleName="logo">
								<img src={require('../images/pshare/logo.png')} alt='' />
							</div>
							<div styleName="t3">上优酷下拉首页有惊喜</div>
						</div>
					</div>
					<div styleName="btnShare">分享图片</div>
				</div>
			</div>
		);
	}
}

export default CSSModules(App, styles);