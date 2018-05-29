import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './optionItem.css';

class Item extends Component {
	clickHandler = index => {
		this.props.onClick && this.props.onClick(this.props.index, this.node);
	};
	render() {
		return (
			<div
				onClick={this.clickHandler}
				styleName='container'
				className={styles.container + ' ' + (this.props.isActive ? styles.choosed : '' )}
				ref={
					node => {
						this.node = node;
					}
				}
			>
				<img src={require(`../../images/icons/${this.props.imgUrl}`)} alt='' />
			</div>
		);
	}
}

export default CSSModules(Item, styles);