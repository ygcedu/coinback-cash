import styled from 'styled-components';
import {Link} from 'react-router-dom';
import React from 'react';
// 使用 svg loader 后，x 变为一个对象而不是文件路径
import x from 'icons/money.svg'; // svgo-loader => svg-sprite-loader
import y from 'icons/labels.svg';

console.log(x, y);// 此时不能删除，为了在页面中生成 svg + symbol 标签

const NavWrapper = styled.nav`
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
  line-height: 24px;

  > ul {
    display: flex;

    > li {
      width: 33.3333%;
      text-align: center;
      padding: 16px;
    }
  }
`;

const Nav = () => {
  return (
    <NavWrapper>
      <ul>
        <li>
          <svg fill="red" className="icon">
            <use xlinkHref="#money"/>
          </svg>
          <Link to="/tags">标签</Link>
        </li>
        <li>
          <Link to="/money">记账</Link>
        </li>
        <li>
          <Link to="/statistics">统计</Link>
        </li>
      </ul>
    </NavWrapper>
  );
};

export default Nav;