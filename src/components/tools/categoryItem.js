import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './categoryItem.css';

class Item extends Component {
	clickBigClassIndex = index => {
		this.props.onClick && this.props.onClick(this.props.index);
	};
	render() {
		return (
			<div
			className={styles.item + ' ' + (this.props.currentIndex === this.props.index ? styles.choosed : '')}
			onClick={this.clickBigClassIndex}
			>
				<div styleName="classBtnsIcon">
					<img src={require('../../images/icons/' + this.props.mainIcon)} />
				</div>
				<div
					styleName="classBtnsTitle"
					ref={node => {
						this.titleNode = node;
					}}
				>
					{this.props.name}
				</div>
			</div>
		);
	}
}

export default CSSModules(Item, styles);