import config from '../config'
import TokenService from '../services/token-service'
import first from '../images/1carousel.jpg'
const CarouselApiService = {
    getCarouselPics(){
        
        const obj = {
          img:first,
          details:'blah blah blah'
        }
        console.log('obj', obj)
        return obj


    },




}

export default CarouselApiService;