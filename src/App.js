import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import html2canvas from 'html2canvas';
import { newQuote, randomColor } from './functions';
import './App.css';

library.add(fab, fas);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.renewQuote = this.renewQuote.bind(this);
    this.capture = this.capture.bind(this);
    this.tweetUrl = "https://twitter.com/intent/tweet";
    this.state = {
      quote: undefined,
      color: randomColor(),
    }
  }

  async renewQuote() {
    let result = await newQuote();
    this.setState({
      quote: result.data,
      color: randomColor(),
    });
    console.log(result.data);
  }
  
  async capture() {
    
    try {
      //console.log("Capturing...", html2canvas)
      let quote = document.getElementById('quote');
      let svgs = document.body.querySelectorAll('svg');
      svgs.forEach(function(item) {
      item.setAttribute("width", item.getBoundingClientRect().width);
      item.setAttribute("height", item.getBoundingClientRect().height);
      item.style.width = null;
      item.style.height= null;
      });
      let canvas = await html2canvas(quote);
      let base64 = canvas.toDataURL("image/png");
      let blob = new Blob([base64], {type: 'image/png'});
      let downloadLink = document.createElement('a');
      downloadLink.setAttribute("download", "download");
      downloadLink.href = base64;
      downloadLink.click();
    }
    catch(e) {
      alert("Something went wrong!!");
      console.log(e);
    }
  }

  render() {
    return (
      <div className="App"
        style={ 
          this.state.quote !== undefined 
          ? {background: this.state.color, color: this.state.color}
          : {}
        }
      >
        <header className="App-header">
        </header>
        <div id="quote-box">
          <div id="quote">
            <div id="text">
              <FontAwesomeIcon icon={['fas', 'quote-left']}/>
              
              {`  ${this.state.quote !== undefined ? this.state.quote.content : ''}  `}
              {/* <FontAwesomeIcon icon={['fas', 'quote-right']}/> */}
            </div>
            <div id="author">
              {`- ${this.state.quote !== undefined ? this.state.quote.author : ''} `}
            </div>
          </div>
          <div id="controls">
            <span id="squares">
              <a id="tweet-quote" target="_blank" rel="noreferrer"
                href={
                  this.state.quote !== undefined
                  ? `${this.tweetUrl}?hashtags=quote&text="${this.state.quote.content}"${this.state.quote.author}`
                  : '#'
                }
                style={
                  this.state.quote !== undefined 
                  ? { background: this.state.color }
                  : {}
                }
              >
                <FontAwesomeIcon icon={['fab', 'twitter']}/>
              </a>
              <button id="capture-quote"
                style={
                  this.state.quote !== undefined 
                  ? { background: this.state.color }
                  : {}
                }
                onClick={this.capture}
              >
                <FontAwesomeIcon icon={['fas', 'camera-retro']}/>
              </button>
            </span>
            <button id="new-quote" 
              style={
                this.state.quote !== undefined 
                ? { background: this.state.color }
                : {}
              }
              onClick={this.renewQuote}
            >
              New quote
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  componentDidMount() {
    this.renewQuote();
  }
}

export default App;
