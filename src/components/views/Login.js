import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'components/ui/Button';
import 'styles/views/Login.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../wallet/Connector";
import Web3 from 'web3';
import balance_abi from "abi/balance_abi.json"

const FormField = props => {
  return (
    <div className="login field">
      <label className="login label">
        {props.label}
      </label>
      <input
        className="login input"
        placeholder="enter here.."
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
      />
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

const testnet = 'https://rinkeby.etherscan.io/';

const Login = props => {
  const history = useHistory();
  const [connected, setConnected] = useState(false);
  const { active, account, library, activate, deactivate } = useWeb3React();

  useEffect(() => {
    if (active) {
      setConnected(true);
      async function fetchData() {
        try {
          console.log(`Selected account is ${account}`);
        }
        catch (err) {
          console.log(err);
          return;
        }
      };
      fetchData();
      history.push('/game')
    }
    else {
      setConnected(false);
    }

  }, [active]);

  const connect = async () => {
    try {
      await activate(injected)
    } catch (ex) {
      console.log(ex);
    }
  }

  const disconnect = async () => {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }



  /* const doLogin = async () => {
    try {
      const requestBody = JSON.stringify({ username, name });
      const response = await api.post('/users', requestBody);

      // Get the returned user and update a new object.
      const user = new User(response.data);

      // Store the token into the local storage.
      localStorage.setItem('eth_roulette_token', user.token);

      // Login successfully worked --> navigate to the route /game in the GameRouter
      history.push(`/game`);
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  }; */

  return (
    <BaseContainer>
      <div className="login container">
        <div className="login form">
          {/* <FormField
            label="Username"
            value={username}
            onChange={un => setUsername(un)}
          />
          <FormField
            label="Name"
            value={name}
            onChange={n => setName(n)}
          /> */}
          <div className="login button-container">
            <Button
              disabled={connected}
              width="100%"
              onClick={connect}
            >
              Connect to metamask
            </Button>
          </div>
          <div className="login button-container">
            <Button
              disabled={!connected}
              width="100%"
              onClick={disconnect}
            >
              disconnect
            </Button>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Login;
