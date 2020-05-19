import React, { Component } from "react";
import ArticleListContext from "../../contexts/ArticleListContext";
import ArticleApiService from "../../services/article-api-service";
import CarouselApiService from "../../services/carousel-api-service";

import { Section } from "../../components/Utils/Utils";
import ArticleListItem from "../../components/ArticleListItem/ArticleListItem";
import "./ArticleListPage.css";
import Carousel from "../../components/Carousel/Carousel";
export default class ArticleListPage extends Component {
  state = {
    carouselImages: [],
    galleryImages:[]
  };

  static contextType = ArticleListContext;

  componentDidMount() {
    this.context.clearError();
    ArticleApiService.getArticles()
      .then(this.context.setArticleList)
      .catch(this.context.setError);

 CarouselApiService.getCarouselPics()
 .then(res =>{

  this.setState({
    carouselImages:res
  })
 })

 CarouselApiService.getGalleryPics()
 .then(res =>{
  console.log('res from getGallPics', res || 'nope')
  this.setState({
    galleryImages:res
  })
 })

  }

  renderArticles() {
    const { articleList = [] } = this.context;
    return articleList.map((article) => (
      <ArticleListItem key={article.id} article={article} />
    ));
  }

  renderGalleryList(arr = []) {
    console.log('arr', arr)

    if(arr.length){
// console.log('arr', arr)

      return arr.map((img, index) => {
        return <img src={img} className="GalleryListItem" key={`img-${index}`} />;
      });
    }
  }

  render() {
    const { error } = this.context;
    const carImages = this.state.carouselImages;
    const gallImages = this.state.galleryImages;
   
    return (
      <div className="ArticleListPage">
        <div className="Carousel">
          <Carousel images={carImages} />{" "}
        </div>
        <div
          // list
          className="ArticleListContainer"
        >
          {/* <ul className="ArticleList">
            {error ? (
              <p className="red">There was an error, try again</p>
            ) : (
              this.renderArticles()
            )}
          </ul> */}

          <ul className="GalleryList">
            {error ? (
              <p className="red">There was an error, try again</p>
            ) : (
              this.renderGalleryList(gallImages[0])
            )}
          </ul>

          <ul className="GalleryList">
            {error ? (
              <p className="red">There was an error, try again</p>
            ) : (
              this.renderGalleryList(gallImages[1])
            )}
          </ul>
        </div>
      </div>
    );
  }
}
