import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Hyph } from '../Utils/Utils'
// import TokenService from '../../services/token-service'
import './Header.css'

export default class Header extends Component {
  handleLogoutClick = () => {
  }

  renderLogoutLink() {
    return (
      <div className='Header__logged-in'>
        <NavLink
          onClick={this.handleLogoutClick}
          to='/'>
          Logout
        </NavLink>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <div className='Header__not-logged-in'>
        <NavLink
          to='/register'>
          Register
        </NavLink>
        <Hyph />
        <NavLink
          to='/login'>
          Log in
        </NavLink>
      </div>
    )
  }

  render() {
    return (
      <nav className='Header'>
       
          <NavLink to='/' id = 'Header__logo'>
            
            <FontAwesomeIcon className='white' icon='frog' size='lg'/>
            {' '}
           
          </NavLink>
       
        <div className = 'Header__links'>

          <NavLink to='/gallery'>
            Gallery
          </NavLink>
          <NavLink to='/masonry'>
            Masonry
          </NavLink>
        </div>

        {/* {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()} */}
      </nav>
    )
  }
}
