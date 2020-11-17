import React, { useEffect } from "react";
import { Link, Route } from "react-router-dom";
import { connect } from "react-redux";
import { userActions, auditActions } from "../_actions";

function mapState(state) {
  const { users, authentication, audits } = state;
  const { user } = authentication;
  return { user, users, audits };
}

const actionCreators = {
  getUsers: userActions.getAll,
  deleteUser: userActions.delete,
  logout: userActions.logout,
  getAudits: auditActions.getAll,
};

const Users = (props) => {
  useEffect(() => {
    props.getUsers();
  }, []);

  const { user, users } = props;

  const handleDeleteUser = (id) => {
    return (e) => this.props.deleteUser(id);
  };
  return (
    <div className="col-md-6 col-md-offset-3">
      <h1>Hi {user.firstName}!</h1>
      <p>You're logged in with React!!</p>
      <h3>All registered users:</h3>
      {users.loading && <em>Loading users...</em>}
      {users.error && <span className="text-danger">ERROR: {users.error}</span>}
      {users.items && (
        <ul>
          {users.items.map((user, index) => (
            <li key={user.id}>
              {user.firstName + " " + user.lastName}
              {user.deleting ? (
                <em> - Deleting...</em>
              ) : user.deleteError ? (
                <span className="text-danger">
                  {" "}
                  - ERROR: {user.deleteError}
                </span>
              ) : (
                <span>
                  {" "}
                  - <a onClick={handleDeleteUser(user.id)}>Delete</a>
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const UsersComponent = connect(mapState, actionCreators)(Users);

const Audits = (props) => {
  useEffect(() => {
    props.getAudits();
  }, []);
  const { audits } = props;
  return (
    <div className="col-md-6 col-md-offset-3">
      <h3>Audits</h3>
      {audits && audits.items && audits.items.length > 0 && (
        <table style={{ width: "100%" }}>
          <tr>
            <th colSpan="4">First Name</th>
            <th colSpan="4"> Last Name</th>
            <th colSpan="4"> Logged In</th>
            <th colSpan="4"> Logged Out</th>
            <th colSpan="4"> IP</th>
          </tr>
          {audits.items.map((audit, index) => (
            <tr key={index}>
              <td colSpan="4"> {audit.user.firstName}</td>
              <td colSpan="4"> {audit.user.lastName}</td>
              <td colSpan="4"> {audit.loggedIn}</td>
              <td colSpan="4"> {audit.loggedOut}</td>
              <td colSpan="4"> {audit.clientIp}</td>
            </tr>
          ))}
        </table>
      )}
    </div>
  );
};

const AuditsComponent = connect(mapState, actionCreators)(Audits);

const HomePage = (props) => {
  const { user, users } = props;
  const logout = () => {
    props.logout(user._id);
  };
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Users</Link>
          </li>
          {user.roles == "AUDITOR" && (
            <li>
              <Link to="/audits">Audits</Link>
            </li>
          )}
        </ul>
      </nav>
      <Route
        exact={true}
        path="/"
        component={UsersComponent}
        user={user}
        users={users}
      />

      <Route exact={true} path="/audits" component={AuditsComponent} />

      <p>
        <Link to="/login" onClick={()=>logout()}>
          Logout
        </Link>
      </p>
    </div>
  );
};

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };
