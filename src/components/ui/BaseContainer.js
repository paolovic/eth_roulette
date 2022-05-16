import 'styles/ui/BaseContainer.scss';
import PropTypes from "prop-types";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

const BaseContainer = props => (
  <div className='base-container sidebar'>
    <ProSidebar>
      <Menu iconShape="square">
        <MenuItem>Dashboard</MenuItem>
        <SubMenu title="Components">
          <MenuItem>Component 1</MenuItem>
          <MenuItem>Component 2</MenuItem>
        </SubMenu>
      </Menu>
    </ProSidebar>
    <div {...props} className={`base-container ${props.className ?? ''}`}>
      {props.children}
    </div>
  </div>
);

BaseContainer.propTypes = {
  children: PropTypes.node,
};

export default BaseContainer;