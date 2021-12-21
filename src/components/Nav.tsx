import styled from 'styled-components';
import {NavLink, useLocation} from 'react-router-dom';
import React from 'react';
import Icon from './Icon';

const NavWrapper = styled.nav`
  background: white;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
  line-height: 24px;
  color: #606266;

  > ul {
    display: flex;

    > li {
      width: 33.3333%;
      text-align: center;
      position: relative;

      > a {
        padding: 4px 0;
        // a 标签加 flex 布局，从 inline元素变为 block元素
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &.selected:not(.add) {
          color: #ffda44;

          .icon {
            fill: #ffda44;
          }
        }
      }

      .add {
        &::before {
          content: '';
          display: block;
          height: 24px;
        }

        .round {
          position: absolute;
          padding: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 4px solid white;
          background-color: #ffda44;
          box-shadow: 0px -2px 6px -2px rgba(0, 0, 0, 0.25);
          left: 50%;
          bottom: 28px;
          transform: translateX(-50%);

          .icon {
            fill: #000;
          }
        }

        &.selected {
          color: #ffda44;
        }
      }
    }
  }
`;

const Nav = () => {
  const {pathname} = useLocation();

  return (
    <NavWrapper>
      <ul>
        <li>
          <NavLink to="/tags" activeClassName="selected">
            {
              pathname === '/tags' ? <Icon name="details-fill" size={24}/> :
                <Icon name="details" size={24}/>
            }
            明细
          </NavLink>
        </li>
        <li>
          <NavLink to="/money" activeClassName="selected" className='add'>
            <div className='round'>
              <Icon name="add" size={24}/>
            </div>
            记账
          </NavLink>
        </li>
        <li>
          <NavLink to="/statistics" activeClassName="selected">
            {
              pathname === '/statistics' ? <Icon name="statistics-fill" size={24}/> :
                <Icon name="statistics" size={24}/>
            }
            统计
          </NavLink>
        </li>
      </ul>
    </NavWrapper>
  );
};

export default Nav;
