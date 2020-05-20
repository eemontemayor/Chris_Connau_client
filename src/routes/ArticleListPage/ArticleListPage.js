import React, { Component } from "react";
import ArticleListContext from "../../contexts/ArticleListContext";
import ArticleApiService from "../../services/article-api-service";
import CarouselApiService from "../../services/carousel-api-service";
import { Link } from 'react-router-dom'
import { Section } from "../../components/Utils/Utils";
import ArticleListItem from "../../components/ArticleListItem/ArticleListItem";
import "./ArticleListPage.css";
import Carousel from "../../components/Carousel/Carousel";
export default class ArticleListPage extends Component {
  state = {
    carouselImages: [],
    galleryImages: [],

  };

  static contextType = ArticleListContext;

  componentDidMount() {
    this.context.clearError();
    ArticleApiService.getArticles()
      .then(this.context.setArticleList)
      .catch(this.context.setError);

    CarouselApiService.getCarouselPics().then((res) => {
      this.setState({
        carouselImages: res,
      });
    });

    CarouselApiService.getGalleryPics().then((res) => {
      // console.log('res from getGallPics', res || 'nope')
      this.setState({
        galleryImages: res,
      });
    });
  }

  renderArticles() {
    const { articleList = [] } = this.context;
    return articleList.map((article) => (
      <ArticleListItem key={article.id} article={article} />
    ));
  }

  renderGalleryList(arr = [], category='') {
    if (arr.length) {
    

      return arr.map((img, index) => {
        let key = `${category}_${index}`
      
        return (
          <Link to={`/gallery/picture/${key}`}  key={key}>
          <li
            className="GalleryListItem"
            onClick={()=>this.handleImgClick(key)}
            key={key}
            >

            
            <img src={img} alt="alt-ph" />
          </li>
            </Link>
        );
      });
    }
  }
  handleImgClick = (key) => {
    console.log('key', key)

 
  };

  render() {
    const { error } = this.context;
    const carImages = this.state.carouselImages;
    const gallImages = this.state.galleryImages;

    return (
      <div className="ArticleListPage">
      {this.state.viewImage &&  <div className = 'ViewImageContainer'></div>}
        <div className="Carousel">
          <Carousel images={carImages} />{" "}
        </div>
        <div
          className="ArticleListContainer"
          list ='true'
        >
          <ul className="ArticleList">
            {error ? (
              <p className="red">There was an error, try again</p>
            ) : (
              this.renderArticles()
            )}
          </ul>
          <Section>
            <h2 className="GalleryListTitle">Nature</h2>
            <ul className="GalleryList">
              {error ? (
                <p className="red">There was an error, try again</p>
              ) : (
                this.renderGalleryList(gallImages[0],'nature')
              )}
            </ul>
          </Section>
          <Section>
            <h2 className="GalleryListTitle">Architecture</h2>
            <ul className="GalleryList">
              {error ? (
                <p className="red">There was an error, try again</p>
              ) : (
                this.renderGalleryList(gallImages[1],'architecture')
              )}
            </ul>
          </Section>
        </div>
      </div>
    );
  }
}
