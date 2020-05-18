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
    images: [],
  };

  static contextType = ArticleListContext;

  componentDidMount() {
    this.context.clearError();
    ArticleApiService.getArticles()
      .then(this.context.setArticleList)
      .catch(this.context.setError);

  let imgArr = CarouselApiService.getCarouselPics()
    console.log('img', imgArr)
  this.setState({
    images:imgArr
  })

  }

  renderArticles() {
    const { articleList = [] } = this.context;
    return articleList.map((article) => (
      <ArticleListItem key={article.id} article={article} />
    ));
  }

  renderGalleryList(arr) {
    return arr.map((img, index) => {
      return <img src={img} className="GalleryListItem" key={`img-${index}`} />;
    });
  }

  render() {
    const { error } = this.context;
    const images = this.state.images;

    return (
      <div className="ArticleListPage">
        <div className="Carousel">
          <Carousel images={images} />{" "}
        </div>
        <div
          // list
          className="ArticleListContainer"
        >
          <ul className="ArticleList">
            {error ? (
              <p className="red">There was an error, try again</p>
            ) : (
              this.renderArticles()
            )}
          </ul>

          {/* <ul className="GalleryList">
            {error ? (
              <p className="red">There was an error, try again</p>
            ) : (
              this.renderGalleryList(images)
            )}
          </ul> */}
        </div>
      </div>
    );
  }
}
