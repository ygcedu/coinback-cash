import styled from 'styled-components';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;

  > .output {
    background: white;
    font-size: 26px;
    line-height: 48px;
    text-align: right;
    padding: 0 16px;
    border-top: 1px solid #ccc;
    background-color: #f3f3f3;
    //box-shadow: inset 0 -5px 5px -5px rgba(0, 0, 0, 0.25),
    //inset 0 5px 5px -5px rgba(0, 0, 0, 0.25);
  }

  > .pad {

    > button {
      font-size: 18px;
      float: left;
      width: 25%;
      height: 64px;
      background-color: #f3f3f3;
      border: none;
      border-right: 1px solid #ccc;
      border-top: 1px solid #ccc;

      &.ok {
        height: 128px;
        float: right;
      }

      &.zero {
        width: 50%;
      }

      &:nth-child(4n) {
        border-right: none;
      }

      &.highlight {
        background-color: #ffda44;
      }
    }
  }
`;

export {Wrapper};
