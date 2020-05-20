import React, { Component } from 'react'
import ArticleListContext from '../../contexts/ArticleListContext'
import ArticleApiService from '../../services/article-api-service'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Section } from '../../components/Utils/Utils'
import './LandingPage.css'

export default class LandingPage extends Component{
    static contextType = ArticleListContext

    componentDidMount() {
        this.context.clearError()
        ArticleApiService.getArticles()
          .then(this.context.setArticleList)
          .catch(this.context.setError)
      }
    
      renderLanding(){

        return (
            
            <Section className = 'LandingPage_name'>
            <h1>
                Chris <br/>Connaughton
                </h1>
        </Section>
        )

      }


    render(){
        const { error } = this.context
        return(
            <div className='LandingPage'>
            {error
              ? <p className='red'>There was an error, try again</p>
              : this.renderLanding()}



          </div>
        )

    }
}