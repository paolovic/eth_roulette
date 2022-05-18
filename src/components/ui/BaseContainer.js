import 'styles/ui/BaseContainer.scss';
import PropTypes from "prop-types";

const BaseContainer = props => (
  <div className='base-container sidebar'>
    <div {...props} className={`base-container ${props.className ?? ''}`}>
      {props.children}
    </div>
  </div>
);

BaseContainer.propTypes = {
  children: PropTypes.node,
};

export default BaseContainer;