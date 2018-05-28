/**
 * Created by tangyun on 2018/5/19.
 */
import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './css.css';
class scrollTipsComponent extends Component {
	render() {
		return (
			<div styleName="container"  className="animated fadeIn" style={{animationDelay: '3.5s'}}>
				<div styleName="heart" className="animated infinite fadeOutDown" style={{animationDelay: '0s'}}></div>
				<div styleName="heart" className="animated infinite fadeOutDown" style={{animationDelay: '0.8s'}}></div>
				<div styleName="heart" className="animated infinite fadeOutDown" style={{animationDelay: '1.6s'}}></div>
				<div styleName="heart" className="animated infinite fadeOutDown" style={{animationDelay: '2.4s'}}></div>
				<div styleName="heart" className="animated infinite fadeOutDown" style={{animationDelay: '3.2s'}}></div>
			</div>
		);
	}
}

export default CSSModules(scrollTipsComponent, styles);