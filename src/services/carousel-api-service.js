import config from '../config'
import TokenService from '../services/token-service'
import first from '../images/1carousel.jpg'
import second from '../images/2carousel.jpg'
import third from '../images/3carousel.jpg'
import fourth  from '../images/4carousel.jpg'
import fifth from '../images/5carousel.jpg'
import sixth from '../images/6carousel.jpg'
const CarouselApiService = {
    getCarouselPics(){
        

      const imgArr = [
        first,second,third,fourth,fifth,sixth
      ]

     
        return imgArr


    },




}

export default CarouselApiService;