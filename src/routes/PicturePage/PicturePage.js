import React, { Component } from 'react'
import CarouselApiService from '../../services/carousel-api-service'
import './PicturePage.css'

export default class PicturePage extends Component {
    state={
        imgUrl:''
    }
    static defaultProps = {
        match: { params: {} },
      }

 


      componentDidMount() {
        const { picId } = this.props.match.params
    console.log('here from pic page')
        CarouselApiService.getBigPicture(picId)
        .then(res =>{
            this.setState({
                imgUrl:res
            })
           
        })
    }

    renderImage(){
        if(this.state.imgUrl.length > 0){
            return (<div className='PicturePage_ImgContainer' >
                       <button onClick ={this.goBack}>  BACK  </button>
                <img src = {this.state.imgUrl} />
                </div>)

        }
        else{
          return  <div>later</div>
        }

    }

    goBack = () =>{
        this.props.history.push('/gallery')
    }

    render(){
        console.log('this.state', this.state)
        return(
            <div className='PicturePage'>
         
            {this.renderImage()}
            </div>
        )
    }
}