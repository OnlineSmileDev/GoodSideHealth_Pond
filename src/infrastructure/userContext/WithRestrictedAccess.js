import React from 'react'
import { useSelector } from 'react-redux'
import {
  selectIsAuthenticated,
  selectCurrentUserHasPermissions,
} from './userContext.selectors'

// class Auth0Redirect extends React.Component {
// 	componentDidMount() {
// 		window.location.replace('http://localhost:3030/oauth/auth0')
// 	}

// 	render() {
// 		return null
// 	}
// }

const WithRestrictedAccess = (WrappedComponent, requiredPermissions = []) => {
  const ProtectedRoute = () => {
    const isAuthenticated = !!useSelector(selectIsAuthenticated)
    const hasPermissions = useSelector(
      selectCurrentUserHasPermissions(requiredPermissions)
    )

    if (isAuthenticated && hasPermissions) {
      return <WrappedComponent />
    }

    // if (!isAuthenticated) {
    // 	return <Auth0Redirect />
    // }

    return <div>You {"don't"} have the required permissions for this page.</div>
  }

  return ProtectedRoute
}

export default WithRestrictedAccess
