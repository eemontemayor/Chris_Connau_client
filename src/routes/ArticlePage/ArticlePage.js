import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ArticleContext, { nullArticle } from '../../contexts/ArticleContext'
import ArticleApiService from '../../services/article-api-service'
import { NiceDate, Hyph, Section } from '../../components/Utils/Utils'
import StyleIcon from '../../components/StyleIcon/StyleIcon'
import CommentForm from '../../components/CommentForm/CommentForm'
import './ArticlePage.css'
import { closestTo } from 'date-fns'

export default class ArticlePage extends Component {
state ={
  viewBig:false
}

  static defaultProps = {
    match: { params: {} },
  }

  static contextType = ArticleContext

  componentDidMount() {
    const { articleId } = this.props.match.params
    this.context.clearError()
    ArticleApiService.getArticle(articleId)
      .then(this.context.setArticle)
      .catch(this.context.setError)
    ArticleApiService.getArticleComments(articleId)
      .then(this.context.setComments)
      .catch(this.context.setError)
  }

  componentWillUnmount() {
    this.context.clearArticle()

  }

  renderArticle() {
    const { article, comments } = this.context

    let med_url = article.img_url.split('').slice(0,-4).join('').concat('.md.jpg')

  

    
    return <>
      <h2>{article.title}</h2>
  
      {!this.state.viewBig  ? <>    <img className = 'image_med'onClick = {this.handleImgClick} src = {med_url} style={{width:'50vw'}}/>
      <Section className = "Article_data">

      <p>
        <ArticleStyle article={article} />
        {article.author.id && <>
          <Hyph />
          <ArticleAuthor article={article} />
        </>}
        <Hyph />
        <NiceDate date={article.date_created} />
      </p>
      <ArticleContent article={article} />
      </Section>
      <ArticleComments comments={comments} />
      <CommentForm />
        </> : <img className = 'image_lrg' onClick = {this.handleImgClick} src = {article.img_url} style={{height:'1080px', margin:'20px'}}/>

}
</>

  }
  handleImgClick = () => {
    console.log('here')
    this.setState({
      viewBig:!this.state.viewBig
    },()=>{console.log('this.state', this.state)})

 
  };


  render() {
    const { error, article } = this.context
    let content
    if (error) {
      content = (error.error === `Article doesn't exist`)
        ? <p className='red'>Article not found</p>
        : <p className='red'>There was an error</p>
    } else if (!article.id) {
      content = <div className='loading' />
    } else {
      content = this.renderArticle()
    }
    return (
      <div className='ArticlePage'>
        {content}
      </div>
    )
  }
}

function ArticleStyle({ article }) {
  return (
    <span className='ArticlePage__style'>
      <StyleIcon style={article.style} />
      {' '}
      {article.style}
    </span>
  )
}

function ArticleAuthor({ article = nullArticle }) {
  return (
    <span className='ArticlePage__author'>
      {article.author.full_name}
    </span>
  )
}

function ArticleContent({ article }) {
  return (
    <p className='ArticlePage__content'>
      {article.content}
    </p>
  )
}

function ArticleComments({ comments = [] }) {
  return (
    <ul className='ArticlePage__comment-list'>
      {comments.map(comment =>
        <li key={comment.id} className='ArticlePage__comment'>
          <p className='ArticlePage__comment-text'>
            <FontAwesomeIcon
              size='lg'
              icon='quote-left'
              className='ArticlePage__comment-icon blue'
            />
            {comment.text}
          </p>
          <p className='ArticlePage__comment-user'>
            {comment.user.full_name}
          </p>
        </li>
      )}
    </ul>
  )
}
