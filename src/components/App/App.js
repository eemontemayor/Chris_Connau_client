import React, { Component } from 'react'
import { Switch, Link } from 'react-router-dom'
import Header from '../Header/Header'
import PrivateRoute from '../Utils/PrivateRoute'
import PublicOnlyRoute from '../Utils/PublicOnlyRoute'
import ArticleListPage from '../../routes/ArticleListPage/ArticleListPage'
import ArticlePage from '../../routes/ArticlePage/ArticlePage'
import PicturePage from '../../routes/PicturePage/PicturePage'
import LoginPage from '../../routes/LoginPage/LoginPage'
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage'
import LandingPage from '../../routes/LandingPage/LandingPage'
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'
import './App.css'

class App extends Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  render() {
    return (
      <div className='App'>
        <header className='App__header'>
          <Header />
        </header>
        <main className='App__main'>
          {this.state.hasError && <p className='red'>There was an error! Oh no!</p>}
          <Switch>
          <PublicOnlyRoute
              exact
              path={'/'}
              component={LandingPage}
            />
          <PublicOnlyRoute
              exact
              path={'/gallery'}
              component={ArticleListPage} // to do => reconfig to portfolio page
            />

<PublicOnlyRoute
              
              path={'/gallery/:category/:picId'}
              component={PicturePage} // to do => reconfig to portfolio page
            />

           <PublicOnlyRoute
              path={'/login'}
              component={LoginPage}
            />
            {/* <PublicOnlyRoute
              path={'/register'}
              component={RegistrationPage}
            /> */}
            <PublicOnlyRoute
              path={'/article/:articleId'}
              component={ArticlePage} 
              
            />
        <PublicOnlyRoute
          path={'/login'}
          component={LoginPage}
        />
            <PublicOnlyRoute
              component={NotFoundPage}
            />
          </Switch>
        </main>
        {/* <footer>
          <Link to='/login'>:)</Link>
        </footer> */}
      </div>
    )
  }
}

export default App
