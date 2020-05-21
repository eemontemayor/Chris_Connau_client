import config from '../config'
import TokenService from '../services/token-service'

const CarouselApiService = {
    getCarouselPics(){


          

      return fetch(`${config.API_ENDPOINT}/carousel`, {
        headers: {
          'authorization': `bearer ${TokenService.getAuthToken()}`,
        },
      })
        .then(res =>
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },

    getGalleryPics(){


          

      return fetch(`${config.API_ENDPOINT}/gallery`, {
        headers: {
          'authorization': `bearer ${TokenService.getAuthToken()}`,
        },
      })
        .then(res =>
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },

    getBigPicture(category,PicId){
      return fetch(`${config.API_ENDPOINT}/gallery/${category}/${PicId}`, {
        headers: {
          'authorization': `bearer ${TokenService.getAuthToken()}`,
        },
      })
        .then(res =>
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },
    }

export default CarouselApiService;