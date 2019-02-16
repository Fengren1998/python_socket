import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import authActions from '../../actions/authActions';
import authSelector from '../../selectors/authSelector';

const { checkRoutine } = authActions;
const { loginSelector } = authSelector;

const UnauthenticatedRoute = (props) => {
  const {
    path,
    component: ChildComponent,
    isAuthenticated,
    isChecking,
    redirect,
    ...rest
  } = props;

  return (
    <Route
      path={path}
      render={(componentProps) => {
        if (!isAuthenticated) {
          return <ChildComponent {...componentProps} />;
        }
        if (!isChecking) {
          return <Redirect to={redirect} />;
        }
        return <div>Loading...</div>;
      }}
      {...rest}
    />
  );
};

const mapStateToProps = (state, ownProps) => ({
  isAuthenticated: loginSelector(state).isAuthenticated,
  isChecking: loginSelector(state).isChecking,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  checkAuthentication: () => dispatch(checkRoutine.trigger()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UnauthenticatedRoute);
