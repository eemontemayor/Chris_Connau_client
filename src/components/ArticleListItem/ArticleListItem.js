import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NiceDate, Hyph } from '../Utils/Utils'
import StyleIcon from '../StyleIcon/StyleIcon'
import './ArticleListItem.css'

export default class ArticleListItem extends Component {
state = {
  img_url:''

}
 


  render() {
    const { article } = this.props
 
    let thumbnail_url = article.img_url.split('').slice(0,-4).join('').concat('.th.jpg')





    


    return (
      <Link to={`/article/${article.id}`} className='ArticleListItem'>

      <img className = 'ArticleListItem_img' src = {thumbnail_url}/>
      <div className = 'ArticleListItem_info'>

        <header className='ArticleListItem__header'>
          <h2 className='ArticleListItem__heading'>
            {article.title}
          </h2>
          <ArticleDate article={article} />
        </header>
        <footer className='ArticleListItem__footer'>
          <ArticleStyle article={article} />
          {article.author.id && <>
            <Hyph />
            <ArticleAuthor article={article} />
          </>}
          <ArticleCommentCount article={article} />
        </footer>
      </div>
      </Link>
    )
  }
}

function ArticleStyle({ article }) {
  return (
    <span className='ArticleListItem__style'>
      <StyleIcon style={article.style} />
      {' '}
      {article.style}
    </span>
  )
}

function ArticleDate({ article }) {
  return (
    <span className='ArticleListItem__date'>
      <NiceDate
        date={article.date_created}
      />
    </span>
  )
}

function ArticleAuthor({ article }) {
  return (
    <span className='ArticleListItem__author'>
      {article.author.full_name}
    </span>
  )
}

function ArticleCommentCount({ article }) {
  return (
    <span
      className='ArticleListItem__comment-count fa-layers fa-fw'
    >
      <FontAwesomeIcon size='lg' icon='comment' />
      <span
        className='fa-layers-text fa-inverse'>
        {article.number_of_comments}
      </span>
    </span>
  )
}
