/**Tooltip Component */
// import React from "react";
import { OverlayTrigger, Tooltip as CustomTooltip } from "react-bootstrap";
import PropTypes from 'prop-types';

const Tooltip = ({ content, children, placement, tooltipComponent, wrapperClass = "", icon = 'bi bi-info-circle', iconClass = 'text-secondary' }) => {

   const CustomTag = tooltipComponent;

   return (
      <OverlayTrigger
         placement={placement}
         overlay={
            <CustomTooltip
               className={`${wrapperClass} ${tooltipComponent ? 'custom-tooltip' : ''}`}
            >
               {content ? content : CustomTag}
            </CustomTooltip>
         }
      >
         {children ? children : <i className={`ms-5 cursor-pointer ${icon} ${iconClass}`}></i>}
      </OverlayTrigger>
   )
}

Tooltip.propTypes = {
   wrapperClass: PropTypes.string,
   icon: PropTypes.string,
   iconClass: PropTypes.string,
   tooltipComponent: PropTypes.node,
   placement: PropTypes.string,
   children: PropTypes.node,
   content: PropTypes.string
}
export { Tooltip };