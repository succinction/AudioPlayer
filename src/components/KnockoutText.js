import React from "react";
import styled from "styled-components";

class KnockoutText extends React.Component {
  render() {
    const font_size = this.props.fontSize  || '100px'
    const offest_x = this.props.offset_x || "-50%"
    const offest_y = this.props.offset_y || "-50%"
    return (
      <TextWrap ID={this.props.ID} fontSize={font_size} >
        <svg viewBox="0 0 500 80">
          <pattern
            id={`p-img_${this.props.ID}`}
            viewBox="0 0 500 100"
            patternUnits="userSpaceOnUse"
            width="300%"
            height="300%"
            x={offest_x}
            y={offest_y}
          >
            <image
              href={this.props.src}
              width="300"
              height="200"
            />
          </pattern>
          <text
            textAnchor="middle"
            x="50%"
            y="50%"
            dy=".35em"
            className="img-layer"
          >
            {this.props.txt}
          </text>
          {this.props.colorOverlay &&
          <linearGradient id={`gr-overlay_${this.props.ID}`} x1="0" y1="0" x2="100%" y2="100%">
            <stop stopColor="hsla(50, 100%, 70%, 0.5)" offset="10%" />
            <stop stopColor="hsla(200, 100%, 60%, 0.5)" offset="50%" />
            <stop stopColor="hsla(320, 100%, 50%, 0.5)" offset="90%" />
          </linearGradient>
          }
          <text
            textAnchor="middle"
            x="50%"
            y="50%"
            dy=".35em"
            className="gradient-layer"
          >
            {this.props.txt}
          </text>
        </svg>
      </TextWrap>
    );
  }
}

export default KnockoutText;

const TextWrap = styled.div`
margin: 0;
position: relative;
width: 100%;

svg {
  width: 100%;
  height: auto;
  font: bold ${props => props.fontSize} sans-serif;
//   text-transform: uppercase;
  
  .img-layer {
    fill: url(#p-img_${props => props.ID});
  }
  
  .gradient-layer {
    fill: url(#gr-overlay);
  }
}

`
