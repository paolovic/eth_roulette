import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'components/ui/Button';
import 'styles/views/Login.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../wallet/Connector";

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

const Login = props => {
  const history = useHistory();
  const [connected, setConnected] = useState(false);
  const { activate, deactivate } = useWeb3React();

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (parseInt(localStorage?.getItem('isWalletConnected')) === 1) {
        try {
          setConnected(true)
          await activate(injected)
        } catch (ex) {
          console.log(ex)
        }
      }
    }
    connectWalletOnPageLoad()
  }, [])

  const connect = async () => {
    try {
      await activate(injected);
      setConnected(true);
      localStorage.setItem('isWalletConnected', 1);
      history.push('/game')
    } catch (ex) {
      console.log(ex);
    }
  }

  const disconnect = async () => {
    try {
      deactivate();
      setConnected(false);
      localStorage.setItem('isWalletConnected', 0);
    } catch (ex) {
      console.log(ex);
    }
  }

  return (
    <BaseContainer>
      <div className="login container">
        <div className="login form">
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
