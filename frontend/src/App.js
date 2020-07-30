import React,{ Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route,Switch, withRouter, Redirect, Link} from 'react-router-dom';
import HeaderComponent from './component/HeaderComponent';
import ErrorComponent from './component/ErrorComponent';
import SummaryComponent from './component/Summary/Summary';
import ProfileComponent from './component/Profile/Profile';
import TimesheetComponent from './component/Timesheet/Timesheet';




class App extends Component {
  // componentDidMount () {
  //   this.props.onTryAutoSignup();
  // }

/*
<Route path="/auth" component={asyncAuth} />
        <Route path="/logout" component={Logout} />
        */

  render () {
    let routes = (
      <Switch>
        <Route path="/summary" component={SummaryComponent} />
        <Route path="/timesheet" component={TimesheetComponent} />
        <Route path="/profile" component={ProfileComponent} />
        
        <Route component={ErrorComponent} />
      </Switch>
    );

    // if ( this.props.isAuthenticated ) {
    //   routes = (
    //     <Switch>
    //       <Route path="/summary" component={asyncSummary} />
    //     <Route path="/timesheet" component={asyncTimesheet} />
    //     <Route path="/profile" component={asyncProfile} />
    //     <Route path="/auth" component={asyncAuth} />
    //     <Route path="/logout" component={Logout} />
          
    //     </Switch>
    //   );
    // }

    return (
      <div>
          <HeaderComponent/><br/>
          {routes}
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     isAuthenticated: state.auth.token !== null
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     onTryAutoSignup: () => dispatch( actions.authCheckState() )
//   };
// };

//export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );

export default App;