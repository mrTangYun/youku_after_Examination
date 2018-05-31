import React, { Component } from 'react';

import styles from './css.css';

const timeupdateHandler = function(){
	const buffer = 1.2;
    if(this.currentTime > this.duration - buffer){
        this.currentTime = 0;
        this.play();
    }
};
export default class Music extends Component {
	constructor() {
		super();
		this.state = {
			status: false,
			fakePlaying: false
		};
	}
	componentDidMount() {
        document.body.addEventListener('touchstart', this.mokAutoPlay);
		this.media.addEventListener('timeupdate', timeupdateHandler);
	}

	componentWillUnmount() {
        this.media.removeEventListener('timeupdate', timeupdateHandler);
	}
    clickHandler = () => {
		if (this.state.status) {
			this.stop();
		} else {
			this.play();
		}
	};

	mokAutoPlay = () => {
		document.body.removeEventListener('touchstart', this.mokAutoPlay);
		this.setState({
			fakePlaying: false
		});
		if (this.hasSetAutoPlay) {
			return false;
		}
		this.hasSetAutoPlay = true;
		this.play();
	};
	play = () => {
		if (this.state.status) return false;
        this.setState({
            status: true
        });
        this.media.play();
	};
	stop = () => {
		this.setState({
			status: false
		});
        this.media.pause()
	};
	render() {
		const {status, fakePlaying} = this.state;
		const styleName = status || fakePlaying ? styles.play : styles.pause;
		return (
			<div className={styles.audio_btn}>
				<div className={styleName} onClick={this.clickHandler} />
				<audio
					ref={node => {
						this.media = node;
					}}
					src={require('../../images/others/music/music.mp3')}
					preload="true"
				/>
			</div>
		);
	}
}