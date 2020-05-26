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
    listCategories:[]
  };

  static contextType = ArticleListContext;

  componentDidMount() {
    this.context.clearError();
    ArticleApiService.getArticles()
      .then(list =>{
        // console.log('list', list)
        let group = list.reduce((r, a) => {
         
          r[a.style] = [...r[a.style] || [], a];
          return r;
         }, {});
  
         let listCategories=[]
    
        for(const k in group){
      listCategories.push(k)
        }
        this.setState({listCategories},()=>{
      
          this.context.setArticleList(list)})
        })
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

  renderArticles(category='') {
    const { articleList = [] } = this.context;
    
    
    if(category.length > 0){

      // console.log('category', category)
      
      return articleList.filter(i => i.style === category).map((article) => (
        <ArticleListItem key={article.id} article={article} />
        ));
      }
      
      
  }




  renderGalleryList(arr = [], category='') {
    if (arr.length) {
    // console.log('category', category)

      return arr.map((img, index) => {
        let key = `${index}`
      
        return (
          <Link to={`/gallery/${category}/${key}`}  key={key}>
          <li
            className="GalleryListItem"
        
            key={key}
            >

            
            <img src={img} alt="alt-ph" />
          </li>
            </Link>
        );
      });
    }
  }


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

<h3 className = 'ArticleList_Title'>Nature</h3>
          <ul className="ArticleList" id='Nature'>
            {error ? (
              <p className="red">There was an error, try again</p>
            ) : (
              this.renderArticles('Nature')
            )}
           
          </ul>
          <h3 className = 'ArticleList_Title'>Architecture</h3>
          <ul className="ArticleList" id='Architecture'>
            {error ? (
              <p className="red">There was an error, try again</p>
            ) : (
              this.renderArticles('Architecture')
            )}
           
          </ul>
    
       

          {/* <Section>
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
          </Section> */}
        </div>
      </div>
    );
  }
}
