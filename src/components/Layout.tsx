import Nav from './Nav';
import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100vh; // 不能使用 min-height
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Main = styled.div`
  flex-grow: 1; // 尽量高
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

type Props = {
  // 必要时控制组件内部样式用，类似于 v-deep
  className?: string
  scrollTop?: number
}

const Layout: React.FC<Props> = (props) => {
  const mainRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setTimeout(() => {
      if (!mainRef.current) return;
      mainRef.current.scrollTop = props.scrollTop!;
    }, 0);// 尽快执行这段代码
  }, [props.scrollTop]);
  return (
    <Wrapper>
      <Main ref={mainRef} className={props.className} data-x={'rick'}>
        {props.children}
      </Main>
      <Nav/>
    </Wrapper>
  );
};

Layout.defaultProps = {
  scrollTop: 0
};

export default Layout;
