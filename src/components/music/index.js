import React, { Component } from 'react';

import styles from './css.css';

const timeupdateHandler = function(){
	const buffer = 1.2;
    if(this.currentTime > this.duration - buffer){
        this.currentTime = 0;
        this.play();
    }
};

let hidden, state, visibilityChange; 
if (typeof document.hidden !== "undefined") {
	hidden = "hidden";
	visibilityChange = "visibilitychange";
	state = "visibilityState";
} else if (typeof document.mozHidden !== "undefined") {
	hidden = "mozHidden";
	visibilityChange = "mozvisibilitychange";
	state = "mozVisibilityState";
} else if (typeof document.msHidden !== "undefined") {
	hidden = "msHidden";
	visibilityChange = "msvisibilitychange";
	state = "msVisibilityState";
} else if (typeof document.webkitHidden !== "undefined") {
	hidden = "webkitHidden";
	visibilityChange = "webkitvisibilitychange";
	state = "webkitVisibilityState";
}

export default class Music extends Component {
	constructor() {
		super();
		this.state = {
			status: false,
			fakePlaying: false
		};
	}

	onVisibilityChanged = (event) => {
		var result = document[hidden];  
		if (result) {
			if (this.state.status) {
				this.stopMusicSwitchApp = true;
				this.stop();
			}
		}
		else {
			if (this.stopMusicSwitchApp) {
				this.play();  
			}
		}
	  }  

	onblurHandler = () => {
		if (this.state.status) {
			this.stopMusicSwitchApp = true;
			this.stop();
		}
	};
	onfocusHandler = () => {
		if (this.stopMusicSwitchApp) {
			this.play();  
		}
	};
	componentDidMount() {
		window.onblur = this.onblurHandler;
		window.onfocus = this.onfocusHandler;
		document.addEventListener(visibilityChange, this.onVisibilityChanged);  
		this.media.addEventListener('timeupdate', timeupdateHandler);
		this.media.addEventListener('play', this.playHandler);
		this.media.addEventListener('pause', this.pauseHandler);
		document.addEventListener("WeixinJSBridgeReady", this.weixinJSBridgeReadyHandler); 
		document.body.removeEventListener('touchstart', this.mokAutoPlay);
		this.play();
	}

	
	weixinJSBridgeReadyHandler = () => {
		document.removeEventListener(visibilityChange, this.onVisibilityChanged);  
		document.removeEventListener("WeixinJSBridgeReady", this.weixinJSBridgeReadyHandler); 
		document.body.removeEventListener('touchstart', this.mokAutoPlay);
		this.play();
	}
	playHandler = () => {
		this.setState({
            status: true
        });
	}
	pauseHandler = () => {
		this.setState({
            status: false
        });
	}

	componentWillUnmount() {
		document.removeEventListener(visibilityChange, this.onVisibilityChanged);  
        this.media.removeEventListener('timeupdate', timeupdateHandler);
		this.media.removeEventListener('play', this.playHandler);
		this.media.removeEventListener('pause', this.pauseHandler);
		document.body.removeEventListener('touchstart', this.mokAutoPlay);
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
		this.play();
	};
	
	play = () => {
        this.media.play();
	};
	stop = () => {
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