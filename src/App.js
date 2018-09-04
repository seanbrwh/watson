import React, { Component } from 'react';
import axios from 'axios'
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      tone:[],
      text:''
    }
  }
  componentDidMount(){
    axios.get('/api/getdata').then(res=>{      
      this.setState({tone:res.data})
    })
  }
  handleText(val){
    this.setState({text:val})
  }
  sendtext(){
    let {text} = this.state
    axios.post('/api/analyzetext', {text}).then(res=>{
      console.log(res);
    })
  }
  render() {    
    console.log(this.state.text);
    return (
      <div className="App">
        Watson Tone Analyzer
        {
          this.state.tone.map(e=>{
            return(
              <div>
                {e.document_tone.tones.map(g=>{
                  return(
                    <div>
                      {g.score}
                      <br/>
                      {g.tone_id}
                      <br/>
                      {g.tone_name}
                    </div>
                  )
                })}                
                <br/>
                {e.sentences_tone.map(f=>{
                  return(
                    <div>
                      {f.sentence_id}
                      <br/>
                      {f.text}
                      <br/>
                      {
                        f.tones.map(p=>{
                          return(
                            <div>
                              <br/>
                            {p.score}
                            <br/>
                            {p.tone_name}
                            <br/>
                            </div>
                          )
                        })
                      }                      
                    </div>
                  )
                })}
              
              </div>
            )
          })
        }
        <div>
          <textarea  id="" cols="30" rows="10" onChange={(event)=>this.handleText(event.target.value)}></textarea>
          <br/>
          <button onClick={()=>this.sendtext()}>
            Anyalyze Text
          </button>          
        </div>       
      </div>
    );
  }
}

export default App;
